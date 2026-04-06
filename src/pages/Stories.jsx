import { Heart, Search, ChevronDown, Eye, Star, MessageCircle, Share2, Volume2, DollarSign, Zap, ChevronLeft } from "lucide-react";
import { useState } from "react";

// ── StoryCard ──────────────────────────────────────────────────────────────
function StoryCard({ image, title, author, genre, reward, onClick }) {
  const [liked, setLiked] = useState(false);

  return (
    <div onClick={onClick} className="group relative rounded-sm overflow-hidden bg-black cursor-pointer">
      <div className="relative aspect-[3/3.7] w-full">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium bg-yellow-400 text-black">
          Earn {reward}
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); setLiked(!liked); }}
          className="absolute top-3 right-3 p-2 rounded-full bg-black/60 hover:bg-black/80 transition"
        >
          <Heart className={`w-4 h-4 ${liked ? "fill-red-500 text-red-500" : "text-white"}`} />
        </button>
        <div className="absolute bottom-0 p-4 w-full">
          <h3 className="text-white font-semibold text-sm line-clamp-1">{title}</h3>
          <p className="text-xs text-white/70 mt-1">by {author}</p>
          <p className="text-[10px] mt-1 text-green-400">{genre}</p>
        </div>
      </div>
    </div>
  );
}

// ── Sample data ────────────────────────────────────────────────────────────
const STORIES = [
  { id: 1, image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&q=80", title: "Infidel", author: "Aaron Campbell", genre: "Horror", reward: "0.00005 SPCA", category: "Trending", genres: ["Horror", "Thriller"], views: "42,312", stars: 5, comments: 124, writer: "Pornsak Pichetshote", about: "A Haunted House Story For The 21st Century, INFIDEL Follows An American Muslim Woman And Her Multi-Racial Neighbors Who Move Into A Building Haunted By Entities That Feed Off Xenophobia.", artist: "Aaron Campbell" },
  { id: 2, image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&q=80", title: "H.G. Wells: The Science Fiction", author: "H.G. Wells", genre: "Sci-fi, Action, Mystery", reward: "0.00005 SPCA", category: "Trending", genres: ["Sci-fi", "Action", "Mystery"], views: "31,204", stars: 5, comments: 87, writer: "H.G. Wells", about: "A collection of the greatest science fiction works by H.G. Wells, reimagined for the modern age with stunning new artwork and narrative expansions.", artist: "H.G. Wells" },
  { id: 3, image: "https://images.unsplash.com/photo-1614728263952-84ea256f9ae9?w=400&q=80", title: "Neon Silence", author: "K. Tanaka", genre: "Sci-fi, Action, Mystery", reward: "0.00005 SPCA", category: "Trending", genres: ["Sci-fi", "Action", "Mystery"], views: "18,900", stars: 4, comments: 55, writer: "K. Tanaka", about: "In a city that never sleeps, one detective uncovers a conspiracy that reaches the highest levels of corporate power.", artist: "K. Tanaka" },
  { id: 4, image: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=400&q=80", title: "A Cyberpunk Ghost Story", author: "S.S", genre: "Sci-fi, Action", reward: "0.00005 SPCA", category: "Trending", genres: ["Sci-fi", "Action"], views: "22,450", stars: 5, comments: 63, writer: "S.S", about: "When the line between the digital and spiritual world dissolves, a hacker discovers her dead sister has been living inside the net.", artist: "S.S" },
  { id: 5, image: "https://images.unsplash.com/photo-1551269901-5c5e506549a8?w=400&q=80", title: "Crimson Tide", author: "L. Montgomery", genre: "Thriller, Mystery", reward: "0.00005 SPCA", category: "Trending", genres: ["Thriller", "Mystery"], views: "14,320", stars: 4, comments: 41, writer: "L. Montgomery", about: "A former detective is pulled back into action when a series of murders mirrors a case she thought she had solved a decade ago.", artist: "L. Montgomery" },
  { id: 6, image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&q=80", title: "Starborn", author: "C. Drake", genre: "Sci-fi, Fantasy", reward: "0.00005 SPCA", category: "Trending", genres: ["Sci-fi", "Fantasy"], views: "27,800", stars: 5, comments: 92, writer: "C. Drake", about: "Born under a dying star, a young woman discovers she carries the power to either save or destroy the last remnants of humanity.", artist: "C. Drake" },
  { id: 7, image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&q=80", title: "Whispers in the Dark", author: "M. Rowe", genre: "Horror, Mystery", reward: "0.00005 SPCA", category: "Trending", genres: ["Horror", "Mystery"], views: "9,870", stars: 4, comments: 33, writer: "M. Rowe", about: "Strange voices from the walls of an old asylum lead a journalist to the truth behind its most disturbing unsolved disappearances.", artist: "M. Rowe" },
  { id: 8, image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=400&q=80", title: "Beyond the Veil", author: "P. Castillo", genre: "Fantasy, Action", reward: "0.00005 SPCA", category: "Trending", genres: ["Fantasy", "Action"], views: "35,100", stars: 5, comments: 110, writer: "P. Castillo", about: "A warrior priestess crosses into the realm of the dead to retrieve the soul of her fallen king — but the price may be her own.", artist: "P. Castillo" },
];

const GENRES = ["All", "Horror", "Sci-fi", "Fantasy", "Thriller", "Mystery", "Action", "Romance"];
const AUTHORS = ["All", "Aaron Campbell", "H.G. Wells", "K. Tanaka", "S.S", "L. Montgomery", "C. Drake", "M. Rowe", "P. Castillo"];

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

With renewed determination, Sarah set off with Tariq to the building. They approached cautiously, aware of the danger around them. The streets were eerily quiet, the city's chaos just beyond their reach. As they arrived at the location, Sarah felt a surge of adrenaline. She could feel Jim was near. He was so close, yet the danger surrounding them was palpable.`;

const PARTS = [
  { id: 1, title: "Part 1", date: "8 May 2025", stars: 5, comments: 2 },
  { id: 2, title: "Part 2", date: "8 May 2025", stars: 5, comments: 2 },
  { id: 3, title: "Part 3", date: "8 May 2025", stars: 5, comments: 2 },
  { id: 4, title: "Part 4", date: "8 May 2025", stars: 5, comments: 2 },
  { id: 5, title: "Part 5", date: "8 May 2025", stars: 5, comments: 2 },
];

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "Why was Jim Caviezel invited to Cairo?",
    options: ["To attend a political conference", "An old friend invited him to speak about unrest", "He was on a research trip", "He was visiting family"],
    correct: 1,
  },
  {
    id: 2,
    question: "What happened to Jim shortly after arriving in Cairo?",
    options: ["He was welcomed by local officials", "He was ambushed and kidnapped by armed men", "He gave a speech at a university", "He returned home immediately"],
    correct: 1,
  },
];

// ── Dropdown ───────────────────────────────────────────────────────────────
function Dropdown({ label, options, value, onChange }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2.5 bg-transparent border border-white/20 rounded text-white/70 text-sm hover:border-white/40 transition min-w-[160px] justify-between"
      >
        <span>{value || label}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 w-full bg-zinc-900 border border-white/10 rounded shadow-xl z-50 overflow-hidden">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => { onChange(opt === "All" ? "" : opt); setOpen(false); }}
              className="w-full text-left px-4 py-2 text-sm text-white/70 hover:bg-white/10 hover:text-white transition"
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Quick Quiz Sidebar Card ────────────────────────────────────────────────
function QuickQuizCard({ onStart }) {
  return (
    <div style={{
      marginTop: 20,
      borderRadius: 14,
      border: "1.5px solid transparent",
      background: "linear-gradient(#12121a, #12121a) padding-box, linear-gradient(135deg, #06b6d4, #7c3aed) border-box",
      padding: "18px 16px",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
        <div style={{ width: 42, height: 42, borderRadius: 10, flexShrink: 0, background: "linear-gradient(135deg,#1e1b4b,#312e81)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, position: "relative" }}>
          💀
          <span style={{ position: "absolute", top: -4, right: -4, fontSize: 10, color: "#a78bfa" }}>✦</span>
        </div>
        <div>
          <p style={{ color: "#fff", fontWeight: 700, fontSize: 15, margin: 0 }}>Quick Quiz</p>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, margin: 0 }}>Did you understand Part 1?</p>
        </div>
      </div>
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 14 }}>
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, textAlign: "center", marginBottom: 14 }}>
          Answer questions to claim your reward Spica
        </p>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            onClick={onStart}
            style={{ background: "linear-gradient(135deg,#06b6d4,#7c3aed)", border: "none", borderRadius: 999, padding: "10px 36px", color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer" }}
          >
            Start Quiz
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Full Quiz Section ──────────────────────────────────────────────────────
function QuizSection({ onClose }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const select = (qId, idx) => { if (!submitted) setAnswers((prev) => ({ ...prev, [qId]: idx })); };
  const score = submitted ? QUIZ_QUESTIONS.filter((q) => answers[q.id] === q.correct).length : 0;
  const allAnswered = Object.keys(answers).length === QUIZ_QUESTIONS.length;

  return (
    <div style={{ marginTop: 32, borderRadius: 14, border: "1.5px solid transparent", background: "linear-gradient(#0f0f1a, #0f0f1a) padding-box, linear-gradient(135deg, #06b6d4, #7c3aed) border-box", padding: "24px 28px" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, paddingBottom: 16, borderBottom: "1px solid rgba(255,255,255,0.08)", marginBottom: 20 }}>
        <div style={{ width: 44, height: 44, borderRadius: 10, flexShrink: 0, background: "linear-gradient(135deg,#1e1b4b,#312e81)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, position: "relative" }}>
          💀
          <span style={{ position: "absolute", top: -4, right: -4, fontSize: 10, color: "#a78bfa" }}>✦</span>
        </div>
        <div>
          <p style={{ color: "#fff", fontWeight: 700, fontSize: 17, margin: 0 }}>Quick Check</p>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, margin: 0 }}>Did you understand Part 1?</p>
        </div>
      </div>

      {submitted ? (
        <div style={{ textAlign: "center", padding: "20px 0" }}>
          <p style={{ fontSize: 22, fontWeight: 700, color: score === QUIZ_QUESTIONS.length ? "#4ade80" : "#f59e0b", marginBottom: 8 }}>
            {score === QUIZ_QUESTIONS.length ? "🎉 Perfect Score!" : `${score} / ${QUIZ_QUESTIONS.length} Correct`}
          </p>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, marginBottom: 24 }}>
            {score === QUIZ_QUESTIONS.length ? "You earned your Spica reward!" : "Try reading again to improve your score."}
          </p>
          {QUIZ_QUESTIONS.map((q) => (
            <div key={q.id} style={{ marginBottom: 20, textAlign: "left" }}>
              <p style={{ color: "#fff", fontSize: 13, fontWeight: 600, marginBottom: 10 }}>{q.id}. {q.question}</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {q.options.map((opt, idx) => {
                  const isCorrect = idx === q.correct;
                  const isChosen = answers[q.id] === idx;
                  let bg = "rgba(255,255,255,0.05)", border = "1px solid rgba(255,255,255,0.1)";
                  if (isCorrect) { bg = "rgba(74,222,128,0.15)"; border = "1px solid #4ade80"; }
                  else if (isChosen) { bg = "rgba(239,68,68,0.15)"; border = "1px solid #ef4444"; }
                  return <div key={idx} style={{ padding: "10px 14px", borderRadius: 8, background: bg, border, color: "rgba(255,255,255,0.8)", fontSize: 13 }}>{opt}</div>;
                })}
              </div>
            </div>
          ))}
          <button onClick={onClose} style={{ background: "linear-gradient(135deg,#06b6d4,#7c3aed)", border: "none", borderRadius: 999, padding: "10px 32px", color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer", marginTop: 8 }}>
            Close Quiz
          </button>
        </div>
      ) : (
        <>
          {QUIZ_QUESTIONS.map((q) => (
            <div key={q.id} style={{ marginBottom: 24 }}>
              <p style={{ color: "#fff", fontSize: 14, fontWeight: 600, marginBottom: 12 }}>{q.id}. {q.question}</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {q.options.map((opt, idx) => {
                  const chosen = answers[q.id] === idx;
                  return (
                    <button key={idx} onClick={() => select(q.id, idx)} style={{ padding: "12px 16px", borderRadius: 10, textAlign: "left", background: chosen ? "rgba(124,58,237,0.3)" : "rgba(255,255,255,0.05)", border: chosen ? "1.5px solid #7c3aed" : "1.5px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.8)", fontSize: 13, cursor: "pointer" }}>
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 8 }}>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 12 }}>Answer both questions to claim your reward</p>
            <button
              onClick={() => allAnswered && setSubmitted(true)}
              style={{ background: allAnswered ? "linear-gradient(135deg,#06b6d4,#7c3aed)" : "rgba(255,255,255,0.1)", border: "none", borderRadius: 999, padding: "11px 28px", color: "#fff", fontWeight: 700, fontSize: 14, cursor: allAnswered ? "pointer" : "default", opacity: allAnswered ? 1 : 0.5 }}
            >
              Submit Answers
            </button>
          </div>
        </>
      )}
    </div>
  );
}

// ── Story Detail Page ──────────────────────────────────────────────────────
function StoryDetailPage({ story, onBack }) {
  const [liked, setLiked] = useState(false);
  const [activePart, setActivePart] = useState(1);
  const [quizOpen, setQuizOpen] = useState(false);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0a0a0a", color: "#fff", fontFamily: "'Georgia', serif" }}>

      {/* Full-width blurred hero banner */}
      <div style={{ position: "relative", width: "100%", height: "280px", overflow: "hidden" }}>
        <div style={{ backgroundImage: `url(${story.image})`, backgroundSize: "cover", backgroundPosition: "center", filter: "blur(20px) brightness(0.35)", transform: "scale(1.15)", position: "absolute", inset: 0 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 0%, #0a0a0a 100%)" }} />
        <button onClick={onBack} style={{ position: "absolute", top: 20, left: 32, zIndex: 10, display: "flex", alignItems: "center", gap: 6, color: "rgba(255,255,255,0.5)", background: "none", border: "none", cursor: "pointer", fontSize: 13 }}>
          <ChevronLeft style={{ width: 16, height: 16 }} /> Back to Stories
        </button>
      </div>

      {/* Main layout */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px 64px", marginTop: "-180px", position: "relative", zIndex: 1, display: "flex", gap: 0, alignItems: "flex-start" }}>

        {/* LEFT COLUMN */}
        <div style={{ width: 300, flexShrink: 0, zIndex: 2 }}>
          <img src={story.image} alt={story.title} style={{ width: "100%", aspectRatio: "3/3.8", objectFit: "cover", borderRadius: 4, display: "block" }} />

          <div style={{ paddingTop: 10 }}>
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 12, marginBottom: 16 }}>
              Artist: <span style={{ color: "rgba(255,255,255,0.55)" }}>{story.artist}</span>
            </p>

            <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
              <button style={{ display: "flex", alignItems: "center", gap: 5, padding: "9px 10px", background: "#27272a", border: "none", borderRadius: 4, color: "#fff", fontSize: 11, cursor: "pointer", flex: 1, justifyContent: "center" }}>
                <Volume2 style={{ width: 13, height: 13, color: "#4ade80", flexShrink: 0 }} /> Listen Audio
              </button>
              <button style={{ display: "flex", alignItems: "center", gap: 5, padding: "9px 10px", background: "#7e22ce", border: "none", borderRadius: 4, color: "#fff", fontSize: 11, cursor: "pointer", flex: 1, justifyContent: "center" }}>
                <DollarSign style={{ width: 13, height: 13, flexShrink: 0 }} /> Tip Author
              </button>
              <button style={{ display: "flex", alignItems: "center", gap: 5, padding: "9px 10px", background: "#eab308", border: "none", borderRadius: 4, color: "#000", fontSize: 11, cursor: "pointer", fontWeight: 700, justifyContent: "center" }}>
                <Zap style={{ width: 13, height: 13, flexShrink: 0 }} /> Boost
              </button>
            </div>

            <p style={{ color: "#22d3ee", fontSize: 13, fontWeight: 500, marginBottom: 20 }}>Earn <strong>0.00005 SPCA</strong></p>

            <div style={{ marginBottom: 18 }}>
              <h3 style={{ color: "#fff", fontWeight: 600, fontSize: 13, marginBottom: 7 }}>About Story</h3>
              <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 12, lineHeight: 1.7 }}>{story.about}</p>
            </div>

            <div style={{ marginBottom: 20 }}>
              <h3 style={{ color: "#fff", fontWeight: 600, fontSize: 13, marginBottom: 10 }}>Writer</h3>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg,#a855f7,#ec4899)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, flexShrink: 0 }}>
                  {story.writer[0]}
                </div>
                <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 12 }}>{story.writer}</span>
              </div>
            </div>

            <div>
              <h3 style={{ color: "#22d3ee", fontWeight: 600, fontSize: 13, marginBottom: 8 }}>Parts</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {PARTS.map((part) => (
                  <div key={part.id} onClick={() => setActivePart(part.id)} style={{ display: "flex", alignItems: "center", gap: 10, padding: 10, borderRadius: 4, cursor: "pointer", background: activePart === part.id ? "rgba(255,255,255,0.08)" : "transparent" }}>
                    <img src={story.image} alt="" style={{ width: 44, height: 44, objectFit: "cover", borderRadius: 4, flexShrink: 0 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ color: "#fff", fontSize: 12, fontWeight: 500 }}>{part.title}</p>
                      <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 10 }}>{part.date}</p>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.4)", fontSize: 10, flexShrink: 0 }}>
                      <span style={{ display: "flex", alignItems: "center", gap: 2 }}><Star style={{ width: 10, height: 10 }} /> {part.stars}</span>
                      <span style={{ display: "flex", alignItems: "center", gap: 2 }}><MessageCircle style={{ width: 10, height: 10 }} /> ({part.comments})</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Quiz Card below Part 5 */}
            {!quizOpen && <QuickQuizCard onStart={() => setQuizOpen(true)} />}
          </div>
        </div>

        {/* RIGHT COLUMN: dark box */}
        <div style={{ flex: 1, backgroundColor: "rgba(18,18,18,0.95)", borderRadius: "0 6px 6px 6px", padding: "24px 28px", minWidth: 0 }}>

          {/* Genre tags + stats */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 18 }}>
            <div style={{ display: "flex", gap: 8 }}>
              {story.genres.map((g) => (
                <span key={g} style={{ padding: "5px 16px", borderRadius: 4, background: "#4ade80", color: "#000", fontSize: 13, fontWeight: 700 }}>{g}</span>
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 14, color: "rgba(255,255,255,0.5)", fontSize: 13 }}>
              <span style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(6,182,212,0.15)", color: "#22d3ee", padding: "4px 12px", borderRadius: 999, fontSize: 12, fontWeight: 500 }}>
                <Eye style={{ width: 13, height: 13 }} /> {story.views}
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Star style={{ width: 13, height: 13 }} /> {story.stars}</span>
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}><MessageCircle style={{ width: 13, height: 13 }} /> ({story.comments})</span>
              <button style={{ background: "none", border: "none", color: "rgba(255,255,255,0.5)", cursor: "pointer", padding: 0, display: "flex" }}><Share2 style={{ width: 13, height: 13 }} /></button>
              <button onClick={() => setLiked(!liked)} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", color: liked ? "#ef4444" : "rgba(255,255,255,0.5)" }}>
                <Heart style={{ width: 13, height: 13, fill: liked ? "#ef4444" : "none" }} />
              </button>
            </div>
          </div>

          {/* Title */}
          <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: 20, lineHeight: 1.2 }}>
            {story.title}{" "}
            <span style={{ color: "rgba(255,255,255,0.4)", fontWeight: 400, fontSize: "1.1rem" }}>(Part-1)</span>
          </h1>

          {/* Story paragraphs */}
          {STORY_CONTENT.split("\n\n").map((para, i) => (
            <p key={i} style={{ color: "rgba(255,255,255,0.82)", fontSize: 14.5, lineHeight: 1.85, marginBottom: 18 }}>{para}</p>
          ))}

          {/* Full Quiz below story */}
          {quizOpen && <QuizSection onClose={() => setQuizOpen(false)} />}
        </div>

      </div>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────
export default function StoriesPage() {
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [selectedStory, setSelectedStory] = useState(null);

  if (selectedStory) {
    return <StoryDetailPage story={selectedStory} onBack={() => setSelectedStory(null)} />;
  }

  const filtered = STORIES.filter((s) => {
    const matchSearch =
      !search ||
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.author.toLowerCase().includes(search.toLowerCase());
    const matchGenre = !selectedGenre || s.genre.toLowerCase().includes(selectedGenre.toLowerCase());
    const matchAuthor = !selectedAuthor || s.author === selectedAuthor;
    return matchSearch && matchGenre && matchAuthor;
  });

  const row1 = filtered.slice(0, 4);
  const row2 = filtered.slice(4, 8);

  return (
    <div className="min-h-screen bg-black text-white px-8 py-12" style={{ fontFamily: "'Georgia', serif" }}>
      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold mb-6 tracking-tight">Search</h1>

        <div className="relative mb-6">
          <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          <input
            type="text"
            placeholder="Search anything"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent border-b border-white/20 pl-8 pr-4 pb-3 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-white/50 transition"
          />
        </div>

        <div className="flex gap-3 mb-14">
          <Dropdown label="Select Genre" options={GENRES} value={selectedGenre} onChange={setSelectedGenre} />
          <Dropdown label="Select Authors" options={AUTHORS} value={selectedAuthor} onChange={setSelectedAuthor} />
        </div>

        <h2 className="text-2xl font-semibold mb-6">Trending Stories</h2>

        {filtered.length === 0 ? (
          <p className="text-white/40 text-sm mt-8">No stories match your search.</p>
        ) : (
          <div className="flex flex-col gap-6">
            {row1.length > 0 && (
              <div className="grid grid-cols-4 gap-4">
                {row1.map((story) => (
                  <StoryCard key={story.id} {...story} onClick={() => setSelectedStory(story)} />
                ))}
              </div>
            )}
            {row2.length > 0 && (
              <div className="grid grid-cols-4 gap-4">
                {row2.map((story) => (
                  <StoryCard key={story.id} {...story} onClick={() => - (story)} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}