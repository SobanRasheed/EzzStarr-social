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
    <div className="group relative w-full bg-[#1C1C1E80] overflow-hidden text-white flex flex-col sm:flex-row transition hover:shadow-xl">

      {/* ❤️ Heart overlay */}
      <button
        onClick={() => setIsLiked(!isLiked)}
        className="absolute top-2 right-1 z-10 bg-black/60 hover:bg-black/80 p-1 rounded-full transition"
      >
        <Heart
          className={`w-5 h-5 transition ${isLiked ? "fill-red-500 text-red-500" : "text-white"
            }`}
        />
      </button>

      {/* 🖼 Image */}
      <div className="h-[240px]">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* 📄 Content */}
      <div className="flex-1 p-2 flex flex-col justify-between">

        <div>
          {/* Author / Genre */}
          <p className="text-xs pt-2 text-white/60">
            {author} &nbsp;
            <span className="text-[#14FF00]">{genre}</span>
          </p>
          {/* Title + Share */}
          <div className="flex items-center m-0 justify-between gap-2">
            <h2 className="text-xl my-1 font-semibold ">
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
        </div>

        <div>
          <p className="text-xs mt-3 text-[#DF28E2]">
            Earn {reward}
          </p>
          {/* 📊 Stats */}
          <div className="mt-4 mb-2 flex flex-wrap gap-1">
            <hr className="w-[150%] text-gray-800 mb-2"/>
            <Stat icon={<Eye className="w-3 h-3" />} value={views} />
            <Stat icon={<Star className="w-3 h-3" />} value={stars} />
            <Stat icon={<MessageCircle className="w-3 h-3" />} value={comments} />
            <Stat icon={<MessageCircle className="w-3 h-3" />} value={comments} />
            <hr className="w-[150%] text-gray-800 mt-2"/>
          </div>
        </div>

      </div>
    </div>
  );
};

const Stat = ({ icon, value }) => (
  <div className="flex items-center gap-1 bg-white/10 hover:bg-white/20 transition px-2 py-1 rounded-full text-xs cursor-pointer">
    {icon}
    <span>{value}</span>
  </div>
);

export default MangaCard;
