import React from "react";
import pfp from "../../assets/logo.png"; // Placeholder for avatar if needed

export default function RightSidebar() {
  const gifts = [
    { name: "Mux Michel", threads: "112.4k threads", avatar: "https://i.pravatar.cc/40?img=1" },
    { name: "Daxton", threads: "112.4k threads", avatar: "https://i.pravatar.cc/40?img=2" },
    { name: "Saachi singh", threads: "112.4k threads", avatar: "https://i.pravatar.cc/40?img=3" },
    { name: "Mux Michel", threads: "112.4k threads", avatar: "https://i.pravatar.cc/40?img=4" },
    { name: "joeshi", threads: "112.4k threads", avatar: "https://i.pravatar.cc/40?img=5" },
    { name: "Mux Michel", threads: "112.4k threads", avatar: "https://i.pravatar.cc/40?img=6" },
  ];

  return (
    <div className="w-[450px] flex-shrink-0 flex flex-col gap-[16px] sticky top-[100px] h-[calc(100vh-100px)] pt-10">
      
      {/* Gifts Leaderboard */}
      <div className="bg-[rgba(223,40,226,0.07)] backdrop-blur-[27px] rounded-[4px] p-6">
        <h2 className="text-[28px] font-sf text-white mb-4">Gifts</h2>
        
        <div className="flex flex-col">
          {gifts.map((gift, i) => (
            <div
              key={i}
              className="flex items-center justify-between h-[40px] py-[10px] border-b border-[rgba(255,255,255,0.12)] last:border-b-0"
            >
              <div className="flex items-center gap-3">
                <img src={gift.avatar} alt={gift.name} className="w-[36px] h-[36px] rounded-full object-cover" />
                <div className="flex flex-col justify-center">
                  <span className="font-satoshi font-medium text-[14px] text-white leading-tight">{gift.name}</span>
                  <span className="font-satoshi text-[12px] text-[#616161] leading-tight">{gift.threads}</span>
                </div>
              </div>
              {/* Star Icon Badge */}
              <div className="text-[#F5A623]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upgrade Promo */}
      <div className="bg-[rgba(223,40,226,0.07)] backdrop-blur-[27px] rounded-[4px] p-6 flex flex-col items-center text-center">
        <h3 className="font-sf text-[20px] text-white mb-6">Upgrade your profile</h3>
        
        {/* Custom Avatar composition */}
        <div className="relative w-[138px] h-[138px] flex items-center justify-center mb-6">
          {/* Metallic/Silver gradient wrapper (placeholder styling) */}
          <div className="absolute inset-0 bg-gradient-to-tr from-gray-500 via-gray-300 to-gray-600 rounded-full blur-sm opacity-50"></div>
          <img src="https://i.pravatar.cc/150?img=9" alt="User" className="relative w-[120px] h-[120px] rounded-full object-cover z-10 border-4 border-transparent" style={{ background: 'linear-gradient(white, white) padding-box, linear-gradient(to right, #ccc, #fff) border-box' }} />
        </div>

        <p className="font-satoshi text-[14px] leading-relaxed mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[rgba(255,255,255,0.72)] to-white">
          Saachi, explore relevant profile theme with Star Plan
        </p>

        <button className="h-[46px] w-full max-w-[200px] flex items-center justify-center gap-2 bg-gradient-to-t from-black to-black border border-[#EF00F4] rounded-[4px] hover:opacity-80 transition-opacity">
           <svg width="16" height="16" viewBox="0 0 24 24" fill="#F5A623">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
          <span className="font-satoshi font-medium text-[16px] text-white">Upgrade</span>
        </button>
        <div className="text-[10px] text-gray-500 mt-2">Ad ···</div>
      </div>

    </div>
  );
}
