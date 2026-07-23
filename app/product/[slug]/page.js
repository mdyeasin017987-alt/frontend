"use client";
import React, { useState } from 'react';
import {products} from '@/app/assart';
import { useParams } from 'next/navigation';

export default function App() {
  const { slug } = useParams();
  const product = products.find((p) => p.id === parseInt(slug));

  // ১. সাইজ নির্বাচনের জন্য স্টেট
  const [selectedSize, setSelectedSize] = useState('500-700 gm');

  // ২. প্রোডাক্টের পরিমাণের জন্য স্টেট 
  const [quantity, setQuantity] = useState(1);

  // ৩. থাম্বনেইল পরিবর্তনের জন্য স্টেট (ডামি থাম্বনেইল ট্র্যাক করার জন্য)
  const [activeThumb, setActiveThumb] = useState(2); // ডিফল্ট ৩ নম্বর থাম্বনেইল সিলেক্টেড (ইমেজ অনুযায়ী)

  // পরিমাণ বাড়ানোর হ্যান্ডলার
  const handleIncrease = () => setQuantity(prev => prev + 1);

  // পরিমাণ কমানোর হ্যান্ডলার
  const handleDecrease = () => {
    if (quantity > 1) setQuantity(prev => prev - 1);
  };

  // থাম্বনেইলগুলোর জন্য ডামি এসভিজি (SVG) ডেটা
  const thumbnails = [
    {
      id: 0,
      title: "Web Layout",
      // প্রথম থাম্বনেইল: নীল ও ধূসর ওয়েব লেআউট
      svg: (
        <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
          <rect width="100" height="100" fill="#2d3748" />
          <rect x="10" y="10" width="80" height="40" rx="4" fill="#4a5568" />
          <line x1="10" y1="65" x2="60" y2="65" stroke="#a0aec0" strokeWidth="4" strokeLinecap="round" />
          <line x1="10" y1="75" x2="45" y2="75" stroke="#a0aec0" strokeWidth="4" strokeLinecap="round" />
          <rect x="10" y="85" width="25" height="8" rx="4" fill="#319795" />
        </svg>
      )
    },
    {
      id: 1,
      title: "T-Shirt",
      // দ্বিতীয় থাম্বনেইল: গ্রে ব্যাকগ্রাউন্ডে সাদা টি-শার্ট
      svg: (
        <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
          <rect width="100" height="100" fill="#cbd5e1" />
          <path d="M50 20 C42 20 38 24 35 27 L20 22 L15 35 L28 40 L28 85 L72 85 L72 40 L85 35 L80 22 L65 27 C62 24 58 20 50 20 Z" fill="white" stroke="#94a3b8" strokeWidth="2" />
        </svg>
      )
    },
    {
      id: 2,
      title: "Coconut Banner",
      // তৃতীয় থাম্বনেইল: মূল গ্রিন নারিকেল বক্স ব্যানার
      svg: (
        <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
          <rect width="100" height="100" fill="#a7f3d0" />
          <circle cx="50" cy="50" r="30" fill="#059669" opacity="0.2" />
          {/* নারকেলের কার্টুন আকৃতি */}
          <circle cx="45" cy="45" r="20" fill="#10b981" />
          <ellipse cx="65" cy="55" r="15" rx="15" ry="12" fill="#34d399" />
          <path d="M40 25 C45 15 55 15 60 25" stroke="#047857" strokeWidth="3" strokeLinecap="round" />
          {/* বাংলা টেক্সট 'গ্রীন' এর ডামি উপস্থাপনা */}
          <rect x="20" y="70" width="60" height="8" rx="2" fill="#047857" />
          <rect x="30" y="82" width="40" height="6" rx="2" fill="#f59e0b" />
        </svg>
      )
    }
  ];

  return (
    // মূল ব্যাকগ্রাউন্ড ফ্রেম
    <div className="w-full min-h-screen --var(--background) flex items-center justify-center p-4 md:p-8">

      {/* প্রোডাক্ট ডিটেইলস কন্টেইনার (উজ্জ্বল লাইম গ্রিন ব্যাকগ্রাউন্ড) */}
      <div className="w-full max-w-full --var(--background) text-black font-sans p-6 md:p-12 lg:p-16 rounded-[2.5rem] shadow-sm select-none">

        {/* দুই কলাম গ্রিড লেআউট */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">

          {/* বাম দিক: মেইন ইমেজ এবং ডামি থাম্বনেইলসমূহ */}
          <div className="flex flex-col items-center md:items-start w-full">

            {/* বড় ডামি মেইন ইমেজ বক্স (থাম্বনেইল অনুযায়ী পরিবর্তিত হবে) */}
            <div className="w-full aspect-square md:aspect-[4/3] lg:aspect-square bg-white rounded-3xl overflow-hidden shadow-xs border border-green-200 transition-all duration-300">
              {thumbnails[activeThumb].svg}
            </div>

            {/* থাম্বনেইল গ্যালারি রো */}
            <div className="flex gap-4 mt-6">
              {thumbnails.map((thumb) => (
                <button
                  key={thumb.id}
                  onClick={() => setActiveThumb(thumb.id)}
                  className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden border-2 bg-white transition-all shadow-xs ${
                    activeThumb === thumb.id ? 'border-black scale-105' : 'border-transparent hover:border-gray-400'
                  }`}
                  aria-label={`View ${thumb.title}`}
                >
                  {thumb.svg}
                </button>
              ))}
            </div>

          </div>

          {/* ডান দিক: প্রোডাক্ট তথ্য ও বিবরণী */}
          <div className="flex flex-col text-black">

            {/* টাইটেল */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-black leading-tight">
              {product.title}
            </h1>

            {/* নির্দেশনা অনুযায়ী এখানে কোনো Rating (স্টার/৪.৫) দেওয়া হয়নি */}

            {/* প্রাইস */}
            <div className="text-4xl md:text-5xl font-black mt-4 mb-2">
              ${product.price}
            </div>

            {/* বিবরণী (হুবহু ইমেজ অনুযায়ী বানান সহ) */}
            <p className="text-sm md:text-base font-semibold opacity-90 leading-relaxed mb-6 max-w-md">
              {product.description}
            </p>

            {/* সাইজ সিলেকশন সেকশন */}
            <div className="mb-6">
              <h3 className="text-lg md:text-xl font-bold mb-3">
                Size
              </h3>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setSelectedSize('500-700 gm')}
                  className={`px-5 py-2 rounded-full font-bold text-sm md:text-base border transition-all ${
                    selectedSize === '500-700 gm'
                      ? 'bg-black text-white border-black'
                      : 'bg-[#fce4ec] text-black border-pink-200 hover:bg-pink-100'
                  }`}
                >
                  500-700 gm
                </button>
                <button
                  onClick={() => setSelectedSize('1 Kg+')}
                  className={`px-5 py-2 rounded-full font-bold text-sm md:text-base border transition-all ${
                    selectedSize === '1 Kg+'
                      ? 'bg-black text-white border-black'
                      : 'bg-[#fce4ec] text-black border-pink-200 hover:bg-pink-100'
                  }`}
                >
                  1 Kg+
                </button>
              </div>
            </div>

            {/* কোয়ান্টিটি কাউন্টার সেকশন */}
            <div className="mb-8">
              <h3 className="text-lg md:text-xl font-bold mb-3 lowercase">
                quantity
              </h3>
              <div className="flex items-center justify-between bg-[#fce4ec] rounded-full px-4 py-2 w-32 border border-pink-200 shadow-3xs">
                <button
                  onClick={handleDecrease}
                  className="text-black font-black text-lg md:text-xl px-2 active:opacity-50"
                >
                  −
                </button>
                <span className="font-bold text-base md:text-lg text-black">
                  {quantity}
                </span>
                <button
                  onClick={handleIncrease}
                  className="text-black font-black text-lg md:text-xl px-2 active:opacity-50"
                >
                  +
                </button>
              </div>
            </div>

            {/* কার্ট বাটন */}
            <button className="w-full md:w-max md:px-16 bg-black text-white hover:bg-gray-900 transition-all py-4 rounded-full font-extrabold text-lg text-center shadow-md active:scale-98 transform duration-75">
              Add To Cart
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}