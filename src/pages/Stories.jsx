import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import StoriesFilters from "../components/stories/StoriesFilters";
import StoriesGrid from "../components/stories/StoriesGrid";
import StoryDetailPage from "../components/stories/StoryDetailPage";

const STORIES_API_URL = `${import.meta.env.VITE_API_URL}/api/stories`;

export default function StoriesPage() {
  const { stories: reduxStories, isLoading, error } = useSelector((state) => state.story);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [selectedStory, setSelectedStory] = useState(null);
  const [isLoadingSelectedStory, setIsLoadingSelectedStory] = useState(false);
  const [selectedStoryError, setSelectedStoryError] = useState("");

  // MOCK DATA: Fallback if backend is not running
  const mockStories = [
    {
      id: 1,
      title: "The Whispering Woods",
      author: "Jane Doe",
      genre: "Fantasy, Mystery",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop",
      reward: "150 SPICA",
      views: 1200,
      rating: 4.8,
      chapters: 15
    },
    {
      id: 2,
      title: "Neon City Nights",
      author: "John Smith",
      genre: "Sci-Fi, Cyberpunk",
      image: "https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?q=80&w=600&auto=format&fit=crop",
      reward: "200 SPICA",
      views: 850,
      rating: 4.5,
      chapters: 8
    }
  ];

  const stories = error || reduxStories.length === 0 ? mockStories : reduxStories;

  const genres = [
    "All",
    ...new Set(
      stories
        .flatMap((story) => story.genres ?? (story.genre ? story.genre.split(",") : []))
        .map((genre) => genre.trim())
        .filter(Boolean)
    ),
  ];

  const authors = ["All", ...new Set(stories.map((story) => story.author).filter(Boolean))];

  const filteredStories = stories.filter((story) => {
    const matchesSearch =
      !search ||
      story.title.toLowerCase().includes(search.toLowerCase()) ||
      story.author.toLowerCase().includes(search.toLowerCase());
    const matchesGenre =
      !selectedGenre ||
      (story.genre && story.genre.toLowerCase().includes(selectedGenre.toLowerCase())) ||
      (story.genres ?? []).some(
        (genre) => genre.toLowerCase() === selectedGenre.toLowerCase()
      );
    const matchesAuthor = !selectedAuthor || story.author === selectedAuthor;

    return matchesSearch && matchesGenre && matchesAuthor;
  });

  useEffect(() => {
    if (!selectedStoryError) {
      return undefined;
    }

    const timer = setTimeout(() => setSelectedStoryError(""), 4000);
    return () => clearTimeout(timer);
  }, [selectedStoryError]);

  const fetchStoryDetail = async (storyId) => {
    try {
      setIsLoadingSelectedStory(true);
      setSelectedStoryError("");

      const response = await fetch(`${STORIES_API_URL}/${storyId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch story details");
      }

      const detailedStory = await response.json();
      setSelectedStory(detailedStory);
    } catch (fetchError) {
      console.warn("Backend failed, using mock detailed story");
      // MOCK DATA for detail page
      setSelectedStory({
        id: Number(storyId),
        title: storyId === "1" ? "The Whispering Woods" : "Neon City Nights",
        author: storyId === "1" ? "Jane Doe" : "John Smith",
        genre: storyId === "1" ? "Fantasy, Mystery" : "Sci-Fi, Cyberpunk",
        image: storyId === "1" 
          ? "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop"
          : "https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?q=80&w=1200&auto=format&fit=crop",
        reward: storyId === "1" ? "150 SPICA" : "200 SPICA",
        views: 1200,
        rating: 4.8,
        chapters: 15,
        synopsis: "In a world where the trees can whisper your darkest secrets, one young explorer must venture deep into the heart of the ancient forest to find the truth about her missing brother.",
        content: "The old oaks groaned under the weight of a sudden breeze, their leaves rustling in a frantic, hurried cadence that sounded almost like voices. 'Turn back,' they seemed to say. But Elara gripped the hilt of her dagger tighter and stepped over the threshold of roots into the eternal gloom.\n\nShe had grown up hearing the tales—how the Whispering Woods remembered every sin, every secret, and every lost soul that wandered too far from the village path. Her grandmother used to say the trees fed on memories, leaving the wanderers as empty husks. But Elara wasn't here to lose her memories; she was here to find her brother.\n\nTobias had vanished three nights ago. The village elders had searched the perimeter, but none dared to go deeper than the first ring of stones. They had already mourned him, assuming the woods had claimed another victim. Elara refused to believe it. She knew Tobias. He was resourceful, quick-witted, and carried the same stubborn streak that now pushed her forward.",
        parts: [
          { id: 1, title: "The Call of the Forest", duration: "15 min" },
          { id: 2, title: "Shadows in the Mist", duration: "20 min" },
          { id: 3, title: "The First Whisper", duration: "18 min" }
        ]
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

    if (selectedStory?.id === Number(storyId)) {
      return;
    }

    fetchStoryDetail(storyId);
  }, [searchParams, selectedStory?.id]);

  const handleSelectStory = async (story) => {
    setSearchParams({ story: String(story.id) });
  };

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

  return (
    <div className="min-h-screen bg-black text-white px-8 py-12" style={{ fontFamily: "'Georgia', serif" }}>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 tracking-tight">Search</h1>

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

        <h2 className="text-2xl font-semibold mb-6">Trending Stories</h2>

        {error ? <p className="text-red-400 text-sm mt-8">{error}</p> : null}
        {selectedStoryError ? <p className="text-red-400 text-sm mb-4">{selectedStoryError}</p> : null}
        {isLoadingSelectedStory ? <p className="text-white/60 text-sm mb-4">Loading story...</p> : null}

        {isLoading ? (
          <div className="grid grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="animate-pulse bg-zinc-800 h-[280px] rounded-sm" />
            ))}
          </div>
        ) : filteredStories.length === 0 ? (
          <p className="text-white/40 text-sm mt-8">No stories match your search.</p>
        ) : (
          <StoriesGrid stories={filteredStories} onSelectStory={handleSelectStory} />
        )}
      </div>
    </div>
  );
}
