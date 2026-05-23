import { useState } from "react";
import { X, Coins } from "lucide-react";

export default function TipModal({ isOpen, onClose, contentType, contentId, onSuccess }) {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      alert("Please enter a valid amount greater than zero");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/tips/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          contentType,
          contentId,
          amount: numericAmount,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setAmount("");
        onSuccess(data.splits);
      } else {
        alert(data.error || "Failed to send tip");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs">
      <div className="bg-black border border-white/10 rounded-3xl w-full max-w-sm p-8 shadow-2xl text-white relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition">
          <X size={20} />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-[#DF28E2]/10 border border-[#DF28E2]/20 text-[#DF28E2] rounded-full flex items-center justify-center mx-auto mb-3">
            <Coins className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold tracking-tight">Tip Creator</h2>
          <p className="text-gray-500 text-xs mt-1">
            Send tokens to reward the author directly. Splits will be applied.
          </p>
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Amount (SKA)
            </label>
            <input
              type="number"
              min="0.01"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="e.g. 10.00"
              className="w-full bg-neutral-950 border border-white/10 rounded-lg p-3 text-sm focus:border-[#DF28E2] outline-none text-white text-center font-bold text-lg"
            />
          </div>
        </div>

        <button
          onClick={handleConfirm}
          disabled={loading}
          className="w-full bg-[#DF28E2] hover:bg-[#AD7AFF] transition-all py-3 font-bold text-black rounded-lg cursor-pointer tracking-wider text-xs uppercase shadow-md active:scale-[0.98]"
        >
          {loading ? "Sending..." : "Confirm Tip"}
        </button>
      </div>
    </div>
  );
}
