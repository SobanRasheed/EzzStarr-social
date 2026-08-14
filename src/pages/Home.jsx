import { FigmaFaq, FigmaHero, FigmaLiveNow, FigmaUpcomingEvents } from "../components/homepage/FigmaHomeSections";

export default function Home() {
  return <main className="relative overflow-hidden bg-[#010101]"><FigmaHero /><FigmaUpcomingEvents /><FigmaLiveNow /><FigmaFaq /></main>;
}
