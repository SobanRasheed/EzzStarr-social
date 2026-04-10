import { ChevronDown, Search } from "lucide-react";
import { useState } from "react";

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
          {options.map((option) => (
            <button
              key={option}
              onClick={() => {
                onChange(option === "All" ? "" : option);
                setOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-sm text-white/70 hover:bg-white/10 hover:text-white transition"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function StoriesFilters({
  search,
  onSearchChange,
  genres,
  selectedGenre,
  onGenreChange,
  authors,
  selectedAuthor,
  onAuthorChange,
}) {
  return (
    <>
      <div className="relative mb-6">
        <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
        <input
          type="text"
          placeholder="Search anything"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          className="w-full bg-transparent border-b border-white/20 pl-8 pr-4 pb-3 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-white/50 transition"
        />
      </div>

      <div className="flex gap-3 mb-14">
        <Dropdown label="Select Genre" options={genres} value={selectedGenre} onChange={onGenreChange} />
        <Dropdown label="Select Authors" options={authors} value={selectedAuthor} onChange={onAuthorChange} />
      </div>
    </>
  );
}
