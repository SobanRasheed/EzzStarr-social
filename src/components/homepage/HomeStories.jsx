import { useDispatch, useSelector } from "react-redux";
import StoryCard from "../reuseable comps/StoryCard.jsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchStory } from "../../store/slices/storySlice.js";
import { mockStories } from "../../config/mockHomeData.js";


export default function HomeStories() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { stories, isLoading, error } = useSelector(
    (state) => state.story);
  useEffect(() => {
    dispatch(fetchStory());
  }, [dispatch]);

  // Dev fallback: show mock cards when the API is unavailable.
  const displayStories = error && stories.length === 0 ? mockStories : stories;
  const showError = error && displayStories.length === 0;
  return (
    <section className="mx-35 py-12 bg-black">
      {/* Heading */}
      <h2 className="text-white text-5xl font-semibold text-center mb-10">
        Stories
      </h2>

      {/* Grid */}
      {showError ? (
        <p className="text-center text-red-400 text-sm">{error}</p>
      ) : isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="h-[280px] rounded-sm bg-zinc-800 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
          {displayStories.map((story) => (
            <StoryCard
              key={story.id}
              {...story}
              onClick={() => navigate(`/stories?story=${story.id}`)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
