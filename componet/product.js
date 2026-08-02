"use client";
import React from 'react';
import { ShoppingCart, Star } from 'lucide-react';
import { products } from '../app/assart';
import Link from 'next/link';
import { useCart } from '@/app/context/CartContext';


// Product Data Array


// Reusable Product Card Component
const ProductCard = ({ id, price, rating, description, image, title, piece, weight }) => {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({ id, price, title, description, image, piece, weight });
  };

  return (
    <div className="w-full bg-[#fdfdfd] border border-black rounded-[24px] overflow-hidden flex flex-col mx-auto sm:mx-0">
      {/* Image Area */}
      <div className="h-40 flex items-center justify-center border-b border-black bg-white">
        <img
          src={image || 'https://via.placeholder.com/150'} // Placeholder image if none provided
          alt="Product"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Card Details Area */}
      <div className="p-4 flex flex-col bg-[#fdfdfd] flex-grow">
        <div className="flex justify-between items-start mb-2">
          {/* Price */}
          <span className="text-[22px] font-extrabold text-black leading-none mt-1">
            ৳{price}
          </span>

          {/* Rating */}
         
        </div>

        {/* Description */}
        <p className="text-[15px] font-medium text-black leading-tight mb-4 flex-grow">
          {description}
        </p>

        {/* Action Button */}
        <div className="flex gap-2 mt-auto">
        <button
          onClick={handleAddToCart}
          className="bg-black hover:bg-gray-800 transition-colors text-white rounded-xl py-2 px-3 flex items-center justify-center gap-2 w-max text-sm font-medium mt-auto"
        >
          <ShoppingCart size={16} />
          Add to Cart
        </button>
        <Link href={`/product/${id}`}>
        
        <button className="transition-colors text-black rounded-xl py-2 px-3 flex items-center justify-center gap-2 w-max text-sm font-medium mt-auto">
        
          View Product
        </button>
        </Link>
        </div>
      </div>
    </div>
  );
};

// Main App Component
export default function App() {
  return (
    // Background color matching the design
    <div className="min-h-screen --var(--background) p-6 md:p-12 font-sans">

      {/* Heading with specific underline design */}
      <h1 className="text-xl md:text-2xl font-bold text-black mb-10">
        <span className="border-b-[2px] border-black pb-1">
          Our coconut and other products.
        </span>
      </h1>

      {/* Responsive Grid for Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8">

        {/* Mapping through the products array to render cards */}
        {products.map((product) => (
          <ProductCard 
            key={product.id}
            price={product.price}
            rating={product.rating}
            description={product.description}
            image={product.image}
            title={product.title}
            piece={product.piece}
            weight={product.weight}
            id={product.id}
          />
        ))}

      </div>
    </div>
  );
}