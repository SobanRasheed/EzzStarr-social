import { NavLink } from "react-router-dom";
import { tournamentTabs } from "./tournamentData";

// Tab strip from Figma node 8475:90897. Each frame ships the same six pills and
// only swaps which one is filled with #ad7aff, so the pills are the navigation
// between the five screens. "Matches" has no frame in the file yet, so it stays
// inert rather than routing somewhere undesigned.
const UNDESIGNED = new Set(["matches"]);

export default function TournamentTabs() {
  return (
    <nav className="tmt-tabsbar" aria-label="Tournament sections">
      <div className="tmt-tabs">
        {tournamentTabs.map(({ label, slug }) =>
          UNDESIGNED.has(slug) ? (
            <span key={slug} className="tmt-tab" aria-disabled="true">
              {label}
            </span>
          ) : (
            <NavLink
              key={slug}
              to={slug}
              className={({ isActive }) => `tmt-tab${isActive ? " is-active" : ""}`}
            >
              {label}
            </NavLink>
          ),
        )}
      </div>
    </nav>
  );
}
