export default function BracketView({ rounds }) {
  if (!rounds || rounds.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500 text-sm bg-neutral-900/20 border border-white/5 rounded-2xl">
        Bracket structure is not defined.
      </div>
    );
  }

  return (
    <div className="flex gap-8 overflow-x-auto py-8">
      {rounds.map((round) => (
        <div key={round.roundNumber} className="flex-shrink-0 w-64 space-y-6 flex flex-col justify-center">
          <div className="text-center mb-4">
            <h3 className="text-xs uppercase tracking-wider text-gray-400 font-bold border-b border-white/10 pb-2">
              Round {round.roundNumber}
            </h3>
          </div>

          <div className="space-y-6 flex-1 flex flex-col justify-around">
            {round.matches.map((match) => (
              <div
                key={match.matchId}
                className={`bg-neutral-950 border rounded-2xl p-4 shadow-lg flex flex-col gap-2 transition-all relative group ${
                  match.status === "COMPLETED" ? "border-emerald-500/20 hover:border-emerald-500/50" : "border-white/5 hover:border-[#DF28E2]"
                }`}
              >
                {/* Participant 1 */}
                <div
                  className={`flex items-center justify-between text-xs p-1.5 rounded-lg ${
                    match.winnerId && match.p1 && match.p1.userId === match.winnerId
                      ? "bg-emerald-500/10 text-emerald-400 font-bold"
                      : "text-gray-300"
                  }`}
                >
                  <span className="truncate max-w-[140px]">{match.p1?.name || "BYE"}</span>
                  {match.winnerId && match.p1 && match.p1.userId === match.winnerId && (
                    <span className="text-[10px] uppercase font-black">WIN</span>
                  )}
                </div>

                <div className="h-px bg-white/5" />

                {/* Participant 2 */}
                <div
                  className={`flex items-center justify-between text-xs p-1.5 rounded-lg ${
                    match.winnerId && match.p2 && match.p2.userId === match.winnerId
                      ? "bg-emerald-500/10 text-emerald-400 font-bold"
                      : "text-gray-300"
                  }`}
                >
                  <span className="truncate max-w-[140px]">{match.p2?.name || "BYE"}</span>
                  {match.winnerId && match.p2 && match.p2.userId === match.winnerId && (
                    <span className="text-[10px] uppercase font-black">WIN</span>
                  )}
                </div>

                {/* Match status indicator */}
                <span className="absolute -bottom-2 right-4 text-[9px] uppercase tracking-wider font-bold bg-black px-2 py-0.5 rounded border border-white/5 text-gray-500 group-hover:text-white">
                  {match.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
