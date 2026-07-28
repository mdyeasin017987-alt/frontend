// components/Hero.jsx
export default function Hero() {
  return (
    <section
      className="w-full bg-cover bg-center bg-no-repeat py-14 px-[5vw]"
      style={{
        backgroundImage:
          "url('https://mahesh-2027.my.canva.site/home-product-about-contact-us/_assets/media/e1f5464ea79e036b0baf89eef445e8d2.jpg')",
      }}
    >
      <div className="max-w-[1180px] mx-auto flex flex-wrap items-center justify-around gap-8">
        {/* Content */}
        <div className="flex-1 min-w-[320px] max-w-[460px]">
          <h1 className="font-anton text-white leading-[0.95] capitalize tracking-[0.5px] text-[clamp(5.2rem,4.5vw,6.9rem)]">
            100% Pure
          </h1>

          <h1 className="font-anton text-[clamp(6.9rem,5.2vw,7.2rem)] leading-[0.95] capitalize tracking-[0.5px] text-lime mb-4">
            Coconut
          </h1>

          <p className="text-white text-lg leading-6 max-w-[300px] mb-6">
            No stock or wasted coconut, direct farmer to you
          </p>

          <div className="flex flex-wrap items-center gap-5 mb-10">
            <button
              type="button"
              className="flex items-center gap-2 bg-lime text-forest-green px-5 py-2.5 rounded-full font-semibold"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              Add to Cart
            </button>

            <a href="#" className="text-lime font-medium text-lg inline-flex items-center gap-2">
              view product →
            </a>
          </div>

          <p className="text-white text-base font-medium">stay healthy, stay safe.</p>
        </div>

        {/* Image */}
        <div className="flex-[1.3] min-w-[300px] flex justify-center items-center">
          <img
            src="https://mahesh-2027.my.canva.site/home-product-about-contact-us/_assets/media/09dd688a15623823b2e9e4301c20d546.png"
            alt="Fresh green coconut"
            className="w-full max-w-[50rem] object-cover drop-shadow-[0_20px_25px_rgba(0,0,0,0.25)]"
          />
        </div>
      </div>
    </section>
  );
}
