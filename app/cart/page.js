"use client";
import React, { useState } from 'react';
import { X, Minus, Plus } from 'lucide-react';

const ShoppingCartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: '6 piece 1 box coconut',
      piece: 6,
      weight: '1.5 kg',
      price: 2500,
      quantity: 1,
    },
    {
      id: 2,
      title: '6 piece 1 box coconut',
      piece: 6,
      weight: '1.5 kg',
      price: 2500,
      quantity: 1,
    },
    {
      id: 3,
      title: '6 piece 1 box coconut',
      piece: 6,
      weight: '1.5 kg',
      price: 2500,
      quantity: 1,
    },
    {
      id: 4,
      title: '6 piece 1 box coconut',
      piece: 6,
      weight: '1.5 kg',
      price: 2500,
      quantity: 1,
    },
  ]);

  const deliveryFee = 150;
  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  const handleQuantityChange = (id, delta) => {
    setCartItems(cartItems.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + delta;
        return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 };
      }
      return item;
    }));
  };

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-8 font-sans text-black">
      <h1 className="text-3xl md:text-[40px] font-bold text-center mb-8 md:mb-10">
        Shopping cart
      </h1>

      <div className="flex flex-col lg:flex-row gap-6 md:gap-8 items-start">
        {/* Cart Items */}
        <div className="w-full lg:flex-1 bg-[#9af41b] rounded-[20px] p-4 md:p-6 flex flex-col gap-4">
          {cartItems.length === 0 ? (
            <div className="text-center font-bold text-xl py-10 bg-white rounded-2xl">
              Cart is empty!
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="bg-white rounded-[16px] p-3 flex gap-4 w-full relative items-center shadow-sm">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0 border border-gray-200 overflow-hidden">
                  <span className="text-xs md:text-sm font-bold text-gray-400 text-center px-1"></span>
                </div>
                <div className="flex-1 flex flex-col justify-center pb-1">
                  <h3 className="font-bold text-[17px] md:text-lg leading-tight mb-1 pr-6">{item.title}</h3>
                  <p className="text-[13px] md:text-sm font-medium text-gray-800">Piece: {item.piece}</p>
                  <p className="text-[13px] md:text-sm font-medium text-gray-800">Weight: {item.weight}</p>
                </div>
                <div className="flex flex-col items-end justify-between self-stretch py-1">
                  <button onClick={() => handleRemoveItem(item.id)} className="text-[#d32f2f] hover:bg-red-50 p-1 rounded-full transition-colors mb-auto" aria-label="Remove item">
                    <X size={20} strokeWidth={3} />
                  </button>
                  <div className="bg-[#ffcdd2] rounded-full px-3 py-[6px] flex items-center gap-3 mt-2">
                    <button onClick={() => handleQuantityChange(item.id, -1)} className="text-black font-extrabold text-sm hover:opacity-70 transition-opacity flex items-center justify-center">
                      <Minus size={14} strokeWidth={3} />
                    </button>
                    <span className="font-bold text-sm min-w-[12px] text-center select-none">{item.quantity}</span>
                    <button onClick={() => handleQuantityChange(item.id, 1)} className="text-black font-extrabold text-sm hover:opacity-70 transition-opacity flex items-center justify-center">
                      <Plus size={14} strokeWidth={3} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Checkout Box */}
        <div className="w-full lg:w-[380px] bg-[#9af41b] rounded-[20px] p-6 lg:sticky lg:top-8 flex-shrink-0">
          <h2 className="text-2xl font-bold text-center mb-3">Checkout</h2>
          <div className="w-full h-[2px] bg-black mb-5"></div>
          <div className="flex justify-between items-center mb-4 font-bold text-[17px]">
            <span>Total Price:</span>
            <span>${totalPrice}</span>
          </div>
          <div className="flex justify-between items-center mb-8 font-bold text-[17px]">
            <span>Delivery:</span>
            <span>${deliveryFee}</span>
          </div>
          <div className="mb-4">
            <label className="block font-bold text-[17px] mb-2">Coupon code:</label>
            <input type="text" placeholder="Farhan 50" className="w-full rounded-lg px-4 py-3 font-medium border border-gray-300 focus:outline-none focus:border-black shadow-sm placeholder:text-gray-400" />
          </div>
          <p className="text-sm font-medium mb-6 leading-tight pr-4">By continue you agree our terms and conditions.</p>
          <button className="w-full bg-black text-white font-bold text-[17px] py-4 rounded-xl hover:bg-gray-800 transition-colors active:scale-[0.98]">
            Continue To Pay
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartPage;
