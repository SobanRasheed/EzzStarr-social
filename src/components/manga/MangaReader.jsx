import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  MessageCircle,
  Share2,
  PenLine,
  ClipboardCheck,
} from "lucide-react";
import CommentsPanel from "./reader/CommentsPanel.jsx";
import ThreadsPanel from "./reader/ThreadsPanel.jsx";
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

const SideButton = ({ children, onClick, active }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm transition ${
      active
        ? "bg-[#26262A] text-white"
        : "bg-[#1C1C1E] text-white hover:bg-[#26262A]"
    }`}
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
  const step = viewMode === "book" ? 2 : 1;
  const canPrev = pageIndex > 0;
  const canNext = pageIndex + step < displayPages.length;
  const goPrev = () => canPrev && setPageIndex((i) => Math.max(0, i - step));
  const goNext = () => canNext && setPageIndex((i) => i + step);

  // Cycle through the view modes (dir: +1 next, -1 prev).
  const cycleView = (dir) => {
    setViewMode((m) => {
      const i = VIEW_MODES.indexOf(m);
      return VIEW_MODES[(i + dir + VIEW_MODES.length) % VIEW_MODES.length];
    });
  };

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
    <div className="relative min-h-screen bg-[#060106] text-white overflow-x-hidden">
      {/* Ambient glows (Figma: 490px circles, blur 250px, ~20% opacity) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-32 h-[490px] w-[490px] rounded-full bg-[#0BFEF0]/20 blur-[160px]" />
        <div className="absolute left-1/3 top-24 h-[490px] w-[490px] rounded-full bg-[#AD7AFF]/20 blur-[160px]" />
        <div className="absolute -right-40 top-56 h-[490px] w-[490px] rounded-full bg-[#DF28E2]/20 blur-[160px]" />
        <div className="absolute left-16 -top-24 h-[367px] w-[367px] rounded-full bg-[#FF6B00]/10 blur-[160px]" />
      </div>

      {/* Header (Figma: rgba(28,28,30,.5) + backdrop blur, radius 22) */}
      <header className="sticky top-0 z-40 px-6 pt-5">
        <div className="mx-auto flex items-center justify-between rounded-[22px] bg-[#1C1C1E]/50 backdrop-blur-2xl border border-white/10 px-10 py-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-gray-300 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <div className="text-center">
            <h1 className="text-3xl font-medium leading-tight">{meta.title}</h1>
            <p className="text-gray-500 text-sm mt-0.5">{meta.author}</p>
          </div>

          {/* PLACEHOLDER: wire to tip / payment flow */}
          <button className="flex items-center gap-2 bg-[#01F1E3] hover:bg-[#01d6c9] text-black text-sm font-medium px-4 py-2.5 rounded-lg transition">
            <img src="/spica-coin.png" alt="" className="w-5 h-5 rounded-full" />
            Give a tip to {meta.author}
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="relative flex items-start justify-center gap-8 px-6 pt-10 pb-20">
        {/* Reader */}
        <div className="relative flex-1 max-w-[1000px] flex justify-center">
          {viewMode === "book" && (
            /* Two-page spread */
            <div className="relative flex items-stretch shadow-2xl rounded-lg overflow-hidden">
              <div className="bg-white flex items-center justify-center">
                <ReaderPage index={pageIndex} className="h-[78vh] w-auto object-contain" />
              </div>
              <div className="w-px bg-black/20" />
              <div className="bg-white flex items-center justify-center">
                <ReaderPage index={pageIndex + 1} className="h-[78vh] w-auto object-contain" />
              </div>
            </div>
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
            /* Vertical webtoon scroll (Figma node 8475:93824).
               Pages are 686×1029 in the design and stack with no gap. */
            <div className="flex flex-col items-center w-[686px] max-w-full">
              {/* "Scroll" hint sits just under the first (cover) page */}
              {displayPages.map((_, index) => (
                <div key={index} className="relative w-full">
                  <ReaderPage index={index} className="w-full h-auto block" />
                  {index === 0 && (
                    <span className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 text-[32px] font-medium tracking-[-1.5px] text-white drop-shadow">
                      Scroll
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Book-mode edge navigation */}
          {viewMode === "book" && (
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

        {/* Sidebar */}
        <div className="w-60 shrink-0 sticky top-28 space-y-3">
          <SideButton onClick={() => setShowViewPicker((v) => !v)} active={showViewPicker}>
            View : {VIEW_LABELS[viewMode]}
            <ChevronRight className="w-4 h-4" />
          </SideButton>

          {/* PLACEHOLDER: chapter selector — backend provides chapter list */}
          <SideButton onClick={() => {}}>
            Chapter : {CHAPTER_LABEL}
            <ChevronDown className="w-4 h-4" />
          </SideButton>

          <SideButton onClick={() => setPanel("comments")}>
            <MessageCircle className="w-4 h-4" />
            Comments ({COMMENT_COUNT})
          </SideButton>

          {/* PLACEHOLDER: share manga */}
          <SideButton onClick={() => {}}>
            <Share2 className="w-4 h-4" />
            Share Manga
          </SideButton>

          <SideButton onClick={() => setPanel("threads")}>
            <PenLine className="w-4 h-4" />
            Create Thread
          </SideButton>

          {/* PLACEHOLDER: quiz flow — only shown in the One Page design, but
              harmless to keep visible; wire to the chapter quiz when available */}
          <SideButton onClick={() => {}}>
            <ClipboardCheck className="w-4 h-4" />
            Complete Quiz
          </SideButton>
        </div>
      </main>

      {/* View-mode picker overlay (Figma node 8475:94745) */}
      {showViewPicker && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={() => setShowViewPicker(false)}
        >
          <div
            className="flex items-center gap-4 bg-[#161618] border border-white/10 rounded-2xl px-6 py-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={() => cycleView(-1)} className="text-white/80 hover:text-white">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <span className="min-w-[110px] text-center text-white">
              {VIEW_LABELS[viewMode]}
            </span>
            <button onClick={() => cycleView(1)} className="text-white/80 hover:text-white">
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}

      {/* Slide-over panels */}
      <CommentsPanel open={panel === "comments"} onClose={() => setPanel(null)} />
      <ThreadsPanel open={panel === "threads"} onClose={() => setPanel(null)} />
    </div>
  );
};

export default MangaReader;
