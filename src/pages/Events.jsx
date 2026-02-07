import React, { useState } from 'react';

export default function CraytaGaming() {
  const [openFaq, setOpenFaq] = useState(null);

  const upcomingEvents = [
    {
      title: "Counter Strike 2 Tournament",
      organizer: "ESL",
      organizerBg: "bg-yellow-400 text-black",
      tags: ["Open", "Upcoming", "E-sports Tournament"],
      description: "Utilizing Anime and Manga as gateways, this event will disseminate the various appeal of Japan (nature, tradition, cul...",
      startDate: "Jan 5, 2025",
      reward: "1000 SPICA",
      joined: "134 joined",
      platform: "Gaming Platform",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop"
    },
    {
      title: "Tekken 8 Tournament",
      organizer: "5 STAR",
      organizerBg: "bg-white text-black",
      tags: ["Open", "Upcoming", "E-sports Tournament"],
      description: "Weekly gaming sessions where community members team up for multiplayer games and...",
      startTime: "Start Every Friday: 8PM",
      reward: "1000 SPICA",
      joined: "134 joined",
      platform: "Gaming Platform",
      image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&h=300&fit=crop"
    },
    {
      title: "International Cosplay Contest",
      organizer: "COSPLAY",
      organizerBg: "bg-purple-600 text-white",
      tags: ["Open", "Upcoming", "Contest"],
      description: "Utilizing Anime and Manga as gateways, this event will disseminate the various appeal of Japan (nature, tradition, cul...",
      startDate: "Jan 5, 2025",
      reward: "Weekly SPICA Rewards",
      joined: "134 joined",
      platform: "Discord + Online",
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop"
    },
    {
      title: "Digital Guider",
      organizer: "DG",
      organizerBg: "bg-blue-500 text-white",
      tags: ["Open", "Upcoming", "Tournament"],
      description: "Utilizing Anime and Manga as gateways, this event will disseminate the various appeal of Japan (nature, tradition, cul...",
      startTime: "Start Every Friday: 8PM",
      reward: "Weekly SPICA Rewards",
      joined: "134 joined",
      platform: "Discord + Online",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop"
    },
    {
      title: "Game dev Jam: Neon Futures",
      organizer: "LEAGUE",
      organizerBg: "bg-yellow-500 text-black",
      tags: ["Open", "Upcoming", "Tournament"],
      description: "Utilizing Anime and Manga as gateways, this event will disseminate the various appeal of Japan (nature, tradition, cul...",
      startTime: "Start Every Friday: 8PM",
      reward: "1000 SPICA",
      joined: "134 joined",
      platform: "Discord + Online",
      image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&h=300&fit=crop"
    },
    {
      title: "Game dev Jam: Neon Futures",
      organizer: "GAME JAM",
      organizerBg: "bg-gray-800 text-white",
      tags: ["Open", "Upcoming", "Tournament"],
      description: "Utilizing Anime and Manga as gateways, this event will disseminate the various appeal of Japan (nature, tradition, cul...",
      startDate: "Jan 5, 2025",
      reward: "Weekly SPICA Rewards",
      joined: "134 joined",
      platform: "Gaming Platform",
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop"
    },
    {
      title: "Cyberpunk Writing Contest 2024",
      organizer: "V",
      organizerBg: "bg-red-600 text-white",
      tags: ["Open", "Upcoming", "Contest"],
      description: "Utilizing Anime and Manga as gateways, this event will disseminate the various appeal of Japan (nature, tradition, cul...",
      startTime: "Start Every Friday: 8PM",
      reward: "Weekly SPICA Rewards",
      joined: "134 joined",
      platform: "Discord + Online",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop"
    },
    {
      title: "Game dev Jam: Neon Futures",
      organizer: "EPIC",
      organizerBg: "bg-gray-700 text-white",
      tags: ["Open", "Upcoming", "Tournament"],
      description: "Weekly dev Jam is an annual event that brings together game developers, artists, and enthusiasts for an intensive...",
      startTime: "Start Every Friday: 8PM",
      reward: "Weekly: 5 Month",
      joined: "134 joined",
      platform: "Discord + Online",
      image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&h=300&fit=crop"
    },
    {
      title: "Game dev Jam: Neon Futures",
      organizer: "ULTIMATE",
      organizerBg: "bg-orange-500 text-white",
      tags: ["Open", "Upcoming", "Tournament"],
      description: "Utilizing Anime and Manga as gateways, this event will disseminate the various appeal of Japan (nature, tradition, cul...",
      startDate: "Jan 5, 2025",
      reward: "Weekly SPICA Rewards",
      joined: "134 joined",
      platform: "Open to Members",
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop"
    },
    {
      title: "Game dev Jam: Neon Futures",
      organizer: "DG",
      organizerBg: "bg-blue-500 text-white",
      tags: ["Open", "Upcoming", "Tournament"],
      description: "Utilizing Anime and Manga as gateways, this event will disseminate the various appeal of Japan (nature, tradition, cul...",
      startTime: "Start Every Friday: 8PM",
      reward: "Weekly SPICA Rewards",
      joined: "134 joined",
      platform: "Discord + Online",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop"
    },
    {
      title: "Game dev Jam: Neon Futures",
      organizer: "XBOX",
      organizerBg: "bg-green-600 text-white",
      tags: ["Open", "Upcoming", "Tournament"],
      description: "Utilizing Anime and Manga as gateways, this event will disseminate the various appeal of Japan (nature, tradition, cul...",
      startTime: "Start Every Friday: 8PM",
      reward: "Weekly SPICA Rewards",
      joined: "134 joined",
      platform: "Discord + Online",
      image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&h=300&fit=crop"
    },
    {
      title: "Cyberpunk Writing Contest 2024",
      organizer: "5 STAR",
      organizerBg: "bg-white text-black",
      tags: ["Open", "Upcoming", "Contest"],
      description: "Utilizing Anime and Manga as gateways, this event will disseminate the various appeal of Japan (nature, tradition, cul...",
      startTime: "Start Every Friday: 8PM",
      reward: "Weekly SPICA Rewards",
      joined: "134 joined",
      platform: "Discord + Online",
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop"
    }
  ];

  const ongoingEvents = [
    {
      title: "HI-TECH 4",
      game: "Apex Legends",
      status: "Live Now",
      viewers: "12.5K",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=250&fit=crop"
    },
    {
      title: "Championship Finals",
      game: "League of Legends",
      status: "Live Now",
      viewers: "25.3K",
      image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&h=250&fit=crop"
    },
    {
      title: "HI-TECH 4",
      game: "Valorant",
      status: "Live Now",
      viewers: "18.7K",
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=250&fit=crop"
    },
    {
      title: "Fortnite Battle",
      game: "Fortnite",
      status: "Live Now",
      viewers: "31.2K",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=250&fit=crop"
    },
    {
      title: "Pro League",
      game: "CS:GO",
      status: "Live Now",
      viewers: "22.8K",
      image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&h=250&fit=crop"
    }
  ];

  const faqs = [
    {
      question: "What is Crayta About?",
      answer: "Crayta is a platform for creating and playing multiplayer games. It's a collaborative game creation platform where you can build, script, and play games with friends."
    },
    {
      question: "What is the Payload Studio's mission?",
      answer: "Payload Studios aims to empower creators to build amazing multiplayer experiences and foster a vibrant gaming community."
    },
    {
      question: "Find out more on game distribution",
      answer: "Games created on Crayta can be shared with the community and played by anyone on the platform."
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div
        className="relative h-96 bg-cover bg-center"
        style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=1200&h=400&fit=crop')` }}
      >
      <div className="absolute inset-0 flex flex-col justify-end items-start px-8 md:px-16 pb-12 md:pb-16">


  {/* Top Row */}
  <div className="flex items-center gap-4 mb-4">

    {/* PCMag Circle */}
    <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center font-bold text-white text-sm">
      PC
    </div>

    <div className="flex items-center gap-3">
      <span className="text-base font-semibold">PCMag</span>

      <span className="bg-green-600 text-white text-xs px-3 py-1 rounded-full">
        Open
      </span>

      <span className="text-yellow-400 text-lg">🔕</span>
    </div>
  </div>

  {/* Status Pills */}
  <div className="flex items-center gap-2 mb-4">
    <span className="bg-black/70 border border-gray-700 px-3 py-1 rounded-full text-xs">
      🔥 Hot
    </span>

    <span className="bg-cyan-500 text-black px-3 py-1 rounded-full text-xs font-semibold">
      Online
    </span>

    <span className="bg-black/70 border border-gray-700 px-3 py-1 rounded-full text-xs flex items-center gap-2">
      👥 102
    </span>
  </div>

  {/* Big Title */}
  <h1 className="text-3xl md:text-5xl font-bold mb-6 text-white">
    Crayta Gaming!
  </h1>

  {/* Buttons Row */}
  <div className="flex flex-wrap items-center gap-3">

    <button className="bg-gradient-to-r from-purple-600 to-pink-500 px-5 py-2.5 rounded-lg font-semibold text-white">
      Join Now
    </button>

    <div className="bg-black/70 border border-gray-800 px-4 py-2 rounded-lg flex items-center gap-2">
      <span className="text-yellow-400">🪙</span>
      <span className="text-gray-300">Fee:</span>
      <span className="font-semibold">250 SPCA</span>
    </div>

    <div className="bg-black/70 border border-gray-800 px-5 py-3 rounded-lg flex items-center gap-2">
      <span className="text-purple-400">🟣</span>
      <span className="font-semibold">1500 SPCA</span>
    </div>

  </div>
</div>

      </div>

      {/* Upcoming Events Section */}
      <div className="px-4 md:px-8 lg:px-16 py-12 bg-black">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Upcoming Events</h2>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="bg-neutral-900 rounded-lg overflow-hidden hover:ring-2 hover:ring-cyan-400 transition-all duration-300 shadow-xl">
                {/* Event Image */}
                <div className="relative h-48">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                </div>
                {/* Event Content - Black Background */}
                <div className="p-5 bg-black">
                  <div className="relative">
                    <div className={`absolute -top-12 left-0 w-14 h-14 rounded-full ${event.organizerBg} flex items-center justify-center font-black text-[9px] leading-[10px] text-center p-2 shadow-lg border-4 border-black`} >
                      {event.organizer}
                    </div>
                  </div>
                  {/* Title */}
                  <h3 className="text-lg font-bold mb-3 text-white">{event.title}</h3>
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {event.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className={`px-2.5 py-1 rounded text-[10px] font-semibold ${
                        tag === 'Open' ? 'bg-green-600 text-white' :
                        tag === 'Upcoming' ? 'bg-yellow-500 text-black' :
                        tag === 'E-sports Tournament' ? 'bg-purple-600 text-white' :
                        tag === 'Contest' ? 'bg-pink-600 text-white' :
                        tag === 'Tournament' ? 'bg-purple-600 text-white' :
                        'bg-purple-600 text-white'
                      }`} >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {/* Description */}
                  <p className="text-xs text-gray-400 mb-4 leading-relaxed">
                    {event.description}
                  </p>
                  {/* Event Details - Two Columns */}
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs mb-5">
                    {/* Left Column */}
                    <div className="space-y-2.5">
                      {event.startDate && (
                        <div className="flex items-center gap-2">
                          <span className="text-gray-400">🕐</span>
                          <span className="text-white font-medium">Start: {event.startDate}</span>
                        </div>
                      )}
                      {event.startTime && (
                        <div className="flex items-center gap-2">
                          <span className="text-gray-400">🕐</span>
                          <span className="text-white font-medium">{event.startTime}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400">👥</span>
                        <span className="text-white font-medium">{event.joined}</span>
                      </div>
                    </div>
                    {/* Right Column */}
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-400">💰</span>
                        <span className="text-yellow-400 font-medium">{event.reward}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400">📍</span>
                        <span className="text-white font-medium">{event.platform}</span>
                      </div>
                    </div>
                  </div>
                  {/* Register Button */}
                  <button className="w-full bg-cyan-400 hover:bg-cyan-500 text-black font-bold py-3 rounded-md text-sm transition-colors duration-300 uppercase tracking-wide">
                    Register
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Ongoing Events Section */}
      <div className="px-4 md:px-8 lg:px-16 py-12 bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Ongoing Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ongoingEvents.map((event, index) => (
              <div key={index} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-red-500/50 transition-shadow duration-300">
                <div className="relative h-48">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                  <div className="absolute top-2 left-2 bg-red-600 text-xs px-3 py-1 rounded-full flex items-center gap-1">
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                    {event.status}
                  </div>
                  <div className="absolute top-2 right-2 bg-purple-600 text-xs px-3 py-1 rounded-full">
                    {event.game}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold mb-3">{event.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-300 mb-4">
                    <span className="text-cyan-400">👁️</span>
                    <span>{event.viewers} watching</span>
                  </div>
                  <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-2 rounded-lg transition-all duration-300">
                    Watch Live
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="px-4 md:px-8 lg:px-16 py-12 bg-black">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
           <p className="text-gray-300 text-lg mb-8">
      Unleashing clarity and empowering decision-making. Find in-depth answers and gain deeper understanding.
    </p>
    <div className="flex justify-center">
     <button className="bg-gradient-to-r from-pink-500 to-purple-500 px-8 py-3 rounded-md text-white font-semibold shadow-lg">
      Support Center
    </button>
    </div>
          <div className="mt-12 space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:bg-gray-800 transition-colors duration-300">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full font-semibold text-lg cursor-pointer flex justify-between items-center text-left"
                >
                  {faq.question}
                  <span className="text-cyan-400 text-2xl">{openFaq === index ? '−' : '+'}</span>
                </button>
                {openFaq === index && (
                  <p className="mt-4 text-gray-300">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}