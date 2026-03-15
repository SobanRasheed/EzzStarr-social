import MangaCard from "../reuseable comps/MangaCard";

const mangas = [
  {
    id: 1,
    imageUrl: "/placeholder.svg",
    title: "Blooming Love",
    author: "{Creator name}",
    genre: "Love Story, Thriller",
    reward: "0.00005 $SPCA",
    stars: 5,
    comments: 124,
    views: "23k",
  },
  {
    id: 2,
    imageUrl: "/placeholder.svg",
    title: "Shadow of Youth",
    author: "{Creator name}",
    genre: "Drama",
    reward: "0.00003 $SPCA",
    stars: 4.5,
    comments: 98,
    views: "18k",
  },
  {
    id: 3,
    imageUrl: "/placeholder.svg",
    title: "Shadow of Youth",
    author: "{Creator name}",
    genre: "Drama",
    reward: "0.00003 $SPCA",
    stars: 4.5,
    comments: 98,
    views: "18k",
  },
  {
    id: 4,
    imageUrl: "/placeholder.svg",
    title: "Shadow of Youth",
    author: "{Creator name}",
    genre: "Drama",
    reward: "0.00003 $SPCA",
    stars: 4.5,
    comments: 98,
    views: "18k",
  },
  {
    id: 5,
    imageUrl: "/placeholder.svg",
    title: "Shadow of Youth",
    author: "{Creator name}",
    genre: "Drama",
    reward: "0.00003 $SPCA",
    stars: 4.5,
    comments: 98,
    views: "18k",
  },
  {
    id: 6,
    imageUrl: "/placeholder.svg",
    title: "Shadow of Youth",
    author: "{Creator name}",
    genre: "Drama",
    reward: "0.00003 $SPCA",
    stars: 4.5,
    comments: 98,
    views: "18k",
  },
];


const DailyUpdates = () => {
  return (
    <section className="mt-10 px-4 md:px-10">
      {/* Heading + Filter */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-white">
          Daily Updates
        </h2>

        <select className="bg-[#1C1C1E] text-white text-sm px-4 py-2 rounded-full outline-none">
          <option>Select Category</option>
          <option>Romance</option>
          <option>Thriller</option>
          <option>Drama</option>
        </select>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mangas.map((manga) => (
          <MangaCard
            key={manga.id}
            imageUrl={manga.imageUrl}
            title={manga.title}
            author={manga.author}
            genre={manga.genre}
            reward={manga.reward}
            stars={manga.stars}
            comments={manga.comments}
            views={manga.views}
          />
        ))}
      </div>
    </section>
  );
};

export default DailyUpdates;
