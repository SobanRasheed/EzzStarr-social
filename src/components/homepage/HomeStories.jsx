import { useDispatch, useSelector } from "react-redux";
import StoryCard from "../reuseable comps/StoryCard.jsx";
import { useEffect } from "react";
import { fetchStory } from "../../store/slices/storySlice.js";


export default function HomeStories() {
  const dispatch = useDispatch();

  const { stories, isLoading, error } = useSelector(
    (state) => state.story);
  useEffect(() => {
    dispatch(fetchStory());
  }, [dispatch]);
  return (
    <section className="mx-35 py-12 bg-black">
      {/* Heading */}
      <h2 className="text-white text-5xl font-semibold text-center mb-10">
        Stories
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
        {stories.map((story) => (
          <StoryCard key={story.id} {...story} />
        ))}
      </div>
    </section>
  );
}
