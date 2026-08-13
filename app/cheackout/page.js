"use client";
import React, { useRef, useState } from 'react';
import { ChevronDown, CheckCircle2 } from 'lucide-react';
import { useCart } from '@/app/context/CartContext';
import { useRouter } from 'next/navigation';
import { supabase } from '@/app/lib/supabaseClient';
import { products } from '../assart';
import Link from 'next/link';

// Short reference code for UI display (e.g., SN-A1B2C3D4)
const generateDisplayId = () => 'SN-' + Math.random().toString(36).substring(2, 8).toUpperCase();

const BD_LOCATIONS = {
  "Dhaka Division": {
    "Dhaka District": ["Dhamrai Upazila", "Dohar Upazila", "Keraniganj Upazila", "Nawabganj Upazila", "Savar Upazila"],
    "Faridpur District": ["Alfadanga Upazila", "Bhanga Upazila", "Boalmari Upazila", "Char Bhadrasan Upazila", "Faridpur Sadar Upazila", "Madhukhali Upazila", "Nagarkanda Upazila", "Sadarpur Upazila", "Saltha Upazila"],
    "Gazipur District": ["Gazipur Sadar Upazila", "Kaliakair Upazila", "Kaliganj Upazila", "Kapasia Upazila", "Sreepur Upazila"],
    "Gopalganj District": ["Gopalganj Sadar Upazila", "Kashiani Upazila", "Kotalipara Upazila", "Muksudpur Upazila", "Tungipara Upazila"],
    "Kishoreganj District": ["Austagram Upazila", "Bajitpur Upazila", "Bhairab Upazila", "Hossainpur Upazila", "Itna Upazila", "Karimganj Upazila", "Katiadi Upazila", "Kishoreganj Sadar Upazila", "Kuliarchar Upazila", "Mithamain Upazila", "Nikli Upazila", "Pakundia Upazila", "Tarail Upazila"],
    "Madaripur District": ["Kalkini Upazila", "Madaripur Sadar Upazila", "Rajoir Upazila", "Shibchar Upazila", "Dasar Upazila"],
    "Manikganj District": ["Daulatpur Upazila", "Ghior Upazila", "Harirampur Upazila", "Manikganj Sadar Upazila", "Saturia Upazila", "Shibalaya Upazila", "Singair Upazila"],
    "Munshiganj District": ["Gazaria Upazila", "Louhajang Upazila", "Munshiganj Sadar Upazila", "Sirajdikhan Upazila", "Sreenagar Upazila", "Tongibari Upazila"],
    "Narayanganj District": ["Araihazar Upazila", "Sonargaon Upazila", "Narayanganj Sadar Upazila", "Rupganj Upazila", "Bandar Upazila"],
    "Narsingdi District": ["Belabo Upazila", "Monohardi Upazila", "Narsingdi Sadar", "Palash Upazila", "Raipura Upazila", "Shibpur Upazila"],
    "Rajbari District": ["Baliakandi Upazila", "Goalanda Upazila", "Kalukhali Upazila", "Pangsha Upazila", "Rajbari Sadar Upazila"],
    "Shariatpur District": ["Bhedarganj Upazila", "Damudya Upazila", "Gosairhat Upazila", "Naria Upazila", "Shariatpur Sadar Upazila", "Zajira Upazila"],
    "Tangail District": ["Basail Upazila", "Bhuapur Upazila", "Delduar Upazila", "Dhanbari Upazila", "Ghatail Upazila", "Gopalpur Upazila", "Kalihati Upazila", "Madhupur Upazila", "Mirzapur Upazila", "Nagarpur Upazila", "Sakhipur Upazila", "Tangail Sadar Upazila"]
  },
  "Khulna Division": {
    "Bagerhat District": ["Chitalmari Upazila", "Fakirhat Upazila", "Kachua Upazila", "Mollahat Upazila", "Mongla Upazila", "Morelganj Upazila", "Rampal Upazila", "Sharankhola Upazila", "Bagerhat Sadar Upazila"],
    "Chuadanga District": ["Alamdanga Upazila", "Chuadanga Sadar Upazila", "Damurhuda Upazila", "Jibannagar Upazila"],
    "Jessore District": ["Abhaynagar Upazila", "Bagherpara Upazila", "Chaugachha Upazila", "Jhikargachha Upazila", "Keshabpur Upazila", "Jessore Sadar Upazila", "Manirampur Upazila", "Sharsha Upazila"],
    "Jhenaidah District": ["Harinakunda Upazila", "Jhenaidah Sadar Upazila", "Kaliganj Upazila", "Kotchandpur Upazila", "Maheshpur Upazila", "Shailkupa Upazila"],
    "Khulna District": ["Batiaghata Upazila", "Dacope Upazila", "Dumuria Upazila", "Koyra Upazila", "Paikgachha Upazila", "Phultala Upazila", "Rupsha Upazila", "Terokhada Upazila", "Dighalia Upazila"],
    "Kushtia District": ["Bheramara Upazila", "Daulatpur Upazila", "Khoksa Upazila", "Kumarkhali Upazila", "Kushtia Sadar Upazila", "Mirpur Upazila"],
    "Magura District": ["Magura Sadar Upazila", "Mohammadpur Upazila", "Shalikha Upazila", "Sreepur Upazila"],
    "Meherpur District": ["Gangni Upazila", "Mujibnagar Upazila", "Meherpur Sadar Upazila"],
    "Narail District": ["Kalia Upazila", "Lohagara Upazila", "Narail Sadar Upazila"],
    "Satkhira District": ["Assasuni Upazila", "Debhata Upazila", "Kalaroa Upazila", "Kaliganj Upazila", "Satkhira Sadar Upazila", "Shyamnagar Upazila", "Tala Upazila"]
  },
  "Chittagong Division": {
    "Bandarban District": ["Alikadam Upazila", "Bandarban Sadar Upazila", "Lama Upazila", "Naikhongchhari Upazila", "Rowangchhari Upazila", "Ruma Upazila", "Thanchi Upazila"],
    "Brahmanbaria District": ["Akhaura Upazila", "Banchharampur Upazila", "Bijoynagar Upazila", "Brahmanbaria Sadar Upazila", "Ashuganj Upazila", "Kasba Upazila", "Nabinagar Upazila", "Nasirnagar Upazila", "Sarail Upazila"],
    "Chandpur District": ["Chandpur Sadar Upazila", "Faridganj Upazila", "Haimchar Upazila", "Hajiganj Upazila", "Kachua Upazila", "Matlab South Upazila", "Matlab North Upazila", "Shahrasti Upazila"],
    "Chittagong District": ["Anwara Upazila", "Banshkhali Upazila", "Boalkhali Upazila", "Chandanaiash Upazila", "Fatikchhari Upazila", "Hathazari Upazila", "Lohagara Upazila", "Mirsharai Upazila", "Patiya Upazila", "Rangunia Upazila", "Raozan Upazila", "Sandwip Upazila", "Satkania Upazila", "Sitakunda Upazila", "Karnaphuli Upazila"],
    "Comilla District": ["Barura Upazila", "Brahmanpara Upazila", "Burichang Upazila", "Chandina Upazila", "Chauddagram Upazila", "Sadar South Upazila", "Adarsha Sadar Upazila", "Daudkandi Upazila", "Debidwar Upazila", "Homna Upazila", "Laksam Upazila", "Monohargonj Upazila", "Meghna Upazila", "Muradnagar Upazila", "Nangalkot Upazila", "Titas Upazila", "Lalmai Upazila"],
    "Cox's Bazar District": ["Chakaria Upazila", "Cox's Bazar Sadar Upazila", "Kutubdia Upazila", "Moheshkhali Upazila", "Pekua Upazila", "Ramu Upazila", "Teknaf Upazila", "Ukhia Upazila", "Eidgaon Upazila"],
    "Feni District": ["Chhagalnaiya Upazila", "Daganbhuiyan Upazila", "Feni Sadar Upazila", "Fulgazi Upazila", "Parshuram Upazila", "Sonagazi Upazila"],
    "Khagrachhari District": ["Dighinala Upazila", "Manikchhari Upazila", "Khagrachhari Sadar Upazila", "Laxmichhari Upazila", "Mahalchhari Upazila", "Matiranga Upazila", "Panchhari Upazila", "Ramgarh Upazila", "Guimara Upazila"],
    "Lakshmipur District": ["Kamalnagar Upazila", "Lakshmipur Sadar Upazila", "Raipur Upazila", "Ramganj Upazila", "Ramgati Upazila", "Chandraganj Upazila"],
    "Noakhali District": ["Begumganj Upazila", "Chatkhil Upazila", "Companiganj Upazila", "Hatiya Upazila", "Senbagh Upazila", "Sonaimuri Upazila", "Subarnachar Upazila", "Noakhali Sadar", "Kabirhat Upazila"],
    "Rangamati Hill District": ["Baghaichhari Upazila", "Barkal Upazila", "Kawkhali Upazila", "Kaptai Upazila", "Jurachhari Upazila", "Langadu Upazila", "Naniarchar Upazila", "Rangamati Sadar Upazila", "Rajasthali Upazila", "Belaichhari Upazila"]
  },
  "Rajshahi Division": {
    "Bogra District": ["Adamdighi Upazila", "Bogra Sadar Upazila", "Dhunat Upazila", "Dupchanchia Upazila", "Gabtali Upazila", "Kahaloo Upazila", "Nandigram Upazila", "Sariakandi Upazila", "Shajahanpur Upazila", "Sherpur Upazila", "Shibganj Upazila", "Sonatala Upazila", "Mokamtala Upazila"],
    "Joypurhat District": ["Akkelpur Upazila", "Joypurhat Sadar Upazila", "Kalai Upazila", "Panchbibi Upazila", "Khetlal Upazila"],
    "Naogaon District": ["Atrai Upazila", "Dhamoirhat Upazila", "Manda Upazila", "Mahadebpur Upazila", "Naogaon Sadar Upazila", "Niamatpur Upazila", "Patnitala Upazila", "Raninagar Upazila", "Sapahar Upazila", "Badalgachhi Upazila", "Porsha Upazila"],
    "Natore District": ["Bagatipara Upazila", "Baraigram Upazila", "Gurudaspur Upazila", "Lalpur Upazila", "Natore Sadar Upazila", "Singra Upazila", "Naldanga Upazila"],
    "Chapai Nawabganj District": ["Shibganj Upazila", "Bholahat Upazila", "Gomastapur Upazila", "Nachole Upazila", "Chapai Nawabganj Sadar Upazila"],
    "Pabna District": ["Atgharia Upazila", "Bera Upazila", "Bhangura Upazila", "Chatmohar Upazila", "Faridpur Upazila", "Ishwardi Upazila", "Pabna Sadar Upazila", "Santhia Upazila", "Sujanagar Upazila"],
    "Rajshahi District": ["Bagha Upazila", "Bagmara Upazila", "Charghat Upazila", "Durgapur Upazila", "Godagari Upazila", "Mohanpur Upazila", "Paba Upazila", "Puthia Upazila", "Tanore Upazila"],
    "Sirajganj District": ["Belkuchi Upazila", "Chauhali Upazila", "Kamarkhanda Upazila", "Kazipur Upazila", "Raiganj Upazila", "Shahjadpur Upazila", "Sirajganj Sadar", "Tarash Upazila", "Ullapara Upazila"]
  },
  "Sylhet Division": {
    "Habiganj District": ["Ajmiriganj Upazila", "Bahubal Upazila", "Baniachang Upazila", "Chunarughat Upazila", "Habiganj Sadar Upazila", "Lakhai Upazila", "Madhabpur Upazila", "Nabiganj Upazila", "Shayestaganj Upazila"],
    "Moulvibazar District": ["Barlekha Upazila", "Juri Upazila", "Kamalganj Upazila", "Kulaura Upazila", "Moulvibazar Sadar Upazila", "Rajnagar Upazila", "Sreemangal Upazila"],
    "Sunamganj District": ["Bishwamharpur Upazila", "Chhatak Upazila", "Derai Upazila", "Dharmapasha Upazila", "Dowarabazar Upazila", "Jagannathpur Upazila", "Jamalganj Upazila", "Sullah Upazila", "Sunamganj Sadar Upazila", "Tahirpur Upazila", "Shantiganj Upazila", "Madhyanagar Upazila"],
    "Sylhet District": ["Balaganj Upazila", "Beanibazar Upazila", "Bishwanath Upazila", "Companiganj Upazila", "South Surma Upazila", "Fenchuganj Upazila", "Golapganj Upazila", "Gowainghat Upazila", "Jaintiapur Upazila", "Kanaighat Upazila", "Sylhet Sadar Upazila", "Zakiganj Upazila", "Osmani Nagar Upazila"]
  },
  "Rangpur Division": {
    "Dinajpur District": ["Birampur Upazila", "Birganj Upazila", "Biral Upazila", "Bochaganj Upazila", "Chirirbandar Upazila", "Phulbari Upazila", "Ghoraghat Upazila", "Hakimpur Upazila", "Kaharole Upazila", "Khansama Upazila", "Nawabganj Upazila", "Parbatipur Upazila", "Dinajpur Sadar Upazila"],
    "Gaibandha District": ["Fulchhari Upazila", "Gaibandha Sadar Upazila", "Gobindaganj Upazila", "Palashbari Upazila", "Sadullapur Upazila", "Saghatta Upazila", "Sundarganj Upazila"],
    "Kurigram District": ["Phulbari Upazila", "Bhurungamari Upazila", "Char Rajibpur Upazila", "Chilmari Upazila", "Kurigram Sadar Upazila", "Nageswari Upazila", "Rajarhat Upazila", "Roumari Upazila", "Ulipur Upazila"],
    "Lalmonirhat District": ["Aditmari Upazila", "Hatibandha Upazila", "Kaliganj Upazila", "Lalmonirhat Sadar Upazila", "Patgram Upazila"],
    "Nilphamari District": ["Domar Upazila", "Jaldhaka Upazila", "Kishoreganj Upazila", "Nilphamari Sadar Upazila", "Saidpur Upazila", "Dimla Upazila"],
    "Panchagarh District": ["Atwari Upazila", "Boda Upazila", "Debiganj Upazila", "Panchagarh Sadar", "Tetulia Upazila"],
    "Rangpur District": ["Badarganj Upazila", "Kaunia Upazila", "Rangpur Sadar Upazila", "Mithapukur Upazila", "Pirgachha Upazila", "Pirganj Upazila", "Taraganj Upazila", "Gangachhara Upazila"],
    "Thakurgaon District": ["Pirganj Upazila", "Baliadangi Upazila", "Haripur Upazila", "Ranisankail Upazila", "Thakurgaon Sadar Upazila", "Bhulli Upazila", "Ruhia Upazila"]
  },
  "Mymensingh Division": {
    "Jamalpur District": ["Bakshiganj Upazila", "Dewanganj Upazila", "Islampur Upazila", "Jamalpur Sadar Upazila", "Madarganj Upazila", "Melandaha Upazila", "Sarishabari Upazila"],
    "Mymensingh District": ["Bhaluka Upazila", "Dhobaura Upazila", "Fulbaria Upazila", "Gafargaon Upazila", "Gouripur Upazila", "Haluaghat Upazila", "Ishwarganj Upazila", "Mymensingh Sadar Upazila", "Muktagachha Upazila", "Nandail Upazila", "Phulpur Upazila", "Tarakanda Upazila", "Trishal Upazila"],
    "Netrokona District": ["Atpara Upazila", "Barhatta Upazila", "Durgapur Upazila", "Khaliajuri Upazila", "Kalmakanda Upazila", "Kendua Upazila", "Madan Upazila", "Mohanganj Upazila", "Netrokona Sadar Upazila", "Purbadhala Upazila"],
    "Sherpur District": ["Jhenaigati Upazila", "Nakla Upazila", "Nalitabari Upazila", "Sherpur Sadar Upazila", "Sreebardi Upazila"]
  },
  "Barisal Division": {
    "Barguna District": ["Amtali Upazila", "Bamna Upazila", "Barguna Sadar Upazila", "Betagi Upazila", "Patharghata Upazila", "Taltali Upazila"],
    "Barisal District": ["Agailjhara Upazila", "Babuganj Upazila", "Bakerganj Upazila", "Banaripara Upazila", "Gournadi Upazila", "Hijla Upazila", "Barisal Sadar Upazila", "Mehendiganj Upazila", "Muladi Upazila", "Wazirpur Upazila"],
    "Bhola District": ["Bhola Sadar Upazila", "Borhanuddin Upazila", "Daulatkhan Upazila", "Lalmohan Upazila", "Manpura Upazila", "Tazumuddin Upazila", "Char Fasson Upazila"],
    "Jhalokathi District": ["Jhalokathi Sadar Upazila", "Nalchhiti Upazila", "Kathalia Upazila", "Rajapur Upazila"],
    "Patuakhali District": ["Bauphal Upazila", "Dashmina Upazila", "Dumki Upazila", "Kalapara Upazila", "Mirzaganj Upazila", "Patuakhali Sadar Upazila", "Rangabali Upazila", "Galachipa Upazila"],
    "Pirojpur District": ["Bhandaria Upazila", "Kawkhali Upazila", "Mathbaria Upazila", "Nazirpur Upazila", "Pirojpur Sadar Upazila", "Nesarabad Upazila", "Zianagar Upazila"]
  }
};

const PAYMENT_METHODS = [
  { id: 'delivery', label: 'Delivery Charge only', emoji: '🚚' },
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

export default function CheckoutPage() {
  const { items: cartItems, totalPrice, totalQuantity , piece } = useCart();
  const router = useRouter();

  const [formData, setFormData] = useState({ name: '', phone: '', area: '', address: '', note: '' });
  const [paymentMethod, setPaymentMethod] = useState('delivery');
  const [selectedDivision, setSelectedDivision] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedUpazila, setSelectedUpazila] = useState('');
  const [errors, setErrors] = useState({});
  const [placingOrder, setPlacingOrder] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // UI Display ID only (database will auto-generate the actual primary key UUID)
  const displayOrderId = useRef(generateDisplayId());

  const districts = selectedDivision ? Object.keys(BD_LOCATIONS[selectedDivision]) : [];
  const upazilas = (selectedDivision && selectedDistrict) ? BD_LOCATIONS[selectedDivision][selectedDistrict] : [];

  const deliveryCharge = totalQuantity > 0 ? 150 + (totalQuantity - 1) * 30 : 0;
  const grandTotal = totalPrice + deliveryCharge;

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };


  const subtotal = ""

  const validate = () => {
    const next = {};
    if (!formData.name.trim()) next.name = 'Name is required';
    if (!/^01[0-9]{9}$/.test(formData.phone.trim())) next.phone = 'Enter a valid 11-digit BD phone number';
    if (!formData.area.trim()) next.area = 'Area is required';
    if (!selectedDivision) next.division = 'Select a division';
    if (!selectedDistrict) next.district = 'Select a district';
    if (!selectedUpazila) next.upazila = 'Select an upazila';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) return;
    if (!validate()) return;

    setPlacingOrder(true);
    setSubmitError('');

    // ---- উভয় payment method-ই একই shape-এর order insert করে, শুধু ----
    // /app/payment page-এ পাঠানো amount আলাদা হয়:
    //  - Delivery Payment: শুধু deliveryCharge advance পাঠাতে হবে (bKash/Nagad),
    //    বাকি পণ্যের দাম ডেলিভারির সময় হাতে দেবে।
    //  - Full Payment: পুরো grandTotal আগেই পাঠাতে হবে।
    // দুটোতেই কোনো automated gateway (BDGate) নেই বলে, TrxID manual verify
    // হওয়ার আগ পর্যন্ত payment_status 'pending' থাকে, /app/payment-এ সাবমিট
    // করলে 'pending_verification' হয়।
    const orderRow = {
      customer_name: formData.name,
      phone: formData.phone,
      division: selectedDivision,
      district: selectedDistrict,
      upazila: selectedUpazila,
      area: formData.area,
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

    // cart এখনো clear করছি না — TrxID সাবমিট না হওয়া পর্যন্ত cart থাকুক,
    // যাতে user মাঝপথে ফিরে এলেও অর্ডার হারিয়ে না যায়।
    const amountToPay = paymentMethod === 'delivery' ? deliveryCharge : grandTotal;
    router.push(`/payment?orderId=${insertedOrder.id}&amount=${amountToPay}&type=${paymentMethod}`);
   // Clear cart after order is placed
   
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
                  <InputField label="Area" required>
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

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-1 mt-4">
                <SelectField
                  label="Division"
                  required
                  options={Object.keys(BD_LOCATIONS)}
                  value={selectedDivision}
                  onChange={(e) => {
                    setSelectedDivision(e.target.value);
                    setSelectedDistrict('');
                    setSelectedUpazila('');
                  }}
                  placeholder="Division"
                />
                <SelectField
                  label="District"
                  required
                  options={districts}
                  value={selectedDistrict}
                  onChange={(e) => {
                    setSelectedDistrict(e.target.value);
                    setSelectedUpazila('');
                  }}
                  disabled={!selectedDivision}
                  placeholder="District"
                />
                <SelectField
                  label="Upazila"
                  required
                  options={upazilas}
                  value={selectedUpazila}
                  onChange={(e) => setSelectedUpazila(e.target.value)}
                  disabled={!selectedDistrict}
                  placeholder="Upazila"
                />
              </div>
              {(errors.division || errors.district || errors.upazila) && (
                <p className="text-red-600 text-sm font-bold mb-3">
                  {errors.division || errors.district || errors.upazila}
                </p>
              )}

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
                  className={`w-full flex items-center justify-between p-4 mb-3 border-[3px] border-black rounded-xl transition-all ${paymentMethod === m.id ? 'bg-white' : 'bg-transparent'
                    }`}
                >
                  <span className="font-bold text-lg">{m.label} {m.emoji}</span>
                  {paymentMethod === m.id && <CheckCircle2 className="text-black" />}
                </button>
              ))}

              <hr className="border-black border-t-[1.5px] my-4" />

              <div className="flex flex-col gap-2 font-bold text-black mb-4">
                <div className="flex justify-between"><span>Subtotal:</span><span>৳{totalPrice}</span></div>
                <div className="flex justify-between"><span>Delivery:</span><span>৳{deliveryCharge}</span></div>
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
  )
};