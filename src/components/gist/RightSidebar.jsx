import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCreators, subscribeCreator } from "../../store/slices/gistSlice";
import { mockTrendingCreators } from "../../config/mockGistData";
import GistCard from "./GistCard";

/**
 * Right rail. Its contents change per tab (Figma nodes 8475:88781 for the
 * Popular trending list, 8475:89191 for the detail-view gist card):
 *
 *   variant="popular"  -> trending creators list + Upgrade
 *   variant="detail"   -> gist card + Upgrade
 *   anything else      -> Upgrade only
 *
 * Discover has no rail at all — GistHome omits this component there.
 */
export default function RightSidebar({ variant = "default", group = null }) {
  const dispatch = useDispatch();
  const { creators, creatorsLoaded } = useSelector((state) => state.gist);

  useEffect(() => {
    if (!creatorsLoaded) {
      dispatch(fetchCreators());
    }
  }, [dispatch, creatorsLoaded]);

  // Dev fallback so the rail is visible without a backend.
  const displayCreators =
    creators && creators.length > 0 ? creators : mockTrendingCreators;

  return (
    <div className="hidden lg:flex w-[300px] xl:w-[450px] flex-shrink-0 flex-col gap-[16px] sticky top-[100px] h-[calc(100vh-100px)] pt-10 overflow-y-auto">

      {/* Detail view: the gist group this thread belongs to */}
      {variant === "detail" && group && <GistCard group={group} />}

      {/* Popular: trending creators */}
      {variant === "popular" && (
      <div className="bg-[#DF28E2]/10 backdrop-blur-[27px] rounded-[4px] p-6">
        <h2 className="text-[28px] font-sf text-white mb-4">Gifts</h2>

        <div className="flex flex-col">
          {displayCreators.map((creator, i) => (
            <div
              key={creator.id || String(i)}
              className="flex items-center justify-between h-[40px] py-[10px] border-b border-[rgba(255,255,255,0.12)] last:border-b-0"
            >
              <div className="flex items-center gap-3">
                <img
                  src={creator.avatar || `https://i.pravatar.cc/40?img=${(creator.id ? hashStringToInt(creator.id) : i) % 70}`}
                  alt={creator.name}
                  className="w-[36px] h-[36px] rounded-full object-cover"
                />
                <div className="flex flex-col justify-center">
                  <span className="font-satoshi font-medium text-[14px] text-white leading-tight">{creator.name}</span>
                  <span className="font-satoshi text-[12px] text-[#616161] leading-tight">{creator.threads || 0} threads</span>
                </div>
              </div>

              <button
                onClick={() => dispatch(subscribeCreator(creator.id))}
                className="text-xs px-3 py-1 bg-purple-600 hover:bg-purple-500 rounded text-white transition-colors cursor-pointer"
              >
                Subscribe
              </button>
            </div>
          ))}
        </div>
      </div>
      )}

      {/* Upgrade Promo */}
      <div className="bg-[#DF28E2]/10 backdrop-blur-[27px] rounded-[4px] p-6 flex flex-col items-center text-center">
        <h3 className="font-sf text-[20px] text-white mb-6">Upgrade your profile</h3>
        
        <div className="relative w-[138px] h-[138px] flex items-center justify-center mb-6">
          <div className="absolute inset-0 bg-gradient-to-tr from-gray-500 via-gray-300 to-gray-600 rounded-full opacity-50"></div>
          <img src="https://i.pravatar.cc/150?img=9" alt="User" className="relative w-[120px] h-[120px] rounded-full object-cover z-10 border-4 border-transparent" style={{ background: 'linear-gradient(white, white) padding-box, linear-gradient(to right, #ccc, #fff) border-box' }} />
        </div>

        <p className="font-satoshi text-[14px] leading-relaxed mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[rgba(255,255,255,0.72)] to-white">
          Saachi, explore relevant profile theme with Star Plan
        </p>

        <button className="h-[46px] w-full max-w-[200px] flex items-center justify-center gap-2 bg-gradient-to-t from-black to-black border border-[#EF00F4] rounded-[4px] hover:opacity-80 transition-opacity">
           <svg width="16" height="16" viewBox="0 0 24 24" fill="#F5A623">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
          <span className="font-satoshi font-medium text-[16px] text-white">Upgrade</span>
        </button>
        <div className="text-[10px] text-gray-500 mt-2">Ad ···</div>
      </div>

    </div>
  );
}

function hashStringToInt(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}
