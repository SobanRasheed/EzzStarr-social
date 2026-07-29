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
    <section
      className="flex flex-col items-center py-12"
      style={{
        padding: "48px 96px",
        gap: "24px",
        isolation: "isolate",
      }}
    >
      {/* Heading */}
      <h2 className="text-white text-5xl font-semibold text-center mb-10">
        Stories
      </h2>

      {/* Grid */}
      {showError ? (
        <p className="text-center text-red-400 text-sm">{error}</p>
      ) : isLoading ? (
        <div
          className="w-full"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 320px))",
            gap: "16px",
            justifyContent: "center",
          }}
        >
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="rounded-xl bg-zinc-800 animate-pulse" style={{ aspectRatio: "2/3" }} />
          ))}
        </div>
      ) : (
        <div
          className="w-full"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 320px))",
            gap: "16px",
            justifyContent: "center",
          }}
        >
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
