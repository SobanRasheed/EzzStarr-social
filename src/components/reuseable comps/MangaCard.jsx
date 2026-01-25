import { useState } from "react";
import { Share2 } from "lucide-react";
import { Link } from "react-router-dom";

const MangaCard = ({
  id,
  imageUrl,
  title,
  author,
  genre,
  reward,
  date,
  stars,
  comments,
  age,
  chapters,
}) => {
  const [hovered, setHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleClick = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div className="w-full bg-[#1C1C1E80] overflow-hidden text-white flex flex-col sm:flex-row hover:shadow-lg transition-all duration-500 relative group rounded-lg">
      {/* img Section */}
      <div
        className={`relative transition-all duration-500 ease-in-out overflow-hidden 
        ${hovered ? "sm:w-1/2" : "w-full h-[200px] sm:h-auto sm:w-[190px]"} 
        min-h-[250px] sm:min-h-[300px] flex-shrink-0`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Content Section */}
      <div className="flex-1 p-3 sm:p-4 md:pr-6 flex flex-col justify-between min-w-0">
        <div className="flex items-start justify-between pl-0 sm:pl-2">
          <p className="text-[10px] sm:text-xs text-white/90 underline">
            {author}
            <span className="ml-1 sm:ml-2 text-[#14FF00] underline">{genre}</span>
          </p>
          <img
            src="/icons/heart.svg"
            alt="Like Icon"
            width={25}
            height={25}
            className={`p-1 bg-[#FFFFFF1A] rounded-full cursor-pointer w-5 h-5 sm:w-6 sm:h-6 ${
              isLiked ? "text-red-500" : "text-white/60"
            }`}
          />
        </div>

        <h2 className="text-lg sm:text-xl md:text-2xl pl-0 sm:pl-2 line-clamp-1">{title}</h2>
        <p className="text-[10px] sm:text-xs pl-0 sm:pl-2 text-white opacity-50 mt-1 line-clamp-2 md:line-clamp-3">
          One day, when I was making school supplies in the art room, a very scary-looking girl was staring at me...!? Crafts girl vs. art boy romantic comedy!!
        </p>

        <div className="flex justify-between items-center pl-0 sm:pl-2 mt-2 sm:mt-4">
          <p className="text-[#DF28E2] text-[10px] sm:text-xs">Earn {reward}</p>

          <div className="flex justify-between items-center">
            <Link href={`/manga/${id}`}>
              <button className="bg-[#01F1E3] cursor-pointer text-black text-xs sm:text-sm px-3 py-1 sm:px-4 sm:py-2 hover:bg-cyan-300 transition rounded-sm">
                Open Manga
              </button>
            </Link>
          </div>
        </div>

        <div className="mt-3 sm:mt-6 h-8 sm:h-12 flex items-center relative">
          {/* Default content */}
          <div
            className={`absolute inset-0 w-full h-full transition-opacity overflow-hidden duration-500 ease-in-out z-10 ${
              !hovered ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
          >
            <div className="flex items-center gap-1 sm:gap-2 pl-0 sm:pl-2 border-y border-white/20 py-1 sm:py-2 text-zinc-100 text-xs sm:text-sm flex-wrap">
              <div
                onClick={handleClick}
                className="flex text-[8px] items-center justify-center cursor-pointer bg-[#FFFFFF1A] rounded-3xl pr-2 sm:pr-3 transition-all duration-300"
              >
                <span className="text-[2px] transition-all duration-300">
                  <img
                    src={isLiked ? "/icons/star-purple.svg" : "/icons/star1.svg"}
                    alt="Like"
                    width={20}
                    height={20}
                    className="transition-all duration-300 w-4 h-4 sm:w-5 sm:h-5"
                  />
                </span>
                <span className="text-[10px] sm:text-xs transition-all duration-300">Star {stars}</span>
              </div>
              <div className=" flex text-xs items-center gap-0.5 cursor-pointer bg-[#FFFFFF1A] rounded-3xl py-1 pr-3 pl-2">
                <span className="text-[10px]">
                  <img
                    src="/icons/comment.svg"
                    alt="Comment Icon"
                    width={16}
                    height={16}
                    className="w-3 h-3 sm:w-4 sm:h-4"
                  />
                </span>
                <span className="text-[10px] sm:text-xs">Comments ({comments})</span>
              </div>
              <div className=" flex text-xs items-center gap-0.5 cursor-pointer bg-[#FFFFFF1A] rounded-3xl py-1 pr-2 sm:pr-3 pl-1 sm:pl-2">
                <span className="text-[10px]">
                  <Share2 className="h-3 w-3" />
                </span>
                <span className="text-[10px] sm:text-xs">Share</span>
              </div>
              <Link href={`/threads/${id}`} className=" sm:block">
                <div className="flex text-xs items-center gap-0.5 bg-[#FFFFFF1A] rounded-3xl py-1 pr-2 sm:pr-3 pl-1 sm:pl-2">
                  <span className="text-[10px]">
                    <img src="/icons/threads.svg" alt="Threads" width={14} height={14} className="w-3 h-3 sm:w-4 sm:h-4" />
                  </span>
                  <span className="text-[10px] sm:text-xs">Threads</span>
                </div>
              </Link>
            </div>
          </div>

          <div
            className={`absolute inset-0 w-full h-full flex items-center transition-opacity duration-500 ease-in-out z-20 ${
              hovered ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
          >
            <div className="flex gap-2 sm:gap-3 text-xs items-center text-white/80 pl-0 sm:pl-2">
              <div className="border border-white/10 text-center text-white/60 px-2 sm:px-3 py-0.5 rounded text-[10px] sm:text-xs">
                {age}+
              </div>
              <div className="text-sm sm:text-base px-2 sm:px-3 py-0.5 sm:py-1">{chapters} Chapters</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MangaCard;
