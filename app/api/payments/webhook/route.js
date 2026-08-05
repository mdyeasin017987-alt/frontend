// app/api/payments/webhook/route.js
//
// BDGate সার্ভার-টু-সার্ভার POST করে এই route-এ, পেমেন্ট status বদলালেই।
// এই request কখনো ব্রাউজার থেকে আসে না — BDGate-এর নিজস্ব সার্ভার থেকে আসে।
//
// ⚠️ SECURITY: raw body-এর উপর signature verify করা mandatory।
// এটা স্কিপ করলে যে কেউ curl দিয়ে fake "payment.completed" পাঠিয়ে
// বিনা টাকায় order fulfill করিয়ে নিতে পারবে।

import crypto from 'crypto';
import 'dotenv/config';
import { supabaseAdmin } from '@/app/lib/supabaseAdmin';

function verifySignature(rawBody, signatureHeader, secret) {
  if (!signatureHeader) return false;

  const expected =
    'sha256=' + crypto.createHmac('sha256', secret).update(rawBody).digest('hex');

  const expectedBuf = Buffer.from(expected);
  const receivedBuf = Buffer.from(signatureHeader);

  // length আগে না মেলালে timingSafeEqual throw করবে, তাই আগে চেক
  if (expectedBuf.length !== receivedBuf.length) return false;

  return crypto.timingSafeEqual(expectedBuf, receivedBuf);
}

export async function POST(request) {
  // ⚠️ request.json() ব্যবহার করা যাবে না এখানে — parse করলে raw bytes হারিয়ে যায়
  // আর signature নতুন করে বানানো JSON string-এর সাথে না মিলে fail করবে।
  const rawBody = await request.text();
  const signature = request.headers.get('x-bdgate-signature');

  const isValid = verifySignature(rawBody, signature, process.env.BDGATE_WEBHOOK_SECRET);

  if (!isValid) {
    console.warn('Webhook signature mismatch — possible spoof attempt');
    return new Response('Invalid signature', { status: 401 });
  }

  const payload = JSON.parse(rawBody);
  const orderId = payload.metadata?.order_id;

  if (!orderId) {
    // signature ঠিক কিন্তু metadata নাই — malformed event, তবু 200 দিয়ে retry loop এড়াই
    console.error('Webhook missing order_id in metadata:', payload);
    return new Response('Missing order_id', { status: 200 });
  }

  switch (payload.event) {
    case 'payment.completed': {
      // ---- Idempotency check ----
      // BDGate একই event ৫ বার পর্যন্ত retry করতে পারে (network delay/glitch হলে)।
      // তাই "already completed" হলে দ্বিতীয়বার fulfillment logic (stock কমানো,
      // SMS/email পাঠানো) চালানো যাবে না।
      const { data: existingOrder } = await supabaseAdmin
        .from('orders')
        .select('payment_status')
        .eq('id', orderId)
        .single();

      if (existingOrder?.payment_status === 'completed') {
        return new Response('Already processed', { status: 200 });
      }

      const { error } = await supabaseAdmin
        .from('orders')
        .update({
          payment_status: 'completed',
          bdgate_gateway: payload.gateway, // e.g. "bKash"
          paid_at: payload.paid_at,
        })
        .eq('id', orderId);

      if (error) {
        console.error('Failed to update order after payment.completed:', error);
        // 500 দিলে BDGate retry করবে — এটাই চাই, কারণ আমাদের DB write ব্যর্থ হয়েছে
        return new Response('DB update failed', { status: 500 });
      }

      // এখানে future-এ stock reduce, confirmation SMS ইত্যাদি বসতে পারে
      break;
    }

    case 'payment.failed': {
      await supabaseAdmin.from('orders').update({ payment_status: 'failed' }).eq('id', orderId);
      break;
    }

    case 'refund.created': {
      await supabaseAdmin.from('orders').update({ payment_status: 'refunded' }).eq('id', orderId);
      break;
    }

    case 'payment.pending':
      // আমরা ইতিমধ্যে initiate route-এই pending বানিয়ে রেখেছি, এখানে কিছু করার দরকার নেই
      break;

    default:
      console.log('Unhandled webhook event:', payload.event);
  }

  // BDGate শুধু 2xx পেলে "delivered" ধরে নেয়, নাহলে retry করতে থাকবে
  return new Response('OK', { status: 200 });
}