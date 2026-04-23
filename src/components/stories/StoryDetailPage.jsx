import {
  ChevronLeft,
  DollarSign,
  Eye,
  MessageCircle,
  Share2,
  Star,
  MoreHorizontal,
  Heart,
  PlayCircle
} from "lucide-react";
import { useState } from "react";

const MOCK_THREADS = Array.from({ length: 5 }).map((_, i) => ({
  id: i + 1,
  author: "Kelly Wearstler",
  time: "about 1 hour ago",
  content: "New Apex Legend cheat brings smurfing in low ranked lobbies to a whole new level Visit",
  image: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?q=80&w=300&auto=format&fit=crop",
  stars: 5,
  replies: 12,
  views: "42,312"
}));

const RECOMMENDED_STORIES = [
  { id: 1, title: "H.G. Wells: The Science Fiction", author: "H.G. Wells", genre: "Sci-fi, Action, Mystery", image: "https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?q=80&w=400&auto=format&fit=crop", reward: "Earn 0.002 $SPCA" },
  { id: 2, title: "Infidel", author: "Aaron Campbell", genre: "Horror", image: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?q=80&w=400&auto=format&fit=crop", reward: "Earn 0.002 $SPCA" },
  { id: 3, title: "A Cyberpunk Ghost Story", author: "H.G. Wells", genre: "Sci-fi, Action, Mystery", image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=400&auto=format&fit=crop", reward: "Earn 0.002 $SPCA" },
  { id: 4, title: "Neon Dragons - A Cyberpunk", author: "Isekai LitRPG", genre: "Sci-fi, Action, Mystery", image: "https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?q=80&w=400&auto=format&fit=crop", reward: "Earn 0.002 $SPCA" },
  { id: 5, title: "Boneshaker", author: "Cherie Priest", genre: "Speculative", image: "https://images.unsplash.com/photo-1505682634904-d7c8d95cdc50?q=80&w=400&auto=format&fit=crop", reward: "Earn 0.002 $SPCA" },
  { id: 6, title: "H.G. Wells: The Science Fiction", author: "H.G. Wells", genre: "Sci-fi, Action, Mystery", image: "https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?q=80&w=400&auto=format&fit=crop", reward: "Earn 0.002 $SPCA" },
  { id: 7, title: "H.G. Wells: The Science Fiction", author: "H.G. Wells", genre: "Sci-fi, Action, Mystery", image: "https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?q=80&w=400&auto=format&fit=crop", reward: "Earn 0.002 $SPCA" },
  { id: 8, title: "H.G. Wells: The Science Fiction", author: "H.G. Wells", genre: "Sci-fi, Action, Mystery", image: "https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?q=80&w=400&auto=format&fit=crop", reward: "Earn 0.002 $SPCA" },
];

export default function StoryDetailPage({ story, onBack }) {
  const storyContent = story?.content || `Jim Caviezel, an American professor known for his vocal opposition to militant uprisings in the Middle East, had been invited to Cairo by an old friend, a fellow scholar. The invitation seemed innocent enough at first, a chance to speak out about the growing political unrest in the region. Little did Jim know, his visit would soon plunge him into a nightmare.\n\nUpon arriving in Cairo, Jim's friend greeted him warmly, and they immediately began discussing the rising tensions in the country. The conversation, however, took a dark turn when Jim was ambushed by a group of armed men. Before he could react, they forced him into a black van, blindfolding him and taking him to an unknown location. His friend, who had appeared so genuine, was nowhere to be found. Jim was now a pawn in a game he didn't understand.\n\nBack in the United States, Jim's wife, Sarah, was preparing for a quiet weekend when the phone call came. Her heart sank as she listened to the news—Jim had been kidnapped in Cairo. The voice on the other end of the line, a frantic reporter, explained that Jim had been taken by a militant group. They believed he had information on the recent uprisings, and they wanted him to talk.\n\nSarah's world shattered. She knew Jim well enough to know that he wouldn't give in to their demands. But the idea of him being held captive, possibly tortured, filled her with dread. She couldn't sit back and wait for someone else to save him. Sarah was determined. She was going to Cairo, no matter the cost.\n\nWith a heart full of fear and determination, Sarah packed her bags and booked the earliest flight to Egypt. She barely had time to think as she hurried through airport security, her mind racing. She knew nothing about the city, its dangers, or the political climate that had led to Jim's abduction. But what she did know was that she loved him, and she wouldn't let him go without a fight.`;
  const genres = story?.genres?.length > 0 ? story.genres : ["Horror", "Thriller"];
  const title = story?.title || "Infidel";

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden pb-24">
      {/* Background blurred header */}
      <div className="relative w-full h-[450px] overflow-hidden -mt-8">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${story?.image || "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?q=80&w=1200&auto=format&fit=crop"})`,
            filter: "blur(40px) brightness(0.4) saturate(1.5)",
            transform: "scale(1.2)"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-[#0a0a0a]" />
        
        <button
          onClick={onBack}
          className="absolute top-10 left-8 z-10 flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm"
        >
          <ChevronLeft className="w-5 h-5" /> Back
        </button>
      </div>

      {/* Main Content Area */}
      <div className="max-w-[1200px] mx-auto px-8 -mt-[320px] relative z-10">
        <div className="flex flex-col md:flex-row gap-10 items-start">
          
          {/* Left Panel: Cover & Buttons */}
          <div className="w-[320px] shrink-0">
            <img
              src={story?.image || "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?q=80&w=400&auto=format&fit=crop"}
              alt={title}
              className="w-full aspect-[2/3] object-cover rounded-md shadow-2xl"
            />
            <p className="text-[10px] text-white/50 mt-3 font-medium">
              Image Credit: Santa Monica Studio
            </p>
            
            <div className="flex gap-3 mt-5">
              <button className="flex-1 bg-[#1f1f1f] hover:bg-[#2a2a2a] transition-colors rounded-full py-3 flex items-center justify-center gap-2 text-sm font-medium">
                <PlayCircle className="w-4 h-4 text-[#00e5ff]" /> Listen Audio
              </button>
              <button className="flex-1 bg-[#a855f7] hover:bg-[#9333ea] transition-colors rounded-full py-3 flex items-center justify-center gap-2 text-sm font-medium text-white">
                Give Tip To Creator
              </button>
            </div>
            
            <p className="text-[#00e5ff] text-sm font-semibold mt-4 text-center md:text-left">
              Earn 0.02 $SPCA
            </p>
          </div>

          {/* Right Panel: Story Detail */}
          <div className="flex-1 bg-[#121212]/80 backdrop-blur-md rounded-xl p-8 border border-white/5">
            {/* Top Stats & Tags Row */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="flex gap-2">
                {genres.map(g => (
                  <span key={g} className="bg-[#00ff00] text-black px-3 py-1 text-xs font-bold rounded-sm">
                    {g}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-4 text-xs text-white/70">
                <div className="flex items-center gap-1.5 bg-[#00e5ff]/20 text-[#00e5ff] px-3 py-1 rounded-full font-medium">
                  <Eye className="w-3.5 h-3.5" /> Impressions 42,312
                </div>
                <button className="flex items-center gap-1.5 hover:text-white transition-colors bg-white/5 px-2.5 py-1 rounded-full">
                  <Star className="w-3.5 h-3.5" /> 5
                </button>
                <button className="flex items-center gap-1.5 hover:text-white transition-colors bg-white/5 px-2.5 py-1 rounded-full">
                  <MessageCircle className="w-3.5 h-3.5" /> Comments (124)
                </button>
                <button className="flex items-center gap-1.5 hover:text-white transition-colors bg-white/5 px-2.5 py-1 rounded-full">
                  <Share2 className="w-3.5 h-3.5" /> Share
                </button>
                <button className="flex items-center gap-1.5 hover:text-white transition-colors bg-white/5 px-2.5 py-1 rounded-full">
                  <MessageCircle className="w-3.5 h-3.5" /> Thread
                </button>
              </div>
            </div>

            <h1 className="text-4xl font-bold mb-6 text-white tracking-tight">{title}</h1>

            <div className="space-y-5 text-gray-300 text-[15px] leading-relaxed">
              {storyContent.split("\n\n").map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Story Threads Section */}
      <div className="max-w-[1200px] mx-auto px-8 mt-24">
        <h2 className="text-3xl font-bold text-center mb-12">Story Threads</h2>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 flex flex-col gap-4">
            {MOCK_THREADS.map(thread => (
              <div key={thread.id} className="bg-[#121212] border border-white/5 rounded-xl p-5 hover:bg-[#161616] transition-colors">
                {/* Thread Header */}
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-[#00ff00] font-medium">{thread.author}</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-500">{thread.time}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="bg-[#a855f7] hover:bg-[#9333ea] text-white text-[10px] font-bold px-3 py-1 rounded-full transition-colors">
                      Subscribe
                    </button>
                    <button className="text-gray-400 hover:text-white">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Thread Content */}
                <div className="flex gap-4 items-center justify-between">
                  <p className="text-[15px] text-gray-200 leading-snug flex-1">
                    {thread.content}
                  </p>
                  <img src={thread.image} alt="Thumbnail" className="w-16 h-20 object-cover rounded shadow-md shrink-0" />
                </div>

                {/* Thread Footer */}
                <div className="flex items-center gap-5 mt-4 text-[11px] text-gray-400 font-medium">
                  <button className="flex items-center gap-1.5 hover:text-white transition-colors">
                    <Star className="w-3.5 h-3.5" /> Star ({thread.stars})
                  </button>
                  <button className="flex items-center gap-1.5 hover:text-white transition-colors">
                    <MessageCircle className="w-3.5 h-3.5" /> Reply ({thread.replies})
                  </button>
                  <button className="flex items-center gap-1.5 hover:text-white transition-colors">
                    <Share2 className="w-3.5 h-3.5" /> Share
                  </button>
                  <div className="flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5" /> {thread.views}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Ad / Banner Area */}
          <div className="w-[300px] shrink-0 hidden lg:block">
            <div className="relative w-full aspect-[3/4] bg-gradient-to-br from-indigo-900 to-purple-900 rounded-xl overflow-hidden shadow-2xl border border-white/10 group cursor-pointer">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=400&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-screen" />
              <div className="absolute top-2 right-2 bg-black/40 p-1 rounded-sm">
                <span className="text-[8px] text-white/50 uppercase">Ad</span>
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
                <h3 className="text-4xl font-black text-yellow-400 mb-2 drop-shadow-lg tracking-wider">SPICA</h3>
                <div className="w-32 h-32 rounded-full bg-pink-500/20 backdrop-blur-md flex items-center justify-center mb-4 border border-pink-500/30 shadow-[0_0_30px_rgba(236,72,153,0.3)]">
                  <img src="https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?q=80&w=200&auto=format&fit=crop" className="w-full h-full object-cover rounded-full mix-blend-screen" alt="Planet" />
                </div>
                <div className="mt-auto w-full bg-black/60 backdrop-blur-sm p-3 rounded border border-white/10 flex items-center gap-3">
                  <div className="w-10 h-10 rounded bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30">
                    <Star className="text-cyan-400 w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Planet</p>
                    <p className="text-sm font-bold text-white tracking-wide">XEBION</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Stories Section */}
      <div className="max-w-[1200px] mx-auto px-8 mt-28 mb-12">
        <h2 className="text-3xl font-bold text-center mb-12">Recommended Stories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {RECOMMENDED_STORIES.map(story => (
            <div key={story.id} className="group relative bg-[#0a0a0a] rounded-sm overflow-hidden cursor-pointer shadow-lg">
              <div className="relative aspect-[3/4] w-full">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
                
                {/* Purple Tag */}
                <div className="absolute top-0 left-0 bg-[#d946ef] text-white text-[9px] font-bold px-2 py-1 uppercase tracking-wider">
                  {story.reward}
                </div>
                
                {/* Heart Icon */}
                <button className="absolute top-2 right-2 text-white/50 hover:text-white transition-colors">
                  <Heart className="w-4 h-4" />
                </button>

                {/* Bottom Content */}
                <div className="absolute bottom-0 w-full p-4 flex flex-col items-center text-center">
                  <p className="text-[#00ff00] text-[10px] font-semibold mb-1 uppercase tracking-wider">
                    {story.genre}
                  </p>
                  <h3 className="text-white text-sm font-bold leading-tight mb-1 line-clamp-2">
                    {story.title}
                  </h3>
                  <p className="text-gray-400 text-[11px]">
                    by {story.author}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
