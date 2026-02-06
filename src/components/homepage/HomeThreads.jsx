const threadsData = [
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

export default function Threads() {
    return (
        <div className="bg-black text-white min-h-screen px-6 md:px-[70px] py-10 font-sans">
            {/* Header */}
            <h1 className="text-5xl font-bold text-center mb-6">Threads</h1>

            {/* Tabs */}
            <div className="flex justify-center gap-8 mb-10 text-sm">
                <button className="text-purple-400 border-b-2 border-purple-500 pb-2">
                    Latest Threads
                </button>
                <button className="text-gray-500 hover:text-white">
                    All Threads
                </button>
                <button className="text-gray-500 hover:text-white">
                    Manga Threads
                </button>
                <button className="text-gray-500 hover:text-white">
                    Stories Threads
                </button>
            </div>

            {/* Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10">
                {/* Threads */}
                <div className="space-y-6">
                    {threadsData.map((thread, i) => (
                        <div
                            key={i}
                            className="relative bg-gradient-to-b from-[#141414] to-[#0b0b0b] rounded-2xl p-6 shadow-[0_0_40px_rgba(128,0,255,0.08)]"
                        >
                            {/* Header */}
                            <div className="flex items-center text-xs text-gray-400">
                                <span>{thread.author}</span>
                                <span className="mx-2">•</span>
                                <span>{thread.time}</span>

                                <div className="ml-auto flex items-center gap-3">
                                    <button className="bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded-full text-white text-xs">
                                        Subscribe
                                    </button>
                                    <span className="text-lg cursor-pointer">⋯</span>
                                </div>
                            </div>

                            {/* Body */}
                            <div className="flex gap-4 mt-4">
                                <div className="flex-1">
                                    {thread.type && (
                                        <span className="inline-block border border-gray-500 px-3 py-2 rounded-xl text-xs text-teal-600 mb-2">
                                            • {thread.type}
                                        </span>
                                    )}
                                    <h3 className="text-lg font-semibold leading-snug">
                                        {thread.title}
                                    </h3>

                                    <div className="flex gap-3 mt-4 text-xs text-gray-400">
                                        <span className="bg-[#1c1c1c] px-3 py-1 rounded-full">⭐ 5</span>
                                        <span className="bg-[#1c1c1c] px-3 py-1 rounded-full">
                                            💬 Reply ({thread.replies})
                                        </span>
                                        <span className="bg-[#1c1c1c] px-3 py-1 rounded-full">
                                            👁 {thread.views}
                                        </span>
                                        <span className="bg-[#1c1c1c] px-3 py-1 rounded-full">
                                            💜 Give Tip
                                        </span>
                                    </div>
                                </div>

                                {thread.image && (
                                    <img
                                        src={thread.image}
                                        alt=""
                                        className="w-[110px] h-[110px] rounded-xl object-cover"
                                    />
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right Sidebar */}
                <div className="space-y-6">
                    {/* Poster */}
                    <div className="rounded-2xl overflow-hidden shadow-lg">
                        <img
                            src="/poster.svg"
                            alt="Spica"
                            className="w-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

