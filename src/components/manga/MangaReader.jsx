import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const MangaReader = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pages, setPages] = useState([]);
  const [fallbackPages, setFallbackPages] = useState([]);
  const [failedIndices, setFailedIndices] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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

  // Loading, error, and render (unchanged from your original, just use pages array)
  if (isLoading) {
    return (
      <div className="bg-black text-white h-screen flex items-center justify-center">
        Loading pages...
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-black text-white h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-red-400">{error}</p>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-white/10 rounded"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen relative">
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur flex justify-between items-center px-6 py-7 border-b border-white/10">
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-gray-300 hover:text-white"
        >
          ← Back
        </button>
        <div className="text-sm text-gray-400">
          Chapter Reader ({pages.length} pages)
        </div>
        <div />
      </div>
      <div className="pt-20 flex flex-col items-center gap-4">
        {pages.map((src, index) => {
          const hasFailed = failedIndices[index];
          const displaySrc = 
            hasFailed === "proxy"
              ? `${import.meta.env.VITE_API_URL}/api/manga/page-proxy?url=${encodeURIComponent(fallbackPages[index] || src)}`
              : hasFailed && fallbackPages[index] 
                ? fallbackPages[index] 
                : src;
          
          return (
            <img
              key={index}
              src={displaySrc}
              alt={`page-${index + 1}`}
              className="max-w-3xl w-full object-contain rounded"
              loading="lazy"
              referrerPolicy="no-referrer"
              onError={() => {
                if (!hasFailed && fallbackPages[index]) {
                  console.log(`Page ${index + 1} failed to load from primary server. Retrying with fallback source...`);
                  setFailedIndices(prev => ({ ...prev, [index]: true }));
                } else if (hasFailed !== "proxy") {
                  console.log(`Page ${index + 1} fallback failed. Retrying through backend proxy...`);
                  setFailedIndices(prev => ({ ...prev, [index]: "proxy" }));
                }
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MangaReader;