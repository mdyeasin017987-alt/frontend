"use client";
import Link from 'next/link';
import React, { useState } from 'react';

export default function App() {
  // শপিং কার্টের আইটেম স্টেট (নারকেলের ওজন এখন ১ কেজি প্রতি পিস হিসেবে ১ বক্সে ৬ কেজি করা হয়েছে)
const [cartItems, setCartItems] = useState([
    { id: 1, name: '6 piece 1 box coconut', piece: 6, weight: '6.0 kg (1 kg/pc)', price: 2500, quantity: 1 },
    { id: 2, name: '6 piece 1 box coconut', piece: 6, weight: '6.0 kg (1 kg/pc)', price: 2500, quantity: 1 },
    { id: 3, name: '6 piece 1 box coconut', piece: 6, weight: '6.0 kg (1 kg/pc)', price: 2500, quantity: 1 },
    { id: 4, name: '6 piece 1 box coconut', piece: 6, weight: '6.0 kg (1 kg/pc)', price: 2500, quantity: 1 },
  ]);

  // কোড ইনপুট স্টেট
  const [couponCode, setCouponCode] = useState('');

  // প্রোডাক্টের পরিমাণ বাড়ানোর ফাংশন
  const increaseQty = (id) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // প্রোডাক্টের পরিমাণ কমানোর ফাংশন
  const decreaseQty = (id) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };

  // প্রোডাক্ট রিমুভ করার ফাংশন (ক্রস বাটনের জন্য)
  const removeItem = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  // ওজন বেশি হওয়ায় প্রতিটি বক্সের জন্য ডেলিভারি চার্জ $১৫০ করে ডায়নামিক করা হলো
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const deliveryCharge = totalQuantity * 150;

  // সাবটোটাল বা প্রাইস হিসাব করা (৪টি আইটেমে ডিফল্ট $১০,০০০ থাকবে)
  const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className="w-full min-h-screen bg-[#f3f4f6] py-8 px-4 md:px-8 font-sans">
      <div className="max-w-6xl mx-auto">

        {/* প্রধান শিরোনাম */}
        <h1 className="text-3xl md:text-4xl font-bold text-center text-black mb-8">
          Shopping cart
        </h1>

        {/* গ্রিড লেআউট: বামে শপিং কার্ট এবং ডানে চেকআউট */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

          {/* শপিং কার্ট আইটেম বক্স (উজ্জ্বল লাইম গ্রিন কন্টেইনার) */}
          <div className="lg:col-span-2 bg-[#85ff10] p-4 md:p-6 rounded-2xl flex flex-col gap-4">

            {cartItems.length === 0 ? (
              <div className="bg-white rounded-xl p-8 text-center font-bold text-gray-500">
                Your cart is empty
              </div>
            ) : (
              cartItems.map((item) => (
                // প্রতিটি আইটেম কার্ড (সাদা ব্যাকগ্রাউন্ড)
                <div key={item.id} className="bg-white rounded-xl p-3 md:p-4 flex gap-3 md:gap-4 items-center relative shadow-sm">

                  {/* প্রোডাক্ট ইমেজ এরিয়া (গ্রিন টি/নারিকেল বক্স আর্ট) */}
                  <div className="w-16 h-16 md:w-24 md:h-20 bg-[#f4fbf0] rounded-lg overflow-hidden border border-gray-200 flex-shrink-0 flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-green-50 flex flex-col justify-between p-1">
                      <span className="text-[8px] md:text-[10px] font-bold text-green-700 bg-white px-1 py-0.5 rounded shadow-xs w-max">
                        গ্রীন ফুড
                      </span>
                      <div className="flex justify-end gap-1">
                        <span className="text-lg">🥥</span>
                        <span className="text-xs">🥭</span>
                      </div>
                    </div>
                  </div>

                  {/* প্রোডাক্টের বিবরণী */}
                  <div className="flex-1 min-w-0 pr-6">
                    <h3 className="font-bold text-base md:text-lg text-black truncate">
                      {item.name}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-500 mt-0.5">
                      Piece: {item.piece}
                    </p>
                    {/* নারকেলের নতুন ওজন প্রদর্শন */}
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

          {/* চেকআউট সেকশন (ডান দিকের উজ্জ্বল লাইম গ্রিন কন্টেইনার) */}
          <div className="bg-[#85ff10] p-6 rounded-2xl flex flex-col gap-5 shadow-sm">

            {/* চেকআউট শিরোনাম */}
            <h2 className="text-2xl md:text-3xl font-bold text-black text-center">
              Checkout
            </h2>

            {/* চেকআউট সেকশনের ডিভাইডার রেখা */}
            <hr className="border-black border-t-[1.5px] opacity-100" />

            {/* হিসাব-নিকাশ তথ্য */}
            <div className="flex flex-col gap-4 font-bold text-lg md:text-xl text-black">

              {/* টোটাল প্রাইস */}
              <div className="flex justify-between items-center">
                <span>Total Price:</span>
                <span>${totalPrice}</span>
              </div>

              {/* ওজনের ভিত্তিতে বৃদ্ধিপ্রাপ্ত ডেলিভারি ফি */}
              <div className="flex justify-between items-center">
                <span>Delivery:</span>
                <span>${deliveryCharge}</span>
              </div>

            </div>

            {/* কুপন কোড সেকশন */}
            <div className="flex flex-col gap-2 mt-2">
              <label className="font-bold text-lg md:text-xl text-black">
                Cupon code:
              </label>
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="w-full bg-white text-gray-700 text-lg md:text-xl font-medium py-3 px-4 rounded-xl border border-gray-300 focus:outline-none shadow-inner"
                placeholder="Enter coupon code"
              />
            </div>

            {/* শর্তাবলী সেকশন */}
            <p className="text-xs md:text-sm font-bold text-black leading-tight mt-1">
              *Delivery charge must be included Before Delivery.
            </p>
            <p className="text-xs md:text-sm font-bold text-black leading-tight mt-1 opacity-60">
              By contnue you agree out tems and conditions.
            </p>

            {/* পেমেন্ট বাটন */}
           <Link href={"/Cheackout"}> <button className="w-full bg-black text-white hover:bg-gray-900 transition-colors py-3 px-6 rounded-full font-bold text-base md:text-lg text-center shadow-md active:scale-98 transform duration-75">
              Contune To Pay
            </button>
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}