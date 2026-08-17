import { Outlet } from "react-router-dom";
import TournamentHero from "./TournamentHero";
import TournamentTabs from "./TournamentTabs";
import TournamentFaq from "./TournamentFaq";
import TournamentSection from "./TournamentSection";
import { GLOWS } from "./tournamentGlows";
import "./tournament.css";

// Shell shared by the five tournament detail frames: hero, tab strip, the active
// tab's body, then the FAQ block. The site header and footer come from the app
// Layout, which is what the Figma frames use too.
export default function TournamentLayout() {
  return (
    <main className="tmt">
      <TournamentHero />
      <TournamentSection glows={GLOWS.tabs}>
        <TournamentTabs />
      </TournamentSection>
      <Outlet />
      <TournamentFaq />
    </main>
  );
}
