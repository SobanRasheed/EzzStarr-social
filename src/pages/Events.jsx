const events = [
  {
    title: "Ezzstar Social Event Begin Coming Soon",
    category: "EzzStar",
    fee: "25 USD",
    days: "25 days",
    prize: "1500 SSPICA",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7",
  },
  {
    title: "Ezzstar Social Event Begin Coming Soon",
    category: "Apex Legends",
    fee: "250",
    days: "25 days",
    prize: "1500 SSPICA",
    image: "https://images.unsplash.com/photo-1605902711622-cfb43c44367f",
  },
  {
    title: "Ezzstar Social Event Begin Coming Soon",
    category: "FC 24",
    fee: "250",
    days: "25 days",
    prize: "1500 SSPICA",
    image: "https://images.unsplash.com/photo-1518091043644-c1d4457512c6",
  },
   {
    title: "Ezzstar Social Event Begin Coming Soon",
    category: "EzzStar",
    fee: "25 USD",
    days: "25 days",
    prize: "1500 SSPICA",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7",
  },
  {
    title: "Ezzstar Social Event Begin Coming Soon",
    category: "Apex Legends",
    fee: "250",
    days: "25 days",
    prize: "1500 SSPICA",
    image: "https://images.unsplash.com/photo-1605902711622-cfb43c44367f",
  },
  {
    title: "Ezzstar Social Event Begin Coming Soon",
    category: "FC 24",
    fee: "250",
    days: "25 days",
    prize: "1500 SSPICA",
    image: "https://images.unsplash.com/photo-1518091043644-c1d4457512c6",
  },
];

export default function Events() {
  return (
    <div className="bg-black text-white min-h-screen font-sans">

      {/* HERO SECTION */}
      <div className="h-[420px] bg-cover bg-center bg-no-repeat relative" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1606112219348-204d7d8b94ee")' }}>
        <div className="h-full px-[60px] py-[60px] bg-gradient-to-r from-black/85 via-black/40 to-transparent/0">
          <span className="inline-block bg-gray-900 px-3 py-1 rounded-full text-xs mb-[15px]">PCMag • Open</span>

          <h1 className="text-4xl font-black max-w-[700px] leading-tight">
            God Of War Ragnarok' Review <br />
            <span className="font-medium">– Lightning Strikes Twice Visit</span>
          </h1>

          <p className="max-w-[550px] my-[15px] text-gray-400">
            Buckle up for a journey where style meets cutting-edge technology,
            setting the standard for vehicular excellence in our upcoming metaverse.
          </p>

          <div className="flex gap-[15px] items-center my-[15px]">
            <button className="bg-gradient-to-r from-cyan-400 to-purple-500 px-5 py-2 rounded-lg text-black font-semibold cursor-pointer">Join Now</button>
            <span>🎫 Fee: 250</span>
            <span>🏆 Prize 1500 SSPICA</span>
          </div>

          <div className="flex gap-5 mt-[25px]">
            <div className="bg-gray-900 px-3.5 py-2.5 rounded-lg text-center"><b className="block text-lg">2</b><span className="text-xs text-gray-500">days</span></div>
            <div className="bg-gray-900 px-3.5 py-2.5 rounded-lg text-center"><b className="block text-lg">23</b><span className="text-xs text-gray-500">hours</span></div>
            <div className="bg-gray-900 px-3.5 py-2.5 rounded-lg text-center"><b className="block text-lg">16</b><span className="text-xs text-gray-500">mins</span></div>
            <div className="bg-gray-900 px-3.5 py-2.5 rounded-lg text-center"><b className="block text-lg">32</b><span className="text-xs text-gray-500">secs</span></div>
          </div>
        </div>
      </div>

      {/* UPCOMING EVENTS */}
      <h2 className="mx-4 md:mx-[60px] mt-10 mb-5 text-2xl text-cyan-400">Upcoming Events</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-[25px] px-4 md:px-[60px] pb-8 md:pb-[60px]">
        {events.map((event, i) => (
          <div key={i} className="bg-gray-900 rounded-2xl overflow-hidden">
            <img src={event.image} alt="event" className="w-full h-[180px] object-cover" />

            <div className="p-[18px]">
              <span className="inline-block bg-gray-900 px-2.5 py-1 rounded-full text-xs mb-2">{event.category}</span>
              <h3 className="text-base my-2.5">{event.title}</h3>

              <div className="flex gap-[15px] text-xs text-gray-500">
                <span>🎫 Fee: {event.fee}</span>
                <span>⏳ {event.days}</span>
              </div>

              <p className="text-sm text-gray-400 my-2.5">
                Cosplay is a performance art in which the participants dress in
                costumes and make-up, representing character...
              </p>

              <div className="flex justify-between items-center">
                <span className="text-purple-400 text-sm">🏆 Prize: {event.prize}</span>
                <button className="bg-cyan-400 px-3.5 py-1.5 rounded-full text-black font-semibold cursor-pointer text-xs">Join Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
