import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import banner1 from "../../assets/Stories banner promotions/1.png";
import banner2 from "../../assets/Stories banner promotions/2.png";
import banner3 from "../../assets/Stories banner promotions/3.png";
import banner4 from "../../assets/Stories banner promotions/4.png";
import banner5 from "../../assets/Stories banner promotions/5.png";
import banner6 from "../../assets/Stories banner promotions/6.png";
import banner7 from "../../assets/Stories banner promotions/7.png";

const banners = [
  { id: 1, image: banner1, link: "#", alt: "Aliens, Baseball, and Civilization" },
  { id: 2, image: banner2, link: "#", alt: "My Brother Died and Now the Grass is Overgrown" },
  { id: 3, image: banner3, link: "#", alt: "Banner Promotion 3" },
  { id: 4, image: banner4, link: "#", alt: "Banner Promotion 4" },
  { id: 5, image: banner5, link: "#", alt: "Banner Promotion 5" },
  { id: 6, image: banner6, link: "#", alt: "Banner Promotion 6" },
  { id: 7, image: banner7, link: "#", alt: "Banner Promotion 7" },
];

const AUTO_PLAY_INTERVAL = 5000;

export default function StoriesBannerCarousel() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback(
    (index) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrent(index);
      setTimeout(() => setIsTransitioning(false), 500);
    },
    [isTransitioning]
  );

  const next = useCallback(() => {
    goTo((current + 1) % banners.length);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + banners.length) % banners.length);
  }, [current, goTo]);

  // Auto-play
  useEffect(() => {
    const timer = setInterval(next, AUTO_PLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <div className="relative w-full overflow-hidden rounded-xl group">
      {/* Slides */}
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {banners.map((banner) => (
          <a
            key={banner.id}
            href={banner.link}
            className="w-full flex-shrink-0 block cursor-pointer"
            onClick={(e) => {
              // Placeholder — prevent navigation until real links are set
              if (banner.link === "#") e.preventDefault();
            }}
          >
            <img
              src={banner.image}
              alt={banner.alt}
              className="w-full h-auto object-cover"
              style={{ aspectRatio: "16 / 5" }}
              draggable={false}
            />
          </a>
        ))}
      </div>

      {/* Left Arrow */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Right Arrow */}
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
              i === current
                ? "bg-white w-6"
                : "bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
