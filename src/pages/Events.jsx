import "./Events.css";

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
    <div className="events-page">

      {/* HERO SECTION */}
      <div className="events-hero">
        <div className="hero-overlay">
          <span className="hero-badge">PCMag • Open</span>

          <h1>
            God Of War Ragnarok' Review <br />
            <span>– Lightning Strikes Twice Visit</span>
          </h1>

          <p>
            Buckle up for a journey where style meets cutting-edge technology,
            setting the standard for vehicular excellence in our upcoming metaverse.
          </p>

          <div className="hero-actions">
            <button className="join-btn">Join Now</button>
            <span>🎫 Fee: 250</span>
            <span>🏆 Prize 1500 SSPICA</span>
          </div>

          <div className="countdown">
            <div><b>2</b><span>days</span></div>
            <div><b>23</b><span>hours</span></div>
            <div><b>16</b><span>mins</span></div>
            <div><b>32</b><span>secs</span></div>
          </div>
        </div>
      </div>

      {/* UPCOMING EVENTS */}
      <h2 className="section-title">Upcoming Events</h2>

      <div className="events-grid">
        {events.map((event, i) => (
          <div key={i} className="event-card">
            <img src={event.image} alt="event" />

            <div className="event-body">
              <span className="event-category">{event.category}</span>
              <h3>{event.title}</h3>

              <div className="event-meta">
                <span>🎫 Fee: {event.fee}</span>
                <span>⏳ {event.days}</span>
              </div>

              <p>
                Cosplay is a performance art in which the participants dress in
                costumes and make-up, representing character...
              </p>

              <div className="event-footer">
                <span className="prize">🏆 Prize: {event.prize}</span>
                <button className="join-small">Join Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
