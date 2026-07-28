import { useState } from "react";
import { Heart, Rocket } from "lucide-react";
import { useNavigate } from "react-router-dom";

/**
 * Poster-style manga card used on the Manga Search / browse page.
 * Matches Figma node 8475-96611: full-bleed cover, centered overlay
 * (green underlined genre, title with optional boost rocket, "by author"),
 * heart toggle top-right, and a subtle glow border when the item is boosted.
 *
 * NOTE (for backend dev): all display fields come straight from the manga
 * object the API returns — see the mapping in MangaSearchPage.jsx. Only the
 * local `liked` state is client-side (wire a favourite/like endpoint later).
 */
const resolveCover = (path) => {
  if (!path) return "/fallback-cover.jpg";
  if (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("data:")
  ) {
    return path;
  }
  const baseUrl = import.meta.env.VITE_API_URL || "";
  return path.startsWith("/") ? `${baseUrl}${path}` : `${baseUrl}/${path}`;
};

const MangaPosterCard = ({
  id,
  imageUrl,
  title,
  author,
  genre,
  boosted = false,
  isPlatform,
  source,
}) => {
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    const src = isPlatform ? "platform" : source || "mangadex";
    navigate(`/manga/${id}?source=${src}`);
  };

  return (
    <div
      onClick={handleClick}
      className={`group relative aspect-[3/4] w-full cursor-pointer overflow-hidden rounded-[14px] bg-[#0A0A0C] transition ${
        boosted
          ? "ring-1 ring-[#E5C100]/70 shadow-[0_0_18px_-2px_rgba(229,193,0,0.45)]"
          : "ring-1 ring-white/10 hover:ring-white/25"
      }`}
    >
      {/* Cover */}
      <img
        src={resolveCover(imageUrl)}
        alt={title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
      />

      {/* Bottom-up gradient so the overlay text stays legible */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/25 to-transparent" />

      {/* Heart toggle */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setLiked((v) => !v);
        }}
        className="absolute right-3 top-3 z-10 text-white/70 transition hover:text-white"
        aria-label="favourite"
      >
        <Heart className={`h-5 w-5 ${liked ? "fill-red-500 text-red-500" : ""}`} />
      </button>

      {/* Centered overlay text */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-1 px-3 pb-5 text-center">
        {genre && (
          <span className="text-[13px] font-normal text-[#14FF00] underline decoration-[#14FF00] underline-offset-2">
            {genre}
          </span>
        )}
        <h3 className="flex items-center justify-center gap-1.5 text-lg font-medium leading-tight text-white">
          {boosted && (
            <Rocket className="h-4 w-4 shrink-0 fill-yellow-400 text-yellow-400" />
          )}
          <span className="line-clamp-1">{title}</span>
        </h3>
        <p className="text-sm text-white/50">by {author}</p>
      </div>
    </div>
  );
};

export default MangaPosterCard;
