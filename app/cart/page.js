"use client";
import Link from 'next/link';
import React, { useState } from 'react';
import { useCart } from '@/app/context/CartContext';
import { ChevronDown, CheckCircle2 } from 'lucide-react';

export default function CartPage() {
  // CartContext থেকে সত্যিকারের cart state আসছে,
  // যেটা product page এর "Add to Cart" বাটন থেকে populate হয়
  const [paymentMethod, setPaymentMethod] = useState('Home');
  const {
    items: cartItems,
    totalQuantity,
    totalPrice,
    increaseQty,
    decreaseQty,
    removeItem,

  } = useCart();

  const PAYMENT_METHODS = [
    { id: 'Home', label: 'Home delivery', emoji: '🚚' },
    { id: 'dakhgor', label: 'Dakghor delivery', emoji: '🚚' },
  ];

  const handlePlaceOder = ()=>{
    
    router.push(`/payment?orderId=${insertedOrder.id}&amount=${amountToPay}&type=${paymentMethod}`);
  }
  // কুপন কোড ইনপুট স্টেট
  const [couponCode, setCouponCode] = useState('');
  console.log(paymentMethod)

  // ডেলিভারি চার্জ: প্রথম প্রোডাক্টের জন্য ৳150, তারপর প্রতিটা অতিরিক্ত প্রোডাক্টে ৳30 করে যোগ হবে
  // 0 items -> ৳0, 1 item -> ৳150, 2 items -> ৳180, 3 items -> ৳210, ...
  let deliveryCharge = totalQuantity > 0 ? 150 + (totalQuantity - 1) * 30 : 0;

  if (paymentMethod.id == "dakhgor"){
    deliveryCharge = 50
    console.log(paymentMethod)
  }
  return (
    <div className="w-full min-h-screen bg-[#f3f4f6] py-8 px-4 md:px-8 font-sans">
      <div className="max-w-6xl mx-auto">

        {/* প্রধান শিরোনাম */}
        <h1 className="text-3xl md:text-4xl font-bold text-center text-black mb-8">
          Shopping cart
        </h1>

        {/* গ্রিড লেআউট: বামে শপিং কার্ট এবং ডানে চেকআউট */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

          {/* শপিং কার্ট আইটেম বক্স */}
          <div className="lg:col-span-2 bg-[#85ff10] p-4 md:p-6 rounded-2xl flex flex-col gap-4">

            {cartItems.length === 0 ? (
              <div className="bg-white rounded-xl p-8 text-center font-bold text-gray-500">
                Your cart is empty
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="bg-white rounded-xl p-3 md:p-4 flex gap-3 md:gap-4 items-center relative shadow-sm">

                  {/* প্রোডাক্ট ইমেজ */}
                  <div className="w-16 h-16 md:w-24 md:h-20 bg-[#f4fbf0] rounded-lg overflow-hidden border border-gray-200 flex-shrink-0 flex items-center justify-center relative">
                    <img
                      src={item.image || 'https://via.placeholder.com/150'}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* প্রোডাক্টের বিবরণী */}
                  <div className="flex-1 min-w-0 pr-6">
                    <h3 className="font-bold text-base md:text-lg text-black truncate">
                      {item.name}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-500 mt-0.5">
                      Piece: {item.piece}
                    </p>
                    <p className="text-xs md:text-sm font-semibold text-green-700">
                      Weight: {item.weight}
                    </p>
                  </div>

                  {/* প্রোডাক্ট রিমুভ করার ক্রস বাটন */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="absolute top-3 right-3 text-red-500 hover:text-red-700 transition-colors p-1"
                    aria-label="Remove item"
                  >
                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  {/* পরিমাণ পরিবর্তন করার কাউন্টার */}
                  <div className="absolute bottom-3 right-3 flex items-center bg-[#fce4ec] rounded-full px-2 py-0.5 md:py-1 gap-3 border border-pink-100 shadow-2xs">
                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="text-black font-extrabold text-sm md:text-lg px-1 md:px-2 hover:opacity-70"
                    >
                      −
                    </button>
                    <span className="font-bold text-xs md:text-sm text-black min-w-[12px] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => increaseQty(item.id)}
                      className="text-black font-extrabold text-sm md:text-lg px-1 md:px-2 hover:opacity-70"
                    >
                      +
                    </button>
                  </div>

                </div>
              ))
            )}

          </div>

          {/* চেকআউট সেকশন */}
          <div className="bg-[#85ff10] p-6 rounded-2xl flex flex-col gap-5 shadow-sm">

            <h2 className="text-2xl md:text-3xl font-bold text-black text-center">
              Checkout
            </h2>

            <hr className="border-black border-t-[1.5px] opacity-100" />

            <div className="flex flex-col gap-4 font-bold text-lg md:text-xl text-black">
              <div className="flex justify-between items-center">
                <span>Total Price:</span>
                <span>৳{totalPrice}</span>
              </div>

              <div className="flex justify-between items-center">
                <span>Delivery:</span>
                <span>৳{paymentMethod== "Home" ? deliveryCharge : 50}</span>
              </div>
            </div>

            {/* কুপন কোড সেকশন */}
            <div className="flex flex-col gap-2 mt-2">
              <label className="font-bold text-lg md:text-xl text-black">
                Coupon code:
              </label>
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="w-full bg-white text-gray-700 text-lg md:text-xl font-medium py-3 px-4 rounded-xl border border-gray-300 focus:outline-none shadow-inner"
                placeholder="Enter coupon code"
              />
            </div>

            {PAYMENT_METHODS.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setPaymentMethod(m.id)}
                className={`w-full flex items-center justify-between p-2 mb-0 border-[3px] border-black rounded-xl transition-all ${paymentMethod === m.id ? 'bg-white' : 'bg-transparent'
                  }`}
              >
                <span className="font-bold text-lg">{m.label} {m.emoji}</span>
                {paymentMethod === m.id && <CheckCircle2 className="text-black" />}
              </button>
            ))}



            <p className="text-xs md:text-sm font-bold text-black leading-tight mt-1">
              *Delivery charge must be included before delivery.
            </p>
            <p className="text-xs md:text-sm font-bold text-black leading-tight mt-1 opacity-60">
              By continuing you agree to our terms and conditions.
            </p>

            {/* চেকআউটে যাওয়ার বাটন — route lowercase হওয়ায় href ঠিক করা হলো */}
            {paymentMethod == "Home"? (
            <Link href="/cheackout">
              <button
                disabled={cartItems.length === 0}
                className="w-full bg-black text-white hover:bg-gray-900 transition-colors py-3 px-6 rounded-full font-bold text-base md:text-lg text-center shadow-md active:scale-98 transform duration-75 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Continue To Pay
              </button>
            </Link>): <Link href="/cheackout_dakhgor">
              <button
                disabled={cartItems.length === 0}
                className="w-full bg-black text-white hover:bg-gray-900 transition-colors py-3 px-6 rounded-full font-bold text-base md:text-lg text-center shadow-md active:scale-98 transform duration-75 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Continue To Pay
              </button>
            </Link>}
          </div>

        </div>

      </div>
    </div>
  );
}