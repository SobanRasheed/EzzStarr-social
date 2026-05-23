import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWallet, fetchTransactions } from "../store/slices/walletSlice";
import { Wallet, ArrowUpRight, ArrowDownLeft, ShieldCheck, HelpCircle } from "lucide-react";

export default function WalletPage() {
  const dispatch = useDispatch();
  const { wallet, transactions, loading } = useSelector((state) => state.wallet);
  const [filterType, setFilterType] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchWallet());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchTransactions({ page, limit: 10, type: filterType }));
  }, [dispatch, page, filterType]);

  const handleFilterChange = (e) => {
    setFilterType(e.target.value);
    setPage(1);
  };

  const getTxColor = (direction) => {
    return direction === "CREDIT" ? "text-emerald-400" : "text-rose-400";
  };

  const getTxIcon = (direction) => {
    return direction === "CREDIT" ? (
      <ArrowDownLeft className="w-5 h-5 text-emerald-400 bg-emerald-400/10 p-1 rounded-full" />
    ) : (
      <ArrowUpRight className="w-5 h-5 text-rose-400 bg-rose-400/10 p-1 rounded-full" />
    );
  };

  const formatTxType = (type) => {
    return type.replace(/_/g, " ");
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-28 max-w-7xl mx-auto w-full relative">
      <div className="absolute top-20 right-1/4 w-80 h-80 bg-[#DF28E2]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold flex items-center gap-3">
            <Wallet className="w-8 h-8 text-[#1ED6C6]" /> Spica Wallet
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Manage your Utility, Earned, and Locked token balances seamlessly.
          </p>
        </div>
      </div>

      {/* Balance Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Utility SKA Card */}
        <div className="bg-neutral-900/60 border border-white/10 hover:border-[#1ED6C6]/30 rounded-2xl p-6 shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#1ED6C6]/5 rounded-full blur-xl group-hover:scale-150 transition-transform" />
          <h3 className="text-gray-400 font-semibold text-xs uppercase tracking-wider mb-2">
            Utility SKA
          </h3>
          <p className="text-4xl font-black tracking-tight text-[#1ED6C6]">
            {wallet?.utilityBalance?.toFixed(2) || "0.00"}{" "}
            <span className="text-lg font-bold text-white/55">SKA</span>
          </p>
          <p className="text-xs text-gray-500 mt-4 leading-relaxed">
            Used for event entries and purchasing content promotions.
          </p>
        </div>

        {/* Earned SKA Card */}
        <div className="bg-neutral-900/60 border border-white/10 hover:border-[#DF28E2]/30 rounded-2xl p-6 shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#DF28E2]/5 rounded-full blur-xl group-hover:scale-150 transition-transform" />
          <h3 className="text-gray-400 font-semibold text-xs uppercase tracking-wider mb-2">
            Earned SKA
          </h3>
          <p className="text-4xl font-black tracking-tight text-[#DF28E2]">
            {wallet?.earnedBalance?.toFixed(2) || "0.00"}{" "}
            <span className="text-lg font-bold text-white/55">SKA</span>
          </p>
          <p className="text-xs text-gray-500 mt-4 leading-relaxed">
            Earned from reader views, tipping splits, and brackets.
          </p>
        </div>

        {/* Locked SKA Card */}
        <div className="bg-neutral-900/60 border border-white/10 hover:border-amber-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-xl group-hover:scale-150 transition-transform" />
          <h3 className="text-gray-400 font-semibold text-xs uppercase tracking-wider mb-2">
            Locked SKA
          </h3>
          <p className="text-4xl font-black tracking-tight text-amber-400">
            {wallet?.lockedBalance?.toFixed(2) || "0.00"}{" "}
            <span className="text-lg font-bold text-white/55">SKA</span>
          </p>
          <p className="text-xs text-gray-500 mt-4 leading-relaxed">
            Locked by admin/anti-abuse for review.
          </p>
        </div>
      </div>

      {/* Transaction History Section */}
      <div className="bg-neutral-900/40 border border-white/10 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-white/10 pb-6">
          <h2 className="text-xl font-bold tracking-tight">Transaction History</h2>
          
          <select
            value={filterType}
            onChange={handleFilterChange}
            className="bg-neutral-950 border border-white/10 rounded-lg p-2.5 text-xs text-white focus:border-[#1ED6C6] outline-none"
          >
            <option value="">All Types</option>
            <option value="LEVEL_REWARD">Level Up Rewards</option>
            <option value="VIEW_REWARD">View Rewards</option>
            <option value="GIST_REWARD">Gist Rewards</option>
            <option value="TIP_RECEIVED">Tips Received</option>
            <option value="TIP_SENT">Tips Sent</option>
            <option value="BOOST_SPEND">Boost spendings</option>
            <option value="EVENT_ENTRY">Event entry fees</option>
            <option value="EVENT_HOST_EARN">Host earnings</option>
          </select>
        </div>

        {loading && transactions.length === 0 ? (
          <div className="text-center py-12 text-gray-400 text-sm animate-pulse">
            Loading transaction logs...
          </div>
        ) : transactions.length === 0 ? (
          <div className="text-center py-12 text-gray-500 text-sm">
            No transaction records found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-white/5 text-gray-500 text-xs font-semibold uppercase tracking-wider">
                  <th className="py-3 px-4">Action</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {transactions.map((tx) => (
                  <tr key={tx._id} className="hover:bg-white/5 transition-colors">
                    <td className="py-4 px-4 flex items-center gap-2.5">
                      {getTxIcon(tx.direction)}
                      <span className="font-medium text-white/90">{tx.direction}</span>
                    </td>
                    <td className="py-4 px-4 text-xs font-mono uppercase tracking-wider text-gray-300">
                      {formatTxType(tx.type)}
                    </td>
                    <td className={`py-4 px-4 font-black ${getTxColor(tx.direction)}`}>
                      {tx.direction === "CREDIT" ? "+" : "-"}
                      {tx.amount.toFixed(2)} SKA
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`text-xs px-2.5 py-1 font-semibold rounded-full border ${
                          tx.status === "COMPLETED"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : tx.status === "LOCKED"
                            ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                            : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                        }`}
                      >
                        {tx.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-xs text-gray-400">
                      {new Date(tx.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="flex items-center justify-between mt-6 pt-6 border-t border-white/5">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="bg-neutral-950 border border-white/10 hover:border-[#1ED6C6] disabled:opacity-40 disabled:hover:border-white/10 text-xs px-4 py-2 rounded-lg cursor-pointer transition-colors"
              >
                Previous
              </button>
              <span className="text-xs text-gray-400 font-medium">Page {page}</span>
              <button
                disabled={transactions.length < 10}
                onClick={() => setPage((p) => p + 1)}
                className="bg-neutral-950 border border-white/10 hover:border-[#1ED6C6] disabled:opacity-40 disabled:hover:border-white/10 text-xs px-4 py-2 rounded-lg cursor-pointer transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
