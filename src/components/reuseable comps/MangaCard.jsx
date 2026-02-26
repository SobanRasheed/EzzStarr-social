import { useState } from "react";
import { Heart, Share2, Eye, MessageCircle, Star } from "lucide-react";

const MangaCard = ({
  imageUrl,
  title,
  author,
  genre,
  reward,
  stars,
  comments,
  views = "23k",
  description,
}) => {
  console.log(`${import.meta.env.VITE_API_URL}${imageUrl}`);
  const [isLiked, setIsLiked] = useState(false);
  return (
    <div className="group relative w-full bg-[#1C1C1E80] rounded-xl overflow-hidden text-white flex flex-col md:flex-row transition hover:shadow-xl">
      {/* ❤️ Heart */}
      <button
        onClick={() => setIsLiked(!isLiked)}
        className="absolute top-2 right-2 z-10 bg-black/60 hover:bg-black/80 p-1 rounded-full"
      >
        <Heart
          className={`w-5 h-5 transition ${isLiked ? "fill-red-500 text-red-500" : "text-white"
            }`}
        />
      </button>

      {/* 🖼 Image */}
      <div className="w-full md:w-40 h-60 flex-shrink-0">
        <img
          src={`${import.meta.env.VITE_API_URL}${imageUrl}`}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* 📄 Content */}
      <div className="flex-1 p-2 flex flex-col justify-between">

        <div>
          {/* Author + Genre */}
          <p className="text-xs text-white/60">
            {author}
            {genre && (
              <span className="text-[#14FF00] line-clamp-1">{genre}</span>
            )}
          </p>

          {/* Title + Share */}
          <div className="flex items-start justify-between gap-2 mt-1">
            <h2 className="text-lg font-semibold line-clamp-2">
              {title}
            </h2>
            <Share2 className="w-4 h-4 mt-1 text-white/70 hover:text-white cursor-pointer" />
          </div>

          {/* Description */}
          <p className="text-xs text-white/50 mt-2 line-clamp-2">
            {description }
          </p>
        </div>

        <div>
          <p className="text-xs mt-1 text-[#DF28E2]">
            Earn {reward}
          </p>
          {/* 📊 Stats */}
          <div className="my-1 flex flex-wrap gap-1">
            <hr className="w-full text-gray-800 mb-1" />
            <Stat icon={<Eye className="w-3 h-3" />} value={views} />
            <Stat icon={<Star className="w-3 h-3" />} value={stars} />
            <Stat icon={<MessageCircle className="w-3 h-3" />} value={comments} />
            <Stat icon={<MessageCircle className="w-3 h-3" />} value={comments} />
            <hr className="w-full text-gray-800 mt-1" />
          </div>
        </div>

      </div>
    </div>
  );
};

const Stat = ({ icon, value }) => (
  <div className="flex items-center gap-1 bg-white/10 hover:bg-white/20 transition px-1.5 py-1 rounded-full text-xs">
    {icon}
    <span>{value}</span>
  </div>
);

export default MangaCard;