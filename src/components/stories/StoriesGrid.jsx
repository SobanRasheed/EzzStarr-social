import StoryCard from "../reuseable comps/StoryCard";

export default function StoriesGrid({ stories, onSelectStory }) {
  const row1 = stories.slice(0, 4);
  const row2 = stories.slice(4, 8);

  return (
    <div className="flex flex-col gap-6">
      {row1.length > 0 && (
        <div className="grid grid-cols-4 gap-4">
          {row1.map((story) => (
            <StoryCard key={story.id} {...story} onClick={() => onSelectStory(story)} />
          ))}
        </div>
      )}
      {row2.length > 0 && (
        <div className="grid grid-cols-4 gap-4">
          {row2.map((story) => (
            <StoryCard key={story.id} {...story} onClick={() => onSelectStory(story)} />
          ))}
        </div>
      )}
    </div>
  );
}
