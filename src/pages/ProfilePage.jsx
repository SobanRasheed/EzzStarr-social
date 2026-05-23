import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchXP } from "../store/slices/xpSlice";
import { fetchWallet } from "../store/slices/walletSlice";
import { Award, User as UserIcon, Globe, Languages, Shield, Coins } from "lucide-react";
import XPBar from "../components/XPBar";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const { xpProfile, currentLevelConfig, nextLevelConfig } = useSelector((state) => state.xp);
  const { wallet } = useSelector((state) => state.wallet);

  // We can fetch from local session or query backend
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  useEffect(() => {
    dispatch(fetchXP());
    dispatch(fetchWallet());
  }, [dispatch]);

  const currentXP = xpProfile?.totalXP || 0;
  const reqCurrent = currentLevelConfig?.xpRequired || 0;
  const reqNext = nextLevelConfig?.xpRequired || 500;
  const xpToNextLevel = reqNext - currentXP;
  
  const denominator = reqNext - reqCurrent;
  const progressPercent = denominator > 0
    ? Math.min(100, Math.max(0, ((currentXP - reqCurrent) / denominator) * 100))
    : 0;

  const totalSka = (wallet?.utilityBalance || 0) + (wallet?.earnedBalance || 0);

  return (
    <div className="min-h-screen bg-black text-white px-6 py-28 max-w-4xl mx-auto w-full relative">
      <div className="absolute top-20 left-10 w-96 h-96 bg-[#DF28E2]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Profile Header Cards */}
      <div className="bg-neutral-900/40 border border-white/10 p-8 rounded-3xl shadow-2xl mb-8 flex flex-col md:flex-row items-center md:items-start gap-8 relative overflow-hidden">
        {/* Banner image or glowing background */}
        {user?.bannerUrl && (
          <div
            className="absolute inset-x-0 top-0 h-2 bg-cover bg-center"
            style={{ backgroundImage: `url(${user.bannerUrl})` }}
          />
        )}

        <img
          src={user?.profilePic || "pfp.svg"}
          alt={user?.displayName || "Profile Pic"}
          className="w-28 h-28 rounded-full border-2 border-[#DF28E2] object-cover bg-neutral-950 p-1 flex-shrink-0"
        />

        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-2">
            <h1 className="text-3xl font-black tracking-tight">
              {user?.displayName || "Anonymous User"}
            </h1>
            {user?.primaryRole && (
              <span className="bg-[#DF28E2]/10 border border-[#DF28E2]/30 text-[#DF28E2] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {user.primaryRole}
              </span>
            )}
            {user?.role === "admin" && (
              <span className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                <Shield className="w-3.5 h-3.5" /> Staff
              </span>
            )}
          </div>

          <p className="text-gray-400 text-sm font-mono mb-4">@{user?.username || "unknown"}</p>
          <p className="text-gray-300 text-sm leading-relaxed mb-6 max-w-xl">
            {user?.bio || "No biography provided yet."}
          </p>

          <div className="flex flex-wrap justify-center md:justify-start gap-6 text-xs text-gray-400 font-medium">
            <div className="flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-[#1ED6C6]" /> {user?.country || "N/A"}
            </div>
            <div className="flex items-center gap-1.5">
              <Languages className="w-4 h-4 text-[#AD7AFF]" /> {user?.language?.toUpperCase() || "EN"}
            </div>
          </div>
        </div>
      </div>

      {/* Gamification Tier and Token Balances Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Tier progression */}
        <div className="bg-neutral-900/30 border border-white/10 p-6 rounded-3xl shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-400" /> Tier Progression
            </h3>
            <span className="text-xs text-gray-400 font-semibold font-mono">
              LEVEL {xpProfile?.currentLevel || 1}
            </span>
          </div>

          <XPBar
            currentLevel={xpProfile?.currentLevel || 1}
            totalXP={currentXP}
            xpToNextLevel={xpToNextLevel}
            progressPercent={progressPercent}
          />
        </div>

        {/* Balance summaries */}
        <div className="bg-neutral-900/30 border border-white/10 p-6 rounded-3xl shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold flex items-center gap-2">
              <Coins className="w-5 h-5 text-[#1ED6C6]" /> Earnings & Tokens
            </h3>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center bg-black/40 border border-white/5 p-3.5 rounded-xl">
              <div>
                <p className="text-xs text-gray-400 font-medium">Total Balance</p>
                <p className="text-2xl font-black text-white">{totalSka.toFixed(2)} SKA</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500 font-medium">Utility: {wallet?.utilityBalance?.toFixed(2) || "0.00"} SKA</p>
                <p className="text-xs text-gray-500 font-medium">Earned: {wallet?.earnedBalance?.toFixed(2) || "0.00"} SKA</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
