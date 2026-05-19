import React from "react";
import PostCard from "./PostCard";
import { FaPaperclip } from "react-icons/fa";
import { FaMagnifyingGlass, FaChevronDown } from "react-icons/fa6";

const gistData = [
  {
    id: 1,
    author: "Kelly Wearstler",
    avatar: "https://i.pravatar.cc/40?img=10",
    time: "about 1 hour ago",
    type: "Confession",
    title: "New Apex Legend cheat brings smurfing in low ranked lobbies to a whole new level Visit New",
    replies: 18,
    views: "12K",
    stars: 8,
    images: [
      "https://images.unsplash.com/photo-1605902711622-cfb43c44367f",
      "https://images.unsplash.com/photo-1541963463532-d68292c34b19",
      "https://images.unsplash.com/photo-1515169067865-5387ec356754"
    ],
  },
  {
    id: 2,
    author: "Danish Javed",
    avatar: "https://i.pravatar.cc/40?img=11",
    time: "about 1 hour ago",
    type: "Confession",
    title: "New Apex Legend cheat brings smurfing in low ranked lobbies to a whole new level Visit https://www.youtube.com/watch?v=D_H1PoXURLS&list=RGMnMsy2soFlB&index=9",
    replies: 124,
    views: "42K",
    stars: 5,
    images: ["https://images.unsplash.com/photo-1515169067865-5387ec356754"],
  },
  {
    id: 3,
    author: "Mux Michel",
    avatar: "https://i.pravatar.cc/40?img=12",
    time: "about 1 hour ago",
    type: "Confession",
    title: "New Apex Legend cheat brings smurfing in low ranked lobbies to a whole new level Visit New",
    replies: 67,
    views: "9K",
    stars: 12,
    images: [
      "https://images.unsplash.com/photo-1605902711622-cfb43c44367f",
      "https://images.unsplash.com/photo-1541963463532-d68292c34b19",
      "https://images.unsplash.com/photo-1515169067865-5387ec356754"
    ],
  },
];

export default function FeedColumn() {
  return (
    <div className="w-[1200px] flex-shrink-0 border-l border-r border-[rgba(255,255,255,0.25)] backdrop-blur-[36px] flex flex-col items-center">
      
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
      <div className="w-[1172px] flex items-center justify-end h-[80px] gap-6 mt-4">
        {/* Search */}
        <div className="relative w-[386px] h-[48px] border-b border-white flex items-center">
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
        {gistData.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

    </div>
  );
}
