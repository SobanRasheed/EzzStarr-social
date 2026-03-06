import { Share2, Eye, MessageCircle, Star,  } from "lucide-react";
import { FaFire } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import { CiClock2 } from "react-icons/ci";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { FaMagnifyingGlass } from "react-icons/fa6";
const gistData = [
  {
    id: 1,
    author: "Kelly Wearstler",
    time: "about 1 hour ago",
    type: "Confession",
    title: "Will it be a sin to take Grandma Mildred's dress ornaments apart for jewelry?",
    replies: 18,
    views: "12,804",
    image: null,
    subscribed: false,
  },
  {
    id: 2,
    author: "Danish Javed",
    time: "2 hours ago",
    type: "Cosplay",
    title: "New Apex Legend cheat brings smurfing in low ranked lobbies to a whole new level",
    replies: 124,
    views: "42,312",
    image: "https://images.unsplash.com/photo-1605902711622-cfb43c44367f",
    subscribed: false,
  },
  {
    id: 3,
    author: "Mux Michel",
    time: "Just now",
    type: "Story",
    title: `"I'm your wife, not your mom." My wife says this a lot and I don’t know how to respond.`,
    replies: 67,
    views: "9,451",
    image: null,
    subscribed: true,
  },
  {
    id: 4,
    author: "Ava Thompson",
    time: "30 minutes ago",
    type: "Event",
    title: "Ezztar Social Event is coming soon — here’s what you should expect",
    replies: 52,
    views: "18,903",
    image: "https://images.unsplash.com/photo-1515169067865-5387ec356754",
    subscribed: false,
  },
  {
    id: 5,
    author: "Rohan Mehta",
    time: "3 hours ago",
    type: "Manga",
    title: "Blooming Love Chapter 1 discussion — did anyone catch that final panel detail?",
    replies: 89,
    views: "27,110",
    image: "https://wallpapers.com/images/high/cute-anime-profile-pictures-myg1ifdra7qohdks.webp",
    subscribed: true,
  },
  {
    id: 6,
    author: "Sophia Lee",
    time: "Yesterday",
    type: "Story",
    title: "I quit my job with no backup plan and it somehow worked out",
    replies: 203,
    views: "61,782",
    image: null,
    subscribed: false,
  },
  {
    id: 7,
    author: "Noah Williams",
    time: "5 hours ago",
    type: "Confession",
    title: "I pretend to understand crypto when my friends talk about it",
    replies: 41,
    views: "14,296",
    image: null,
    subscribed: false,
  },
  {
    id: 8,
    author: "Emily Carter",
    time: "6 hours ago",
    type: "Cosplay",
    title: "Rate my first League of Legends cosplay (be honest)",
    replies: 156,
    views: "38,440",
    image: "https://images.unsplash.com/photo-1611605698335-6f52c9b5d8c6",
    subscribed: true,
  },
  {
    id: 9,
    author: "Arjun Patel",
    time: "Today",
    type: "Event",
    title: "Community meetup recap — photos, highlights, and what we learned",
    replies: 33,
    views: "7,902",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    subscribed: false,
  },
  {
    id: 10,
    author: "Luna Rivers",
    time: "2 days ago",
    type: "Manga",
    title: "Top 5 underrated romance manga you should read this year",
    replies: 98,
    views: "45,670",
    image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19",
    subscribed: true,
  },
];

export default function GistHome() {
  return (
    <div className="bg-black text-white min-h-screen px-4 py-10 font-sans">
      
      {/* Header */}
      <h1 className="text-4xl font-bold text-center mb-10">Gist</h1>

      {/* Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr_300px] gap-2">

        {/* LEFT SIDEBAR */}
        <div className="space-y-6 text-gray-400 text-sm">
          <div className="space-y-3">
            <div className="hover:text-white cursor-pointer border-b border-gray-600 flex items-center gap-4 pb-2"><IoMdHome />Home</div>
            <div className="hover:text-white cursor-pointer border-b border-gray-600 flex items-center gap-4 pb-2"><FaFire />Popular</div>
            <div className="hover:text-white cursor-pointer border-b border-gray-600 flex items-center gap-4 pb-2"><CiClock2 />Recents</div>
            <div className="hover:text-white cursor-pointer border-b border-gray-600 flex items-center gap-4 pb-2"><BsFillPersonPlusFill />Join</div>
            <div className="hover:text-white cursor-pointer border-b border-gray-600 flex items-center gap-4 pb-2"><FaMagnifyingGlass />Discover</div>
          </div>
        </div>


        {/* MAIN CONTENT */}
        <div className="space-y-6">

          {gistData.map((thread, i) => (
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

                    <button className="flex items-center gap-1 px-3 py-1 bg-[#1a1a1a] rounded-full hover:bg-[#222]">
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
        <div className="space-y-6">
          {/* Gifts */}
          <div className="bg-[#111] border border-[#222] rounded-xl p-5">
            <h4 className="mb-4 font-semibold">Gifts</h4>
            {["Mux Michel", "Danish Javed", "Mux Michel", "Danish Javed"].map(
              (name, i) => (
                <div key={i} className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 bg-gray-700 rounded-full"></div>

                  <div className="flex-1 text-sm">
                    <div>{name}</div>
                    <div className="text-gray-500 text-xs">11 posts</div>
                  </div>

                  <button className="text-xs px-3 py-1 rounded-full bg-purple-600 hover:bg-purple-500">
                    Subscribe
                  </button>

                </div>
              )
            )}
          </div>


          {/* Upgrade */}
          <div className="bg-[#111] border border-[#222] rounded-xl p-5 text-center">

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

