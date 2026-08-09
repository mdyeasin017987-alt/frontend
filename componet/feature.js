"use client";

import React from 'react';

const features = [
  {
    title: 'Farm-Fresh Quality',
    description: 'Sourced directly from trusted local farms and delivered with care.',
  },
  {
    title: 'Fast Delivery',
    description: 'Get fresh fruits delivered to your door quickly and reliably.',
  },
  {
    title: 'Eco Friendly',
    description: 'Sustainable packaging and zero-waste shipping for every order.',
  },
];

export default function Feature() {
  return (
    <section className="bg-[#f4fbf5] py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[.25em] text-[#2d6d34]">
          Why choose us
        </p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#103d29] sm:text-4xl">
          Fresh fruits. Honest service. Real value.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#51605b] sm:text-lg">
          Discover the benefits of shopping with Fresh Fruits Market. Our premium selection and customer-first experience make every order feel special.
        </p>
      </div>

      <div className="mx-auto mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <div key={feature.title} className="rounded-[32px] border border-[#dfe7df] bg-white p-8 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eaf6eb] text-[#1e5b25]">
              <span className="text-xl">✓</span>
            </div>
            <h3 className="text-xl font-semibold text-[#103d29]">{feature.title}</h3>
            <p className="mt-3 text-sm leading-6 text-[#52615d]">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
