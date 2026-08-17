import { Fragment } from "react";
import TournamentSection from "../TournamentSection";
import { GLOWS } from "../tournamentGlows";
import { brackets } from "../tournamentData";

// Figma node 8475:91639 — Brackets. The ladder is positioned exactly as authored
// (node 8475:91697, a 1585x3532 canvas) and scrolls horizontally on narrow
// viewports rather than being re-laid out, so the elbows stay on the cards.
// "Finals" has no frame in the file, so the segmented control shows the state
// the design ships and does not switch views.
export default function BracketsTab() {
  const { views, kickoff, canvas, cardWidth, rounds, connectors } = brackets;

  return (
    <TournamentSection glows={GLOWS.brackets}>
      <div className="tmt-body tmt-body--wide">
        <article className="tmt-panel tmt-brackets">
          <div className="tmt-brackets__views" role="group" aria-label="Bracket view">
            {views.map((view, index) => (
              <span
                key={view}
                className={`tmt-brackets__view${index === 0 ? " is-active" : ""}`}
                aria-current={index === 0 ? "true" : undefined}
                aria-disabled={index === 0 ? undefined : "true"}
              >
                {view}
              </span>
            ))}
          </div>

          <div className="tmt-brackets__viewport">
            <div
              className="tmt-brackets__canvas"
              style={{ width: canvas.width, height: canvas.height }}
            >
              {connectors.map((line) => (
                <span
                  key={`${line.x}-${line.y}`}
                  className="tmt-connector"
                  style={{ left: line.x, top: line.y, width: line.w, height: line.h }}
                />
              ))}

              {rounds.map((round) => (
                <span key={round.label} className="tmt-round" style={{ left: round.labelX }}>
                  {round.label}
                </span>
              ))}

              {rounds.flatMap((round) =>
                round.ys.map((y, index) => (
                  <article
                    key={`${round.label}-${y}`}
                    className="tmt-match"
                    style={{ left: round.x, top: y, width: cardWidth, height: round.cardHeight }}
                  >
                    <span className="tmt-match__kickoff">{kickoff}</span>
                    {round.teams?.(index).map((team, slot) => (
                      <Fragment key={`${team.name}-${slot}`}>
                        {slot > 0 && <span className="tmt-match__vs">VS</span>}
                        <div className="tmt-match__team">
                          <img className="tmt-match__logo" src={team.logo} alt="" />
                          <span>
                            <span className="tmt-match__name">{team.name}</span>
                            <span className="tmt-match__handle">{team.handle}</span>
                          </span>
                        </div>
                      </Fragment>
                    ))}
                  </article>
                )),
              )}
            </div>
          </div>
        </article>
      </div>
    </TournamentSection>
  );
}
