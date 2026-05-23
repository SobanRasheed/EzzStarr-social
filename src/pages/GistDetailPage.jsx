import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchGist, createTopic } from "../store/slices/gistSlice";
import { Eye, MessageSquare, Share2, Plus, MessageCircle } from "lucide-react";

export default function GistDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentGist, topics, loading } = useSelector((state) => state.gist);

  const [form, setForm] = useState({ title: "", body: "" });
  const [topicLoading, setTopicLoading] = useState(false);

  const isLoggedIn = !!localStorage.getItem("token");

  useEffect(() => {
    dispatch(fetchGist(id));
  }, [dispatch, id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.body) return;
    setTopicLoading(true);
    try {
      await dispatch(createTopic({ gistId: id, title: form.title, body: form.body })).unwrap();
      setForm({ title: "", body: "" });
    } catch (err) {
      alert(err || "Failed to post topic");
    } finally {
      setTopicLoading(false);
    }
  };

  if (loading && !currentGist) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center animate-pulse">
        Loading Gist discussion...
      </div>
    );
  }

  if (!currentGist) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-[#DF28E2] mb-2">Gist Not Found</h2>
          <p className="text-gray-400 text-sm">The discussion circle you are looking for does not exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-28 max-w-4xl mx-auto w-full relative">
      <div className="absolute top-20 right-10 w-80 h-80 bg-[#1ED6C6]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Gist Details header */}
      <div className="bg-neutral-900/40 border border-white/10 p-8 rounded-3xl shadow-xl mb-12 flex flex-col sm:flex-row items-center gap-6">
        {currentGist.coverUrl && (
          <img src={currentGist.coverUrl} className="w-24 h-24 rounded-2xl object-cover border border-white/10" alt="" />
        )}
        <div className="flex-1 text-center sm:text-left">
          <h1 className="text-3xl font-extrabold tracking-tight mb-2 text-[#1ED6C6]">
            {currentGist.name}
          </h1>
          <p className="text-gray-300 text-sm mb-4 leading-relaxed max-w-2xl">
            {currentGist.description || "No description provided."}
          </p>
          <p className="text-xs text-gray-500 font-medium">
            Created by <span className="text-[#DF28E2]">@{currentGist.creatorId?.username || "unknown"}</span>
          </p>
        </div>
      </div>

      {/* Gist Topics list */}
      <div className="mb-12 space-y-6">
        <h2 className="text-2xl font-bold tracking-tight border-b border-white/10 pb-4">
          Circle Threads
        </h2>

        {topics.length === 0 ? (
          <div className="text-center py-12 text-gray-500 text-sm bg-neutral-900/20 border border-white/5 rounded-2xl">
            No discussion topics created yet in this circle.
          </div>
        ) : (
          <div className="space-y-4">
            {topics.map((t) => (
              <Link
                key={t._id}
                to={`/gists/topics/${t._id}`}
                className="block bg-neutral-900/30 border border-white/5 hover:border-[#DF28E2] rounded-2xl p-5 hover:bg-neutral-900/60 transition-all shadow-md group"
              >
                <h3 className="text-lg font-bold group-hover:text-[#DF28E2] transition-colors mb-2">
                  {t.title}
                </h3>
                <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed mb-4">
                  {t.body}
                </p>

                <div className="flex flex-wrap items-center justify-between text-xs text-gray-500 font-medium pt-2 border-t border-white/5">
                  <div className="flex items-center gap-5">
                    <span className="flex items-center gap-1.5 hover:text-white transition-colors">
                      <Eye className="w-4 h-4 text-[#1ED6C6]" /> {t.qualifiedViewCount}
                    </span>
                    <span className="flex items-center gap-1.5 hover:text-white transition-colors">
                      <MessageSquare className="w-4 h-4 text-[#DF28E2]" /> {t.commentCount}
                    </span>
                    <span className="flex items-center gap-1.5 hover:text-white transition-colors">
                      <Share2 className="w-4 h-4 text-[#AD7AFF]" /> {t.shareCount}
                    </span>
                  </div>
                  <span>{new Date(t.createdAt).toLocaleDateString()}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Create Topic Form */}
      {isLoggedIn ? (
        <div className="bg-neutral-900/40 border border-white/10 p-6 rounded-3xl shadow-xl">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Plus className="w-5 h-5 text-[#DF28E2]" /> Post a New Thread
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Thread Title
              </label>
              <input
                type="text"
                name="title"
                required
                value={form.title}
                onChange={handleChange}
                placeholder="Briefly state your topic..."
                className="w-full bg-neutral-950 border border-white/10 rounded-lg p-3 text-sm focus:border-[#DF28E2] outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Discussion Content
              </label>
              <textarea
                name="body"
                required
                rows="4"
                value={form.body}
                onChange={handleChange}
                placeholder="Share your thoughts with the circle..."
                className="w-full bg-neutral-950 border border-white/10 rounded-lg p-3 text-sm focus:border-[#DF28E2] outline-none resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={topicLoading}
              className="bg-[#DF28E2] hover:bg-[#AD7AFF] transition-all px-6 py-3 font-bold text-black rounded-lg cursor-pointer text-xs uppercase tracking-wider block ml-auto shadow-md"
            >
              {topicLoading ? "Posting..." : "Publish Thread"}
            </button>
          </form>
        </div>
      ) : (
        <div className="bg-neutral-900/20 border border-white/5 p-6 rounded-3xl text-center">
          <MessageCircle className="w-12 h-12 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-400 text-sm">Please log in to start a new discussion thread.</p>
        </div>
      )}
    </div>
  );
}
