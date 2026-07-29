import HomeEvents from "../components/homepage/HomeEvents";
import HomeGist from "../components/homepage/HomeGist";
import HomeHero from "../components/homepage/HomeHero";
import HomeManga from "../components/homepage/HomeManga";
import HomeStories from "../components/homepage/HomeStories";

export default function Home() {
  return (
    <div className="relative overflow-hidden" style={{ background: "#060106" }}>
      {/* Top dark vignette blob */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "2328px",
          height: "853px",
          left: "calc(50% - 1164px)",
          top: "calc(50% - 426.5px - 2340px)",
          background: "linear-gradient(180deg, #060106 61.06%, rgba(6,1,6,0) 100%)",
          filter: "blur(54.75px)",
          zIndex: 0,
        }}
      />
      {/* Cyan ambient glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "535px",
          height: "535px",
          left: 0,
          top: "6756px",
          background: "#01F1E3",
          opacity: 0.2,
          filter: "blur(250px)",
          borderRadius: "363px",
          zIndex: 0,
        }}
      />
      {/* Magenta ambient glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "641px",
          height: "641px",
          left: "1130px",
          top: "6851px",
          background: "#DF28E2",
          opacity: 0.15,
          filter: "blur(250px)",
          borderRadius: "363px",
          zIndex: 0,
        }}
      />
      <div className="relative z-[1]">
        <HomeHero />
        <HomeManga title="Manga" />
        <HomeStories />
        <HomeGist />
        <HomeEvents />
      </div>
    </div>
  );
}
