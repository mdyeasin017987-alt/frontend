"use client";
import React, { useState } from 'react';
import { Star, Minus, Plus } from 'lucide-react';

// Product Detail Component - এটি আলাদা পেজ হিসেবে ব্যবহার করবেন
const ProductDetail = () => {
  // Array for thumbnail images
  const productImages = [
    { id: 1, label: 'Thumb 1', src: '' },
    { id: 2, label: 'Thumb 2', src: '' },
    { id: 3, label: 'Thumb 3', src: '' }
  ];

  // State for interactive elements
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('500-700 gm');
  const [activeImage, setActiveImage] = useState(productImages[0]); // State for selected image

  // Quantity Handlers
  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };
  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row gap-8 lg:gap-16 items-start justify-center text-black">

      {/* Left Column: Images Area */}
      <div className="w-full md:w-1/2 flex flex-col gap-4">
        {/* Main Image */}
        <div className="w-full aspect-square md:aspect-auto md:h-[400px] bg-white rounded-[32px] overflow-hidden flex items-center justify-center shadow-sm border border-gray-100 transition-all duration-300">
          <span className="text-xl md:text-2xl font-bold text-gray-400">{activeImage.src}</span>
        </div>

        {/* Thumbnails Mapped from Array */}
        <div className="flex gap-4">
          {productImages.map((img) => (
            <div 
              key={img.id}
              onClick={() => setActiveImage(img)}
              className={`w-[80px] h-[80px] bg-white rounded-2xl overflow-hidden flex items-center justify-center cursor-pointer border-2 transition-colors ${
                activeImage.id === img.id ? 'border-black' : 'border-transparent hover:border-gray-300'
              }`}
            >
              <span className="text-xs font-bold text-gray-400">{img.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Column: Product Info Area */}
      <div className="w-full md:w-1/2 flex flex-col justify-center pt-2 md:pt-4">

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-extrabold mb-3 leading-tight">
          6 Piece 1 Box Pure Coconut
        </h1>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex gap-[2px]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} className="text-black" strokeWidth={2.5} />
            ))}
          </div>
          <span className="font-bold text-lg mt-[2px]">4.5</span>
        </div>

        {/* Price & Subtitle */}
        <div className="mb-6">
          <h2 className="text-4xl font-extrabold mb-2">$400</h2>
          <p className="font-semibold text-[15px] md:text-base">
            Best Coconut in market you wouldn't try
          </p>
        </div>

        {/* Size Selection */}
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-3">Size</h3>
          <div className="flex gap-4">
            <button 
              onClick={() => setSelectedSize('500-700 gm')}
              className={`px-5 py-2 rounded-full font-bold text-sm transition-colors ${
                selectedSize === '500-700 gm' 
                  ? 'bg-[#ffb6c1] shadow-sm' 
                  : 'bg-[#ffb6c1]/70 hover:bg-[#ffb6c1]'
              }`}
            >
              500-700 gm
            </button>
            <button 
              onClick={() => setSelectedSize('1 Kg+')}
              className={`px-5 py-2 rounded-full font-bold text-sm transition-colors ${
                selectedSize === '1 Kg+' 
                  ? 'bg-[#ffb6c1] shadow-sm' 
                  : 'bg-[#ffb6c1]/70 hover:bg-[#ffb6c1]'
              }`}
            >
              1 Kg+
            </button>
          </div>
        </div>

        {/* Quantity Selection */}
        <div className="mb-8">
          <h3 className="text-lg font-bold mb-3">quantity</h3>
          <div className="inline-flex items-center justify-between bg-[#ffb6c1] rounded-full px-4 py-2 w-32">
            <button 
              onClick={handleDecrease}
              className="text-black font-extrabold hover:opacity-70 transition-opacity p-1"
            >
              <Minus size={18} strokeWidth={3} />
            </button>
            <span className="font-extrabold text-base w-6 text-center select-none">
              {quantity}
            </span>
            <button 
              onClick={handleIncrease}
              className="text-black font-extrabold hover:opacity-70 transition-opacity p-1"
            >
              <Plus size={18} strokeWidth={3} />
            </button>
          </div>
        </div>

        {/* Add To Cart Button */}
        <button className="w-full max-w-sm bg-black text-white font-bold text-xl py-4 rounded-[100px] hover:bg-gray-800 transition-colors shadow-lg active:scale-[0.98]">
          Add To Cart
        </button>

      </div>
    </div>
  );
};

export default ProductDetail;