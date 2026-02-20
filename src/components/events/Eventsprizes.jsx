import React from "react";
import EventsFaq from "./EventsFaq";

export default function EventsPrizes() {
  // faq logic moved to shared component


  return (
    <div className="min-h-screen bg-black text-white pb-16">
      {/* Hero Section */}
      {/* ================= CENTER CONTENT ================= */}
      <div className="px-6 lg:px-20 py-16">

        {/* Tabs */}

        <div className="grid lg:grid-cols-3 gap-8">

          {/* LEFT PRIZE BOX */}
          <div className="lg:col-span-2 bg-gradient-to-br from-[#062d2d] via-[#0b0f18] to-[#2a003a] p-8 rounded-xl border border-white/10">

            <h2 className="text-3xl font-semibold mb-8">Placement</h2>

            <div className="space-y-6 text-lg">

              {/* 1st */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3 text-yellow-400">
                  <span>🥇</span>
                  <span>1st.</span>
                </div>
                <span className="text-yellow-400 font-semibold">
                  120 SPCA
                </span>
              </div>

              {/* 2nd */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3 text-gray-300">
                  <span>🥈</span>
                  <span>2nd.</span>
                </div>
                <span className="text-gray-300 font-semibold">
                  80 SPCA
                </span>
              </div>

              {/* 3rd */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3 text-orange-400">
                  <span>🥉</span>
                  <span>3rd.</span>
                </div>
                <span className="text-orange-400 font-semibold">
                  40 SPCA
                </span>
              </div>

              {/* Divider */}
              <div className="border-t border-white/20 pt-6 mt-6 flex justify-between items-center text-xl font-semibold">
                <span className="text-gray-300">Total Prize</span>
                <span>240 SPCA</span>
              </div>

            </div>
          </div>

          {/* RIGHT UPGRADE CARD */}
          <div className="bg-gradient-to-br from-purple-900 to-pink-900 p-8 rounded-xl border border-white/10 text-center">

            <h3 className="text-xl font-semibold mb-6">
              Upgrade your profile
            </h3>

            <div className="flex justify-center mb-4">
              <img
                src="https://i.pravatar.cc/120"
                alt="profile"
                className="w-24 h-24 rounded-full border-4 border-white/20"
              />
            </div>

            <p className="text-gray-300 text-sm mb-6">
              Saachi, explore relevant profile theme with Star Plan
            </p>

            <button className="bg-black/100 text-gray-300 px-6 py-2 rounded-md font-semibold hover:bg-black/100 transition">
              Upgrade
            </button>

            <p className="text-xs text-gray-400 mt-4">Ad •••</p>
          </div>

        </div>
      </div>

      {/* shared FAQ component */}
    </div>
  );
}