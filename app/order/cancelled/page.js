"use client";
import { useRouter } from 'next/navigation';

export default function OrderCancelledPage() {
  const router = useRouter();
  // cart এখানে clear করা হয় না — user cancel করেছে মানে হয়তো আবার ট্রাই করবে,
  // cart হারিয়ে ফেললে তাকে আবার সব প্রোডাক্ট যোগ করতে হতো।

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
      <h1 className="text-3xl font-black mb-2">Payment Cancelled</h1>
      <p className="font-semibold max-w-md">তোমার পেমেন্ট সম্পন্ন হয়নি। কার্ট এখনো সংরক্ষিত আছে, চাইলে আবার চেষ্টা করতে পারো।</p>
      <button onClick={() => router.push('/cheackout')} className="mt-6 bg-black text-white font-bold px-8 py-3 rounded-full">
        Try Again
      </button>
    </div>
  );
}