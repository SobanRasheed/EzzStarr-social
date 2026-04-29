import { Heart, Rocket } from "lucide-react";
import { useState } from "react";

export default function StoryCard({
  image,
  imageUrl,
  title,
  author,
  genre,
  genres,
  reward,
  onClick,
  hasGlow = false,
}) {
  const [liked, setLiked] = useState(false);

  const genreText = genres?.length > 0 ? genres.join(", ") : genre || "";
  const imgSrc =
    image ||
    (imageUrl ? `${import.meta.env.VITE_API_URL}${imageUrl}` : "");

  return (
    <div
      onClick={onClick}
      className={`group relative rounded-lg overflow-hidden bg-[#0a0a0a] cursor-pointer ${
        hasGlow
          ? "border border-yellow-500/60 shadow-[0_0_6px_0px_rgba(234,179,8,0.35)]"
          : "border border-transparent"
      }`}
    >
      <div className="relative aspect-[3/4] w-full">
        <img
          src={imgSrc}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

        {/* Earn Badge - top left */}
        <div
          className={`absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium backdrop-blur-sm ${
            hasGlow
              ? "bg-yellow-500/90 text-black"
              : "bg-[#d946ef]/90 text-white"
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full inline-block shrink-0 ${
              hasGlow ? "bg-black/50" : "bg-white/60"
            }`}
          />
          Earn 0.00005 SPCA
        </div>

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
    </div>
  );
}
