// Data for the EzzStar Team Tournament detail screens.
// Transcribed from Figma "Ezzstar new (Copy)" nodes 8475:90863 (Overview),
// 8475:91242 (Prizes), 8475:91124 (Rules), 8475:91390 (Participants) and
// 8475:91639 (Brackets). Swap `tournament` for GET /api/events/:id/detail when
// the backend lands — the shape below is what the screens consume.

import heroImage from "../assets/tournament/hero-cs2.jpg";
import coinFee from "../assets/tournament/coin-fee.png";
import coinReward from "../assets/tournament/coin-spca.png";
import hostLogo from "../assets/tournament/host-esl.png";
import medalGold from "../assets/tournament/medal-gold.png";
import medalSilver from "../assets/tournament/medal-silver.png";
import medalBronze from "../assets/tournament/medal-bronze.png";
import avatarFallback from "../assets/tournament/avatar-fallback.png";
import iconUsers from "../assets/tournament/icon-users.svg";
import iconFaqToggle from "../assets/tournament/icon-faq-toggle.svg";
import bracketTeamA from "../assets/tournament/bracket-team-a.jpg";
import bracketTeamB from "../assets/tournament/bracket-team-b.png";

const globUrls = (glob) =>
  Object.entries(glob)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, url]) => url);

const teamLogos = globUrls(
  import.meta.glob("../assets/tournament/team-*.png", {
    eager: true,
    query: "?url",
    import: "default",
  }),
);

const platformIcons = globUrls(
  import.meta.glob("../assets/tournament/platform-*.{png,jpg}", {
    eager: true,
    query: "?url",
    import: "default",
  }),
);

export const tournamentAssets = {
  heroImage,
  coinFee,
  coinReward,
  hostLogo,
  avatarFallback,
  iconUsers,
  iconFaqToggle,
  medals: { gold: medalGold, silver: medalSilver, bronze: medalBronze },
  teamLogos,
  platformIcons,
  bracketTeamA,
  bracketTeamB,
};

// The tab strip in every frame carries the same six pills; the active pill is
// the only thing that changes between screens. `slug` is the nested route.
export const tournamentTabs = [
  { label: "Overview", slug: "overview" },
  { label: "Prizes", slug: "prizes" },
  { label: "Rules", slug: "rules" },
  { label: "Participants", slug: "participants" },
  { label: "Brackets", slug: "brackets" },
  { label: "Matches", slug: "matches" },
];

export const tournament = {
  id: "counter-strike-2-tournament",
  title: "Counter Strike 2 Tournament",
  tags: [
    { label: "Live", tone: "live" },
    { label: "Game Jam", tone: "category" },
  ],
  registration: { label: "Closed", tone: "closed" },
  entryFee: { label: "Fee: 250", icon: coinFee },
  reward: { label: "1500 $SPCA", icon: coinReward },
  countdownLabel: "Tournament Starts-In",
  countdown: [
    { value: "0", unit: "days" },
    { value: "00", unit: "hours" },
    { value: "00", unit: "mins" },
    { value: "00", unit: "secs" },
  ],
  host: { name: "ESL Sports", logo: hostLogo },
  size: { label: "32 Teams", icon: iconUsers },
  platforms: platformIcons.slice(0, 4),
  timeline: [
    { label: "Tournament Starts From", date: "12 April 2025" },
    { label: "Tournament End Date", date: "12 May 2025" },
  ],
};

export const description = `ABOUT 8 BALL POOL WINTER TOURNAMENT 14

Please contact the Tournament Organizer on Discord for any questions and issues regarding gameplay, scores, match schedules, registration status, Game ID, and more.
Discord Link: (https://discord.gg/8WgwNNAjus)
PLATFORMS: MOBILE

GAME LINKS IOS AND ANDROID:
https://play.google.com/store/apps/details?id=com.miniclip.eightballpool&hl=ar&gl=US
https://apps.apple.com/us/app/8-ball-pool/id543186831

HOW TO CREATE A GAME:
• After adding the opponent as a Friend
• 1) Both players go to Cues and choose Beginner Cue for fair play
• 2) Press on the friend list
• 3) Press the Challenge bottom on your opponent's name
• 4) Choose the 200 coins prize pool(SYDNEY Marina Bar)
• 5) Both players accepts and have fun

SCORE SUBMISSION RULES:
• You must send a photo proving your victory and clarify the ID of the competitor when recording the results
• Lack of attaching your score image may attempt you losing the match
• Players who are late for more than 15 minutes will be disqualified
• If the opponent didn't accept your Friend Request, you must submit a screenshot as proof showing the time 15 mins after the match starts and the Friend request of the opponent
• In the event, the opponent does not respond, you must register attendance at the official time allotted to the match. (The button appears in your matches list after 15 mins from when the match started)
• Waiting time is 15 minutes. In case of no response, the player is considered withdrawn from the match
• In the event the attendance no result is transmitted by both parties, one of the Parties will randomly qualify
• Match should be played at a specified time aligned with the tournament schedule. It is possible to play before the specified time if both parties agree(A Screenshot Must be taken and sent to the Organizer of the Conversation of acceptance of the two parties)

HERE ARE THE STEPS TO SUBMIT SCORES:
Score Submission Video
• Login to Kafu Games & go to “My Tournaments”
• Select your Tournament
• Click on the “Matches” tab
• Click on “Submit Scores”
• Enter your score, upload the screenshot, and click “Done”
• Submitting the score will be available after 15 minutes of your match time for 60 minutes`;

export const rules = `⚠️ Rules & Regulations: TPP Only | Mobile Players Only
No Emulators
Strictly No Cheats (ESP, hacks, modding, GFX tools)
No Stream Sniping – monitored throughout
Slot Misplacement: 1 warning, then DQ
Respect & Fair Play: No toxic behavior or abusive language
Clean Team Names: No inappropriate or offensive content
No VPN or Ping Manipulation Tools
All devices/accounts must follow PUBG MOBILE Esports rules
❗ Violation of any rule can result in disqualification without refund.`;

export const prizes = {
  places: [
    { place: "1st. Place", amount: "1,000 SPCA", tone: "gold", medal: medalGold },
    { place: "2nd. Place", amount: "600 SPCA", tone: "silver", medal: medalSilver },
    { place: "3rd. Place", amount: "400 SPCA", tone: "bronze", medal: medalBronze },
    { place: "4th. Place", amount: "300 SPCA", tone: "plain", medal: null },
    { place: "5th. Place", amount: "200 SPCA", tone: "plain", medal: null },
  ],
  total: { label: "Total Prize", amount: "2,500 SPCA" },
};

const DEFAULT_LINEUP = ["ACExZisanOP", "ACExArafat", "ACExAadeyan7"];

const teamNames = [
  "1HP eSports",
  "GHOST SQUAD",
  "Rajshahi Rising Stars",
  "ACE LEGENDS",
  "KaResports",
  "SF71",
  "Death Four Win",
  "MARKxNEXT LEVEL",
  "ShadowAceEsports",
  "Fallan Dream Reborn",
  "NIGHTMARE OFFICIAL",
  "SiL3Nt Esports",
  "GEARS OFF KILL",
  "NN ESPORTS",
  "Skull",
  "GENIE ESPORT",
  "PETAHERTZ Esports",
  "STRAWHAT ESPORTS",
];

const lineupOverrides = {
  "Rajshahi Rising Stars": ["A.B.Nur", "NxMUッNlGGA", "XT乂SeaSMOKE"],
};

export const participants = teamNames.map((name, index) => ({
  name,
  logo: teamLogos[index] ?? avatarFallback,
  lineup: lineupOverrides[name] ?? DEFAULT_LINEUP,
  extraCount: 4,
}));

export const faq = {
  heading: "Frequently Asked Questions",
  subheading:
    "Unleashing clarity and empowering decision-making. Find in-depth answers and gain deeper understanding.",
  action: { label: "Support Center", href: "#support" },
  items: [
    {
      question: "What is  Ezzstar Social?",
      answer:
        "Ezzstar Social is a creator and gamer platform where you can share content, participate in event, upgrade your profile, earn Spica, and boost your visibility and growth.",
    },
    {
      question: "How do i earn Spica on the platform ?",
      answer:
        "You can earn Spica by posting content, views, receiving tips from audience, reading your favorite content, engaging with the community, and participating in events.",
    },
    {
      question: "What is the NFT Signature, and why is it important?",
      answer:
        "Your NFT Signature is the on-chain identity attached to everything you publish on Ezzstar. It proves authorship, travels with the work, and lets tips and royalties route back to you automatically.",
    },
    {
      question: "Do I need crypto knowledge to use Ezzstar Social?",
      answer:
        "No. You can sign up with an email, create and read content, and collect Spica without touching a wallet. Connecting one only becomes useful when you want to withdraw.",
    },
    {
      question: "Can I use another payment option to receive tips?",
      answer:
        "Tips settle in Spica by default. Once your wallet is connected you can convert and withdraw through any payout method supported in your region.",
    },
  ],
};

const step = (start, count, gap) =>
  Array.from({ length: count }, (_, i) => start + i * gap);

// Round 1 pairings repeat two logo variants down the ladder in Figma.
const bracketPair = [
  [
    { name: "Focus_xp1", handle: "gamer6611", logo: bracketTeamA },
    { name: "Kimoplame", handle: "gaymer15", logo: avatarFallback },
  ],
  [
    { name: "Focus_xp1", handle: "gamer6611", logo: bracketTeamB },
    { name: "Kimoplame", handle: "gaymer15", logo: bracketTeamA },
  ],
];

// Absolute geometry lifted from Figma node 8475:91697 ("Bracks", 1585x3532).
// The screen scales this canvas rather than recomputing the ladder, so the
// connectors stay glued to the cards at every viewport.
export const brackets = {
  views: ["Rounds", "Finals"],
  kickoff: "06-Apr-2024 1:00AM",
  canvas: { width: 1585, height: 3532 },
  cardWidth: 329,
  rounds: [
    {
      label: "Round 1",
      x: 0,
      labelX: 0,
      cardHeight: 180,
      ys: step(52, 16, 220),
      teams: (index) => bracketPair[index % 2],
    },
    { label: "Round 2", x: 496, labelX: 496, cardHeight: 148, ys: [129, 620, 1015, 1506, 1897, 2388, 2779, 3270] },
    { label: "Round 3", x: 768, labelX: 778, cardHeight: 148, ys: [372, 1258, 2140, 3022] },
    { label: "Round 4", x: 1256, labelX: 1256, cardHeight: 148, ys: [810, 2575] },
  ],
  // Elbows are drawn with a border on top/right/bottom only (no left edge),
  // exactly how the Figma rectangles are stroked. Positions are verbatim from
  // Figma — the ladder is not perfectly periodic, so they are listed, not derived.
  connectors: [
    { x: 328, w: 114, h: 270, ys: [102, 988, 1870, 2752] },
    { x: 328, w: 114, h: 241, ys: [573, 1459, 2341, 3223] },
    { x: 442, w: 53, h: 1, ys: [202, 693, 1088, 1579, 1970, 2461, 2852, 3343] },
    { x: 612, w: 114, h: 493, ys: [200, 1086, 1968, 2850] },
    { x: 726, w: 53, h: 1, ys: [446, 1332, 2214, 3096] },
    { x: 1098, w: 114, h: 875, ys: [447, 2212] },
    { x: 1212, w: 53, h: 1, ys: [884, 2649] },
  ].flatMap(({ x, w, h, ys }) => ys.map((y) => ({ x, y, w, h }))),
};

export default tournament;
