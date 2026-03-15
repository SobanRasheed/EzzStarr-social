import { useState } from "react";
import { X } from "lucide-react";
import { useAccount } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { GiWallet } from "react-icons/gi";

export default function LoginModal({ isOpen, onClose }) {
  const [step, setStep] = useState("options");

  const { address, isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="bg-black absolute right-20 top-20  rounded-2xl w-[400px] p-8 shadow-2xl text-white">
        {/* Close Button */}
        <button
          onClick={() => {
            setStep("options");
            onClose();
          }}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X size={20} />
        </button>

        {/* STEP 1 — OPTIONS */}
        {step === "options" && (
          <>
            <h2 className="text-2xl text-center mb-6">
              Welcome to Ezzstar
            </h2>

            <button
              onClick={() => setStep("email")}
              className="w-full bg-[#FF00CC] flex gap-2 items-center justify-center py-3 font-semibold text-black mb-4"
            >
              <img src="email.svg" className="h-5" alt="" /> Continue with Email
            </button>

            <button
              onClick={() => setStep("wallet")}
              className="w-full bg-[#1ED6C6] py-3 gap-2 flex items-center justify-center font-semibold text-black"
            >
              <GiWallet /> Continue with Wallet
            </button>
          </>
        )}

        {/* STEP 2 — WALLET FLOW */}
        {step === "wallet" && (
          <>
            <h2 className="text-2xl text-center mb-6">
              Sign up for Ezzstar
            </h2>

            <button
              onClick={() => setStep("email")}
              className="w-full bg-[#FF00CC] flex gap-2 items-center justify-center py-3 font-semibold text-black mb-4"
            >
              <img src="email.svg" className="h-5" alt="" /> Continue with Email
            </button>
            <div className="flex items-center my-6">
              <div className="flex-1 h-px bg-white/20" />
              <span className="mx-4 text-gray-400 text-sm">OR</span>
              <div className="flex-1 h-px bg-white/20" />
            </div>
            {!isConnected ? (
              <button
                onClick={openConnectModal}
                className="w-full bg-green-300 py-2  text-black"
              >
                Connect Wallet Now
              </button>
            ) : (
              <div className="text-center">
                <p className="text-green-400 mb-4 text-sm">
                  Connected:
                  <br />
                  {address.slice(0, 6)}...{address.slice(-4)}
                </p>

                <button
                  onClick={() => {
                    console.log("Wallet Connected:", address);
                    onClose();
                  }}
                  className="bg-[#1ED6C6] text-black px-6 py-2  text-sm"
                >
                  Continue
                </button>
              </div>
            )}

            
          </>
        )}

        {/* STEP 3 — EMAIL FLOW */}
        {step === "email" && (
          <>
            <h2 className="text-2xl text-center mb-6">
              Sign up for Ezzstar
            </h2>

            <button
              onClick={() => setStep("wallet")}
              className="w-full bg-[#1ED6C6] py-3 gap-2 flex items-center justify-center font-semibold text-black"
            >
              <GiWallet /> Continue with Wallet
            </button>

            <div className="flex items-center my-6">
              <div className="flex-1 h-px bg-white/20" />
              <span className="mx-4 text-gray-400 text-sm">OR</span>
              <div className="flex-1 h-px bg-white/20" />
            </div>

            <div className="mb-4">
              <label className="text-sm text-gray-400">
                Your email
              </label>
              <div className="flex items-center border border-white/20  mt-1">
                <input
                  type="email"
                  placeholder="Your Email address"
                  className="flex-1 bg-transparent p-3 outline-none text-white text-sm"
                />
                <button className="text-purple-400 text-sm pr-3">
                  Send a code
                </button>
              </div>
            </div>

            <div className="mb-6">
              <label className="text-sm text-gray-400">
                Verification Code
              </label>
              <input
                type="text"
                className="w-full bg-transparent border border-white/20  p-3 mt-1 outline-none text-white"
              />
            </div>

            <button className="w-full bg-purple-600 py-3 ">
              Login
            </button>
          </>
        )}
      </div>
    </div>
  );
}