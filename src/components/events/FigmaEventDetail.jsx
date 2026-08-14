import { NavLink } from "react-router-dom";
import { FigmaFaq } from "../homepage/FigmaHomeSections";
import "./figma-event-detail.css";

const heroImage = "https://www.figma.com/api/mcp/asset/95bcf32c-0e20-407f-adce-c5f9aad9753e.png";
const gallery = [
  "https://www.figma.com/api/mcp/asset/3c1712c9-4df3-4607-8589-f30e38fa0fff.png",
  "https://www.figma.com/api/mcp/asset/ef930cfb-cd81-4d63-a16c-439f5179787b.png",
  "https://www.figma.com/api/mcp/asset/178d2680-d323-430d-814b-af5886878b29.png",
  "https://www.figma.com/api/mcp/asset/7981ba54-48da-4661-bcd0-297422bc35a5.png",
  "https://www.figma.com/api/mcp/asset/feb989a7-ea06-4ff7-aa6d-b36412956e92.png",
  "https://www.figma.com/api/mcp/asset/f5c4eed9-11ce-4326-aa00-b2536bbf91f6.png",
];
const hostedIcon = "https://www.figma.com/api/mcp/asset/ac0cf2c5-437c-4f84-a9df-a3db4f796683.png";
const avatar = "https://www.figma.com/api/mcp/asset/c4b3b66d-9dde-429f-bf63-b42be9089ae3.png";
const ring = "https://www.figma.com/api/mcp/asset/37d4e49f-350e-46ee-a0ca-e8910b3596c7.svg";

function DetailTabs() {
  const tabClass = ({ isActive }) => isActive ? "active" : undefined;
  return <nav className="event-detail-tabs"><NavLink className={tabClass} to="../overview" end>Overview</NavLink><NavLink className={tabClass} to="../prizes">Prizes</NavLink><NavLink className={tabClass} to="../participants">Participants</NavLink></nav>;
}

function Hero() {
  return <section className="event-detail-hero" style={{ backgroundImage: `url(${heroImage})` }}><div className="event-detail-hero-overlay" /><div className="event-detail-hero-content"><div className="event-detail-tags"><span>Upcoming</span><span>Game Jam</span></div><h1>International Cosplay Contest</h1><div className="event-detail-actions"><button>Register</button><span>🪙 Fee: 250</span><span>🟣 1500 SPCA</span></div></div><div className="event-detail-timer"><small>Event Starts-In</small><div><strong>2</strong><span>days</span><strong>23</strong><span>hours</span><strong>16</strong><span>mins</span><strong>32</strong><span>secs</span></div></div></section>;
}

function SideInfo() {
  return <aside className="event-detail-side"><section><small>Hosted By</small><img src={hostedIcon} alt="Ezzstar" /><span>Ezzstar</span></section><section><h3>Timeline</h3><div><b>Contest Starts Date</b><small>12 April 2024</small></div><div><b>Contest End Date</b><small>12 April 2024</small></div></section><section><h3>Contestants <em>(100)</em></h3><div className="event-detail-avatars">{[0,1,2,3,4,5,6,7].map((item) => <img key={item} src={avatar} alt="" />)}</div></section><section><h3>Venue</h3><b>Online</b><small>Ezzstar</small></section></aside>;
}

function Description() {
  return <section className="event-detail-description"><div className="event-detail-main"><div className="event-detail-gallery">{gallery.map((image, index) => <img key={image} className={index === 5 ? "event-detail-gallery-wide" : ""} src={image} alt="Contest preview" />)}<button>Submit Photo</button></div><article><h2>Description</h2><p className="event-detail-muted">ABOUT 8 BALL POOL WINTER TOURNAMENT 14</p><p>PLATFORMS: MOBILE</p><p className="event-detail-copy">• After entering the application, you must go to your social or friends, and add the opponent via Unique ID. Example: 162-866-549-3<br />• The player’s Unique ID must match the one in the Tournament table; if wrong you will be disqualified<br />• Practice matches are not allowed<br />• In the event one of the two players has lost contact, they can return as fast as possible<br />• Make sure you have 500 points in the game so you can join games<br />• All matches best of 3; Finals best of 5<br />• Beginner Cue must be used for fair play<br />• Players must choose the 200 coins prize pool (SYDNEY Marina Bar)</p><h3>HOW TO CREATE A GAME:</h3><p className="event-detail-copy">• After adding the opponent as a Friend<br />• Both players go to Cues and choose Beginner Cue for fair play<br />• Press on the friend list<br />• Choose the 200 coins prize pool (SYDNEY Marina Bar)</p><h3>SCORE SUBMISSION VIDEO</h3><p className="event-detail-copy">• You must send a photo proving your victory and clarify the ID of the competitor when recording the results<br />• Lack of attaching your score image may result in losing the match<br />• Players who are late for more than 15 minutes will be disqualified<br />• Waiting time is 15 minutes. In case of no response, the player is considered withdrawn from the match</p><h3>HERE ARE THE STEPS TO SUBMIT SCORES:</h3><p className="event-detail-copy">Score Submission Video<br />• Login to Kyu Games & go to “My Tournaments”<br />• Select your Tournament<br />• Click on the “Matches” tab<br />• Click on “Submit Scores”<br />• Enter your score, upload the screenshot, and click “Done”</p></article></div><SideInfo /></section>;
}

export default function FigmaEventDetail() { return <main className="figma-event-detail"><Hero /><DetailTabs /><div className="event-detail-ring" style={{ backgroundImage: `url(${ring})` }} /><Description /><FigmaFaq /></main>; }
