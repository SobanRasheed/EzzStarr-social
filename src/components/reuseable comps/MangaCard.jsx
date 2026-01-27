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
}) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="group relative w-full bg-[#1C1C1E80] rounded-xl overflow-hidden text-white flex flex-col sm:flex-row transition hover:shadow-xl">

      {/* ❤️ Heart overlay */}
      <button
        onClick={() => setIsLiked(!isLiked)}
        className="absolute top-3 right-3 z-10 bg-black/60 hover:bg-black/80 p-2 rounded-full transition"
      >
        <Heart
          className={`w-5 h-5 transition ${
            isLiked ? "fill-red-500 text-red-500" : "text-white"
          }`}
        />
      </button>

      {/* 🖼 Image */}
      <div className=" h-[280px]">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* 📄 Content */}
      <div className="flex-1 p-4 flex flex-col justify-between">

        {/* Author / Genre */}
        <p className="text-xs text-white/60">
          {author}
          <span className="ml-2 text-[#14FF00]">{genre}</span>
        </p>

        {/* Title + Share */}
        <div className="mt-1 flex items-center justify-between gap-2">
          <h2 className="text-xl font-semibold line-clamp-1">
            {title}
          </h2>
          <Share2 className="w-4 h-4 text-white/70 hover:text-white cursor-pointer" />
        </div>

        {/* Description */}
        <p className="text-xs text-white/50 mt-1 line-clamp-2">
          One day, when I was making school supplies in the art room, a very
          scary-looking girl was staring at me...
        </p>

        {/* Reward */}
        <p className="text-xs mt-3 text-[#DF28E2]">
          Earn {reward}
        </p>

        {/* 📊 Stats */}
        <div className="mt-4 flex flex-wrap gap-2">
          <Stat icon={<Star className="w-4 h-4" />} value={stars} />
          <Stat icon={<MessageCircle className="w-4 h-4" />} value={comments} />
          <Stat icon={<Eye className="w-4 h-4" />} value={views} />
        </div>
      </div>
    </div>
  );
};

const Stat = ({ icon, value }) => (
  <div className="flex items-center gap-1 bg-white/10 hover:bg-white/20 transition px-3 py-1 rounded-full text-xs cursor-pointer">
    {icon}
    <span>{value}</span>
  </div>
);

export default MangaCard;
