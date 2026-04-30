import { useState } from "react";
import {
  Eye, Star, MessageCircle, Share2, Bookmark,
  MoreHorizontal, Volume2, Zap, ChevronLeft, ChevronRight
} from "lucide-react";
import StoriesQuizSection from "./StoriesQuizSection";
import StoryCard from "../reuseable comps/StoryCard";

/* ── Mock Data ─────────────────────────────── */
const PARTS = [1,2,3,4,5].map(n => ({
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
  { id:1, title:"Infidel", author:"Aaron Campbell", genre:"Horror", image:"https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?q=80&w=400&auto=format&fit=crop" },
  { id:2, title:"H.G. Wells: The Science Fiction", author:"H.G. Wells", genre:"Sci-fi, Action, Mystery", image:"https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=400&auto=format&fit=crop" },
  { id:3, title:"H.G. Wells: The Science Fiction", author:"H.G. Wells", genre:"Sci-fi, Action, Mystery", image:"https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?q=80&w=400&auto=format&fit=crop" },
  { id:4, title:"A Cyberpunk Ghost Story", author:"S.S.", genre:"Sci-fi Action", image:"https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?q=80&w=400&auto=format&fit=crop" },
  { id:5, title:"Neon Dragons - A Cyberpunk", author:"Isekai LitRPG", genre:"Action, Mystery", image:"https://images.unsplash.com/photo-1560762484-813fc97650a0?q=80&w=400&auto=format&fit=crop" },
  { id:6, title:"H.G. Wells: The Science Fiction", author:"H.G. Wells", genre:"Sci-fi, Action, Mystery", image:"https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=400&auto=format&fit=crop" },
  { id:7, title:"H.G. Wells: The Science Fiction", author:"H.G. Wells", genre:"Sci-fi, Action, Mystery", image:"https://images.unsplash.com/photo-1504192010706-dd7f569ee2be?q=80&w=400&auto=format&fit=crop" },
  { id:8, title:"H.G. Wells: The Science Fiction", author:"H.G. Wells", genre:"Sci-fi, Action, Mystery", image:"https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?q=80&w=400&auto=format&fit=crop" },
];

const STORY_CONTENT = `Jim Caviezel, an American professor known for his vocal opposition to militant uprisings in the Middle East, had been invited to Cairo by an old friend, a fellow scholar. The invitation seemed innocent enough at first, a chance to speak out about the growing political unrest in the region. Little did Jim know, his visit would soon plunge him into a nightmare.

Upon arriving in Cairo, Jim's friend greeted him warmly, and they immediately began discussing the rising tensions in the country. The conversation, however, took a dark turn when Jim was ambushed by a group of armed men. Before he could react, they forced him into a black van, blindfolding him and taking him to an unknown location. His friend, who had appeared so genuine, was nowhere to be found. Jim was now a pawn in a game he didn't understand.

Back in the United States, Jim's wife, Sarah, was preparing for a quiet weekend when the phone call came. Her heart sank as she listened to the news—Jim had been kidnapped in Cairo. The voice on the other end of the line, a frantic reporter, explained that Jim had been taken by a militant group. They believed he had information on the recent uprisings, and they wanted him to talk.

Sarah's world shattered. She knew Jim well enough to know that he wouldn't give in to their demands. But the idea of him being held captive, possibly tortured, filled her with dread. She couldn't sit back and wait for someone else to save him. Sarah was determined. She was going to Cairo, no matter the cost.

With a heart full of fear and determination, Sarah packed her bags and booked the earliest flight to Egypt. She barely had time to think as she hurried through airport security, her mind racing. She knew nothing about the city, its dangers, or the political climate that had led to Jim's abduction. But what she did know was that she loved him, and she wouldn't let him go without a fight.

Arriving in Cairo, Sarah was met with a chaotic city, streets crowded with people protesting against the government. She could feel the tension in the air, thick with anger and distrust. The last thing she wanted was to draw attention to herself, but she had no choice. Her first stop was the American embassy, hoping they could help. But even there, the officials seemed distant, overwhelmed by the growing unrest.

Sarah was not one to be easily deterred. She refused to accept the embassy's formalities and red tape. The security team provided her with some guidance, but it was clear they couldn't offer much help in a city so gripped by violence. She decided to take matters into her own hands. She knew that Jim was a man of principles, someone who would never give up easily. That meant, in her heart, she believed he was still alive.

Sarah's only lead was a few blurry details from the news reports and a cryptic message from Jim's colleague, who had last seen him before the abduction. The message mentioned something about a hidden safe house, a place where Jim might be held. Sarah's heart raced. The name of the place didn't ring any bells, but it was her only chance.

Without wasting any more time, Sarah hired a local guide to help her navigate the city's underground network. The guide, a man named Tariq, was cautious but willing to help. He had seen the aftermath of the uprisings firsthand and understood the gravity of the situation. The streets of Cairo were no longer safe, and many families had disappeared without a trace.

For the next several days, Sarah and Tariq scoured the city, asking questions, speaking to locals, and following any lead they could find. Everywhere they went, the tension in the city grew thicker. The protests continued, and there were reports of violent clashes between militants and the government forces. It seemed like Cairo was on the brink of collapse.

Meanwhile, Jim's captors were growing frustrated. They had expected him to break under pressure, to reveal what he knew about the uprisings and the movement behind them. But Jim, though bruised and exhausted, remained defiant. He refused to speak, refusing to betray his principles or reveal any information that might endanger others.

Days turned into weeks, and Sarah's hope began to waver. The city's political situation continued to worsen, making it harder for her to get close to Jim's captors. She had barely enough money left to stay in Cairo, and the danger was escalating by the hour. But Sarah knew that if she gave up now, she would lose Jim forever.

Then, one fateful night, Tariq received a call. The voice on the other end was familiar to him—one of his old contacts in the underground movement. The man mentioned a location—a rundown building near the outskirts of the city, a place known for housing captives. It wasn't much, but it was a lead Sarah couldn't ignore.

With renewed determination, Sarah set off with Tariq to the building. They approached cautiously, aware of the danger around them. The streets were eerily quiet, the city's chaos just beyond their reach. As they arrived at the location, Sarah felt a surge of adrenaline. She could feel Jim was near. He was so close, yet the danger surrounding them was palpable.

They carefully entered the building, making their way through the darkened halls. The sound of muffled voices echoed in the distance. Sarah's heart raced as she crept closer, praying that Jim was still alive, still holding on. She turned a corner and saw him—disheveled but alive—sitting against the wall, bound but not broken. "Jim!" she cried, rushing to his side. Her voice cracked as she untied the ropes that bound his wrists. Jim looked up at her, a mix of exhaustion and relief crossing his face.

"Sarah… you found me," he whispered.
"I'll always find you," she replied, her voice full of determination.

Together, they escaped the building, but their journey wasn't over yet. They still had to navigate their way out of Cairo, through the chaos and the danger that awaited them. The city was no longer the place they had known before. It was a place of unrest, of violence, and of uncertainty. But one thing was certain: Sarah and Jim had fought together and survived. They were stronger than ever.

As they boarded a plane back to the United States, Sarah looked at Jim, her heart full of gratitude. They had made it through the worst. But she knew one thing: nothing would ever be the same again. Their lives had changed, but their love had only grown stronger.

The nightmare was over, for now. But Sarah knew that the fight for peace, for justice, was far from over. She would continue to stand by Jim, no matter the cost. The journey they had started together had only just begun.`;

/* ── Sub-components ────────────────────────── */
function StatPill({ children, cyan }) {
  return (
    <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium ${cyan ? "bg-[#00e5ff]/15 text-[#00e5ff]" : "bg-white/8 text-white/70"}`}>
      {children}
    </span>
  );
}

function PartCard({ part }) {
  return (
    <div className="flex items-center gap-3 bg-[#0d0d0d] hover:bg-[#141414] transition-colors rounded-lg p-2.5 cursor-pointer border border-white/5">
      <img src={part.image} alt={part.label} className="w-12 h-14 object-cover rounded shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-white text-sm font-semibold">{part.label}</p>
        <p className="text-white/40 text-[11px] mt-0.5">{part.date}</p>
        <div className="flex items-center gap-3 mt-1.5 text-white/40 text-[10px]">
          <span className="flex items-center gap-1"><Star className="w-3 h-3" />{part.stars}</span>
          <span className="flex items-center gap-1"><MessageCircle className="w-3 h-3" />({part.comments})</span>
        </div>
      </div>
    </div>
  );
}

function ThreadCard({ thread }) {
  return (
    <div className="bg-[#111] border border-white/5 rounded-xl p-5 hover:bg-[#161616] transition-colors">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2 text-xs flex-wrap">
          <img src="https://i.pravatar.cc/28?u=mikasa" alt="" className="w-7 h-7 rounded-full shrink-0" />
          <span className="text-white font-semibold">{thread.author}</span>
          <span className="text-white/30 bg-white/8 px-2 py-0.5 rounded text-[10px]">{thread.category}</span>
          <span className="text-white/30">• {thread.time}</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button className="bg-[#a855f7] hover:bg-[#9333ea] text-white text-[10px] font-bold px-3 py-1 rounded-full transition-colors">Join</button>
          <button className="text-white/40 hover:text-white"><MoreHorizontal className="w-4 h-4" /></button>
        </div>
      </div>
      {thread.hasStoryRef && (
        <div className="flex items-center gap-2 mb-2">
          <img src="https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?q=80&w=60&auto=format&fit=crop" className="w-8 h-8 rounded object-cover" alt="" />
          <div>
            <p className="text-white/80 text-xs font-semibold">Infidel</p>
            <p className="text-[#14FF00] text-[10px]">• Story</p>
          </div>
          <span className="text-white/40 text-[10px] ml-1">{thread.storyPart}</span>
        </div>
      )}
      <div className="flex gap-4 items-center justify-between">
        <p className="text-[14px] text-white/85 leading-snug flex-1">{thread.content}</p>
        {thread.image && <img src={thread.image} alt="" className="w-16 h-20 object-cover rounded shrink-0" />}
      </div>
      <div className="flex items-center gap-5 mt-4 text-[11px] text-white/40 font-medium">
        <button className="flex items-center gap-1.5 hover:text-white transition-colors"><Star className="w-3.5 h-3.5" />{thread.stars}</button>
        <button className="flex items-center gap-1.5 hover:text-white transition-colors"><MessageCircle className="w-3.5 h-3.5" />{thread.replies}</button>
        <button className="flex items-center gap-1.5 hover:text-white transition-colors"><Eye className="w-3.5 h-3.5" />{thread.views}</button>
        <button className="flex items-center gap-1.5 hover:text-white transition-colors"><Share2 className="w-3.5 h-3.5" /></button>
      </div>
    </div>
  );
}

/* ── Main Component ────────────────────────── */
export default function StoryDetailPage({ story, onBack }) {
  const [showQuiz, setShowQuiz] = useState(false);
  const [activePart, setActivePart] = useState(1);

  const coverImg = story?.image || "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?q=80&w=600&auto=format&fit=crop";
  const title = story?.title || "Infidel";
  const author = story?.author || "Aaron Campbell";
  const genres = story?.genres?.length > 0 ? story.genres : story?.genre ? [story.genre] : ["Horror", "Thriller"];
  const content = story?.content || STORY_CONTENT;

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">

      {/* ── Hero background ── */}
      <div className="relative w-full h-72 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center scale-110"
          style={{ backgroundImage: `url(${coverImg})`, filter: "blur(35px) brightness(0.35) saturate(1.6)" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black" />
        {onBack && (
          <button onClick={onBack}
            className="absolute top-8 left-8 z-10 flex items-center gap-1.5 text-white/60 hover:text-white text-sm transition-colors">
            <ChevronLeft className="w-4 h-4" /> Back
          </button>
        )}
      </div>

      {/* ── Main two-column layout ── */}
      <div className="max-w-[1200px] mx-auto px-6 -mt-52 relative z-10 pb-6">
        <div className="flex gap-8 items-start">

          {/* ══ LEFT SIDEBAR ══ */}
          <div className="w-[260px] shrink-0">
            {/* Cover */}
            <img src={coverImg} alt={title}
              className="w-full aspect-[2/3] object-cover rounded-lg shadow-2xl" />
            <p className="text-white/40 text-[10px] mt-2">Artist: {author}</p>

            {/* Action buttons */}
            <div className="flex gap-2 mt-4">
              <button className="flex-1 bg-[#1a1a1a] hover:bg-[#222] border border-white/10 rounded-full py-2 flex items-center justify-center gap-1.5 text-[12px] font-semibold text-white/80 transition-colors">
                <Volume2 className="w-3.5 h-3.5 text-[#00e5ff]" /> Listen Audio
              </button>
              <button className="flex-1 bg-[#c9a227] hover:bg-[#b8921f] rounded-full py-2 flex items-center justify-center gap-1.5 text-[12px] font-bold text-black transition-colors">
                💰 Tip Author
              </button>
              <button className="bg-[#14FF00] hover:bg-[#10dd00] rounded-full px-3 py-2 flex items-center justify-center text-[12px] font-bold text-black transition-colors">
                <Zap className="w-3.5 h-3.5" /> Boost
              </button>
            </div>

            <p className="text-[#00e5ff] text-[12px] font-semibold mt-3">Earn 0.00005 SPCA</p>

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
              <p className="text-[#00e5ff] text-sm font-semibold mb-3">Parts</p>
              <div className="flex flex-col gap-2">
                {PARTS.map(part => (
                  <div key={part.id} onClick={() => setActivePart(part.id)}>
                    <PartCard part={part} />
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar Quick Quiz */}
            <div className="mt-5 rounded-xl border border-transparent p-4"
              style={{ background: "linear-gradient(#12121a, #12121a) padding-box, linear-gradient(135deg,#06b6d4,#7c3aed) border-box" }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold relative shrink-0"
                  style={{ background: "linear-gradient(135deg,#1e1b4b,#312e81)" }}>
                  SP<span className="absolute -top-1 -right-1 text-[9px] text-violet-400">+</span>
                </div>
                <div>
                  <p className="text-white font-bold text-[13px] leading-none">Quick Quiz</p>
                  <p className="text-white/50 text-[11px] mt-0.5">Did you understand Part 1?</p>
                </div>
              </div>
              <div className="border-t border-white/8 pt-3">
                <p className="text-white/60 text-[12px] text-center mb-3">Answer questions to claim your reward Spica</p>
                <div className="flex justify-center">
                  <button onClick={() => setShowQuiz(true)}
                    className="px-8 py-2 rounded-full text-white text-[13px] font-bold"
                    style={{ background: "linear-gradient(135deg,#06b6d4,#7c3aed)" }}>
                    Start Quiz
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ══ RIGHT PANEL ══ */}
          <div className="flex-1 min-w-0">
            <div className="bg-[#0e0e0e]/80 backdrop-blur-sm rounded-xl p-6 border border-white/5">
              {/* Top row: genres + stats */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                <div className="flex gap-2">
                  {genres.map(g => (
                    <span key={g} className="bg-[#14FF00] text-black text-[11px] font-black px-3 py-1 rounded-sm">{g}</span>
                  ))}
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <StatPill cyan>
                    <Eye className="w-3 h-3" /> 42,312
                  </StatPill>
                  <StatPill>
                    <Star className="w-3 h-3" /> 5
                  </StatPill>
                  <StatPill>
                    <MessageCircle className="w-3 h-3" /> (124)
                  </StatPill>
                  <StatPill>
                    <Share2 className="w-3 h-3" />
                  </StatPill>
                  <StatPill>
                    <Bookmark className="w-3 h-3" />
                  </StatPill>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-3xl font-bold text-white mb-5">
                {title} <span className="text-white/50 font-normal text-xl">(Part-1)</span>
              </h1>

              {/* Story content */}
              <div className="space-y-4 text-white/75 text-[14px] leading-7">
                {content.split("\n\n").map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              {/* Inline Quick Check quiz */}
              <StoriesQuizSection onClose={() => setShowQuiz(false)} />

              {/* Pagination */}
              <div className="flex items-center justify-center gap-3 mt-8">
                <button className="w-8 h-8 rounded-full bg-white/8 hover:bg-white/15 flex items-center justify-center transition-colors">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-white/70 text-sm font-medium">{activePart}</span>
                <button className="w-8 h-8 rounded-full bg-white/8 hover:bg-white/15 flex items-center justify-center transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Story Threads ── */}
      <div className="max-w-[1200px] mx-auto px-6 mt-20">
        <h2 className="text-3xl font-bold text-center text-white mb-10">Story Threads</h2>
        <div className="flex gap-8">
          <div className="flex-1 flex flex-col gap-4">
            {THREADS.map(t => <ThreadCard key={t.id} thread={t} />)}
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
                  {["SPICA","SPICA","SPICA","SPICA"].map((t,i) => (
                    <p key={i} className="text-[28px] font-black leading-tight tracking-widest"
                      style={{ color: i%2===0 ? "rgba(216,180,254,0.15)" : "rgba(139,92,246,0.2)" }}>{t}</p>
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
          Recommended From <span className="text-[#00e5ff]">Ezzstar</span>
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
