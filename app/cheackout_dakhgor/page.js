"use client";
import React, { useRef, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useCart } from '@/app/context/CartContext';
import { useRouter } from 'next/navigation';
import { supabase } from '@/app/lib/supabaseClient';

const generateDisplayId = () => 'SN-' + Math.random().toString(36).substring(2, 8).toUpperCase();

const PAYMENT_METHODS = [
  { id: 'full', label: 'Full Payment', emoji: '💳' },
];

const InputField = ({ label, required, children, className = '' }) => (
  <div className={className}>
    <label className="block font-bold text-base mb-1.5 text-black">
      {label} {required && <span className="text-red-600">*</span>}
    </label>
    {children}
  </div>
);

export default function CheckoutPage() {
  const { items: cartItems, totalPrice, totalQuantity } = useCart();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '', phone: '', area: '', address: '', note: '', postal_name: '', postal_code: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('full');
  const [errors, setErrors] = useState({});
  const [placingOrder, setPlacingOrder] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const displayOrderId = useRef(generateDisplayId());

  const deliveryCharge = totalQuantity > 0 ? 150 + (totalQuantity - 1) * 30 : 0;
  const grandTotal = totalPrice + deliveryCharge;

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const validate = () => {
    const next = {};
    if (!formData.name.trim()) next.name = 'Name is required';
    if (!/^01[0-9]{9}$/.test(formData.phone.trim())) next.phone = 'Enter a valid 11-digit BD phone number';
    if (!formData.area.trim()) next.area = 'Address is required';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) return;
    if (!validate()) return;

    setPlacingOrder(true);
    setSubmitError('');

    const orderRow = {
      customer_name: formData.name,
      phone: formData.phone,
      area: formData.area,
      postal_name: formData.postal_name,
      postal_code: formData.postal_code,
      address_note: formData.note,
      items: cartItems,
      total_price: totalPrice,
      delivery_charge: deliveryCharge,
      grand_total: grandTotal,
      payment_method: paymentMethod,
      status: 'pending',
      product_id: displayOrderId.current,
    };

    const { data: insertedOrder, error } = await supabase
      .from('orders')
      .insert(orderRow)
      .select('id')
      .single();

    setPlacingOrder(false);

    if (error) {
      console.error('Order insert failed:', error);
      setSubmitError('অর্ডার সেভ করা যায়নি। ইন্টারনেট চেক করে আবার চেষ্টা করো।');
      return;
    }

    router.push(`/payment?orderId=${insertedOrder.id}&amount=${grandTotal}&type=${paymentMethod}`);
  };

  return (
    <div className="min-h-screen bg-white p-4 md:p-8 font-sans text-black">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-black text-center mb-10">Enter Your Address</h1>

        {cartItems.length === 0 ? (
          <div className="bg-white border-[3px] border-black rounded-3xl p-8 text-center font-bold">
            Your cart is empty. Add some products before checking out.
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Delivery Form */}
            <div className="xl:col-span-2 bg-background border-[3px] border-black rounded-3xl p-6 md:p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-black">Delivery Details</h2>
                <span className="font-bold text-sm md:text-base bg-black text-white px-4 py-1 rounded-full">
                  Ref: {displayOrderId.current}
                </span>
              </div>

              <InputField label="Name" required className="mb-1">
                <input
                  value={formData.name}
                  onChange={handleChange('name')}
                  className="bg-amber-50 w-full border-[3px] border-black rounded-xl px-4 py-3 font-bold outline-none focus:ring-2 ring-black"
                  placeholder="Your name"
                />
              </InputField>
              {errors.name && <p className="text-red-600 text-sm font-bold mb-3">{errors.name}</p>}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-1 mt-4">
                <div>
                  <InputField label="Phone" required>
                    <input
                      value={formData.phone}
                      onChange={handleChange('phone')}
                      className="bg-amber-50 w-full border-[3px] border-black rounded-xl px-4 py-3 font-bold outline-none"
                      placeholder="01XXXXXXXXX"
                    />
                  </InputField>
                  {errors.phone && <p className="text-red-600 text-sm font-bold mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <InputField label="Address" required>
                    <input
                      value={formData.area}
                      onChange={handleChange('area')}
                      className="w-full bg-amber-50 border-[3px] border-black rounded-xl px-4 py-3 font-bold outline-none"
                      placeholder="e.g. Mirpur"
                    />
                  </InputField>
                  {errors.area && <p className="text-red-600 text-sm font-bold mt-1">{errors.area}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-1 mt-4">
                <InputField label="Post Office">
                  <input
                    value={formData.postal_name}
                    onChange={handleChange('postal_name')}
                    className="w-full bg-amber-50 border-[3px] border-black rounded-xl px-4 py-3 font-bold outline-none"
                    placeholder="e.g. Mirpur GPO"
                  />
                </InputField>
                <InputField label="Post Code/Zip">
                  <input
                    value={formData.postal_code}
                    onChange={handleChange('postal_code')}
                    className="w-full bg-amber-50 border-[3px] border-black rounded-xl px-4 py-3 font-bold outline-none"
                    placeholder="e.g. 1216"
                  />
                </InputField>
              </div>

              <InputField label="Delivery Note" className="mt-4">
                <textarea
                  value={formData.note}
                  onChange={handleChange('note')}
                  className="w-full bg-amber-50 border-[3px] border-black rounded-xl px-4 py-3 font-bold outline-none h-24"
                  placeholder="Optional note"
                />
              </InputField>
            </div>

            {/* Payment Side */}
            <div className="bg-background border-[3px] border-black rounded-3xl p-6 md:p-8 h-fit">
              <h2 className="text-2xl font-black mb-6">Payment Method</h2>
              {PAYMENT_METHODS.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setPaymentMethod(m.id)}
                  className={`w-full flex items-center justify-between p-4 mb-3 border-[3px] border-black rounded-xl transition-all ${
                    paymentMethod === m.id ? 'bg-white' : 'bg-transparent'
                  }`}
                >
                  <span className="font-bold text-lg">{m.label} {m.emoji}</span>
                  {paymentMethod === m.id && <CheckCircle2 className="text-black" />}
                </button>
              ))}

              <hr className="border-black border-t-[1.5px] my-4" />

              <div className="flex flex-col gap-2 font-bold text-black mb-4">
                <div className="flex justify-between"><span>Subtotal:</span><span>৳{totalPrice}</span></div>
                <div className="flex justify-between"><span>Delivery:</span><span>৳{50}</span></div>
                <div className="flex justify-between text-lg border-t-2 border-black pt-2 mt-1">
                  <span>Total:</span><span>৳{grandTotal}</span>
                </div>
              </div>

              {submitError && (
                <p className="text-red-600 text-sm font-bold mb-2 text-center">{submitError}</p>
              )}

              <button
                type="button"
                onClick={handlePlaceOrder}
                disabled={placingOrder}
                className="w-full mt-2 bg-black text-white font-black text-lg py-4 rounded-xl hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {placingOrder ? 'Placing Order…' : 'Place Order'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}