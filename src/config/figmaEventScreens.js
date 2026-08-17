// Backend-shaped fallback for Figma node 8475:90863.
// Replace with GET /api/events/:eventId/detail; asset URLs should become CDN URLs.
export const figmaEventAssets = {
  hero: "https://www.figma.com/api/mcp/asset/bf5a8e45-2dcc-45dc-96c5-5b528dd18df4.png",
  brand: "https://www.figma.com/api/mcp/asset/23597818-a926-4403-bac2-d7421f6c0554.png",
  profile: "https://www.figma.com/api/mcp/asset/43394f54-e8f8-45ef-b772-8ac28c8c7c3a.png",
  host: "https://www.figma.com/api/mcp/asset/ffd228ee-8519-4646-842f-9bb13a452ec7.png",
  game: "https://www.figma.com/api/mcp/asset/20f8790e-b7c3-4d39-83ed-76923fe0152f.png",
  platforms: [
    "https://www.figma.com/api/mcp/asset/c97aa6d8-c56f-43b1-a795-5cdfa256fc4e.png",
    "https://www.figma.com/api/mcp/asset/db9d0f0b-7e57-4e6b-83d3-66c282fc91a5.png",
    "https://www.figma.com/api/mcp/asset/0ecf4d0b-0917-42d5-940d-6dcf8ac50d04.png",
    "https://www.figma.com/api/mcp/asset/160bd4fe-b8e7-451e-bb73-b4ab13cf9590.png",
  ],
  search: "https://www.figma.com/api/mcp/asset/a2767767-3248-42d2-a47b-9ded05802834.svg",
  social: {
    linkedin: "https://www.figma.com/api/mcp/asset/4fffab27-50ac-43ea-8571-4163c1414a29.svg",
    instagram: "https://www.figma.com/api/mcp/asset/cc5b278b-634f-4e53-bec6-0e3f65afec0f.svg",
    x: "https://www.figma.com/api/mcp/asset/a81134b5-40c7-4346-a291-1b1dbbedad34.svg",
    telegram: "https://www.figma.com/api/mcp/asset/e937d6bb-0064-4a61-8241-4efa15c20db2.svg",
    discord: "https://www.figma.com/api/mcp/asset/2df989e7-47a7-43e2-8b13-af92c7466425.svg",
    facebook: "https://www.figma.com/api/mcp/asset/b0ab49e0-248d-4068-a601-6b298e4fd37f.svg",
  },
  users: "https://www.figma.com/api/mcp/asset/178bacb9-9742-4024-adfa-6348527b653b.svg",
};

export const figmaEventScreenData = {
  id: "1", title: "Counter Strike 2 Tournament", status: "Closed", category: "Game Jam",
  fee: 250, reward: 1500, currency: "SPCA", countdown: { days: 0, hours: 0, mins: 0, secs: 0 },
  heroImage: figmaEventAssets.hero, brandImage: figmaEventAssets.brand, profileImage: figmaEventAssets.profile,
  hostedBy: { name: "ESL Esports", avatar: figmaEventAssets.host },
  timeline: { startsAt: "12 May 2025", endsAt: "12 May 2025" }, venue: "Online", contestantsCount: 134,
  platform: ["Discord", "Facebook", "YouTube", "Steam"],
  description: ["ABOUT 8 BALL POOL TOURNAMENT 14", "Please read the tournament organizer’s rules and prerequisites carefully. You may need to prepare an account, follow the registration steps, and submit scores before the match deadline.", "Discord Link: https://discord.gg/your-tournament", "PLATFORMS: MOBILE", "GAME RULES AND REGULATION:", "• After entering the application, add your opponent via Unique ID.\n• Practice matches are not allowed.\n• All matches are best of 3; finals are best of 5.\n• Players who are late for more than 15 minutes will be disqualified.", "SCORE SUBMISSION RULES", "• Your submitted photo must prove the victory and identify the competitor.\n• Missing score evidence can result in losing the match."],
  prizes: [{ place: "1st.", amount: 120, tone: "gold", medal: "🥇" }, { place: "2nd.", amount: 80, tone: "silver", medal: "🥈" }, { place: "3rd.", amount: 40, tone: "bronze", medal: "🥉" }],
  upgrade: { message: "Explore relevant profile themes with Star Plan" }, contestants: [],
};

export default figmaEventScreenData;
