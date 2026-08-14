import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/figma-home.css";

const figmaTime = "https://www.figma.com/api/mcp/asset/9b294320-4dd2-4f86-b0ac-a235c12823e7.svg";
const figmaMember = "https://www.figma.com/api/mcp/asset/2bcd7efe-3209-467e-a181-55432f513499.svg";
const figmaLocation = "https://www.figma.com/api/mcp/asset/d4d2fab3-141b-4db5-8642-62e39f1c043f.svg";
const figmaFaqToggle = "https://www.figma.com/api/mcp/asset/b2753e1d-6704-445f-ba58-2d26deba3a3c.svg";

const heroImage = "https://www.figma.com/api/mcp/asset/7559c1dd-fb9f-4b09-b7c0-532768748c59.png";
const eventImages = [
  "https://www.figma.com/api/mcp/asset/424b6b37-603d-4540-bc86-ceb375bd98be.png",
  "https://www.figma.com/api/mcp/asset/82eee5a5-1069-4d85-8180-a87686c78b82.png",
  "https://www.figma.com/api/mcp/asset/9375c437-cafc-4a53-b0e9-90437be90b82.png",
  "https://www.figma.com/api/mcp/asset/86ffc8e4-f61a-44f4-bbfc-2b7423af4596.png",
  "https://www.figma.com/api/mcp/asset/fbf1fe9c-6891-418e-9e00-b22d624f4ca6.png",
  "https://www.figma.com/api/mcp/asset/4f1f2be6-b728-47d0-8aa7-b87e4801bf0d.png",
  "https://www.figma.com/api/mcp/asset/16b6193f-a005-4764-be12-2cd4dd3e7114.png",
  "https://www.figma.com/api/mcp/asset/582e01c1-6e9a-4f8a-8f35-e995ae0decc3.png",
  "https://www.figma.com/api/mcp/asset/7d7b471e-f776-40b8-ba71-c27582c0b934.png",
  "https://www.figma.com/api/mcp/asset/593e46b7-cfaf-4a75-be6b-70bde347856d.png",
];
const upcoming = [
  { title: "Counter Strike 2 Tournament", organizer: "ESL", tone: "yellow", tags: ["Open", "Upcoming", "E-sports Tournament"], date: "Jan 5, 2025", reward: "1000 SPICA", platform: "Gaming Platform", image: eventImages[0] },
  { title: "Tekken 8 Tournament", organizer: "5 STAR", tone: "white", tags: ["Open", "Upcoming", "E-sports Tournament"], date: "Every Friday: 8PM", reward: "1000 SPICA", platform: "Gaming Platform", image: eventImages[1] },
  { title: "International Cosplay Contest", organizer: "COSPLAY", tone: "purple", tags: ["Open", "Upcoming", "Contest"], date: "Jan 5, 2025", reward: "Weekly SPICA Rewards", platform: "Discord + Online", image: eventImages[2] },
  { title: "Digital Guider", organizer: "DG", tone: "blue", tags: ["Open", "Upcoming", "Tournament"], date: "Every Friday: 8PM", reward: "Weekly SPICA Rewards", platform: "Discord + Online", image: eventImages[3] },
  { title: "Neon Futures Game Jam", organizer: "LEAGUE", tone: "yellow", tags: ["Open", "Upcoming", "Tournament"], date: "Every Friday: 8PM", reward: "1000 SPICA", platform: "Discord + Online", image: eventImages[4] },
  { title: "Game dev Jam: Neon Futures", organizer: "GAME JAM", tone: "purple", tags: ["Open", "Upcoming", "Tournament"], date: "Jan 5, 2025", reward: "Weekly SPICA Rewards", platform: "Gaming Platform", image: eventImages[5] },
  { title: "Cyberpunk Writing Contest 2024", organizer: "V", tone: "red", tags: ["Open", "Upcoming", "Contest"], date: "Every Friday: 8PM", reward: "Weekly SPICA Rewards", platform: "Discord + Online", image: eventImages[6] },
  { title: "Game dev Jam: Neon Futures", organizer: "GAME JAM", tone: "purple", tags: ["Open", "Upcoming", "Tournament"], date: "Jan 26, 2025", reward: "Weekly SPICA Rewards", platform: "Gaming Platform", image: eventImages[7] },
  { title: "Game dev Jam: Neon Futures", organizer: "DG", tone: "blue", tags: ["Open", "Upcoming", "Tournament"], date: "Every Friday: 8PM", reward: "Weekly SPICA Rewards", platform: "Discord + Online", image: eventImages[3] },
  { title: "Game dev Jam: Neon Futures", organizer: "DG", tone: "blue", tags: ["Open", "Upcoming", "Tournament"], date: "Every Friday: 8PM", reward: "Weekly SPICA Rewards", platform: "Discord + Online", image: eventImages[8] },
  { title: "Game dev Jam: Neon Futures", organizer: "XBOX", tone: "green", tags: ["Open", "Upcoming", "Tournament"], date: "Every Friday: 8PM", reward: "Weekly SPICA Rewards", platform: "Gaming Platform", image: eventImages[9] },
  { title: "Game dev Jam: Neon Futures", organizer: "DG", tone: "blue", tags: ["Open", "Upcoming", "Tournament"], date: "Every Friday: 8PM", reward: "Weekly SPICA Rewards", platform: "Discord + Online", image: eventImages[4] },
  { title: "Cyberpunk Writing Contest 2024", organizer: "EZZSTAR", tone: "purple", tags: ["Open", "Upcoming", "Contest"], date: "Jan 5, 2025", reward: "Weekly SPICA Rewards", platform: "Open to Members", image: eventImages[8] },
];
const live = [
  { title: "Digital Guider", game: "Apex Legends", viewers: "12.5K", image: "https://www.figma.com/api/mcp/asset/6f3ca6d6-70a8-4a5f-978f-cc81e781aac3.png" },
  { title: "Cyberpunk Writing Contest 2024", game: "Gaming Platform", viewers: "25.3K", image: "https://www.figma.com/api/mcp/asset/a9b890a4-c5c1-464a-b5c9-fd7867c42053.png" },
  { title: "Game dev Jam: Neon Futures", game: "Gaming Platform", viewers: "18.7K", image: "https://www.figma.com/api/mcp/asset/6f3ca6d6-70a8-4a5f-978f-cc81e781aac3.png" },
  { title: "Game dev Jam: Neon Futures", game: "Gaming Platform", viewers: "31.2K", image: "https://www.figma.com/api/mcp/asset/02ad0818-883d-438e-81f4-54158059e309.png" },
  { title: "Game dev Jam: Neon Futures", game: "Gaming Platform", viewers: "22.8K", image: "https://www.figma.com/api/mcp/asset/b3a253ce-6813-4348-b92f-8aa0bb0cac87.png" },
];
const faqs = [
  ["What is Ezzstar Social?", "Ezzstar Social is a creator and gamer platform where you can share content, participate in events, upgrade your profile, earn Spica, and boost your visibility and growth."],
  ["How do I earn Spica on the platform?", "You can earn Spica by posting content and events, receiving tips from your audience, reading your favorite content, and engaging with the community."],
  ["What is the NFT Signature, and why is it important?", "The NFT Signature helps establish ownership and provenance for creator work shared on Ezzstar Social."],
  ["Do I need crypto knowledge to use Ezzstar Social?", "No. The experience is designed so you can explore, create, and participate without needing advanced crypto knowledge."],
  ["Can I use another payment option to receive tips?", "Available payment options depend on your account and connected wallet configuration."],
];

function Tag({ children, kind }) { return <span className={`figma-tag figma-tag-${kind}`}>{children}</span>; }
function FigmaIcon({ src, alt = "" }) { return <img className="figma-vector-icon" src={src} alt={alt} />; }
function EventCard({ event }) {
  const navigate = useNavigate();
  return <article className="figma-event-card"><img className="figma-card-art" src={event.image} alt="" /><div className="figma-event-body"><div className="figma-event-heading"><div className={`figma-organizer figma-organizer-${event.tone}`}>{event.organizer}</div><div className="figma-event-title-wrap"><h3>{event.title}</h3><div className="figma-tags">{event.tags.map((tag) => <Tag key={tag} kind={tag === "Open" ? "open" : tag === "Upcoming" ? "upcoming" : "category"}>{tag}</Tag>)}</div></div></div><p className="figma-card-description">Utilizing Anime and Manga as gateways, this event will disseminate the various appeal of Japan (nature, tradition, culture, food, etc.) that are considered “Cool” in the eyes of the world.</p><div className="figma-event-meta"><span><FigmaIcon src={figmaTime} /> {event.date}</span><span className="reward"><img src="/spica-coin.png" alt="" /> {event.reward}</span><span><FigmaIcon src={figmaMember} /> 134 joined</span><span><FigmaIcon src={figmaLocation} /> {event.platform}</span></div><button className="figma-card-button" onClick={() => navigate("/events/1/overview")}>Register</button></div></article>;
}
export function FigmaHero() { return <section className="figma-hero"><img className="figma-hero-poster" src={heroImage} alt="Crayta Gaming" /><div className="figma-hero-copy"><div className="figma-host"><img src="/logo_event_page.png" alt="PCMag" /><span>PCMag</span><Tag kind="open">Open</Tag></div><div className="figma-hero-tags"><Tag kind="hot">🔥 Hot</Tag><Tag kind="online">Online</Tag><Tag kind="members">👥 102</Tag></div><h1>Crayta Gaming!</h1><div className="figma-hero-actions"><button>Join Now</button><span><img src="/coin.png" alt="" />Fee: <strong>250 SPICA</strong></span><span><img src="/spac.png" alt="" /><strong>1500 SPICA</strong></span></div></div></section>; }
export function FigmaUpcomingEvents() { return <section id="events" className="figma-section figma-events"><div className="figma-section-header"><h2>Upcoming Events</h2></div><div className="figma-card-grid">{upcoming.map((event) => <EventCard key={`${event.title}-${event.image}`} event={event} />)}</div></section>; }
export function FigmaLiveNow() { return <section className="figma-section figma-live"><div className="figma-section-header"><h2>Live Now</h2></div><div className="figma-card-grid">{live.map((event) => <article className="figma-event-card" key={`${event.title}-${event.image}`}><img className="figma-card-art" src={event.image} alt="" /><div className="figma-event-body"><div className="figma-event-heading"><div className="figma-organizer figma-organizer-live">LIVE</div><div className="figma-event-title-wrap"><h3>{event.title}</h3><div className="figma-tags"><Tag kind="live">Live Now</Tag><Tag kind="category">{event.game}</Tag></div></div></div><p className="figma-card-description">Watch creators and players share their latest matches with the community.</p><div className="figma-event-meta figma-live-meta"><span><FigmaIcon src={figmaMember} /> {event.viewers} watching</span></div><button className="figma-card-button">View Details</button></div></article>)}</div></section>; }
export function FigmaFaq() { const [open, setOpen] = useState(0); return <section className="figma-faq"><div className="figma-faq-glow figma-faq-glow-cyan" /><div className="figma-faq-glow figma-faq-glow-pink" /><div className="figma-section-header"><h2>Frequently Asked Questions</h2><p>Unleashing clarity and empowering decision-making. Find in-depth answers and gain deeper understanding.</p><button>Support Center</button></div><div className="figma-faq-list">{faqs.map(([question, answer], index) => <div className={`figma-faq-item ${open === index ? "is-open" : ""}`} key={question}><button onClick={() => setOpen(open === index ? -1 : index)}><span>{question}</span><img className="figma-faq-vector" src={figmaFaqToggle} alt="" /></button>{open === index && <p>{answer}</p>}</div>)}</div></section>; }
