import HomeEvents from "../components/homepage/HomeEvents";
import HomeHero from "../components/homepage/HomeHero";
import HomeManga from "../components/homepage/HomeManga";
import HomeStories from "../components/homepage/HomeStories";
import HomeThreads from "../components/homepage/HomeThreads";

export default function Home() {
  return (
    <div className="bg-black">
      <HomeHero />
      <HomeManga />
      <HomeStories />
      <HomeThreads />
      <HomeEvents />
    </div>
  )
}
