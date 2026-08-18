"use client";
import React from 'react';
import Link from 'next/link';

export default function AboutPage() {
  const values = [
    {
      icon: '🌱',
      title: 'Organic & Pure',
      description: 'We only grow and deliver 100% organic coconuts with zero pesticides or chemicals.'
    },
    {
      icon: '👨‍🌾',
      title: 'Farmer Direct',
      description: 'Direct partnerships with local farmers ensure fair prices and quality control.'
    },
    {
      icon: '🤝',
      title: 'Community First',
      description: 'We support local communities and sustainable farming practices.'
    },
    {
      icon: '🏆',
      title: 'Quality Assured',
      description: 'Every coconut is inspected and tested for freshness and quality.'
    }
  ];

  const stats = [
    { number: '5+', label: 'Years of Service' },
    { number: '10K+', label: 'Happy Customers' },
    { number: '50+', label: 'Partner Farms' },
    { number: '100%', label: 'Organic' }
  ];

  const team = [
    {
      role: 'Founder & CEO',
      description: 'Passionate about bringing fresh, organic coconuts to your doorstep with a commitment to sustainability.'
    },
    {
      role: 'Quality Manager',
      description: 'Ensures every coconut meets our high standards before it reaches you.'
    },
    {
      role: 'Customer Care',
      description: 'Here to help with any questions or concerns about your order.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#0f2e18] to-green-800 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">About SahyesNatural</h1>
          <p className="text-xl text-green-100 leading-relaxed">
            Bringing fresh, organic coconuts from farms to your home with passion and care
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        
        {/* Our Story Section */}
        <section className="mb-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-[#0f2e18] mb-6">Our Story</h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                SahyesNatural started with a simple vision: to deliver the freshest, most organic coconuts directly from local farms to families across Bangladesh.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                We realized that many people were tired of compromised quality and unhealthy additives in their produce. So we decided to build something different—a supply chain that prioritizes quality, sustainability, and fair treatment of farmers.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                Today, we're proud to serve over 10,000 families who trust us for their organic coconut needs. Every coconut we deliver represents our commitment to health, sustainability, and community.
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-100 to-green-50 rounded-3xl p-12 shadow-lg">
              <div className="text-center">
                <div className="text-9xl mb-6">🥥</div>
                <p className="text-[#0f2e18] font-bold text-xl">
                  Fresh. Organic. Local.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-[#0f2e18] mb-12 text-center">Our Mission & Vision</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-green-50 border-2 border-[#0f2e18] rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-[#0f2e18] mb-4 flex items-center gap-3">
                <span className="text-3xl">🎯</span> Our Mission
              </h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                To provide 100% organic, fresh coconuts directly from trusted farms to every doorstep, ensuring health, quality, and fair compensation for our farming partners.
              </p>
            </div>
            <div className="bg-amber-50 border-2 border-amber-400 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-amber-900 mb-4 flex items-center gap-3">
                <span className="text-3xl">✨</span> Our Vision
              </h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                To become Bangladesh's most trusted source for organic coconuts, leading a movement towards sustainable agriculture and healthier living.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-[#0f2e18] mb-12 text-center">Our Core Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, idx) => (
              <div key={idx} className="bg-white border-2 border-green-200 rounded-xl p-6 hover:shadow-lg transition-shadow text-center">
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-[#0f2e18] mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="mb-20 bg-gradient-to-r from-[#0f2e18] to-green-700 rounded-3xl p-12 text-white">
          <h2 className="text-4xl font-bold mb-12 text-center">Our Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, idx) => (
              <div key={idx}>
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-green-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-[#0f2e18] mb-12 text-center">Why Choose SahyesNatural?</h2>
          <div className="space-y-6">
            <div className="flex gap-6 items-start bg-green-50 p-6 rounded-xl">
              <span className="text-4xl flex-shrink-0">🚜</span>
              <div>
                <h3 className="text-xl font-bold text-[#0f2e18] mb-2">Direct from Farms</h3>
                <p className="text-gray-700">We work directly with local farmers, eliminating middlemen and ensuring you get the freshest coconuts at fair prices.</p>
              </div>
            </div>

            <div className="flex gap-6 items-start bg-green-50 p-6 rounded-xl">
              <span className="text-4xl flex-shrink-0">✅</span>
              <div>
                <h3 className="text-xl font-bold text-[#0f2e18] mb-2">Quality Guaranteed</h3>
                <p className="text-gray-700">Every coconut undergoes rigorous inspection and testing. We guarantee freshness and quality or your money back.</p>
              </div>
            </div>

            <div className="flex gap-6 items-start bg-green-50 p-6 rounded-xl">
              <span className="text-4xl flex-shrink-0">🌍</span>
              <div>
                <h3 className="text-xl font-bold text-[#0f2e18] mb-2">Sustainable Practices</h3>
                <p className="text-gray-700">We're committed to environmental sustainability and support farming methods that protect our planet.</p>
              </div>
            </div>

            <div className="flex gap-6 items-start bg-green-50 p-6 rounded-xl">
              <span className="text-4xl flex-shrink-0">📦</span>
              <div>
                <h3 className="text-xl font-bold text-[#0f2e18] mb-2">Safe & Fast Delivery</h3>
                <p className="text-gray-700">We carefully package every order and deliver it fresh to your doorstep or pickup location of choice.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-[#0f2e18] mb-12 text-center">Our Team</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            We're a passionate team dedicated to bringing you the best organic coconuts. Every member is committed to quality, sustainability, and customer satisfaction.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, idx) => (
              <div key={idx} className="bg-white border-2 border-[#0f2e18] rounded-2xl p-8 text-center hover:shadow-lg transition-shadow">
                <div className="text-6xl mb-6">👤</div>
                <h3 className="text-xl font-bold text-[#0f2e18] mb-2">{member.role}</h3>
                <p className="text-gray-600">{member.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact CTA */}
        <section className="bg-gradient-to-r from-[#0f2e18] to-green-700 text-white rounded-3xl p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Have Questions?</h2>
          <p className="text-lg text-green-100 mb-8">We'd love to hear from you! Get in touch with our team anytime.</p>
          <Link href="/contact">
            <button className="bg-white text-[#0f2e18] font-bold py-3 px-8 rounded-lg hover:bg-green-100 transition-colors text-lg">
              Contact Us
            </button>
          </Link>
        </section>

        {/* Products CTA */}
        <section className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-[#0f2e18] mb-4">Ready to Experience Fresh Organic Coconuts?</h2>
          <p className="text-gray-600 text-lg mb-8">Browse our collection and place your order today</p>
          <Link href="/products">
            <button className="bg-[#0f2e18] text-white font-bold py-3 px-8 rounded-lg hover:bg-green-800 transition-colors text-lg">
              Shop Now
            </button>
          </Link>
        </section>
      </div>
    </div>
  );
}
