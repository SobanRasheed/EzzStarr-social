import React, { useState } from "react";
import LeftSidebar from "./LeftSidebar";
import FeedColumn from "./FeedColumn";
import RightSidebar from "./RightSidebar";

export default function GistHome() {
  const [activeFilter, setActiveFilter] = useState('');

  return (
    <div className="bg-[#010101] text-white min-h-screen font-sans overflow-x-hidden flex flex-col items-center">
      <div className="w-full max-w-[1920px] mx-auto flex justify-center pt-[80px]">
        {/* The 1920px container is split into LeftSidebar, FeedColumn, and RightSidebar */}
        <LeftSidebar activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
        <FeedColumn activeFilter={activeFilter} />
        {/* Discover uses the full 1590px feed width, so the rail is dropped there
            (Figma node 8475:88868). Popular gets the trending-creators list;
            the other tabs show only the Upgrade card. */}
        {activeFilter !== "discover" && (
          <RightSidebar variant={activeFilter === "popular" ? "popular" : "default"} />
        )}
      </div>
    </div>
  );
}
