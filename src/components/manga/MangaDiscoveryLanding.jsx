import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchManga } from "../../store/slices/mangaSlice";
import MangaCard from "../reuseable comps/MangaCard";
import { Search, ChevronRight, Eye, Star, MessageCircle, Rocket, Share2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { mockMangas } from "../../config/mockHomeData";

import promo1 from "../../assets/Stories banner promotions/1.png";
import promo2 from "../../assets/Stories banner promotions/2.png";
import promo3 from "../../assets/Stories banner promotions/3.png";
import promo4 from "../../assets/Stories banner promotions/4.png";
import promo5 from "../../assets/Stories banner promotions/5.png";
import promo6 from "../../assets/Stories banner promotions/6.png";
import promo7 from "../../assets/Stories banner promotions/7.png";

const promoBanners = [
  { id: 1, image: promo1, link: "#", alt: "Aliens, Baseball, and Civilization" },
  { id: 2, image: promo2, link: "#", alt: "My Brother Died and Now the Grass is Overgrown" },
  { id: 3, image: promo3, link: "#", alt: "Banner Promotion 3" },
  { id: 4, image: promo4, link: "#", alt: "Banner Promotion 4" },
  { id: 5, image: promo5, link: "#", alt: "Banner Promotion 5" },
  { id: 6, image: promo6, link: "#", alt: "Banner Promotion 6" },
  { id: 7, image: promo7, link: "#", alt: "Banner Promotion 7" },
];

/* ── Styles ── */
const scrollStyles = `
@keyframes scroll-left  { from{transform:translateX(0)} to{transform:translateX(-50%)} }
@keyframes scroll-right { from{transform:translateX(-50%)} to{transform:translateX(0)} }
.scroll-left-slow  { animation: scroll-left  40s linear infinite; }
.scroll-right-fast { animation: scroll-right 35s linear infinite; }
.scroll-left-slow:hover, .scroll-right-fast:hover { animation-play-state: paused; }
`;

/* ── Helpers ── */
const Stat = ({ icon, value }) => (
  <div className="flex items-center gap-1 bg-white/10 px-1.5 py-0.5 rounded-full text-xs">
    {icon}<span>{value}</span>
  </div>
);

const RankBadge = ({ rank, badge }) => {
  const colors = { gold: "bg-yellow-500", silver: "bg-gray-300", bronze: "bg-orange-400" };
  return (
    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-black shrink-0 ${colors[badge] || "bg-white/20 text-white"}`}>
      {rank}
    </div>
  );
};

const TopItem = ({ item }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/manga/${item.id}?source=mangadex`)}
      className="flex flex-row items-start cursor-pointer hover:opacity-80 transition-opacity"
      style={{
        padding: 0,
        width: "552px",
        height: "143px",
        backdropFilter: "blur(36px)",
        WebkitBackdropFilter: "blur(36px)",
        alignSelf: "stretch",
      }}
    >
      {/* Cover image */}
      <img
        src={item.thumbnail}
        alt={item.title}
        className="shrink-0 object-cover"
        style={{
          width: "95px",
          height: "143px",
          boxShadow: "0px 4px 8px 3px rgba(0, 0, 0, 0.15)",
          filter: "drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.3))",
        }}
      />

      {/* Content area */}
      <div
        className="flex flex-col justify-between items-center"
        style={{ padding: "12px 0", gap: "8px", width: "457px", height: "143px", flexGrow: 1 }}
      >
        {/* Top info block */}
        <div className="flex flex-col items-start" style={{ padding: 0, gap: "10px", width: "457px", height: "72px", alignSelf: "stretch" }}>
          {/* Title row + Price badge */}
          <div className="flex flex-row justify-between items-center" style={{ padding: "0 12px", gap: "51px", width: "457px", height: "40px", alignSelf: "stretch" }}>
            {/* Title */}
            <div className="flex items-center min-w-0 flex-1" style={{ gap: "10px" }}>
              <span
                className="truncate"
                style={{
                  fontFamily: "'SF Pro Display', sans-serif",
                  fontWeight: 400,
                  fontSize: "24px",
                  lineHeight: "29px",
                  color: "#FFFFFF",
                }}
              >
                {item.title}
              </span>
            </div>
            {/* Price badge */}
            <div
              className="flex items-center justify-center shrink-0"
              style={{
                width: "40px",
                height: "40px",
                background: item.rank <= 3 ? "rgba(255, 214, 0, 0.85)" : "rgba(0, 0, 0, 0.25)",
                borderRadius: "34px",
                padding: "4px",
              }}
            >
              <span
                style={{
                  fontFamily: "'SF Pro Display', sans-serif",
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "19px",
                  color: item.rank <= 3 ? "#000000" : "#FFFFFF",
                }}
              >
                $
              </span>
            </div>
          </div>

          {/* Author */}
          <div className="flex flex-col items-end" style={{ padding: "0 12px", gap: "8px", width: "457px", height: "22px", alignSelf: "stretch" }}>
            <span
              className="truncate"
              style={{
                width: "433px",
                height: "22px",
                fontFamily: "'Satoshi', sans-serif",
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "22px",
                color: "#FFFFFF",
                opacity: 0.5,
                alignSelf: "stretch",
              }}
            >
              by {item.author}
            </span>
          </div>
        </div>

        {/* Interactions row */}
        <div
          className="flex flex-row items-center"
          style={{ padding: "0 12px", gap: "8px", width: "457px", height: "32px", alignSelf: "stretch" }}
        >
          {/* Views pill */}
          <div
            className="flex items-center shrink-0"
            style={{
              padding: "4px 12px",
              gap: "2px",
              height: "32px",
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(27px)",
              WebkitBackdropFilter: "blur(27px)",
              borderRadius: "27px",
            }}
          >
            <Eye className="w-5 h-5 text-white" />
            <span
              style={{
                fontFamily: "'Satoshi', sans-serif",
                fontWeight: 500,
                fontSize: "16px",
                lineHeight: "22px",
                color: "#FFFFFF",
                marginLeft: "2px",
              }}
            >
              {item.views}
            </span>
          </div>

          {/* Star pill */}
          <div
            className="flex items-center shrink-0"
            style={{
              padding: "4px 12px 4px 8px",
              gap: "4px",
              height: "32px",
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(27px)",
              WebkitBackdropFilter: "blur(27px)",
              borderRadius: "27px",
            }}
          >
            <Star className="w-5 h-5 text-white" />
            <span
              style={{
                fontFamily: "'Satoshi', sans-serif",
                fontWeight: 500,
                fontSize: "14px",
                lineHeight: "16px",
                color: "#FFFFFF",
              }}
            >
              {item.stars}
            </span>
          </div>

          {/* Comments pill */}
          <div
            className="flex items-center shrink-0"
            style={{
              padding: "4px 12px",
              gap: "2px",
              height: "32px",
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(27px)",
              WebkitBackdropFilter: "blur(27px)",
              borderRadius: "27px",
            }}
          >
            <MessageCircle className="w-6 h-6 text-white" />
            <span
              style={{
                fontFamily: "'Satoshi', sans-serif",
                fontWeight: 500,
                fontSize: "14px",
                lineHeight: "19px",
                color: "#FFFFFF",
                marginLeft: "2px",
              }}
            >
              {item.comments || "24"}
            </span>
          </div>

          {/* Share pill */}
          <div
            className="flex items-center shrink-0"
            style={{
              padding: "4px 12px",
              gap: "2px",
              height: "32px",
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(27px)",
              WebkitBackdropFilter: "blur(27px)",
              borderRadius: "27px",
            }}
          >
            <Share2 className="w-[18px] h-[18px] text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

const MangaSection = ({ title, mangaList, source }) => {
  const navigate = useNavigate();
  return (
    <section className="mb-10">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-white text-2xl font-bold">{title}</h2>
        <span 
          onClick={() => navigate('/manga/see-all')}
          className="text-white/40 flex items-center text-sm hover:text-white cursor-pointer transition"
        >
          see all <ChevronRight className="w-4 h-4" />
        </span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {mangaList.map((manga) => (
          <MangaCard key={manga.id} {...manga} stars={4} comments={120} views="23k" source={manga.source || source} />
        ))}
      </div>
    </section>
  );
};

const BannerRow = ({ items, direction = "left" }) => (
  <div className="overflow-hidden">
    <div className={`flex w-max gap-1 ${direction === "left" ? "scroll-left-slow" : "scroll-right-fast"}`}>
      {[...items, ...items].map((b, i) => (
        <a
          key={`${b.id}-${i}`}
          href={b.link}
          onClick={(e) => { if (b.link === "#") e.preventDefault(); }}
          className="shrink-0 h-[140px] overflow-hidden rounded-lg block hover:opacity-90 transition-opacity cursor-pointer"
        >
          <img
            src={b.image}
            alt={b.alt}
            className="h-full w-auto object-cover"
            draggable={false}
          />
        </a>
      ))}
    </div>
  </div>
);

/* ── Mock top manga for sidebar fallback ── */
const mockTopManga = mockMangas.map((m, i) => ({
  id: m.id,
  rank: i + 1,
  title: m.title,
  author: m.author,
  views: "23k",
  stars: 4,
  comments: "120",
  thumbnail: m.imageUrl,
  badge: i === 0 ? "gold" : i === 1 ? "silver" : i === 2 ? "bronze" : null,
}));

/* ── Main Component ── */
const MangaDiscoveryLanding = () => {
  const dispatch = useDispatch();
  const { mangas, isLoading, error } = useSelector((state) => state.manga);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [topManga, setTopManga] = useState(null);
  const [isTopLoading, setIsTopLoading] = useState(true);
  const [topError, setTopError] = useState(null);
  const dropdownRef = useRef(null);

  const displayMangas = error && mangas.length === 0 ? mockMangas : mangas;

  useEffect(() => { dispatch(fetchManga()); }, [dispatch]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setShowDropdown(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Debounced search
  useEffect(() => {
    if (!searchQuery.trim()) { setSearchResults(null); setShowDropdown(false); return; }
    const t = setTimeout(async () => {
      setIsSearching(true);
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/manga/search?q=${encodeURIComponent(searchQuery)}`);
        const data = await res.json();
        const results = (data.data || []).map((m, i) => {
          const coverRel = m.relationships?.find(r => r.type === "cover_art");
          const fileName = coverRel?.attributes?.fileName;
          return {
            id: m.id,
            rank: i + 1,
            title: m.attributes?.title?.en || Object.values(m.attributes?.title || {})[0] || "Untitled",
            author: m.relationships?.find(r => r.type === "author")?.attributes?.name || "Unknown",
            views: (m.attributes?.followedCount || 0).toLocaleString(),
            stars: Math.round((m.attributes?.rating?.bayesian || 0) / 2),
            thumbnail: fileName
              ? `${import.meta.env.VITE_API_URL}/api/manga/cover?mangaId=${m.id}&fileName=${fileName}`
              : "https://via.placeholder.com/120x180?text=No+Cover",
            source: "mangadex",
          };
        });
        setSearchResults(results);
        setShowDropdown(results.length > 0);
      } catch { setShowDropdown(false); }
      finally { setIsSearching(false); }
    }, 500);
    return () => clearTimeout(t);
  }, [searchQuery]);

  // Fetch top 10
  useEffect(() => {
    const load = async () => {
      setIsTopLoading(true);
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/manga/top10`);
        if (!res.ok) throw new Error();
        const result = await res.json();
        const list = (result.data || []).map((m, i) => {
          const coverRel = m.relationships?.find(r => r.type === "cover_art");
          const fileName = coverRel?.attributes?.fileName;
          return {
            id: m.id,
            rank: i + 1,
            title: m.attributes?.title?.en || Object.values(m.attributes?.title || {})[0] || "Untitled",
            author: m.relationships?.find(r => r.type === "author")?.attributes?.name || "Unknown",
            views: (m.attributes?.followedCount || 0).toLocaleString(),
            stars: Math.round((m.attributes?.rating?.bayesian || 0) / 2),
            comments: "0",
            thumbnail: fileName
              ? `${import.meta.env.VITE_API_URL}/api/manga/cover?mangaId=${m.id}&fileName=${fileName}`
              : "https://via.placeholder.com/120x180?text=No+Cover",
            badge: i === 0 ? "gold" : i === 1 ? "silver" : i === 2 ? "bronze" : null,
          };
        });
        setTopManga(list);
      } catch {
        setTopError(true);
        setTopManga(mockTopManga);
      } finally { setIsTopLoading(false); }
    };
    load();
  }, []);

  const sections = [
    { title: "Daily Updates", slice: [0, 6] },
    { title: "Creators Manga", slice: [0, 6] },
    { title: "Popular Manga", slice: [0, 6] },
    { title: "Recommended Manga", slice: [6, 12] },
  ];

  return (
    <div className="min-h-screen pt-16" style={{ background: "#060106" }}>
      <style>{scrollStyles}</style>

      {/* ── Ambient glow ── */}
      <div className="pointer-events-none absolute" style={{ width: 2328, height: 853, left: "calc(50% - 1164px)", top: "calc(50% - 426.5px - 3099px)", background: "linear-gradient(180deg,#060106 61.06%,rgba(6,1,6,0) 100%)", filter: "blur(54.75px)" }} />

      {/* ── Promotional Banner Marquee (Hero) ── */}
      <section className="py-4 border-b border-white/10 flex flex-col gap-3">
        <BannerRow items={promoBanners} direction="left" />
        <BannerRow items={[...promoBanners].reverse()} direction="right" />
      </section>

      {/* ── Search bar (right-aligned) ── */}
      <div className="flex justify-end px-11 py-2 border-b border-white/10" ref={dropdownRef}>
        <div className="relative w-[404px]">
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => searchResults?.length && setShowDropdown(true)}
            placeholder="Search by title or author"
            className="w-full bg-transparent border border-white/20 rounded text-white text-sm px-4 py-1.5 pr-10 outline-none focus:border-white/50 transition placeholder:text-white/30"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          {showDropdown && (
            <div className="absolute left-0 right-0 top-full mt-1 bg-[#1a1a1a] border border-white/10 rounded-lg shadow-xl z-50 max-h-80 overflow-y-auto">
              {isSearching ? (
                <p className="p-3 text-white/40 text-sm text-center">Searching…</p>
              ) : searchResults?.map((item) => (
                <div
                  key={item.id}
                  onClick={() => { window.location.href = `/manga/${item.id}?source=mangadex`; setShowDropdown(false); }}
                  className="flex gap-3 items-center px-3 py-2 hover:bg-white/10 cursor-pointer"
                >
                  <img src={item.thumbnail} className="w-9 h-12 object-cover rounded shrink-0" />
                  <div>
                    <p className="text-white text-xs font-semibold line-clamp-1">{item.title}</p>
                    <p className="text-white/40 text-xs">{item.author}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="flex gap-8 px-11 py-8">

        {/* LEFT — manga sections */}
        <div className="flex-1 min-w-0">
          {isLoading ? (
            <div className="grid grid-cols-2 gap-4">
              {Array(6).fill(0).map((_, i) => (
                <div key={i} className="h-64 bg-white/5 rounded animate-pulse" />
              ))}
            </div>
          ) : (
            sections.map(({ title, slice }) => (
              <MangaSection
                key={title}
                title={title}
                mangaList={displayMangas.slice(...slice)}
                source="mangadex"
              />
            ))
          )}
        </div>

        {/* RIGHT — sidebar */}
        <aside className="hidden lg:flex flex-col gap-6 w-[600px] shrink-0">

          {/* Trending section */}
          <div
            className="flex flex-col items-center rounded-lg overflow-hidden"
            style={{
              padding: "26px 24px",
              gap: "10px",
              width: "600px",
              background: "linear-gradient(180deg, rgba(255, 214, 0, 0.135) 0%, rgba(255, 214, 0, 0.03) 100%)",
              backdropFilter: "blur(27px)",
              WebkitBackdropFilter: "blur(27px)",
            }}
          >
            <div
              className="flex items-center w-full"
              style={{ padding: "0 0 12px 0", gap: "8px", height: "48px" }}
            >
              <h3
                style={{
                  fontFamily: "'SF Pro Display', sans-serif",
                  fontWeight: 500,
                  fontSize: "30px",
                  lineHeight: "36px",
                  letterSpacing: "-1px",
                  color: "#FAFAFA",
                  textAlign: "center",
                  margin: 0,
                }}
              >
                Top Boosted
              </h3>
              <Rocket
                style={{
                  width: "22.55px",
                  height: "22.54px",
                  transform: "rotate(-90deg)",
                  color: "rgba(255, 214, 0, 0.9)",
                  fill: "rgba(255, 214, 0, 0.9)",
                }}
              />
            </div>
            {isTopLoading ? (
              Array(5).fill(0).map((_, i) => (
                <div key={i} className="flex w-[552px] h-[143px] backdrop-blur-[36px] bg-white/[0.02] border border-white/10 rounded-lg overflow-hidden animate-pulse">
                  <div className="w-[95px] h-full bg-white/10 shrink-0" />
                  <div className="flex flex-col justify-between py-3 px-3 flex-1">
                    <div className="flex justify-between items-start gap-4">
                      <div className="w-3/4 h-8 bg-white/10 rounded" />
                      <div className="shrink-0 w-10 h-10 bg-white/10 rounded-[34px]" />
                    </div>
                    <div className="w-1/2 h-5 bg-white/10 rounded mt-1" />
                    <div className="flex items-center gap-2 mt-auto">
                      <div className="w-[87px] h-8 bg-white/10 rounded-[27px]" />
                      <div className="w-[54px] h-8 bg-white/10 rounded-[27px]" />
                      <div className="w-[67px] h-8 bg-white/10 rounded-[27px]" />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              (topManga || []).slice(0, 10).map((item) => (
                <TopItem key={item.id} item={item} />
              ))
            )}
          </div>

          {/* Promo image stack (placeholder until CMS provides images) */}
          <div className="flex flex-col gap-4">
            {[1, 2, 3].map((n) => (
              <div key={n} className="w-full aspect-[3/2] rounded-lg bg-white/5 border border-white/10 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-white/20 text-xs">Ad / Promo {n}</div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default MangaDiscoveryLanding;
