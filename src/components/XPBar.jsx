export default function XPBar({ currentLevel, totalXP, xpToNextLevel, progressPercent }) {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2.5 text-xs font-semibold text-gray-400">
        <span>Level {currentLevel}</span>
        <span>{totalXP} XP Total</span>
        <span>{xpToNextLevel > 0 ? `${xpToNextLevel} XP to Next Tier` : "Max Tier"}</span>
      </div>
      
      <div className="w-full bg-neutral-950 rounded-full h-3.5 border border-white/5 overflow-hidden">
        <div
          className="bg-gradient-to-r from-[#DF28E2] to-[#1ED6C6] h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
}
