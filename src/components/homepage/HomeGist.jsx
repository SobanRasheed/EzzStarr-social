import { Heart, Share2, Eye, MessageCircle, Star } from "lucide-react";

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

export default function HomeGist() {
    return (
        <div className="bg-black text-white min-h-screen px-6 md:px-[70px] py-10 font-sans">
            {/* Header */}
            <h1 className="text-5xl font-bold text-center mb-6">Gist</h1>

            {/* Tabs */}
            <div className="flex justify-center gap-8 mb-10 text-sm">
                <button className="text-purple-400 border-b-2 border-purple-500 pb-2">
                    Latest Gist
                </button>
                <button className="text-gray-500 hover:text-white">
                    All Gist
                </button>
                <button className="text-gray-500 hover:text-white">
                    Manga Gist
                </button>
                <button className="text-gray-500 hover:text-white">
                    Stories Gist
                </button>
            </div>

            {/* Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10">
                {/* Threads */}
                <div className="space-y-6">
                    {gistData.map((thread, i) => (
                        <div
                            key={i}
                            className="relative bg-gradient-to-b from-[#121212] to-[#0b0b0b] 
             border border-[#2a2a2a] rounded-2xl px-6 py-5 
             shadow-[0_0_40px_rgba(128,0,255,0.05)]"
                        >
                            {/* Header */}
                            <div className="flex items-center">
                                {/* PFP */}
                                <img
                                    src={`https://i.pravatar.cc/40?img=${i + 10}`}
                                    alt="pfp"
                                    className="w-6 h-6 rounded-full object-cover"
                                />

                                {/* Name + Type + Time */}
                                <div className="ml-1 text-xs text-gray-400">
                                    <div className="flex items-center gap-2">
                                        <span className="text-white text-sm">{thread.author}</span>

                                        <span className="text-gray-500">•</span>

                                        <span className="text-gray-350">{thread.type}</span>

                                        <span className="text-gray-500">•</span>

                                        <span className="text-gray-600">{thread.time}</span>
                                    </div>
                                </div>

                                {/* Join Button */}
                                <div className="ml-auto flex items-center gap-3">
                                    <button
                                        className="bg-gradient-to-r from-purple-600 to-fuchsia-600
                   hover:opacity-90 text-white text-xs px-4 py-1
                   rounded-full"
                                    >
                                        Join
                                    </button>
                                    <span className="text-gray-400 text-lg cursor-pointer">⋯</span>
                                </div>
                            </div>

                            {/* Body */}
                            <div className="flex gap-6 mt-4 items-start">
                                <div className="flex-1">
                                    {/* Title */}
                                    <h3 className="text-lg font-medium leading-snug text-white">
                                        {thread.title}
                                    </h3>

                                    {/* Stats */}
                                    <div className="flex gap-3 mt-4 text-xs">
                                        <span className="flex items-center bg-white/10 hover:bg-white/20 transition px-1.75 py-1 rounded-full text-xs">
                                            <Star className="inline mr-1" size={14} />{thread.stars}
                                        </span>
                                        <span className="flex items-center bg-white/10 hover:bg-white/20 transition px-1.75 py-1 rounded-full text-xs">
                                            <MessageCircle className="inline mr-1" size={14} />{thread.replies}
                                        </span>
                                        <span className="flex items-center bg-white/10 hover:bg-white/20 transition px-1.75 py-1 rounded-full text-xs">
                                            <Eye className="inline mr-1" size={14} />{thread.views}
                                        </span>
                                        <span className="flex items-center bg-white/10 hover:bg-white/20 transition px-1.75 py-1 rounded-full text-xs">
                                            <Share2 className="inline mr-1" size={14} />
                                        </span>
                                    </div>
                                </div>

                                {/* Image (if exists) */}
                                {thread.image && (
                                    <div className="w-[130px] h-[95px] flex-shrink-0 overflow-hidden rounded-xl">
                                        <img
                                            src={thread.image}
                                            alt=""
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
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

