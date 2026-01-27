import { Heart } from "lucide-react";
import { useState } from "react";

export default function StoryCard({
  image,
  title,
  author,
  genre,
  reward,
}) {
  const [liked, setLiked] = useState(false);

  return (
    <div className="relative group rounded-xl overflow-hidden bg-black cursor-pointer">

      {/* Image */}
      <img
        src={image}
        alt={title}
        className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

      {/* Reward pill */}
      <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium bg-yellow-400 text-black">
        Earn {reward}
      </div>

      {/* Like */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setLiked(!liked);
        }}
        className="absolute top-3 right-3 p-2 rounded-full bg-black/60 hover:bg-black/80 transition"
      >
        <Heart
          className={`w-4 h-4 ${
            liked ? "fill-red-500 text-red-500" : "text-white"
          }`}
        />
      </button>

      {/* Content */}
      <div className="absolute bottom-0 p-4 w-full">
        <h3 className="text-white font-semibold text-sm line-clamp-1">
          {title}
        </h3>

        <p className="text-xs text-white/70 mt-1">
          {author}
        </p>

        <p className="text-[10px] mt-1 text-green-400">
          {genre}
        </p>
      </div>
    </div>
  );
}
