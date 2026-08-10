/* import Link from 'next/link';

const STEPS = [
  {
    step: '01',
    title: 'Collect from the farm',
    description:
      'We pick only the freshest coconuts from nearby farms, so your order starts with quality from day one.',
    icon: '🌾',
    accent: 'Farm pickup',
  },
  {
    step: '02',
    title: 'Check the coconut type',
    description:
      'We sort each coconut carefully so you get exactly what you asked for — drinking or cooking grade.',
    icon: '🥥',
    accent: 'Right type',
  },
  {
    step: '03',
    title: 'Pack it safely',
    description:
      'Every coconut is wrapped and packed with care so it stays fresh, clean, and ready to use.',
    icon: '📦',
    accent: 'Careful packing',
  },
  {
    step: '04',
    title: 'Choose how to receive it',
    description:
      'Pick home delivery or dakhgor pickup and we’ll make sure the coconut gets to the best place for you.',
    icon: '🚚',
    accent: 'Delivery plan',
  },
];

function RoadmapStep({ step, title, accent, description, icon, isLast }) {
  return (
    <div className="relative pl-16 pb-10 sm:pb-14">
      <div className="absolute left-0 top-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#0f2e18] text-white shadow-lg shadow-black/10 ring-4 ring-white">
        {step}
      </div>
      <div
        className="absolute left-4 top-12 h-full w-px bg-[#0f2e18] opacity-30"
        style={{ height: isLast ? 'calc(100% - 2.5rem)' : 'calc(100% - 1.25rem)' }}
      />
      <div className="flex items-center gap-4 text-[#0f2e18]">
        <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-[#d8f1d4] text-2xl shadow-sm">{icon}</div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#34733a]">{accent}</p>
          <h3 className="mt-2 text-xl font-black">{title}</h3>
        </div>
      </div>
      <p className="mt-4 max-w-xl text-sm leading-7 text-[#425b45]">{description}</p>
    </div>
  );
}

export default function DeliveryInfo({ fullPage = false }) {
  return (
    <section
      className={`${fullPage ? '' : 'bg-[#f4fbf5]'} rounded-[40px] border border-black/10 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.08)] sm:p-8 lg:p-10`}
    >
      <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#24552e] bg-[#e7f7e9] px-4 py-2 text-sm font-semibold text-[#24552e]">
            <span>Roadmap</span>
            <span className="text-lg">🛣️</span>
          </div>
          <h2 className="mt-6 max-w-3xl text-4xl font-black leading-tight tracking-tight text-[#0f2e18] sm:text-5xl">
            From the farm to your door — here's how your coconut arrives fresh.
          </h2>
          <p className="mt-5 text-base leading-8 text-[#425b45] sm:text-lg">
            We keep things simple and honest. See each step we take to pick, check, pack, and deliver your coconut so it arrives just right.
          </p>

          <div className="mt-8 rounded-[32px] overflow-hidden border border-black/10 shadow-lg shadow-black/5">
            <img
              src="https://images.unsplash.com/photo-1498525147810-763398f7539e?auto=format&fit=crop&w=1200&q=80"
              alt="Coconut delivery illustration showing farm harvest and delivery"
              className="w-full object-cover"
            />
          </div>

          <div className="mt-10 space-y-8">
            {STEPS.map((item, index) => (
              <RoadmapStep
                key={item.step}
                step={item.step}
                title={item.title}
                accent={item.accent}
                description={item.description}
                icon={item.icon}
                isLast={index === STEPS.length - 1}
              />
            ))}
          </div>
        </div>

        <div className="rounded-[36px] border border-black/10 bg-[#ffffff] p-6 shadow-md sm:p-8">
          <div className="flex items-center justify-between rounded-3xl bg-[#e8f4e9] p-5">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[#2a5933]">How it works</p>
              <h3 className="mt-3 text-2xl font-black text-[#0f2e18]">We handle the details</h3>
            </div>
            <div className="text-3xl">🌿</div>
          </div>

          <div className="mt-8 space-y-6">
            <div className="rounded-[30px] border border-black/10 bg-[#f8fff7] p-5">
              <p className="text-sm font-semibold text-[#0f2e18]">Local farms</p>
              <p className="mt-2 text-sm leading-6 text-[#405746]">
                We visit nearby farms and bring the freshest coconuts straight into our packing line.
              </p>
            </div>
            <div className="rounded-[30px] border border-black/10 bg-[#f8fff7] p-5">
              <p className="text-sm font-semibold text-[#0f2e18]">Right coconut</p>
              <p className="mt-2 text-sm leading-6 text-[#405746]">
                We check each coconut so your order matches your need — drinking, cooking, or other uses.
              </p>
            </div>
            <div className="rounded-[30px] border border-black/10 bg-[#f8fff7] p-5">
              <p className="text-sm font-semibold text-[#0f2e18]">Careful packaging</p>
              <p className="mt-2 text-sm leading-6 text-[#405746]">
                Every coconut is packed with care to stay protected and fresh until arrival.
              </p>
            </div>
            <div className="rounded-[30px] border border-black/10 bg-[#f8fff7] p-5">
              <p className="text-sm font-semibold text-[#0f2e18]">Delivery choice</p>
              <p className="mt-2 text-sm leading-6 text-[#405746]">
                Choose the delivery option that fits your day: home delivery or dakhgor pickup.
                </p>
          <div className="mt-10 grid gap-4">
            <Link
              href="/products"
              className="inline-flex items-center justify-center rounded-full bg-[#0f2e18] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-black/10 transition hover:bg-[#0b2411]"
            >
              Order fresh coconuts
            </Link>
            <Link
              href="/deliveryinfo"
              className="inline-flex items-center justify-center rounded-full border border-black bg-white px-5 py-3 text-sm font-bold text-[#0f2e18] transition hover:bg-[#f0fdf4]"
            >
              Learn delivery steps
            </Link>
          </div>
        </div>
      </div>
      </div>
      </div>
    </section>
    );
}
*/