import { Star, MessageCircle, Eye, Share2 } from "lucide-react";

const gistData = [
    {
        id: 1,
        author: "Mikasa Yager",
        avatar: "https://i.pravatar.cc/40?img=11",
        time: "about 1 hour ago",
        type: "Confession",
        title: "New Apex Legend cheat brings smurfing in low ranked lobbies to a whole new level Visit",
        stars: 5,
        replies: 12,
        views: "42K",
        image: "https://images.unsplash.com/photo-1605902711622-cfb43c44367f?w=200&h=120&fit=crop",
    },
    {
        id: 2,
        author: "Mikasa Yager",
        avatar: "https://i.pravatar.cc/40?img=12",
        time: "about 1 hour ago",
        type: "Confession",
        title: "New Apex Legend cheat brings smurfing in low ranked lobbies to a whole new level Visit",
        stars: 5,
        replies: 12,
        views: "42K",
        image: "https://images.unsplash.com/photo-1611605698335-6f52c9b5d8c6?w=200&h=120&fit=crop",
    },
    {
        id: 3,
        author: "Mikasa Yager",
        avatar: "https://i.pravatar.cc/40?img=13",
        time: "about 1 hour ago",
        type: "Confession",
        title: "New Apex Legend cheat brings smurfing in low ranked lobbies to a whole new level Visit",
        stars: 5,
        replies: 12,
        views: "42K",
        image: "https://images.unsplash.com/photo-1515169067865-5387ec356754?w=200&h=120&fit=crop",
    },
];

export default function HomeGist() {
    return (
        <div className="bg-black text-white px-6 md:px-[70px] py-8 font-sans">
            {/* Header */}
            <h1 className="text-[40px] font-normal text-center mb-5 tracking-tight">Gist</h1>

            {/* Tabs */}
            <div className="flex justify-center gap-6 mb-7 text-xs text-gray-400">
                <button className="pb-2 hover:text-white transition-colors">
                    Latest Gists
                </button>
                <button className="pb-2 text-white border-b-2 border-[#9333ea]">
                    All Gists
                </button>
                <button className="pb-2 hover:text-white transition-colors">
                    Manga Gists
                </button>
                <button className="pb-2 hover:text-white transition-colors">
                    Stories Gists
                </button>
            </div>

            {/* Layout: left cards + right poster */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-6">

                {/* Gist Cards */}
                <div className="space-y-3">
                    {gistData.map((thread) => (
                        <div
                            key={thread.id}
                            className="bg-[#111111] border border-[#222222] rounded-xl px-4 py-3"
                        >
                            {/* Card Header */}
                            <div className="flex items-center gap-2 mb-2">
                                <img
                                    src={thread.avatar}
                                    alt="pfp"
                                    className="w-6 h-6 rounded-full object-cover flex-shrink-0"
                                />
                                <div className="flex items-center gap-1.5 text-[11px] text-gray-400 flex-1 min-w-0">
                                    <span className="text-white font-medium text-[11px] truncate">{thread.author}</span>
                                    <span className="text-gray-600">•</span>
                                    <span>{thread.type}</span>
                                    <span className="text-gray-600">•</span>
                                    <span className="text-gray-500 truncate">{thread.time}</span>
                                </div>
                                {/* Join + dots */}
                                <div className="flex items-center gap-2 ml-auto flex-shrink-0">
                                    <button className="bg-[#9333ea] hover:bg-[#7e22ce] text-white text-[10px] px-3 py-0.5 rounded-full transition-colors">
                                        Join
                                    </button>
                                    <span className="text-gray-500 text-sm cursor-pointer leading-none">···</span>
                                </div>
                            </div>

                            {/* Card Body */}
                            <div className="flex gap-4 items-start">
                                <div className="flex-1">
                                    <p className="text-[13px] text-white font-normal leading-snug">
                                        {thread.title}
                                    </p>
                                    {/* Stats */}
                                    <div className="flex gap-2 mt-3 text-[11px] text-gray-300">
                                        <span className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded-full">
                                            <Star size={10} />
                                            {thread.stars}
                                        </span>
                                        <span className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded-full">
                                            <MessageCircle size={10} />
                                            {thread.replies}
                                        </span>
                                        <span className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded-full">
                                            <Eye size={10} />
                                            {thread.views}
                                        </span>
                                        <span className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded-full">
                                            <Share2 size={10} />
                                        </span>
                                    </div>
                                </div>

                                {/* Thumbnail */}
                                {thread.image && (
                                    <div className="w-[80px] h-[58px] flex-shrink-0 overflow-hidden rounded-lg">
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

                {/* Right Sidebar — Poster */}
                <div className="hidden lg:block">
                    <div className="rounded-xl overflow-hidden">
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
