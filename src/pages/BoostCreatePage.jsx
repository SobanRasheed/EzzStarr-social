import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWallet } from "../store/slices/walletSlice";
import { TrendingUp, ShieldCheck, Zap, Sparkles, Flame } from "lucide-react";

export default function BoostCreatePage() {
  const dispatch = useDispatch();
  const { wallet } = useSelector((state) => state.wallet);

  const [form, setForm] = useState({
    contentType: "MANGA_CHAPTER",
    contentId: "",
    plan: "STARTER",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    dispatch(fetchWallet());
  }, [dispatch]);

  const plans = [
    {
      id: "STARTER",
      title: "Starter Boost",
      cost: 40,
      duration: "1 Day",
      impressions: "1,000",
      icon: <Zap className="w-10 h-10 text-[#1ED6C6]" />,
      color: "border-[#1ED6C6]/30 hover:border-[#1ED6C6] hover:bg-[#1ED6C6]/5",
    },
    {
      id: "GROWTH",
      title: "Growth Boost",
      cost: 180,
      duration: "3 Days",
      impressions: "5,000",
      icon: <Flame className="w-10 h-10 text-[#AD7AFF]" />,
      color: "border-[#AD7AFF]/30 hover:border-[#AD7AFF] hover:bg-[#AD7AFF]/5",
    },
    {
      id: "VIRAL",
      title: "Viral Boost",
      cost: 325,
      duration: "7 Days",
      impressions: "10,000",
      icon: <Sparkles className="w-10 h-10 text-[#DF28E2]" />,
      color: "border-[#DF28E2]/30 hover:border-[#DF28E2] hover:bg-[#DF28E2]/5",
    },
  ];

  const handlePlanSelect = (planId) => {
    setForm({ ...form, plan: planId });
  };

  const handleTextChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const selectedPlan = plans.find((p) => p.id === form.plan);
  const utilityBalance = wallet?.utilityBalance || 0;
  const isSufficient = utilityBalance >= selectedPlan.cost;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.contentId) {
      alert("Please enter a valid Content ID");
      return;
    }
    if (!isSufficient) {
      alert("Insufficient utility balance. Please load more SKA.");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/boosts/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
        dispatch(fetchWallet());
      } else {
        alert(data.error || "Failed to create campaign");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-28 max-w-5xl mx-auto w-full relative flex flex-col justify-center">
      <div className="absolute top-20 right-1/4 w-80 h-80 bg-[#1ED6C6]/5 rounded-full blur-3xl pointer-events-none" />

      {success ? (
        <div className="max-w-md w-full mx-auto text-center bg-neutral-900/50 backdrop-blur border border-white/10 p-8 rounded-3xl shadow-2xl flex flex-col items-center">
          <div className="w-16 h-16 bg-green-500/10 text-green-400 border border-green-500/20 rounded-full flex items-center justify-center mb-6 animate-bounce">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-white mb-2">Campaign Activated!</h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            Your content boost campaign is officially active. You will start seeing impressions build in your statistics.
          </p>
          <button
            onClick={() => setSuccess(false)}
            className="bg-[#1ED6C6] hover:bg-neutral-800 text-black hover:text-white border border-[#1ED6C6] px-6 py-2.5 font-bold rounded-lg transition-colors cursor-pointer text-xs uppercase tracking-wider"
          >
            Create Another Boost
          </button>
        </div>
      ) : (
        <>
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-extrabold flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-[#DF28E2]" /> Launch Content Boost
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Select one of our promotional distribution campaigns to accelerate impressions for your content.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-12">
            {/* Balance banner */}
            <div className="bg-neutral-900/40 border border-white/10 p-4.5 rounded-2xl flex justify-between items-center text-sm font-semibold max-w-md">
              <span className="text-gray-400">Available Utility Balance:</span>
              <span className="text-[#1ED6C6] text-base">{utilityBalance.toFixed(2)} SKA</span>
            </div>

            {/* Plans row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {plans.map((p) => (
                <div
                  key={p.id}
                  onClick={() => handlePlanSelect(p.id)}
                  className={`border transition-all duration-300 rounded-3xl p-6 cursor-pointer flex flex-col justify-between h-72 shadow-xl ${p.color} ${
                    form.plan === p.id
                      ? "bg-neutral-900 border-[#DF28E2] text-white"
                      : "bg-neutral-900/30 text-gray-300"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    {p.icon}
                    <span
                      className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded ${
                        form.plan === p.id ? "bg-[#DF28E2] text-black" : "bg-white/5 border border-white/5"
                      }`}
                    >
                      {p.id}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold mb-1">{p.title}</h3>
                    <p className="text-3xl font-black mb-4 tracking-tight">
                      {p.cost} <span className="text-sm font-bold text-gray-500">SKA</span>
                    </p>
                    <div className="flex justify-between text-xs text-gray-400 font-semibold font-mono">
                      <span>Target: {p.impressions} imps</span>
                      <span>Duration: {p.duration}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Inputs content */}
            <div className="bg-neutral-900/40 border border-white/10 p-6 md:p-8 rounded-3xl shadow-xl max-w-xl space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    Content Type
                  </label>
                  <select
                    name="contentType"
                    value={form.contentType}
                    onChange={handleTextChange}
                    className="w-full bg-neutral-950 border border-white/10 rounded-lg p-3 text-sm focus:border-[#DF28E2] outline-none text-white"
                  >
                    <option value="MANGA_CHAPTER">Manga Chapter</option>
                    <option value="STORY_PART">Story Part</option>
                    <option value="GIST">Gist Circle</option>
                    <option value="GIST_TOPIC">Gist Topic Thread</option>
                    <option value="EVENT">Event Page</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    Content Identifier (ID)
                  </label>
                  <input
                    type="text"
                    name="contentId"
                    required
                    value={form.contentId}
                    onChange={handleTextChange}
                    placeholder="Enter document Mongoose ID"
                    className="w-full bg-neutral-950 border border-white/10 rounded-lg p-3 text-sm focus:border-[#DF28E2] outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || !isSufficient}
                className={`w-full py-4 font-bold text-black rounded-lg cursor-pointer tracking-wider text-sm uppercase shadow-lg transition-all ${
                  isSufficient
                    ? "bg-[#1ED6C6] hover:bg-[#AD7AFF] shadow-teal-500/10 active:scale-[0.98]"
                    : "bg-neutral-800 text-gray-500 border border-neutral-700 cursor-not-allowed"
                }`}
              >
                {loading
                  ? "Initializing Campaign..."
                  : isSufficient
                  ? `Launch campaign for ${selectedPlan.cost} SKA`
                  : `Insufficient balance (Requires ${selectedPlan.cost} SKA)`}
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
