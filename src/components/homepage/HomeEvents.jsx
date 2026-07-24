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

const getLogoIcon = (logoStr) => {
  if (logoStr === "ESL") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (logoStr === "EZZ STAR") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7">
        <rect x="2" y="6" width="20" height="12" rx="2" />
        <path d="M6 12h4m-2-2v4M15 11v.01M18 13v.01" strokeLinecap="round" />
      </svg>
    );
  }
  if (logoStr === "AX") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7">
        <path d="M12 22a10 10 0 1 1 10-10 10.02 10.02 0 0 1-10 10Z" />
        <circle cx="7.5" cy="10.5" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="10.5" cy="7.5" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="14.5" cy="7.5" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="17.5" cy="11.5" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  return <span className="text-[12px] font-bold leading-tight px-1">{logoStr}</span>;
};

export default function HomeEvents() {
  return (
    <section className="bg-black text-white py-20 font-sans">
      <div className="max-w-[1100px] mx-auto px-6">
        <h2 className="text-[32px] font-semibold mb-12 text-center text-white">Events</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event, i) => (
          <div
            key={i}
            className="bg-[#111111] overflow-hidden flex flex-col h-full rounded-none ring-1 ring-white/5"
          >
            {/* Image */}
            <div className="relative h-[150px] shrink-0">
              <img
                src={event.image}
                alt={event.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent opacity-80" />
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 px-4 pt-0 pb-4">

              {/* Logo & Title */}
              <div className="flex gap-3 mb-3">
                <div 
                  className="rounded-full w-[56px] h-[56px] flex flex-col items-center justify-center shrink-0 -mt-[17px] z-10 shadow-lg text-center"
                  style={{ backgroundColor: event.logoBg, color: event.logoText }}
                >
                  {getLogoIcon(event.logo)}
                </div>

                <div className="pt-2">
                  <h3 className="text-[15px] font-semibold leading-tight mb-2 text-white">
                    {event.title}
                  </h3>
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {event.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className={`text-[9px] rounded-full px-2 py-0.5 font-medium ${tagColors[tag] || "bg-gray-500/20 text-gray-400"}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-[12px] text-[#888888] leading-relaxed mb-4 line-clamp-2">
                {event.desc}
              </p>

              {/* Meta info */}
              <div className="grid grid-cols-2 gap-y-2.5 gap-x-2 text-[11px] text-gray-300 mb-4">
                <div className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
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

                <div className="flex items-center gap-1.5">
                  <img src="/spica-coin.png" className="w-3.5 h-3.5 rounded-full" alt="Spica" />
                  <span>{event.prize}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                  <span>{event.joined}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  <span>{event.platform}</span>
                </div>
              </div>

              {/* CTA */}
              <button
                className={`mt-auto w-full h-[32px] text-[12px] font-medium transition ${
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
