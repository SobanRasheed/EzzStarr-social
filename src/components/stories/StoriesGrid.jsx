import StoryCard from "../reuseable comps/StoryCard";

export default function StoriesGrid({ categories, onSelectStory }) {
  return (
    <div className="flex flex-col gap-14">
      {categories.map((category) => (
        <div key={category.name}>
          <h2 className="text-4xl font-normal text-white mb-6 font-sf">
            {category.name}
          </h2>

          <div className="grid grid-cols-4 gap-4">
            {category.stories.slice(0, 8).map((story, index) => (
              <StoryCard
                key={story.id}
                {...story}
                hasGlow={index < 3}
                onClick={() => onSelectStory(story)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
