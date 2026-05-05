import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchManga, fetchChapters } from "../../store/slices/mangaSlice";
import HomeManga from "../homepage/HomeManga";

/* =========================
   🧩 SMALL COMPONENTS (unchanged)
========================= */

const Stat = ({ value }) => (
  <div className="flex items-center gap-1 px-2 py-1 bg-white/10 rounded-full text-gray-300 text-xs">
    ⭐ <span>{value}</span>
  </div>
);

const ChapterRow = ({ ch, index, manga, onClick }) => (
  <div
    onClick={onClick}
    className="flex cursor-pointer items-center justify-between px-4 py-3 rounded-lg border-b border-white/10 hover:bg-white/5 transition"
  >
    <div className="flex gap-4 items-center">
      <span className="text-xs text-gray-500 w-10">
        #{String(index + 1).padStart(3, "0")}
      </span>
      <img
        src={`${import.meta.env.VITE_API_URL}${manga.imageUrl}`}
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
      <Stat value="5" />
      <Stat value="124" />
      <Stat value="24k" />
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

  const { mangas, chapters, isLoading } = useSelector((state) => state.manga);
  const manga = mangas.find((m) => String(m.id) === String(id));
  const isPlatform = manga?.isPlatform || false;
  const cacheKey = `${id}-${isPlatform}`;
  const mangaChapters = chapters[cacheKey] || [];

  // Determine if chapters are currently being loaded
  // We can't rely on isLoading alone because it's also used for manga list.
  // We'll track a separate local state or use a ref, but simplest is to check:
  // if manga exists and chapters[cacheKey] is undefined and fetch is pending?
  // However, Redux doesn't expose pending status per action easily.
  // For now, we'll assume chapters are loading if manga exists and mangaChapters is empty and we haven't attempted fetch.
  // But we already dispatch fetchChapters if missing, so we can add a local loading flag.

  const [chaptersLoading, setChaptersLoading] = useState(false);

  useEffect(() => {
    if (!manga) {
      dispatch(fetchManga());
    }
  }, [manga, dispatch]);

  useEffect(() => {
    if (id && manga && !chapters[cacheKey]) {
      setChaptersLoading(true);
      dispatch(fetchChapters({ mangaId: id, isPlatform })).finally(() => {
        setChaptersLoading(false);
      });
    }
  }, [manga, id, chapters, cacheKey, dispatch, isPlatform]);

  // For MangaDex chapters, filter only integer chapters
  const displayChapters = (() => {
    let chaptersList = mangaChapters;
    if (!isPlatform) {
      chaptersList = mangaChapters.filter(ch => {
        const num = Number(ch.chapter);
        return !isNaN(num) && num > 0;
      });
    }
    // Sort ascending by chapter number
    return [...chaptersList].sort((a, b) => Number(a.chapter) - Number(b.chapter));
  })();

  /* =========================
     📄 PAGINATION
  ========================= */
  const [currentPage, setCurrentPage] = useState(1);
  const CHAPTERS_PER_PAGE = 10;
  const totalPages = Math.ceil((displayChapters?.length || 0) / CHAPTERS_PER_PAGE);
  const paginatedChapters = displayChapters?.slice(
    (currentPage - 1) * CHAPTERS_PER_PAGE,
    currentPage * CHAPTERS_PER_PAGE
  );

  // Loading states
  if (isLoading && !manga) {
    return <div className="text-white p-10">Loading manga details...</div>;
  }

  if (!manga) {
    return <div className="text-white p-10">Manga not found</div>;
  }

  const coverUrl = manga.imageUrl
    ? `${import.meta.env.VITE_API_URL}${manga.imageUrl}`
    : "/fallback-cover.jpg";

  return (
    <div className="bg-black text-white min-h-screen">
      {/* HERO (unchanged) */}
      <div className="relative h-screen flex items-center justify-around px-10">
        <div
          className="absolute inset-0 bg-cover bg-top opacity-30"
          style={{ backgroundImage: `url(${coverUrl})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-5xl font-bold mb-4">{manga.title}</h1>
          <p className="text-gray-300 mb-6">{manga.description}</p>
          <div className="flex gap-4">
            {paginatedChapters.length > 0 && (
              <button
                onClick={() => navigate(`/manga/read/${paginatedChapters[0].id}`)}
                className="bg-cyan-400 text-black px-4 py-2 rounded"
              >
                Read First {isPlatform ? "Episode" : "Chapter"}
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

      {/* MAIN */}
      <div className="flex gap-10 px-10 py-10">
        {/* LEFT - CHAPTERS/EPISODES */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-8">
            {isPlatform ? "Episodes" : "Chapters"}
          </h2>

          {/* Chapters Loader */}
          {chaptersLoading && (
            <div className="flex justify-center py-10">
              <div className="w-8 h-8 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {/* No chapters message */}
          {!chaptersLoading && paginatedChapters.length === 0 && (
            <p className="text-gray-400">No chapters available</p>
          )}

          {/* Chapters list */}
          {!chaptersLoading && paginatedChapters.length > 0 && (
            <>
              {paginatedChapters.map((ch, idx) => {
                const globalIndex = (currentPage - 1) * CHAPTERS_PER_PAGE + idx;
                return (
                  <ChapterRow
                    key={ch.id}
                    ch={ch}
                    manga={manga}
                    index={globalIndex}
                    onClick={() => navigate(`/manga/read/${ch.id}`)}
                  />
                );
              })}
              <div className="flex justify-center gap-3 mt-6">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                  className="px-3 py-1 bg-white/10 rounded disabled:opacity-30"
                >
                  Prev
                </button>
                <span className="text-sm text-gray-400">
                  {currentPage} / {totalPages}
                </span>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                  className="px-3 py-1 bg-white/10 rounded disabled:opacity-30"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>

        {/* RIGHT SIDEBAR (unchanged) */}
        <div className="w-96 space-y-2">
          <div className="bg-purple-800/20 px-5 py-3 border border-white/10">
            <h3 className="font-semibold mb-4">About the Manga</h3>
            <p className="text-sm text-gray-400">Author: {manga.author}</p>
            <p className="text-sm text-gray-400">Genre: {manga.genre}</p>
            <p className="text-sm text-gray-400">
              {isPlatform ? "Episodes" : "Chapters"}: {displayChapters.length}
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

      {/* RECOMMENDED */}
      <div>
        <HomeManga title="Recommended For You" />
      </div>
    </div>
  );
};

export default MangaDetails;