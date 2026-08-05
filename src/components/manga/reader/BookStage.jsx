/* =========================================================================
   Book presentation for the reader — Figma nodes:
     8475:94692  "Open Magna Cover Page"  -> stage="cover"
     8475:94805  "Open Magna Book "       -> stage="spread"
     8475:94857  "Open Magna Book 1"      -> stage="spread"
     8475:94911  "Open Magna Book 2"      -> stage="spread"

   The three "Book" frames in Figma are page-turn keyframes of one open book
   (SMART_ANIMATE between them), so they collapse into a single spread state
   here rather than three separate screens.

   ⚠️ FRONTEND PLACEHOLDER — for the backend developer:
   The page surfaces below are dummies at the exact design dimensions. Pass
   real page image URLs in via the `pages` prop (MangaReader already reads
   GET /api/manga/chapter/:id/pages); nothing else needs to change.
========================================================================= */

/* --- Cover state (node 8475:94692) ---------------------------------------
   Cover art 607.643 x 823.758 with the white page block (582.688 wide)
   sitting behind it, offset 13.57px so its edges show along the bottom. */
const COVER_W = 607.643;
const COVER_H = 823.758;
const PAGE_BLOCK_LEFT = (13.57 / COVER_W) * 100; // 2.233%
const PAGE_BLOCK_W = (582.688 / COVER_W) * 100; // 95.89%
const SPINE_LEFT = (25.02 / COVER_W) * 100; // 4.117%

/* --- Spread state (node 8475:94906 "Book") -------------------------------
   Book frame 1171.1 x 840. Left page ends exactly where the right begins
   (x = 591.23), with two stacked leaves peeking out on the left edge. */
const BOOK_W = 1171.1;
const BOOK_H = 840;
const pct = (v, total) => `${(v / total) * 100}%`;

const LEAVES = [
  // Outermost leaf first — each is inset ~6px from the one before it.
  { left: 0, top: 6.63, w: 591.254, h: 833.372, bg: "#FFFFFF" },
  { left: 6.15, top: 2.41, w: 585.108, h: 835.18, bg: "#E7E7E7" },
];

const LEFT_PAGE = { left: 11.56, top: 0, w: 579.671, h: 835.18 };
const RIGHT_PAGE = { left: 591.23, top: 7.83, w: 579.872, h: 819.513 };

/* A single page surface. Renders the supplied image, or a labelled
   placeholder sheet when the backend has not supplied one yet. */
const PageSurface = ({ src, index, side, renderPage }) => {
  const radius =
    side === "left"
      ? "12.052px 2.41px 2.41px 12.052px"
      : "2.41px 4.821px 2.41px 2.41px";

  return (
    <div
      className="absolute overflow-hidden bg-white"
      style={{
        left: pct(side === "left" ? LEFT_PAGE.left : RIGHT_PAGE.left, BOOK_W),
        top: pct(side === "left" ? LEFT_PAGE.top : RIGHT_PAGE.top, BOOK_H),
        width: pct(side === "left" ? LEFT_PAGE.w : RIGHT_PAGE.w, BOOK_W),
        height: pct(side === "left" ? LEFT_PAGE.h : RIGHT_PAGE.h, BOOK_H),
        borderRadius: radius,
        boxShadow:
          side === "left"
            ? "14.462px 14.462px 2.41px rgba(0, 0, 0, 0.25)"
            : "14.462px 14.462px 2.41px rgba(0, 0, 0, 0.25), 0px 3.615px 0px #A7BBE3, 0px 7.231px 0px #9BA9CF",
      }}
    >
      {src ? (
        renderPage(index, "h-full w-full object-contain")
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <span
            className="text-black/25"
            style={{ fontFamily: "Inter, sans-serif", fontSize: "20px" }}
          >
            Page {index + 1}
          </span>
        </div>
      )}

      {/* Gutter shading — inset toward the spine */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          borderRadius: radius,
          boxShadow:
            side === "left"
              ? "inset -15.065px 0px 14.462px rgba(28, 28, 30, 0.17)"
              : "inset 8.436px 0px 2.41px rgba(41, 45, 50, 0.22), inset 3.615px 0px 2.41px rgba(0, 58, 55, 0.16)",
        }}
      />
    </div>
  );
};

const BookStage = ({
  stage,
  coverUrl,
  pages = [],
  pageIndex = 0,
  renderPage,
  onOpen,
}) => {
  /* ---------------------------------------------------------------- cover */
  if (stage === "cover") {
    return (
      <div className="flex w-full flex-col items-center">
        <button
          type="button"
          onClick={onOpen}
          aria-label="Open manga"
          className="relative block w-full cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
          style={{
            maxWidth: `${COVER_W}px`,
            aspectRatio: `${COVER_W} / ${COVER_H}`,
          }}
        >
          {/* White page block behind the cover (Figma "Second") */}
          <div
            className="absolute bg-white"
            style={{
              left: `${PAGE_BLOCK_LEFT}%`,
              top: 0,
              width: `${PAGE_BLOCK_W}%`,
              height: "100%",
              borderRadius: "2.423px 4.846px 0px 2.423px",
              boxShadow:
                "0px 3.634px 0px #A7BBE3, 0px 7.268px 0px #9BA9CF, inset 8.48px 0px 2.423px rgba(36, 44, 123, 0.25), inset 3.634px 0px 2.423px rgba(36, 44, 123, 0.55)",
            }}
          />

          {/* Cover art */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{
              borderRadius: "5.353px",
              filter:
                "drop-shadow(-32.12px 45.503px 45.503px rgba(0, 0, 0, 0.55))",
            }}
          >
            {coverUrl && (
              <img
                src={coverUrl}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
                style={{ borderRadius: "5.353px" }}
              />
            )}

            {/* Dark bleed along the spine edge */}
            <div
              className="absolute inset-0"
              style={{
                borderRadius: "5.353px",
                background:
                  "linear-gradient(-89.53deg, rgba(41, 45, 50, 0) 94.518%, rgba(41, 45, 50, 0.99) 99.452%)",
              }}
            />

            {/* Spine crease */}
            <div
              className="absolute top-0"
              style={{
                left: `${SPINE_LEFT}%`,
                height: "105.8%",
                borderLeft: "1.3px solid #B3B3B3",
                mixBlendMode: "overlay",
              }}
            />

            <div
              className="pointer-events-none absolute inset-0"
              style={{
                borderRadius: "5.353px",
                boxShadow:
                  "inset 8.03px -16.06px 10.707px rgba(0, 0, 0, 0.25)",
              }}
            />
          </div>
        </button>

        {/* "Click to Open" caption (node 8475:94744) */}
        <button
          type="button"
          onClick={onOpen}
          className="cursor-pointer text-white transition-opacity hover:opacity-70"
          style={{
            marginTop: "24px",
            fontFamily: "SF Pro Display, sans-serif",
            fontWeight: 500,
            fontSize: "32px",
            letterSpacing: "-1.5px",
          }}
        >
          Click to Open
        </button>
      </div>
    );
  }

  /* --------------------------------------------------------------- spread */
  return (
    <div
      className="relative w-full"
      style={{
        maxWidth: `${BOOK_W}px`,
        aspectRatio: `${BOOK_W} / ${BOOK_H}`,
      }}
    >
      {/* Stacked page edges peeking out on the left */}
      {LEAVES.map((leaf, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: pct(leaf.left, BOOK_W),
            top: pct(leaf.top, BOOK_H),
            width: pct(leaf.w, BOOK_W),
            height: pct(leaf.h, BOOK_H),
            background: leaf.bg,
            borderRadius: "12.052px 2.41px 2.41px 12.052px",
            boxShadow: "14.462px 14.462px 2.41px rgba(0, 0, 0, 0.25)",
          }}
        />
      ))}

      <PageSurface
        side="left"
        index={pageIndex}
        src={pages[pageIndex]}
        renderPage={renderPage}
      />
      <PageSurface
        side="right"
        index={pageIndex + 1}
        src={pages[pageIndex + 1]}
        renderPage={renderPage}
      />
    </div>
  );
};

export default BookStage;
