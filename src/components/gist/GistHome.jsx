import React from "react";
import LeftSidebar from "./LeftSidebar";
import FeedColumn from "./FeedColumn";
import RightSidebar from "./RightSidebar";

export default function GistHome() {
  return (
    <div className="bg-[#010101] text-white min-h-screen font-sans overflow-x-hidden flex flex-col items-center">
      {/* We assume the Navbar/GlobalHeader is handled by the Layout.jsx, 
          so we add top padding to account for the fixed header (e.g., pt-[124px] or similar). */}
      
      <div className="w-full max-w-[1920px] mx-auto flex justify-center gap-4 pt-[80px] px-4 md:px-8">
        {/* The 1920px container is split into 270px + 1200px + 450px = 1920px on large screens */}
        <LeftSidebar />
        <FeedColumn />
        <RightSidebar />
      </div>
    </div>
  );
}

