import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGists } from "../../store/slices/gistSlice";
import PostCard from "./PostCard";
import { FaPaperclip } from "react-icons/fa";
import { FaMagnifyingGlass, FaChevronDown } from "react-icons/fa6";

export default function FeedColumn({ activeFilter }) {
  const dispatch = useDispatch();
  const { gists, isLoading, error } = useSelector((state) => state.gist);

  // 4chan States
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [selectedThread, setSelectedThread] = useState(null);

  const [boards, setBoards] = useState([]);
  const [boardsLoading, setBoardsLoading] = useState(false);
  const [boardsError, setBoardsError] = useState("");

  const [catalog, setCatalog] = useState([]);
  const [catalogLoading, setCatalogLoading] = useState(false);
  const [catalogError, setCatalogError] = useState("");

  const [threadPosts, setThreadPosts] = useState([]);
  const [threadLoading, setThreadLoading] = useState(false);
  const [threadError, setThreadError] = useState("");

  useEffect(() => {
    if (activeFilter === "4chan") return;
    dispatch(fetchGists(activeFilter));
  }, [dispatch, activeFilter]);

  // Reset selected board/thread when activeFilter changes
  useEffect(() => {
    setSelectedBoard(null);
    setSelectedThread(null);
  }, [activeFilter]);

  // Fetch 4chan boards
  useEffect(() => {
    if (activeFilter !== "4chan" || boards.length > 0) return;

    const fetchBoards = async () => {
      setBoardsLoading(true);
      setBoardsError("");
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/gist/threads/4chan/boards`);
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.message || `HTTP error! status: ${res.status}`);
        }
        const json = await res.json();
        setBoards(json.data || []);
      } catch (err) {
        console.error("Failed to fetch 4chan boards:", err);
        setBoardsError(err.message);
      } finally {
        setBoardsLoading(false);
      }
    };
    fetchBoards();
  }, [activeFilter, boards.length]);

  // Fetch catalog
  useEffect(() => {
    if (!selectedBoard) {
      setCatalog([]);
      return;
    }

    const fetchCatalog = async () => {
      setCatalogLoading(true);
      setCatalogError("");
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/gist/threads/4chan/${selectedBoard}/catalog`);
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.message || `HTTP error! status: ${res.status}`);
        }
        const json = await res.json();
        const pages = json.data || [];
        const allThreads = pages.flatMap(p => p.threads || []);
        setCatalog(allThreads);
      } catch (err) {
        console.error("Failed to fetch 4chan board catalog:", err);
        setCatalogError(err.message);
      } finally {
        setCatalogLoading(false);
      }
    };
    fetchCatalog();
  }, [selectedBoard]);

  // Fetch thread posts
  useEffect(() => {
    if (!selectedBoard || !selectedThread) {
      setThreadPosts([]);
      return;
    }

    const fetchThread = async () => {
      setThreadLoading(true);
      setThreadError("");
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/gist/threads/4chan/${selectedBoard}/${selectedThread}`);
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.message || `HTTP error! status: ${res.status}`);
        }
        const json = await res.json();
        setThreadPosts(json.data?.posts || []);
      } catch (err) {
        console.error("Failed to fetch 4chan thread:", err);
        setThreadError(err.message);
      } finally {
        setThreadLoading(false);
      }
    };
    fetchThread();
  }, [selectedBoard, selectedThread]);

  if (activeFilter === "4chan") {
    return (
      <div className="w-full max-w-[1200px] flex-1 min-w-0 lg:border-l lg:border-r border-[rgba(255,255,255,0.25)] backdrop-blur-[36px] flex flex-col items-center p-6 text-white">
        {/* HEADER / NAVIGATION */}
        <div className="w-full flex items-center justify-between border-b border-white/10 pb-4 mb-6">
          <div className="flex items-center gap-3">
            {(selectedBoard || selectedThread) && (
              <button
                onClick={() => {
                  if (selectedThread) {
                    setSelectedThread(null);
                  } else {
                    setSelectedBoard(null);
                  }
                }}
                className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded text-xs font-semibold uppercase tracking-wider transition"
              >
                ← Back
              </button>
            )}
            <h2 className="text-xl font-bold uppercase tracking-widest text-[#01F1E3]">
              4chan Browser
              {selectedBoard && ` / /${selectedBoard}/`}
              {selectedThread && ` / Thread #${selectedThread}`}
            </h2>
          </div>
          <span className="text-xs text-gray-400">Powered by 4chan Public API</span>
        </div>

        {/* 1. VIEW THREAD DETAILS */}
        {selectedThread ? (
          <div className="w-full space-y-4">
            {threadLoading && <div className="text-center py-12 text-white/60">Loading thread posts...</div>}
            {threadError && <div className="text-center py-12 text-red-500">{threadError}</div>}
            
            {!threadLoading && !threadError && threadPosts.map((post) => (
              <div 
                key={post.no} 
                className="w-full p-4 bg-[#111111]/80 border border-white/5 rounded-lg flex flex-col md:flex-row gap-4"
              >
                {post.tim && post.ext && (
                  <div className="w-full md:w-32 h-32 flex-shrink-0 bg-black/40 rounded overflow-hidden flex items-center justify-center">
                    <img 
                      src={`https://i.4cdn.org/${selectedBoard}/${post.tim}${post.ext}`} 
                      alt="post-img" 
                      className="max-w-full max-h-full object-contain cursor-pointer hover:scale-105 transition"
                      onClick={() => window.open(`https://i.4cdn.org/${selectedBoard}/${post.tim}${post.ext}`, "_blank")}
                    />
                  </div>
                )}
                <div className="flex-1 flex flex-col gap-2">
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span className="font-bold text-yellow-500">{post.name || "Anonymous"}</span>
                    <span>No. {post.no} • {post.now}</span>
                  </div>
                  {post.sub && <h4 className="font-bold text-sm text-[#01F1E3]">{post.sub}</h4>}
                  <p 
                    className="text-sm text-gray-300 font-inter font-light whitespace-pre-line leading-relaxed post-comment" 
                    dangerouslySetInnerHTML={{ __html: post.com }}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : selectedBoard ? (
          // 2. VIEW BOARD CATALOG (THREADS LIST)
          <div className="w-full space-y-4">
            {catalogLoading && <div className="text-center py-12 text-white/60">Loading board catalog...</div>}
            {catalogError && <div className="text-center py-12 text-red-500">{catalogError}</div>}
            
            {!catalogLoading && !catalogError && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                {catalog.map((thread) => (
                  <div 
                    key={thread.no}
                    onClick={() => setSelectedThread(thread.no)}
                    className="p-4 bg-[#111111]/80 border border-white/5 rounded-lg hover:border-[#DF28E2]/60 cursor-pointer flex gap-4 transition-all duration-300 hover:shadow-[0_0_12px_rgba(223,40,226,0.15)] animate-fade-in"
                  >
                    {thread.tim && thread.ext && (
                      <img 
                        src={`https://i.4cdn.org/${selectedBoard}/${thread.tim}${thread.ext}`} 
                        alt="thread-thumb" 
                        className="w-20 h-20 object-cover rounded shrink-0 bg-black/40"
                      />
                    )}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <h4 className="font-bold text-sm text-white line-clamp-1">
                          {thread.sub || `Thread #${thread.no}`}
                        </h4>
                        <p 
                          className="text-xs text-gray-400 mt-1 line-clamp-2 leading-relaxed" 
                          dangerouslySetInnerHTML={{ __html: thread.com }}
                        />
                      </div>
                      <div className="flex items-center gap-4 text-[10px] text-gray-500 mt-2">
                        <span>💬 {thread.replies} Replies</span>
                        <span>🖼️ {thread.images} Images</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          // 3. VIEW BOARDS GRID
          <div className="w-full">
            {boardsLoading && <div className="text-center py-12 text-white/60">Loading active boards...</div>}
            {boardsError && <div className="text-center py-12 text-red-500">{boardsError}</div>}
            
            {!boardsLoading && !boardsError && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full">
                {boards.map((board) => (
                  <div 
                    key={board.board}
                    onClick={() => setSelectedBoard(board.board)}
                    className="p-5 bg-[#111111]/80 border border-white/10 rounded-lg text-center cursor-pointer hover:border-[#01F1E3]/60 transition-all duration-300 hover:shadow-[0_0_12px_rgba(1,241,227,0.15)] flex flex-col justify-center h-28"
                  >
                    <span className="text-2xl font-black text-[#01F1E3]">/{board.board}/</span>
                    <span className="text-xs text-gray-300 font-semibold truncate mt-1">{board.title}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1200px] flex-1 min-w-0 lg:border-l lg:border-r border-[rgba(255,255,255,0.25)] backdrop-blur-[36px] flex flex-col items-center">
      
      {/* Create Post Bar */}
      <div className="w-full flex items-center justify-between h-[63px] px-[12px] py-[16px] bg-[rgba(0,0,0,0.25)] border-b border-[rgba(255,255,255,0.1)]">
        <div className="flex items-center gap-4 w-full">
          <img src="https://i.pravatar.cc/40?img=9" alt="User" className="w-[36px] h-[36px] rounded-full" />
          <input 
            type="text" 
            placeholder="Share something cool today" 
            className="flex-1 bg-transparent border-none outline-none font-inter text-[16px] text-white placeholder-[#999999]"
          />
        </div>
        <div className="flex items-center gap-4">
          <button className="text-gray-400 hover:text-white transition">
            <FaPaperclip size={18} />
          </button>
          <button className="bg-[#01F1E3] hover:opacity-90 text-black font-satoshi font-medium text-[14px] px-6 py-2 rounded-[10px] transition-opacity whitespace-nowrap">
            + Create Gist
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="w-full px-4 lg:px-6 flex flex-col sm:flex-row items-center sm:justify-end h-auto min-h-[80px] py-4 gap-4 sm:gap-6 mt-4">
        {/* Search */}
        <div className="relative w-full sm:w-[386px] h-[48px] border-b border-white flex items-center">
          <input 
            type="text" 
            placeholder="Search by tag or Title"
            className="w-full h-full bg-transparent border-none outline-none font-satoshi text-white placeholder-gray-400 pl-10 pr-4"
          />
          <FaMagnifyingGlass className="absolute left-2 text-white" />
        </div>
        
        {/* Dropdown */}
        <div className="flex items-center gap-2 text-white font-satoshi cursor-pointer hover:text-gray-300">
          Most Recent
          <FaChevronDown size={12} />
        </div>
      </div>

      {/* Feed Posts */}
      <div className="w-full flex flex-col items-center pb-20">
        {isLoading && <div className="text-center py-10 text-white/60">Loading Gists...</div>}
        {error && <div className="text-center py-10 text-red-500">{error}</div>}
        
        {!isLoading && !error && gists && gists.map((gist, i) => {
          // Adapt the database gist properties to match the PostCard expectations
          const post = {
            id: gist.id || gist._id || String(i),
            author: gist.author || "Anonymous",
            avatar: gist.avatar || `https://i.pravatar.cc/40?img=${hashStringToInt(gist.id || gist._id || String(i)) % 70}`,
            time: gist.time || "some time ago",
            type: gist.type || "Gist",
            title: gist.title || "No Title",
            images: gist.image ? [gist.image] : [],
            stars: gist.stars || 0,
            replies: gist.replies || 0,
            views: gist.views || 0,
          };
          return <PostCard key={post.id} post={post} />;
        })}
      </div>

    </div>
  );
}

// Simple helper to deterministically hash an ID to an avatar index
function hashStringToInt(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}
