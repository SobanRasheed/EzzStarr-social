import { Heart, Search, ChevronDown } from "lucide-react";
import { useState } from "react";

// ── StoryCard ──────────────────────────────────────────────────────────────
function StoryCard({ image, title, author, genre, reward }) {
  const [liked, setLiked] = useState(false);

  return (
    <div className="group relative rounded-sm overflow-hidden bg-black cursor-pointer">
      <div className="relative aspect-[3/3.7] w-full">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

        {/* Reward pill */}
        <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium bg-yellow-400 text-black">
          Earn {reward}
        </div>

        {/* Like button */}
        <button
          onClick={(e) => { e.stopPropagation(); setLiked(!liked); }}
          className="absolute top-3 right-3 p-2 rounded-full bg-black/60 hover:bg-black/80 transition"
        >
          <Heart className={`w-4 h-4 ${liked ? "fill-red-500 text-red-500" : "text-white"}`} />
        </button>

        {/* Bottom content */}
        <div className="absolute bottom-0 p-4 w-full">
          <h3 className="text-white font-semibold text-sm line-clamp-1">{title}</h3>
          <p className="text-xs text-white/70 mt-1">by {author}</p>
          <p className="text-[10px] mt-1 text-green-400">{genre}</p>
        </div>
      </div>
    </div>
  );
}

// ── Sample data ────────────────────────────────────────────────────────────
const STORIES = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&q=80",
    title: "Infidel",
    author: "Aaron Campbell",
    genre: "Horror",
    reward: "0.00005 SPCA",
    category: "Trending",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&q=80",
    title: "H.G. Wells: The Science Fiction",
    author: "H.G. Wells",
    genre: "Sci-fi, Action, Mystery",
    reward: "0.00005 SPCA",
    category: "Trending",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1614728263952-84ea256f9ae9?w=400&q=80",
    title: "Neon Silence",
    author: "K. Tanaka",
    genre: "Sci-fi, Action, Mystery",
    reward: "0.00005 SPCA",
    category: "Trending",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=400&q=80",
    title: "A Cyberpunk Ghost Story",
    author: "S.S",
    genre: "Sci-fi, Action",
    reward: "0.00005 SPCA",
    category: "Trending",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1551269901-5c5e506549a8?w=400&q=80",
    title: "Crimson Tide",
    author: "L. Montgomery",
    genre: "Thriller, Mystery",
    reward: "0.00005 SPCA",
    category: "Trending",
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&q=80",
    title: "Starborn",
    author: "C. Drake",
    genre: "Sci-fi, Fantasy",
    reward: "0.00005 SPCA",
    category: "Trending",
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&q=80",
    title: "Whispers in the Dark",
    author: "M. Rowe",
    genre: "Horror, Mystery",
    reward: "0.00005 SPCA",
    category: "Trending",
  },
  {
    id: 8,
    image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=400&q=80",
    title: "Beyond the Veil",
    author: "P. Castillo",
    genre: "Fantasy, Action",
    reward: "0.00005 SPCA",
    category: "Trending",
  },
];

const GENRES = ["All", "Horror", "Sci-fi", "Fantasy", "Thriller", "Mystery", "Action", "Romance"];
const AUTHORS = ["All", "Aaron Campbell", "H.G. Wells", "K. Tanaka", "S.S", "L. Montgomery", "C. Drake", "M. Rowe", "P. Castillo"];

// ── Dropdown ───────────────────────────────────────────────────────────────
function Dropdown({ label, options, value, onChange }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2.5 bg-transparent border border-white/20 rounded text-white/70 text-sm hover:border-white/40 transition min-w-[160px] justify-between"
      >
        <span>{value || label}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-1 w-full bg-zinc-900 border border-white/10 rounded shadow-xl z-50 overflow-hidden">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => { onChange(opt === "All" ? "" : opt); setOpen(false); }}
              className="w-full text-left px-4 py-2 text-sm text-white/70 hover:bg-white/10 hover:text-white transition"
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────
export default function StoriesPage() {
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("");

  const filtered = STORIES.filter((s) => {
    const matchSearch =
      !search ||
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.author.toLowerCase().includes(search.toLowerCase());
    const matchGenre = !selectedGenre || s.genre.toLowerCase().includes(selectedGenre.toLowerCase());
    const matchAuthor = !selectedAuthor || s.author === selectedAuthor;
    return matchSearch && matchGenre && matchAuthor;
  });

  const row1 = filtered.slice(0, 4);
  const row2 = filtered.slice(4, 8);

  return (
    <div className="min-h-screen bg-black text-white px-8 py-12" style={{ fontFamily: "'Georgia', serif" }}>
      <div className="max-w-6xl mx-auto">

        {/* ── Search ── */}
        <h1 className="text-4xl font-bold mb-6 tracking-tight">Search</h1>

        <div className="relative mb-6">
          <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          <input
            type="text"
            placeholder="Search anything"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent border-b border-white/20 pl-8 pr-4 pb-3 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-white/50 transition"
          />
        </div>

        {/* ── Filters ── */}
        <div className="flex gap-3 mb-14">
          <Dropdown
            label="Select Genre"
            options={GENRES}
            value={selectedGenre}
            onChange={setSelectedGenre}
          />
          <Dropdown
            label="Select Authors"
            options={AUTHORS}
            value={selectedAuthor}
            onChange={setSelectedAuthor}
          />
        </div>

        {/* ── Category ── */}
        <h2 className="text-2xl font-semibold mb-6">Trending Stories</h2>

        {filtered.length === 0 ? (
          <p className="text-white/40 text-sm mt-8">No stories match your search.</p>
        ) : (
          <div className="flex flex-col gap-6">
            {/* Row 1 */}
            {row1.length > 0 && (
              <div className="grid grid-cols-4 gap-4">
                {row1.map((story) => (
                  <StoryCard key={story.id} {...story} />
                ))}
              </div>
            )}
            {/* Row 2 */}
            {row2.length > 0 && (
              <div className="grid grid-cols-4 gap-4">
                {row2.map((story) => (
                  <StoryCard key={story.id} {...story} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
