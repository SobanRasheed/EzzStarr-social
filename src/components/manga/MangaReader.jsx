import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const MangaReader = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [pages, setPages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPages = async () => {
            try {
                setIsLoading(true);
                setError(null);

                if (!id) {
                    throw new Error("No chapter ID provided");
                }

                console.log("Fetching chapter:", id);

                const res = await fetch(
                    `https://api.mangadex.org/at-home/server/${id}`
                );

                if (!res.ok) {
                    throw new Error(`API failed: ${res.status}`);
                }

                const data = await res.json();

                if (!data?.chapter?.hash) {
                    throw new Error("Invalid chapter response");
                }

                const { baseUrl, chapter } = data;

                const images =
                    chapter.data?.length > 0
                        ? chapter.data
                        : chapter.dataSaver;

                if (!images || images.length === 0) {
                    throw new Error("No pages found");
                }

                const imageUrls = images.map(
                    (img) => `${baseUrl}/data/${chapter.hash}/${img}`
                );

                setPages(imageUrls);

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

    /* ================= UI ================= */

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

            {/* TOP BAR */}
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

            {/* add spacing so content doesn't go under header */}
            <div className="pt-20 flex flex-col items-center gap-4">
                {pages.map((src, index) => (
                    <img
                        key={index}
                        src={src}
                        alt={`page-${index}`}
                        className="max-w-3xl w-full object-contain rounded"
                        loading="lazy"
                    />
                ))}
            </div>
        </div>
    );
};

export default MangaReader;