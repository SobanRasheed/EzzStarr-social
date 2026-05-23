import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchWallet } from "../store/slices/walletSlice";
import { fetchXP } from "../store/slices/xpSlice";

export default function OnboardingProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    username: "",
    displayName: "",
    bio: "",
    country: "USA",
    language: "en",
    avatarUrl: "",
    bannerUrl: "",
  });

  const [loading, setLoading] = useState(false);
  const [successReward, setSuccessReward] = useState(null);

  const countries = ["USA", "Japan", "Canada", "Germany", "United Kingdom", "France", "Australia", "India", "Nigeria", "Brazil"];
  const languages = [
    { code: "en", name: "English" },
    { code: "ja", name: "Japanese" },
    { code: "de", name: "German" },
    { code: "fr", name: "French" },
    { code: "es", name: "Spanish" },
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/onboarding/profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        // Dispatch wallet and XP refreshes
        dispatch(fetchWallet());
        dispatch(fetchXP());

        // Display level-up success milestone
        setSuccessReward("Level 1 Complete! You earned 5 SKA.");
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else {
        alert(data.error || "Profile complete failed");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-24 relative">
      <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-[#1ED6C6]/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-xl w-full bg-neutral-900/60 backdrop-blur-md border border-white/10 p-8 rounded-3xl shadow-2xl relative">
        {successReward ? (
          <div className="text-center py-12 flex flex-col items-center justify-center">
            <div className="w-20 h-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mb-6 border border-green-500/30 animate-pulse">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-extrabold mb-4 text-green-400">Onboarding Complete!</h2>
            <p className="text-[#1ED6C6] text-xl font-semibold mb-2">{successReward}</p>
            <p className="text-gray-400 text-sm">Redirecting to your home feed...</p>
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-extrabold text-center mb-2 tracking-tight">
              Configure Your Profile
            </h1>
            <p className="text-gray-400 text-center text-sm mb-8">
              Let the community know who you are and claim your onboarding XP bonus.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    required
                    value={form.username}
                    onChange={handleChange}
                    placeholder="e.g. ezzstar_gamer"
                    className="w-full bg-neutral-950 border border-white/10 rounded-lg p-3 text-sm focus:border-[#DF28E2] outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    Display Name
                  </label>
                  <input
                    type="text"
                    name="displayName"
                    required
                    value={form.displayName}
                    onChange={handleChange}
                    placeholder="e.g. John Doe"
                    className="w-full bg-neutral-950 border border-white/10 rounded-lg p-3 text-sm focus:border-[#DF28E2] outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Biography
                </label>
                <textarea
                  name="bio"
                  rows="3"
                  value={form.bio}
                  onChange={handleChange}
                  placeholder="Tell us about yourself..."
                  className="w-full bg-neutral-950 border border-white/10 rounded-lg p-3 text-sm focus:border-[#DF28E2] outline-none transition-colors resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    Country
                  </label>
                  <select
                    name="country"
                    value={form.country}
                    onChange={handleChange}
                    className="w-full bg-neutral-950 border border-white/10 rounded-lg p-3 text-sm focus:border-[#DF28E2] outline-none transition-colors text-white"
                  >
                    {countries.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    Language
                  </label>
                  <select
                    name="language"
                    value={form.language}
                    onChange={handleChange}
                    className="w-full bg-neutral-950 border border-white/10 rounded-lg p-3 text-sm focus:border-[#DF28E2] outline-none transition-colors text-white"
                  >
                    {languages.map((l) => (
                      <option key={l.code} value={l.code}>
                        {l.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    Avatar URL
                  </label>
                  <input
                    type="url"
                    name="avatarUrl"
                    value={form.avatarUrl}
                    onChange={handleChange}
                    placeholder="https://example.com/avatar.jpg"
                    className="w-full bg-neutral-950 border border-white/10 rounded-lg p-3 text-sm focus:border-[#DF28E2] outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    Banner URL
                  </label>
                  <input
                    type="url"
                    name="bannerUrl"
                    value={form.bannerUrl}
                    onChange={handleChange}
                    placeholder="https://example.com/banner.jpg"
                    className="w-full bg-neutral-950 border border-white/10 rounded-lg p-3 text-sm focus:border-[#DF28E2] outline-none transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#DF28E2] hover:bg-[#AD7AFF] active:scale-[0.98] transition-all py-4 font-bold text-black rounded-lg cursor-pointer tracking-wider text-sm uppercase shadow-lg shadow-pink-500/20"
              >
                {loading ? "Saving Profile..." : "Complete Registration & Get Reward"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
