import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchManga, fetchAggregate } from "../../store/slices/mangaSlice";
import HomeManga from "../homepage/HomeManga";

/* =========================
   🧠 HELPERS
========================= */

const getWholeNumberChapters = (volumes) => {
  const chapters = [];

  Object.values(volumes || {}).forEach((vol) => {
    Object.values(vol.chapters || {}).forEach((ch) => {
      const num = Number(ch.chapter);

      if (Number.isInteger(num)) {
        chapters.push({
          id: ch.id,
          number: num,
        });
      }
    });
  });

  return chapters.sort((a, b) => a.number - b.number);
};

/* =========================
   🧩 SMALL COMPONENTS
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

      {/* Index */}
      <span className="text-xs text-gray-500 w-10">
        #{String(index + 1).padStart(3, "0")}
      </span>

      {/* Image */}
      <img
        src={`${import.meta.env.VITE_API_URL}${manga.imageUrl}`}
        className="w-14 h-20 object-cover rounded"
      />

      {/* Info */}
      <div>
        <h3 className="font-semibold text-white">
          Chapter {ch.number}
        </h3>
        <p className="text-gray-400 text-xs">
          8 May 2025
        </p>
      </div>
    </div>

    {/* Stats */}
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

  const { mangas, aggregate, isLoading } = useSelector(
    (state) => state.manga
  );

  const manga = mangas.find((m) => String(m.id) === String(id));
  const mangaAggregate = aggregate[id];

  useEffect(() => {
    if (!manga) dispatch(fetchManga());
    if (!mangaAggregate && id) dispatch(fetchAggregate(id));
  }, [manga, mangaAggregate, id, dispatch]);

  const chapters = getWholeNumberChapters(mangaAggregate?.volumes);

  /* =========================
     📄 PAGINATION
  ========================= */

  const [currentPage, setCurrentPage] = useState(1);
  const CHAPTERS_PER_PAGE = 10;

  const totalPages = Math.ceil((chapters?.length || 0) / CHAPTERS_PER_PAGE);

  const paginatedChapters = chapters?.slice(
    (currentPage - 1) * CHAPTERS_PER_PAGE,
    currentPage * CHAPTERS_PER_PAGE
  );

  /* =========================
     ⏳ STATES
  ========================= */

  if (isLoading && !manga) {
    return <div className="text-white p-10">Loading...</div>;
  }

  if (!manga) {
    return <div className="text-white p-10">Manga not found</div>;
  }

  /* =========================
     🎨 UI
  ========================= */

  return (
    <div className="bg-black text-white min-h-screen">

      {/* HERO */}
      <div className="relative h-screen flex items-center justify-around px-10">

        <div
          className="absolute inset-0 bg-cover bg-top opacity-30"
          style={{
            backgroundImage: `url(${import.meta.env.VITE_API_URL}${manga.imageUrl})`,
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />

        <div className="relative z-10 max-w-3xl">
          <h1 className="text-5xl font-bold mb-4">
            {manga.title}
          </h1>

          <p className="text-gray-300 mb-6">
            {manga.description}
          </p>

          <div className="flex gap-4">
            <button className="bg-cyan-400 text-black px-4 py-2 rounded">
              Open Manga
            </button>

            <button className="border border-white p-2 rounded-full">
              ❤️
            </button>

            <button className="border border-white p-2 rounded-full">
              🔖
            </button>
          </div>
        </div>

        {/* Cover */}
        <div className="z-50 w-64">
          <img
            src={`${import.meta.env.VITE_API_URL}${manga.imageUrl}`}
            className="rounded-lg shadow-2xl"
          />
        </div>
      </div>

      {/* MAIN */}
      <div className="flex gap-10 px-10 py-10">

        {/* LEFT - CHAPTERS */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-8">
            Chapters
          </h2>

          {!paginatedChapters?.length ? (
            <p className="text-gray-400">No chapters available</p>
          ) : (
            <>
              {paginatedChapters.map((ch, index) => (
                <ChapterRow
                  key={ch.id}
                  ch={ch}
                  manga={manga}
                  index={(currentPage - 1) * CHAPTERS_PER_PAGE + index}
                  onClick={() => navigate(`/manga/read/${ch.id}`)}
                />
              ))}

              {/* PAGINATION */}
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

        {/* RIGHT SIDEBAR */}
        <div className="w-96 space-y-2">

          {/* ABOUT */}
          <div className="bg-purple-800/20 px-5 py-3 border border-white/10">
            <h3 className="font-semibold mb-4">About the Manga</h3>

            <p className="text-sm text-gray-400">
              Author: {manga.author}
            </p>

            <p className="text-sm text-gray-400">
              Genre: {manga.genre}
            </p>

            <p className="text-sm text-gray-400">
              Chapters: {chapters?.length || 0}
            </p>
          </div>

          {/* CHARACTERS */}
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

          {/* RIGHTS */}
          <div className="bg-purple-800/20 px-5 py-3 border border-white/10">
            <h3 className="font-semibold mb-3">Rights</h3>

            <p className="text-sm text-gray-400">
              Writer: {manga.author}
            </p>

            <p className="text-sm text-gray-400">
              Artist: {manga.author}
            </p>
          </div>

        </div>
      </div>

      {/* RECOMMENDED */}
      <div>
        <HomeManga title={"Recommended For You"} />
      </div>

    </div>
  );
};

export default MangaDetails;