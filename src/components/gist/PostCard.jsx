import React from "react";
import { Share2, Eye, MessageCircle, Star } from "lucide-react";

// The Carrossel component logic for media rendering
const MediaGrid = ({ images }) => {
  if (!images || images.length === 0) return null;

  if (images.length === 1) {
    return (
      <div className="w-full h-[377px] mt-4 rounded-[4px] overflow-hidden">
        <img src={images[0]} alt="Post Media" className="w-full h-full object-cover" />
      </div>
    );
  }

  if (images.length === 2) {
    return (
      <div className="flex gap-2 w-full h-[377px] mt-4 rounded-[4px] overflow-hidden">
        <img src={images[0]} alt="Post Media 1" className="w-1/2 h-full object-cover" />
        <img src={images[1]} alt="Post Media 2" className="w-1/2 h-full object-cover" />
      </div>
    );
  }

  if (images.length >= 3) {
    // Logic from spec: left vertical (approx 248px), middle (397px), right (478px) -> we'll use flex proportions
    // Total approx width = 1172 - 48 (padding) = 1124px.
    // Proportions: 22%, 35%, 43%
    return (
      <div className="flex gap-2 w-full h-[377px] mt-4 rounded-[4px] overflow-hidden">
        <div className="flex-[2.2] h-full">
          <img src={images[0]} alt="Post Media 1" className="w-full h-full object-cover" />
        </div>
        <div className="flex-[3.5] h-full">
          <img src={images[1]} alt="Post Media 2" className="w-full h-full object-cover" />
        </div>
        <div className="flex-[4.3] h-full">
          <img src={images[2]} alt="Post Media 3" className="w-full h-full object-cover" />
        </div>
      </div>
    );
  }
};

export default function PostCard({ post }) {
  return (
    <div className="w-full flex flex-col p-4 sm:p-6 gap-4 bg-[rgba(28,28,30,0.5)] rounded-[8px] border border-[rgba(223,40,226,0.3)] backdrop-blur-[36px] mb-6">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={post.avatar} alt={post.author} className="w-[36px] h-[36px] rounded-full object-cover" />
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-sf text-[14px] text-white underline cursor-pointer">{post.author}</span>
              <span className="text-[14px] text-gray-500">•</span>
              {/* Tag with alien icon placeholder */}
              <div className="flex items-center gap-1 text-[#EF00F4] text-[12px] font-medium bg-[rgba(239,0,244,0.1)] px-2 py-0.5 rounded">
                <span>👾</span>
                {post.type}
              </div>
              <span className="text-[14px] text-gray-500">•</span>
              <span className="font-inter text-[12px] text-white opacity-50">{post.time}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="bg-[#8E0CA3] hover:bg-purple-700 text-white text-[12px] font-medium px-4 py-1.5 rounded-full transition-colors">
            Join
          </button>
          <button className="text-gray-400 hover:text-white">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="5" cy="12" r="2" />
              <circle cx="12" cy="12" r="2" />
              <circle cx="19" cy="12" r="2" />
            </svg>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col">
        <h2 className="font-satoshi text-[24px] text-white leading-tight">
          {post.title}
        </h2>
        <MediaGrid images={post.images} />
      </div>

      {/* Footer Actions */}
      <div className="flex flex-wrap items-center gap-2 mt-2">
        {/* Reply Thread Element */}
        <div className="flex items-center gap-2 bg-[rgba(255,255,255,0.1)] backdrop-blur-[27px] rounded-[27px] py-1 pl-2 pr-3 cursor-pointer hover:bg-[rgba(255,255,255,0.15)] transition">
          <div className="flex -space-x-2">
            <img src="https://i.pravatar.cc/24?img=11" alt="R1" className="w-5 h-5 rounded-full border border-black" />
            <img src="https://i.pravatar.cc/24?img=12" alt="R2" className="w-5 h-5 rounded-full border border-black" />
          </div>
          <span className="font-inter text-[12px] text-[#EF00F4] ml-1">2 More Replies</span>
        </div>

        {/* Buttons */}
        <button className="flex items-center gap-1.5 bg-[rgba(255,255,255,0.1)] backdrop-blur-[27px] rounded-[27px] px-3 py-1 hover:bg-[rgba(255,255,255,0.15)] transition text-gray-300">
          <Star size={16} />
          <span className="font-inter text-[12px]">{post.stars || 5}</span>
        </button>

        <button className="flex items-center gap-1.5 bg-[rgba(255,255,255,0.1)] backdrop-blur-[27px] rounded-[27px] px-3 py-1 hover:bg-[rgba(255,255,255,0.15)] transition text-gray-300">
          <MessageCircle size={16} />
          <span className="font-inter text-[12px]">{post.replies}</span>
        </button>

        <button className="flex items-center gap-1.5 bg-[rgba(255,255,255,0.1)] backdrop-blur-[27px] rounded-[27px] px-3 py-1 hover:bg-[rgba(255,255,255,0.15)] transition text-gray-300">
          <Eye size={16} />
          <span className="font-inter text-[12px]">{post.views}</span>
        </button>

        <button className="flex items-center justify-center w-[30px] h-[30px] bg-[rgba(255,255,255,0.1)] backdrop-blur-[27px] rounded-[6px] hover:bg-[rgba(255,255,255,0.15)] transition text-gray-300 ml-auto">
          <Share2 size={16} />
        </button>
      </div>

    </div>
  );
}
