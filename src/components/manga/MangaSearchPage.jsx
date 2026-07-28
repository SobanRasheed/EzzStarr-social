import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Search, ChevronDown } from "lucide-react";
import { fetchManga } from "../../store/slices/mangaSlice";
import { mockMangas } from "../../config/mockHomeData";
import MangaPosterCard from "./search/MangaPosterCard";

/* =========================================================================
   Manga Search / Browse page — Figma node 8475-96611.
   Content only: the shared Navbar + Footer are supplied by Layout.jsx.

   NOTE (for backend dev):
   - The card grid is fed by the existing `fetchManga` thunk (GET
     /api/manga/top10) via redux — unchanged. Real data replaces the mock
     fallback automatically once VITE_API_URL responds.
   - Search input, the Genre/Author dropdowns, and the category grouping are
     UI only right now. Everything marked "PLACEHOLDER" below needs a real
     endpoint. Suggested contracts:
       search  -> GET /api/manga/search?q=&genre=&author=
       genres  -> GET /api/manga/genres
       authors -> GET /api/manga/authors
       sections/categories -> however the backend wants to group results
========================================================================= */

// PLACEHOLDER: category section titles come from the backend. The design
// shows generic "{Category name}" headers repeated — kept literal here so it
// is obvious these are not final copy.
const PLACEHOLDER_CATEGORIES = [
  "{Category name}",
  "{Category name}",
  "{Category name}",
  "{Category name}",
  "{Category name}",
];

// PLACEHOLDER: filter options. Backend should supply the real genre/author
// lists (see suggested endpoints above).
const PLACEHOLDER_GENRES = [
  "Action",
  "Adventure",
  "Comedy",
  "Drama",
  "Fantasy",
  "Horror",
  "Mystery",
  "Romance",
  "Sci-fi",
  "Thriller",
];
const PLACEHOLDER_AUTHORS = [
  "Aaron Campbell",
  "H.G. Wells",
  "Iskeski sui",
  "Daichi Kawada",
];

const FilterSelect = ({ label, value, options, onChange }) => (
  <div className="relative w-full max-w-[280px]">
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full appearance-none rounded-lg border border-white/15 bg-[#0A0A0C] px-5 py-3.5 text-sm text-white outline-none transition focus:border-white/40"
    >
      <option value="">{label}</option>
      {options.map((opt) => (
        <option key={opt} value={opt} className="bg-[#0A0A0C]">
          {opt}
        </option>
      ))}
    </select>
    <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60" />
  </div>
);

const MangaSearchPage = () => {
  const dispatch = useDispatch();
  const { mangas, isLoading, error } = useSelector((state) => state.manga);

  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    dispatch(fetchManga());
  }, [dispatch]);

  // Dev fallback: show mock cards when the API is unavailable (mirrors
  // HomeManga / MangaDiscoveryLanding). Real data takes priority.
  const displayMangas = error && mangas.length === 0 ? mockMangas : mangas;

  // PLACEHOLDER: client-side filtering so the UI is interactive during dev.
  // Backend: move this to the search endpoint and remove the local filter.
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return displayMangas.filter((m) => {
      const matchesQuery =
        !q ||
        m.title?.toLowerCase().includes(q) ||
        m.author?.toLowerCase().includes(q);
      const matchesGenre = !genre || (m.genre || "").toLowerCase().includes(genre.toLowerCase());
      const matchesAuthor = !author || (m.author || "").toLowerCase() === author.toLowerCase();
      return matchesQuery && matchesGenre && matchesAuthor;
    });
  }, [displayMangas, query, genre, author]);

  return (
    // Frame 1686559063: flex column, padding 44px 0, gap 66px (Figma)
    <div className="min-h-screen bg-[#060106] pt-16 text-white">
      <div className="flex flex-col gap-[66px] py-11">
        {/* ── Search + filters ── */}
        <section className="mx-auto w-full max-w-[1600px] px-11">
          <h1 className="text-[40px] font-normal leading-tight">Search</h1>

          {/* Search input (underline style) */}
          <div className="mt-6 flex items-center gap-3 border-b border-white/25 pb-3">
            <Search className="h-5 w-5 text-white/50" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search anything"
              className="w-full bg-transparent text-base text-white placeholder-white/40 outline-none"
            />
          </div>

          {/* Genre / Author dropdowns with a divider between them */}
          <div className="mt-6 flex items-center gap-6">
            <FilterSelect
              label="Select Genre"
              value={genre}
              options={PLACEHOLDER_GENRES}
              onChange={setGenre}
            />
            <div className="h-10 w-px bg-white/15" />
            <FilterSelect
              label="Select  Authors"
              value={author}
              options={PLACEHOLDER_AUTHORS}
              onChange={setAuthor}
            />
          </div>
        </section>

        {/* ── Category sections ── */}
        {isLoading ? (
          <section className="mx-auto w-full max-w-[1600px] px-11">
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-[3/4] w-full animate-pulse rounded-[14px] bg-white/5"
                />
              ))}
            </div>
          </section>
        ) : (
          PLACEHOLDER_CATEGORIES.map((title, ci) => (
            <section key={ci} className="mx-auto w-full max-w-[1600px] px-11">
              <h2 className="mb-6 text-[32px] font-normal">{title}</h2>
              <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
                {filtered.length === 0 ? (
                  <p className="col-span-full py-10 text-center text-white/40">
                    No manga match your search.
                  </p>
                ) : (
                  filtered.map((manga) => (
                    <MangaPosterCard
                      key={`${ci}-${manga.id}`}
                      {...manga}
                      // PLACEHOLDER: boost flag — backend flags boosted items
                      boosted={manga.boosted || false}
                    />
                  ))
                )}
              </div>
            </section>
          ))
        )}
      </div>
    </div>
  );
};

export default MangaSearchPage;
