"use client";
// app/payment/page.js
//
// এটাই "Full Payment" option-এর destination page। checkout page থেকে
// paymentMethod === 'full' হলে এখানে ?orderId=xxx সহ redirect করা হয় —
// automated gateway (BDGate) এখনো active না থাকায় manual bKash/Nagad
// number দেখিয়ে user-কে নিজে পাঠাতে বলা হচ্ছে, তারপর সে যে Transaction ID
// (TrxID) পায় সেটা এখানে সাবমিট করে।
//
// concept note: এটা "trust but verify" pattern — client সরাসরি
// payment_status: 'completed' সেট করছে না, বরং 'pending_verification'।
// কারণ Transaction ID client থেকে আসছে, কোনো signature-verified webhook
// থেকে না (BDGate webhook-এর মতো)। তাই এটা টাকা পাওয়ার প্রমাণ না, শুধু
// admin-কে ম্যানুয়ালি bKash/Nagad statement-এর সাথে মিলিয়ে confirm
// করার জন্য একটা claim।

import { Suspense, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircle2, Copy, Check } from 'lucide-react';
import { supabase } from '@/app/lib/supabaseClient';

// TODO: নিজের আসল bKash/Nagad Personal নাম্বার দিয়ে বদলে নাও
const PAYMENT_NUMBERS = [
  { provider: 'bKash', type: 'Personal', number: '01798735945' },
  { provider: 'Nagad', type: 'Personal', number: '01798735945' },
  { provider: 'Farhan', type: 'Personal', number: '01798735945' },
  { provider: 'Rocket', type: 'Personal', number: '01798735945' },
];

function CopyableNumber({ number }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(number);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="flex items-center gap-2 font-mono font-bold text-lg bg-white border-[3px] border-black rounded-xl px-4 py-2 hover:scale-[1.02] transition-transform"
    >
      {number}
      {copied ? <Check size={18} /> : <Copy size={18} />}
    </button>
  );
}

function PaymentContent() {
  const params = useSearchParams();
  const router = useRouter();
  const orderId = params.get('orderId');
  const amount = params.get('amount');
  const paymentType = params.get('type'); // 'delivery' | 'full'
  const isDeliveryAdvance = paymentType === 'delivery';
  const isdakhgor = paymentType == "ডাকঘর"

  const [transactionId, setTransactionId] = useState('');
  const [senderNumber, setSenderNumber] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    setError('');

    if (!orderId) {
      setError('অর্ডার আইডি পাওয়া যায়নি। প্রথম থেকে চেকআউট আবার শুরু করো।');
      return;
    }
    if (!transactionId.trim()) {
      setError('Transaction ID (TrxID) দাও।');
      return;
    }
    if (!/^01[0-9]{9}$/.test(senderNumber.trim())) {
      setError('যে নাম্বার থেকে টাকা পাঠিয়েছো, সেই ১১ ডিজিটের নাম্বার সঠিকভাবে দাও।');
      return;
    }

    setSubmitting(true);

    // এখানে শুধু "claim" সেভ হচ্ছে — payment_status সরাসরি 'completed' না
    // করে 'pending_verification' রাখা হচ্ছে, admin manual check করার আগ পর্যন্ত।
    // delivery advance আর full payment-এর জন্য status একই ('pending_verification')
    // রাখা হলো, কিন্তু payment_method কলাম আগে থেকেই ('delivery'/'full') বলে দিচ্ছে
    // এটা advance না পুরো টাকা — তাই admin আলাদা করতে পারবে।
    const { error: updateError } = await supabase
      .from('orders')
      .update({
        status: 'pending_verification',
        transaction_id: transactionId.trim(),
        payer_number: senderNumber.trim(),
      })
      .eq('id', orderId);

    setSubmitting(false);

    if (updateError) {
      console.error('Transaction ID submit failed:', updateError);
      setError('তথ্য সেভ করা যায়নি। ইন্টারনেট চেক করে আবার চেষ্টা করো।');
      return;
    }

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8 text-center">
        <CheckCircle2 size={64} className="text-black mb-4" />
        <h1 className="text-3xl font-black mb-2">Transaction ID জমা হয়েছে</h1>
        <p className="font-semibold max-w-md">
          {isDeliveryAdvance
            ? 'ডেলিভারি চার্জের পেমেন্ট আমরা যাচাই করে অর্ডার কনফার্ম করবো। বাকি টাকা পণ্য হাতে পাওয়ার সময় দিও।'
            : 'আমরা তোমার পেমেন্ট যাচাই করে শীঘ্রই কনফার্ম করবো। যাচাই শেষ হলে ফোনে জানানো হবে।'}

          {isdakhgor && "আমরা তোমার পেমেন্ট যাচাই করে শীঘ্রই কনফার্ম করবো। যাচাই শেষ হলে ফোনে জানানো হবে। thanks :)"}
        </p>
        <button
          onClick={() => router.push('/')}
          className="mt-6 bg-black text-white font-bold px-8 py-3 rounded-full"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-4 md:p-8 font-sans text-black">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-black text-center mb-8">
          {!isdakhgor ? (isDeliveryAdvance ? 'Delivery Charge Payment' : 'Full Payment') : "ডাকঘর পেমেন্ট"}

        </h1>

        <div className="bg-background border-[3px] border-black rounded-3xl p-6 md:p-8 mb-6">
          <h2 className="text-xl font-black mb-4">এই নাম্বারে Send Money করো</h2>
          <div className="flex flex-col gap-3 mb-2">
            {PAYMENT_NUMBERS.map((p) => (
              <div key={p.provider} className="flex items-center justify-between gap-3">
                <span className="font-bold">{p.provider} ({p.type})</span>
                <CopyableNumber number={p.number} />
              </div>
            ))}
          </div>
          {!isdakhgor ? (
             amount && (
              <p className="font-bold text-lg mt-4 border-t-2 border-black pt-3">
                {isDeliveryAdvance ? 'ডেলিভারি চার্জ' : 'পরিমাণ'}: ৳{amount}
              </p>
            )) : ""}
          {isDeliveryAdvance && (
            <p className="text-sm font-semibold mt-2 text-gray-700">
              এটা শুধু ডেলিভারি চার্জ — বাকি পণ্যের দাম ডেলিভারির সময় হাতে দিও।
            </p>
          )}

          {!isdakhgor? (
          <p className="text-sm font-semibold mt-3 text-gray-700">
            টাকা পাঠানোর পর যে Transaction ID (TrxID) পাবে, সেটা নিচে দাও।
          </p>):  <p className="text-sm font-semibold mt-3 text-shadow-blue-400">
            Payment পর যে Transaction ID (TrxID) পাবে, সেটা নিচে দাও।
          </p>}
        </div>

        <div className="bg-background border-[3px] border-black rounded-3xl p-6 md:p-8">
          <h2 className="text-xl font-black mb-4">Confirm Payment</h2>

          <label className="block font-bold text-base mb-1.5">
            যে নাম্বার থেকে পাঠিয়েছো <span className="text-red-600">*</span>
          </label>
          <input
            value={senderNumber}
            onChange={(e) => setSenderNumber(e.target.value)}
            className="bg-amber-50 w-full border-[3px] border-black rounded-xl px-4 py-3 font-bold outline-none focus:ring-2 ring-black mb-4"
            placeholder="01XXXXXXXXX"
          />

          <label className="block font-bold text-base mb-1.5">
            Transaction ID (TrxID) <span className="text-red-600">*</span>
          </label>
          <input
            value={transactionId}
            onChange={(e) => setTransactionId(e.target.value)}
            className="bg-amber-50 w-full border-[3px] border-black rounded-xl px-4 py-3 font-bold outline-none focus:ring-2 ring-black"
            placeholder="e.g. 9XA7B2C1D0"
          />

          {error && <p className="text-red-600 text-sm font-bold mt-3">{error}</p>}

          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            className="w-full mt-6 bg-black text-white font-black text-lg py-4 rounded-xl hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? 'জমা হচ্ছে…' : 'Submit'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PaymentPage() {
  // useSearchParams-কে Suspense দিয়ে wrap করা Next.js App Router-এর requirement
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading…</div>}>
      <PaymentContent />
    </Suspense>
  );
}