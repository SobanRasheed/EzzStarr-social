import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGists, toggleJoinGist, starGist, fetchCreators, subscribeCreator } from "../../store/slices/gistSlice";
import { Share2, Eye, MessageCircle, Star,  } from "lucide-react";
import { FaFire } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import { CiClock2 } from "react-icons/ci";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { FaMagnifyingGlass } from "react-icons/fa6";
export default function GistHome() {
  const dispatch = useDispatch();
  const [activeFilter, setActiveFilter] = useState('');
  const { gists, creators, creatorsLoaded, isLoading, error } = useSelector((state) => state.gist);

  useEffect(() => {
    dispatch(fetchGists(activeFilter));
  }, [dispatch, activeFilter]);

  useEffect(() => {
    if (!creatorsLoaded) dispatch(fetchCreators());
  }, [dispatch, creatorsLoaded]);

  return (
    <div className="bg-black text-white min-h-screen px-4 py-10 pt-25 font-sans">
      
      {/* Header */}
      <h1 className="text-4xl font-bold text-center"></h1>

      {/* Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr_300px] gap-2">

        {/* LEFT SIDEBAR */}
        <div className="space-y-6 text-gray-400 text-sm pt-10">
          <div className="space-y-3">
            <div onClick={() => setActiveFilter('')} className="hover:text-white cursor-pointer border-b border-gray-600 flex items-center gap-4 pb-2"><IoMdHome />Home</div>
            <div onClick={() => setActiveFilter('popular')} className="hover:text-white cursor-pointer border-b border-gray-600 flex items-center gap-4 pb-2"><FaFire />Popular</div>
            <div onClick={() => setActiveFilter('recent')} className="hover:text-white cursor-pointer border-b border-gray-600 flex items-center gap-4 pb-2"><CiClock2 />Recents</div>
            <div onClick={() => setActiveFilter('joined')} className="hover:text-white cursor-pointer border-b border-gray-600 flex items-center gap-4 pb-2"><BsFillPersonPlusFill />Join</div>
            <div className="hover:text-white cursor-pointer border-b border-gray-600 flex items-center gap-4 pb-2"><FaMagnifyingGlass />Discover</div>
          </div>
        </div>


        {/* MAIN CONTENT */}
        <div className="space-y-6">

          {isLoading && <div className="text-center py-10">Loading...</div>}
          {error && <div className="text-center py-10 text-red-500">{error}</div>}
          {!isLoading && !error && gists && gists.map((thread, i) => (
            <div
              key={i}
              className="
              bg-[#0e0e0e]
              border border-[#222]
              rounded-xl
              p-5
              hover:border-[#333]
              transition
              "
            >

              {/* HEADER */}
              <div className="flex items-center gap-3">

                <img
                  src={`https://i.pravatar.cc/40?img=${i + 10}`}
                  className="w-8 h-8 rounded-full"
                />

                <div className="text-sm text-gray-400">
                  <span className="text-white font-medium">
                    {thread.author}
                  </span>
                  <span className="mx-2 text-gray-600">•</span>
                  <span>{thread.type}</span>
                  <span className="mx-2 text-gray-600">•</span>
                  <span>{thread.time}</span>
                </div>

                <div className="ml-auto flex items-center gap-3">

                  <button
                    onClick={() => dispatch(toggleJoinGist(thread.id))}
                    className="
                    text-xs
                    px-4 py-1
                    rounded-full
                    bg-purple-600
                    hover:bg-purple-500
                    "
                  >
                    Join
                  </button>

                  <span className="text-gray-500 cursor-pointer text-lg">
                    ⋯
                  </span>
                </div>
              </div>


              {/* BODY */}
              <div className="flex gap-6 mt-4">

                <div className="flex-1">

                  <h3 className="text-lg font-medium leading-snug">
                    {thread.title}
                  </h3>


                  {/* STATS */}
                  <div className="flex gap-3 mt-4 text-xs text-gray-400">

                    <button 
                      onClick={() => dispatch(starGist(thread.id))}
                      className="flex items-center gap-1 px-3 py-1 bg-[#1a1a1a] rounded-full hover:bg-[#222]"
                    >
                      <Star size={14} />
                      {thread.stars}
                    </button>

                    <button className="flex items-center gap-1 px-3 py-1 bg-[#1a1a1a] rounded-full hover:bg-[#222]">
                      <MessageCircle size={14} />
                      {thread.replies}
                    </button>
                    <button className="flex items-center gap-1 px-3 py-1 bg-[#1a1a1a] rounded-full hover:bg-[#222]">
                      <Eye size={14} />
                      {thread.views}
                    </button>
                    <button className="flex items-center gap-1 px-3 py-1 bg-[#1a1a1a] rounded-full hover:bg-[#222]">
                      <Share2 size={14} />
                    </button>
                  </div>
                </div>

                {/* IMAGE */}
                {thread.image && (
                  <div className="w-[140px] h-[100px] rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={thread.image}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>


        {/* RIGHT SIDEBAR */}
        <div className="space-y-2">
          {/* Gifts */}
          <div className="bg-[#DF28E2]/10 border border-[#222] bg- p-5">
            <h4 className="mb-4 font-semibold">Gifts</h4>
            {creators && creators.map(
              (creator) => (
                <div key={creator.id} className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 bg-gray-700 rounded-full"></div>

                  <div className="flex-1 text-sm">
                    <div>{creator.name}</div>
                    <div className="text-gray-500 text-xs">{creator.threads} threads</div>
                  </div>

                  <button 
                    onClick={() => dispatch(subscribeCreator(creator.id))}
                    className="text-xs px-3 py-1 bg-purple-600 hover:bg-purple-500"
                  >
                    Subscribe
                  </button>

                </div>
              )
            )}
          </div>


          {/* Upgrade */}
          <div className="bg-[#DF28E2]/10 border border-[#222] bg- p-5 text-center">

            <h4 className="mb-3 font-semibold">Upgrade Your Profile</h4>

            <p className="text-sm text-gray-400">
              Danish, explore relevant profile theme with
              <span className="text-white font-semibold"> Ezzstar Pro</span>
            </p>

            <button className="mt-4 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-sm">
              Upgrade
            </button>

            <div className="text-gray-500 text-xs mt-3">Ad ···</div>

          </div>

        </div>

      </div>
    </div>
  );
}

