import React from 'react';

function Footer() {
  return (
    // বাইরের ব্যাকগ্রাউন্ড ফ্রেম যা ইমেজটির মতো দেখাবে
    <div className="w-full  bg-[#85ff10] flex items-center justify-center p-4 md:p-8">

      {/* মূল ফুটার কন্টেইনার (উজ্জ্বল লাইম গ্রিন ব্যাকগ্রাউন্ড) */}
      <footer className="w-full h-full  bg-[#85ff10] text-black font-sans p-6 md:p-12 lg:p-16 rounded-sm shadow-sm select-none">

        {/* লোগো সেকশন */}
        <div className="mb-4">
          <h1 className="text-7xl md:text-8xl font-black tracking-tight leading-none text-black select-all">
            Cocobazar
          </h1>
        </div>

        {/* প্রথম বিভাজক রেখা (Top Divider Line) */}
        <hr className="border-black border-t-[1.5px] opacity-100 my-4" />

        {/* মূল কন্টেন্ট গ্রিড (রেসপনসিভ লেআউট) */}
        <div className="grid grid-cols-[auto_1fr] gap-6 md:gap-16 lg:gap-24 py-4 items-start">

          {/* বাম দিকের সোশ্যাল মিডিয়া আইকনগুলোর ভার্টিকাল স্ট্যাক */}
          <div className="flex flex-col gap-5 text-black">
            {/* ফেসবুক আইকন */}
            <a href="#" aria-label="Facebook" className="hover:opacity-75 transition-opacity">
              <svg className="w-7 h-7 md:w-9 md:h-9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>

            {/* ইনস্টাগ্রাম আইকন */}
            <a href="#" aria-label="Instagram" className="hover:opacity-75 transition-opacity">
              <svg className="w-7 h-7 md:w-9 md:h-9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>

            {/* ইউটিউব আইকন */}
            <a href="#" aria-label="YouTube" className="hover:opacity-75 transition-opacity">
              <svg className="w-7 h-7 md:w-9 md:h-9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
              </svg>
            </a>

            {/* টিকটক আইকন */}
            <a href="#" aria-label="TikTok" className="hover:opacity-75 transition-opacity">
              <svg className="w-7 h-7 md:w-9 md:h-9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
              </svg>
            </a>
          </div>

          {/* ডান দিকের টেক্সট ও লিংক সেকশন */}
          <div className="flex flex-col gap-4">

            {/* About us শিরোনাম */}
            <h2 className="text-lg md:text-xl font-bold tracking-normal text-black">
              About us
            </h2>

            {/* বিবরণী প্যারাগ্রাফ (হুবহু ইমেজের টেক্সট মিলানো হয়েছে) */}
            <p className="text-base md:text-xl lg:text-2xl font-bold leading-snug md:leading-normal text-black max-w-3xl">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
            </p>

            {/* নিচের লিংকগুলো */}
            <div className="flex flex-wrap gap-x-8 gap-y-2 mt-2 text-lg md:text-xl font-bold text-black">
              <a href="#" className="hover:underline">Contacts us</a>
              <a href="#" className="hover:underline">support</a>
            </div>

          </div>
        </div>

        {/* দ্বিতীয় বিভাজক রেখা (Bottom Divider Line) */}
        <hr className="border-black border-t-[1.5px] opacity-100 my-4" />

        {/* কপিরাইট নোটিশ (সেন্টারড টেক্সট) */}
        <div className="text-center mt-6">
          <p className="text-xs md:text-sm font-semibold tracking-wide text-black opacity-80">
            copyright 2026 all right reserve
          </p>
        </div>

      </footer>
    </div>
  );
}

export default Footer;