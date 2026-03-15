import React from "react";

const events = [
  {
    title: "Counter Strike 2 ",
    logo: "ESL",
    tags: ["Registration", "Upcoming", "Game Jam"],
    cta: "Register",
    date: "Every Friday: 8PM",
    prize: "1000 SPICA",
    joined: "134 joined",
    platform: "Gaming Platform",
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620",
  },
  {
    title: "Tekken 8 Tournament",
    logo: "EZ",
    tags: ["Live", "Game Jam", "VIP Only"],
    cta: "View Details",
    date: "Jan 5, 2025",
    prize: "1000 SPICA",
    joined: "134 joined",
    platform: "Gaming Platform",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e",
  },
  {
    title: "Manga Art Showcase",
    logo: "AX",
    tags: ["Upcoming"],
    cta: "View Details",
    date: "Jan 10, 2025",
    prize: "Weekly SPICA Rewards",
    joined: "134 joined",
    platform: "Discord",
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620",
  },
  {
    title: "Counter Strike 2 ",
    logo: "ESL",
    tags: ["Registration", "Upcoming", "Game Jam"],
    cta: "Register",
    date: "very Friday: 8PM",
    prize: "1000 SPICA",
    joined: "134 joined",
    platform: "Gaming Platform",
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620",
  },
  {
    title: "Tekken 8 Tournament",
    logo: "EZ",
    tags: ["Live", "Game Jam", "VIP Only"],
    cta: "View Details",
    date: "Jan 5, 2025",
    prize: "1000 SPICA",
    joined: "134 joined",
    platform: "Gaming Platform",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e",
  },
  {
    title: "Manga Art Showcase",
    logo: "AX",
    tags: ["Upcoming"],
    cta: "View Details",
    date: "Jan 10, 2025",
    prize: "Weekly SPICA Rewards",
    joined: "134 joined",
    platform: "Discord",
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620",
  },
];

const tagColors = {
  Registration: "bg-green-500/20 text-green-400",
  Upcoming: "bg-yellow-500/20 text-yellow-400",
  "Game Jam": "bg-purple-500/20 text-purple-400",
  Live: "bg-emerald-500/20 text-emerald-400",
  "VIP Only": "bg-amber-500/20 text-amber-400",
};

export default function HomeEvents() {
  return (
    <section className="bg-black text-white px-6 md:px-[60px] py-20">
      <h2 className="text-4xl font-semibold mb-14 text-center">Events</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {events.map((event, i) => (
          <div
            key={i}
            className="bg-[#0b0b0b] overflow-hidden flex flex-col h-full ring-1 ring-white/5 hover:-translate-y-1 transition"
          >
            {/* Image */}
            <div className="relative h-[240px]">
              <img
                src={event.image}
                alt={event.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

              {/* Logo */}
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 px-6 pt-5 pb-6">

              <div className="flex gap-2">
                <div className={`rounded-full relative -top-10 w-18 h-18 bg-yellow-500 backdrop-blur flex items-center justify-center text-sm font-bold`}>
                  {event.logo}
                </div>

                <div>
                  <h3 className="text-lg font-semibold leading-tight mb-3">
                    {event.title}
                  </h3>
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {event.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className={`text-[9px] rounded-full px-2 py-1 font-medium ${tagColors[tag]}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-xs text-gray-500 leading-relaxed mb-4">
                Utilizing Anime and Manga as gateways, this event will
                disseminate the appeal of Japan’s culture.
              </p>

              {/* Meta info – 2x2 layout */}
              <div className="grid grid-cols-2 gap-y-3 text-xs text-white mb-6">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Start : </span>
                  <span className="text-gray-400">{event.date}</span>
                </div>


                <div className="flex items-center gap-2">
                  <span><img src="/spica-coin.png" className="w-4 h-4" alt="Spica Coin" /></span>
                  <span>{event.prize}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span>👥</span>
                  <span>{event.joined}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span>🎮</span>
                  <span>{event.platform}</span>
                </div>
              </div>

              {/* CTA */}
              <button
                className={`mt-auto h-11 text-sm font-semibold transition ${event.cta === "Register"
                  ? "bg-cyan-400 text-black hover:bg-cyan-300"
                  : "bg-gray-200 text-black hover:bg-gray-300"
                  }`}
              >
                {event.cta}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
