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
} from "lucide-react";
import CommentsPanel from "./reader/CommentsPanel.jsx";
import ThreadsPanel from "./reader/ThreadsPanel.jsx";
import { mockReaderPages } from "../../config/mockReaderData.js";

/* =========================================================================
   Reader page — Figma nodes:
     8475:94745 (horizontal / view-mode overlay)
     8475:94805 / 94857 / 94911 (book spread states)
   Comments panel (8475:94968) and Threads panel (8475:95658) are separate
   components opened from the sidebar.

   NOTE (for backend dev): the page-fetching logic below is unchanged from the
   original reader — it still calls GET /api/manga/chapter/:id/pages and keeps
   the multi-source image fallback. Everything else on this screen is UI.
   Placeholders that still need real data are marked "PLACEHOLDER".
========================================================================= */

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
  const [viewMode, setViewMode] = useState("book"); // "book" | "horizontal"
  const [pageIndex, setPageIndex] = useState(0); // index of left/current page
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

  // Only two modes today, so either arrow just toggles between them.
  const cycleView = () => {
    setViewMode((m) => (m === "book" ? "horizontal" : "book"));
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
      {/* Ambient glows */}
      <div className="pointer-events-none absolute -left-40 bottom-0 h-[500px] w-[500px] rounded-full bg-[#7A2BE2]/20 blur-[150px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-[#01F1E3]/15 blur-[150px]" />

      {/* Header */}
      <header className="sticky top-0 z-40 px-6 pt-5">
        <div className="mx-auto flex items-center justify-between rounded-2xl bg-[#0E0E11]/90 backdrop-blur border border-white/10 px-6 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-gray-300 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <div className="text-center">
            <h1 className="text-2xl font-medium leading-tight">{meta.title}</h1>
            <p className="text-gray-500 text-sm">{meta.author}</p>
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
          {viewMode === "book" ? (
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
          ) : (
            /* Single page (horizontal / paged) */
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
            View : {viewMode === "book" ? "Book" : "Horizontal"}
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
            <button onClick={() => cycleView()} className="text-white/80 hover:text-white">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <span className="min-w-[90px] text-center text-white">
              {viewMode === "book" ? "Book" : "Horizontal"}
            </span>
            <button onClick={() => cycleView()} className="text-white/80 hover:text-white">
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
