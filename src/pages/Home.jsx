import HomeEvents from "../components/homepage/HomeEvents";
import HomeGist from "../components/homepage/HomeGist";
import HomeHero from "../components/homepage/HomeHero";
import HomeManga from "../components/homepage/HomeManga";
import HomeStories from "../components/homepage/HomeStories";

export default function Home() {
  return (
    <div className="bg-black">
      <HomeHero />
      <HomeManga title={"Manga"}/>
      <HomeStories />
      <HomeGist />
      <HomeEvents />
    </div>
  )
}
