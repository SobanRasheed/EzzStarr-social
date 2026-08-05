/**
 * Mock data for the Story Detail page (node 8475:95711).
 *
 * ⚠️ FRONTEND PLACEHOLDER DATA — for the backend developer:
 * Everything here is hardcoded sample content so the story screen renders
 * without a live backend. StoryDetailPage falls back to these values only for
 * fields the real API did not supply, so real data takes over automatically.
 *   - mockStoryDetail.parts    -> GET /api/stories/:id/parts
 *   - mockStoryThreads         -> GET /api/stories/:id/threads
 *   - mockStoryRecommendations -> GET /api/stories/:id/recommended
 * Keep the field names below — they are the contract the UI reads.
 */

import infidel from "../assets/Stories/Infidel.png";
import warAndWorlds from "../assets/Stories/war and worlds.png";
import theScienceFiction from "../assets/Stories/the science fiction.png";
import sense from "../assets/Stories/sense.png";
import neonDragon from "../assets/Stories/neon dragon.png";
import wells from "../assets/Stories/wells.png";
import goodThings from "../assets/Stories/good things are coming.png";
import hgWells from "../assets/Stories/hg wells the science fiction.png";

const avatar = (n) => `https://i.pravatar.cc/72?img=${n}`;

// --- Main story record ------------------------------------------------------
export const mockStoryDetail = {
  id: "mock-story-1",
  title: "Infidel",
  coverUrl: infidel,
  artist: "Aaron Campbell",
  genres: ["Horror", "Thriller"],
  about:
    "A haunted house story for the 21st century, INFIDEL follows an American Muslim woman and her multi-racial neighbors who move into a building haunted by entities that feed off xenophobia.",
  writer: { name: "Pornsak Pichetshote", avatar: avatar(12) },
  earnAmount: "0.00005",
  views: "42,312",
  stars: 5,
  comments: 124,
};

// --- Parts list ------------------------------------------------------------
export const mockStoryParts = [1, 2, 3, 4, 5].map((n) => ({
  id: `mock-part-${n}`,
  label: `Part ${n}`,
  date: "8 May 2025",
  thumbnail: infidel,
  stars: 5,
  comments: 2,
}));

// --- Story body ------------------------------------------------------------
export const mockStoryContent = `Jim Caviezel, an American professor known for his vocal opposition to militant uprisings in the Middle East, had been invited to Cairo by an old friend, a fellow scholar. The invitation seemed innocent enough at first, a chance to speak out about the growing political unrest in the region. Little did Jim know, his visit would soon plunge him into a nightmare.

Upon arriving in Cairo, Jim's friend greeted him warmly, and they immediately began discussing the rising tensions in the country. The conversation, however, took a dark turn when Jim was ambushed by a group of armed men. Before he could react, they forced him into a black van, blindfolding him and taking him to an unknown location. His friend, who had appeared so genuine, was nowhere to be found. Jim was now a pawn in a game he didn't understand.

Back in the United States, Jim's wife, Sarah, was preparing for a quiet weekend when the phone call came. Her heart sank as she listened to the news — Jim had been kidnapped in Cairo. The voice on the other end of the line, a frantic reporter, explained that Jim had been taken by a militant group. They believed he had information on the recent uprisings, and they wanted him to talk.

Sarah's world shattered. She knew Jim well enough to know that he wouldn't give in to their demands. But the idea of him being held captive, possibly tortured, filled her with dread. She couldn't sit back and wait for someone else to save him. Sarah was determined. She was going to Cairo, no matter the cost.

With a heart full of fear and determination, Sarah packed her bags and booked the earliest flight to Egypt. She barely had time to think as she hurried through airport security, her mind racing. She knew nothing about the city, its dangers, or the political climate that had led to Jim's abduction. But what she did know was that she loved him, and she wouldn't let him go without a fight.

Arriving in Cairo, Sarah was met with a chaotic city, streets crowded with people protesting against the government. She could feel the tension in the air, thick with anger and distrust. The last thing she wanted was to draw attention to herself, but she had no choice. Her first stop was the American embassy, hoping they could help. But even there, the officials seemed distant, overwhelmed by the growing unrest.

Sarah was not one to be easily deterred. She refused to accept the embassy's formalities and red tape. The security team provided her with some guidance, but it was clear they couldn't offer much help in a city so gripped by violence. She decided to take matters into her own hands. She knew that Jim was a man of principles, someone who would never give up easily. That meant, in her heart, she believed he was still alive.

Sarah's only lead was a few blurry details from the news reports and a cryptic message from Jim's colleague, who had last seen him before the abduction. The message mentioned something about a hidden safe house, a place where Jim might be held. Sarah's heart raced. The name of the place didn't ring any bells, but it was her only chance.

Without wasting any more time, Sarah hired a local guide to help her navigate the city's underground network. The guide, a man named Tariq, was cautious but willing to help. He had seen the aftermath of the uprisings firsthand and understood the gravity of the situation. The two of them set off into the labyrinthine streets of Cairo, weaving through crowds and back alleys, always on the lookout for danger.

Meanwhile, Jim's captors were growing frustrated. They had expected him to break under pressure, to reveal what he knew about the uprisings and the movement behind them. But Jim, though bruised and exhausted, remained defiant. He refused to speak, refusing to betray his principles or reveal any information that might endanger others.

Days turned into weeks, and Sarah's hope began to waver. The city's political situation continued to worsen, making it harder for her to get close to Jim's captors. She had barely enough money left to stay in Cairo, and the danger was escalating by the hour. But Sarah knew that if she gave up now, she would lose Jim forever.

Then, one fateful night, Tariq received a call. The voice on the other end was familiar to him — one of his old contacts in the underground movement. The man mentioned a location — a rundown building near the outskirts of the city, a place known for housing captives. It wasn't much, but it was a lead Sarah couldn't ignore.

With renewed determination, Sarah set off with Tariq to the building. They approached cautiously, aware of the danger around them. The streets were eerily quiet, the air thick with the scent of decay and desperation. As they arrived at the location, Sarah's heart raced. She could feel that this was it — the place where Jim was being held — but the danger surrounding them was palpable.

They carefully entered the building, making their way through the darkened halls. The sound of muffled voices echoed in the distance. Sarah's heart raced as she crept closer, praying that Jim was still alive, still holding on. She turned a corner and saw him — disheveled but alive — sitting against the wall, bound but not broken.

"Jim!" she cried, rushing to his side. Her voice cracked as she called his name. His eyes fluttered open, and for a moment, all the exhaustion and violent unrest around them melted away.

"Sarah… you found me," he whispered. "I'll always find you," she replied, her voice full of determination.

Together, they escaped the building, but their journey wasn't over yet. They still had to navigate their way out of Cairo, through the chaos and the danger that awaited them. The city was no longer the place they had known before, it was a place of unrest, of violence, and of unspoken fears. But it was a place they would fight through, together.

As they boarded a plane back to the United States, Sarah looked at Jim, her heart full of gratitude. They had made it through the worst. But she knew one thing: nothing would ever be the same again. They had changed, had their lives had taken on a deeper meaning.

The nightmare was over, for now. But Sarah knew that the fight for peace, for justice, was far from over. She would continue to stand by Jim, no matter the cost. The journey they had started together had only just begun.`;

// --- Story threads ---------------------------------------------------------
// `storyRef` renders the bordered part-reference box; `image` renders the
// thumbnail on the right of the text. The design alternates between the two.
export const mockStoryThreads = [
  {
    id: "mock-thread-1",
    author: "Mikasa yager",
    avatar: avatar(31),
    category: "Confession",
    time: "about 1 hour ago",
    content:
      "New Apex Legend cheat brings smurfing in low ranked lobbies to a whole new level Visit",
    image: infidel,
    storyRef: null,
    stars: 5,
    replies: 12,
    views: "42K",
  },
  {
    id: "mock-thread-2",
    author: "Mikasa yager",
    avatar: avatar(48),
    category: "Confession",
    time: "about 1 hour ago",
    content:
      "New Apex Legend cheat brings smurfing in low ranked lobbies to a whole new level Visit New",
    image: null,
    storyRef: { title: "Infidel", part: "Part 2", thumbnail: infidel },
    stars: 5,
    replies: 12,
    views: "42K",
  },
  {
    id: "mock-thread-3",
    author: "Mikasa yager",
    avatar: avatar(15),
    category: "Confession",
    time: "about 1 hour ago",
    content:
      "New Apex Legend cheat brings smurfing in low ranked lobbies to a whole new level Visit New",
    image: null,
    storyRef: { title: "Infidel", part: "Part 3", thumbnail: infidel },
    stars: 5,
    replies: 12,
    views: "42K",
  },
  {
    id: "mock-thread-4",
    author: "Mikasa yager",
    avatar: avatar(52),
    category: "Confession",
    time: "about 1 hour ago",
    content:
      "New Apex Legend cheat brings smurfing in low ranked lobbies to a whole new level Visit",
    image: infidel,
    storyRef: null,
    stars: 5,
    replies: 12,
    views: "42K",
  },
];

// --- Recommendations -------------------------------------------------------
// `boosted` draws the yellow border + glow and the rocket icon.
export const mockStoryRecommendations = [
  { id: "rec-1", title: "Infidel", genre: "Horror", image: infidel, boosted: true },
  {
    id: "rec-2",
    title: "H.G. Wells: The Science Fiction",
    genre: "Sci-fi, Action, Mystery",
    image: warAndWorlds,
    boosted: true,
  },
  {
    id: "rec-3",
    title: "H.G. Wells: The Science Fiction",
    genre: "Sci-fi, Action, Mystery",
    image: theScienceFiction,
    boosted: true,
  },
  {
    id: "rec-4",
    title: "A Cyberpunk Ghost Story",
    genre: "Sci-fi Action",
    image: sense,
    boosted: false,
  },
  {
    id: "rec-5",
    title: "Neon Dragons - A Cyberpunk",
    genre: "Action, Mystery",
    image: neonDragon,
    boosted: false,
  },
  {
    id: "rec-6",
    title: "H.G. Wells: The Science Fiction",
    genre: "Sci-fi, Action, Mystery",
    image: wells,
    boosted: false,
  },
  {
    id: "rec-7",
    title: "H.G. Wells: The Science Fiction",
    genre: "Sci-fi, Action, Mystery",
    image: goodThings,
    boosted: false,
  },
  {
    id: "rec-8",
    title: "H.G. Wells: The Science Fiction",
    genre: "Sci-fi, Action, Mystery",
    image: hgWells,
    boosted: false,
  },
];
