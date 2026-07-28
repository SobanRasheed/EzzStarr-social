import { ChevronDown, X, Star, MoreHorizontal, Smile, Paperclip, Send } from "lucide-react";
import { readerComments, currentReaderUser } from "../../../config/mockReaderData.js";

/**
 * Comments slide-over panel — Figma node 8475:94968.
 * Slides in from the right over the reader. Fixed width (600px on desktop).
 *
 * Backend: replace `readerComments` import with comments fetched for the current
 * chapter, and wire the composer `onSubmit` to POST a new comment.
 */
export default function CommentsPanel({ open, onClose }) {
  if (!open) return null;

  return (
    <>
      {/* Click-away backdrop */}
      <div
        className="fixed inset-0 z-[60] bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />

      <aside className="fixed top-0 right-0 z-[70] h-screen w-full max-w-[600px] bg-[#0A0A0C] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 shrink-0">
          <button className="flex items-center gap-2 text-white text-2xl font-medium">
            Comments
            <ChevronDown className="w-5 h-5 text-gray-400" />
          </button>
          <button onClick={onClose} className="text-gray-300 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Comment list */}
        <div className="flex-1 overflow-y-auto">
          {readerComments.map((c) => (
            <div
              key={c.id}
              className="px-6 py-4 border-t border-white/10"
            >
              <div className="flex items-start gap-3">
                {/* Avatar */}
                {c.avatar ? (
                  <img
                    src={c.avatar}
                    alt={c.author}
                    className="w-10 h-10 rounded-full object-cover shrink-0"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-[#2A2A2E] flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 12a5 5 0 100-10 5 5 0 000 10zm0 2c-4 0-8 2-8 6v2h16v-2c0-4-4-6-8-6z" />
                    </svg>
                  </div>
                )}

                {/* Name + time */}
                <div className="flex-1 min-w-0">
                  <p className="text-white text-[15px] leading-tight">{c.author}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{c.time}</p>
                </div>

                {/* Rating + menu */}
                <div className="flex items-center gap-4 shrink-0 text-gray-300">
                  <span className="flex items-center gap-1 text-sm">
                    <Star className="w-4 h-4" />
                    {c.stars}
                  </span>
                  <button className="hover:text-white">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <p className="text-white/90 text-[15px] leading-snug mt-3">{c.text}</p>
            </div>
          ))}
        </div>

        {/* Composer */}
        <div className="shrink-0 border-t border-white/10 bg-[#0F0F12] rounded-t-2xl px-5 pt-4 pb-5">
          <div className="flex items-center gap-3 mb-3">
            <img
              src={currentReaderUser.avatar}
              alt={currentReaderUser.handle}
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-white text-sm underline">{currentReaderUser.handle}</span>
            <button className="ml-auto bg-[#DE27E2] hover:bg-[#c31fc6] text-white text-xs font-medium px-4 py-1 rounded-full transition">
              Join
            </button>
            <button className="text-gray-400 hover:text-white">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>

          {/* Input row */}
          <div className="flex items-center gap-2">
            <div className="flex-1 flex items-center bg-[#1C1C1E] rounded-lg px-4 py-3">
              <input
                type="text"
                placeholder="Write a comment..."
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
