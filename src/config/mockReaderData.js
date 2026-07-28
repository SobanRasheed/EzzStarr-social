/**
 * Mock data for the Manga Reader flow (reader page, comments panel, threads panel).
 *
 * ⚠️ FRONTEND PLACEHOLDER DATA — for the backend developer:
 * Everything in this file is hardcoded sample content so the UI renders during
 * development. Replace each export with real API data when wiring the backend:
 *   - readerComments  -> GET /api/manga/chapter/:id/comments
 *   - readerThreads   -> GET /api/manga/:id/threads (gists)
 *   - mockReaderPages -> only a dev fallback; real pages already come from
 *                        GET /api/manga/chapter/:id/pages (see MangaReader.jsx)
 * Shapes below are the contract the UI expects — keep the field names.
 */

const avatar = (n) => `https://i.pravatar.cc/80?img=${n}`;

// --- Comments panel (node 8475:94968) --------------------------------------
export const readerComments = [
  {
    id: "c1",
    author: "Saachi Singh",
    avatar: avatar(5),
    time: "about 1 hour ago",
    text: "I was able to keep it from getting personal, and the coworker in the discussion began to make my argument for me.",
    stars: 5,
  },
  {
    id: "c2",
    author: "Steve Singer",
    avatar: null,
    time: "2 days ago",
    text: "it's Miller Time.",
    stars: 5,
  },
  {
    id: "c3",
    author: "Kelly Wearstler",
    avatar: avatar(32),
    time: "7 days ago",
    text: "It is challenging for me to give criticism in general. However, using a framework made the process easier and allowed me to focus more on the end goal.",
    stars: 5,
  },
  {
    id: "c4",
    author: "Steve Singer",
    avatar: null,
    time: "2 days ago",
    text: "it's Miller Time.",
    stars: 5,
  },
  {
    id: "c5",
    author: "Steve Singer",
    avatar: null,
    time: "2 days ago",
    text: "it's Miller Time.",
    stars: 5,
  },
  {
    id: "c6",
    author: "Mux Michal",
    avatar: avatar(12),
    time: "4 days ago",
    text: "I was able to keep it from getting personal, and the coworker in the discussion began to make my argument for me.",
    stars: 5,
  },
  {
    id: "c7",
    author: "Steve Singer",
    avatar: null,
    time: "2 days ago",
    text: "it's Miller Time.",
    stars: 5,
  },
  {
    id: "c8",
    author: "Steve Singer",
    avatar: null,
    time: "2 days ago",
    text: "it's Miller Time.",
    stars: 5,
  },
  {
    id: "c9",
    author: "Saachi Singh",
    avatar: avatar(5),
    time: "about 1 hour ago",
    text: "I was able to keep it from getting personal, and the coworker in the discussion began to make my argument for me.",
    stars: 5,
  },
];

// --- Threads / Gists panel (node 8475:95658) -------------------------------
export const readerThreads = [
  {
    id: "t1",
    author: "Mikasa Yager",
    avatar: avatar(11),
    type: "Confession",
    time: "about 1 hour ago",
    text: "New Apex Legend cheat brings smurfing in low ranked lobbies to a whole new level Visit New",
    // Embedded reference to a story/manga this thread is about.
    reference: {
      title: "Infidel",
      kind: "Story",
      part: "Part 2",
      cover: "https://picsum.photos/seed/infidel/80/100",
    },
    image: null,
    stars: 5,
    replies: 12,
    views: "42K",
  },
  {
    id: "t2",
    author: "Yrti Rei",
    avatar: avatar(15),
    type: "Confession",
    time: "about 1 hour ago",
    text: "New Apex Legend cheat brings smurfing in low ranked lobbies to a whole new level Visit",
    reference: null,
    image: "https://images.unsplash.com/photo-1605902711622-cfb43c44367f?w=200&h=120&fit=crop",
    stars: 5,
    replies: 12,
    views: "42K",
  },
  {
    id: "t3",
    author: "Rei Mummy",
    avatar: avatar(9),
    type: "Confession",
    time: "about 1 hour ago",
    text: "New Apex Legend cheat brings smurfing in low ranked lobbies to a whole new level Visit",
    reference: null,
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=200&h=120&fit=crop",
    stars: 5,
    replies: 12,
    views: "42K",
  },
  {
    id: "t4",
    author: "Yuiii",
    avatar: avatar(20),
    type: "Confession",
    time: "about 1 hour ago",
    text: "New Apex Legend cheat brings smurfing in low ranked lobbies to a whole new level Visit",
    reference: null,
    image: null,
    stars: 5,
    replies: 12,
    views: "42K",
  },
];

// --- Dev-only fallback pages -----------------------------------------------
// Used only if the real /pages endpoint returns nothing during development so
// the reader layout is still visible. Not shipped content.
export const mockReaderPages = Array.from({ length: 8 }).map(
  (_, i) => `https://picsum.photos/seed/mangapage${i + 1}/720/1024`
);

// The logged-in user (bottom composer avatar/handle). Backend: use auth user.
export const currentReaderUser = {
  handle: "Yuiii",
  avatar: avatar(20),
};
