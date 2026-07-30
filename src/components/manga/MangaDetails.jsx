import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchChapters } from "../../store/slices/mangaSlice";
import HomeManga from "../homepage/HomeManga";
import { mockMangaDetail, mockDetailChapters } from "../../config/mockMangaDetail";
import axios from "axios";
import { Heart, Share2, Eye, MessageCircle, Star, Share, Rocket } from "lucide-react";
import {
  FaDiscord,
  FaRedditAlien,
  FaXTwitter,
  FaThreads,
  FaInstagram,
  FaLinkedinIn,
  FaRegBookmark,
} from "react-icons/fa6";
import { PiTelegramLogo } from "react-icons/pi";

// Social glyphs for the "Share on Social Media" card, keyed by the
// slugs the API returns in `manga.socials`.
const SOCIAL_ICONS = {
  discord: FaDiscord,
  reddit: FaRedditAlien,
  telegram: PiTelegramLogo,
  x: FaXTwitter,
  threads: FaThreads,
  instagram: FaInstagram,
  linkedin: FaLinkedinIn,
};

/* =========================
   🧩 SMALL COMPONENTS
========================= */

const ActionPill = ({ icon, value, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-1 px-3 py-1 text-xs text-white transition-colors"
    style={{
      background: "rgba(255, 255, 255, 0.1)",
      backdropFilter: "blur(27px)",
      WebkitBackdropFilter: "blur(27px)",
      borderRadius: "27px",
    }}
  >
    {icon}
    {value && <span>{value}</span>}
  </button>
);

/* Sidebar card shell — tinted glass panel from the design */
const SidebarCard = ({ title, children }) => (
  <div
    style={{
      background: "rgba(223, 40, 226, 0.07)",
      backdropFilter: "blur(27px)",
      WebkitBackdropFilter: "blur(27px)",
      borderRadius: "12px",
      padding: "20px 24px",
    }}
  >
    <h3
      className="text-white"
      style={{
        fontFamily: "Inter, sans-serif",
        fontSize: "20px",
        fontWeight: 400,
        marginBottom: "16px",
      }}
    >
      {title}
    </h3>
    {children}
  </div>
);

/* Shared body text style for the sidebar cards */
const SIDEBAR_TEXT = {
  fontFamily: "Inter, sans-serif",
  fontSize: "14px",
  lineHeight: "20px",
};

/* Small pill used for the age rating chip */
const AgeChip = ({ value }) => (
  <span
    className="inline-flex items-center justify-center text-white/80"
    style={{
      fontFamily: "Inter, sans-serif",
      fontSize: "11px",
      border: "1px solid rgba(255,255,255,0.35)",
      borderRadius: "3px",
      padding: "1px 5px",
    }}
  >
    {value}
  </span>
);

/* =========================
   💡 HELPER FUNCTIONS
========================= */

// "8 May 2025" — the date format used on the chapter rows.
const formatChapterDate = (value) => {
  if (!value) return "Unknown date";
  const d = new Date(value);
  if (isNaN(d)) return "Unknown date";
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};
const getCoverImageUrl = (path) => {  if (!path) return "/fallback-cover.jpg";
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

// Guards against the dev server answering an API path with index.html
// (happens when VITE_API_URL is unset, so the URL becomes relative).
// A 200 status alone is not proof of a usable payload.
const isUsableApiPayload = (data) =>
  !!data && typeof data === "object" && !Array.isArray(data);

const normalizeMangaData = (rawData, source) => {
  if (!rawData) return null;
  
  if (source === "platform") {
    // Platform manga from database
    return {
      id: rawData._id || rawData.id,
      title: rawData.title || "Untitled",
      description: rawData.description || "No description available.",
      coverUrl: rawData.coverImage || "/fallback-cover.jpg",
      author: rawData.author?.username || (typeof rawData.author === "string" ? rawData.author : "Platform Creator"),
      genre: Array.isArray(rawData.genres) ? rawData.genres.join(", ") : (rawData.genre || "N/A"),
      isPlatform: true,
      source: "platform",
    };
  } else if (source === "jikan") {
    const title = rawData.title || rawData.title_english || "Untitled";
    const description = rawData.synopsis || "No description available.";
    const coverUrl = rawData.images?.jpg?.large_image_url || rawData.images?.jpg?.image_url || "/fallback-cover.jpg";
    const authorName = rawData.authors?.map(a => a.name).join(", ") || "Unknown";
    const genres = rawData.genres?.map(g => g.name).join(", ") || "N/A";
    return {
      id: rawData.mal_id,
      title,
      description,
      coverUrl,
      author: authorName,
      genre: genres,
      isPlatform: false,
      source: "jikan",
    };
  } else if (source === "zyla") {
    const title = rawData.title || rawData.name || "Untitled";
    const description = rawData.description || rawData.synopsis || "No description available.";
    const coverUrl = rawData.cover_image || rawData.image_url || "/fallback-cover.jpg";
    const authorName = rawData.author || "Unknown";
    const genres = Array.isArray(rawData.genres) ? rawData.genres.join(", ") : (rawData.genre || "N/A");
    return {
      id: rawData.id,
      title,
      description,
      coverUrl,
      author: authorName,
      genre: genres,
      isPlatform: false,
      source: "zyla",
    };
  } else {
    // External MangaDex manga
    const data = rawData.original || rawData;
    const title = data.attributes?.title?.en ||
      data.attributes?.title?.en_jp ||
      Object.values(data.attributes?.title || {})[0] ||
      data.title ||
      "Untitled";
    const description = data.attributes?.description?.en || data.description || "No description available.";
    
    const authorRel = data.relationships?.find(rel => rel.type === "author");
    const authorName = authorRel?.attributes?.name || data.author || "Unknown";

    const genres = data.attributes?.tags
      ?.filter(tag => tag.attributes?.group === "genre")
      ?.map(tag => tag.attributes?.name?.en)
      ?.join(", ") || (Array.isArray(data.genres) ? data.genres.join(", ") : data.genre) || "N/A";

    return {
      id: data.id || rawData.id,
      title,
      description,
      coverUrl: rawData.coverUrl || data.coverUrl || "/fallback-cover.jpg",
      author: authorName,
      genre: genres,
      isPlatform: false,
      source: "mangadex",
    };
  }
};

/* =========================
   📖 CHAPTER ROW
========================= */

const ChapterRow = ({ ch, index, manga, onClick, isHighlighted }) => (
  <div
    onClick={onClick}
    className="flex cursor-pointer items-center gap-2 transition-colors hover:bg-white/5"
    style={{
      padding: "12px 16px 12px 32px",
      height: "106px",
      background: isHighlighted ? "rgba(250, 233, 141, 0.12)" : "transparent",
      borderRadius: isHighlighted ? "8px" : "0",
    }}
  >
    {/* Chapter number */}
    <span
      className="shrink-0 text-white/50"
      style={{ width: "38px", fontFamily: "Inter", fontSize: "16px" }}
    >
      #{String(index + 1).padStart(3, "0")}
    </span>

    {/* Thumbnail + info */}
    <div className="flex flex-1 items-center gap-3">
      <img
        src={getCoverImageUrl(ch.thumbnail || manga.coverUrl)}
        alt="cover"
        className="shrink-0 rounded object-cover"
        style={{ width: "147px", height: "82px" }}
      />
      <div className="flex flex-col justify-center gap-1">
        <h3
          className="font-normal flex items-center gap-1"
          style={{
            fontFamily: "Inter",
            fontSize: "24px",
            lineHeight: "24px",
            color: ch.isContinue ? "#01F1E3" : "#FFFFFF",
          }}
        >
          {ch.title
            ? ch.title
            : manga.isPlatform
              ? `Episode ${ch.episodeNumber || index + 1}`
              : `Chapter ${ch.chapter}`}
          {ch.isContinue && (
            <span style={{ color: "#01F1E3" }}> ...(Continue reading)</span>
          )}
          {ch.boosted && (
            <span
              className="ml-1 inline-block"
              style={{ transform: "rotate(-45deg)", color: "rgba(255, 214, 0, 0.9)" }}
            >
              <Rocket className="w-5 h-5" />
            </span>
          )}
          {ch.translatedLanguage && ch.translatedLanguage !== "en" && (
            <span className="text-[10px] bg-white/20 text-gray-300 px-1.5 py-0.5 rounded uppercase font-normal">
              {ch.translatedLanguage}
            </span>
          )}
        </h3>
        <p
          className="text-white/70"
          style={{ fontFamily: "Inter", fontSize: "14px", lineHeight: "24px" }}
        >
          {ch.subtitle
            ? ch.subtitle
            : formatChapterDate(ch.publishAt || ch.createdAt)}
        </p>
      </div>
    </div>

    {/* Action pills */}
    <div className="flex items-center gap-[11px] shrink-0">
      <ActionPill icon={<Star className="w-4 h-4" />} value={ch.rating ?? 5} />
      <ActionPill icon={<MessageCircle className="w-4 h-4" />} value={ch.comments ?? 124} />
      <ActionPill icon={<Share2 className="w-4 h-4" />} />
      <ActionPill
        icon={
          <img
            src="/icons/thread.svg"
            alt="Thread"
            className="w-[18px] h-[18px] brightness-0 invert"
          />
        }
        value={ch.threads ?? 4}
      />
      <ActionPill icon={<Eye className="w-4 h-4" />} value={ch.views ?? "24k"} />
    </div>
  </div>
);

/* =========================
   🚀 MAIN COMPONENT
========================= */

const MangaDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const routeSource = searchParams.get("source") || "platform";

  const { chapters } = useSelector((state) => state.manga);
  const [manga, setManga] = useState(null);
  const [loadingManga, setLoadingManga] = useState(true);
  const [chaptersLoading, setChaptersLoading] = useState(false);

  const cacheKey = manga ? `${id}-${manga.isPlatform}` : id;
  const mangaChapters = chapters[cacheKey] || [];

  // ✅ Fetch manga by ID
  useEffect(() => {
    const fetchMangaById = async () => {
      setLoadingManga(true);
      try {
        if (routeSource === "jikan") {
          let response = await axios.get(`${import.meta.env.VITE_API_URL}/api/manga/jikan/${id}`);
          if (!isUsableApiPayload(response.data?.data)) throw new Error("Invalid jikan payload");
          setManga(normalizeMangaData(response.data.data, "jikan"));
        } else if (routeSource === "zyla") {
          let response = await axios.get(`${import.meta.env.VITE_API_URL}/api/manga/zyla/${id}`);
          if (!isUsableApiPayload(response.data?.data)) throw new Error("Invalid zyla payload");
          setManga(normalizeMangaData(response.data.data, "zyla"));
        } else if (routeSource === "mangadex") {
          let response = await axios.get(`${import.meta.env.VITE_API_URL}/api/manga/external/${id}`);
          if (!isUsableApiPayload(response.data)) throw new Error("Invalid mangadex payload");
          setManga(normalizeMangaData(response.data, "mangadex"));
        } else {
          // platform or autodetect
          try {
            let response = await axios.get(`${import.meta.env.VITE_API_URL}/api/manga/${id}`);
            if (response.data && response.data.success && response.data.data) {
              setManga(normalizeMangaData(response.data.data, "platform"));
            } else {
              throw new Error("Failed to get platform manga data");
            }
          } catch (err) {
            console.log("Manga not found on platform or server error, trying external MangaDex fallback:", err.message);
            const extResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/manga/external/${id}`);
            if (!isUsableApiPayload(extResponse.data)) throw new Error("Invalid fallback payload");
            setManga(normalizeMangaData(extResponse.data, "mangadex"));
          }
        }
      } catch (err) {
        // Dev fallback: render the designed screen with placeholder data
        // when the API is unavailable. Real data takes over once it responds.
        console.warn(
          "Manga API unavailable, showing placeholder detail data:",
          err.message
        );
        setManga(mockMangaDetail);
      } finally {
        setLoadingManga(false);
      }
    };
    fetchMangaById();
  }, [id, routeSource]);

  // Fetch chapters after manga is loaded
  useEffect(() => {
    if (manga && id && !chapters[cacheKey]) {
      if (manga.isMock || manga.source === "jikan" || manga.source === "zyla") {
        return;
      }
      setChaptersLoading(true);
      dispatch(fetchChapters({ mangaId: id, isPlatform: manga.isPlatform })).finally(() => {
        setChaptersLoading(false);
      });
    }
  }, [manga, id, chapters, cacheKey, dispatch]);

  // Filter and sort chapters
  const displayChapters = (() => {
    if (manga?.isMock) {
      return mockDetailChapters;
    }
    if (manga && (manga.source === "jikan" || manga.source === "zyla")) {
      return Array.from({ length: 5 }).map((_, i) => ({
        id: `mock-${i + 1}`,
        chapter: String(i + 1),
        title: `Chapter ${i + 1}`,
        createdAt: new Date().toISOString(),
      }));
    }
    let chaptersList = mangaChapters;
    if (manga && !manga.isPlatform) {
      chaptersList = mangaChapters.filter(ch => {
        const num = Number(ch.chapter);
        return !isNaN(num) && num > 0;
      });
    }
    return [...chaptersList].sort((a, b) => Number(a.chapter) - Number(b.chapter));
  })();

  // The design shows every chapter at once — no pagination controls.
  const currentPage = 1;
  const CHAPTERS_PER_PAGE = 12;
  const paginatedChapters = displayChapters?.slice(
    (currentPage - 1) * CHAPTERS_PER_PAGE,
    currentPage * CHAPTERS_PER_PAGE
  );

  const handleOpenChapter = (chapterId) => {
    if (manga.isMock) {
      // Placeholder chapters have no real pages to read yet.
      return;
    }
    if (manga.source === "jikan") {
      window.open(`https://myanimelist.net/manga/${id}`, "_blank");
    } else if (manga.source === "zyla") {
      window.open(`https://kitsu.io/manga/${id}`, "_blank");
    } else {
      navigate(`/manga/read/${chapterId}`);
    }
  };

  // Loading states
  if (loadingManga) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#060106" }}>
        <div className="w-10 h-10 border-4 border-[#01F1E3] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  if (!manga) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white" style={{ background: "#060106" }}>
        Manga not found
      </div>
    );
  }

  const coverUrl = getCoverImageUrl(manga.coverUrl);

  return (
    <div className="text-white min-h-screen" style={{ background: "#060106" }}>
      {/* ═══════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════ */}
      <section
        className="relative isolate flex flex-col justify-center items-start overflow-hidden"
        style={{
          width: "100%",
          height: "886px",
          padding: "220px 0 0 200px",
        }}
      >
        {/* Background image */}
        <div
          className="absolute inset-0 z-[-3]"
          style={{
            backgroundImage: `url(${coverUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center top",
            backgroundBlendMode: "luminosity",
            filter: "brightness(0.5)",
          }}
        />

        {/* Left gradient overlay */}
        <div
          className="absolute z-[-2] pointer-events-none"
          style={{
            width: "674px",
            height: "1030px",
            left: 0,
            bottom: 0,
            background: "linear-gradient(90deg, #060106 0%, rgba(6,1,6,0) 100%)",
          }}
        />

        {/* Bottom gradient overlay */}
        <div
          className="absolute z-[-1] pointer-events-none"
          style={{
            width: "100%",
            height: "857px",
            left: 0,
            bottom: "-145px",
            background: "linear-gradient(180deg, rgba(1,1,1,0) 0%, #060106 89.03%)",
          }}
        />

        {/* Hero content */}
        <div className="relative z-10 flex flex-col items-start gap-6" style={{ maxWidth: "903px" }}>
          {/* Author / Genre links */}
          <div className="flex items-center gap-2.5">
            <span
              className="text-white underline underline-offset-2"
              style={{ fontFamily: "SF Pro Display, sans-serif", fontSize: "16px" }}
            >
              {manga.author}
            </span>
            <span
              className="underline underline-offset-2"
              style={{ fontFamily: "SF Pro Display, sans-serif", fontSize: "16px", color: "#14FF00" }}
            >
              {manga.genre}
            </span>
          </div>

          {/* Title */}
          <h1
            style={{
              fontFamily: "SF Pro Display, sans-serif",
              fontWeight: 400,
              fontSize: "72px",
              lineHeight: "86px",
              color: "#FFFFFF",
              margin: 0,
            }}
          >
            {manga.title}
          </h1>

          {/* Description */}
          <p
            className="line-clamp-2"
            style={{
              fontFamily: "Satoshi, sans-serif",
              fontWeight: 700,
              fontSize: "20px",
              lineHeight: "27px",
              color: "#FFFFFF",
              maxWidth: "903px",
            }}
          >
            {manga.description}
          </p>

          {/* Buttons */}
          <div className="flex items-center gap-6">
            {/* Open Manga CTA */}
            {paginatedChapters.length > 0 && (
              <button
                onClick={() => handleOpenChapter(paginatedChapters[0].id)}
                className="flex items-center justify-center gap-2 cursor-pointer transition-colors hover:opacity-90"
                style={{
                  padding: "12px 16px",
                  background: "#01F1E3",
                  color: "#000000",
                  fontFamily: "Satoshi, sans-serif",
                  fontWeight: 500,
                  fontSize: "16px",
                  lineHeight: "22px",
                  border: "none",
                }}
              >
                {manga.source === "jikan"
                  ? "View on MyAnimeList"
                  : manga.source === "zyla"
                    ? "External Link"
                    : "Open Manga"}
              </button>
            )}

            {/* Heart / Tip button */}
            <button
              className="flex items-center justify-center cursor-pointer transition-colors hover:bg-white/20"
              style={{
                width: "48px",
                height: "46px",
                background: "rgba(255, 255, 255, 0.1)",
                border: "1px solid #FFFFFF",
                backdropFilter: "blur(27px)",
                WebkitBackdropFilter: "blur(27px)",
                borderRadius: "57px",
              }}
            >
              <Heart className="w-5 h-5 text-white" />
            </button>

            {/* Tip jar */}
            <button
              className="flex items-center justify-center cursor-pointer transition-colors hover:bg-white/20"
              style={{
                width: "48px",
                height: "46px",
                background: "rgba(255, 255, 255, 0.1)",
                border: "1px solid #FFFFFF",
                backdropFilter: "blur(27px)",
                WebkitBackdropFilter: "blur(27px)",
                borderRadius: "57px",
              }}
            >
              <FaRegBookmark size={18} className="text-white" />
            </button>
          </div>
        </div>

        {/* Book cover on right side */}
        <div
          className="absolute z-[4]"
          style={{
            width: "416px",
            height: "564px",
            right: "227px",
            top: "289px",
          }}
        >
          {/* Second page (shadow beneath) */}
          <div
            className="absolute"
            style={{
              width: "399px",
              height: "564px",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              background: "#FFFFFF",
              boxShadow:
                "0px 2.49px 0px #A7BBE3, 0px 4.98px 0px #9BA9CF, inset 5.81px 0px 1.66px rgba(36, 44, 123, 0.25), inset 2.49px 0px 1.66px rgba(36, 44, 123, 0.55)",
              borderRadius: "1.66px 3.32px 0px 1.66px",
            }}
          />
          {/* Cover image */}
          <img
            src={coverUrl}
            alt={manga.title}
            className="absolute object-cover"
            style={{
              width: "416px",
              height: "564px",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              boxShadow:
                "inset 5.5px -11px 7.34px rgba(0, 0, 0, 0.25), -22px 31.18px 31.18px rgba(0, 0, 0, 0.55)",
              borderRadius: "3.67px",
            }}
          />
          {/* Spine line */}
          <div
            className="absolute pointer-events-none"
            style={{
              width: "0px",
              height: "597px",
              left: "17px",
              top: "0px",
              mixBlendMode: "overlay",
              border: "0.89px solid #B3B3B3",
            }}
          />
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CONTENT SECTION: CHAPTERS + SIDEBAR
      ═══════════════════════════════════════════ */}
      <section
        className="flex flex-wrap items-start"
        style={{
          padding: "0 0 120px 40px",
          gap: "16px",
        }}
      >
        {/* LEFT: Episodes/Chapters Panel */}
        <div
          className="flex flex-col"
          style={{
            width: "1171px",
            maxWidth: "100%",
            padding: "24px 0",
            background: "rgba(28, 28, 30, 0.5)",
            backdropFilter: "blur(36px)",
            WebkitBackdropFilter: "blur(36px)",
          }}
        >
          {chaptersLoading && (
            <div className="flex justify-center py-10">
              <div className="w-8 h-8 border-4 border-[#01F1E3] border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {!chaptersLoading && paginatedChapters.length === 0 && (
            <p className="text-gray-400 px-8">No chapters available</p>
          )}

          {!chaptersLoading && paginatedChapters.length > 0 && (
            <>
              {paginatedChapters.map((ch, idx) => {
                const globalIndex = (currentPage - 1) * CHAPTERS_PER_PAGE + idx;
                return (
                  <ChapterRow
                    key={ch.id}
                    ch={ch}
                    manga={manga}
                    index={globalIndex}
                    isHighlighted={ch.isCurrent ?? idx === 1}
                    onClick={() => handleOpenChapter(ch.id)}
                  />
                );
              })}

            </>
          )}
        </div>

        {/* RIGHT: Sidebar */}
        <div
          className="flex flex-1 flex-col min-w-[300px]"
          style={{ maxWidth: "693px", gap: "4px" }}
        >
          {/* About the Manga */}
          <SidebarCard title="About the Manga">
            {manga.about?.status && (
              <p className="text-white/80" style={SIDEBAR_TEXT}>
                Status : {manga.about.status}
              </p>
            )}

            {/* Age rating + chapter count */}
            <div className="flex items-center gap-2" style={{ marginTop: "10px" }}>
              {manga.about?.ageRating && <AgeChip value={manga.about.ageRating} />}
              <span className="text-white/80" style={SIDEBAR_TEXT}>
                {displayChapters.length} {manga.isPlatform ? "Episodes" : "Chapters"}
              </span>
            </div>

            {/* Genre bullets */}
            {manga.about?.genres?.length > 0 && (
              <div
                className="flex items-center gap-6"
                style={{ marginTop: "10px" }}
              >
                {manga.about.genres.map((g) => (
                  <span
                    key={g}
                    className="text-white/80"
                    style={SIDEBAR_TEXT}
                  >
                    • {g}
                  </span>
                ))}
              </div>
            )}

            {/* Language selector */}
            {manga.about?.languages?.length > 0 && (
              <div style={{ marginTop: "18px" }}>
                <p className="text-white/80" style={SIDEBAR_TEXT}>
                  Available in Laguage
                </p>
                <div className="flex items-center gap-3" style={{ marginTop: "8px" }}>
                  {manga.about.languages.map((lang, i) => (
                    <button
                      key={lang}
                      className="transition-colors"
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "14px",
                        padding: "4px 14px",
                        borderRadius: "27px",
                        color: i === 0 ? "#FFFFFF" : "rgba(255,255,255,0.6)",
                        background: i === 0 ? "#AD7AFF" : "rgba(255,255,255,0.1)",
                      }}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Impressions */}
            {manga.about?.impressions && (
              <p
                className="text-white/80"
                style={{ ...SIDEBAR_TEXT, marginTop: "18px" }}
              >
                Total Impressions: {manga.about.impressions}
              </p>
            )}
          </SidebarCard>

          {/* Main Characters */}
          {manga.characters?.length > 0 && (
            <SidebarCard title="Main Characters">
              <div className="flex flex-col" style={{ gap: "14px" }}>
                {manga.characters.map((c) => (
                  <div key={c.id} className="flex items-center gap-3">
                    <img
                      src={c.avatar}
                      alt={c.name}
                      className="w-9 h-9 rounded-full object-cover shrink-0 bg-gray-600"
                    />
                    <span className="text-white/80" style={SIDEBAR_TEXT}>
                      {c.name}
                    </span>
                  </div>
                ))}
              </div>
            </SidebarCard>
          )}

          {/* Rights */}
          <SidebarCard title="Rights">
            <div className="flex flex-col" style={{ gap: "14px" }}>
              {(manga.rights?.length > 0
                ? manga.rights
                : [
                    { label: "Story Writer:", value: manga.author },
                    { label: "Manga Visual Designer:", value: manga.author },
                  ]
              ).map((r) => (
                <div key={r.label} className="flex items-center gap-2">
                  <span className="text-white/60" style={SIDEBAR_TEXT}>
                    {r.label}
                  </span>
                  <span className="text-white/90" style={SIDEBAR_TEXT}>
                    {r.value}
                  </span>
                </div>
              ))}
            </div>
          </SidebarCard>

          {/* Share on Social Media */}
          {manga.socials?.length > 0 && (
            <SidebarCard title="Share on Social Media">
              <div className="flex flex-wrap items-center gap-3">
                {manga.socials.map((s) => {
                  const Icon = SOCIAL_ICONS[s];
                  return (
                    <button
                      key={s}
                      title={s}
                      aria-label={`Share on ${s}`}
                      className="flex items-center justify-center shrink-0 text-white/80 transition-colors hover:bg-white/20"
                      style={{
                        width: "34px",
                        height: "34px",
                        borderRadius: "50%",
                        background: "rgba(255, 255, 255, 0.1)",
                      }}
                    >
                      {Icon ? (
                        <Icon size={16} />
                      ) : (
                        <span className="text-[10px] uppercase">{s.slice(0, 2)}</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </SidebarCard>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          RECOMMENDED SECTION
      ═══════════════════════════════════════════ */}
      <div>
        <HomeManga title="Recommended For You" />
      </div>
    </div>
  );
};

export default MangaDetails;