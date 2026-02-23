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
              <div className="border-t border-b border-white/20 pt-6 pb-6 mt-6 mb-6 flex justify-between items-center text-xl font-semibold">
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

            <div className="flex justify-center mb-4 relative mx-auto" style={{ width: '220px', height: '220px' }}>
              <svg width="220" height="220" viewBox="0 0 156 156" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0">
                <g filter="url(#filter0_d_3260_33660)">
                  <path fillRule="evenodd" clipRule="evenodd" d="M80.301 3.01726C78.7831 1.66091 76.4886 1.66091 74.9706 3.01726L57.8192 18.3427C57.1436 18.9464 56.2831 19.3028 55.3786 19.3537L32.414 20.6448C30.3815 20.7591 28.7591 22.3815 28.6448 24.414L27.3537 47.3786C27.3028 48.2831 26.9464 49.1436 26.3427 49.8192L11.0173 66.9706C9.66091 68.4886 9.66091 70.783 11.0173 72.301L26.3427 89.4524C26.9464 90.128 27.3028 90.9885 27.3537 91.893L28.6448 114.858C28.7591 116.89 30.3815 118.513 32.414 118.627L55.3786 119.918C56.2831 119.969 57.1436 120.325 57.8192 120.929L74.9706 136.254C76.4886 137.611 78.783 137.611 80.301 136.254L97.4524 120.929C98.128 120.325 98.9885 119.969 99.893 119.918L122.858 118.627C124.89 118.513 126.513 116.89 126.627 114.858L127.918 91.893C127.969 90.9885 128.325 90.128 128.929 89.4524L144.254 72.301C145.611 70.7831 145.611 68.4886 144.254 66.9706L128.929 49.8192C128.325 49.1436 127.969 48.2831 127.918 47.3786L126.627 24.414C126.513 22.3815 124.89 20.7591 122.858 20.6448L99.893 19.3537C98.9885 19.3028 98.128 18.9464 97.4524 18.3427L80.301 3.01726ZM122.599 74.9909C122.811 73.1881 122.917 71.3323 122.917 69.4765C122.811 44.4501 102.48 24.3016 77.4768 24.3547C52.4209 24.4607 32.2488 44.7682 32.355 69.9007C32.355 71.7565 32.5142 73.6123 32.7266 75.4681C33.0451 78.0131 33.5759 80.5052 34.3191 82.8912C35.8585 87.9813 38.3004 92.7533 41.4855 96.9421C43.1842 99.169 45.0953 101.237 47.1656 103.146C55.2344 110.516 66.0106 114.97 77.7953 114.917C89.5801 114.864 100.303 110.357 108.319 102.934C110.442 100.972 112.353 98.8509 114.052 96.5709C116.069 93.8668 117.768 90.9505 119.148 87.8222C119.785 86.3906 120.316 84.906 120.794 83.4214C121.059 82.573 121.272 81.7777 121.484 80.9293C121.962 79.0205 122.386 77.0057 122.599 74.9909Z" fill="url(#paint0_linear_3260_33660)"/>
                  <g filter="url(#filter1_d_3260_33660)">
                    <path fillRule="evenodd" clipRule="evenodd" d="M131.542 69.6357C131.542 99.4073 107.407 123.542 77.6358 123.542C47.8642 123.542 23.7295 99.4073 23.7295 69.6357C23.7295 39.8641 47.8642 15.7295 77.6358 15.7295C107.407 15.7295 131.542 39.8641 131.542 69.6357ZM122.599 74.9908C122.811 73.188 122.917 71.3323 122.917 69.4765C122.811 44.45 102.48 24.3016 77.4768 24.3546C52.4209 24.4606 32.2487 44.7681 32.3549 69.9007C32.3549 71.7564 32.5142 73.6122 32.7265 75.468C33.045 78.0131 33.5759 80.5051 34.319 82.8911C35.8585 87.9812 38.3004 92.7532 41.4855 96.942C43.1842 99.1689 45.0952 101.237 47.1655 103.146C55.2343 110.516 66.0105 114.97 77.7953 114.917C89.58 114.863 100.303 110.357 108.319 102.934C110.442 100.972 112.353 98.8508 114.052 96.5708C116.069 93.8667 117.768 90.9505 119.148 87.8222C119.785 86.3906 120.316 84.906 120.794 83.4213C121.059 82.573 121.272 81.7776 121.484 80.9293C121.962 79.0205 122.386 77.0056 122.599 74.9908Z" fill="url(#paint1_linear_3260_33660)"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M125.073 69.6357C125.073 95.8347 103.835 117.073 77.6358 117.073C51.4368 117.073 30.1982 95.8347 30.1982 69.6357C30.1982 43.4367 51.4368 22.1982 77.6358 22.1982C103.835 22.1982 125.073 43.4367 125.073 69.6357ZM122.599 74.9908C122.811 73.188 122.917 71.3323 122.917 69.4765C122.811 44.45 102.48 24.3016 77.4768 24.3546C52.4209 24.4606 32.2487 44.7681 32.3549 69.9007C32.3549 71.7565 32.5142 73.6122 32.7265 75.468C33.045 78.0131 33.5759 80.5051 34.319 82.8911C35.8585 87.9812 38.3004 92.7532 41.4855 96.942C43.1842 99.1689 45.0952 101.237 47.1655 103.146C55.2343 110.516 66.0105 114.97 77.7953 114.917C89.58 114.863 100.303 110.357 108.319 102.934C110.442 100.972 112.353 98.8508 114.052 96.5708C116.069 93.8667 117.768 90.9505 119.148 87.8222C119.785 86.3906 120.316 84.906 120.794 83.4213C121.059 82.573 121.272 81.7776 121.484 80.9293C121.962 79.0205 122.386 77.0056 122.599 74.9908Z" fill="url(#paint2_radial_3260_33660)" fillOpacity="0.1"/>
                  </g>
                </g>
                <defs>
                  <filter id="filter0_d_3260_33660" x="-1.36426" y="-1.36426" width="158" height="158" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset dy="8"/>
                    <feGaussianBlur stdDeviation="5"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0.00392157 0 0 0 0 0.0196078 0 0 0 0 0.2 0 0 0 0.08 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3260_33660"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3260_33660" result="shape"/>
                  </filter>
                  <filter id="filter1_d_3260_33660" x="17.7295" y="12.7295" width="119.812" height="119.812" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset dy="3"/>
                    <feGaussianBlur stdDeviation="3"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0.00392157 0 0 0 0 0.0196078 0 0 0 0 0.2 0 0 0 0.08 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3260_33660"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3260_33660" result="shape"/>
                  </filter>
                  <linearGradient id="paint0_linear_3260_33660" x1="9.92664" y1="69.6136" x2="145.301" y2="69.6136" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FFF8C1"/>
                    <stop offset="0.0001" stopColor="#C2E8FD"/>
                    <stop offset="0.3123" stopColor="#919191"/>
                    <stop offset="0.7592" stopColor="#DDDDDD"/>
                    <stop offset="1" stopColor="#E3E3E3"/>
                  </linearGradient>
                  <linearGradient id="paint1_linear_3260_33660" x1="23.671" y1="69.618" x2="131.565" y2="69.618" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FFF8C1"/>
                    <stop offset="0.0001" stopColor="#C2E8FD"/>
                    <stop offset="0.3123" stopColor="#919191"/>
                    <stop offset="0.7592" stopColor="#DDDDDD"/>
                    <stop offset="1" stopColor="white"/>
                  </linearGradient>
                  <radialGradient id="paint2_radial_3260_33660" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(77.6121 69.6119) scale(47.4145 47.4144)">
                    <stop stopColor="white" stopOpacity="0"/>
                    <stop offset="1" stopColor="#571600"/>
                  </radialGradient>
                </defs>
              </svg>
              <img
                src="https://i.pravatar.cc/120"
                alt="profile"
                className="w-24 h-24 rounded-full border-4 border-white/20 relative z-10 m-auto"
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