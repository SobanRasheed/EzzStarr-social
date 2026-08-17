import { tournament } from "./tournamentData";

// "About" column from Figma node 8475:90916 (Overview). The Prizes and Rules
// frames use the same stack minus the Timeline card.
export default function TournamentSidebar({ withTimeline = false }) {
  const { host, size, platforms, timeline } = tournament;

  return (
    <aside className="tmt-side">
      <section className="tmt-side__card">
        <div className="tmt-host">
          <img className="tmt-host__logo" src={host.logo} alt="" />
          <span className="tmt-host__name tmt-gradient-text">{host.name}</span>
        </div>
      </section>

      <section className="tmt-side__card">
        <h3 className="tmt-side__head tmt-side__head--tight">Size</h3>
        <div className="tmt-size">
          <img className="tmt-size__icon" src={size.icon} alt="" />
          <span className="tmt-size__label tmt-gradient-text">{size.label}</span>
        </div>
      </section>

      <section className="tmt-side__card">
        <h3 className="tmt-side__head">Platform</h3>
        <div className="tmt-side__body">
          <div className="tmt-platforms">
            {platforms.map((src) => (
              <img key={src} src={src} alt="" />
            ))}
          </div>
        </div>
      </section>

      {withTimeline && (
        <section className="tmt-side__card">
          <h3 className="tmt-side__head">Timeline</h3>
          <div className="tmt-side__body">
            <div className="tmt-timeline">
              <span className="tmt-timeline__rail" />
              <div className="tmt-timeline__stops">
                {timeline.map((stop) => (
                  <div key={stop.label}>
                    <span className="tmt-timeline__label tmt-gradient-text">{stop.label}</span>
                    <span className="tmt-timeline__date">{stop.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </aside>
  );
}
