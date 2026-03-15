import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchManga } from "../../store/slices/mangaSlice";
import MangaCard from "../reuseable comps/MangaCard";
import { Search, ChevronRight } from "lucide-react";

const bannerScrollStyles = `
  .banner-scroll::-webkit-scrollbar {
    display: none;
  }
  .banner-scroll {
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
`;

const MangaDiscoveryLanding = () => {
  const dispatch = useDispatch();
  const { mangas, isLoading } = useSelector((state) => state.manga);
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarSearchQuery, setSidebarSearchQuery] = useState("");
  const bannerScrollRef1 = useRef(null);
  const bannerScrollRef2 = useRef(null);

  useEffect(() => {
    dispatch(fetchManga());
  }, [dispatch]);

  // Auto-scroll both banner rows every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      [bannerScrollRef1.current, bannerScrollRef2.current].forEach((container) => {
        if (container) {
          container.scrollLeft += 400;
          if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
            container.scrollLeft = 0;
          }
        }
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Sample banner data for the hero section (2 rows × 4 items)
  const banners = [
    { id: 1, title: "Chainsaw Man" },
    { id: 2, title: "Part 2" },
    { id: 3, title: "Live Event" },
    { id: 4, title: "40th Anniversary" },
    { id: 5, title: "New Series" },
    { id: 6, title: "Dragon Ball" },
    { id: 7, title: "Naruto" },
    { id: 8, title: "One Piece" },
  ];

  // Top Boosted items
  const topBoosted = [
    {
      id: 1,
      rank: 1,
      title: "Blooming Love",
      author: "D. kaichwa",
      views: "234k",
      stars: 5,
      comments: 24,
      thumbnail: "https://via.placeholder.com/120x180?text=Bloom",
      badge: "gold"
    },
    {
      id: 2,
      rank: 2,
      title: "One Piece",
      author: "Eiichiro Oda",
      views: "234k",
      stars: 5,
      comments: 24,
      thumbnail: "https://via.placeholder.com/120x180?text=OnePiece",
      badge: "silver"
    },
    {
      id: 3,
      rank: 3,
      title: "Chainsaw Man",
      author: "Tatsuki Fujimoto",
      views: "234k",
      stars: 5,
      comments: 24,
      thumbnail: "https://via.placeholder.com/120x180?text=Chainsaw",
      badge: "bronze"
    },
    {
      id: 4,
      rank: 4,
      title: "KAIJU NO.8",
      author: "Naoya Matsumoto",
      views: "234k",
      stars: 5,
      comments: 24,
      thumbnail: "https://via.placeholder.com/120x180?text=Kaiju"
    },
    {
      id: 5,
      rank: 5,
      title: "SPY x FAMILY",
      author: "Tatsuya Endo",
      views: "234k",
      stars: 5,
      comments: 24,
      thumbnail: "https://via.placeholder.com/120x180?text=SpyFamily"
    },
    {
      id: 6,
      rank: 6,
      title: "SAKAMOTO DAYS",
      author: "Yuto Suzuki",
      views: "234k",
      stars: 5,
      comments: 24,
      thumbnail: "https://via.placeholder.com/120x180?text=Sakamoto"
    },
    {
      id: 7,
      rank: 7,
      title: "Karabachi",
      author: "Takeru Hokozono",
      views: "234k",
      stars: 5,
      comments: 24,
      thumbnail: "https://via.placeholder.com/120x180?text=Karabachi"
    },
    {
      id: 8,
      rank: 8,
      title: "Hunter x Hunter",
      author: "Takeru Hokozono",
      views: "234k",
      stars: 5,
      comments: 24,
      thumbnail: "https://via.placeholder.com/120x180?text=Hunter"
    },
    {
      id: 9,
      rank: 9,
      title: "Jujutsu Kaisen",
      author: "Osamu Nishi / Shiro Usazaki",
      views: "234k",
      stars: 5,
      comments: 24,
      thumbnail: "https://via.placeholder.com/120x180?text=Jujutsu"
    },
    {
      id: 10,
      rank: 10,
      title: "Demon Slayer",
      author: "Koyoharu Gotouge",
      views: "234k",
      stars: 5,
      comments: 24,
      thumbnail: "https://via.placeholder.com/120x180?text=Demon"
    },
  ];

  const MangaSection = ({ title, mangaList, showBoostButton = false }) => (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white text-3xl font-bold">{title}</h2>
        <a href="#" className="text-gray-400 hover:text-gray-300 flex items-center gap-1 text-sm">
          see all
          <ChevronRight className="w-4 h-4" />
        </a>
      </div>
      <div className="grid grid-cols-2 gap-6">
        {mangaList.map((manga) => (
          <div key={manga.id} className="relative">
            <MangaCard
              {...manga}
              reward="0.00005 SPCA"
              stars={5}
              comments={124}
              views="23k"
            />
            {showBoostButton && (
              <button className="absolute bottom-2 right-2 bg-[#ffea00] text-black font-semibold px-3 py-1 rounded-lg hover:bg-[#FFD700] transition flex items-center gap-2 text-sm">
                <span>⚡</span> Boost
              </button>
            )}
          </div>
        ))}
      </div>
    </section>
  );

  const RankBadge = ({ rank, badge }) => {
    const colors = {
      gold: "bg-yellow-500 text-black font-bold shadow-lg shadow-yellow-500/50",
      silver: "bg-gray-300 text-black font-bold shadow-lg shadow-gray-300/50",
      bronze: "bg-orange-400 text-black font-bold shadow-lg shadow-orange-400/50",
    };

    return (
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
          badge ? colors[badge] : "bg-[#ffea00] text-black font-bold"
        }`}
      >
        {rank}
      </div>
    );
  };

  const TopBoostedItem = ({ item }) => (
    <div className="py-3 px-3 border-b border-white/10 last:border-b-0 hover:bg-white/5 transition cursor-pointer flex items-center gap-3">
      <div className="w-14 h-20 flex-shrink-0 bg-gray-700 rounded overflow-hidden">
        <img
          src={item.thumbnail}
          alt={item.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-white text-xs font-semibold truncate line-clamp-2">
          {item.title}
        </h3>
        <p className="text-gray-400 text-xs truncate">{item.author}</p>
        <div className="flex gap-2 mt-1 text-xs text-gray-400">
          <span>👁 {item.views}</span>
          <span>⭐ {item.stars}</span>
          <span>💬 {item.comments}</span>
        </div>
      </div>
      <RankBadge rank={item.rank} badge={item.badge} />
    </div>
  );

  return (
    <div className="min-h-screen bg-black">
      <style>{bannerScrollStyles}</style>
      {/* Hero Banners - 2 Rows Auto-Scrolling */}
      <section className="px-6 py-6 border-b border-white/10">
        <div
          ref={bannerScrollRef1}
          className="banner-scroll flex gap-4 overflow-x-auto pb-4 scroll-smooth"
          style={{ scrollBehavior: "smooth" }}
        >
          {banners.map((banner) => (
            <div
              key={banner.id}
              className="flex-shrink-0 w-96 h-48 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-lg flex items-center justify-center cursor-pointer hover:opacity-90 transition"
            >
              <span className="text-white text-2xl font-bold text-center">
                {banner.title}
              </span>
            </div>
          ))}
        </div>
        {/* Second Row */}
        <div
          ref={bannerScrollRef2}
          className="banner-scroll flex gap-4 overflow-x-auto pb-4 mt-4 scroll-smooth"
          style={{ scrollBehavior: "smooth" }}
        >
          {banners.map((banner) => (
            <div
              key={`row2-${banner.id}`}
              className="flex-shrink-0 w-96 h-48 bg-gradient-to-r from-pink-600 to-orange-500 rounded-lg flex items-center justify-center cursor-pointer hover:opacity-90 transition"
            >
              <span className="text-white text-2xl font-bold text-center">
                {banner.title}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Main Content + Sidebar */}
      <div className="flex gap-8 px-6 py-8 max-w-full">
        {/* Main Content (70%) */}
        <div className="flex-1">
          {isLoading ? (
            <div className="grid grid-cols-2 gap-6">
              {Array(12)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="h-64 bg-gray-800/50 rounded-xl animate-pulse"
                  />
                ))}
            </div>
          ) : (
            <>
              <MangaSection
                title="Daily Updates"
                mangaList={mangas.slice(0, 6)}
              />
              <MangaSection
                title="Creators Manga"
                mangaList={mangas.slice(6, 12) || mangas.slice(0, 6)}
              />
              <MangaSection
                title="Popular Manga"
                mangaList={mangas.slice(0, 6)}
                showBoostButton={true}
              />
              <MangaSection
                title="Recommended Manga"
                mangaList={mangas.slice(6, 12) || mangas.slice(0, 6)}
              />
            </>
          )}
        </div>

        {/* Sidebar (30%) - Hidden on mobile */}
        <aside className="hidden lg:block w-96 flex-shrink-0">
          {/* Top Boosted Section */}
          <div className="bg-[#1a1a05] rounded-lg overflow-hidden sticky top-20">
            {/* Search Bar */}
            <div className="px-4 py-3 border-b border-white/10">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by title or author"
                  value={sidebarSearchQuery}
                  onChange={(e) => setSidebarSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-white text-xs placeholder-gray-500 border-b border-gray-600 focus:border-white pb-2 outline-none transition"
                />
                <Search className="absolute right-0 bottom-2 w-4 h-4 text-gray-500" />
              </div>
            </div>

            {/* Top Boosted Header */}
            <div className="px-4 py-3 border-b border-white/10">
              <h3 className="text-white text-sm font-bold flex items-center gap-2">
                <span>🏆</span> Top Boosted
              </h3>
            </div>

            {/* All 10 Items - No Scroll */}
            <div className="space-y-0">
              {topBoosted.map((item) => (
                <TopBoostedItem key={item.id} item={item} />
              ))}
            </div>
          </div>

          {/* Promotional Banners - Larger */}
          <div className="mt-8 space-y-8 sticky top-[800px]">
            {/* SPICA Banner */}
            <div className="bg-gradient-to-b from-purple-900 to-black rounded-lg overflow-hidden border border-purple-500/30 cursor-pointer hover:border-purple-500/60 transition">
              <div className="aspect-square flex flex-col items-center justify-center p-6 text-center">
                <div className="w-32 h-32 bg-purple-600 rounded-full mb-6 flex items-center justify-center">
                  <span className="text-6xl">⚡</span>
                </div>
                <h4 className="text-white font-bold text-xl">SPICA</h4>
                <p className="text-purple-300 text-sm mt-3">260.9 Light years</p>
              </div>
            </div>

            {/* PLANET XEBION Banner */}
            <div className="bg-gradient-to-b from-blue-900 to-black rounded-lg overflow-hidden border border-blue-500/30 cursor-pointer hover:border-blue-500/60 transition">
              <div className="aspect-square flex flex-col items-center justify-center p-6 text-center">
                <div className="w-32 h-32 bg-blue-600 rounded-full mb-6 flex items-center justify-center flex-col">
                  <span className="text-4xl">👾</span>
                  <span className="text-4xl">✖✗</span>
                </div>
                <h4 className="text-white font-bold text-xl">PLANET XEBION</h4>
                <p className="text-blue-300 text-sm mt-3">System of a SPICA</p>
              </div>
            </div>

            {/* EZZESTAR Banner */}
            <div className="bg-gradient-to-b from-pink-600 to-black rounded-lg overflow-hidden border border-pink-500/30 cursor-pointer hover:border-pink-500/60 transition">
              <div className="aspect-square flex flex-col items-center justify-center p-6 text-center">
                <h4 className="text-white font-bold text-2xl mb-3">⚙ EZZЕSTAR</h4>
                <p className="text-pink-300 text-sm font-semibold">
                  EMPOWERING THE FUTURE OF DIGITAL ALIENS!
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default MangaDiscoveryLanding;
