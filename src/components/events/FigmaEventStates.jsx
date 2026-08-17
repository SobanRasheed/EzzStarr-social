import { useState } from "react";
import { Share2, ArrowUp } from "lucide-react";
import data from "../../config/figmaEventScreens";
import "./figma-event-states.css";

export function FigmaEventPrizes({ event = data }) {
  return (
    <main className="figma-event-state">
      <section className="figma-prize-layout">
        <div className="figma-prize-panel">
          <h2>Placement</h2>
          {event.prizes.map((prize) => (
            <div className={`figma-prize-row ${prize.tone}`} key={prize.place}>
              <span>{prize.medal} {prize.place}</span>
              <strong>{prize.amount} {event.currency}</strong>
            </div>
          ))}
          <div className="figma-prize-total"><span>Total Prize</span><strong>{event.prizes.reduce((sum, item) => sum + item.amount, 0)} {event.currency}</strong></div>
        </div>
        <div className="figma-upgrade-card">
          <h3>Upgrade your profile</h3>
          <img src={event.hostedBy.avatar} alt="Profile" />
          <p>{event.upgrade.message}</p>
          <button>🟡 Upgrade</button>
          <small>Ad •••</small>
        </div>
      </section>
    </main>
  );
}

export function FigmaContestantGrid({ event = data }) {
  return (
    <main className="figma-event-state">
      <section className="figma-contestant-grid">
        {event.contestants.map((contestant) => <FigmaContestantCard key={contestant.id} contestant={contestant} />)}
      </section>
    </main>
  );
}

function FigmaContestantCard({ contestant }) {
  const [votes, setVotes] = useState(contestant.votes);
  return (
    <article className="figma-contestant-card">
      <header><span><img src={contestant.image} alt="" />{contestant.author}<small>Event: {contestant.event}</small></span><time>{contestant.postedAt}</time></header>
      <img className="figma-contestant-image" src={contestant.image} alt={`${contestant.name} cosplay`} />
      <h3>{contestant.name}</h3><p>{contestant.game}</p>
      <footer><button onClick={() => setVotes((value) => value + 1)}><ArrowUp size={14} /> {votes} Vote Up</button><button><Share2 size={14} /> Share</button></footer>
    </article>
  );
}
