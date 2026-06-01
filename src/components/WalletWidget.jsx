export default function WalletWidget({ utilityBalance, earnedBalance, lockedBalance }) {
  return (
    <div className="flex items-center gap-4 bg-neutral-950/60 backdrop-blur border border-white/5 px-4 py-1.5 rounded-xl text-xs font-mono">
      <div className="flex flex-col">
        <span className="text-gray-500 uppercase tracking-wider text-[8px]">Utility</span>
        <span className="text-[#1ED6C6] font-extrabold">{(utilityBalance || 0).toFixed(2)}</span>
      </div>
      
      <div className="w-px h-5 bg-white/10" />
      
      <div className="flex flex-col">
        <span className="text-gray-500 uppercase tracking-wider text-[8px]">Earned</span>
        <span className="text-[#DF28E2] font-extrabold">{(earnedBalance || 0).toFixed(2)}</span>
      </div>
    </div>
  );
}
