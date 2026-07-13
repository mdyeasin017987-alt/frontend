import React from 'react';
import { ShoppingCart, Star } from 'lucide-react';

// Product Data Array
const products = [
  {
    id: 1,
    price: "500",
    rating: "4.9",
    description: "Desi coconut pure coconut and size abilable."
  },
  {
    id: 2,
    price: "350",
    rating: "4.7",
    description: "Fresh green tender coconut for sweet drinking water."
  },
  {
    id: 3,
    price: "800",
    rating: "5.0",
    description: "Premium quality dry coconut (Copra) for cooking."
  },
  {
    id: 4,
    price: "120",
    rating: "4.5",
    description: "Cold-pressed pure organic coconut oil 100ml."
  },
  {
    id: 5,
    price: "250",
    rating: "4.8",
    description: "Organic coconut milk powder tightly packed."
  },
  {
    id: 6,
    price: "400",
    rating: "4.6",
    description: "Roasted coconut flakes, sweet and crunchy taste."
  },
  {
    id: 7,
    price: "600",
    rating: "4.9",
    description: "Handmade natural coconut shell crafts and bowls."
  },
  {
    id: 8,
    price: "150",
    rating: "4.4",
    description: "Fresh coconut water in sterile tetra packs."
  }
];

// Reusable Product Card Component
const ProductCard = ({ price, rating, description }) => {
  return (
    <div className="w-full bg-[#fdfdfd] border border-black rounded-[24px] overflow-hidden flex flex-col mx-auto sm:mx-0">
      {/* Image Area */}
      <div className="h-40 flex items-center justify-center border-b border-black bg-white">
        <span className="text-xl font-medium text-black">image</span>
      </div>

      {/* Card Details Area */}
      <div className="p-4 flex flex-col bg-[#fdfdfd] flex-grow">
        <div className="flex justify-between items-start mb-2">
          {/* Price */}
          <span className="text-[22px] font-extrabold text-black leading-none mt-1">
            ${price}
          </span>

          {/* Rating */}
          <div className="flex flex-col items-center">
            <span className="text-[15px] font-bold text-black leading-none mb-1">
              {rating}
            </span>
            <div className="flex gap-[2px]">
              {/* Rendering 5 outlined stars like the design */}
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={10} className="text-black" strokeWidth={2.5} />
              ))}
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-[15px] font-medium text-black leading-tight mb-4 flex-grow">
          {description}
        </p>

        {/* Action Button */}
        <button className="bg-black hover:bg-gray-800 transition-colors text-white rounded-xl py-2 px-3 flex items-center justify-center gap-2 w-max text-sm font-medium mt-auto">
          <ShoppingCart size={16} />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

// Main App Component
export default function App() {
  return (
    // Background color matching the design
    <div className="min-h-screen bg-[#9af41b] p-6 md:p-12 font-sans">

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
          />
        ))}

      </div>
    </div>
  );
}