/**
 * Mock data for the Manga Detail page (node 8475:94445).
 *
 * ⚠️ FRONTEND PLACEHOLDER DATA — for the backend developer:
 * Everything here is hardcoded sample content so the detail screen renders
 * without a live backend. It is used ONLY as a fallback when the manga fetch
 * fails (see MangaDetails.jsx); real API data takes over automatically.
 *   - mockMangaDetail    -> GET /api/manga/:id
 *   - mockDetailChapters -> GET /api/manga/:id/chapters
 * Shapes below are the contract the UI expects — keep the field names.
 */

import bloomingLove from "../assets/manga/blooming love.png";

const avatar = (n) => `https://i.pravatar.cc/80?img=${n}`;

// --- Main manga record ------------------------------------------------------
export const mockMangaDetail = {
  id: "mock-detail-1",
  title: "Blooming Love",
  description:
    "One day, when I was making school supplies in the art room, a very scary-looking girl was staring at me...!? Crafts girl vs. art boy romantic comedy!!",
  coverUrl: bloomingLove,
  author: "(Creator name)",
  genre: "(Genre), (Genre 1)",
  isPlatform: false,
  source: "platform",
  isMock: true,

  // "About the Manga" card
  about: {
    status: "Completed",
    ageRating: "16+",
    genres: ["Love Story", "Thriller"],
    languages: ["English", "ภาษาไทย"],
    impressions: "1,637,993.33",
  },

  // "Main Characters" card
  characters: [
    { id: "ch1", name: "(Creator name 1)", avatar: avatar(11) },
    { id: "ch2", name: "(Creator name 2)", avatar: avatar(24) },
  ],

  // "Rights" card — label / value rows
  rights: [
    { label: "Story Writer:", value: "(Story Writer name)" },
    { label: "Manga Visual Designer:", value: "(Creator name)" },
  ],

  // "Share on Social Media" card
  socials: ["discord", "reddit", "telegram", "x", "threads", "instagram", "linkedin"],
};

// --- Chapter list -----------------------------------------------------------
// `subtitle` overrides the date line, `isContinue` renders the teal
// "(Continue reading)" state, `boosted` shows the rocket icon.
const chapterTitles = [
  null, // "Chapter 1"
  null, // "Chapter 2" — continue reading
  null, // "Chapter 3" — boosted
  null,
  null,
  null,
  null,
  null,
  null,
  "A days in love",
  "Choose",
  "pika bye",
];

export const mockDetailChapters = chapterTitles.map((title, i) => ({
  id: `mock-ch-${i + 1}`,
  chapter: String(i + 1),
  episodeNumber: i + 1,
  title,
  createdAt: "2025-05-08T00:00:00.000Z",
  translatedLanguage: "en",
  rating: 5,
  comments: 124,
  threads: 4,
  views: "24k",
  isContinue: i === 1,
  subtitle: i === 1 ? "Chapter 2" : null,
  isCurrent: i === 2,
  boosted: i === 2,
}));
