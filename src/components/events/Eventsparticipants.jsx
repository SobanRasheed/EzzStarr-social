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
                  <span>⬆</span>
                  <span>35 Vote Up</span>
                </div>

                <div className="flex items-center gap-2 cursor-pointer hover:text-white transition">
                  <span>↗</span>
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