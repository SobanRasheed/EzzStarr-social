import { ChevronDown, X, Star, MessageCircle, Eye, Share2, MoreHorizontal, Sparkles, Smile, Paperclip, Send } from "lucide-react";
import { readerThreads, currentReaderUser } from "../../../config/mockReaderData.js";

/**
 * Threads / Gists slide-over panel — Figma node 8475:95658.
 * Slides in from the right over the reader. Fixed width (600px on desktop).
 *
 * Backend: replace `readerThreads` with gists/threads for the current manga,
 * and wire the composer `onSubmit` to POST a new gist.
 */

const StatPill = ({ icon, value }) => (
  <span className="flex items-center gap-1.5 bg-[#1C1C1E] text-gray-300 text-xs px-3 py-1.5 rounded-full">
    {icon}
    {value !== undefined && value !== null && <span>{value}</span>}
  </span>
);

export default function ThreadsPanel({ open, onClose }) {
  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-[60] bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />

      <aside className="fixed top-0 right-0 z-[70] h-screen w-full max-w-[600px] bg-[#0A0A0C] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 shrink-0">
          <button className="flex items-center gap-2 text-white text-2xl font-medium">
            Threads
            <ChevronDown className="w-5 h-5 text-gray-400" />
          </button>
          <button onClick={onClose} className="text-gray-300 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Thread list */}
        <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-4">
          {readerThreads.map((t) => (
            <div
              key={t.id}
              className="bg-[#141416] border border-white/10 rounded-2xl p-4"
            >
              {/* Card header */}
              <div className="flex items-center gap-2 mb-3">
                <img
                  src={t.avatar}
                  alt={t.author}
                  className="w-8 h-8 rounded-full object-cover shrink-0"
                />
                <div className="flex items-center gap-1.5 text-xs text-gray-400 min-w-0">
                  <span className="text-white text-sm underline truncate">{t.author}</span>
                  <Sparkles className="w-3.5 h-3.5 text-[#DE27E2] shrink-0" />
                  <span className="text-gray-300">{t.type}</span>
                  <span className="text-gray-600">•</span>
                  <span className="truncate">{t.time}</span>
                </div>
                <div className="flex items-center gap-2 ml-auto shrink-0">
                  <button className="bg-[#DE27E2] hover:bg-[#c31fc6] text-white text-xs font-medium px-4 py-1 rounded-full transition">
                    Join
                  </button>
                  <button className="text-gray-400 hover:text-white">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Embedded story/manga reference */}
              {t.reference && (
                <div className="flex items-center gap-3 bg-[#1C1C1E] border border-white/10 rounded-xl p-2.5 mb-3">
                  <img
                    src={t.reference.cover}
                    alt={t.reference.title}
                    className="w-9 h-11 rounded object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-[15px] truncate">{t.reference.title}</p>
                    <p className="flex items-center gap-1 text-xs text-[#01F1E3]">
                      <Sparkles className="w-3 h-3" />
                      {t.reference.kind}
                    </p>
                  </div>
                  {t.reference.part && (
                    <span className="text-gray-400 text-sm shrink-0">{t.reference.part}</span>
                  )}
                </div>
              )}

              {/* Body: text + optional thumbnail */}
              <div className="flex gap-3 items-start">
                <p className="flex-1 text-white/90 text-[15px] leading-snug">{t.text}</p>
                {t.image && (
                  <img
                    src={t.image}
                    alt=""
                    className="w-[130px] h-[80px] rounded-lg object-cover shrink-0"
                  />
                )}
              </div>

              {/* Stats */}
              <div className="flex items-center gap-2 mt-4">
                <StatPill icon={<Star className="w-3.5 h-3.5" />} value={t.stars} />
                <StatPill icon={<MessageCircle className="w-3.5 h-3.5" />} value={t.replies} />
                <StatPill icon={<Eye className="w-3.5 h-3.5" />} value={t.views} />
                <StatPill icon={<Share2 className="w-3.5 h-3.5" />} />
              </div>
            </div>
          ))}
        </div>

        {/* Composer */}
        <div className="shrink-0 border-t border-white/10 bg-[#0F0F12] px-5 pt-4 pb-5">
          <div className="flex items-center gap-3 mb-3">
            <img
              src={currentReaderUser.avatar}
              alt={currentReaderUser.handle}
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-white text-sm underline">{currentReaderUser.handle}</span>
            <Sparkles className="w-3.5 h-3.5 text-[#DE27E2]" />
            <span className="text-gray-300 text-xs">Confession</span>
            <button className="ml-auto bg-[#DE27E2] hover:bg-[#c31fc6] text-white text-xs font-medium px-4 py-1 rounded-full transition">
              Join
            </button>
            <button className="text-gray-400 hover:text-white">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex-1 flex items-center bg-[#1C1C1E] rounded-lg px-4 py-3">
              <input
                type="text"
                placeholder="Write a Gist..."
                className="flex-1 bg-transparent text-sm text-white placeholder-gray-500 outline-none"
              />
              <div className="flex items-center gap-3 text-gray-400">
                <button className="hover:text-white"><Smile className="w-5 h-5" /></button>
                <button className="hover:text-white"><Paperclip className="w-5 h-5" /></button>
              </div>
            </div>
            <button className="bg-[#01F1E3] hover:bg-[#01d6c9] text-black rounded-lg p-3 transition">
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
