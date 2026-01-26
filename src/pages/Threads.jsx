import "./Threads.css";

const threadsData = [
  {
    id: 1,
    author: "Kelly Wearstler",
    time: "about 1 hour ago",
    title: "Will it be a sin to take Grandma Mildred's dress ornaments apart for jewelry?",
    replies: 12,
    views: "42,312",
    image: null,
    subscribed: false,
  },
  {
    id: 2,
    author: "Kelly Wearstler",
    time: "about 1 hour ago",
    title: "New Apex Legend cheat brings smurfing in low ranked lobbies to a whole new level Visit",
    replies: 12,
    views: "42,312",
    image: "https://images.unsplash.com/photo-1605902711622-cfb43c44367f",
    subscribed: false,
  },
  {
    id: 3,
    author: "Kelly Wearstler",
    time: "about 1 hour ago",
    title: `"I'm your wife not your mom." My wife F32 always says this to me 34M and I don't know how to respond. How can I make her see my side?`,
    replies: 12,
    views: "42,312",
    image: null,
    subscribed: true,
  },
  {
    id: 4,
    author: "Kelly Wearstler",
    time: "about 1 hour ago",
    title: "Is it cultural appropriation?\nhttps://youtu.be/nRQJbgN1_Xw?si=zm2IZS4WR7y2hEwL",
    replies: 12,
    views: "42,312",
    image: "https://images.unsplash.com/photo-1611605698335-6f52c9b5d8c6",
    subscribed: false,
  },
  {
    id: 3,
    author: "Kelly Wearstler",
    time: "about 1 hour ago",
    title: `"I'm your wife not your mom." My wife F32 always says this to me 34M and I don't know how to respond. How can I make her see my side?`,
    replies: 12,
    views: "42,312",
    image: null,
    subscribed: true,
  },
   {
    id: 2,
    author: "Kelly Wearstler",
    time: "about 1 hour ago",
    title: "New Apex Legend cheat brings smurfing in low ranked lobbies to a whole new level Visit",
    replies: 12,
    views: "42,312",
    image: "https://images.unsplash.com/photo-1605902711622-cfb43c44367f",
    subscribed: false,
  },
  {
    id: 3,
    author: "Kelly Wearstler",
    time: "about 1 hour ago",
    title: `"I'm your wife not your mom." My wife F32 always says this to me 34M and I don't know how to respond. How can I make her see my side?`,
    replies: 12,
    views: "42,312",
    image: null,
    subscribed: true,
  },
   {
    id: 2,
    author: "Kelly Wearstler",
    time: "about 1 hour ago",
    title: "New Apex Legend cheat brings smurfing in low ranked lobbies to a whole new level Visit",
    replies: 12,
    views: "42,312",
    image: "https://images.unsplash.com/photo-1605902711622-cfb43c44367f",
    subscribed: false,
  },
   {
    id: 2,
    author: "Kelly Wearstler",
    time: "about 1 hour ago",
    title: "New Apex Legend cheat brings smurfing in low ranked lobbies to a whole new level Visit",
    replies: 12,
    views: "42,312",
    image: "https://images.unsplash.com/photo-1605902711622-cfb43c44367f",
    subscribed: false,
  },
  {
    id: 3,
    author: "Kelly Wearstler",
    time: "about 1 hour ago",
    title: `"I'm your wife not your mom." My wife F32 always says this to me 34M and I don't know how to respond. How can I make her see my side?`,
    replies: 12,
    views: "42,312",
    image: null,
    subscribed: true,
  },
   {
    id: 2,
    author: "Kelly Wearstler",
    time: "about 1 hour ago",
    title: "New Apex Legend cheat brings smurfing in low ranked lobbies to a whole new level Visit",
    replies: 12,
    views: "42,312",
    image: "https://images.unsplash.com/photo-1605902711622-cfb43c44367f",
    subscribed: false,
  },
  {
    id: 3,
    author: "Kelly Wearstler",
    time: "about 1 hour ago",
    title: `"I'm your wife not your mom." My wife F32 always says this to me 34M and I don't know how to respond. How can I make her see my side?`,
    replies: 12,
    views: "42,312",
    image: null,
    subscribed: true,
  },
  {
    id: 3,
    author: "Kelly Wearstler",
    time: "about 1 hour ago",
    title: `"I'm your wife not your mom." My wife F32 always says this to me 34M and I don't know how to respond. How can I make her see my side?`,
    replies: 12,
    views: "42,312",
    image: null,
    subscribed: true,
  },
  {
    id: 3,
    author: "Kelly Wearstler",
    time: "about 1 hour ago",
    title: `"I'm your wife not your mom." My wife F32 always says this to me 34M and I don't know how to respond. How can I make her see my side?`,
    replies: 12,
    views: "42,312",
    image: null,
    subscribed: true,
  },
   {
    id: 2,
    author: "Kelly Wearstler",
    time: "about 1 hour ago",
    title: "New Apex Legend cheat brings smurfing in low ranked lobbies to a whole new level Visit",
    replies: 12,
    views: "42,312",
    image: "https://images.unsplash.com/photo-1605902711622-cfb43c44367f",
    subscribed: false,
  },
  {
    id: 3,
    author: "Kelly Wearstler",
    time: "about 1 hour ago",
    title: `"I'm your wife not your mom." My wife F32 always says this to me 34M and I don't know how to respond. How can I make her see my side?`,
    replies: 12,
    views: "42,312",
    image: null,
    subscribed: true,
  },
  {
    id: 3,
    author: "Kelly Wearstler",
    time: "about 1 hour ago",
    title: `"I'm your wife not your mom." My wife F32 always says this to me 34M and I don't know how to respond. How can I make her see my side?`,
    replies: 12,
    views: "42,312",
    image: null,
    subscribed: true,
  },
  {
    id: 3,
    author: "Kelly Wearstler",
    time: "about 1 hour ago",
    title: `"I'm your wife not your mom." My wife F32 always says this to me 34M and I don't know how to respond. How can I make her see my side?`,
    replies: 12,
    views: "42,312",
    image: null,
    subscribed: true,
  },
];

export default function Threads() {
  return (
    <div className="threads-page">
      {/* Header */}
      <div className="threads-header">
        <h1>Threads</h1>
        <button className="create-thread-btn">✨ Create Threads</button>
      </div>

      {/* Tabs */}
      <div className="threads-tabs">
        <button className="active">Latest Threads</button>
        <button>All Threads</button>
        <button>Private Threads</button>
      </div>

      {/* Content */}
      <div className="threads-content">
        {/* Left */}
        <div className="threads-list">
          {threadsData.map((thread) => (
            <div key={thread.id} className="thread-card">
              <div className="thread-top">
                <span className="author">{thread.author}</span>
                <span className="dot">•</span>
                <span className="time">{thread.time}</span>
                <div className="thread-actions">
                  <button className={thread.subscribed ? "subscribed" : "subscribe"}>
                    {thread.subscribed ? "Subscribed" : "Subscribe"}
                  </button>
                  <span className="dots">•••</span>
                </div>
              </div>

              <div className="thread-body">
                <h3>{thread.title}</h3>
                {thread.image && (
                  <img src={thread.image} alt="thread" />
                )}
              </div>

              <div className="thread-footer">
                <div className="badge">⭐ Star</div>
                <div className="badge">💬 Reply ({thread.replies})</div>
                <div className="badge">👁 {thread.views}</div>
                <div className="badge">💜 Give Tip</div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Sidebar */}
        <div className="threads-sidebar">
          <div className="sidebar-card">
            <h4>Top Creators</h4>
            {["Mux Michel", "Danish Javed", "Mux Michel", "Danish Javed"].map(
              (name, i) => (
                <div key={i} className="creator">
                  <div className="avatar"></div>
                  <div className="creator-info">
                    <span>{name}</span>
                    <small>11 posts</small>
                  </div>
                  <button>Subscribe</button>
                </div>
              )
            )}
          </div>

          <div className="sidebar-card upgrade">
            <h4>Upgrade Your Profile</h4>
            <p>Danish, explore relevant profile theme with <b>Ezzstar pro</b></p>
            <button className="upgrade-btn">Upgrade</button>
            <small>Ad ···</small>
          </div>
        </div>
      </div>
    </div>
  );
}
