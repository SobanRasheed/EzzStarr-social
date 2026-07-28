import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchManga } from "../../store/slices/mangaSlice";
import MangaCard from "../reuseable comps/MangaCard";
import { Search, ChevronRight, Eye, Star, MessageCircle, Rocket } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { mockMangas } from "../../config/mockHomeData";

/* ── Styles ── */
const scrollStyles = `
@keyframes scroll-left { from{transform:translateX(0)} to{transform:translateX(-50%)} }
.scroll-slow { animation: scroll-left 120s linear infinite; }
.scroll-fast { animation: scroll-left 115s linear infinite; }
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
      className="flex gap-3 py-3 px-4 border-b border-white/10 hover:bg-white/5 cursor-pointer"
    >
      <img src={item.thumbnail} className="w-16 h-[88px] object-cover rounded shrink-0" />
      <div className="flex-1 min-w-0 flex flex-col gap-1">
        <p className="text-white text-xs font-semibold line-clamp-2">{item.title}</p>
        <p className="text-white/40 text-xs">by ~ {item.author}</p>
        <div className="flex gap-1.5 mt-auto flex-wrap">
          <Stat icon={<Eye className="w-3 h-3" />} value={item.views} />
          <Stat icon={<Star className="w-3 h-3" />} value={item.stars} />
          <Stat icon={<MessageCircle className="w-3 h-3" />} value={item.comments} />
        </div>
      </div>
      <RankBadge rank={item.rank} badge={item.badge} />
    </div>
  );
};

const MangaSection = ({ title, mangaList, source }) => (
  <section className="mb-10">
    <div className="flex justify-between items-center mb-5">
      <h2 className="text-white text-2xl font-bold">{title}</h2>
      <span className="text-white/40 flex items-center text-sm hover:text-white cursor-pointer transition">
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

const BannerRow = ({ banners, speed = "slow" }) => (
  <div className="overflow-hidden">
    <div className={`flex w-max ${speed === "fast" ? "scroll-fast" : "scroll-slow"}`}>
      {[...banners, ...banners].map((b, i) => (
        <div key={`${b.id}-${i}`} className="shrink-0 h-48 aspect-[3/1] overflow-hidden">
          <img
            src={b.imageUrl?.startsWith("http") ? b.imageUrl : `${import.meta.env.VITE_API_URL}${b.imageUrl}`}
            alt={b.title}
            className="w-full h-full object-cover p-0.5 rounded-md"
          />
        </div>
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

      {/* ── Banner rows (Hero) ── */}
      {mangas.length > 0 && (
        <section className="py-4 border-b border-white/10">
          <BannerRow banners={[...mangas].reverse()} speed="fast" />
          <BannerRow banners={mangas} speed="slow" />
        </section>
      )}

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

          {/* Trending / Top 10 */}
          <div className="border border-white/10 rounded-lg overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
              <h3 className="text-white font-bold text-base">Trending</h3>
              <Rocket className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            </div>
            {isTopLoading ? (
              Array(5).fill(0).map((_, i) => (
                <div key={i} className="flex gap-3 p-4 border-b border-white/10 animate-pulse">
                  <div className="w-16 h-[88px] bg-white/10 rounded shrink-0" />
                  <div className="flex-1 space-y-2 pt-1">
                    <div className="h-3 bg-white/10 rounded w-3/4" />
                    <div className="h-3 bg-white/10 rounded w-1/2" />
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
