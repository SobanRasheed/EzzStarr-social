// Data for the EzzStar Team Tournament detail screens.
// Transcribed from Figma "Ezzstar new (Copy)" nodes 8475:90863 (Overview),
// 8475:91242 (Prizes), 8475:91124 (Rules), 8475:91390 (Participants) and
// 8475:91639 (Brackets). Swap `tournament` for GET /api/events/:id/detail when
// the backend lands — the shape below is what the screens consume.

import heroImage from "../assets/tournament/hero-cs2.jpg";
import coinFee from "../assets/tournament/coin-fee.png";
import coinReward from "../assets/tournament/coin-spca.png";
import buttonLeading from "../assets/tournament/button-leading.png";
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
  buttonLeading,
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
