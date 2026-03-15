export default function EventsSubHero() {
  return (
    <div
        className="relative min-h-screen bg-cover text-white bg-center"
        style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=1200&h=400&fit=crop')` }}
      >
        <div className="absolute inset-0 flex flex-col justify-end items-start px-8 md:px-16 pb-12 md:pb-16">
          <div className="flex items-center gap-4 mb-4">
          </div>

          <div className="flex items-center gap-2 mb-4">
            <span className="bg-black/70 border border-gray-700 px-3 py-1 rounded-full text-xs">
              Upcoming
            </span>

            <span className="bg-cyan-500 text-black px-3 py-1 rounded-full text-xs font-semibold">
              Game Jam
            </span>


          </div>

          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-white">
            International Cosplay Contest
          </h1>

          <div className="flex flex-wrap items-center gap-3">

            <button className="bg-gradient-to-r from-purple-600 to-pink-500 px-5 py-2.5 rounded-lg font-semibold text-white">
              Register
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
        {/* Timer - Bottom Right */}
        <div className="absolute bottom-6 right-4 md:bottom-8 md:right-16">

          <div className="bg-[#2A0F2F]/90 backdrop-blur-md px-10 py-6 rounded-2xl flex items-center gap-12 text-white shadow-xl">

            <div>
              <p className="text-sm text-gray-300 mb-2">Event Starts-In</p>
              <div className="flex items-end gap-8">

                <div className="flex items-end gap-1">
                  <span className="text-4xl font-bold">2</span>
                  <span className="text-gray-400">days</span>
                </div>

                <div className="flex items-end gap-1">
                  <span className="text-4xl font-bold">23</span>
                  <span className="text-gray-400">hours</span>
                </div>

                <div className="flex items-end gap-1">
                  <span className="text-4xl font-bold">16</span>
                  <span className="text-gray-400">mins</span>
                </div>

                <div className="flex items-end gap-1">
                  <span className="text-4xl font-bold">32</span>
                  <span className="text-gray-400">secs</span>
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>

  )
}
