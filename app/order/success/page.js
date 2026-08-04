"use client";
import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { useCart } from '@/app/context/CartContext';
import { supabase } from '@/app/lib/supabaseClient';

// ⚠️ গুরুত্বপূর্ণ concept: এই redirect শুধু UI-এর জন্য, payment "truth" না।
// BDGate customer-কে এখানে পাঠায় redirect_url দিয়ে, কিন্তু কেউ চাইলে
// টাকা না দিয়েও সরাসরি এই URL-এ গিয়ে বসতে পারে (?orderId=xxx বসিয়ে)।
// তাই আমরা এখানে "payment successful" বলে ধরে নিচ্ছি না —
// Supabase থেকে payment_status read করে দেখাচ্ছি, যেটা শুধু
// webhook (signature-verified server call) থেকেই "completed" হতে পারে।

function SuccessContent() {
  const params = useSearchParams();
  const router = useRouter();
  const { clearCart } = useCart();
  const orderId = params.get('orderId');

  const [status, setStatus] = useState('checking'); // checking | completed | pending | not_found

  useEffect(() => {
    if (!orderId) {
      setStatus('not_found');
      return;
    }

    let attempts = 0;
    const maxAttempts = 8; // webhook পৌঁছাতে সামান্য দেরি হতে পারে, তাই কয়েকবার পোল করি

    const checkStatus = async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('payment_status')
        .eq('id', orderId)
        .single();

      if (error || !data) {
        setStatus('not_found');
        return;
      }

      if (data.payment_status === 'completed') {
        setStatus('completed');
        clearCart(); // পেমেন্ট সত্যিই confirmed হলে তবেই cart clear
        return;
      }

      attempts += 1;
      if (attempts < maxAttempts) {
        setTimeout(checkStatus, 1500); // webhook delivery-এর জন্য অপেক্ষা, প্রতি ১.৫ সেকেন্ডে পোল
      } else {
        setStatus('pending'); // webhook এখনো আসেনি — user-কে জানিয়ে দাও, order হারায়নি
      }
    };

    checkStatus();
  }, [orderId]); // eslint-disable-line react-hooks/exhaustive-deps

  if (status === 'checking') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin" size={40} />
        <p className="font-bold">পেমেন্ট নিশ্চিত করা হচ্ছে…</p>
      </div>
    );
  }

  if (status === 'completed') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
        <CheckCircle2 size={64} className="text-black mb-4" />
        <h1 className="text-3xl font-black mb-2">Payment Successful!</h1>
        <p className="font-semibold">তোমার অর্ডার কনফার্ম হয়েছে। শীঘ্রই ডেলিভারি টিম যোগাযোগ করবে।</p>
        <button onClick={() => router.push('/')} className="mt-6 bg-black text-white font-bold px-8 py-3 rounded-full">
          Back to Home
        </button>
      </div>
    );
  }

  if (status === 'pending') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
        <h1 className="text-2xl font-black mb-2">Payment Processing</h1>
        <p className="font-semibold">তোমার পেমেন্ট এখনো প্রসেস হচ্ছে। কনফার্মেশন পেতে কিছুক্ষণ সময় লাগতে পারে।</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
      <h1 className="text-2xl font-black mb-2">Order Not Found</h1>
      <p className="font-semibold">এই অর্ডারের তথ্য পাওয়া যায়নি।</p>
    </div>
  );
}

export default function OrderSuccessPage() {
  // useSearchParams-কে Suspense দিয়ে wrap করা Next.js App Router-এর requirement,
  // নাহলে build-এ warning/error আসবে static rendering-এর সাথে conflict করার কারণে।
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading…</div>}>
      <SuccessContent />
    </Suspense>
  );
}