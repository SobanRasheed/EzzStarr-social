import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchChapters } from "../../store/slices/mangaSlice";
import HomeManga from "../homepage/HomeManga";
import axios from "axios";
import { Heart, Share2, Eye, MessageCircle, Star, Share } from "lucide-react";

/* =========================
   🧩 SMALL COMPONENTS
========================= */

const Stat = ({ icon, value }) => (
  <div className="flex items-center gap-1 bg-white/10 hover:bg-white/20 transition px-1.5 py-1 rounded-full text-xs">
    {icon}
    <span>{value}</span>
  </div>
);

/* =========================
   💡 HELPER FUNCTIONS
========================= */

const getCoverImageUrl = (path) => {
  if (!path) return "/fallback-cover.jpg";
  if (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("data:")
  ) {
    return path;
  }
  const baseUrl = import.meta.env.VITE_API_URL || "";
  if (path.startsWith("/")) {
    return `${baseUrl}${path}`;
  }
  return `${baseUrl}/${path}`;
};

const normalizeMangaData = (rawData, source) => {
  if (!rawData) return null;
  
  if (source === "platform") {
    // Platform manga from database
    return {
      id: rawData._id || rawData.id,
      title: rawData.title || "Untitled",
      description: rawData.description || "No description available.",
      coverUrl: rawData.coverImage || "/fallback-cover.jpg",
      author: rawData.author?.username || (typeof rawData.author === "string" ? rawData.author : "Platform Creator"),
      genre: Array.isArray(rawData.genres) ? rawData.genres.join(", ") : (rawData.genre || "N/A"),
      isPlatform: true,
      source: "platform",
    };
  } else if (source === "jikan") {
    const title = rawData.title || rawData.title_english || "Untitled";
    const description = rawData.synopsis || "No description available.";
    const coverUrl = rawData.images?.jpg?.large_image_url || rawData.images?.jpg?.image_url || "/fallback-cover.jpg";
    const authorName = rawData.authors?.map(a => a.name).join(", ") || "Unknown";
    const genres = rawData.genres?.map(g => g.name).join(", ") || "N/A";
    return {
      id: rawData.mal_id,
      title,
      description,
      coverUrl,
      author: authorName,
      genre: genres,
      isPlatform: false,
      source: "jikan",
    };
  } else if (source === "zyla") {
    const title = rawData.title || rawData.name || "Untitled";
    const description = rawData.description || rawData.synopsis || "No description available.";
    const coverUrl = rawData.cover_image || rawData.image_url || "/fallback-cover.jpg";
    const authorName = rawData.author || "Unknown";
    const genres = Array.isArray(rawData.genres) ? rawData.genres.join(", ") : (rawData.genre || "N/A");
    return {
      id: rawData.id,
      title,
      description,
      coverUrl,
      author: authorName,
      genre: genres,
      isPlatform: false,
      source: "zyla",
    };
  } else {
    // External MangaDex manga
    const title = rawData.attributes?.title?.en ||
      rawData.attributes?.title?.en_jp ||
      Object.values(rawData.attributes?.title || {})[0] ||
      "Untitled";
    const description = rawData.attributes?.description?.en || "No description available.";
    
    const authorRel = rawData.relationships?.find(rel => rel.type === "author");
    const authorName = authorRel?.attributes?.name || "Unknown";

    const genres = rawData.attributes?.tags
      ?.filter(tag => tag.attributes?.group === "genre")
      ?.map(tag => tag.attributes?.name?.en)
      ?.join(", ") || "N/A";

    return {
      id: rawData.id,
      title,
      description,
      coverUrl: rawData.coverUrl || "/fallback-cover.jpg",
      author: authorName,
      genre: genres,
      isPlatform: false,
      source: "mangadex",
    };
  }
};

const ChapterRow = ({ ch, index, manga, onClick }) => (
  <div
    onClick={onClick}
    className="flex cursor-pointer items-center justify-between px-4 py-2 border-b border-white/10 hover:bg-white/5 transition"
  >
    <div className="flex gap-4 items-center">
      <span className="text-xs text-gray-500 w-10">
        #{String(index + 1).padStart(3, "0")}
      </span>
      <img
        src={getCoverImageUrl(manga.coverUrl)}
        className="w-14 h-20 object-cover rounded"
        alt="cover"
      />
      <div>
        <h3 className="font-semibold text-white">
          {manga.isPlatform ? `Episode ${ch.episodeNumber}` : `Chapter ${ch.chapter}`}
          {ch.title ? ` - ${ch.title}` : ""}
        </h3>
        <p className="text-gray-400 text-xs">
          {ch.publishAt
            ? new Date(ch.publishAt).toLocaleDateString()
            : ch.createdAt
              ? new Date(ch.createdAt).toLocaleDateString()
              : "Unknown date"}
        </p>
      </div>
    </div>
    <div className="flex gap-2">
      <Stat icon={<Star className="w-3 h-4" />} value={"1.2k"} />
      <Stat icon={<MessageCircle className="w-3 h-4" />} value={"1.2k"} />
      <Stat icon={<Share2 className="w-3 h-4" />} value={""} />
      <Stat icon={<img src="/icons/thread.svg" alt="Image" className="h-5" />} value={"1.2k"} />
      <Stat icon={<Eye className="w-3 h-4" />} value={"1.2k"} />
    </div>
  </div>
);

/* =========================
   🚀 MAIN COMPONENT
========================= */

const MangaDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const routeSource = searchParams.get("source") || "platform";

  const { chapters } = useSelector((state) => state.manga);
  const [manga, setManga] = useState(null);
  const [loadingManga, setLoadingManga] = useState(true);
  const [chaptersLoading, setChaptersLoading] = useState(false);

  const cacheKey = manga ? `${id}-${manga.isPlatform}` : id;
  const mangaChapters = chapters[cacheKey] || [];

  // ✅ Fetch manga by ID
  useEffect(() => {
    const fetchMangaById = async () => {
      setLoadingManga(true);
      try {
        if (routeSource === "jikan") {
          let response = await axios.get(`${import.meta.env.VITE_API_URL}/api/manga/jikan/${id}`);
          setManga(normalizeMangaData(response.data.data, "jikan"));
        } else if (routeSource === "zyla") {
          let response = await axios.get(`${import.meta.env.VITE_API_URL}/api/manga/zyla/${id}`);
          setManga(normalizeMangaData(response.data.data, "zyla"));
        } else if (routeSource === "mangadex") {
          let response = await axios.get(`${import.meta.env.VITE_API_URL}/api/manga/external/${id}`);
          setManga(normalizeMangaData(response.data, "mangadex"));
        } else {
          // platform or autodetect
          try {
            let response = await axios.get(`${import.meta.env.VITE_API_URL}/api/manga/${id}`);
            if (response.data && response.data.success && response.data.data) {
              setManga(normalizeMangaData(response.data.data, "platform"));
            } else {
              throw new Error("Failed to get platform manga data");
            }
          } catch (err) {
            console.log("Manga not found on platform or server error, trying external MangaDex fallback:", err.message);
            const extResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/manga/external/${id}`);
            setManga(normalizeMangaData(extResponse.data, "mangadex"));
          }
        }
      } catch (err) {
        console.error("Failed to fetch manga:", err);
        setManga(null);
      } finally {
        setLoadingManga(false);
      }
    };
    fetchMangaById();
  }, [id, routeSource]);

  // Fetch chapters after manga is loaded
  useEffect(() => {
    if (manga && id && !chapters[cacheKey]) {
      if (manga.source === "jikan" || manga.source === "zyla") {
        return;
      }
      setChaptersLoading(true);
      dispatch(fetchChapters({ mangaId: id, isPlatform: manga.isPlatform })).finally(() => {
        setChaptersLoading(false);
      });
    }
  }, [manga, id, chapters, cacheKey, dispatch]);

  // Filter and sort chapters
  const displayChapters = (() => {
    if (manga && (manga.source === "jikan" || manga.source === "zyla")) {
      return Array.from({ length: 5 }).map((_, i) => ({
        id: `mock-${i + 1}`,
        chapter: String(i + 1),
        title: `Chapter ${i + 1}`,
        createdAt: new Date().toISOString(),
      }));
    }
    let chaptersList = mangaChapters;
    if (manga && !manga.isPlatform) {
      chaptersList = mangaChapters.filter(ch => {
        const num = Number(ch.chapter);
        return !isNaN(num) && num > 0;
      });
    }
    return [...chaptersList].sort((a, b) => Number(a.chapter) - Number(b.chapter));
  })();

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const CHAPTERS_PER_PAGE = 10;
  const totalPages = Math.ceil((displayChapters?.length || 0) / CHAPTERS_PER_PAGE);
  const paginatedChapters = displayChapters?.slice(
    (currentPage - 1) * CHAPTERS_PER_PAGE,
    currentPage * CHAPTERS_PER_PAGE
  );

  const handleOpenChapter = (chapterId) => {
    if (manga.source === "jikan") {
      window.open(`https://myanimelist.net/manga/${id}`, "_blank");
    } else if (manga.source === "zyla") {
      window.open(`https://kitsu.io/manga/${id}`, "_blank");
    } else {
      navigate(`/manga/read/${chapterId}`);
    }
  };

  // Loading states
  if (loadingManga) {
    return <div className="text-white p-10">Loading manga details...</div>;
  }
  if (!manga) {
    return <div className="text-white p-10">Manga not found</div>;
  }

  const coverUrl = getCoverImageUrl(manga.coverUrl);

  return (
    <div className="bg-black text-white min-h-screen">
      {/* HERO SECTION */}
      <div className="relative h-screen flex items-center justify-around px-10">
        <div
          className="absolute inset-0 bg-cover bg-top opacity-30"
          style={{ backgroundImage: `url(${coverUrl})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-5xl font-bold max-w-3xl mb-4">{manga.title}</h1>
          <p className="text-gray-300 line-clamp-3 mb-6">{manga.description}</p>
          <div className="flex gap-4">
            {paginatedChapters.length > 0 && (
              <button
                onClick={() => handleOpenChapter(paginatedChapters[0].id)}
                className="bg-cyan-300 text-black px-4 py-1 "
              >
                {manga.source === "jikan" ? "View on MyAnimeList" : manga.source === "zyla" ? "External Link" : "Open Manga"}
              </button>
            )}
            <button className="border border-white p-2 rounded-full">❤️</button>
            <button className="border border-white p-2 rounded-full">🔖</button>
          </div>
        </div>
        <div className="z-50 w-64">
          <img src={coverUrl} className="rounded-lg shadow-2xl" alt="cover" />
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex gap-10 px-10 py-10">
        {/* LEFT: CHAPTERS / EPISODES */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-8">
            {manga.isPlatform ? "Episodes" : "Chapters"}
          </h2>

          {chaptersLoading && (
            <div className="flex justify-center py-10">
              <div className="w-8 h-8 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {!chaptersLoading && paginatedChapters.length === 0 && (
            <p className="text-gray-400">No chapters available</p>
          )}

          {!chaptersLoading && paginatedChapters.length > 0 && (
            <>
              {paginatedChapters.map((ch, idx) => {
                const globalIndex = (currentPage - 1) * CHAPTERS_PER_PAGE + idx;
                return (
                  <div className="p-4 bg-amber-50/5">
                  <ChapterRow
                    key={ch.id}
                    ch={ch}
                    manga={manga}
                    index={globalIndex}
                    onClick={() => handleOpenChapter(ch.id)}
                    />
                    </div>
                );
              })}
              <div className="flex justify-center gap-3 mt-6">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(p => p - 1)}
                  className="px-3 py-1 bg-white/10 rounded disabled:opacity-30"
                >
                  Prev
                </button>
                <span className="text-sm text-gray-400">
                  {currentPage} / {totalPages}
                </span>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(p => p + 1)}
                  className="px-3 py-1 bg-white/10 rounded disabled:opacity-30"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>

        {/* RIGHT: SIDEBAR */}
        <div className="w-96 space-y-2">
          <div className="bg-purple-800/20 px-5 py-3 border border-white/10">
            <h3 className="font-semibold mb-4">About the Manga</h3>
            <p className="text-sm text-gray-400">Author: {manga.author}</p>
            <p className="text-sm text-gray-400">Genre: {manga.genre}</p>
            <p className="text-sm text-gray-400">
              {manga.isPlatform ? "Episodes" : "Chapters"}: {displayChapters.length}
            </p>
          </div>
          <div className="bg-purple-800/20 px-5 py-3 border border-white/10">
            <h3 className="font-semibold mb-3">Main Characters</h3>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-gray-600" />
              <span className="text-sm text-gray-300">Creator name 1</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-600" />
              <span className="text-sm text-gray-300">Creator name 2</span>
            </div>
          </div>
          <div className="bg-purple-800/20 px-5 py-3 border border-white/10">
            <h3 className="font-semibold mb-3">Rights</h3>
            <p className="text-sm text-gray-400">Writer: {manga.author}</p>
            <p className="text-sm text-gray-400">Artist: {manga.author}</p>
          </div>
        </div>
      </div>

      {/* RECOMMENDED SECTION */}
      <div>
        <HomeManga title="Recommended For You" />
      </div>
    </div>
  );
};

export default MangaDetails;