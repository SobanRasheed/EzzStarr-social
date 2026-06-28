import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchManga } from "../../store/slices/mangaSlice";
import MangaCard from "../reuseable comps/MangaCard";
import { Search, ChevronRight, Eye, Star, MessageCircle } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";

/* =========================
   🎨 STYLES
========================= */
const bannerScrollStyles = `
.banner-scroll {
  display: flex;
  width: max-content;
}
.scroll-track {
  display: flex;
  gap: 1rem;
}
@keyframes scroll-left {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
.scroll-slow {
  animation: scroll-left 120s linear infinite;
}
.scroll-fast {
  animation: scroll-left 115s linear infinite;
}
`;

/* =========================
   🧩 COMPONENTS
========================= */
const RankBadge = ({ rank, badge }) => {
  const colors = {
    gold: "bg-yellow-500 shadow-yellow-500/50",
    silver: "bg-gray-300 shadow-gray-300/50",
    bronze: "bg-orange-400 shadow-orange-400/50",
  };
  return (
    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-black shadow-lg ${colors[badge] || "bg-[#ffea00]"}`}>
      {rank}
    </div>
  );
};

const Stat = ({ icon, value }) => (
  <div className="flex items-center gap-1 bg-white/10 hover:bg-white/20 transition px-1.5 py-0.5 rounded-full text-xs">
    {icon}
    <span>{value}</span>
  </div>
);
const TopBoostedItem = ({ item }) => {
  const navigate = useNavigate();
  const handleClick = (id) => {
    console.log("clicked")
    navigate(`/manga/${id}?source=mangadex`, { state: id });
  };
  return (
    <div onClick={() => handleClick(item.id)} className="py-3 px-3  border-b border-white/10 hover:bg-white/5 flex gap-3">
      <img src={item.thumbnail} className="w-16 h-22 object-contain rounded" />
      <div className="flex-1 flex flex-col ">
        <h3 className="text-white text-xs font-semibold">{item.title}</h3>
        <p className="text-gray-400 text-xs">by ~ {item.author}</p>
        <div className="text-gray-400 mt-auto text-xs flex gap-2 ">
          <Stat icon={<Eye className="w-3 h-4" />} value={item.views} />
          <Stat icon={<Star className="w-3 h-4" />} value={item.stars} />
          <Stat icon={<MessageCircle className="w-3 h-4" />} value={item.comments} />
          <Stat icon={<img src="/icons/thread.svg" alt="Image" className="h-5" />} value={item.comments} />
        </div>
      </div>
      <RankBadge rank={item.rank} badge={item.badge} />
    </div>
  );
}

const MangaSection = ({ title, mangaList, source }) => (
  <section className="mb-12">
    <div className="flex justify-between mb-6">
      <h2 className="text-white text-3xl font-bold">{title}</h2>
      <span className="text-gray-400 flex items-center text-sm">
        see all <ChevronRight className="w-4 h-4" />
      </span>
    </div>
    <div className="grid grid-cols-2 gap-6">
      {mangaList.map((manga) => (
        <div key={manga.id} className="relative">
          <MangaCard 
            {...manga} 
            stars={4} 
            comments={120} 
            reward={"0.0015 $SPCA"} 
            views={"23k"} 
            source={manga.source || source}
          />
        </div>
      ))}
    </div>
  </section>
);

const BannerRow = ({ banners, speed = "slow" }) => {
  const speedClass = speed === "fast" ? "scroll-fast" : "scroll-slow";
  return (
    <div className="overflow-hidden">
      <div className={`flex w-max ${speedClass}`}>
        {[...banners, ...banners].map((b, i) => (
          <div key={`${b.id}-${i}`} className="flex-shrink-0 h-52 aspect-[3/1] overflow-hidden">
            <img
              src={`${import.meta.env.VITE_API_URL}${b.imageUrl}`}
              alt={b.title}
              className="w-full h-full object-cover p-0.5 rounded-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

/* =========================
   🚀 MAIN
========================= */
const MangaDiscoveryLanding = () => {
  const dispatch = useDispatch();
  const { mangas, isLoading } = useSelector((state) => state.manga);
  const [sidebarSearchQuery, setSidebarSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // External APIs State
  const [source, setSource] = useState("mangadex"); // 'mangadex', 'jikan', 'zyla'
  const [localMangas, setLocalMangas] = useState([]);
  const [localLoading, setLocalLoading] = useState(false);
  const [localError, setLocalError] = useState(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounced search (sensitive to active source)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!sidebarSearchQuery.trim()) {
        setSearchResults(null);
        setShowDropdown(false);
        return;
      }

      const performSearch = async () => {
        setIsSearching(true);
        setSearchError(null);
        try {
          let url = "";
          if (source === "jikan") {
            url = `${import.meta.env.VITE_API_URL}/api/manga/jikan/search?q=${encodeURIComponent(sidebarSearchQuery)}`;
          } else {
            url = `${import.meta.env.VITE_API_URL}/api/manga/search?q=${encodeURIComponent(sidebarSearchQuery)}`;
          }

           const response = await fetch(url);
           if (!response.ok) {
             const errData = await response.json().catch(() => ({}));
             throw new Error(errData.message || `Search failed: ${response.status}`);
           }
           const data = await response.json();
          const resultsList = data.data || [];
          
          const transformed = resultsList.map((manga, idx) => {
            if (source === "jikan") {
              const author = manga.authors?.map(a => a.name).join(", ") || "Unknown";
              return {
                id: manga.mal_id,
                rank: idx + 1,
                title: manga.title || manga.title_english || "Untitled",
                author,
                views: manga.members ? manga.members.toLocaleString() : "0",
                stars: manga.score ? Math.round(manga.score / 2) : 0,
                comments: "0",
                thumbnail: manga.images?.jpg?.image_url || "https://via.placeholder.com/120x180?text=No+Cover",
                badge: null,
                source: "jikan"
              };
            }
            // Default (MangaDex / Platform)
            const authorRel = manga.relationships?.find(rel => rel.type === 'author');
            const authorName = authorRel?.attributes?.name || manga.author || 'Unknown';
            const coverRel = manga.relationships?.find(rel => rel.type === 'cover_art');
            const coverFileName = coverRel?.attributes?.fileName;
            const coverUrl = coverFileName
              ? `${import.meta.env.VITE_API_URL}/api/manga/cover?mangaId=${manga.id}&fileName=${coverFileName}`
              : (manga.coverUrl || 'https://via.placeholder.com/120x180?text=No+Cover');
            const title = manga.attributes?.title?.en ||
              manga.attributes?.title?.en_jp ||
              manga.title ||
              Object.values(manga.attributes?.title || {})[0] ||
              'Untitled';
            const followedCount = manga.attributes?.followedCount || manga.views || 0;
            const score = manga.attributes?.rating?.bayesian || manga.rating || 0;
            return {
              id: manga.id,
              rank: idx + 1,
              title,
              author: authorName,
              views: followedCount.toLocaleString(),
              stars: Math.round(score / 2),
              comments: '0',
              thumbnail: coverUrl,
              badge: null,
              source: manga.source || "mangadex",
            };
          });
          setSearchResults(transformed);
          setShowDropdown(transformed.length > 0);
        } catch (err) {
          console.error('Search error:', err);
          setSearchError(err.message);
          setShowDropdown(false);
        } finally {
          setIsSearching(false);
        }
      };
      performSearch();
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [sidebarSearchQuery, source]);

  // Fetch top 10 manga (initial load)
  useEffect(() => {
    dispatch(fetchManga());
  }, [dispatch]);

  // Fetch local external mangas when source is Jikan or Zyla
  useEffect(() => {
    if (source === "mangadex") {
      setLocalMangas([]);
      return;
    }

    const fetchExternalMangas = async () => {
      setLocalLoading(true);
      setLocalError(null);
      try {
        let url = "";
        if (source === "jikan") {
          url = `${import.meta.env.VITE_API_URL}/api/manga/jikan/top?limit=12`;
        } else if (source === "zyla") {
          url = `${import.meta.env.VITE_API_URL}/api/manga/zyla?limit=12`;
        }

        const res = await fetch(url);
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.message || `HTTP error! status: ${res.status}`);
        }
        const result = await res.json();
        const dataList = result.data || [];

        const mapped = dataList.map((item) => {
          if (source === "jikan") {
            const genres = item.genres?.map(g => g.name).join(", ") || "N/A";
            const author = item.authors?.map(a => a.name).join(", ") || "Unknown";
            return {
              id: item.mal_id,
              title: item.title || item.title_english || "Untitled",
              author,
              genre: genres,
              imageUrl: item.images?.jpg?.large_image_url || item.images?.jpg?.image_url || "/fallback-cover.jpg",
              description: item.synopsis || "No description available.",
              isPlatform: false,
              source: "jikan",
            };
          } else {
            // zyla
            return {
              id: item.id || item.mal_id,
              title: item.title || item.name || "Untitled",
              author: item.author || "Unknown",
              genre: Array.isArray(item.genres) ? item.genres.join(", ") : (item.genre || "N/A"),
              imageUrl: item.cover_image || item.image_url || "/fallback-cover.jpg",
              description: item.description || item.synopsis || "No description available.",
              isPlatform: false,
              source: "zyla",
            };
          }
        });
        setLocalMangas(mapped);
      } catch (err) {
        console.error("Error fetching external mangas:", err);
        setLocalError(err.message);
      } finally {
        setLocalLoading(false);
      }
    };

    fetchExternalMangas();
  }, [source]);

  const [isTopMangaLoading, setIsTopMangaLoading] = useState(true);
  const [topMangaError, setTopMangaError] = useState(null);
  const [topManga, setTopManga] = useState(null);

  useEffect(() => {
    const fetchTopManga = async () => {
      setIsTopMangaLoading(true);
      setTopMangaError(null);
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/manga/top10`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const result = await response.json();
        const mangaList = result.data || [];
        const transformed = mangaList.map((manga, index) => {
          const authorRel = manga.relationships?.find(rel => rel.type === 'author');
          const authorName = authorRel?.attributes?.name || 'Unknown';
          const coverRel = manga.relationships?.find(rel => rel.type === 'cover_art');
          const coverFileName = coverRel?.attributes?.fileName;
          const coverUrl = coverFileName
            ? `${import.meta.env.VITE_API_URL}/api/manga/cover?mangaId=${manga.id}&fileName=${coverFileName}`
            : 'https://via.placeholder.com/120x180?text=No+Cover';
          const title = manga.attributes?.title?.en ||
            manga.attributes?.title?.en_jp ||
            Object.values(manga.attributes?.title || {})[0] ||
            'Untitled';
          const followedCount = manga.attributes?.followedCount || 0;
          const score = manga.attributes?.rating?.bayesian || 0;
          return {
            id: manga.id,
            rank: index + 1,
            title,
            author: authorName,
            views: followedCount.toLocaleString(),
            stars: Math.round(score / 2),
            comments: '0',
            thumbnail: coverUrl,
            badge: index === 0 ? 'gold' : index === 1 ? 'silver' : index === 2 ? 'bronze' : null,
          };
        });
        setTopManga(transformed);
        console.log(transformed)
      } catch (e) {
        console.error("Failed to fetch top manga:", e);
        setTopMangaError(e.message);
      } finally {
        setIsTopMangaLoading(false);
      }
    };
    fetchTopManga();
  }, []);

  return (
    <div className="min-h-screen bg-black pt-16">
      <style>{bannerScrollStyles}</style>

      {/* HERO */}
      <section className="py-6 border-b border-white/10">
        <BannerRow banners={[...mangas].reverse()} speed="fast" />
        <BannerRow banners={mangas} speed="slow" />
      </section>

      {/* MAIN */}
      <div className="flex gap-8 px-6 py-8">
        {/* LEFT */}
        <div className="flex-1">
          {isLoading ? (
            <div className="grid grid-cols-2 gap-6">
              {Array(6).fill(0).map((_, i) => (
                <div key={i} className="h-64 bg-gray-800/50 rounded animate-pulse" />
              ))}
            </div>
          ) : (
            <>
              <MangaSection title="Daily Updates" mangaList={mangas.slice(0, 6)} source={source} />
              <MangaSection title="Popular Manga" mangaList={mangas.slice(0, 6)} source={source} />
              <MangaSection title="Recommended Manga" mangaList={mangas.slice(6, 12)} source={source} />
            </>
          )}
        </div>

        {/* RIGHT */}
        <aside className="hidden lg:block w-96">
          <div className="p-4 border-b border-white/10 relative" ref={dropdownRef}>
            <input
              value={sidebarSearchQuery}
              onChange={(e) => setSidebarSearchQuery(e.target.value)}
              onFocus={() => {
                if (searchResults && searchResults.length > 0) setShowDropdown(true);
              }}
              placeholder="Search manga..."
              className="w-full bg-transparent border-b border-white/30 text-white outline-none focus:border-yellow-500 transition"
            />

            {/* Dropdown */}
            {showDropdown && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-[#2a2a15] rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto">
                {isSearching ? (
                  <div className="p-4 text-gray-400 text-sm text-center">Searching...</div>
                ) : searchError ? (
                  <div className="p-4 text-red-400 text-sm text-center">{searchError}</div>
                ) : searchResults?.length === 0 ? (
                  <div className="p-4 text-gray-400 text-sm text-center">No results found.</div>
                ) : (
                  searchResults.slice(0, 10).map((item) => (
                    <div
                      key={item.id}
                      className="py-2 px-3 hover:bg-white/10 cursor-pointer transition"
                      onClick={() => {
                        window.location.href = `/manga/${item.id}?source=${item.source || source}`;
                        setShowDropdown(false);
                      }}
                    >
                      <div className="flex gap-3 items-center">
                        <img
                          src={item.thumbnail}
                          className="w-10 h-14 object-cover rounded"
                          onError={(e) => (e.target.src = 'https://via.placeholder.com/120x180?text=No+Cover')}
                        />
                        <div className="flex-1">
                          <h3 className="text-white text-sm font-semibold">{item.title}</h3>
                          <p className="text-gray-400 text-xs">{item.author}</p>
                          <div className="text-gray-400 text-xs flex gap-2 mt-1">
                            <span>👁 {item.views}</span>
                            <span>⭐ {item.stars}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
          <div className="bg-[#1a1a05] rounded-lg sticky top-20">
            {/* Top 10 list */}
            {isTopMangaLoading ? (
              Array(10).fill(0).map((_, i) => (
                <div key={i} className="p-4 border-b border-white/10 animate-pulse">
                  <div className="flex gap-3">
                    <div className="w-14 h-20 bg-gray-700 rounded"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-700 rounded w-1/2"></div>
                    </div>
                  </div>
                </div>
              ))
            ) : topMangaError ? (
              <div className="p-4 text-red-400 text-sm">Error loading top manga: {topMangaError}</div>
            ) : (
              topManga.slice(0, 10).map((item) => (
                <TopBoostedItem key={item.id} item={item} />
              ))
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default MangaDiscoveryLanding;