import { Heart, Rocket, Star, MessageCircle, Share2, PenLine } from "lucide-react";
import { useState } from "react";

export default function StoryCard({
  image,
  imageUrl,
  title,
  author,
  genre,
  genres,
  onClick,
  hasGlow = false,
}) {
  const [liked, setLiked] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [starred, setStarred] = useState(false);
  const [starCount, setStarCount] = useState(5);
  const [commentCount] = useState(0);
  const [shareCount, setShareCount] = useState(0);

  const genreText = genres?.length > 0 ? genres.join(", ") : genre || "";
  const getStoryImageUrl = (path) => {
    if (!path) return "";
    if (
      path.startsWith("http://") ||
      path.startsWith("https://") ||
      path.startsWith("data:")
    ) {
      return path;
    }
    const baseUrl = import.meta.env.VITE_API_URL || "";
    if (path.startsWith("/")) {
      return `${baseUrl}${path}`;
    }
    return `${baseUrl}/${path}`;
  };

  const imgSrc = getStoryImageUrl(image || imageUrl);

  const handleStar = (e) => {
    e.stopPropagation();
    setStarred(!starred);
    setStarCount(prev => starred ? prev - 1 : prev + 1);
  };

  const handleShare = (e) => {
    e.stopPropagation();
    setShareCount(prev => prev + 1);
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href).catch(() => {});
    }
  };

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group relative rounded-xl overflow-hidden bg-[#0a0a0a] cursor-pointer transition-all duration-300 ${
        hasGlow
          ? "border border-yellow-500/60 shadow-[0_0_6px_0px_rgba(234,179,8,0.35)]"
          : "border border-white/10 hover:border-white/25"
      }`}
    >
      {/* Image area */}
      <div className="relative aspect-[2/3] w-full">
        <img
          src={imgSrc}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

        {/* Heart Icon - top right */}
        <button
          onClick={(event) => {
            event.stopPropagation();
            setLiked(!liked);
          }}
          className="absolute top-3 right-3 text-white/60 hover:text-white transition-colors"
        >
          <Heart
            className={`w-5 h-5 ${liked ? "fill-red-500 text-red-500" : ""}`}
          />
        </button>

        {/* Hover overlay - Open Story button */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
          style={{ background: "rgba(0,0,0,0.45)" }}
        >
          <span className="px-5 py-2 bg-[#e5c100] text-black text-[13px] font-bold rounded-md shadow-lg hover:bg-[#d4b200] transition-colors">
            Open Story
          </span>
        </div>

        {/* Bottom Content */}
        <div className="absolute bottom-0 p-3 w-full text-center">
          <p className="text-[#14FF00] text-[10px] font-normal mb-1 tracking-wider underline underline-offset-2 decoration-[#14FF00] font-sf">
            {genreText}
          </p>
          <h3 className="text-white font-bold text-sm leading-tight line-clamp-2 mb-0.5 flex items-center justify-center gap-1">
            {hasGlow && (
              <Rocket className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400 shrink-0" />
            )}
            {title}
          </h3>
          <p className="text-white/50 text-[11px]">by {author}</p>
        </div>
      </div>

      {/* Stats bar at the bottom of the card */}
      <div className="flex items-center justify-center gap-4 py-2.5 px-3 bg-[#0a0a0a] border-t border-white/5">
        <button
          onClick={handleStar}
          className={`flex items-center gap-1 text-[11px] transition-colors ${starred ? "text-yellow-400" : "text-white/40 hover:text-yellow-400"}`}
        >
          <Star className={`w-3.5 h-3.5 ${starred ? "fill-yellow-400" : ""}`} /> {starCount}
        </button>
        <button
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-1 text-white/40 hover:text-white text-[11px] transition-colors"
        >
          <MessageCircle className="w-3.5 h-3.5" /> {commentCount}
        </button>
        <button
          onClick={handleShare}
          className="flex items-center gap-1 text-white/40 hover:text-white text-[11px] transition-colors"
        >
          <Share2 className="w-3.5 h-3.5" /> {shareCount}
        </button>
        <button
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-1 text-white/40 hover:text-white text-[11px] transition-colors"
        >
          <PenLine className="w-3.5 h-3.5" /> 0
        </button>
      </div>
    </div>
  );
}
