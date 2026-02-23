import EventsFaq from "./EventsFaq";

export default function Eventsparticipants() {
  const participants = Array.from({ length: 16 });


  return (
    <div className="bg-black text-white pb-16">
      {/* Hero Section */}
      {/* ================= PARTICIPANTS GRID ================= */}
      <div className="px-6 lg:px-20 pt-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {participants.map((_, index) => (
            <div
              key={index}
              className="bg-[#121212] rounded-2xl overflow-hidden border border-white/5 shadow-lg hover:shadow-purple-500/20 transition duration-300"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-3">
                  <img
                    src="https://i.pravatar.cc/40"
                    alt="avatar"
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <p className="text-sm font-medium">Saachi Singh</p>
                    <p className="text-xs text-gray-400">
                      Event: International Cosplay Contest
                    </p>
                  </div>
                </div>
                <span className="text-xs text-gray-400">
                  10 mins ago
                </span>
              </div>

              {/* Image */}
              <div className="px-4">
                <img
                  src="src/assets/Rectangle 34624337.png"
                  alt="participant"
                  className="rounded-lg w-full h-64 object-cover"
                />
              </div>

              {/* Title */}
              <div className="px-4 pt-4 text-center">
                <h3 className="text-xl font-semibold">Jinx</h3>
                <p className="text-gray-400 text-sm">
                  League Of Legends
                </p>
              </div>

              {/* Divider */}
              <div className="border-t border-white/10 mt-4" />

              {/* Footer */}
              <div className="flex justify-between items-center px-6 py-3 text-sm text-gray-400">
                <div className="flex items-center gap-2 cursor-pointer hover:text-white transition">
                  <svg width="24" height="24" viewBox="0 0 37 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <mask id="mask0_6777_63058" style={{maskType:'luminance'}} maskUnits="userSpaceOnUse" x="11" y="5" width="15" height="14">
                      <path d="M11.7607 12L18.0941 6L24.4274 12H20.4274V18H15.7607V12H11.7607Z" fill="#555555" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </mask>
                    <g mask="url(#mask0_6777_63058)">
                      <path d="M10.0928 4H26.0928V20H10.0928V4Z" fill="currentColor"/>
                    </g>
                  </svg>
                  <span>35 Vote Up</span>
                </div>

                <div className="flex items-center gap-2 cursor-pointer hover:text-white transition">
                  <svg width="28" height="28" viewBox="0 0 58 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M33.1475 20.0002C34.5282 20.0002 35.6475 18.9257 35.6475 17.6002C35.6475 16.2747 34.5282 15.2002 33.1475 15.2002C31.7667 15.2002 30.6475 16.2747 30.6475 17.6002C30.6475 18.9257 31.7667 20.0002 33.1475 20.0002Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M33.1475 8.8C34.5282 8.8 35.6475 7.72548 35.6475 6.4C35.6475 5.07452 34.5282 4 33.1475 4C31.7667 4 30.6475 5.07452 30.6475 6.4C30.6475 7.72548 31.7667 8.8 33.1475 8.8Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M23.1475 14.3996C24.5282 14.3996 25.6475 13.3251 25.6475 11.9996C25.6475 10.6741 24.5282 9.59961 23.1475 9.59961C21.7668 9.59961 20.6475 10.6741 20.6475 11.9996C20.6475 13.3251 21.7668 14.3996 23.1475 14.3996Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M31.0628 7.59961L25.2295 10.7996" stroke="currentColor"/>
                    <path d="M25.2295 13.2002L31.0628 16.4002" stroke="currentColor"/>
                    <circle cx="33.1475" cy="6.5" r="2.5" fill="#F0F0F0" fillOpacity="0.25"/>
                    <circle cx="23.1475" cy="12.5" r="2.5" fill="#F0F0F0" fillOpacity="0.25"/>
                    <circle cx="33.1475" cy="17.5" r="2.5" fill="#F0F0F0" fillOpacity="0.25"/>
                  </svg>
                  <span>Share</span>
                </div>
              </div>

            </div>
          ))}

        </div>
      </div>

      {/* shared FAQ component */}
    </div>
  );
}