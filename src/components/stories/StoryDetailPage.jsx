import { useState } from "react";
import {
  Eye,
  Star,
  MessageCircle,
  Share2,
  MoreHorizontal,
  Rocket,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  X,
  Send,
  Volume2,
} from "lucide-react";
import StoryCard from "../reuseable comps/StoryCard";
import {
  mockStoryDetail,
  mockStoryParts,
  mockStoryContent,
  mockStoryThreads,
  mockStoryRecommendations,
} from "../../config/mockStoryDetail";

/* =========================================================================
   Story detail page — Figma node 8475:95711
   ("EzzStar Story Page_Before Login (before boosting)", 1920x6084)

   Layout is desktop-first at the design's 1920 grid: a 1520px content row
   (445px left rail + 1039px story panel), then full-width Story Threads,
   Recommended and the shared Footer.

   NOTE (for backend dev): every value falls back to ../../config/mockStoryDetail
   only when the API hasn't supplied it, so real data takes over automatically.
   Placeholders that still need wiring are marked "PLACEHOLDER".
========================================================================= */

/* Design tokens lifted from the Figma CSS */
const SATOSHI = "Satoshi, sans-serif";
const SF = "SF Pro Display, sans-serif";
const INTER = "Inter, sans-serif";
const CYAN = "#01F1E3";
const GREEN = "#14FF00";
const PURPLE = "#AD7AFF";
const MUTED = "#999999";

/* Thread / gist spool icon — /icons/thread.svg is the project's own glyph */
const ThreadIcon = ({ size = 22 }) => (
  <img
    src="/icons/thread.svg"
    alt=""
    style={{ width: size, height: size }}
    className="brightness-0 invert"
  />
);

/* ── Stat pill — Figma: rgba(255,255,255,.1) + blur(27), radius 27 ────── */
const StatPill = ({ children, filled, active, onClick, title }) => (
  <button
    onClick={onClick}
    title={title}
    className="flex shrink-0 items-center transition-colors"
    style={{
      height: "32px",
      padding: "4px 12px",
      gap: "4px",
      borderRadius: "27px",
      background: filled ? CYAN : active ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.1)",
      backdropFilter: "blur(27px)",
      WebkitBackdropFilter: "blur(27px)",
      color: filled ? "#000000" : "#FFFFFF",
      fontFamily: SATOSHI,
      fontWeight: 500,
      fontSize: "14px",
      lineHeight: "19px",
    }}
  >
    {children}
  </button>
);

/* ── Part row — Figma: 426x126, active = rgba(173,122,255,.1) radius 8 ── */
const PartRow = ({ part, isActive, onClick }) => {
  const [starred, setStarred] = useState(false);
  const [starCount, setStarCount] = useState(part.stars ?? 5);

  return (
    <div
      onClick={onClick}
      className="flex cursor-pointer items-center transition-colors hover:bg-white/5"
      style={{
        width: "426px",
        height: "126px",
        padding: "10px",
        gap: "120px",
        borderRadius: "8px",
        background: isActive ? "rgba(173, 122, 255, 0.1)" : "transparent",
      }}
    >
      {/* Thumbnail + labels */}
      <div className="flex shrink-0 items-center" style={{ gap: "6px" }}>
        <img
          src={part.thumbnail}
          alt={part.label}
          className="shrink-0 object-cover"
          style={{ width: "66px", height: "106px" }}
        />
        <div className="flex flex-col justify-center" style={{ gap: "4px" }}>
          <span
            className="text-white"
            style={{ fontFamily: SATOSHI, fontSize: "24px", lineHeight: "24px" }}
          >
            {part.label}
          </span>
          <span
            className="text-white"
            style={{ fontFamily: INTER, fontSize: "14px", lineHeight: "24px" }}
          >
            {part.date}
          </span>
        </div>
      </div>

      {/* Star + comment pills */}
      <div className="flex shrink-0 items-center" style={{ gap: "8px" }}>
        <StatPill
          onClick={(e) => {
            e.stopPropagation();
            setStarred((s) => !s);
            setStarCount((c) => (starred ? c - 1 : c + 1));
          }}
        >
          <Star
            className="h-6 w-6"
            style={{ color: starred ? "#FFD600" : "#FFFFFF" }}
            fill={starred ? "#FFD600" : "none"}
            strokeWidth={1.4}
          />
          {starCount}
        </StatPill>
        <StatPill onClick={(e) => e.stopPropagation()}>
          <MessageCircle className="h-6 w-6" strokeWidth={1.5} />({part.comments})
        </StatPill>
      </div>
    </div>
  );
};

/* ── Section heading — Figma: Satoshi 24px, capitalize ───────────────── */
const RailHeading = ({ children, color = "#FFFFFF", weight = 400 }) => (
  <p
    style={{
      fontFamily: SATOSHI,
      fontWeight: weight,
      fontSize: "24px",
      lineHeight: "32px",
      textTransform: "capitalize",
      color,
      margin: 0,
    }}
  >
    {children}
  </p>
);

/* ── Slide-over panel shell (Comments / Gist) ────────────────────────── */
const SlideOverPanel = ({ open, title, onClose, children, footer }) => (
  <div
    className="fixed right-0 top-0 z-50 flex h-screen flex-col transition-transform duration-300"
    style={{
      width: "600px",
      maxWidth: "100vw",
      background: "rgba(28, 28, 30, 0.92)",
      backdropFilter: "blur(36px)",
      WebkitBackdropFilter: "blur(36px)",
      borderLeft: "1px solid rgba(255,255,255,0.15)",
      transform: open ? "translateX(0)" : "translateX(100%)",
      pointerEvents: open ? "auto" : "none",
    }}
  >
    <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
      <h3 className="text-white" style={{ fontFamily: SATOSHI, fontSize: "24px" }}>
        {title}
      </h3>
      <button onClick={onClose} className="text-white/60 transition-colors hover:text-white">
        <X className="h-5 w-5" />
      </button>
    </div>
    <div className="flex-1 space-y-4 overflow-y-auto px-6 py-5">{children}</div>
    {footer && <div className="border-t border-white/10 px-6 py-4">{footer}</div>}
  </div>
);

/* ── Thread card — Figma: 1202px wide, rgba(28,28,30,.5) + blur(36) ──── */
const ThreadCard = ({ thread }) => {
  const [starred, setStarred] = useState(false);
  const [starCount, setStarCount] = useState(thread.stars ?? 5);

  return (
    <div
      className="flex flex-col"
      style={{
        width: "1202px",
        maxWidth: "100%",
        padding: "24px",
        gap: "16px",
        background: "rgba(28, 28, 30, 0.5)",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        backdropFilter: "blur(36px)",
        WebkitBackdropFilter: "blur(36px)",
        borderRadius: "22px",
      }}
    >
      {/* Author row */}
      <div className="flex flex-col" style={{ gap: "12px" }}>
        <div className="flex items-center justify-between" style={{ gap: "16px" }}>
          <div className="flex items-center" style={{ gap: "4px" }}>
            <img
              src={thread.avatar}
              alt=""
              className="shrink-0 rounded-full object-cover"
              style={{ width: "36px", height: "36px", border: "1px solid #D9D9D9" }}
            />
            <span
              className="ml-1 text-white underline"
              style={{ fontFamily: SF, fontSize: "14px", textTransform: "capitalize" }}
            >
              {thread.author}
            </span>
            <span
              className="ml-2"
              style={{ fontFamily: INTER, fontSize: "12px", color: "#EF00F4", opacity: 0.5 }}
            >
              •
            </span>
            <span
              style={{
                fontFamily: INTER,
                fontSize: "12px",
                color: "#FFFFFF",
                opacity: 0.8,
              }}
            >
              {thread.category}
            </span>
            <span
              className="ml-2"
              style={{ fontFamily: INTER, fontSize: "12px", color: "#FFFFFF", opacity: 0.5 }}
            >
              {thread.time}
            </span>
          </div>

          {/* PLACEHOLDER: join / follow action */}
          <div className="flex shrink-0 items-center" style={{ gap: "16px" }}>
            <button
              className="flex items-center justify-center transition-opacity hover:opacity-80"
              style={{
                padding: "4px 12px",
                background: "#8E0CA3",
                borderRadius: "27px",
                fontFamily: SATOSHI,
                fontSize: "14px",
                lineHeight: "14px",
                color: "#FFFFFF",
              }}
            >
              Join
            </button>
            <button className="text-white/70 transition-colors hover:text-white">
              <MoreHorizontal className="h-6 w-6" />
            </button>
          </div>
        </div>
        <div style={{ height: "1px", background: "rgba(255,255,255,0.2)" }} />
      </div>

      {/* Body — either a story reference box above the text, or a side image */}
      {thread.storyRef ? (
        <div className="flex flex-col" style={{ gap: "20px" }}>
          <div
            className="flex items-center"
            style={{
              width: "300px",
              height: "52px",
              padding: "4px 4px 4px 8px",
              gap: "8px",
              opacity: 0.8,
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "4px",
            }}
          >
            <img
              src={thread.storyRef.thumbnail}
              alt=""
              className="shrink-0 object-cover"
              style={{ width: "27px", height: "39px", borderRadius: "1px" }}
            />
            <div className="flex flex-1 flex-col justify-center">
              <span className="text-white" style={{ fontFamily: SF, fontSize: "20px", lineHeight: "24px" }}>
                {thread.storyRef.title}
              </span>
            </div>
            <span
              className="shrink-0"
              style={{ fontFamily: SF, fontSize: "14px", color: "rgba(255,255,255,0.5)" }}
            >
              {thread.storyRef.part}
            </span>
          </div>
          <p
            className="text-white"
            style={{ fontFamily: SATOSHI, fontSize: "24px", lineHeight: "32px", margin: 0 }}
          >
            {thread.content}
          </p>
        </div>
      ) : (
        <div className="flex items-start" style={{ gap: "26px" }}>
          <p
            className="flex-1 text-white"
            style={{ fontFamily: SATOSHI, fontSize: "24px", lineHeight: "32px", margin: 0 }}
          >
            {thread.content}
          </p>
          {thread.image && (
            <img
              src={thread.image}
              alt=""
              className="shrink-0 object-cover"
              style={{ width: "141px", height: "88px", borderRadius: "4px" }}
            />
          )}
        </div>
      )}

      {/* Stats row */}
      <div className="flex items-center" style={{ gap: "8px" }}>
        <StatPill
          onClick={() => {
            setStarred((s) => !s);
            setStarCount((c) => (starred ? c - 1 : c + 1));
          }}
        >
          <Star
            className="h-5 w-5"
            style={{ color: starred ? "#FFD600" : "#FFFFFF" }}
            fill={starred ? "#FFD600" : "none"}
            strokeWidth={1.5}
          />
          {starCount}
        </StatPill>
        <StatPill>
          <MessageCircle className="h-6 w-6" strokeWidth={1.5} />
          {thread.replies}
        </StatPill>
        <StatPill>
          <Eye className="h-6 w-6" strokeWidth={1.2} />
          {thread.views}
        </StatPill>
        <StatPill
          title="Share"
          onClick={() => {
            if (navigator.clipboard) {
              navigator.clipboard.writeText(window.location.href).catch(() => {});
            }
          }}
        >
          <Share2 className="h-[22px] w-[22px]" strokeWidth={1} />
        </StatPill>
      </div>
    </div>
  );
};

/* =========================================================================
   Page
========================================================================= */
const StoryDetailPage = ({ story, onBack }) => {
  const [activePart, setActivePart] = useState(0);
  const [starred, setStarred] = useState(false);
  const [panel, setPanel] = useState(null); // null | "comments" | "gist"
  const [replyText, setReplyText] = useState("");

  // Real API values win; the mock only fills the gaps.
  const coverImg = story?.image || story?.imageUrl || mockStoryDetail.coverUrl;
  const title = story?.title || mockStoryDetail.title;
  const artist = story?.author || mockStoryDetail.artist;
  const genres =
    story?.genres?.length > 0
      ? story.genres
      : story?.genre
        ? [story.genre]
        : mockStoryDetail.genres;
  const about = story?.description || mockStoryDetail.about;
  const writer = story?.writer || mockStoryDetail.writer;
  const content = story?.content || mockStoryContent;
  // The API returns parts as {id, title, duration}; the design needs
  // label/date/thumbnail. Normalize so either shape renders.
  const parts = (story?.parts?.length > 0 ? story.parts : mockStoryParts).map((p, i) => ({
    id: p.id ?? `part-${i}`,
    label: p.label || p.title || `Part ${i + 1}`,
    date: p.date || p.duration || "",
    thumbnail: p.thumbnail || coverImg,
    stars: p.stars ?? 5,
    comments: p.comments ?? 2,
  }));
  const threads = story?.threads?.length > 0 ? story.threads : mockStoryThreads;
  const recommendations =
    story?.recommendations?.length > 0 ? story.recommendations : mockStoryRecommendations;

  // PLACEHOLDER counters — backend supplies real values.
  const views = story?.views || mockStoryDetail.views;
  const commentCount = story?.comments ?? mockStoryDetail.comments;
  const [starCount, setStarCount] = useState(story?.stars ?? mockStoryDetail.stars);

  const currentPart = parts[activePart] || parts[0];

  return (
    <div className="relative w-full overflow-x-hidden" style={{ background: "#010101" }}>
      {/* ═══════════════ Ambient glows (Figma: 490-641px, blur 250) ═══════ */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute"
          style={{
            width: "535px",
            height: "535px",
            left: 0,
            top: "5236px",
            background: CYAN,
            opacity: 0.2,
            filter: "blur(250px)",
            borderRadius: "363px",
          }}
        />
        <div
          className="absolute"
          style={{
            width: "641px",
            height: "641px",
            left: "1240px",
            top: "5241px",
            background: "#DF28E2",
            opacity: 0.15,
            filter: "blur(250px)",
            borderRadius: "363px",
          }}
        />
      </div>

      {/* ═══════════════ HERO — blurred cover art behind the content ═══════ */}
      <div className="absolute left-0 top-0 w-full overflow-hidden" style={{ height: "3004px" }}>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${coverImg})`, filter: "brightness(0.45)" }}
        />
        {/* Left fade (Figma Rectangle 34624261, rotated) */}
        <div
          className="absolute left-0 top-0"
          style={{
            width: "674px",
            height: "100%",
            background: "linear-gradient(90deg, #060106 0%, rgba(6,1,6,0) 100%)",
          }}
        />
        {/* Bottom fade into the page background (Rectangle 34624260) */}
        <div
          className="absolute bottom-0 left-0 w-full"
          style={{
            height: "1557px",
            background:
              "linear-gradient(180deg, rgba(1,1,1,0) 0%, #060106 17.25%, #010101 85.61%)",
          }}
        />
      </div>

      {/* ═══════════════ STORY SECTION ═══════════════════════════════════ */}
      <section
        className="relative z-10 flex flex-col items-center"
        style={{ padding: "300px 200px 0" }}
      >
        {/* Back link */}
        {onBack && (
          <div style={{ width: "1520px", maxWidth: "100%", marginBottom: "24px" }}>
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 text-white/60 transition-colors hover:text-white"
              style={{ fontFamily: SATOSHI, fontSize: "16px" }}
            >
              <ChevronLeft className="h-4 w-4" /> Back
            </button>
          </div>
        )}

        <div
          className="flex items-start justify-center"
          style={{ width: "1520px", maxWidth: "100%", gap: "36px" }}
        >
          {/* ══════════ LEFT RAIL — 445px ══════════ */}
          <div className="flex shrink-0 flex-col" style={{ width: "445px", gap: "50px" }}>
            <div className="flex flex-col" style={{ gap: "40px" }}>
              <div className="flex flex-col" style={{ gap: "22px" }}>
                {/* Cover + artist credit */}
                <div className="flex flex-col" style={{ gap: "25px" }}>
                  <div style={{ width: "445px", height: "714px", position: "relative" }}>
                    <img
                      src={coverImg}
                      alt={title}
                      className="object-cover"
                      style={{ width: "445px", height: "687px" }}
                    />
                    <p
                      className="absolute"
                      style={{
                        top: "699px",
                        left: 0,
                        margin: 0,
                        fontFamily: SATOSHI,
                        fontSize: "14px",
                        lineHeight: "14px",
                        textTransform: "capitalize",
                        color: MUTED,
                      }}
                    >
                      Artist: {artist}
                    </p>
                  </div>

                  {/* Action row — Listen / Tip / Boost */}
                  <div className="flex items-center" style={{ gap: "10px" }}>
                    {/* PLACEHOLDER: audio playback */}
                    <button
                      className="flex shrink-0 items-center transition-opacity hover:opacity-90"
                      style={{
                        height: "49px",
                        padding: "8px 14px",
                        gap: "4px",
                        background: "rgba(255, 255, 255, 0.2)",
                        backdropFilter: "blur(27px)",
                        WebkitBackdropFilter: "blur(27px)",
                      }}
                    >
                      <span
                        className="flex items-center justify-center rounded-full"
                        style={{ width: "32px", height: "32px" }}
                      >
                        <Volume2 className="h-6 w-6" style={{ color: CYAN }} />
                      </span>
                      <span
                        style={{
                          fontFamily: SATOSHI,
                          fontSize: "20px",
                          lineHeight: "27px",
                          color: "#FFFFFF",
                        }}
                      >
                        Listen Audio
                      </span>
                    </button>

                    {/* PLACEHOLDER: tip / payment flow */}
                    <button
                      className="flex shrink-0 items-center transition-opacity hover:opacity-90"
                      style={{
                        height: "49px",
                        padding: "9px 14px",
                        gap: "4px",
                        background: PURPLE,
                        backdropFilter: "blur(27px)",
                        WebkitBackdropFilter: "blur(27px)",
                      }}
                    >
                      <DollarSign className="h-[22px] w-[22px] text-black" strokeWidth={1.6} />
                      <span
                        style={{
                          fontFamily: SATOSHI,
                          fontSize: "20px",
                          lineHeight: "27px",
                          color: "#000000",
                        }}
                      >
                        Tip Author
                      </span>
                    </button>

                    {/* PLACEHOLDER: boost purchase flow */}
                    <button
                      className="flex shrink-0 items-center justify-center transition-opacity hover:opacity-90"
                      style={{
                        width: "104px",
                        height: "42px",
                        padding: "10px 16px",
                        gap: "8px",
                        background:
                          "radial-gradient(50% 50% at 50% 50%, rgba(255, 227, 22, 0.21) 0%, #FFE316 100%)",
                      }}
                    >
                      <Rocket
                        className="h-[22px] w-[22px] text-black"
                        style={{ transform: "rotate(-45deg)" }}
                      />
                      <span
                        style={{
                          fontFamily: SATOSHI,
                          fontWeight: 500,
                          fontSize: "16px",
                          lineHeight: "22px",
                          color: "#000000",
                        }}
                      >
                        Boost
                      </span>
                    </button>
                  </div>
                </div>

                {/* Earn line */}
                <p
                  style={{
                    margin: 0,
                    fontFamily: SATOSHI,
                    fontSize: "24px",
                    lineHeight: "32px",
                    textTransform: "capitalize",
                    color: CYAN,
                  }}
                >
                  earn {mockStoryDetail.earnAmount} SPCA
                </p>
              </div>

              {/* About + Writer */}
              <div className="flex flex-col items-end" style={{ width: "418px", gap: "24px" }}>
                <div className="flex w-full flex-col" style={{ gap: "10px" }}>
                  <RailHeading>About Story</RailHeading>
                  <p
                    style={{
                      margin: 0,
                      fontFamily: SATOSHI,
                      fontSize: "16px",
                      lineHeight: "22px",
                      textTransform: "capitalize",
                      color: MUTED,
                    }}
                  >
                    {about}
                  </p>
                </div>

                <div className="flex w-full flex-col" style={{ gap: "10px" }}>
                  <RailHeading>Writer</RailHeading>
                  <div className="flex items-center" style={{ gap: "10px" }}>
                    <img
                      src={writer.avatar}
                      alt=""
                      className="shrink-0 rounded-full object-cover"
                      style={{ width: "24px", height: "24px" }}
                    />
                    <span
                      style={{
                        fontFamily: SATOSHI,
                        fontSize: "16px",
                        lineHeight: "22px",
                        textTransform: "capitalize",
                        color: MUTED,
                      }}
                    >
                      {writer.name}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Parts list */}
            <div className="flex flex-col" style={{ width: "431px", gap: "22px" }}>
              <RailHeading color={PURPLE} weight={500}>
                Parts
              </RailHeading>
              <div className="flex flex-col" style={{ gap: "15px" }}>
                {parts.map((part, i) => (
                  <PartRow
                    key={part.id}
                    part={part}
                    isActive={activePart === i}
                    onClick={() => setActivePart(i)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ══════════ RIGHT — story panel, 1039px ══════════ */}
          <div
            className="flex flex-col"
            style={{
              width: "1039px",
              maxWidth: "100%",
              padding: "24px",
              background: "rgba(28, 28, 30, 0.5)",
              backdropFilter: "blur(36px)",
              WebkitBackdropFilter: "blur(36px)",
              borderRadius: "22px",
            }}
          >
            {/* Heading: genre chips + stat pills */}
            <div
              className="flex flex-wrap items-center justify-between"
              style={{ gap: "24px", paddingBottom: "24px" }}
            >
              <div className="flex items-center" style={{ gap: "14px" }}>
                {genres.map((g) => (
                  <span
                    key={g}
                    className="flex items-center justify-center"
                    style={{
                      height: "46px",
                      padding: "12px 16px",
                      background: GREEN,
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "4px",
                      fontFamily: SATOSHI,
                      fontSize: "20px",
                      lineHeight: "27px",
                      color: "#000000",
                    }}
                  >
                    {g}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap items-center" style={{ gap: "8px" }}>
                <StatPill filled>
                  <Eye className="h-6 w-6" strokeWidth={1.2} />
                  {views}
                </StatPill>
                <StatPill
                  onClick={() => {
                    setStarred((s) => !s);
                    setStarCount((c) => (starred ? c - 1 : c + 1));
                  }}
                >
                  <Star
                    className="h-6 w-6"
                    style={{ color: starred ? "#FFD600" : "#FFFFFF" }}
                    fill={starred ? "#FFD600" : "none"}
                    strokeWidth={1.4}
                  />
                  {starCount}
                </StatPill>
                <StatPill
                  active={panel === "comments"}
                  onClick={() => setPanel((p) => (p === "comments" ? null : "comments"))}
                >
                  <MessageCircle className="h-6 w-6" strokeWidth={1.5} />({commentCount})
                </StatPill>
                <StatPill
                  title="Share"
                  onClick={() => {
                    if (navigator.clipboard) {
                      navigator.clipboard.writeText(window.location.href).catch(() => {});
                    }
                  }}
                >
                  <Share2 className="h-[22px] w-[22px]" strokeWidth={1} />
                </StatPill>
                <StatPill
                  title="Gist"
                  active={panel === "gist"}
                  onClick={() => setPanel((p) => (p === "gist" ? null : "gist"))}
                >
                  <ThreadIcon size={18} />
                </StatPill>
              </div>
            </div>

            {/* Title + body */}
            <div className="flex flex-col" style={{ gap: "16px" }}>
              <h1
                className="flex items-center text-white"
                style={{
                  margin: 0,
                  gap: "8px",
                  fontFamily: SATOSHI,
                  fontWeight: 700,
                  fontSize: "44px",
                  lineHeight: "59px",
                }}
              >
                {title}
                <span style={{ fontWeight: 400 }}>({currentPart?.label || "Part 1"})</span>
              </h1>

              <div
                className="flex flex-col text-white"
                style={{ gap: "27px", fontFamily: SATOSHI, fontSize: "20px", lineHeight: "27px" }}
              >
                {content.split("\n\n").map((para, i) => (
                  <p key={i} style={{ margin: 0 }}>
                    {para}
                  </p>
                ))}
              </div>

              {/* Part pager — Figma Frame 1686553086: 113x48 */}
              <div className="flex items-center justify-center" style={{ height: "48px" }}>
                <div
                  className="flex items-center justify-center"
                  style={{
                    height: "48px",
                    padding: "8px 24px",
                    gap: "10px",
                    background: "rgba(255, 255, 255, 0.1)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                  }}
                >
                  <button
                    onClick={() => setActivePart((p) => Math.max(0, p - 1))}
                    disabled={activePart === 0}
                    className="transition-opacity disabled:opacity-30"
                    style={{ color: "rgba(255,255,255,0.6)" }}
                  >
                    <ChevronLeft className="h-8 w-4" />
                  </button>
                  <span
                    style={{
                      fontFamily: SF,
                      fontSize: "20px",
                      letterSpacing: "0.04em",
                      textDecorationLine: "underline",
                      color: "rgba(255, 255, 255, 0.9)",
                    }}
                  >
                    {activePart + 1}
                  </span>
                  <button
                    onClick={() => setActivePart((p) => Math.min(parts.length - 1, p + 1))}
                    disabled={activePart === parts.length - 1}
                    className="transition-opacity disabled:opacity-30"
                    style={{ color: "rgba(255,255,255,0.6)" }}
                  >
                    <ChevronRight className="h-8 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ STORY THREADS ═══════════════════════════════════ */}
      <section
        className="relative z-10 flex flex-col items-center"
        style={{ padding: "80px 200px" }}
      >
        <div style={{ width: "1528px", maxWidth: "100%", paddingBottom: "24px" }}>
          <h2
            className="text-center text-white"
            style={{ margin: 0, fontFamily: SF, fontSize: "72px", lineHeight: "86px" }}
          >
            Story Threads
          </h2>
        </div>

        <div
          className="flex items-start justify-center"
          style={{ width: "1588px", maxWidth: "100%", gap: "36px" }}
        >
          <div className="flex flex-col items-center" style={{ gap: "36px" }}>
            {threads.map((t) => (
              <ThreadCard key={t.id} thread={t} />
            ))}
          </div>

          {/* PLACEHOLDER: ad slot — Figma 350x494.67 */}
          <div
            className="relative shrink-0 overflow-hidden"
            style={{
              width: "350px",
              height: "494.67px",
              border: "1px solid #FFFFFF",
              background: "linear-gradient(160deg, #2a0a3e 0%, #0a0a1e 100%)",
            }}
          >
            <button
              className="absolute flex items-center justify-center"
              style={{
                width: "17.5px",
                height: "17.5px",
                right: "4.67px",
                top: "4.67px",
                background: "rgba(255, 255, 255, 0.5)",
              }}
            >
              <X className="h-3 w-3 text-white" />
            </button>
            <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center">
              <span
                style={{
                  fontFamily: SATOSHI,
                  fontWeight: 700,
                  fontSize: "48px",
                  color: "#FFE316",
                  letterSpacing: "0.1em",
                }}
              >
                SPICA
              </span>
              <span style={{ fontFamily: SATOSHI, fontSize: "14px", color: "rgba(255,255,255,0.5)" }}>
                Advertisement
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ RECOMMENDED ════════════════════════════════════ */}
      <section
        className="relative z-10 flex flex-col items-center"
        style={{ padding: "0 96px 80px", gap: "24px", isolation: "isolate" }}
      >
        <div
          className="flex justify-center"
          style={{ width: "1430px", maxWidth: "100%", paddingBottom: "40px" }}
        >
          <h2
            className="text-center text-white"
            style={{ margin: 0, fontFamily: SF, fontSize: "72px", lineHeight: "86px" }}
          >
            Recommended From <span style={{ color: CYAN }}>Ezzstar</span>
          </h2>
        </div>

        <div
          className="flex flex-wrap items-start justify-center"
          style={{ width: "1728px", maxWidth: "100%", gap: "24px" }}
        >
          {recommendations.map((s) => (
            <div key={s.id} style={{ width: "350px" }}>
              <StoryCard
                title={s.title}
                author={s.author}
                genre={s.genre}
                image={s.image}
                hasGlow={s.boosted}
              />
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════ SLIDE-OVER PANELS ══════════════════════════════ */}
      {/* PLACEHOLDER: both panels are UI only — wire to the comments /
          threads endpoints when they exist. */}
      <SlideOverPanel
        open={panel === "comments"}
        title={`Comments (${commentCount})`}
        onClose={() => setPanel(null)}
        footer={
          <div className="flex items-center gap-3">
            <input
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 bg-transparent text-white placeholder-white/40 outline-none"
              style={{ fontFamily: SATOSHI, fontSize: "16px" }}
            />
            <button
              onClick={() => setReplyText("")}
              className="flex items-center justify-center rounded-full p-2 transition-colors hover:bg-white/10"
              style={{ color: CYAN }}
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        }
      >
        <p className="text-white/50" style={{ fontFamily: SATOSHI, fontSize: "16px" }}>
          No comments yet.
        </p>
      </SlideOverPanel>

      <SlideOverPanel open={panel === "gist"} title="Story Gist" onClose={() => setPanel(null)}>
        {threads.map((t) => (
          <div
            key={t.id}
            className="flex flex-col gap-2 border-b border-white/10 pb-4"
            style={{ fontFamily: SATOSHI }}
          >
            <div className="flex items-center gap-2">
              <img src={t.avatar} alt="" className="h-8 w-8 rounded-full object-cover" />
              <span className="text-white" style={{ fontSize: "14px" }}>
                {t.author}
              </span>
              <span className="text-white/40" style={{ fontSize: "12px" }}>
                {t.time}
              </span>
            </div>
            <p className="text-white/80" style={{ margin: 0, fontSize: "16px", lineHeight: "22px" }}>
              {t.content}
            </p>
          </div>
        ))}
      </SlideOverPanel>
    </div>
  );
};

export default StoryDetailPage;
