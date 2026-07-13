"use client";
import Image from "next/image";
import { ShoppingCart, ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[var(--forest)]">
      {/* Concentric circle backdrop — radii chosen so each ring is visible */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-10%] top-1/2 hidden -translate-y-1/2 md:block"
      >
        <div className="h-[620px] w-[620px] rounded-full bg-[var(--forest-mid)]" />
        <div className="absolute inset-[70px] rounded-full bg-[var(--forest-light)]" />
        <div className="absolute inset-[150px] rounded-full bg-[#5a9c2e]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 py-16 md:grid-cols-2 md:px-10 md:py-24">
        {/* Copy column */}
        <div className="relative z-10">
          <h1 className="font-display text-5xl font-black uppercase leading-[0.95] text-white sm:text-6xl">
            100% Pure
            <span className="block text-[var(--lime)]">Coconut</span>
          </h1>

          <p className="mt-6 max-w-sm text-white/85">
            No stock or wasted coconut, direct farmer to you.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-6">
            <button
              type="button"
              className="flex items-center gap-2 rounded-full bg-[var(--lime)] px-6 py-3 font-semibold text-[var(--forest)] shadow-lg shadow-black/20 transition-transform hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-[0.98]"
            >
              <ShoppingCart size={18} strokeWidth={2.5} />
              Add to Cart
            </button>

            <a
              href="#products"
              className="group flex items-center gap-1 font-semibold text-[var(--lime)] transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--lime)] rounded-sm"
            >
              view product
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>
          </div>

          <p className="mt-10 text-white/90">stay healthy, stay safe.</p>
        </div>

        {/* Product image column */}
        <div className="relative z-10 flex justify-center md:justify-end">
          <div className="relative h-[320px] w-[280px] sm:h-[400px] sm:w-[340px]">
            <Image
              src="/coconut.png"
              alt="Fresh green coconut with stem"
              fill
              priority
              sizes="(max-width: 768px) 280px, 340px"
              className="object-contain drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}