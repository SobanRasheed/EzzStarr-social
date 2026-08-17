import RichText from "../RichText";
import TournamentSidebar from "../TournamentSidebar";
import { description } from "../tournamentData";

// Figma node 8475:90863 — Overview. Description panel plus the four-card About
// column (this is the only tab that shows Timeline).
export default function OverviewTab() {
  return (
    <div className="tmt-body tmt-body--tall">
      <article className="tmt-panel">
        <h2 className="tmt-panel__title">Description</h2>
        <RichText text={description} />
      </article>
      <TournamentSidebar withTimeline />
    </div>
  );
}
