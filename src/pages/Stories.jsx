import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import StoriesFilters from "../components/stories/StoriesFilters";
import StoriesGrid from "../components/stories/StoriesGrid";
import StoryDetailPage from "../components/stories/StoryDetailPage";

const STORIES_API_URL = `${import.meta.env.VITE_API_URL}/api/stories`;

export default function StoriesPage() {
  const { stories, isLoading, error } = useSelector((state) => state.story);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [selectedStory, setSelectedStory] = useState(null);
  const [isLoadingSelectedStory, setIsLoadingSelectedStory] = useState(false);
  const [selectedStoryError, setSelectedStoryError] = useState("");

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
      story.genre.toLowerCase().includes(selectedGenre.toLowerCase()) ||
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
      setSelectedStoryError(fetchError.message || "Failed to fetch story details");
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
