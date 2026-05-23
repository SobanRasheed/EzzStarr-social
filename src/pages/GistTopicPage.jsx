import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ThumbsUp, Heart, Flame, AlertCircle, Coins, MessageSquare, CornerDownRight } from "lucide-react";
import TipModal from "../components/TipModal";

export default function GistTopicPage() {
  const { topicId } = useParams();
  const [topic, setTopic] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentBody, setCommentBody] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);
  const [reactionsCount, setReactionsCount] = useState({ LIKE: 0, LOVE: 0, FIRE: 0, WOW: 0 });
  const [activeReaction, setActiveReaction] = useState(null);

  const [isTipOpen, setIsTipOpen] = useState(false);

  const isLoggedIn = !!localStorage.getItem("token");

  const getHeaders = () => {
    const token = localStorage.getItem("token");
    return {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  };

  const loadTopic = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/gists/topics/${topicId}`);
      const data = await res.json();
      if (res.ok) {
        setTopic(data.topic);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const loadComments = async () => {
    try {
      // Find GistTopic comments
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/feed/home`, { headers: getHeaders() });
      // Actually we can query standard comments for GistTopic. Since we didn't specify a comments query route, we can fetch from a generic route or load comments directly. Let's do a fetch comment for GIST_TOPIC contentId:
      const commentsRes = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/transactions`, { headers: getHeaders() }); // let's fallback to querying standard Comment documents if a route exists. Wait, Comment documents query can be fetched directly using:
      // Since we don't have a specific GET comments route, let's create a temporary fetch using the models. Oh wait, in engagement.routes.js we have comments route but no GET. So we can just fetch all comments by query in database? Yes, wait! If there is no query route, we can add a GET /api/comments/:contentType/:contentId route in engagement.routes.js! That's a perfect follow-up extension that never breaks any rules!
      // Let's implement that in engagement.routes.js.
    } catch (e) {
      console.error(e);
    }
  };

  // Safe fetch helper for comments
  const fetchTopicComments = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/comments/GIST_TOPIC/${topicId}`);
      const data = await res.json();
      if (res.ok) {
        setComments(data.comments || []);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    setLoading(true);
    Promise.all([loadTopic(), fetchTopicComments()]).finally(() => setLoading(false));

    // 🕒 rewarded view recording timeout (20 seconds)
    const viewTimer = setTimeout(() => {
      fetch(`${import.meta.env.VITE_API_URL}/api/views/record`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({
          contentType: "GIST_TOPIC",
          contentId: topicId,
          durationSeconds: 20,
          isBoosted: false,
          deviceHash: "local_browser_view",
        }),
      }).catch((e) => console.error("View logging failed", e));
    }, 20000);

    return () => clearTimeout(viewTimer);
  }, [topicId]);

  const handlePostComment = async (e) => {
    e.preventDefault();
    if (!commentBody.trim()) return;
    setCommentLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/comments`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({
          contentType: "GIST_TOPIC",
          contentId: topicId,
          body: commentBody,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setCommentBody("");
        fetchTopicComments();
      } else {
        alert(data.error || "Failed to post comment");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setCommentLoading(false);
    }
  };

  const handleReact = async (type) => {
    if (!isLoggedIn) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/reactions`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({
          contentType: "GIST_TOPIC",
          contentId: topicId,
          reactionType: type,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setActiveReaction(data.action === "CREATED" || data.action === "UPDATED" ? type : null);
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (loading && !topic) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center animate-pulse">
        Retrieving thread details...
      </div>
    );
  }

  if (!topic) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-[#DF28E2] mb-2">Thread Not Found</h2>
          <p className="text-gray-400 text-sm">The discussion thread you are looking for does not exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-28 max-w-3xl mx-auto w-full relative">
      <div className="absolute top-20 left-10 w-80 h-80 bg-[#AD7AFF]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main topic thread card */}
      <div className="bg-neutral-900/40 border border-white/10 p-6 md:p-8 rounded-3xl shadow-2xl mb-8 relative">
        <h1 className="text-2xl md:text-3xl font-extrabold mb-4 tracking-tight leading-snug">
          {topic.title}
        </h1>

        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
          <img src={topic.creatorId?.profilePic || "pfp.svg"} className="w-10 h-10 rounded-full object-cover" alt="" />
          <div>
            <p className="text-sm font-bold text-white/90">{topic.creatorId?.displayName || "Anonymous Creator"}</p>
            <p className="text-xs text-gray-500">@{topic.creatorId?.username}</p>
          </div>
        </div>

        <p className="text-gray-200 text-sm md:text-base leading-relaxed whitespace-pre-line mb-8 font-medium">
          {topic.body}
        </p>

        {/* Action rows: reactions, tipping, share */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/5">
          {/* Reaction buttons */}
          <div className="flex gap-2">
            {[
              { type: "LIKE", label: "Like", icon: <ThumbsUp className="w-4 h-4" /> },
              { type: "LOVE", label: "Love", icon: <Heart className="w-4 h-4 text-rose-500" /> },
              { type: "FIRE", label: "Fire", icon: <Flame className="w-4 h-4 text-amber-500" /> },
              { type: "WOW", label: "Wow", icon: <AlertCircle className="w-4 h-4 text-sky-400" /> },
            ].map((r) => (
              <button
                key={r.type}
                onClick={() => handleReact(r.type)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full border transition-all text-xs font-semibold cursor-pointer ${
                  activeReaction === r.type
                    ? "bg-[#DF28E2]/15 border-[#DF28E2] text-white"
                    : "bg-neutral-900 border-white/5 hover:border-white/20 text-gray-400"
                }`}
              >
                {r.icon} <span>{r.label}</span>
              </button>
            ))}
          </div>

          {/* Tipping */}
          <button
            onClick={() => setIsTipOpen(true)}
            className="flex items-center gap-2 bg-[#DF28E2] hover:bg-[#AD7AFF] transition-all font-extrabold text-black text-xs uppercase tracking-wider px-5 py-2.5 rounded-full cursor-pointer shadow-lg shadow-pink-500/10"
          >
            <Coins className="w-4 h-4" /> Send Tip
          </button>
        </div>
      </div>

      {/* Comments Board */}
      <div className="space-y-6 mb-12">
        <h2 className="text-xl font-bold tracking-tight border-b border-white/10 pb-3 flex items-center gap-2">
          Comments <span className="text-[#1ED6C6] font-mono text-sm">({comments.length})</span>
        </h2>

        {comments.length === 0 ? (
          <div className="text-center py-8 text-gray-500 text-sm">
            Be the first to share your thoughts in this thread!
          </div>
        ) : (
          <div className="space-y-4">
            {comments.map((c) => (
              <div key={c._id} className="bg-neutral-900/30 border border-white/5 p-5 rounded-2xl relative">
                <div className="flex items-center gap-2.5 mb-2.5">
                  <img src={c.authorId?.profilePic || "pfp.svg"} className="w-8 h-8 rounded-full object-cover" alt="" />
                  <div>
                    <p className="text-xs font-bold text-white/90">
                      {c.authorId?.displayName || "Anonymous Creator"}{" "}
                      <span className="text-gray-500 font-mono">@{c.authorId?.username}</span>
                    </p>
                    <p className="text-[10px] text-gray-500">{new Date(c.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="flex items-start gap-1">
                  <CornerDownRight className="w-3.5 h-3.5 text-gray-600 mt-1 flex-shrink-0" />
                  <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line font-medium">
                    {c.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Comments input box */}
      {isLoggedIn ? (
        <form onSubmit={handlePostComment} className="bg-neutral-900/40 border border-white/10 p-5 rounded-3xl shadow-xl">
          <textarea
            required
            rows="3"
            value={commentBody}
            onChange={(e) => setCommentBody(e.target.value)}
            placeholder="Write a constructive response..."
            className="w-full bg-neutral-950 border border-white/10 rounded-lg p-3 text-sm focus:border-[#DF28E2] outline-none resize-none mb-3"
          />
          <button
            type="submit"
            disabled={commentLoading}
            className="bg-[#DF28E2] hover:bg-[#AD7AFF] transition-all px-5 py-2.5 font-bold text-black rounded-lg cursor-pointer text-xs uppercase tracking-wider block ml-auto"
          >
            {commentLoading ? "Posting..." : "Post Comment"}
          </button>
        </form>
      ) : (
        <div className="bg-neutral-900/10 border border-white/5 p-5 rounded-2xl text-center text-gray-500 text-sm">
          Please sign in to write responses.
        </div>
      )}

      {/* Modal Tip */}
      <TipModal
        isOpen={isTipOpen}
        onClose={() => setIsTipOpen(false)}
        contentType="GIST_TOPIC"
        contentId={topicId}
        onSuccess={() => {
          setIsTipOpen(false);
          alert("Tip sent successfully!");
        }}
      />
    </div>
  );
}
