import StoryCard from "../reuseable comps/StoryCard.jsx";

const stories = [
  {
    id: 1,
    image: "/placeholder.svg",
    title: "LOVE",
    author: "Olivia Wilson",
    genre: "Sci-Fi, Action, Mystery",
    reward: "0.00005 SPCA",
  },
  {
    id: 2,
    image: "/placeholder.svg",
    title: "CAINE COIN",
    author: "H.G. Wells",
    genre: "Sci-Fi, Action, Mystery",
    reward: "0.00005 SPCA",
  },
  {
    id: 3,
    image: "/placeholder.svg",
    title: "The Black Girl",
    author: "H.G. Wells",
    genre: "Sci-Fi, Action, Mystery",
    reward: "0.00005 SPCA",
  },
  {
    id: 4,
    image: "/placeholder.svg",
    title: "LOVE",
    author: "Olivia Wilson",
    genre: "Sci-Fi, Action, Mystery",
    reward: "0.00005 SPCA",
  },
  {
    id: 5,
    image: "/placeholder.svg",
    title: "LOVE",
    author: "Olivia Wilson",
    genre: "Sci-Fi, Action, Mystery",
    reward: "0.00005 SPCA",
  },
  {
    id: 6,
    image: "/placeholder.svg",
    title: "CAINE COIN",
    author: "H.G. Wells",
    genre: "Sci-Fi, Action, Mystery",
    reward: "0.00005 SPCA",
  },
  {
    id: 7,
    image: "/placeholder.svg",
    title: "The Black Girl",
    author: "H.G. Wells",
    genre: "Sci-Fi, Action, Mystery",
    reward: "0.00005 SPCA",
  },
  {
    id: 8,
    image: "/placeholder.svg",
    title: "LOVE",
    author: "Olivia Wilson",
    genre: "Sci-Fi, Action, Mystery",
    reward: "0.00005 SPCA",
  },
];

export default function HomeStories() {
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
