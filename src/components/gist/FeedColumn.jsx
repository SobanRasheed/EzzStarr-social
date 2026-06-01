import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGists } from "../../store/slices/gistSlice";
import PostCard from "./PostCard";
import { FaPaperclip } from "react-icons/fa";
import { FaMagnifyingGlass, FaChevronDown } from "react-icons/fa6";

export default function FeedColumn({ activeFilter }) {
  const dispatch = useDispatch();
  const { gists, isLoading, error } = useSelector((state) => state.gist);

  useEffect(() => {
    dispatch(fetchGists(activeFilter));
  }, [dispatch, activeFilter]);

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
