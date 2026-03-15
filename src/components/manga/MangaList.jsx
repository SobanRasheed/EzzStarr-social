import { useEffect, useRef, useState } from "react";
import MangaCard from "../reuseable comps/MangaCard";

const MangaList = () => {
  // 🔁 Slider refs
  const sliderRef = useRef(null);
  const animationRef = useRef(null);

  // ⏳ Loading + error
  const [isLoading] = useState(false);
  const [error] = useState(null);

  // 🔄 Retry (future API use)
  const handleRetry = () => {
    console.log("Retry clicked");
  };
    const startSliding = () => {
    const slider = sliderRef.current;
    if (!slider) return;

    animationRef.current = setInterval(() => {
      slider.scrollLeft += 1;

      if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth) {
        slider.scrollLeft = 0;
      }
    }, 20);
  };

  const handleMouseEnter = () => {
    clearInterval(animationRef.current);
  };

  const handleMouseLeave = () => {
    startSliding();
  };

  // 📚 Dummy manga data
  const mangas = [
    {
      id: 1,
      imageUrl: "placeholder.svg",
      title: "Blooming Love",
      author: "{Creator name}",
      genre: "Love Story, Thriller",
      reward: "0.00005 $SPCA",
      stars: 5,
      comments: 124,
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
    },
  ];

  // ▶️ Auto-slide animation
  useEffect(() => {
  startSliding();

  return () => clearInterval(animationRef.current);
}, []);


  return (
    <div className="w-full overflow-hidden">
      <div
        ref={sliderRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="flex gap-4 overflow-x-scroll scrollbar-hide"
      >
        {isLoading ? (
          Array(4)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="w-[250px] h-[320px] bg-gray-700 animate-pulse rounded-xl"
              />
            ))
        ) : error ? (
          <div className="text-center text-red-500">
            <p>{error}</p>
            <button
              onClick={handleRetry}
              className="mt-2 px-4 py-2 bg-cyan-400 text-black rounded"
            >
              Retry
            </button>
          </div>
        ) : (
          mangas.map((manga) => (
            <MangaCard
              key={manga.id}
              id={manga.id}
              imageUrl={manga.imageUrl}
              title={manga.title}
              author={manga.author}
              genre={manga.genre}
              reward={manga.reward}
              stars={manga.stars}
              comments={manga.comments}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default MangaList;
