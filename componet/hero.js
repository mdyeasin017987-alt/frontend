"use client"

const fruits = [
  'https://res.cloudinary.com/zlegm9or/image/upload/v1785753713/file_0000000041a48211991ecf82d8074556_sktxi3.png',
  'https://res.cloudinary.com/zlegm9or/image/upload/v1785753712/file_000000009c3482078ce71ee0abdfcc37_apc0i5.png',
  'https://res.cloudinary.com/zlegm9or/image/upload/v1785753338/file_0000000079a8820796d65473e5ef8fd3_1_geumii.png',
  'https://res.cloudinary.com/zlegm9or/image/upload/v1785753063/file_00000000f3d08211b85211c514c7321c_tlubxr.png',
]

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-[#123d29]">
      {/* Hero */}
      <section className="relative overflow-hidden px-4 pt-10 text-center md:px-6 lg:px-8 lg:pt-14">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-[#e4e2d6] bg-white px-4 py-2 text-sm font-semibold text-[#31552c]">
          <span aria-hidden="true">🥥</span>
          100% Fresh Coconuts
        </div>

        {/* Heading with accent tick marks */}
        <div className="relative mx-auto mt-6 max-w-5xl">
          <svg
            viewBox="0 0 60 60"
            className="pointer-events-none absolute -top-6 left-1/2 h-12 w-12 -translate-x-[190px] text-[#123d29] sm:-translate-x-[230px] md:-translate-x-[260px]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M30 6 L30 22" />
            <path d="M14 14 L24 24" />
            <path d="M6 30 L22 30" />
          </svg>

          <h1 className="font-serif text-5xl font-medium leading-none tracking-tight text-[#103d29] sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6.5rem]">
            Taste Nature&apos;s
            <br />
            Freshness
          </h1>
        </div>

        <p className="mx-auto mt-6 max-w-3xl text-sm leading-7 text-[#657067] sm:text-base md:text-lg">
          Welcome to Fresh Coconut Market, your trusted destination for
          premium-quality, farm-fresh fruits. We bring nature&apos;s finest
          harvest directly from local farms.
        </p>

        <div className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center">
          <button className="inline-flex items-center justify-center gap-2 rounded-full bg-[#18a33d] px-6 py-4 text-base font-semibold text-white shadow-lg shadow-green-600/20 hover:bg-[#149034]">
            Order Today
            <span aria-hidden="true">🛍</span>
          </button>

          <button className="inline-flex items-center justify-center gap-2 rounded-full border border-[#dddcd4] bg-white px-6 py-4 text-base font-semibold text-[#26332c] hover:border-[#c8c6bc]">
            Track Order
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 3" />
            </svg>
          </button>
        </div>

        {/* Fruit gallery — sits on a shallow arc, both outer tiles rise to match the inner ones */}
        <div className="mx-auto mt-16 grid max-w-7xl grid-cols-2 gap-3 sm:gap-4 lg:mt-24 lg:grid-cols-4 lg:gap-5">
          {fruits.map((src, index) => {
            const arcStyle =null

            return (
              <div
                key={index}
                className="group relative h-40 overflow-hidden sm:h-52 lg:h-64"
                style={arcStyle}
              >
                <img
                  src={src}
                  alt="Fresh fruit"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width:640px) 50vw, (max-width:1024px) 50vw, 25vw"
                />
              </div>
            )
          })}
        </div>

        {/* Curved fade into the section below, spanning the whole row */}
        
      </section>
    </main>
  )
}