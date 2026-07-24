import React from "react";

const events = [
  {
    title: "Counter Strike 2 Tournament",
    logo: "ESL",
    logoBg: "#fff000",
    logoText: "#000",
    tags: ["Registration", "Upcoming", "Game Jam"],
    cta: "Register",
    date: "Every Friday: 8PM",
    prize: "1000 SPICA",
    joined: "134 joined",
    platform: "Gaming Platform",
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620",
    desc: "Utilizing Anime and Manga as gateways, this event will disseminate the various appeal of Japan (nature, tradition, cul...",
  },
  {
    title: "Tekken 8 Tournament",
    logo: "EZZ STAR",
    logoBg: "#000",
    logoText: "#fff",
    tags: ["Live", "Game Jam", "VIP Only"],
    cta: "View Details",
    date: "Jan 5, 2025",
    prize: "1000 SPICA",
    joined: "134 joined",
    platform: "Gaming Platform",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e",
    desc: "Weekly gaming sessions where community members team up for multiplayer games and...",
  },
  {
    title: "Manga Art Showcase",
    logo: "AX",
    logoBg: "#f44336",
    logoText: "#fff",
    tags: ["Upcoming", "Showcase"],
    cta: "View Details",
    date: "Jan 5, 2025",
    prize: "Weekly SPICA Rewards",
    joined: "134 joined",
    platform: "Discord",
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620",
    desc: "Join our monthly showcase where artists present their latest manga artwork to the community.",
  },
  {
    title: "Counter Strike 2 Tournament",
    logo: "ESL",
    logoBg: "#fff000",
    logoText: "#000",
    tags: ["Registration", "Upcoming", "Game Jam"],
    cta: "Register",
    date: "Every Friday: 8PM",
    prize: "1000 SPICA",
    joined: "134 joined",
    platform: "Gaming Platform",
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620",
    desc: "Utilizing Anime and Manga as gateways, this event will disseminate the various appeal of Japan (nature, tradition, cul...",
  },
  {
    title: "Tekken 8 Tournament",
    logo: "EZZ STAR",
    logoBg: "#000",
    logoText: "#fff",
    tags: ["Live", "Game Jam", "VIP Only"],
    cta: "View Details",
    date: "Jan 5, 2025",
    prize: "1000 SPICA",
    joined: "134 joined",
    platform: "Gaming Platform",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e",
    desc: "Weekly gaming sessions where community members team up for multiplayer games and...",
  },
  {
    title: "Manga Art Showcase",
    logo: "AX",
    logoBg: "#f44336",
    logoText: "#fff",
    tags: ["Upcoming", "Showcase"],
    cta: "View Details",
    date: "Jan 10, 2025",
    prize: "Weekly SPICA Rewards",
    joined: "134 joined",
    platform: "Discord",
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620",
    desc: "Join our monthly showcase where artists present their latest manga artwork to the community.",
  },
];

const tagColors = {
  Registration: "bg-green-500/20 text-green-500",
  Upcoming: "bg-yellow-500/20 text-yellow-500",
  "Game Jam": "bg-purple-500/20 text-purple-500",
  Live: "bg-green-500/20 text-green-500",
  "VIP Only": "bg-yellow-500/20 text-yellow-500",
  Showcase: "bg-purple-500/20 text-purple-500",
};

export default function HomeEvents() {
  return (
    <section className="bg-black text-white py-20 font-sans">
      <div className="max-w-[1600px] mx-auto px-6">
        <h2 className="text-[32px] font-semibold mb-12 text-center text-white">Events</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 justify-items-center">
        {events.map((event, i) => (
          <div
            key={i}
            className="bg-[#111111] overflow-hidden flex flex-col w-[490px] h-[575px] rounded-sm ring-1 ring-white/5"
          >
            {/* Image */}
            <div className="relative h-[270px] shrink-0">
              <img
                src={event.image}
                alt={event.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent opacity-80" />
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 px-[24px] pt-0 pb-6">

              {/* Logo & Title */}
              <div className="flex gap-4 mb-6">
                <div 
                  className="rounded-full w-[80px] h-[80px] flex flex-col items-center justify-center shrink-0 -mt-[40px] z-10 shadow-lg text-center"
                  style={{ backgroundColor: event.logoBg, color: event.logoText }}
                >
                  <span className="text-[16px] font-bold leading-tight px-1">{event.logo}</span>
                </div>

                <div className="pt-4">
                  <h3 className="text-[20px] font-semibold leading-tight mb-3 text-white">
                    {event.title}
                  </h3>
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2.5">
                    {event.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className={`text-[12px] rounded-full px-3 py-1 font-medium ${tagColors[tag] || "bg-gray-500/20 text-gray-400"}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-[15px] text-[#888888] leading-relaxed mb-8 line-clamp-2">
                {event.desc}
              </p>

              {/* Meta info */}
              <div className="grid grid-cols-2 gap-y-5 gap-x-4 text-[14px] text-gray-300 mb-8">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  <span>
                    {event.date.startsWith("Start") ? (
                      <span dangerouslySetInnerHTML={{ __html: event.date.replace('Start', '<strong class="text-white">Start</strong>') }} />
                    ) : (
                      <>
                        <strong className="text-white">Start: </strong>{event.date}
                      </>
                    )}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <img src="/spica-coin.png" className="w-5 h-5 rounded-full" alt="Spica" />
                  <span>{event.prize}</span>
                </div>

                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                  <span>{event.joined}</span>
                </div>

                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  <span>{event.platform}</span>
                </div>
              </div>

              {/* CTA */}
              <button
                className={`mt-auto w-[442px] h-[46px] mx-auto text-[15px] font-medium transition ${
                  event.cta === "Register"
                    ? "bg-[#00FFFF] text-black hover:bg-[#00e5e5]"
                    : "bg-[#C4C4C4] text-black hover:bg-[#b0b0b0]"
                }`}
              >
                {event.cta}
              </button>
            </div>
          </div>
        ))}
        </div>
      </div>
    </section>
  );
}
