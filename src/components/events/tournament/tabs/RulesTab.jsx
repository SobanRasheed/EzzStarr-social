import RichText from "../RichText";
import TournamentSidebar from "../TournamentSidebar";
import { rules } from "../tournamentData";

// Figma node 8475:91124 — the frame is named "Roles" but its active tab pill is
// "Rules", so it renders the Rules & Regulations panel.
export default function RulesTab() {
  return (
    <div className="tmt-body">
      <article className="tmt-panel">
        <h2 className="tmt-panel__title">Rules</h2>
        <RichText text={rules} />
      </article>
      <TournamentSidebar />
    </div>
  );
}
