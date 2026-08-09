"use client";
import React, { useState } from 'react';
import { products } from '@/app/assart';
import { useParams, useRouter } from 'next/navigation';
import { useCart } from '@/app/context/CartContext';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const router = useRouter();
  const { addItem } = useCart();

  const product = products.find((p) => p.id === parseInt(slug, 10));

  // পরিমাণের জন্য স্টেট
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleAddToCart = () => {
    if (!product) return;
    addItem({
      id: product.id,
      price: product.price,
      title: product.title,
      description: product.description,
      image: product.image,
      piece: product.piece,
      weight: product.weight,
      quantity: quantity
    });
  };

  // ------- গুরুত্বপূর্ণ গার্ড: প্রোডাক্ট না পাওয়া গেলে এখানেই return করি -------
  // slug ভুল হলে বা প্রোডাক্ট মুছে ফেলা হলে product === undefined হবে;
  // guard ছাড়া নিচের product.title ইত্যাদি অ্যাক্সেস করলে অ্যাপ ক্র্যাশ করত।
  if (!product) {
    return (
      <div className="w-full min-h-screen bg-background flex flex-col items-center justify-center p-8 text-center">
        <h1 className="text-3xl font-black mb-2">Product not found</h1>
        <p className="font-semibold mb-6">
          The product you're looking for doesn't exist or may have been removed.
        </p>
        <button
          onClick={() => router.push('/')}
          className="bg-black text-white font-bold px-8 py-3 rounded-full"
        >
          Back to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-background flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-full bg-background text-black font-sans p-6 md:p-12 lg:p-16 rounded-[2.5rem] shadow-sm select-none">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">

          {/* বাম দিক: প্রোডাক্ট ইমেজ */}
          <div className="flex flex-col items-center md:items-start w-full">
            <div className="w-full aspect-square md:aspect-[4/3] lg:aspect-square bg-white rounded-3xl overflow-hidden shadow-xs border border-green-200 transition-all duration-300">
              <img
                src={product.image || 'https://via.placeholder.com/500'}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* ডান দিক: প্রোডাক্ট তথ্য ও বিবরণী */}
          <div className="flex flex-col text-black">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-black leading-tight">
              {product.title}
            </h1>

            <div className="text-4xl md:text-5xl font-black mt-4 mb-2">
              ৳{product.price}
            </div>

            <p className="text-sm md:text-base font-semibold opacity-90 leading-relaxed mb-2 max-w-md">
              {product.description}
            </p>

            <p className="text-sm md:text-base font-semibold text-green-700 mb-6">
              {product.piece} piece · {product.weight}
            </p>

            {/* কোয়ান্টিটি কাউন্টার সেকশন */}
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
            <button
              onClick={handleAddToCart}
              className="w-full md:w-max md:px-16 bg-black text-white hover:bg-gray-900 transition-all py-4 rounded-full font-extrabold text-lg text-center shadow-md active:scale-98 transform duration-75"
            >
              Add To Cart
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}