export default function Eventsoverview() {
  // faq logic moved to shared component
  return (
    <div className="min-h-screen bg-black text-white pb-16">
      {/* Hero Section */}
      {/* ================= BODY (FIGMA EVENT DETAIL) ================= */}
      <div className="px-6 md:px-16 py-16 bg-black">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* LEFT SIDE */}
          <div className="lg:col-span-2">

            {/* Tabs */}
            {/* Description Card */}
            <div className="bg-[#1C1C1E]/60 p-2  border border-[#1C1C1E]">
              {/* ================= IMAGE GALLERY SECTION ================= */}
              <div className="max-w-[1400px] mx-auto mt-12 px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                  {/* ================= LEFT - 6 IMAGES ================= */}
                  <div className="grid grid-cols-2 gap-x-1 gap-y-0">

                    {[1, 2, 3, 4, 5, 6].map((item) => (
                      <div
                        key={item}
                        className="h-[200px] md:h-[110px]  overflow-hidden"
                      >
                        <img
                          src="https://images.unsplash.com/photo-1607746882042-944635dfe10e"
                          alt="gallery"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}

                  </div>

                  {/* ================= RIGHT - BIG IMAGE ================= */}
                  <div className="relative h-[336px] overflow-hidden">

                    <img
                      src="https://images.unsplash.com/photo-1540575467063-178a50c2df87"
                      alt="event main"
                      className="w-full h-full object-cover"
                    />

                    {/* Overlay Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button className="bg-white text-black px-6 py-3 rounded-lg font-medium shadow-lg hover:scale-105 transition">
                        Submit Photo
                      </button>
                    </div>

                  </div>

                </div>
              </div>

              <h2 className="text-2xl font-bold mb-6">Description</h2>

              <p className="text-gray-300 text-sm mb-6 font-semibold">
                ABOUT 8 BALL POOL WINTER TOURNAMENT 14
              </p>

              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Please contact the Tournament Organizer on Discord for any questions and issues regarding gameplay,
                scores, match schedules, registration status, Game ID, and more.
              </p>

              <p className="text-sm mb-2">
                <span className="text-gray-300 font-medium">Discord Link: </span>
                <a
                  href="https://discord.gg/8WgwNNAjus"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:underline"
                >
                  https://discord.gg/8WgwNNAjus
                </a>
              </p>

              <p className="text-sm text-gray-300 mt-4 font-medium">
                PLATFORMS: <span className="text-gray-400">MOBILE</span>
              </p>

              <div className="mt-4 space-y-2 text-sm">
                <p className="text-gray-300 font-medium">GAME LINKS IOS AND ANDROID:</p>

                <a
                  href="https://play.google.com/store/apps/details?id=com.miniclip.eightballpool"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-purple-400 hover:underline break-all"
                >
                  Google Play Store
                </a>

                <a
                  href="https://apps.apple.com/us/app/8-ball-pool/id543186831"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-purple-400 hover:underline break-all"
                >
                  Apple App Store
                </a>
              </div>

              {/* Tournament Rules */}
              <h3 className="text-lg font-semibold mt-8 mb-4">TOURNAMENT RULES:</h3>

              <ul className="list-disc ml-6 text-gray-400 text-sm space-y-2">
                <li>Add opponent via Unique ID (Example: 162-866-549-3).</li>
                <li>Unique ID must match tournament table or you will be disqualified.</li>
                <li>Practice matches are not allowed.</li>
                <li>If a player disconnects, they must return quickly.</li>
                <li>You must have 500 coins to join games.</li>
                <li>All matches best of 3; Finals best of 5.</li>
                <li>Beginner Cue must be used for fair play.</li>
                <li>If opponent uses another Cue, screenshot as proof.</li>
                <li>Using any Cue other than Beginner Cue = disqualification.</li>
                <li>Choose 200 coins prize pool (SYDNEY Marina Bar).</li>
                <li>Players must provide their ID in Discord (9 Ball Pool ID Tab).</li>
              </ul>

              {/* How to Create Game */}
              <h3 className="text-lg font-semibold mt-8 mb-4">HOW TO CREATE A GAME:</h3>

              <ul className="list-disc ml-6 text-gray-400 text-sm space-y-2">
                <li>Add opponent as Friend.</li>
                <li>Both players select Beginner Cue.</li>
                <li>Open Friend List.</li>
                <li>Click Challenge on opponent’s name.</li>
                <li>Select 200 coins prize pool (SYDNEY Marina Bar).</li>
                <li>Both players accept and start match.</li>
              </ul>

              {/* Score Submission Rules */}
              <h3 className="text-lg font-semibold mt-8 mb-4">SCORE SUBMISSION RULES:</h3>

              <ul className="list-disc ml-6 text-gray-400 text-sm space-y-2">
                <li>Submit photo proof showing victory and opponent ID.</li>
                <li>No screenshot = possible match loss.</li>
                <li>15+ minutes late = disqualification.</li>
                <li>If opponent ignores friend request, screenshot after 15 mins.</li>
                <li>Register attendance after 15 mins if no response.</li>
                <li>Waiting time is 15 minutes.</li>
                <li>If no result submitted by both, one party qualifies randomly.</li>
                <li>Matches must follow tournament schedule unless both agree earlier.</li>
              </ul>

              {/* Steps to Submit Score */}
              <h3 className="text-lg font-semibold mt-8 mb-4">
                HERE ARE THE STEPS TO SUBMIT SCORES:
              </h3>

              <ul className="list-disc ml-6 text-gray-400 text-sm space-y-2">
                <li>Login to Kafu Games → My Tournaments.</li>
                <li>Select your Tournament.</li>
                <li>Click on the “Matches” tab.</li>
                <li>Click “Submit Scores”.</li>
                <li>Enter score, upload screenshot, click Done.</li>
                <li>Score submission available after 15 mins for 60 mins.</li>
              </ul>
            </div>

          </div>

          {/* RIGHT SIDEBAR */}
          <div className="space-y-8">

            <div className="bg-[#1C1C1E]/60 p-6 rounded-xl border border-[#1C1C1E]">
              <h3 className="text-lg font-semibold mb-6">Hosted By</h3>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-[#00615B] flex items-center justify-center font-bold">
                  EZ
                </div>
                <span>Ezzstar</span>
              </div>
            </div>

            <div className="bg-[#1C1C1E]/60 p-6 rounded-xl border border-[#1C1C1E]">
              <h3 className="text-lg font-semibold mb-6">Timeline</h3>
              <p className="text-gray-400 text-sm">Contest Starts</p>
              <p className="mb-4">2 April 2024</p>
              <p className="text-gray-400 text-sm">Contest Ends</p>
              <p>20 April 2024</p>
            </div>

            <div className="bg-[#1C1C1E]/60 p-6 rounded-xl border border-[#1C1C1E]">
              <h3 className="text-lg font-semibold mb-6">
                Contestants <span className="text-[#DF28E2]">(100)</span>
              </h3>

              <div className="flex -space-x-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <img
                    key={i}
                    src={`https://i.pravatar.cc/100?img=${i}`}
                    className="w-10 h-10 rounded-full border-2 border-black"
                    alt=""
                  />
                ))}
              </div>
            </div>

            <div className="bg-[#1C1C1E]/60 p-6 rounded-xl border border-[#1C1C1E]">
              <h3 className="text-lg font-semibold mb-4">Venue</h3>
              <p className="text-gray-400 text-sm">Online</p>
              <p>Ezzstar</p>
            </div>
          </div>
        </div>
      </div>

      {/* shared FAQ component */}
    </div>
  );
}