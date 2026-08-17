import TournamentSidebar from "../TournamentSidebar";
import { prizes } from "../tournamentData";

// Figma node 8475:91242 — Prizes. Five placement rows over a Total Prize row
// fenced by two hairlines, with the three-card About column beside it.
export default function PrizesTab() {
  return (
    <div className="tmt-body">
      <article className="tmt-panel">
        <h2 className="tmt-panel__title">Rewards</h2>

        <div>
          {prizes.places.map((prize) => (
            <div key={prize.place} className={`tmt-prize tmt-prize--${prize.tone}`}>
              <span className="tmt-prize__place">
                {prize.medal ? (
                  <img className="tmt-prize__medal" src={prize.medal} alt="" />
                ) : (
                  <span className="tmt-prize__medal tmt-prize__medal--empty" />
                )}
                {prize.place}
              </span>
              <span className="tmt-prize__amount">{prize.amount}</span>
            </div>
          ))}

          <dl className="tmt-prizes__total">
            <dt>{prizes.total.label}</dt>
            <dd>{prizes.total.amount}</dd>
          </dl>
        </div>
      </article>

      <TournamentSidebar />
    </div>
  );
}
