import HomeHero from "../components/homepage/HomeHero";
import HomeManga from "../components/homepage/HomeManga";

export default function Home() {
  return (
    <>
    <HomeHero videoSrc="/media/home-hero-video.mp4" />
    <HomeManga />
    </>
  )
}
