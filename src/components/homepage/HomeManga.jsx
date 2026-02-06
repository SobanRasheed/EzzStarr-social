import MangaCard from "../reuseable comps/MangaCard";
import { X } from "lucide-react";
import { useState, useRef, useEffect } from "react";


const HomeManga = () => {
  // let [mangas, setMangas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRetry = () => {
    setRetryCount((prev) => prev + 1);
  };
 let mangas = [
  {
    id: 1,
    imageUrl: "placeholder.svg",
    title: "Blooming Love",
    author: "{Creator name}",
    genre: "Love Story, Thriller",
    reward: "0.00005 $SPCA",
    stars: 5,
    comments: 124,
    chapters: 4,
    views: "23k",
    description:
      "One day, when I was making school supplies in the art room, a very scary-looking girl was staring at me...!? Crafts girl vs. art boy romantic comedy!!",
  },
  {
    id: 2,
    imageUrl: "placeholder.svg",
    title: "Shadow of Youth",
    author: "{Creator name}",
    genre: "Drama, Slice of Life",
    reward: "0.00003 $SPCA",
    stars: 4.5,
    comments: 98,
    chapters: 6,
    views: "18k",
    description:
      "Two classmates struggle with identity, expectations, and the silent pressure of growing up.",
  },
  {
    id: 3,
    imageUrl: "placeholder.svg",
    title: "Neon Hearts",
    author: "{Creator name}",
    genre: "Romance, Sci-Fi",
    reward: "0.00007 $SPCA",
    stars: 4.8,
    comments: 212,
    chapters: 9,
    views: "31k",
    description:
      "In a city ruled by neon lights and secrets, love becomes the most dangerous rebellion.",
  },
  {
    id: 4,
    imageUrl: "placeholder.svg",
    title: "Crimson Signal",
    author: "{Creator name}",
    genre: "Action, Mystery",
    reward: "0.00006 $SPCA",
    stars: 4.2,
    comments: 76,
    chapters: 5,
    views: "15k",
    description:
      "A sudden transmission pulls an ordinary student into a hidden war beneath the city.",
  },
  {
    id: 5,
    imageUrl: "placeholder.svg",
    title: "Petals After Rain",
    author: "{Creator name}",
    genre: "Romance, Drama",
    reward: "0.00004 $SPCA",
    stars: 4.9,
    comments: 301,
    chapters: 12,
    views: "45k",
    description:
      "After heartbreak and loss, two strangers find healing in the quiet moments they share.",
  },
  {
    id: 6,
    imageUrl: "placeholder.svg",
    title: "One-Shot: Fading Echo",
    author: "{Creator name}",
    genre: "Psychological, One-Shot",
    reward: "0.00002 $SPCA",
    stars: 4.6,
    comments: 52,
    chapters: 1,
    views: "9k",
    description:
      "A single moment, a single choice — and an echo that never fades.",
  },
];

  return (
    <div className="flex flex-col gap-2 mt-8 px-4 md:px-20 lg:px-3 pt-10 dark-bg-2 ">

      <div className={`flex flex-col lg:flex-row gap-5`}>
        {/* Manga Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3  gap-2 w-full">
          {isLoading ? (
            // Loading skeleton
            Array(8)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="animate-pulse bg-gray-700 rounded-lg h-[300px]"
                />
              ))
          ) : error ? (
            // Error message with retry button
            <div className="col-span-full text-center py-4">
              <p className="text-red-500 mb-4">Error: {error}</p>
              <button
                onClick={handleRetry}
                className="px-4 py-2 bg-[#51FFF4] text-black rounded hover:bg-[#AD7AFF] transition-colors"
              >
                Retry Loading
              </button>
            </div>
          ) : (
            // Manga cards
            mangas.map((manga) => (
              <MangaCard
                key={manga.id}
                id={manga.id}
                stars={manga.stars}
                genre={manga.genre}
                comments={manga.comments}
                imageUrl={manga.imageUrl}
                title={manga.title}
                author={manga.author}
                reward={manga.reward}
                date={manga.date}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeManga;
