"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Truck, Package, Home, MapPin } from 'lucide-react';

export default function DeliveryInfoPage() {
  const [selectedDelivery, setSelectedDelivery] = useState('home');

  const deliverySteps = [
    {
      id: 1,
      title: 'Collect from Farmer',
      icon: '🌾',
      description: 'We personally collect fresh, organic coconuts directly from trusted local farmers. Each coconut is hand-picked to ensure the highest quality and freshness.',
      details: [
        'Direct sourcing from organic farms',
        'Quality inspection at collection',
        'Same-day processing begins',
      ],
    },
    {
      id: 2,
      title: 'Packaging',
      icon: '📦',
      description: 'Every coconut is carefully cleaned, inspected, and professionally packaged to maintain freshness and prevent any damage during transit.',
      details: [
        'Cleaning and quality check',
        'Protective wrapping',
        'Safe packing materials',
        'Ready for shipment',
      ],
    },
  ];

  const deliveryOptions = [
    {
      id: 'home',
      title: 'Home Delivery',
      icon: '🚚',
      description: 'Get your fresh coconuts delivered straight to your doorstep. Fast and convenient.',
      features: [
        'Doorstep delivery',
        'Track your order',
        'Safe handling',
        'Time slot selection',
      ],
      color: 'bg-green-50 border-green-300',
      textColor: 'text-green-700',
    },
    {
      id: 'dakhgor',
      title: 'Dakhgor Pickup',
      icon: '🏪',
      description: 'Pick up your order from our Dakhgor location. Fresh and ready to collect.',
      features: [
        'Local pickup point',
        'Flexible pickup hours',
        'Quality assured',
        'Supporting local distribution',
      ],
      color: 'bg-amber-50 border-amber-300',
      textColor: 'text-amber-700',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50">
      {/* Header */}
      <div className="bg-[#0f2e18] text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">How We Deliver</h1>
          <p className="text-lg text-green-100">From our farm to your table, with care at every step</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        
        {/* Delivery Steps */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#0f2e18] mb-10 text-center">Our Process</h2>
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {deliverySteps.map((step) => (
              <div
                key={step.id}
                className="bg-white border-2 border-[#0f2e18] rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="text-5xl">{step.icon}</div>
                  <div>
                    <div className="text-sm font-bold text-[#0f2e18] bg-green-200 w-fit px-3 py-1 rounded">
                      STEP {step.id}
                    </div>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-[#0f2e18] mb-3">{step.title}</h3>
                <p className="text-gray-700 mb-6 leading-relaxed">{step.description}</p>

                <ul className="space-y-3">
                  {step.details.map((detail, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-gray-700">
                      <span className="text-green-600 font-bold">✓</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Delivery Options */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#0f2e18] mb-10 text-center">Choose Your Delivery Method</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {deliveryOptions.map((option) => (
              <div
                key={option.id}
                onClick={() => setSelectedDelivery(option.id)}
                className={`cursor-pointer rounded-2xl p-8 border-2 transition-all transform hover:scale-105 ${
                  selectedDelivery === option.id
                    ? `${option.color} scale-105`
                    : 'bg-white border-gray-300'
                }`}
              >
                <div className="text-5xl mb-4">{option.icon}</div>
                <h3 className={`text-2xl font-bold mb-3 ${
                  selectedDelivery === option.id ? option.textColor : 'text-gray-800'
                }`}>
                  {option.title}
                </h3>
                <p className={`mb-6 ${
                  selectedDelivery === option.id ? option.textColor : 'text-gray-600'
                }`}>
                  {option.description}
                </p>

                <div className="space-y-3">
                  {option.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        selectedDelivery === option.id ? option.textColor.replace('text-', 'bg-') : 'bg-gray-400'
                      }`} />
                      <span className={
                        selectedDelivery === option.id ? option.textColor : 'text-gray-700'
                      }>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {selectedDelivery === option.id && (
                  <div className={`mt-6 p-3 rounded-lg ${option.color} text-center font-semibold`}>
                    ✓ Selected
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
            <p className="text-blue-900 font-medium">
              <span className="font-bold">💡 Pro Tip:</span> Choose home delivery for convenience or Dakhgor pickup to support local distribution. Both methods ensure your coconuts arrive fresh and in perfect condition.
            </p>
          </div>
        </section>

        {/* Pricing Info */}
        <section className="bg-white border-2 border-[#0f2e18] rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#0f2e18] mb-6">Delivery Pricing</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-bold text-[#0f2e18] mb-4 flex items-center gap-2">
                <span className="text-2xl">🚚</span> Home Delivery
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex justify-between">
                  <span>Dhaka City:</span>
                  <span className="font-bold">৳50-100</span>
                </li>
                <li className="flex justify-between">
                  <span>Outside Dhaka:</span>
                  <span className="font-bold">৳200+</span>
                </li>
                <li className="text-sm text-gray-500 mt-4">Free delivery on orders above ৳2000</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold text-[#0f2e18] mb-4 flex items-center gap-2">
                <span className="text-2xl">🏪</span> Dakhgor Pickup
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex justify-between">
                  <span>Pickup Fee:</span>
                  <span className="font-bold">FREE</span>
                </li>
                <li className="text-sm text-gray-500 mt-4">Save on delivery costs</li>
                <li className="text-sm text-gray-500">Fresh from warehouse</li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-[#0f2e18] to-green-700 text-white rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Order?</h2>
          <p className="text-lg mb-8">Browse our fresh coconut selection and choose your delivery method at checkout</p>
          <Link href="/products">
            <button className="bg-white text-[#0f2e18] font-bold py-3 px-8 rounded-lg hover:bg-green-100 transition-colors text-lg">
              Browse Products
            </button>
          </Link>
        </section>
      </div>
    </div>
  );
}
