import TournamentSection from "../TournamentSection";
import { GLOWS } from "../tournamentGlows";
import { participants } from "../tournamentData";

// Figma node 8475:91390 — Participants. 18 team cards, three to a row, each with
// the team logo, name and the first three players plus an overflow count.
export default function ParticipantsTab() {
  return (
    <TournamentSection glows={GLOWS.participants}>
      <div className="tmt-body tmt-body--wide">
        <div className="tmt-teams">
          {participants.map((team) => (
            <article className="tmt-team" key={team.name}>
              <img className="tmt-team__logo" src={team.logo} alt="" />
              <div>
                <span className="tmt-team__name tmt-gradient-text">{team.name}</span>
                <div className="tmt-team__lineup">
                  <span className="tmt-team__players tmt-gradient-text">
                    {team.lineup.join(" , ")}
                  </span>
                  <button type="button" className="tmt-team__more tmt-gradient-text">
                    +{team.extraCount} More
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </TournamentSection>
  );
}
