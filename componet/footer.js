import React from 'react';

// আপনার প্রোজেক্টের জন্য শুধুমাত্র এই Footer কম্পোনেন্টটি কপি করে নিন
const Footer = () => {
  return (
    <footer className="w-full text-black mt-12">
      {/* Logo */}
      <h2 className="text-6xl md:text-7xl font-extrabold mb-1 tracking-tight">logo</h2>

      {/* Top Divider */}
      <div className="w-full h-[1.5px] bg-black mb-6"></div>

      {/* Footer Content */}
      <div className="flex flex-row gap-6 md:gap-12">
        {/* Social Icons with precise vertical center alignment */}
       

        {/* Text Content */}
        <div className="flex-1">
          <h3 className="font-bold text-lg mb-3">About us</h3>
          <p className="font-semibold text-base md:text-[17px] leading-snug mb-8 max-w-4xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
          </p>
          <div className="flex gap-8 font-bold text-base">
            <a href="#" className="hover:underline">Contacts us</a>
            <a href="#" className="hover:underline">support</a>
          </div>
        </div>
      </div>

      {/* Bottom Divider */}
      <div className="w-full h-[1.5px] bg-black mt-10 mb-4"></div>

      {/* Copyright */}
      <div className="text-center text-sm font-semibold pb-4">
        copyright 2026 all right reserve
      </div>
    </footer>
  );
};

export default Footer;