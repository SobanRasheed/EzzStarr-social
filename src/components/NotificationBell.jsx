import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotifications, markRead, addNotification } from "../store/slices/notificationSlice";
import { Bell, MailOpen } from "lucide-react";
import { Link } from "react-router-dom";
import socket from "../socket";

export default function NotificationBell() {
  const dispatch = useDispatch();
  const { notifications, unreadCount } = useSelector((state) => state.notifications);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  useEffect(() => {
    const handleNotification = (notif) => {
      dispatch(addNotification(notif));
    };

    socket.on("notification", handleNotification);
    return () => {
      socket.off("notification", handleNotification);
    };
  }, [dispatch]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleRead = (id) => {
    dispatch(markRead(id));
    setOpen(false);
  };

  const recent = notifications.slice(0, 5);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={handleToggle}
        className="relative p-2 text-white hover:text-gray-300 transition cursor-pointer flex items-center justify-center"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-[#DF28E2] text-black text-[9px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center border border-black animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-80 bg-neutral-900 border border-white/10 rounded-2xl p-4 shadow-2xl z-50 text-left text-sm text-white">
          <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
            <h3 className="font-bold text-xs uppercase tracking-wider text-gray-400">Recent Alerts</h3>
            <Link to="/notifications" onClick={() => setOpen(false)} className="text-[#1ED6C6] hover:underline text-xs">
              View All
            </Link>
          </div>

          {recent.length === 0 ? (
            <p className="text-gray-500 text-center py-6 text-xs font-medium">No new notifications</p>
          ) : (
            <div className="space-y-3">
              {recent.map((n) => (
                <div
                  key={n._id}
                  onClick={() => handleRead(n._id)}
                  className={`p-3.5 rounded-xl border border-white/5 cursor-pointer hover:bg-white/5 transition-all relative ${
                    !n.isRead ? "bg-black/35 border-[#AD7AFF]/20" : "bg-neutral-900"
                  }`}
                >
                  <p className="font-extrabold text-xs text-white/90 truncate mb-1">{n.title}</p>
                  <p className="text-gray-400 text-xs line-clamp-2 leading-relaxed">{n.body}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
