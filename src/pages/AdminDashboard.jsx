import { useEffect, useState } from "react";
import { Shield, Users, RefreshCw, AlertTriangle, Coins, TrendingUp } from "lucide-react";

export default function AdminDashboard() {
  const [tab, setTab] = useState("stats");
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [flags, setFlags] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [topCreators, setTopCreators] = useState([]);
  const [loading, setLoading] = useState(false);

  const [usersPage, setUsersPage] = useState(1);
  const [txPage, setTxPage] = useState(1);

  const getHeaders = () => {
    const token = localStorage.getItem("token");
    return {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  };

  const loadStats = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/stats`, { headers: getHeaders() });
      const data = await res.json();
      if (res.ok) setStats(data.stats);
    } catch (e) {
      console.error(e);
    }
  };

  const loadUsers = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/users?page=${usersPage}&limit=10`, {
        headers: getHeaders(),
      });
      const data = await res.json();
      if (res.ok) setUsers(data.users);
    } catch (e) {
      console.error(e);
    }
  };

  const loadFlags = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/abuse-flags`, { headers: getHeaders() });
      const data = await res.json();
      if (res.ok) setFlags(data.flags);
    } catch (e) {
      console.error(e);
    }
  };

  const loadTransactions = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/transactions?page=${txPage}&limit=10`, {
        headers: getHeaders(),
      });
      const data = await res.json();
      if (res.ok) setTransactions(data.transactions);
    } catch (e) {
      console.error(e);
    }
  };

  const loadTopCreators = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/top-creators`, { headers: getHeaders() });
      const data = await res.json();
      if (res.ok) setTopCreators(data.topCreators);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;
    if (user?.role !== "admin") return;

    setLoading(true);
    Promise.all([loadStats(), loadUsers(), loadFlags(), loadTransactions(), loadTopCreators()]).finally(() =>
      setLoading(false)
    );
  }, [usersPage, txPage]);

  const handleToggleSuspend = async (userId, isSuspended) => {
    try {
      const action = isSuspended ? "unsuspend" : "suspend";
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/users/${userId}/${action}`, {
        method: "PATCH",
        headers: getHeaders(),
      });
      if (res.ok) {
        loadUsers();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleResolveFlag = async (flagId, approved) => {
    try {
      const action = approved ? "approve" : "reject";
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/abuse-flags/${flagId}/${action}`, {
        method: "PATCH",
        headers: getHeaders(),
      });
      if (res.ok) {
        loadFlags();
        loadStats();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const userString = localStorage.getItem("user");
  const currentUser = userString ? JSON.parse(userString) : null;
  if (currentUser?.role !== "admin") {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-2">Access Denied</h2>
          <p className="text-gray-400 text-sm">Administrative privileges required to access this dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-28 max-w-7xl mx-auto w-full relative">
      <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold flex items-center gap-3">
            <Shield className="w-8 h-8 text-red-500" /> Admin Command Center
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Monitor platform metrics, manage user bans, and audit financial/anti-abuse activities.
          </p>
        </div>
        <button
          onClick={() => {
            loadStats(); loadUsers(); loadFlags(); loadTransactions(); loadTopCreators();
          }}
          className="bg-neutral-900 border border-white/10 hover:border-[#1ED6C6] p-2.5 rounded-lg cursor-pointer transition-colors"
        >
          <RefreshCw className="w-4 h-4 text-white" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/5 gap-2 mb-8 overflow-x-auto pb-2">
        {["stats", "users", "flags", "transactions", "creators"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-6 py-3 font-semibold text-xs uppercase tracking-wider transition-all cursor-pointer rounded-t-lg ${
              tab === t
                ? "bg-neutral-900 border-t border-x border-white/10 text-[#1ED6C6]"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-400 text-sm animate-pulse">
          Syncing system logs...
        </div>
      ) : (
        <>
          {/* STATS TAB */}
          {tab === "stats" && stats && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-neutral-900/40 border border-white/10 p-6 rounded-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Total Users</h3>
                    <Users className="w-5 h-5 text-sky-400" />
                  </div>
                  <p className="text-3xl font-black">{stats.totalUsers}</p>
                  <p className="text-xs text-gray-500 mt-2">Onboarded: {stats.onboardingCompleteCount}</p>
                </div>

                <div className="bg-neutral-900/40 border border-white/10 p-6 rounded-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-wider">SKA Distributed</h3>
                    <Coins className="w-5 h-5 text-[#1ED6C6]" />
                  </div>
                  <p className="text-3xl font-black text-[#1ED6C6]">{stats.totalSKADistributed.toFixed(2)} SKA</p>
                  <p className="text-xs text-gray-500 mt-2">Spent: {stats.totalSKASpent.toFixed(2)} SKA</p>
                </div>

                <div className="bg-neutral-900/40 border border-white/10 p-6 rounded-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Platform Fees</h3>
                    <Coins className="w-5 h-5 text-[#DF28E2]" />
                  </div>
                  <p className="text-3xl font-black text-[#DF28E2]">{stats.platformFeesCollected.toFixed(2)} SKA</p>
                  <p className="text-xs text-gray-500 mt-2">5% split fee collections</p>
                </div>

                <div className="bg-neutral-900/40 border border-white/10 p-6 rounded-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Active Campaigns</h3>
                    <TrendingUp className="w-5 h-5 text-amber-400" />
                  </div>
                  <p className="text-3xl font-black text-amber-400">{stats.activeCampaigns}</p>
                  <p className="text-xs text-gray-500 mt-2">Promotional content boosts</p>
                </div>
              </div>
            </div>
          )}

          {/* USERS TAB */}
          {tab === "users" && (
            <div className="bg-neutral-900/40 border border-white/10 p-6 rounded-2xl shadow-xl">
              <h2 className="text-xl font-bold mb-6">User Accounts Registry</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-white/5 text-gray-500 text-xs font-semibold uppercase tracking-wider">
                      <th className="py-3 px-4">User</th>
                      <th className="py-3 px-4">Primary Role</th>
                      <th className="py-3 px-4">Role</th>
                      <th className="py-3 px-4">Balances</th>
                      <th className="py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {users.map((u) => (
                      <tr key={u._id} className="hover:bg-white/5 transition-colors">
                        <td className="py-4 px-4 flex items-center gap-3">
                          <img src={u.profilePic || "pfp.svg"} className="w-9 h-9 rounded-full object-cover" alt="" />
                          <div>
                            <p className="font-bold text-white/90">{u.displayName || "No Display Name"}</p>
                            <p className="text-xs text-gray-500">@{u.username}</p>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-xs bg-white/5 px-2.5 py-1 rounded-full uppercase border border-white/5">
                            {u.primaryRole || "None"}
                          </span>
                        </td>
                        <td className="py-4 px-4 font-mono text-xs uppercase tracking-wider text-gray-400">
                          {u.role}
                        </td>
                        <td className="py-4 px-4 font-semibold text-xs">
                          <p className="text-[#1ED6C6]">Utility: {u.walletBalance.utilityBalance?.toFixed(2)}</p>
                          <p className="text-[#DF28E2]">Earned: {u.walletBalance.earnedBalance?.toFixed(2)}</p>
                        </td>
                        <td className="py-4 px-4">
                          <button
                            onClick={() => handleToggleSuspend(u._id, u.isSuspended)}
                            className={`text-xs font-bold px-4 py-2 rounded-lg cursor-pointer transition-all ${
                              u.isSuspended
                                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/25"
                                : "bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/25"
                            }`}
                          >
                            {u.isSuspended ? "UNSUSPEND" : "SUSPEND"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Pagination */}
                <div className="flex items-center justify-between mt-6 pt-6 border-t border-white/5">
                  <button
                    disabled={usersPage === 1}
                    onClick={() => setUsersPage((p) => Math.max(1, p - 1))}
                    className="bg-neutral-950 border border-white/10 px-4 py-2 text-xs rounded-lg disabled:opacity-40"
                  >
                    Previous
                  </button>
                  <span className="text-xs text-gray-400">Page {usersPage}</span>
                  <button
                    disabled={users.length < 10}
                    onClick={() => setUsersPage((p) => p + 1)}
                    className="bg-neutral-950 border border-white/10 px-4 py-2 text-xs rounded-lg disabled:opacity-40"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* FLAGS TAB */}
          {tab === "flags" && (
            <div className="bg-neutral-900/40 border border-white/10 p-6 rounded-2xl shadow-xl">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" /> Pending Abuse Audits
              </h2>

              {flags.length === 0 ? (
                <div className="text-center py-12 text-gray-500 text-sm">
                  No pending abuse reports found.
                </div>
              ) : (
                <div className="space-y-4">
                  {flags.map((f) => (
                    <div key={f._id} className="bg-neutral-950 border border-white/5 p-5 rounded-xl flex flex-col md:flex-row justify-between md:items-center gap-4">
                      <div>
                        <div className="flex items-center gap-2.5 mb-1.5">
                          <span className="bg-amber-500/10 text-amber-400 text-[10px] font-bold tracking-wider uppercase border border-amber-500/20 px-2 py-0.5 rounded">
                            {f.flagType}
                          </span>
                          <span className="text-xs text-gray-500 font-mono">ID: {f._id}</span>
                        </div>
                        <p className="text-sm font-bold mb-1">
                          User: <span className="text-[#DF28E2]">@{f.userId?.username}</span> ({f.userId?.displayName})
                        </p>
                        <p className="text-xs text-gray-400 leading-relaxed font-medium">
                          Note: {f.adminNote}
                        </p>
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={() => handleResolveFlag(f._id, true)}
                          className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/25 px-4 py-2 text-xs font-bold rounded-lg cursor-pointer"
                        >
                          APPROVE & UNLOCK
                        </button>
                        <button
                          onClick={() => handleResolveFlag(f._id, false)}
                          className="bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/25 px-4 py-2 text-xs font-bold rounded-lg cursor-pointer"
                        >
                          REJECT
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TRANSACTIONS TAB */}
          {tab === "transactions" && (
            <div className="bg-neutral-900/40 border border-white/10 p-6 rounded-2xl shadow-xl">
              <h2 className="text-xl font-bold mb-6">Financial Audit Trail</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-white/5 text-gray-500 text-xs font-semibold uppercase tracking-wider">
                      <th className="py-3 px-4">User</th>
                      <th className="py-3 px-4">Type</th>
                      <th className="py-3 px-4">Amount</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {transactions.map((tx) => (
                      <tr key={tx._id} className="hover:bg-white/5 transition-colors">
                        <td className="py-4 px-4 text-xs font-bold text-gray-300">
                          @{tx.userId?.username || "unknown"}
                        </td>
                        <td className="py-4 px-4 text-xs font-mono uppercase tracking-wider">
                          {tx.type}
                        </td>
                        <td className={`py-4 px-4 font-black ${tx.direction === "CREDIT" ? "text-emerald-400" : "text-rose-400"}`}>
                          {tx.direction === "CREDIT" ? "+" : "-"}
                          {tx.amount.toFixed(2)} SKA
                        </td>
                        <td className="py-4 px-4">
                          <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded border ${
                            tx.status === "COMPLETED" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                          }`}>
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

                {/* Pagination */}
                <div className="flex items-center justify-between mt-6 pt-6 border-t border-white/5">
                  <button
                    disabled={txPage === 1}
                    onClick={() => setTxPage((p) => Math.max(1, p - 1))}
                    className="bg-neutral-950 border border-white/10 px-4 py-2 text-xs rounded-lg disabled:opacity-40"
                  >
                    Previous
                  </button>
                  <span className="text-xs text-gray-400">Page {txPage}</span>
                  <button
                    disabled={transactions.length < 10}
                    onClick={() => setTxPage((p) => p + 1)}
                    className="bg-neutral-950 border border-white/10 px-4 py-2 text-xs rounded-lg disabled:opacity-40"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TOP CREATORS TAB */}
          {tab === "creators" && (
            <div className="bg-neutral-900/40 border border-white/10 p-6 rounded-2xl shadow-xl">
              <h2 className="text-xl font-bold mb-6">Top Creators Leaderboard</h2>
              <div className="space-y-4">
                {topCreators.map((item) => (
                  <div key={item.user?._id} className="bg-neutral-950 border border-white/5 p-4 rounded-xl flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <span className="w-8 text-center font-black text-lg text-gray-400 font-mono">
                        #{item.rank}
                      </span>
                      <img src={item.user?.profilePic || "pfp.svg"} className="w-10 h-10 rounded-full object-cover" alt="" />
                      <div>
                        <p className="font-bold text-white/90">{item.user?.displayName || "Anonymous Creator"}</p>
                        <p className="text-xs text-gray-500">@{item.user?.username}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-[#DF28E2] text-lg font-black">{item.totalEarned.toFixed(2)} SKA</p>
                      <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Total Revenue</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
