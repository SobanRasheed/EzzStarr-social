// Dev-only fallback data. Used ONLY when the API fetch fails so the
// pre-login home screen can be styled without a live backend.
// Real API data takes over automatically once VITE_API_URL responds.

import dandena from "../assets/manga/Dandena.png";
import spyFamily from "../assets/manga/Spy x Family.png";
import bloomingLove from "../assets/manga/blooming love.png";
import hunterxhunter from "../assets/manga/hunterxhunter.png";
import lastWish from "../assets/manga/last wish.png";
import naruto from "../assets/manga/naruto.png";
import sakaotodays from "../assets/manga/sakaotodays.png";
import skiki from "../assets/manga/skiki.png";
import yuriOnIce from "../assets/manga/yuri on ice.png";

import neonDragon from "../assets/Stories/neon dragon.png";
import goodThings from "../assets/Stories/good things are coming.png";
import warAndWorlds from "../assets/Stories/war and worlds.png";
import infidel from "../assets/Stories/Infidel.png";
import sense from "../assets/Stories/sense.png";
import scienceFiction from "../assets/Stories/the science fiction.png";
import wells from "../assets/Stories/wells.png";
import hgWells from "../assets/Stories/hg wells the science fiction.png";

export const mockMangas = [
  {
    id: "m1",
    imageUrl: dandena,
    title: "Dandena",
    author: "K. Tanaka",
    genre: "Action, Cyberpunk",
    description:
      "A masterless samurai wanders a neon-drenched megacity hunting the syndicate that erased his past.",
    isPlatform: true,
  },
  {
    id: "m2",
    imageUrl: spyFamily,
    title: "Spy × Family",
    author: "Tatsuya Endo",
    genre: "Action, Comedy",
    description:
      "A spy must build a fake family to execute a mission, not realizing that the girl he adopts is a telepath.",
    isPlatform: true,
  },
  {
    id: "m3",
    imageUrl: hunterxhunter,
    title: "Hunter × Hunter",
    author: "Yoshihiro Togashi",
    genre: "Adventure, Fantasy",
    description:
      "A young boy sets out to become a Hunter and find his estranged father.",
    isPlatform: false,
  },
  {
    id: "m4",
    imageUrl: naruto,
    title: "Naruto",
    author: "Masashi Kishimoto",
    genre: "Action, Adventure",
    description:
      "A young ninja seeks recognition and dreams of becoming the leader of his village.",
    isPlatform: true,
  },
  {
    id: "m5",
    imageUrl: bloomingLove,
    title: "Blooming Love",
    author: "H. Yamamoto",
    genre: "Romance, Drama",
    description:
      "Two strangers cross paths in a botanical garden and discover a love that blooms through the seasons.",
    isPlatform: false,
  },
  {
    id: "m6",
    imageUrl: lastWish,
    title: "Last Wish",
    author: "D. Cole",
    genre: "Fantasy, Adventure",
    description:
      "A wanderer chases the legend of a wish-granting shrine hidden deep within a cursed forest.",
    isPlatform: true,
  },
  {
    id: "m7",
    imageUrl: sakaotodays,
    title: "Sakamoto Days",
    author: "Yuto Suzuki",
    genre: "Action, Comedy",
    description:
      "A retired hitman-turned-shopkeeper gets pulled back into the underworld he tried to leave behind.",
    isPlatform: true,
  },
  {
    id: "m8",
    imageUrl: skiki,
    title: "Shiki",
    author: "Fuyumi Ono",
    genre: "Horror, Mystery",
    description:
      "When the tide pulls back, a coastal town discovers what the sea has been hiding for a century.",
    isPlatform: false,
  },
  {
    id: "m9",
    imageUrl: yuriOnIce,
    title: "Yuri on Ice",
    author: "Mitsurō Kubo",
    genre: "Sports, Drama",
    description:
      "A figure skater on the verge of retirement gets a second chance when a champion coach appears.",
    isPlatform: true,
  },
];

export const mockStories = [
  {
    id: "s1",
    imageUrl: neonDragon,
    title: "Neon Dragons",
    author: "Iskeski Sui",
    genres: ["Action", "Mystery"],
  },
  {
    id: "s2",
    imageUrl: warAndWorlds,
    title: "War and Worlds",
    author: "H.G. Wells",
    genres: ["Sci-Fi", "Classic"],
  },
  {
    id: "s3",
    imageUrl: goodThings,
    title: "Good Things Are Coming",
    author: "Marco Vidal",
    genres: ["Drama"],
  },
  {
    id: "s4",
    imageUrl: infidel,
    title: "Infidel",
    author: "Ayaan Hirsi",
    genres: ["Thriller"],
  },
  {
    id: "s5",
    imageUrl: sense,
    title: "Sense",
    author: "Nadia Rahman",
    genres: ["Romance"],
  },
  {
    id: "s6",
    imageUrl: scienceFiction,
    title: "The Science Fiction",
    author: "Arthur C. Clarke",
    genres: ["Sci-Fi"],
  },
  {
    id: "s7",
    imageUrl: wells,
    title: "Wells",
    author: "H.G. Wells",
    genres: ["Classic", "Sci-Fi"],
  },
  {
    id: "s8",
    imageUrl: hgWells,
    title: "HG Wells: The Science Fiction",
    author: "H.G. Wells",
    genres: ["Classic"],
  },
];
