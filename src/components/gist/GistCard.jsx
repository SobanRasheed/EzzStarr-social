import React from "react";

/**
 * Gist group card — Figma nodes 8475:88896 (Discover grid, 361px) and
 * 8475:89191 (detail rail, 450px). Width-agnostic: the container sizes it.
 *
 * The design sets the tag glyph in "Aliencons TFB", which this project does not
 * bundle. PostCard.jsx uses a 👾 emoji for the same glyph, so we match that
 * until the real font is added.
 */

// Label text uses the white -> rgba(255,255,255,0.72) gradient clip.
const gradientText = {
  background: "linear-gradient(180deg, rgba(255,255,255,0.72) 8.854%, #FFFFFF 100%)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  WebkitTextFillColor: "transparent",
  color: "transparent",
};

const Stat = ({ label, value }) => (
  <div className="flex flex-col items-start gap-[7px] shrink-0">
    <span
      className="font-inter text-[14px] tracking-[-0.28px] whitespace-nowrap"
      style={gradientText}
    >
      {label}
    </span>
    <span className="font-inter text-[12px] leading-[16px] text-[#ADB5BD] whitespace-nowrap">
      {value}
    </span>
  </div>
);

export default function GistCard({ group, onJoin }) {
  if (!group) return null;

  const {
    tag,
    nsfw = false,
    joined = false,
    avatar,
    startedBy,
    totalGists,
    views,
    totalGifts,
  } = group;

  return (
    <div
      className="w-full flex flex-col gap-[32px] items-start overflow-hidden rounded-[12px] pb-[16px] bg-[rgba(28,28,30,0.5)]"
      style={{ backdropFilter: "blur(36px)", WebkitBackdropFilter: "blur(36px)" }}
    >
      {/* Header strip: tag + join pill */}
      <div
        className="w-full flex items-center justify-between px-[24px] py-[10px] rounded-[4px] bg-[rgba(223,40,226,0.07)]"
        style={{ backdropFilter: "blur(27px)", WebkitBackdropFilter: "blur(27px)" }}
      >
        <div className="flex items-center gap-[4px] min-w-0">
          <span className="text-[20px] leading-[22px] text-[#EF00F4] opacity-80 shrink-0">
            {nsfw ? "🔞" : "👾"}
          </span>
          <span className="font-inter text-[22px] leading-[22px] text-white opacity-80 truncate">
            {tag}
          </span>
        </div>

        <button
          onClick={onJoin}
          className="flex items-center justify-center px-[12px] py-[4px] rounded-[27px] cursor-pointer shrink-0 transition-opacity hover:opacity-90"
          style={{
            background: joined ? "#9C9C9C" : "#8E0CA3",
            backdropFilter: "blur(27px)",
            WebkitBackdropFilter: "blur(27px)",
          }}
        >
          <span
            className="font-satoshi text-[14px] leading-[14px] whitespace-nowrap"
            style={{ color: joined ? "#000000" : "#FFFFFF" }}
          >
            {joined ? "Joined" : "Join"}
          </span>
        </button>
      </div>

      {/* Started by */}
      <div className="w-full flex items-center pl-[24px] pr-[28px]">
        <div className="flex flex-1 min-w-0 items-center gap-[16px]">
          <img
            src={avatar}
            alt={startedBy}
            className="w-[54px] h-[54px] rounded-[8px] object-cover shrink-0 bg-gray-700"
            style={{ boxShadow: "0px 0px 4px 1px #690A78" }}
          />
          <div className="flex flex-col gap-[4px] items-start min-w-0">
            <span className="font-inter text-[14px] tracking-[-0.28px] text-[#737373] whitespace-nowrap">
              Started by
            </span>
            <span
              className="font-inter text-[22px] leading-[22px] tracking-[-0.44px] truncate"
              style={gradientText}
            >
              {startedBy}
            </span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="w-full flex items-start justify-between px-[24px]">
        <Stat label="Total Gists" value={totalGists} />
        <Stat label="Views" value={views} />
        <Stat label="Total Gifts" value={totalGifts} />
      </div>
    </div>
  );
}
