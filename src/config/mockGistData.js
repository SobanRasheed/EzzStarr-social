/**
 * Mock data for the Gist page (nodes 8475:88747, 8475:88868, 8475:89059,
 * 8475:89104, 8475:89139).
 *
 * ⚠️ FRONTEND PLACEHOLDER DATA — for the backend developer:
 * Everything here is hardcoded sample content so the Gist tabs render without
 * a live backend. It is used ONLY as a fallback when the fetch fails
 * (see FeedColumn.jsx / RightSidebar.jsx); real API data takes over automatically.
 *   - mockGists            -> GET /api/gist?filter=<home|popular|recent|joined>
 *   - mockGistGroups       -> GET /api/gist/groups        (Discover tab)
 *   - mockTrendingCreators -> GET /api/gist/creators      (Popular right rail)
 * Shapes below are the contract the UI expects — keep the field names.
 */

const avatar = (n) => `https://i.pravatar.cc/80?img=${n}`;

// --- Feed posts -------------------------------------------------------------
// Matches the props PostCard already reads.
export const mockGists = [
  {
    id: "gist-1",
    author: "Mikasa yager",
    avatar: avatar(12),
    time: "about 1 hour ago",
    type: "Confession",
    title:
      "New Apex Legend cheat brings smurfing in low ranked lobbies to a whole new level Visit",
    images: [],
    stars: 5,
    replies: 12,
    views: "42K",
  },
  {
    id: "gist-2",
    author: "Kelly Wearstler",
    avatar: avatar(24),
    time: "about 2 hours ago",
    type: "Movie",
    title:
      "The new season completely reframes the first three episodes — anyone else catch the callback?",
    images: [],
    stars: 4,
    replies: 31,
    views: "18K",
  },
  {
    id: "gist-3",
    author: "only WTF",
    avatar: avatar(33),
    time: "about 4 hours ago",
    type: "Ask me anything",
    title: "I animated for a studio for nine years. Ask me anything.",
    images: [],
    stars: 5,
    replies: 204,
    views: "96K",
  },
  {
    id: "gist-4",
    author: "Black lip",
    avatar: avatar(45),
    time: "about 6 hours ago",
    type: "Hollywood",
    title: "Practical effects are quietly making a comeback and nobody noticed",
    images: [],
    stars: 4,
    replies: 8,
    views: "7.4K",
  },
  {
    id: "gist-5",
    author: "Pro GuY",
    avatar: avatar(51),
    time: "about 9 hours ago",
    type: "Memes",
    title: "Found the original of that template everyone has been reposting",
    images: [],
    stars: 3,
    replies: 62,
    views: "33K",
  },
  {
    id: "gist-6",
    author: "Yurichann",
    avatar: avatar(63),
    time: "about 12 hours ago",
    type: "Manga",
    title: "Chapter 214 raw scans are out and the pacing finally slows down",
    images: [],
    stars: 5,
    replies: 47,
    views: "51K",
  },
];

// --- Discover tab: gist groups ---------------------------------------------
// `nsfw` swaps the tag glyph; `joined` swaps the pill to the grey "Joined" state.
export const mockGistGroups = [
  {
    id: "grp-1",
    tag: "Confession",
    nsfw: false,
    joined: true,
    avatar: avatar(12),
    startedBy: "Kelly Wearstler",
    totalGists: "430k",
    views: "630k",
    totalGifts: "200 SPCA",
  },
  {
    id: "grp-2",
    tag: "Movie",
    nsfw: false,
    joined: false,
    avatar: avatar(24),
    startedBy: "Chisaa",
    totalGists: "430k",
    views: "630k",
    totalGifts: "200 SPCA",
  },
  {
    id: "grp-3",
    tag: "Ask me anything",
    nsfw: true,
    joined: false,
    avatar: avatar(33),
    startedBy: "only WTF",
    totalGists: "430k",
    views: "630k",
    totalGifts: "200 SPCA",
  },
  {
    id: "grp-4",
    tag: "Hollywood",
    nsfw: false,
    joined: false,
    avatar: avatar(45),
    startedBy: "Black lip",
    totalGists: "430k",
    views: "630k",
    totalGifts: "200 SPCA",
  },
  {
    id: "grp-5",
    tag: "Memes",
    nsfw: false,
    joined: true,
    avatar: avatar(51),
    startedBy: "Pro GuY",
    totalGists: "430k",
    views: "630k",
    totalGifts: "200 SPCA",
  },
  {
    id: "grp-6",
    tag: "Manga",
    nsfw: true,
    joined: false,
    avatar: avatar(63),
    startedBy: "Yurichann",
    totalGists: "430k",
    views: "630k",
    totalGifts: "200 SPCA",
  },
];

// --- Thread detail view (node 8475:89170) ----------------------------------
//   mockGistTopic -> GET /api/gists/topics/:topicId
export const mockGistTopic = {
  _id: "mock-topic-1",
  title:
    "New Apex Legend cheat brings smurfing in low ranked lobbies to a whole new level Visit",
  body: "Been running into this in nearly every match this week. The aim traces are subtle enough that most people just assume it is a good player, but if you spectate for two rounds it becomes obvious.\n\nCurious whether anyone has had luck getting these reported accounts actioned.",
  createdAt: "2025-05-08T00:00:00.000Z",
  creatorId: {
    username: "mikasayager",
    displayName: "Mikasa yager",
    profilePic: avatar(12),
  },
  qualifiedViewCount: "42K",
  commentCount: 12,
  shareCount: 4,
};

// --- Popular tab: trending creators rail -----------------------------------
export const mockTrendingCreators = [
  { id: "cr-1", name: "Mux Michel", threads: "123.9k", avatar: avatar(15), thumbnail: avatar(15) },
  { id: "cr-2", name: "Ezzstar", threads: "90k", avatar: avatar(26), thumbnail: avatar(26) },
  { id: "cr-3", name: "Saachi singh", threads: "44k", avatar: avatar(38), thumbnail: avatar(38) },
  { id: "cr-4", name: "Mux Michel", threads: "2.3k", avatar: avatar(15), thumbnail: null },
  { id: "cr-5", name: "yuiorio", threads: "1.2k", avatar: avatar(47), thumbnail: null },
  { id: "cr-6", name: "Mux Michel", threads: "810", avatar: avatar(15), thumbnail: null },
];
