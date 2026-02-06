import React from "react";

const events = [
  {
    title: "Counter Strike 2 Tournament",
    logo: "ESL",
    tags: ["Registration", "Upcoming", "Game Jam"],
    cta: "Register",
    date: "Start Every Friday: 8PM",
    prize: "1000 SPICA",
    joined: "134 joined",
    image: "https://images.unsplash.com/photo-1605902711622-cfb43c44367f",
  },
  {
    title: "Tekken 8 Tournament",
    logo: "EZ",
    tags: ["Live", "Game Jam", "VIP Only"],
    cta: "View Details",
    date: "Start: Jan 5, 2025",
    prize: "1000 SPICA",
    joined: "134 joined",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e",
  },
  {
    title: "Manga Art Showcase",
    logo: "AX",
    tags: ["Upcoming"],
    cta: "View Details",
    date: "Start: Jan 10, 2025",
    prize: "Weekly SPICA Rewards",
    joined: "134 joined",
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620",
  },
  {
    title: "Counter Strike 2 Tournament",
    logo: "ESL",
    tags: ["Registration", "Upcoming", "Game Jam"],
    cta: "Register",
    date: "Start Every Friday: 8PM",
    prize: "1000 SPICA",
    joined: "134 joined",
    image: "https://images.unsplash.com/photo-1605902711622-cfb43c44367f",
  },
  {
    title: "Tekken 8 Tournament",
    logo: "EZ",
    tags: ["Live", "Game Jam", "VIP Only"],
    cta: "View Details",
    date: "Start: Jan 5, 2025",
    prize: "1000 SPICA",
    joined: "134 joined",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e",
  },
  {
    title: "Manga Art Showcase",
    logo: "AX",
    tags: ["Upcoming"],
    cta: "View Details",
    date: "Start: Jan 10, 2025",
    prize: "Weekly SPICA Rewards",
    joined: "134 joined",
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620",
  },
];

const tagColors = {
  Registration: "bg-green-500/20 text-green-400",
  Upcoming: "bg-yellow-500/20 text-yellow-400",
  "Game Jam": "bg-purple-500/20 text-purple-400",
  Live: "bg-green-600/20 text-green-300",
  "VIP Only": "bg-amber-500/20 text-amber-400",
};

export default function HomeEvents() {
  return (
    <section className="bg-black text-white px-6 md:px-[60px] py-16">
      <h2 className="text-4xl font-semibold mb-12 text-center">Events</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {events.map((event, i) => (
          <div key={i} className="bg-[#0d0d0d] rounded-2xl overflow-hidden">
            <div className="relative">
              <img src={event.image} alt={event.title} className="h-[220px] w-full object-cover" />

              {/* Logo badge */}
              <div className="absolute -bottom-6 left-5 w-12 h-12 rounded-full bg-black flex items-center justify-center text-sm font-bold">
                {event.logo}
              </div>
            </div>

            <div className="pt-10 px-5 pb-5">
              <h3 className="text-base font-semibold mb-2 leading-snug">
                {event.title}
              </h3>

              {/* tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {event.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className={`text-[11px] px-3 py-1 rounded-full ${tagColors[tag]}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p className="text-xs text-gray-400 mb-3">
                Utilizing Anime and Manga as gateways, this event will...
              </p>

              <div className="text-xs text-gray-400 space-y-1 mb-4">
                <p>⏰ {event.date}</p>
                <p>🏆 {event.prize}</p>
                <p>👥 {event.joined}</p>
              </div>

              <button
                className={`w-full py-2 rounded-md text-sm font-semibold ${
                  event.cta === "Register"
                    ? "bg-cyan-400 text-black"
                    : "bg-gray-300 text-black"
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
