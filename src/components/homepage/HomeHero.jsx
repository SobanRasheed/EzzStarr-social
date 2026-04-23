import { useState } from "react";

export default function HomeHero() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  return (
    <section className="relative isolate flex min-h-screen w-full items-end pb-20 justify-center overflow-hidden text-center text-white">

      <img
        className={`absolute inset-0 z-[-3] h-full w-full object-cover transition-opacity duration-500 ${
          isVideoLoaded ? "opacity-0" : "opacity-100"
        }`}
        src="home-optimized.png"
        alt="Ezzstar.space"
      />

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

      <div className="absolute left-0 w-[50%] inset-0 z-[-1] bg-linear-to-r from-black to-transparent" />
      <div className="absolute right-0  inset-0 z-[-1] bg-linear-to-l from-black/60 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[-1] h-1/3 bg-gradient-to-t from-black to-transparent" />

      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-4 ">
        <h1 className=" leading-tight tracking-tight text-4xl sm:text-5xl md:text-7xl ">
          A New World Awaits You!
        </h1>

        <p className="max-w-3xl text-sm  md:text-md">
          Claim <span className="font-medium">0.00015 $SPCA </span> every time you read your favorite <span className=""> story </span>or manga
            <span className="font-semibold md:text-md"> -
            unlimited withdrawls
          </span>
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button className=" bg-[#DF28E2] px-3 py-3 text-black text-sm cursor-pointer transition-colors duration-200 ease-linear  hover:bg-[#AD7AFF] font-[100]">
            Connect Wallet
          </button>

          <a
            href="https://ezzstar.space"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button
              variant="secondary"
              className="flex items-center gap-2 cursor-pointer text-white border border-gray-900 px-3 py-2  text-sm bg-transparent font-medium backdrop-blur-xs hover:bg-white/5 "
            >
              <img
                src="spica-coin.png"
                width={30}
                height={30}
                alt="Ezzstar.space"
              />
              Sign Up / Login
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}
