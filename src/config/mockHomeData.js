// Dev-only fallback data. Used ONLY when the API fetch fails so the
// pre-login home screen can be styled without a live backend.
// Real API data takes over automatically once VITE_API_URL responds.

const cover = (seed) =>
  `https://picsum.photos/seed/${seed}/300/400`;

export const mockMangas = [
  {
    id: "m1",
    imageUrl: cover("manga1"),
    title: "Neon Ronin",
    author: "K. Tanaka",
    genre: "Action, Cyberpunk",
    description:
      "A masterless samurai wanders a neon-drenched megacity hunting the syndicate that erased his past.",
    isPlatform: true,
  },
  {
    id: "m2",
    imageUrl: cover("manga2"),
    title: "Starfall Academy",
    author: "R. Mendez",
    genre: "Fantasy, School",
    description:
      "Students at a floating academy learn to bend starlight, but one transfer hides a dangerous secret.",
    isPlatform: true,
  },
  {
    id: "m3",
    imageUrl: cover("manga3"),
    title: "Hollow Tide",
    author: "A. Okafor",
    genre: "Horror, Mystery",
    description:
      "When the tide pulls back, a coastal town discovers what the sea has been hiding for a century.",
    isPlatform: false,
  },
  {
    id: "m4",
    imageUrl: cover("manga4"),
    title: "Iron Blossom",
    author: "S. Petrova",
    genre: "Mecha, Drama",
    description:
      "A pilot bonds with a war machine that remembers every soul it has ever carried into battle.",
    isPlatform: true,
  },
  {
    id: "m5",
    imageUrl: cover("manga5"),
    title: "Kitsune Nights",
    author: "H. Yamamoto",
    genre: "Supernatural, Romance",
    description:
      "A lonely shopkeeper strikes a bargain with a fox spirit and slowly falls for the mystery she brings.",
    isPlatform: false,
  },
  {
    id: "m6",
    imageUrl: cover("manga6"),
    title: "Voidrunners",
    author: "D. Cole",
    genre: "Sci-Fi, Adventure",
    description:
      "A crew of salvagers charts the dead zones of space, chasing a signal that should not exist.",
    isPlatform: true,
  },
];

export const mockStories = [
  {
    id: "s1",
    imageUrl: cover("story1"),
    title: "The Last Broadcast",
    author: "Lena Cross",
    genres: ["Thriller"],
  },
  {
    id: "s2",
    imageUrl: cover("story2"),
    title: "Paper Lanterns",
    author: "Yuki Mori",
    genres: ["Romance"],
  },
  {
    id: "s3",
    imageUrl: cover("story3"),
    title: "Ashes of Aurelia",
    author: "Marco Vidal",
    genres: ["Fantasy"],
  },
  {
    id: "s4",
    imageUrl: cover("story4"),
    title: "Signal Lost",
    author: "Nadia Rahman",
    genres: ["Sci-Fi"],
  },
];
