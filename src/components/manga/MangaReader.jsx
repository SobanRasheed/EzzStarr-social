import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Check,
  MessageCircle,
  Share2,
  PenLine,
} from "lucide-react";
import CommentsPanel from "./reader/CommentsPanel.jsx";
import ThreadsPanel from "./reader/ThreadsPanel.jsx";
import BookStage from "./reader/BookStage.jsx";
import FixedDesktopStage from "./reader/FixedDesktopStage.jsx";
import { mockReaderPages } from "../../config/mockReaderData.js";

/* =========================================================================
   Reader page — Figma nodes:
     8475:93824 (one-page / vertical scroll)
     8475:94745 (horizontal / view-mode overlay)
     8475:94805 / 94857 / 94911 (book spread states)
   Comments panel (8475:94968) and Threads panel (8475:95658) are separate
   components opened from the sidebar.

   NOTE (for backend dev): the page-fetching logic below is unchanged from the
   original reader — it still calls GET /api/manga/chapter/:id/pages and keeps
   the multi-source image fallback. Everything else on this screen is UI.
   Placeholders that still need real data are marked "PLACEHOLDER".
========================================================================= */

// Reader view modes cycled by the View picker.
const VIEW_MODES = ["book", "horizontal", "onepage"];
const VIEW_LABELS = { book: "Book", horizontal: "Horizontal", onepage: "One Page" };

/* Sidebar pill — Figma: 227x40, rgba(255,255,255,.1) + blur(27), radius 27 */
const SideButton = ({ children, onClick, active }) => (
  <button
    onClick={onClick}
    className="flex w-full items-center justify-center gap-2 text-white transition-colors hover:bg-white/20"
    style={{
      height: "40px",
      padding: "8px 24px",
      background: active ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.1)",
      backdropFilter: "blur(27px)",
      WebkitBackdropFilter: "blur(27px)",
      borderRadius: "27px",
      fontFamily: "SF Pro Display, sans-serif",
      fontWeight: 500,
      fontSize: "16px",
      letterSpacing: "-0.5px",
    }}
  >
    {children}
  </button>
);

const MangaReader = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pages, setPages] = useState([]);
  const [fallbackPages, setFallbackPages] = useState([]);
  const [failedIndices, setFailedIndices] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // PLACEHOLDER: manga title / creator name. Backend can return these on the
  // /pages response (data.manga) — the reads below already pick them up.
  const [meta, setMeta] = useState({
    title: "Blooming Love",
    author: "Daichi Kawada",
  });

  // UI state
  const [viewMode, setViewMode] = useState("book"); // "book" | "horizontal" | "onepage"
  const [bookStage, setBookStage] = useState("cover"); // "cover" | "spread"
  const [pageIndex, setPageIndex] = useState(0); // index of left/current page (paged modes)
  const [showViewPicker, setShowViewPicker] = useState(false);
  const [panel, setPanel] = useState(null); // null | "comments" | "threads"

  // PLACEHOLDER counters / labels — backend supplies real values.
  const COMMENT_COUNT = 24;
  const CHAPTER_LABEL = "#001";

  useEffect(() => {
    const fetchPages = async () => {
      try {
        setIsLoading(true);
        setError(null);

        if (!id) throw new Error("No chapter ID provided");

        console.log("Fetching chapter from backend:", id);

        // ✅ Use your backend proxy
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/manga/chapter/${id}/pages`
        );

        if (!res.ok) throw new Error(`Backend error: ${res.status}`);

        const data = await res.json();
        console.log("Pages response:", data);

        if (!data.success || !data.pages?.length) {
          throw new Error(data.message || "No pages found");
        }

        const rawPages = data.pagesDataSaver?.length ? data.pagesDataSaver : data.pages;
        const rawFallback = data.pagesDataSaver?.length ? data.pages : [];

        const securePages = (rawPages || []).map(url => url.replace(/^http:\/\//i, "https://"));
        const secureFallback = (rawFallback || []).map(url => url.replace(/^http:\/\//i, "https://"));

        setPages(securePages);
        setFallbackPages(secureFallback);

        // PLACEHOLDER: pick up manga meta if the backend includes it.
        if (data.manga) {
          setMeta({
            title: data.manga.title || "Blooming Love",
            author: data.manga.author || "Daichi Kawada",
          });
        }
      } catch (err) {
        console.error("Reader error:", err);
        setError(err.message);
        setPages([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPages();
  }, [id]);

  // Dev fallback: show mock pages when the API is unavailable so the layout
  // is still visible (mirrors HomeManga/HomeStories). Real pages take priority.
  const displayPages = error || pages.length === 0 ? mockReaderPages : pages;

  // --- Pagination ---
  // In book mode the cover is page 0, so spreads start at index 1.
  const step = viewMode === "book" ? 2 : 1;
  const minIndex = viewMode === "book" ? 1 : 0;
  const canPrev = pageIndex > minIndex;
  const canNext = pageIndex + step < displayPages.length;
  const goPrev = () =>
    canPrev && setPageIndex((i) => Math.max(minIndex, i - step));
  const goNext = () => canNext && setPageIndex((i) => i + step);

  // Renders a single page image, preserving the original multi-source fallback.
  const ReaderPage = ({ index, className }) => {
    const src = displayPages[index];
    if (!src) return null;
    const hasFailed = failedIndices[index];
    const displaySrc =
      hasFailed === "proxy"
        ? `${import.meta.env.VITE_API_URL}/api/manga/page-proxy?url=${encodeURIComponent(fallbackPages[index] || src)}`
        : hasFailed && fallbackPages[index]
          ? fallbackPages[index]
          : src;

    return (
      <img
        src={displaySrc}
        alt={`page-${index + 1}`}
        className={className}
        loading="lazy"
        referrerPolicy="no-referrer"
        onError={() => {
          if (!hasFailed && fallbackPages[index]) {
            setFailedIndices((prev) => ({ ...prev, [index]: true }));
          } else if (hasFailed !== "proxy") {
            setFailedIndices((prev) => ({ ...prev, [index]: "proxy" }));
          }
        }}
      />
    );
  };

  if (isLoading) {
    return (
      <div className="bg-[#060106] text-white h-screen flex items-center justify-center">
        Loading pages...
      </div>
    );
  }

  return (
    /* Desktop-only layout: laid out at exactly 1920px and scaled to fit, so
       every desktop and laptop gets the identical composition. */
    <div className="min-h-screen bg-[#010101] text-white">
      <FixedDesktopStage>
        <div className="relative" style={{ minHeight: "1175px" }}>
      {/* Ambient glows (Figma: 490px circles, blur 250px, ~20% opacity) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-32 h-[490px] w-[490px] rounded-full bg-[#0BFEF0]/20 blur-[160px]" />
        <div className="absolute left-1/3 top-24 h-[490px] w-[490px] rounded-full bg-[#AD7AFF]/20 blur-[160px]" />
        <div className="absolute -right-40 top-56 h-[490px] w-[490px] rounded-full bg-[#DF28E2]/20 blur-[160px]" />
        <div className="absolute left-16 -top-24 h-[367px] w-[367px] rounded-full bg-[#FF6B00]/10 blur-[160px]" />
      </div>

      {/* Header — Figma Card 1856x149 at (32,32), rgba(28,28,30,.5) + blur(36) */}
      <header className="relative z-30 px-8 pt-8">
        <div
          className="mx-auto flex items-center justify-between"
          style={{
            maxWidth: "1856px",
            padding: "40px",
            background: "rgba(28, 28, 30, 0.5)",
            backdropFilter: "blur(36px)",
            WebkitBackdropFilter: "blur(36px)",
            borderRadius: "22px",
          }}
        >
          {/* Back — Figma 275x48 */}
          <button
            onClick={() => navigate(-1)}
            className="flex shrink-0 items-center justify-center gap-1 text-white transition-opacity hover:opacity-70"
            style={{
              width: "275px",
              height: "48px",
              padding: "12px 16px",
              borderRadius: "4px",
              fontFamily: "Inter, sans-serif",
              fontSize: "16px",
              lineHeight: "22px",
            }}
          >
            <ArrowLeft className="h-[18px] w-[18px]" />
            Back
          </button>

          <div className="flex flex-col items-center" style={{ gap: "16px" }}>
            <h1
              className="text-white"
              style={{
                fontFamily: "SF Pro Display, sans-serif",
                fontWeight: 400,
                fontSize: "42px",
                lineHeight: "30px",
                margin: 0,
              }}
            >
              {meta.title}
            </h1>
            <p
              className="text-white"
              style={{
                fontFamily: "SF Pro Display, sans-serif",
                fontWeight: 500,
                fontSize: "32px",
                lineHeight: "23px",
                letterSpacing: "-1.5px",
                opacity: 0.2,
                margin: 0,
              }}
            >
              {meta.author}
            </p>
          </div>

          {/* PLACEHOLDER: wire to tip / payment flow — Figma 275x48, #01F1E3 */}
          <button
            className="flex shrink-0 items-center justify-center gap-2 transition-opacity hover:opacity-90"
            style={{
              height: "48px",
              padding: "12px 16px",
              background: "#01F1E3",
              color: "#000000",
              borderRadius: "4px",
              fontFamily: "Inter, sans-serif",
              fontSize: "16px",
              lineHeight: "22px",
            }}
          >
            <img src="/spica-coin.png" alt="" className="h-6 w-6 rounded-full" />
            Give a tip to {meta.author}
          </button>
        </div>
      </header>

      {/* Main content — the book is centred on the page and the sidebar card
          is pinned to the right edge (Figma x=1629 of 1920). */}
      <main className="relative px-8 pt-11 pb-20">
        {/* Reader */}
        <div className="relative mx-auto flex justify-center" style={{ maxWidth: "1171px" }}>
          {viewMode === "book" && (
            /* Cover (node 8475:94692) then the open spread
               (nodes 8475:94805 / 94857 / 94911) */
            <BookStage
              stage={bookStage}
              coverUrl={displayPages[0]}
              pages={displayPages}
              pageIndex={Math.max(minIndex, pageIndex)}
              renderPage={(index, className) => (
                <ReaderPage index={index} className={className} />
              )}
              onOpen={() => {
                // Past the cover: first spread is pages 2 & 3, as in the design.
                setPageIndex(1);
                setBookStage("spread");
              }}
            />
          )}

          {viewMode === "horizontal" && (
            /* Single page (paged) */
            <div className="relative flex items-center gap-4">
              <button
                onClick={goPrev}
                disabled={!canPrev}
                className="p-2 rounded-full bg-black/40 hover:bg-black/60 disabled:opacity-30"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <div className="bg-white rounded-lg overflow-hidden shadow-2xl flex items-center justify-center">
                <ReaderPage index={pageIndex} className="h-[78vh] w-auto object-contain" />
              </div>
              <button
                onClick={goNext}
                disabled={!canNext}
                className="p-2 rounded-full bg-black/40 hover:bg-black/60 disabled:opacity-30"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          )}

          {viewMode === "onepage" && (
            /* Vertical scroll — whole chapter on one page (node 8475:93824).
               Pages are 686x1029 in the design and stack with no gap. */
            <div className="flex flex-col items-center" style={{ width: "686px" }}>
              {displayPages.map((_, index) => (
                <div
                  key={index}
                  className="relative w-full overflow-hidden bg-white"
                  style={{
                    height: "1029px",
                    borderRadius:
                      index === 0 ? "5.353px 5.353px 0 0" : "2.423px",
                    boxShadow:
                      "0px 4px 8px 3px rgba(0, 0, 0, 0.15), 0px 1px 3px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  {displayPages[index] ? (
                    <ReaderPage
                      index={index}
                      className="h-full w-full object-contain"
                    />
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

                  {/* "Scroll" hint sits just under the first (cover) page */}
                  {index === 0 && (
                    <span
                      className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 text-white drop-shadow"
                      style={{
                        fontFamily: "SF Pro Display, sans-serif",
                        fontWeight: 500,
                        fontSize: "32px",
                        letterSpacing: "-1.5px",
                      }}
                    >
                      Scroll
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Book-mode edge navigation — only once the book is open */}
          {viewMode === "book" && bookStage === "spread" && (
            <>
              <button
                onClick={goPrev}
                disabled={!canPrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 p-2 rounded-full bg-black/40 hover:bg-black/60 disabled:opacity-0 transition"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={goNext}
                disabled={!canNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 p-2 rounded-full bg-black/40 hover:bg-black/60 disabled:opacity-0 transition"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </div>

        {/* Sidebar — Figma Card 259x336, rgba(28,28,30,.5) + blur(36), radius 22 */}
        <div
          className="absolute right-8 top-11 flex flex-col items-center justify-center"
          style={{
            width: "259px",
            padding: "16px",
            gap: "26px",
            background: "rgba(28, 28, 30, 0.5)",
            backdropFilter: "blur(36px)",
            WebkitBackdropFilter: "blur(36px)",
            borderRadius: "22px",
          }}
        >
          <SideButton onClick={() => setShowViewPicker((v) => !v)} active={showViewPicker}>
            View : {VIEW_LABELS[viewMode]}
            <ChevronDown
              className="h-[18px] w-[18px] transition-transform"
              style={{ transform: showViewPicker ? "rotate(180deg)" : "none" }}
            />
          </SideButton>

          {/* PLACEHOLDER: chapter selector — backend provides chapter list */}
          <SideButton onClick={() => {}}>
            Chapter : {CHAPTER_LABEL}
            <ChevronDown className="w-[18px] h-[18px]" />
          </SideButton>

          <SideButton onClick={() => setPanel("comments")}>
            <MessageCircle className="w-[18px] h-[18px]" />
            Comments ({COMMENT_COUNT})
          </SideButton>

          {/* PLACEHOLDER: share manga */}
          <SideButton onClick={() => {}}>
            <Share2 className="w-[18px] h-[18px]" />
            Share Manga
          </SideButton>

          <SideButton onClick={() => setPanel("threads")}>
            <PenLine className="w-[18px] h-[18px]" />
            Create Gist
          </SideButton>
        </div>
      </main>

      {/* View-mode menu — the design's "View :" pill is a dropdown
          (nodes 8475:94770 "Page View: Book" / 8475:93848 "View: One Page").
          Lets the reader switch between the paged book and the whole chapter
          on a single scrolling page. */}
      {showViewPicker && (
        <>
          {/* Click-away catcher */}
          <div className="fixed inset-0 z-40" onClick={() => setShowViewPicker(false)} />
          <div
            className="absolute z-50 flex flex-col"
            style={{
              right: "32px",
              top: "301px",
              width: "227px",
              padding: "8px",
              gap: "4px",
              background: "#1C1C1E",
              backdropFilter: "blur(36px)",
              WebkitBackdropFilter: "blur(36px)",
              borderRadius: "16px",
              boxShadow: "0px 4px 8px 3px rgba(0, 0, 0, 0.15), 0px 1px 3px rgba(0, 0, 0, 0.3)",
            }}
          >
            {VIEW_MODES.map((mode) => (
              <button
                key={mode}
                onClick={() => {
                  setViewMode(mode);
                  // Re-entering book mode starts closed on the cover again.
                  if (mode === "book") {
                    setBookStage("cover");
                    setPageIndex(0);
                  } else {
                    setPageIndex(0);
                  }
                  setShowViewPicker(false);
                }}
                className="flex items-center justify-between transition-colors hover:bg-white/10"
                style={{
                  padding: "8px 16px",
                  borderRadius: "27px",
                  background:
                    viewMode === mode ? "rgba(255,255,255,0.12)" : "transparent",
                  color: viewMode === mode ? "#01F1E3" : "#FFFFFF",
                  fontFamily: "SF Pro Display, sans-serif",
                  fontWeight: 500,
                  fontSize: "16px",
                  letterSpacing: "-0.5px",
                }}
              >
                {VIEW_LABELS[mode]}
                {viewMode === mode && <Check className="h-4 w-4" />}
              </button>
            ))}
          </div>
        </>
      )}

        </div>
      </FixedDesktopStage>

      {/* Slide-over panels — outside the scaled canvas so they stay pinned to
          the real viewport edge. */}
      <CommentsPanel open={panel === "comments"} onClose={() => setPanel(null)} />
      <ThreadsPanel open={panel === "threads"} onClose={() => setPanel(null)} />
    </div>
  );
};

export default MangaReader;
