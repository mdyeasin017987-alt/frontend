"use client";
import React, { useState, useId } from 'react';
import { ChevronDown, CheckCircle2 } from 'lucide-react';

const BD_LOCATIONS = {
  Dhaka: {
    Dhaka: ['Savar', 'Dhamrai', 'Keraniganj', 'Nawabganj', 'Dohar'],
    Gazipur: ['Gazipur Sadar', 'Kaliakair', 'Kaliganj', 'Kapasia', 'Sreepur'],
    Narayanganj: ['Narayanganj Sadar', 'Bandar', 'Araihazar', 'Rupganj', 'Sonargaon'],
  },
  Chattogram: {
    Chattogram: ['Anwara', 'Banshkhali', 'Boalkhali', 'Chandanaish', 'Fatikchhari'],
    "Cox's Bazar": ['Chakaria', "Cox's Bazar Sadar", 'Kutubdia', 'Maheshkhali', 'Ramu'],
  },
  Rajshahi: {
    Rajshahi: ['Bagha', 'Charghat', 'Durgapur', 'Godagari', 'Mohanpur'],
    Bogra: ['Bogra Sadar', 'Dhunat', 'Dupchanchia', 'Gabtali', 'Nandigram'],
  },
};

const PAYMENT_METHODS = [
  { id: 'cod', label: 'Cash on Delivery', emoji: '🚚' },
  { id: 'card', label: 'Credit Card, bKash', emoji: '💳' },
];

const InputField = ({ label, required, children, className = '' }) => (
  <div className={className}>
    <label className="block font-bold text-base mb-1.5 text-black">
      {label} {required && <span className="text-red-600">*</span>}
    </label>
    {children}
  </div>
);

const SelectField = ({ label, required, value, onChange, disabled, options, placeholder }) => (
  <div className="flex-1">
    <label className="block font-bold text-base mb-1.5 text-black">
      {label} {required && <span className="text-red-600">*</span>}
    </label>
    <div className="relative">
      <select
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="w-full appearance-none border-[3px] border-black rounded-xl px-4 py-3 font-bold bg-white focus:ring-2 ring-black outline-none transition-all cursor-pointer disabled:opacity-50"
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
      </select>
      <ChevronDown className="absolute right-3 top-3.5 pointer-events-none" />
    </div>
  </div>
);

export default function App() {
  const [formData, setFormData] = useState({ name: '', phone: '', area: '', address: '', note: '' });
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [selectedDivision, setSelectedDivision] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');

  const districts = selectedDivision ? Object.keys(BD_LOCATIONS[selectedDivision]) : [];
  const upazilas = (selectedDivision && selectedDistrict) ? BD_LOCATIONS[selectedDivision][selectedDistrict] : [];

  return (
    <div className="min-h-screen --var(--background) p-4 md:p-8 font-sans text-black">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-black text-center mb-10">Enter Your Address</h1>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Delivery Form */}
          <div className="xl:col-span-2 --var(--background) border-[3px] border-black rounded-3xl p-6 md:p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black">Delivery Details</h2>
              <span className="font-bold text-lg bg-black text-white px-4 py-1 rounded-full">ID: 0x55f</span>
            </div>

            <InputField label="Name" required className="mb-4">
              <input className="w-full border-[3px] border-black rounded-xl px-4 py-3 font-bold outline-none focus:ring-2 ring-black" placeholder="Your name" />
            </InputField>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <InputField label="Phone" required><input className="w-full border-[3px] border-black rounded-xl px-4 py-3 font-bold outline-none" placeholder="01XXXXXXXXX" /></InputField>
              <InputField label="Area" required><input className="w-full border-[3px] border-black rounded-xl px-4 py-3 font-bold outline-none" placeholder="e.g. Mirpur" /></InputField>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <SelectField label="Division" options={Object.keys(BD_LOCATIONS)} value={selectedDivision} onChange={(e) => {setSelectedDivision(e.target.value); setSelectedDistrict('')}} placeholder="Division" />
              <SelectField label="District" options={districts} value={selectedDistrict} onChange={(e) => setSelectedDistrict(e.target.value)} disabled={!selectedDivision} placeholder="District" />
              <SelectField label="Upazila" options={upazilas} disabled={!selectedDistrict} placeholder="Upazila" />
            </div>

            <InputField label="Delivery Note"><textarea className="w-full border-[3px] border-black rounded-xl px-4 py-3 font-bold outline-none h-24" placeholder="Optional note" /></InputField>
          </div>

          {/* Payment Side */}
          <div className="--var(--background) border-[3px] border-black rounded-3xl p-6 md:p-8 h-fit">
            <h2 className="text-2xl font-black mb-6">Payment Method</h2>
            {PAYMENT_METHODS.map((m) => (
              <button key={m.id} onClick={() => setPaymentMethod(m.id)} 
                className={`w-full flex items-center justify-between p-4 mb-3 border-[3px] border-black rounded-xl transition-all ${paymentMethod === m.id ? 'bg-white' : 'bg-transparent'}`}>
                <span className="font-bold text-lg">{m.label} {m.emoji}</span>
                {paymentMethod === m.id && <CheckCircle2 className="text-black" />}
              </button>
            ))}
            <button className="w-full mt-4 bg-black text-white font-black text-lg py-4 rounded-xl hover:scale-[1.02] transition-transform">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}