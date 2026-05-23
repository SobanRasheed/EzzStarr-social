import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotifications, markRead, markAllRead } from "../store/slices/notificationSlice";
import { Bell, CheckSquare, Inbox } from "lucide-react";

export default function NotificationsPage() {
  const dispatch = useDispatch();
  const { notifications, unreadCount, loading } = useSelector((state) => state.notifications);

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  const handleMarkRead = (id, isRead) => {
    if (!isRead) {
      dispatch(markRead(id));
    }
  };

  const handleMarkAllRead = () => {
    if (unreadCount > 0) {
      dispatch(markAllRead());
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-28 max-w-4xl mx-auto w-full relative">
      <div className="absolute top-20 left-1/4 w-80 h-80 bg-[#AD7AFF]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header section */}
      <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold flex items-center gap-3">
            <Bell className="w-8 h-8 text-[#AD7AFF]" /> Alerts & Notifications
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Stay up to date with your activities, level milestones, and rewards.
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllRead}
            className="flex items-center gap-2 bg-neutral-900 border border-white/10 hover:border-[#AD7AFF] transition-all text-xs font-semibold px-4 py-2.5 rounded-lg cursor-pointer"
          >
            <CheckSquare className="w-4 h-4 text-[#AD7AFF]" /> Mark All as Read
          </button>
        )}
      </div>

      {/* Notifications list */}
      {loading && notifications.length === 0 ? (
        <div className="text-center py-20 text-gray-400 text-sm animate-pulse">
          Retrieving inbox alerts...
        </div>
      ) : notifications.length === 0 ? (
        <div className="text-center py-20 bg-neutral-900/20 border border-white/5 rounded-2xl flex flex-col items-center">
          <Inbox className="w-16 h-16 text-gray-600 mb-4" />
          <h3 className="text-lg font-bold text-gray-400">Inbox is empty</h3>
          <p className="text-gray-500 text-xs mt-1">
            When you earn tokens, gain XP, or receive tips, they will appear here!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {notifications.map((n) => (
            <div
              key={n._id}
              onClick={() => handleMarkRead(n._id, n.isRead)}
              className={`border transition-all duration-300 rounded-2xl p-5 cursor-pointer relative overflow-hidden group shadow-lg ${
                n.isRead
                  ? "bg-neutral-900/30 border-white/5 opacity-70 hover:opacity-100"
                  : "bg-neutral-900/70 border-[#AD7AFF]/35 hover:border-[#AD7AFF]"
              }`}
            >
              {/* Unread badge pulse */}
              {!n.isRead && (
                <span className="absolute top-5 right-5 w-2.5 h-2.5 bg-[#AD7AFF] rounded-full animate-pulse" />
              )}

              <div className="pr-8">
                <h3 className={`text-base font-extrabold mb-1.5 ${!n.isRead ? "text-[#AD7AFF]" : "text-white/80"}`}>
                  {n.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                  {n.body}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500 font-medium">
                  <span className="bg-white/5 px-2.5 py-1 rounded-full uppercase tracking-wider text-[10px] border border-white/5">
                    {n.type.replace(/_/g, " ")}
                  </span>
                  <span>{new Date(n.createdAt).toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
