import MangaCard from "../reuseable comps/MangaCard";
import { X } from "lucide-react";
import { useState } from "react";

const HomeManga = () => {
  const [mangas, setMangas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleRetry = () => {
    setRetryCount((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col gap-2 px-4 md:px-20 lg:px-30 pt-10 dark-bg-2 ">

      <div className={`flex flex-col lg:flex-row gap-5`}>
        {/* Manga Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2  gap-2 w-full">
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
                imageUrl={manga.imageUrl}
                title={manga.title}
                author={manga.author}
                reward={manga.reward}
                date={manga.date}
              />
            ))
          )}
        </div>

        {/* Spica Poster */}
        {/* {showPoster && (
          <div className="hidden lg:flex relative w-full lg:w-auto justify-center lg:justify-start ">
            <video
              autoPlay
              loop
              muted
              src="/media/spica-video.mp4"
              className="h-[350px] sm:h-[400px] w-[350px] object-cover rounded-md hover:scale-105 transition-transform duration-700 ease-in-out"
              alt="Spica Poster"
            />
            <div
              className="absolute top-2 right-2 cursor-pointer"
              onClick={() => setShowPoster(false)}
            >
              <X size={20} className="text-white" />
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default HomeManga;
