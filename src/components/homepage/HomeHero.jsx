import { useState } from "react";

export default function HomeHero() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  return (
    <section className="relative isolate flex min-h-[1030px] w-full items-end justify-center overflow-hidden text-center text-white pb-[180px]">

      {/* ── Poster fallback ── */}
      <img
        className={`absolute inset-0 z-[-3] h-full w-full object-cover transition-opacity duration-500 ${
          isVideoLoaded ? "opacity-0" : "opacity-100"
        }`}
        src="home-optimized.png"
        alt="Ezzstar.space"
      />

      {/* ── Background video ── */}
      <video
        className={`absolute inset-0 z-[-2] h-full w-full object-cover transition-opacity duration-500 ${
          isVideoLoaded ? "opacity-100" : "opacity-0"
        }`}
        src="home-optimized.mp4"
        poster="home-optimized.png"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        onLoadedData={() => setIsVideoLoaded(true)}
      />

      {/* ── CRT Scanline overlay ── */}
      <div className="scanlines" />

      {/* ── Gradient overlays (vignette) ── */}
      <div className="absolute inset-0 z-[-1] bg-linear-to-r from-black to-transparent w-[50%] left-0" />
      <div className="absolute inset-0 z-[-1] bg-linear-to-l from-black/60 to-transparent right-0" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[-1] h-1/2 bg-gradient-to-t from-black via-black/70 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[-1] h-32 bg-gradient-to-b from-black/40 to-transparent" />

      {/* ── Hero content ── */}
      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-3 px-4">

        {/* Main headline */}
        <h1
          className="font-inter leading-tight tracking-tight font-medium text-white text-2xl sm:text-3xl md:text-[38px]"
        >
          A New World Awaits You!
        </h1>

        {/* Sub-headline */}
        <p className="max-w-xl font-inter text-[12px] md:text-[13px] text-white/85 leading-relaxed">
          Earn{" "}
          <span className="font-bold text-white">0.00015 SPCA</span>{" "}
          every time you read your favorite{" "}
          <span className="font-bold text-white">story</span> or{" "}
          <span className="font-bold text-white">manga</span>{" "}
          —{" "}
          <span className="font-bold text-white">unlimited withdrawals</span>
        </p>

        {/* CTA buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-1">
          {/* Primary button — solid magenta block */}
          <button
            className="bg-[#DF28E2] hover:bg-[#c020c4] px-7 py-2 text-white text-xs font-medium cursor-pointer transition-colors duration-200"
          >
            Connect Wallet
          </button>

          {/* Secondary button — bordered with coin icon */}
          <a
            href="https://ezzstar.space"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button
              className="flex items-center gap-2 cursor-pointer text-white border border-white/20 px-4 py-2 text-[12px] bg-transparent font-medium backdrop-blur-sm hover:bg-white/5 transition-colors duration-200"
            >
              <img
                src="spica-coin.png"
                width={20}
                height={20}
                alt="SPCA Coin"
                className="rounded-full"
              />
              Sign up/ Login
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}

