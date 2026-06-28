import { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import StoriesFilters from "../components/stories/StoriesFilters";
import StoriesGrid from "../components/stories/StoriesGrid";
import StoryDetailPage from "../components/stories/StoryDetailPage";
import { fetchStory } from "../store/slices/storySlice";

const STORIES_API_URL = `${import.meta.env.VITE_API_URL}/api/stories`;

/* ── Mock fallback data — 5 categories × 8 stories ───── */
const MOCK_STORIES = [
  // ── Horror ──
  { id: 101, title: "Infidel", author: "Aaron Campbell", genre: "Horror", image: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?q=80&w=600&auto=format&fit=crop", reward: "0.00005 SPCA" },
  { id: 102, title: "The Hollow Ones", author: "Guillermo del Toro", genre: "Horror", image: "https://images.unsplash.com/photo-1533709752211-118fcaf03312?q=80&w=600&auto=format&fit=crop", reward: "0.00005 SPCA" },
  { id: 103, title: "Whispers in the Dark", author: "S.S miki", genre: "Horror", image: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=600&auto=format&fit=crop", reward: "0.00005 SPCA" },
  { id: 104, title: "Crimson Shadows", author: "Ezzstar Originals", genre: "Horror", image: "https://images.unsplash.com/photo-1515705576963-95cad62945b6?q=80&w=600&auto=format&fit=crop", reward: "0.00005 SPCA" },
  { id: 105, title: "Night Terrors", author: "Aaron Campbell", genre: "Horror", image: "https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=600&auto=format&fit=crop", reward: "0.00005 SPCA" },
  { id: 106, title: "The Last Séance", author: "S.S miki", genre: "Horror", image: "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=600&auto=format&fit=crop", reward: "0.00005 SPCA" },
  { id: 107, title: "Bone Church", author: "Ezzstar Originals", genre: "Horror", image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=600&auto=format&fit=crop", reward: "0.00005 SPCA" },
  { id: 108, title: "Echoes of Dread", author: "Guillermo del Toro", genre: "Horror", image: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?q=80&w=600&auto=format&fit=crop", reward: "0.00005 SPCA" },

  // ── Sci-fi, Action, Mystery ──
  { id: 201, title: "H.G. Wells: The Science Fiction", author: "H.G. Wells", genre: "Sci-fi, Action, Mystery", image: "https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?q=80&w=600&auto=format&fit=crop", reward: "0.00005 SPCA" },
  { id: 202, title: "A Cyberpunk Ghost Story", author: "H.G. Wells", genre: "Sci-fi, Action, Mystery", image: "https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?q=80&w=600&auto=format&fit=crop", reward: "0.00005 SPCA" },
  { id: 203, title: "Neon Dragons: A Cyberpunk", author: "Isekai LitRPG", genre: "Sci-fi, Action, Mystery", image: "https://images.unsplash.com/photo-1560762484-813fc97650a0?q=80&w=600&auto=format&fit=crop", reward: "0.00005 SPCA" },
  { id: 204, title: "War of the Worlds", author: "H.G. Wells", genre: "Sci-fi, Action, Mystery", image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=600&auto=format&fit=crop", reward: "0.00005 SPCA" },
  { id: 205, title: "Sense: 不祥的预感", author: "H.G. Wells", genre: "Sci-fi, Action, Mystery", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop", reward: "0.00005 SPCA" },
  { id: 206, title: "Daily Reminder: Good Things", author: "Ezzstar Originals", genre: "Sci-fi, Action, Mystery", image: "https://images.unsplash.com/photo-1504192010706-dd7f569ee2be?q=80&w=600&auto=format&fit=crop", reward: "0.00005 SPCA" },
  { id: 207, title: "The Quantum Paradox", author: "H.G. Wells", genre: "Sci-fi, Action, Mystery", image: "https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?q=80&w=600&auto=format&fit=crop", reward: "0.00005 SPCA" },
  { id: 208, title: "Stellar Odyssey", author: "H.G. Wells", genre: "Sci-fi, Action, Mystery", image: "https://images.unsplash.com/photo-1505682634904-d7c8d95cdc50?q=80&w=600&auto=format&fit=crop", reward: "0.00005 SPCA" },

  // ── Fantasy ──
  { id: 301, title: "The Whispering Woods", author: "Ezzstar Originals", genre: "Fantasy", image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop", reward: "0.00005 SPCA" },
  { id: 302, title: "Boneshaker", author: "Cherie Priest", genre: "Fantasy", image: "https://images.unsplash.com/photo-1505682634904-d7c8d95cdc50?q=80&w=600&auto=format&fit=crop", reward: "0.00005 SPCA" },
  { id: 303, title: "Dragon's Heir", author: "Ezzstar Originals", genre: "Fantasy", image: "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=600&auto=format&fit=crop", reward: "0.00005 SPCA" },
  { id: 304, title: "Realm of the Forgotten", author: "Aaron Campbell", genre: "Fantasy", image: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?q=80&w=600&auto=format&fit=crop", reward: "0.00005 SPCA" },
  { id: 305, title: "The Crystal Mage", author: "S.S miki", genre: "Fantasy", image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=600&auto=format&fit=crop", reward: "0.00005 SPCA" },
  { id: 306, title: "Arcane Legacy", author: "Ezzstar Originals", genre: "Fantasy", image: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=600&auto=format&fit=crop", reward: "0.00005 SPCA" },
  { id: 307, title: "The Enchanted Forest", author: "Cherie Priest", genre: "Fantasy", image: "https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=600&auto=format&fit=crop", reward: "0.00005 SPCA" },
  { id: 308, title: "Shadowbound", author: "Aaron Campbell", genre: "Fantasy", image: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=600&auto=format&fit=crop", reward: "0.00005 SPCA" },

  // ── Romance ──
  { id: 401, title: "Moonlit Promises", author: "Ezzstar Originals", genre: "Romance", image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=600&auto=format&fit=crop", reward: "0.00005 SPCA" },
  { id: 402, title: "Letters to the Sea", author: "S.S miki", genre: "Romance", image: "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?q=80&w=600&auto=format&fit=crop", reward: "0.00005 SPCA" },
  { id: 403, title: "The Last Summer", author: "Aaron Campbell", genre: "Romance", image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=600&auto=format&fit=crop", reward: "0.00005 SPCA" },
  { id: 404, title: "Starlight Serenade", author: "Ezzstar Originals", genre: "Romance", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=600&auto=format&fit=crop", reward: "0.00005 SPCA" },
  { id: 405, title: "Whispers of the Heart", author: "Cherie Priest", genre: "Romance", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop", reward: "0.00005 SPCA" },
  { id: 406, title: "The Paris Connection", author: "S.S miki", genre: "Romance", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=600&auto=format&fit=crop", reward: "0.00005 SPCA" },
  { id: 407, title: "A Thousand Dawns", author: "Ezzstar Originals", genre: "Romance", image: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?q=80&w=600&auto=format&fit=crop", reward: "0.00005 SPCA" },
  { id: 408, title: "Eternal Flame", author: "Aaron Campbell", genre: "Romance", image: "https://images.unsplash.com/photo-1475189778702-5ec9941484ae?q=80&w=600&auto=format&fit=crop", reward: "0.00005 SPCA" },

  // ── Thriller ──
  { id: 501, title: "The Silent Witness", author: "Guillermo del Toro", genre: "Thriller", image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=600&auto=format&fit=crop", reward: "0.00005 SPCA" },
  { id: 502, title: "Dead Man's Hand", author: "Aaron Campbell", genre: "Thriller", image: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?q=80&w=600&auto=format&fit=crop", reward: "0.00005 SPCA" },
  { id: 503, title: "The Vanishing Point", author: "Ezzstar Originals", genre: "Thriller", image: "https://images.unsplash.com/photo-1533709752211-118fcaf03312?q=80&w=600&auto=format&fit=crop", reward: "0.00005 SPCA" },
  { id: 504, title: "Cold Trail", author: "H.G. Wells", genre: "Thriller", image: "https://images.unsplash.com/photo-1515705576963-95cad62945b6?q=80&w=600&auto=format&fit=crop", reward: "0.00005 SPCA" },
  { id: 505, title: "The Blackout Protocol", author: "S.S miki", genre: "Thriller", image: "https://images.unsplash.com/photo-1560762484-813fc97650a0?q=80&w=600&auto=format&fit=crop", reward: "0.00005 SPCA" },
  { id: 506, title: "No Way Out", author: "Guillermo del Toro", genre: "Thriller", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop", reward: "0.00005 SPCA" },
  { id: 507, title: "The Informant", author: "Ezzstar Originals", genre: "Thriller", image: "https://images.unsplash.com/photo-1504192010706-dd7f569ee2be?q=80&w=600&auto=format&fit=crop", reward: "0.00005 SPCA" },
  { id: 508, title: "Razor's Edge", author: "Aaron Campbell", genre: "Thriller", image: "https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?q=80&w=600&auto=format&fit=crop", reward: "0.00005 SPCA" },
];

/* ── Helper: group flat story list into categories ────── */
function groupByGenre(stories) {
  const map = {};
  stories.forEach((story) => {
    const key = story.genre || "Uncategorized";
    if (!map[key]) map[key] = [];
    map[key].push(story);
  });
  return Object.entries(map).map(([name, items]) => ({
    name,
    stories: items,
  }));
}

export default function StoriesPage() {
  const dispatch = useDispatch();
  const {
    stories: reduxStories,
    isLoading,
    error,
  } = useSelector((state) => state.story);

  useEffect(() => {
    dispatch(fetchStory());
  }, [dispatch]);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [selectedStory, setSelectedStory] = useState(null);
  const [isLoadingSelectedStory, setIsLoadingSelectedStory] = useState(false);
  const [selectedStoryError, setSelectedStoryError] = useState("");

  // External APIs State
  const [source, setSource] = useState("platform"); // 'platform', 'openlibrary', 'zyla'
  const [localStories, setLocalStories] = useState([]);
  const [localLoading, setLocalLoading] = useState(false);
  const [localError, setLocalError] = useState("");

  // Fetch local external stories
  useEffect(() => {
    if (source === "platform") {
      setLocalStories([]);
      return;
    }

    const fetchExternalStories = async () => {
      setLocalLoading(true);
      setLocalError("");
      try {
        let url = "";
        if (source === "openlibrary") {
          const query = search.trim() || "fantasy";
          url = `${import.meta.env.VITE_API_URL}/api/stories/openlibrary/search?${
            search.trim() ? `q=${encodeURIComponent(query)}` : `subject=${encodeURIComponent(query)}`
          }&limit=20`;
        } else if (source === "zyla") {
          url = `${import.meta.env.VITE_API_URL}/api/stories/zyla/novels?limit=20`;
        }

        const res = await fetch(url);
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.message || `HTTP error! status: ${res.status}`);
        }
        const result = await res.json();
        const dataList = result.data || [];

        const mapped = dataList.map((item) => {
          if (source === "openlibrary") {
            return {
              id: item.id,
              title: item.title,
              author: item.author,
              genre: item.subjects?.[0] || "Fiction",
              genres: item.subjects || ["Fiction"],
              image: item.coverUrl || "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=600&auto=format&fit=crop",
              reward: "0.00005 SPCA",
              source: "openlibrary"
            };
          } else {
            return {
              id: item.id,
              title: item.title || item.name || "Untitled Novel",
              author: item.author || "Unknown",
              genre: item.genre || item.category || "Novel",
              genres: item.genres || [item.genre || "Novel"],
              image: item.cover_image || item.image_url || "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=600&auto=format&fit=crop",
              reward: "0.00005 SPCA",
              source: "zyla"
            };
          }
        });

        setLocalStories(mapped);
      } catch (err) {
        console.error("Error fetching external stories:", err);
        setLocalError(err.message);
      } finally {
        setLocalLoading(false);
      }
    };

    const delayDebounce = setTimeout(() => {
      fetchExternalStories();
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [source, search]);

  const stories =
    source === "platform"
      ? (error || reduxStories.length === 0 ? MOCK_STORIES : reduxStories)
      : localStories;

  const genres = [
    "All",
    ...new Set(
      stories
        .flatMap((story) =>
          story.genres ?? (story.genre ? story.genre.split(",") : [])
        )
        .map((g) => g.trim())
        .filter(Boolean)
    ),
  ];

  const authors = [
    "All",
    ...new Set(stories.map((s) => s.author).filter(Boolean)),
  ];

  /* ── Filtering ─────────────────────────────────────── */
  const filteredStories = stories.filter((story) => {
    const matchesSearch =
      !search ||
      story.title.toLowerCase().includes(search.toLowerCase()) ||
      story.author.toLowerCase().includes(search.toLowerCase());
    const matchesGenre =
      !selectedGenre ||
      selectedGenre === "All" ||
      (story.genre &&
        story.genre.toLowerCase().includes(selectedGenre.toLowerCase())) ||
      (story.genres ?? []).some(
        (g) => g.toLowerCase() === selectedGenre.toLowerCase()
      );
    const matchesAuthor = !selectedAuthor || selectedAuthor === "All" || story.author === selectedAuthor;

    return matchesSearch && matchesGenre && matchesAuthor;
  });

  /* ── Build categories from filtered stories ────────── */
  const categories = useMemo(
    () => groupByGenre(filteredStories),
    [filteredStories]
  );

  /* ── Error toast ───────────────────────────────────── */
  useEffect(() => {
    if (!selectedStoryError) return undefined;
    const timer = setTimeout(() => setSelectedStoryError(""), 4000);
    return () => clearTimeout(timer);
  }, [selectedStoryError]);

  /* ── Fetch single story detail ─────────────────────── */
  const fetchStoryDetail = async (storyId) => {
    try {
      setIsLoadingSelectedStory(true);
      setSelectedStoryError("");

      const activeStoryCard = localStories.find(s => String(s.id) === String(storyId));
      const activeSource = activeStoryCard?.source || source;

      let detailedStory = null;
      if (activeSource === "openlibrary") {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/stories/openlibrary/work/${storyId}`);
        if (!response.ok) throw new Error("Failed to fetch OpenLibrary book details");
        const resJson = await response.json();
        const data = resJson.data || {};
        
        const desc = typeof data.description === 'string' ? data.description : (data.description?.value || 'No description available.');
        const coverId = data.covers?.[0];
        const coverUrl = coverId ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg` : (activeStoryCard?.image || "");

        detailedStory = {
          id: storyId,
          title: data.title || activeStoryCard?.title || "Untitled",
          author: activeStoryCard?.author || "Unknown",
          genre: activeStoryCard?.genre || "General",
          image: coverUrl,
          reward: "0.00005 SPCA",
          views: 1000,
          rating: 4.5,
          chapters: 1,
          synopsis: desc,
          content: desc,
          parts: [
            { id: 1, title: "Read Book Online", duration: "External Link" }
          ],
          source: "openlibrary"
        };
      } else if (activeSource === "zyla") {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/stories/zyla/novels/${storyId}`);
        if (!response.ok) throw new Error("Failed to fetch Zyla novel details");
        const resJson = await response.json();
        const data = resJson.data || {};
        
        detailedStory = {
          id: storyId,
          title: data.title || activeStoryCard?.title || "Untitled Novel",
          author: data.author || activeStoryCard?.author || "Unknown",
          genre: data.genre || activeStoryCard?.genre || "Novel",
          image: data.cover_image || data.image_url || activeStoryCard?.image || "",
          reward: "0.00005 SPCA",
          views: 2400,
          rating: 4.7,
          chapters: data.chapters || 1,
          synopsis: data.description || data.synopsis || "No description available.",
          content: data.description || data.synopsis || "No content available.",
          parts: [
            { id: 1, title: "Read Chapter 1", duration: "10 min" }
          ],
          source: "zyla"
        };
      } else {
        const response = await fetch(`${STORIES_API_URL}/${storyId}`);
        if (!response.ok) throw new Error("Failed to fetch story details");
        detailedStory = await response.json();
      }

      setSelectedStory(detailedStory);
    } catch (err) {
      console.warn("Backend failed, using mock detailed story", err);
      const found = MOCK_STORIES.find((s) => String(s.id) === String(storyId));
      setSelectedStory({
        id: storyId,
        title: found?.title || "Untitled Story",
        author: found?.author || "Unknown",
        genre: found?.genre || "General",
        image: found?.image || "",
        reward: found?.reward || "0.00005 SPCA",
        views: 1200,
        rating: 4.8,
        chapters: 15,
        synopsis:
          "In a world where the trees can whisper your darkest secrets, one young explorer must venture deep into the heart of the ancient forest to find the truth about her missing brother.",
        content:
          "The old oaks groaned under the weight of a sudden breeze, their leaves rustling in a frantic, hurried cadence that sounded almost like voices. 'Turn back,' they seemed to say. But Elara gripped the hilt of her dagger tighter and stepped over the threshold of roots into the eternal gloom.\n\nShe had grown up hearing the tales—how the Whispering Woods remembered every sin, every secret, and every lost soul that wandered too far from the village path. Her grandmother used to say the trees fed on memories, leaving the wanderers as empty husks. But Elara wasn't here to lose her memories; she was here to find her brother.\n\nTobias had vanished three nights ago. The village elders had searched the perimeter, but none dared to go deeper than the first ring of stones. They had already mourned him, assuming the woods had claimed another victim. Elara refused to believe it.",
        parts: [
          { id: 1, title: "The Call of the Forest", duration: "15 min" },
          { id: 2, title: "Shadows in the Mist", duration: "20 min" },
          { id: 3, title: "The First Whisper", duration: "18 min" },
        ],
      });
    } finally {
      setIsLoadingSelectedStory(false);
    }
  };

  useEffect(() => {
    const storyId = searchParams.get("story");
    if (!storyId) {
      setSelectedStory(null);
      return;
    }
    if (selectedStory && String(selectedStory.id) === String(storyId)) return;
    fetchStoryDetail(storyId);
  }, [searchParams, selectedStory?.id]);

  const handleSelectStory = (story) => {
    setSearchParams({ story: String(story.id) });
  };

  /* ── Story detail view ─────────────────────────────── */
  if (selectedStory) {
    return (
      <StoryDetailPage
        story={selectedStory}
        onBack={() => {
          setSelectedStory(null);
          navigate("/stories");
        }}
      />
    );
  }

  const activeLoading = source === "platform" ? isLoading : localLoading;
  const activeError = source === "platform" ? error : localError;

  /* ── Main stories listing ──────────────────────────── */
  return (
    <div
      className="min-h-screen bg-black text-white px-8 pt-28 pb-12"
      style={{ fontFamily: "'Georgia', serif" }}
    >
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl mb-6 tracking-tight text-white font-sf">Search</h1>

        {/* SOURCE TABS */}
        <div className="flex gap-4 mb-8 border-b border-white/10 pb-4">
          {["platform", "openlibrary", "zyla"].map((src) => (
            <button
              key={src}
              onClick={() => {
                setSource(src);
                setSelectedGenre("");
                setSelectedAuthor("");
              }}
              className={`text-sm font-bold uppercase tracking-wider px-4 py-2 border transition ${
                source === src
                  ? "border-[#DF28E2] text-[#DF28E2] bg-[#DF28E2]/10"
                  : "border-white/10 text-gray-400 hover:text-white hover:border-white/30"
              }`}
            >
              {src === "platform" ? "Ezzstar Stories" : src === "openlibrary" ? "Open Library" : "Zyla Novels"}
            </button>
          ))}
        </div>

        <StoriesFilters
          search={search}
          onSearchChange={setSearch}
          genres={genres}
          selectedGenre={selectedGenre}
          onGenreChange={setSelectedGenre}
          authors={authors}
          selectedAuthor={selectedAuthor}
          onAuthorChange={setSelectedAuthor}
        />

        {activeError ? (
          <p className="text-red-400 text-sm mt-8">{activeError}</p>
        ) : null}
        {selectedStoryError ? (
          <p className="text-red-400 text-sm mb-4">{selectedStoryError}</p>
        ) : null}
        {isLoadingSelectedStory ? (
          <p className="text-white/60 text-sm mb-4">Loading story...</p>
        ) : null}

        {activeLoading ? (
          <div className="grid grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse bg-zinc-800 h-[280px] rounded-sm"
              />
            ))}
          </div>
        ) : categories.length === 0 ? (
          <p className="text-white/40 text-sm mt-8">
            No stories match your search.
          </p>
        ) : (
          <StoriesGrid
            categories={categories}
            onSelectStory={handleSelectStory}
          />
        )}
      </div>
    </div>
  );
}
