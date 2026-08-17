import { tournament, tournamentAssets } from "./tournamentData";

// Hero from Figma node 8475:90864 — identical across all five tab frames.
export default function TournamentHero() {
  const { tags, title, registration, entryFee, reward, countdownLabel, countdown } = tournament;

  return (
    <section
      className="tmt-hero"
      style={{ backgroundImage: `url(${tournamentAssets.heroImage})` }}
    >
      <div className="tmt-hero__glow" />
      <div className="tmt-hero__shade-left" />
      <div className="tmt-hero__shade-bottom" />

      <div className="tmt-hero__main">
        <div className="tmt-tags">
          {tags.map((tag) => (
            <span key={tag.label} className={`tmt-tag tmt-tag--${tag.tone}`}>
              {tag.label}
            </span>
          ))}
        </div>

        <h1 className="tmt-title">{title}</h1>

        <div className="tmt-pills">
          <button type="button" className="tmt-pill tmt-pill--closed" disabled>
            {registration.label}
          </button>
          <span className="tmt-pill">
            <img className="tmt-pill__coin" src={entryFee.icon} alt="" />
            {entryFee.label}
          </span>
          <span className="tmt-pill">
            <img className="tmt-pill__coin" src={reward.icon} alt="" />
            {reward.label}
          </span>
        </div>
      </div>

      <div className="tmt-hero__aside">
        <span className="tmt-countdown__label">{countdownLabel}</span>
        <div className="tmt-countdown__card">
          {countdown.map((slot) => (
            <div className="tmt-timer" key={slot.unit}>
              <span className="tmt-timer__value">{slot.value}</span>
              <span className="tmt-timer__unit">{slot.unit}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
