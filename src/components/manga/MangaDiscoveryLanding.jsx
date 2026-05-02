import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchManga } from "../../store/slices/mangaSlice";
import MangaCard from "../reuseable comps/MangaCard";
import { Search, ChevronRight } from "lucide-react";

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


const TOP_BOOSTED = [
  { id: 1, rank: 1, title: "Blooming Love", author: "D. kaichwa", views: "234k", stars: 5, comments: 24, thumbnail: "https://via.placeholder.com/120x180?text=Bloom", badge: "gold" },
  { id: 2, rank: 2, title: "One Piece", author: "Eiichiro Oda", views: "234k", stars: 5, comments: 24, thumbnail: "https://via.placeholder.com/120x180?text=OnePiece", badge: "silver" },
  { id: 3, rank: 3, title: "Chainsaw Man", author: "Tatsuki Fujimoto", views: "234k", stars: 5, comments: 24, thumbnail: "https://via.placeholder.com/120x180?text=Chainsaw", badge: "bronze" },
  { id: 4, rank: 4, title: "KAIJU NO.8", author: "Naoya Matsumoto", views: "234k", stars: 5, comments: 24, thumbnail: "https://via.placeholder.com/120x180?text=Kaiju" },
  { id: 5, rank: 5, title: "SPY x FAMILY", author: "Tatsuya Endo", views: "234k", stars: 5, comments: 24, thumbnail: "https://via.placeholder.com/120x180?text=SpyFamily" },
  { id: 6, rank: 6, title: "SAKAMOTO DAYS", author: "Yuto Suzuki", views: "234k", stars: 5, comments: 24, thumbnail: "https://via.placeholder.com/120x180?text=Sakamoto" },
  { id: 7, rank: 7, title: "Karabachi", author: "Takeru Hokozono", views: "234k", stars: 5, comments: 24, thumbnail: "https://via.placeholder.com/120x180?text=Karabachi" },
  { id: 8, rank: 8, title: "Hunter x Hunter", author: "Yoshihiro Togashi", views: "234k", stars: 5, comments: 24, thumbnail: "https://via.placeholder.com/120x180?text=Hunter" },
  { id: 9, rank: 9, title: "Jujutsu Kaisen", author: "Gege Akutami", views: "234k", stars: 5, comments: 24, thumbnail: "https://via.placeholder.com/120x180?text=Jujutsu" },
  { id: 10, rank: 10, title: "Demon Slayer", author: "Koyoharu Gotouge", views: "234k", stars: 5, comments: 24, thumbnail: "https://via.placeholder.com/120x180?text=Demon" },
];

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

const TopBoostedItem = ({ item }) => (
  <div className="py-3 px-3 border-b border-white/10 hover:bg-white/5 flex gap-3">
    <img src={item.thumbnail} className="w-14 h-20 object-cover rounded" />
    <div className="flex-1">
      <h3 className="text-white text-xs font-semibold">{item.title}</h3>
      <p className="text-gray-400 text-xs">{item.author}</p>
      <div className="text-gray-400 text-xs flex gap-2 mt-1">
        <span>👁 {item.views}</span>
        <span>⭐ {item.stars}</span>
        <span>💬 {item.comments}</span>
      </div>
    </div>
    <RankBadge rank={item.rank} badge={item.badge} />
  </div>
);

const MangaSection = ({ title, mangaList,  }) => (
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
          <MangaCard {...manga} stars={4}
              comments={120}
              reward={"0.0015 $SPCA"}
              views={"23k"}/>
          
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
          <div
            key={`${b.id}-${i}`}
            className="flex-shrink-0 h-52 aspect-[3/1] overflow-hidden"
          >
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

  useEffect(() => {
    dispatch(fetchManga());
  }, [dispatch]);



  return (
    <div className="min-h-screen bg-black pt-16">
      <style>{bannerScrollStyles}</style>

      {/* HERO */}
      <section className=" py-6 border-b border-white/10">
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
              <MangaSection title="Daily Updates" mangaList={mangas.slice(0, 6)} />
              <MangaSection title="Popular Manga" mangaList={mangas.slice(0, 6)}  />
              <MangaSection title="Recommended Manga" mangaList={mangas.slice(6, 12)} />
            </>
          )}
        </div>

        {/* RIGHT */}
        <aside className="hidden lg:block w-96">
          <div className="bg-[#1a1a05] rounded-lg sticky top-20">
            <div className="p-4 border-b border-white/10">
              <input
                value={sidebarSearchQuery}
                onChange={(e) => setSidebarSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full bg-transparent border-b text-white outline-none"
              />
            </div>

            {TOP_BOOSTED.map((item) => (
              <TopBoostedItem key={item.id} item={item} />
            ))}
          </div>
        </aside>

      </div>
    </div>
  );
};

export default MangaDiscoveryLanding;