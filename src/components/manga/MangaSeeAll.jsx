import { useState, useEffect } from "react";
import { Search, ChevronDown, Rocket, Heart } from "lucide-react";
import { mockMangas } from "../../config/mockHomeData";

const BoostedMangaCard = ({ manga }) => (
  <div className="relative w-[350px] h-[450px] border-[0.5px] border-[#FFD600]/90 rounded-[10px] overflow-hidden drop-shadow-[6px_6px_32px_rgba(0,58,55,0.16)] cursor-pointer hover:opacity-90 transition-opacity shrink-0">
    {/* Background Image */}
    <img 
      src={manga.thumbnail} 
      className="absolute inset-0 w-full h-full object-cover" 
    />
    
    {/* Gradient Overlay (bottom 282px) */}
    <div className="absolute bottom-0 left-0 right-0 h-[282px] bg-gradient-to-b from-[#FFF2AC]/0 to-[#010101] pointer-events-none" />

    {/* Heart Button */}
    <button className="absolute top-[9px] right-[8px] w-[32px] h-[32px] bg-black/50 flex items-center justify-center rounded hover:bg-white/20 transition-colors z-10">
      <Heart className="w-[18px] h-[18px] text-white" />
    </button>

    {/* Content */}
    <div className="absolute bottom-[23px] left-0 right-0 flex flex-col items-center px-[24px] gap-[4px] z-10">
      {/* Top row (Category) */}
      <div className="flex justify-center items-center gap-[10px] w-full">
        <span className="font-sf font-normal text-[16px] leading-[19px] underline text-[#F6D91A]">
          {manga.genre || "PCMag"}
        </span>
      </div>

      {/* Title & Subtitle block */}
      <div className="flex flex-col items-center w-full">
        <div className="flex flex-row justify-center items-center gap-[2px] w-full">
          <Rocket className="w-[18px] h-[18px] text-[#FFD600]/90 fill-[#FFD600]/90 -rotate-90 shrink-0" />
          <h3 className="font-satoshi font-medium text-[20px] leading-[27px] text-white text-center truncate">
            {manga.title}
          </h3>
        </div>
        <p className="font-satoshi font-normal text-[14px] leading-[19px] text-white/50 text-center truncate w-full">
          {manga.author}
        </p>
      </div>
    </div>
  </div>
);

const RegularMangaCard = ({ manga }) => (
  <div className="relative w-[350px] h-[450px] rounded-[10px] overflow-hidden drop-shadow-[6px_6px_32px_rgba(0,58,55,0.16)] cursor-pointer hover:opacity-90 transition-opacity shrink-0">
    {/* Background Image */}
    <img 
      src={manga.thumbnail} 
      className="absolute inset-0 w-full h-full object-cover" 
    />
    
    {/* Gradient Overlay (bottom 282px) */}
    <div className="absolute bottom-0 left-0 right-0 h-[282px] bg-gradient-to-b from-[#030013]/0 to-[#010101] pointer-events-none" />

    {/* Heart Button */}
    <button className="absolute top-[9px] right-[8px] w-[32px] h-[32px] bg-black/50 flex items-center justify-center rounded hover:bg-white/20 transition-colors z-10">
      <Heart className="w-[18px] h-[18px] text-white" />
    </button>

    {/* Content */}
    <div className="absolute bottom-[24px] left-0 right-0 flex flex-col items-center px-[24px] gap-[4px] z-10">
      {/* Top row (Category) */}
      <div className="flex justify-center items-center gap-[10px] w-full">
        <span className="font-sf font-normal text-[16px] leading-[19px] underline text-[#14FF00]">
          {manga.genre || "PCMag"}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-satoshi font-normal text-[20px] leading-[27px] text-white text-center w-full truncate">
        {manga.title}
      </h3>
    </div>
  </div>
);

export default function MangaSeeAll() {
  const [query, setQuery] = useState("");

  // Use mock data for now, first 2 are boosted for demo
  const displayMangas = mockMangas || [];

  return (
    <div className="min-h-screen bg-[#060106] pt-24 text-white overflow-x-hidden">
      
      {/* Top Bar: Search and Selection Pills */}
      <div className="flex flex-col items-end px-[40px] gap-[10px] w-full max-w-[1920px] mx-auto mb-16">
        {/* Search */}
        <div className="flex flex-row items-center px-[15px] py-[6px] w-[404px] h-[32px] border-b border-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-[12px] bg-black/20">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title or author"
            className="flex-1 bg-transparent border-none outline-none text-white/60 font-satoshi font-light text-[16px] leading-[18px]"
          />
          <Search className="w-[20px] h-[20px] text-white/60 shrink-0" />
        </div>

        {/* Selection Pills (On-going | On-going | On-going) */}
        <div 
          className="flex flex-row justify-end items-center px-[26px] py-[10px] gap-[16px] h-[64px]"
          style={{ background: "linear-gradient(90deg, rgba(1, 1, 1, 0.2) 1%, rgba(223, 40, 226, 0.34) 40.77%, rgba(223, 40, 226, 0.5) 100%)" }}
        >
          <span className="font-satoshi font-normal text-[22px] leading-[30px] text-white">On-going</span>
          <span className="font-inter font-normal text-[36px] leading-[44px] text-white flex items-end -translate-y-1">|</span>
          <span className="font-satoshi font-normal text-[22px] leading-[30px] text-white">On-going</span>
          <span className="font-inter font-normal text-[36px] leading-[44px] text-white flex items-end -translate-y-1">|</span>
          <span className="font-satoshi font-normal text-[22px] leading-[30px] text-white">On-going</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-row justify-center items-start px-[37px] gap-[16px] w-full max-w-[1920px] mx-auto">
        <div className="flex flex-col items-start gap-[40px] flex-1">
          
          {/* Header & Dropdown Row */}
          <div className="flex flex-row justify-between items-center w-full px-[6px]">
            <h1 className="font-sf font-normal text-[48px] leading-[57px] text-white">
              Daily Updates
            </h1>
            
            {/* Genre Dropdown */}
            <div className="flex flex-row justify-between items-center px-[12px] py-[12px] w-[240px] h-[48px] bg-[#1c1c1e]/50 border-[1.1px] border-[#757575] rounded-[10px] cursor-pointer hover:bg-white/10 transition-colors">
              <span className="font-inter font-normal text-[16px] leading-[19px] text-white">Select Genre</span>
              <ChevronDown className="w-[24px] h-[24px] text-white" />
            </div>
          </div>

          {/* Grid Area */}
          <div className="flex flex-row flex-wrap items-start content-start gap-[24px] w-full">
            {displayMangas.map((manga, idx) => {
              // The first two cards are boosted as per the design structure (or randomly)
              const isBoosted = idx === 0 || idx === 1;
              return isBoosted ? (
                <BoostedMangaCard key={manga.id} manga={manga} />
              ) : (
                <RegularMangaCard key={manga.id} manga={manga} />
              );
            })}
          </div>

        </div>
      </div>

    </div>
  );
}
