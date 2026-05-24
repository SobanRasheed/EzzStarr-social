import { useState } from "react";
import {
  Eye, Star, MessageCircle, Share2,
  MoreHorizontal, Zap, ChevronLeft, ChevronRight,
  DollarSign, X, Send, Heart, Rocket
} from "lucide-react";
import StoryCard from "../reuseable comps/StoryCard";

/* ── Thread / Spool Icon ─────────────────── */
function ThreadSpoolIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="7" ry="2.5" />
      <ellipse cx="12" cy="19" rx="7" ry="2.5" />
      <line x1="5" y1="5" x2="5" y2="19" />
      <line x1="19" y1="5" x2="19" y2="19" />
      <ellipse cx="12" cy="12" rx="4" ry="1.5" />
    </svg>
  );
}

/* ── Mock Data ─────────────────────────────── */
const PARTS = [1, 2, 3, 4, 5].map(n => ({
  id: n,
  label: `Part ${n}`,
  date: "8 May 2025",
  stars: 5,
  comments: 2,
  image: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?q=80&w=100&auto=format&fit=crop",
}));

const THREADS = Array.from({ length: 4 }).map((_, i) => ({
  id: i,
  author: "Mikasa Yager",
  category: "Confession",
  time: "about 1 hour ago",
  hasStoryRef: i === 1 || i === 2,
  storyPart: i === 1 ? "Part 2" : "Part 3",
  content: "New Apex Legend cheat brings smurfing in low ranked lobbies to a whole new level Visit New",
  image: i % 2 === 0 ? "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?q=80&w=120&auto=format&fit=crop" : null,
  stars: 5, replies: 12, views: "42K",
}));

const RECOMMENDED = [
  { id: 1, title: "Infidel", author: "Aaron Campbell", genre: "Horror", image: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?q=80&w=400&auto=format&fit=crop" },
  { id: 2, title: "H.G. Wells: The Science Fiction", author: "H.G. Wells", genre: "Sci-fi, Action, Mystery", image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=400&auto=format&fit=crop" },
  { id: 3, title: "H.G. Wells: The Science Fiction", author: "H.G. Wells", genre: "Sci-fi, Action, Mystery", image: "https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?q=80&w=400&auto=format&fit=crop" },
  { id: 4, title: "A Cyberpunk Ghost Story", author: "S.S.", genre: "Sci-fi Action", image: "https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?q=80&w=400&auto=format&fit=crop" },
  { id: 5, title: "Neon Dragons - A Cyberpunk", author: "Isekai LitRPG", genre: "Action, Mystery", image: "https://images.unsplash.com/photo-1560762484-813fc97650a0?q=80&w=400&auto=format&fit=crop" },
  { id: 6, title: "H.G. Wells: The Science Fiction", author: "H.G. Wells", genre: "Sci-fi, Action, Mystery", image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=400&auto=format&fit=crop" },
  { id: 7, title: "H.G. Wells: The Science Fiction", author: "H.G. Wells", genre: "Sci-fi, Action, Mystery", image: "https://images.unsplash.com/photo-1504192010706-dd7f569ee2be?q=80&w=400&auto=format&fit=crop" },
  { id: 8, title: "H.G. Wells: The Science Fiction", author: "H.G. Wells", genre: "Sci-fi, Action, Mystery", image: "https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?q=80&w=400&auto=format&fit=crop" },
];

const STORY_CONTENT = `Jim Caviezel, an American professor known for his vocal opposition to militant uprisings in the Middle East, had been invited to Cairo by an old friend, a fellow scholar. The invitation seemed innocent enough at first, a chance to speak out about the growing political unrest in the region. Little did Jim know, his visit would soon plunge him into a nightmare.

Upon arriving in Cairo, Jim's friend greeted him warmly, and they immediately began discussing the rising tensions in the country. The conversation, however, took a dark turn when Jim was ambushed by a group of armed men. Before he could react, they forced him into a black van, blindfolding him and taking him to an unknown location. His friend, who had appeared so genuine, was nowhere to be found. Jim was now a pawn in a game he didn't understand.

Back in the United States, Jim's wife, Sarah, was preparing for a quiet weekend when the phone call came. Her heart sank as she listened to the news—Jim had been kidnapped in Cairo. The voice on the other end of the line, a frantic reporter, explained that Jim had been taken by a militant group. They believed he had information on the recent uprisings, and they wanted him to talk.

Sarah's world shattered. She knew Jim well enough to know that he wouldn't give in to their demands. But the idea of him being held captive, possibly tortured, filled her with dread. She couldn't sit back and wait for someone else to save him. Sarah was determined. She was going to Cairo, no matter the cost.

With a heart full of fear and determination, Sarah packed her bags and booked the earliest flight to Egypt. She barely had time to think as she hurried through airport security, her mind racing. She knew nothing about the city, its dangers, or the political climate that had led to Jim's abduction. But what she did know was that she loved him, and she wouldn't let him go without a fight.

Arriving in Cairo, Sarah was met with a chaotic city, streets crowded with people protesting against the government. She could feel the tension in the air, thick with anger and distrust. The last thing she wanted was to draw attention to herself, but she had no choice. Her first stop was the American embassy, hoping they could help. But even there, the officials seemed distant, overwhelmed by the growing unrest.

Sarah was not one to be easily deterred. She refused to accept the embassy's formalities and red tape. The security team provided her with some guidance, but it was clear they couldn't offer much help in a city so gripped by violence. She decided to take matters into her own hands. She knew that Jim was a man of principles, someone who would never give up easily. That meant, in her heart, she believed he was still alive.

Sarah's only lead was a few blurry details from the news reports and a cryptic message from Jim's colleague, who had last seen him before the abduction. The message mentioned something about a hidden safe house, a place where Jim might be held. Sarah's heart raced. The name of the place didn't ring any bells, but it was her only chance.

Without wasting any more time, Sarah hired a local guide to help her navigate the city's underground network. The guide, a man named Tariq, was cautious but willing to help. He had seen the aftermath of the uprisings firsthand and understood the gravity of the situation. The two of them set off into the labyrinthine streets of Cairo, weaving through crowds and back alleys, always on the lookout for danger.`;

/* ── Stat Pill (redesigned to match reference) ────── */
function StatPill({ children, cyan, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer
        ${cyan
          ? "bg-[#01F1E3] text-black"
          : active
            ? "bg-[#2a2a2e] text-[#01F1E3] ring-1 ring-[#01F1E3]/40"
            : "bg-[#1c1c1e]/80 text-white/60 hover:bg-[#2a2a2e] hover:text-white"
        }`}
    >
      {children}
    </button>
  );
}

/* ── Part Card ─────────────────────────── */
function PartCard({ part, isActive, onClick }) {
  const [starred, setStarred] = useState(false);
  const [starCount, setStarCount] = useState(part.stars);

  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 hover:bg-[#141414] transition-colors rounded-lg p-2.5 cursor-pointer border ${isActive ? "bg-[#141414] border-[#14FF00]/30" : "bg-[#0d0d0d] border-white/5"
        }`}
    >
      <img src={part.image} alt={part.label} className="w-12 h-14 object-cover rounded shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-white text-sm font-semibold">{part.label}</p>
        <p className="text-white/40 text-[11px] mt-0.5">{part.date}</p>
        <div className="flex items-center gap-3 mt-1.5 text-[10px]">
          <button onClick={e => { e.stopPropagation(); setStarred(!starred); setStarCount(p => starred ? p - 1 : p + 1); }}
            className={`flex items-center gap-1 transition-colors ${starred ? "text-yellow-400" : "text-white/40 hover:text-yellow-400"}`}>
            <Star className={`w-3 h-3 ${starred ? "fill-yellow-400" : ""}`} />{starCount}
          </button>
          <button onClick={e => e.stopPropagation()} className="flex items-center gap-1 text-white/40 hover:text-white transition-colors">
            <MessageCircle className="w-3 h-3" />({part.comments})
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Thread Card (inside Gist panel) ─── */
function GistThreadCard({ thread }) {
  const [starred, setStarred] = useState(false);
  const [starCount, setStarCount] = useState(thread.stars);
  const [replied, setReplied] = useState(false);
  const [replyCount, setReplyCount] = useState(thread.replies);

  return (
    <div className="bg-[#1a1a1a]/60 border border-white/5 rounded-xl p-4 hover:bg-[#1e1e1e] transition-colors">
      {/* Header row */}
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2 text-xs flex-wrap">
          <img src="https://i.pravatar.cc/28?u=mikasa" alt="" className="w-6 h-6 rounded-full shrink-0" />
          <span className="text-white text-[11px] font-semibold">{thread.author}</span>
          <span className="text-white/40 text-[9px]">•</span>
          <span className="text-white/30 bg-white/8 px-1.5 py-0.5 rounded text-[9px]">{thread.category}</span>
          <span className="text-white/30 text-[9px]">• {thread.time}</span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <button className="bg-[#a855f7] hover:bg-[#9333ea] text-white text-[9px] font-bold px-2.5 py-0.5 rounded-full transition-colors">Join</button>
          <button className="text-white/40 hover:text-white"><MoreHorizontal className="w-3.5 h-3.5" /></button>
        </div>
      </div>

      {/* Story reference */}
      {thread.hasStoryRef && (
        <div className="flex items-center gap-2 mb-2 bg-white/5 rounded-lg p-2">
          <img src="https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?q=80&w=60&auto=format&fit=crop" className="w-8 h-10 rounded object-cover shrink-0" alt="" />
          <div>
            <p className="text-white/80 text-[11px] font-semibold">Infidel</p>
            <p className="text-[#14FF00] text-[9px]">• Story</p>
          </div>
          <span className="text-white/40 text-[9px] ml-auto">{thread.storyPart}</span>
        </div>
      )}

      {/* Content + image */}
      <div className="flex gap-3 items-start">
        <p className="text-[12px] text-white/80 leading-snug flex-1">{thread.content}</p>
        {thread.image && <img src={thread.image} alt="" className="w-14 h-16 object-cover rounded shrink-0" />}
      </div>

      {/* Stats row */}
      <div className="flex items-center gap-4 mt-3 text-[10px] text-white/40">
        <button onClick={() => { setStarred(!starred); setStarCount(p => starred ? p - 1 : p + 1); }}
          className={`flex items-center gap-1 transition-colors ${starred ? "text-yellow-400" : "hover:text-yellow-400"}`}>
          <Star className={`w-3 h-3 ${starred ? "fill-yellow-400" : ""}`} />{starCount}
        </button>
        <button onClick={() => { setReplied(!replied); setReplyCount(p => replied ? p - 1 : p + 1); }}
          className={`flex items-center gap-1 transition-colors ${replied ? "text-blue-400" : "hover:text-white"}`}>
          <MessageCircle className="w-3 h-3" />{replyCount}
        </button>
        <button className="flex items-center gap-1 hover:text-white transition-colors">
          <Eye className="w-3 h-3" />{thread.views}
        </button>
        <button className="flex items-center gap-1 hover:text-white transition-colors">
          <Share2 className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}

/* ── Inline Comments Panel ────────────────────── */
function InlineCommentsPanel({ onClose }) {
  const [text, setText] = useState("");
  const [comments, setComments] = useState([]);

  const submit = () => {
    if (!text.trim()) return;
    setComments(prev => [{ id: Date.now(), text: text.trim(), author: "You", time: "just now" }, ...prev]);
    setText("");
  };

  return (
    <div className="w-[320px] shrink-0 bg-[#111111] border-l border-white/8 flex flex-col self-stretch rounded-r-xl">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/8 shrink-0">
        <h3 className="text-white font-bold text-base">Comments</h3>
        <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-5 py-4 min-h-[400px]">
        {comments.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center gap-4 py-12">
            {/* Alien/avatar illustration */}
            <div className="relative w-24 h-24">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-4xl shadow-lg shadow-purple-500/30">
                👾
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-green-500 text-xs flex items-center justify-center">✦</div>
              <div className="absolute -bottom-1 -left-2 w-5 h-5 rounded-full bg-pink-500 text-xs flex items-center justify-center">✦</div>
            </div>
            <div>
              <p className="text-white font-semibold text-base">Start the discussion</p>
              <p className="text-white/40 text-sm mt-1 leading-snug">Looking to share your thoughts and start the conversation</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {comments.map(c => (
              <div key={c.id} className="bg-[#1a1a1a] rounded-xl p-3 border border-white/5">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-400 flex items-center justify-center text-[10px] font-bold">Y</div>
                  <span className="text-white text-[12px] font-semibold">{c.author}</span>
                  <span className="text-white/30 text-[10px]">• {c.time}</span>
                </div>
                <p className="text-white/75 text-[13px] leading-snug">{c.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Input */}
      <div className="px-4 py-4 border-t border-white/8 shrink-0">
        <div className="flex items-center gap-2">
          <input
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyDown={e => e.key === "Enter" && submit()}
            placeholder="Share Your thoughts"
            className="flex-1 bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-2.5 text-[13px] text-white placeholder-white/30 outline-none focus:border-white/25"
          />
          <button
            onClick={submit}
            className="bg-[#1c1c1e] hover:bg-[#2a2a2a] text-white text-[12px] font-semibold px-4 py-2.5 rounded-lg whitespace-nowrap transition-colors border border-white/10"
          >
            Add Comment
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Inline Gist / Threads Panel ─────────────── */
function InlineGistPanel({ onClose }) {
  const [threadText, setThreadText] = useState("");
  const [localThreads, setLocalThreads] = useState(THREADS);

  const submit = () => {
    if (!threadText.trim()) return;
    setLocalThreads(prev => [{
      id: Date.now(),
      author: "You",
      category: "Thread",
      time: "just now",
      hasStoryRef: false,
      content: threadText.trim(),
      image: null,
      stars: 0, replies: 0, views: "0",
    }, ...prev]);
    setThreadText("");
  };

  return (
    <div className="w-[340px] shrink-0 bg-[#111111] border-l border-white/8 flex flex-col self-stretch rounded-r-xl">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/8 shrink-0">
        <button className="flex items-center gap-1.5 text-white font-bold text-base hover:text-white/80 transition-colors">
          Gist <span className="text-sm text-white/50">▼</span>
        </button>
        <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Thread list */}
      <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3 min-h-[400px]">
        {localThreads.map(t => <GistThreadCard key={t.id} thread={t} />)}
      </div>

      {/* Write Thread input */}
      <div className="px-4 py-4 border-t border-white/8 shrink-0">
        <div className="flex items-center gap-2 bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-2.5">
          <input
            value={threadText}
            onChange={e => setThreadText(e.target.value)}
            onKeyDown={e => e.key === "Enter" && submit()}
            placeholder="Write a Thread..."
            className="flex-1 bg-transparent text-[13px] text-white placeholder-white/30 outline-none"
          />
          <button
            onClick={submit}
            className="w-8 h-8 rounded-lg bg-[#01F1E3] hover:bg-[#00c8e0] flex items-center justify-center transition-colors shrink-0"
          >
            <Send className="w-4 h-4 text-black" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Main Story Detail Page ───────────── */
export default function StoryDetailPage({ story, onBack }) {
  const [activePart, setActivePart] = useState(1);

  /* Stats state */
  const [viewCount] = useState(42312);
  const [starCount, setStarCount] = useState(5);
  const [starred, setStarred] = useState(false);
  const [commentCount] = useState(124);

  /* Panel state */
  const [showComments, setShowComments] = useState(false);
  const [showThreads, setShowThreads] = useState(false);

  /* Boost state */
  const [boosted, setBoosted] = useState(false);

  const coverImg = story?.image || "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?q=80&w=600&auto=format&fit=crop";
  const title = story?.title || "Infidel";
  const author = story?.author || "Aaron Campbell";
  const genres = story?.genres?.length > 0 ? story.genres : story?.genre ? [story.genre] : ["Horror", "Thriller"];
  const content = story?.content || STORY_CONTENT;

  /* Toggle panels (mutually exclusive) */
  const toggleComments = () => { setShowComments(p => !p); setShowThreads(false); };
  const toggleThreads = () => { setShowThreads(p => !p); setShowComments(false); };

  const panelOpen = showComments || showThreads;

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">

      {/* ── Full hero blurred background ── */}
      <div className="relative w-full" style={{ minHeight: "100vh" }}>
        <div className="absolute top-0 left-0 right-0 h-[600px] overflow-hidden z-0">
          <div className="absolute inset-0 bg-cover bg-center scale-110"
            style={{ backgroundImage: `url(${coverImg})`, filter: "blur(40px) brightness(0.25) saturate(1.4)" }} />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black" />
        </div>

        {/* Back button */}
        {onBack && (
          <button onClick={onBack}
            className="absolute top-28 left-8 z-20 flex items-center gap-1.5 text-white/60 hover:text-white text-sm transition-colors">
            <ChevronLeft className="w-4 h-4" /> Back
          </button>
        )}

        {/* ── Main two-column layout ── */}
        <div className={`relative z-10 mx-auto px-6 pt-32 pb-6 transition-all duration-300 ${panelOpen ? "max-w-[1400px]" : "max-w-[1200px]"}`}>
          <div className="flex gap-8 items-start">

            {/* ══ LEFT SIDEBAR — hidden when panel is open ══ */}
            {!panelOpen && <div className="w-[240px] shrink-0 flex flex-col">

              {/* Cover image — with yellow glow when boosted */}
              <div className={`rounded-lg overflow-hidden transition-all duration-500 ${boosted
                ? "shadow-[0_0_50px_15px_rgba(234,179,8,0.5),0_0_100px_30px_rgba(234,179,8,0.25)]"
                : "shadow-2xl shadow-black/60"
                }`}>
                <img src={coverImg} alt={title} className="w-full aspect-[2/3] object-cover block" />
              </div>
              <p className="text-white/40 text-[10px] mt-2">Artist: {author}</p>

              {/* Action buttons — same row, flat (no rounded-full) */}
              <div className="flex items-stretch mt-4 w-full overflow-hidden rounded-sm">
                <button className="flex items-center justify-center gap-1.5 bg-[#111] hover:bg-[#1a1a1a] border-y border-l border-white/10 h-[36px] px-3 text-[11px] font-semibold text-white/80 transition-colors whitespace-nowrap flex-1">
                  <span className="w-2 h-2 rounded-full bg-[#14FF00] shrink-0" />
                  Listen Audio
                </button>
                <button className="flex items-center justify-center gap-1.5 bg-[#4a3080] hover:bg-[#5a3a90] border border-[#6040a0]/50 h-[36px] px-3 text-[11px] font-bold text-white transition-colors whitespace-nowrap flex-1">
                  <DollarSign className="w-3.5 h-3.5 shrink-0" />
                  Tip Author
                </button>
                {/* Boost → Heart after boosting */}
                {boosted ? (
                  <button
                    onClick={() => setBoosted(false)}
                    className="flex items-center justify-center bg-[#1a1a1a] hover:bg-[#222] border-y border-r border-white/10 h-[36px] w-[42px] transition-colors shrink-0"
                  >
                    <Heart className="w-5 h-5 text-white/60" />
                  </button>
                ) : (
                  <button
                    onClick={() => setBoosted(true)}
                    className="flex items-center justify-center gap-1.5 bg-[#14FF00] hover:bg-[#10dd00] border border-[#14FF00] h-[36px] px-3 text-[11px] font-bold text-black transition-colors whitespace-nowrap flex-1"
                  >
                    <Zap className="w-3.5 h-3.5 shrink-0 fill-black" /> Boost
                  </button>
                )}
              </div>

              {/* Earn badge — appears only after boosting */}
              {boosted && (
                <p className="text-[#01F1E3] text-[13px] font-semibold mt-3">
                  Earn <span className="text-white font-bold">0.00005</span> <span className="text-[#01F1E3] font-bold">$SPCA</span>
                </p>
              )}

              {/* About Story */}
              <div className="mt-5">
                <p className="text-white/80 text-sm font-semibold mb-2">About Story</p>
                <p className="text-white/40 text-[12px] leading-relaxed">
                  A Haunted House Story For The 21st Century, INFIDEL Follows An American Muslim Woman And Her Multi-Racial Neighbors Who Move Into A Building Haunted By Entities That Feed Off Xenophobia.
                </p>
              </div>

              {/* Writer */}
              <div className="mt-5">
                <p className="text-white/80 text-sm font-semibold mb-2">Writer</p>
                <div className="flex items-center gap-2">
                  <img src="https://i.pravatar.cc/32?u=porneak" alt="" className="w-7 h-7 rounded-full" />
                  <span className="text-white/70 text-[12px]">Pornsak Pichetshote</span>
                </div>
              </div>

              {/* Parts */}
              <div className="mt-5">
                <p className="text-[#01F1E3] text-sm font-semibold mb-3">Parts</p>
                <div className="flex flex-col gap-2">
                  {PARTS.map(part => (
                    <PartCard
                      key={part.id}
                      part={part}
                      isActive={activePart === part.id}
                      onClick={() => setActivePart(part.id)}
                    />
                  ))}
                </div>
              </div>
            </div>}

            {/* ══ RIGHT CONTENT AREA (story + inline panel) ══ */}
            <div className="flex-1 min-w-0 flex">

              {/* Story content container */}
              <div className={`flex-1 min-w-0 bg-[#0e0e0e]/85 backdrop-blur-sm p-6 border border-white/5 transition-all duration-300 ${panelOpen ? "rounded-l-xl" : "rounded-xl"}`}>

                {/* Top row: genres + stats */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                  {/* Genre tags — sharp square corners */}
                  <div className="flex gap-2 flex-wrap">
                    {genres.map(g => (
                      <span key={g} className="bg-[#14FF00] text-black text-[13px] font-black px-5 py-1.5" style={{ borderRadius: 0 }}>
                        {g}
                      </span>
                    ))}
                  </div>

                  {/* Stats row — 5 rounded pills matching reference */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <StatPill cyan>
                      <Eye className="w-4 h-4" /> {viewCount.toLocaleString()}
                    </StatPill>
                    <StatPill
                      active={starred}
                      onClick={() => { setStarred(!starred); setStarCount(p => starred ? p - 1 : p + 1); }}
                    >
                      <Star className={`w-4 h-4 ${starred ? "fill-yellow-400 text-yellow-400" : ""}`} /> {starCount}
                    </StatPill>
                    <StatPill active={showComments} onClick={toggleComments}>
                      <MessageCircle className={`w-4 h-4 ${showComments ? "text-[#01F1E3]" : ""}`} /> ({commentCount})
                    </StatPill>
                    <StatPill onClick={() => { if (navigator.clipboard) navigator.clipboard.writeText(window.location.href).catch(() => { }); }}>
                      <Share2 className="w-4 h-4" />
                    </StatPill>
                    {/* Threads / Gist button — spool icon */}
                    <StatPill active={showThreads} onClick={toggleThreads}>
                      <ThreadSpoolIcon className="w-4.5 h-4.5" />
                    </StatPill>
                  </div>
                </div>

                {/* Title — with rocket icon when boosted */}
                <h1 className="text-3xl font-bold text-white mb-5 flex items-center gap-2 flex-wrap">
                  {title}
                  <span className="text-white/50 font-normal text-xl">(Part-{activePart})</span>
                  {boosted && <Rocket className="w-6 h-6 text-yellow-400 fill-yellow-400" />}
                </h1>

                {/* Story content */}
                <div className="space-y-4 text-white/75 text-[14px] leading-7">
                  {content.split("\n\n").map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-center gap-3 mt-8">
                  <button
                    onClick={() => setActivePart(p => Math.max(1, p - 1))}
                    className="w-8 h-8 rounded-full bg-white/8 hover:bg-white/15 flex items-center justify-center transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-white/70 text-sm font-medium">Part {activePart} of {PARTS.length}</span>
                  <button
                    onClick={() => setActivePart(p => Math.min(PARTS.length, p + 1))}
                    className="w-8 h-8 rounded-full bg-white/8 hover:bg-white/15 flex items-center justify-center transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* ── Inline side panels (appear next to story, not as overlays) ── */}
              {showComments && <InlineCommentsPanel onClose={() => setShowComments(false)} />}
              {showThreads && <InlineGistPanel onClose={() => setShowThreads(false)} />}
            </div>
          </div>
        </div>
      </div>

      {/* ── Story Threads ── */}
      <div className="max-w-[1200px] mx-auto px-6 mt-20">
        <h2 className="text-3xl font-bold text-center text-white mb-10">Story Threads</h2>
        <div className="flex gap-8">
          <div className="flex-1 flex flex-col gap-4">
            {THREADS.map(t => (
              <div key={t.id} className="bg-[#111] border border-white/5 rounded-xl p-5 hover:bg-[#161616] transition-colors">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2 text-xs flex-wrap">
                    <img src="https://i.pravatar.cc/28?u=mikasa" alt="" className="w-7 h-7 rounded-full shrink-0" />
                    <span className="text-white font-semibold">{t.author}</span>
                    <span className="text-white/30 bg-white/8 px-2 py-0.5 rounded text-[10px]">{t.category}</span>
                    <span className="text-white/30">• {t.time}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button className="bg-[#a855f7] hover:bg-[#9333ea] text-white text-[10px] font-bold px-3 py-1 rounded-full transition-colors">Join</button>
                    <button className="text-white/40 hover:text-white"><MoreHorizontal className="w-4 h-4" /></button>
                  </div>
                </div>
                {t.hasStoryRef && (
                  <div className="flex items-center gap-2 mb-2">
                    <img src="https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?q=80&w=60&auto=format&fit=crop" className="w-8 h-8 rounded object-cover" alt="" />
                    <div>
                      <p className="text-white/80 text-xs font-semibold">Infidel</p>
                      <p className="text-[#14FF00] text-[10px]">• Story</p>
                    </div>
                    <span className="text-white/40 text-[10px] ml-1">{t.storyPart}</span>
                  </div>
                )}
                <div className="flex gap-4 items-center justify-between">
                  <p className="text-[14px] text-white/85 leading-snug flex-1">{t.content}</p>
                  {t.image && <img src={t.image} alt="" className="w-16 h-20 object-cover rounded shrink-0" />}
                </div>
                <ThreadStatsRow thread={t} />
              </div>
            ))}
          </div>
          {/* Ad banner */}
          <div className="w-[260px] shrink-0 hidden lg:block">
            <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden border border-white/10 shadow-2xl"
              style={{ background: "linear-gradient(135deg,#1a0a2e,#0a1a3e)" }}>
              <div className="absolute top-2 right-2 bg-black/50 px-1.5 py-0.5 rounded">
                <span className="text-[8px] text-white/40 uppercase">Ad</span>
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-start pt-8 p-5 text-center z-10">
                <h3 className="text-5xl font-black text-yellow-400 tracking-widest drop-shadow-lg">SPICA</h3>
                <div className="relative w-full mt-2">
                  {["SPICA", "SPICA", "SPICA", "SPICA"].map((txt, i) => (
                    <p key={i} className="text-[28px] font-black leading-tight tracking-widest"
                      style={{ color: i % 2 === 0 ? "rgba(216,180,254,0.15)" : "rgba(139,92,246,0.2)" }}>{txt}</p>
                  ))}
                </div>
                <div className="w-28 h-28 rounded-full mt-2 overflow-hidden border-2 border-pink-500/30 shadow-[0_0_30px_rgba(236,72,153,0.4)]">
                  <img src="https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?q=80&w=200&auto=format&fit=crop"
                    className="w-full h-full object-cover mix-blend-screen" alt="Planet" />
                </div>
                <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-sm rounded-lg p-3 flex items-center gap-3 border border-white/10">
                  <div className="w-10 h-10 rounded bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30 shrink-0">
                    <Star className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div className="text-left">
                    <p className="text-[9px] text-white/40 uppercase tracking-widest font-bold">Planet</p>
                    <p className="text-sm font-black text-white tracking-widest">XEBION</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Recommended From Ezzstar ── */}
      <div className="max-w-[1200px] mx-auto px-6 mt-24 pb-20">
        <h2 className="text-3xl font-bold text-center text-white mb-10">
          Recommended From <span className="text-[#01F1E3]">Ezzstar</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {RECOMMENDED.map(s => (
            <StoryCard key={s.id} title={s.title} author={s.author} genre={s.genre} image={s.image} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Thread Stats Row (stateful) ────── */
function ThreadStatsRow({ thread }) {
  const [starred, setStarred] = useState(false);
  const [starCount, setStarCount] = useState(thread.stars);
  const [replied, setReplied] = useState(false);
  const [replyCount, setReplyCount] = useState(thread.replies);

  return (
    <div className="flex items-center gap-5 mt-4 text-[11px] text-white/40 font-medium">
      <button onClick={() => { setStarred(!starred); setStarCount(p => starred ? p - 1 : p + 1); }}
        className={`flex items-center gap-1.5 transition-colors ${starred ? "text-yellow-400" : "hover:text-yellow-400"}`}>
        <Star className={`w-3.5 h-3.5 ${starred ? "fill-yellow-400" : ""}`} />{starCount}
      </button>
      <button onClick={() => { setReplied(!replied); setReplyCount(p => replied ? p - 1 : p + 1); }}
        className={`flex items-center gap-1.5 transition-colors ${replied ? "text-blue-400" : "hover:text-white"}`}>
        <MessageCircle className="w-3.5 h-3.5" />{replyCount}
      </button>
      <button className="flex items-center gap-1.5 hover:text-white transition-colors">
        <Eye className="w-3.5 h-3.5" />{thread.views}
      </button>
      <button onClick={() => { if (navigator.clipboard) navigator.clipboard.writeText(window.location.href).catch(() => { }); }}
        className="flex items-center gap-1.5 hover:text-white transition-colors">
        <Share2 className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
