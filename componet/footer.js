import Link from 'next/link';
import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[--background] text-black">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[2fr_1fr_1fr]">
          <div className="space-y-6">
            <h2 className="text-4xl font-black tracking-tight text-black sm:text-5xl">
              SahyesNatural
            </h2>
            <p className="max-w-xl text-sm leading-7 text-[#2f3f32] sm:text-base">
              SahyesNatural delivers fresh, organic coconut products with a focus on quality,
              sustainability, and customer trust. We source from responsible farms and ship with
              eco-friendly care.
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="https://www.facebook.com/share/1Hv5zqCsf6/"
                aria-label="Facebook"
                className="rounded-full border border-black/10 bg-white p-3 text-black transition hover:bg-[#e8f4e8]"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </Link>
              <Link href="#" aria-label="Instagram" className="rounded-full border border-black/10 bg-white p-3 text-black transition hover:bg-[#fdf0f6]">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </Link>
              <Link href="#" aria-label="YouTube" className="rounded-full border border-black/10 bg-white p-3 text-black transition hover:bg-[#fff3f3]">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                </svg>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#1f4725]">
              Quick links
            </h3>
            <div className="mt-6 space-y-3 text-sm text-[#374045]">
              <Link href="/" className="block hover:text-black">Home</Link>
              <Link href="/products" className="block hover:text-black">Products</Link>
              <Link href="/cart" className="block hover:text-black">Cart</Link>
              <Link href="#" className="block hover:text-black">Support</Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#1f4725]">
              Contact
            </h3>
            <div className="mt-6 space-y-3 text-sm text-[#374045]">
              <a href="mailto:info@sahyesnatural.com" className="block hover:text-black">sayhesnatural@gmail.com</a>
              <a href="tel:+880123456789" className="block hover:text-black">+8801805093255</a>
              <p className="pt-2 text-sm text-[#515d53]">Open daily 9am–6pm</p>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-black/10 pt-8 text-center text-xs uppercase tracking-[0.18em] text-black/70">
          © 2026 SahyesNatural. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
