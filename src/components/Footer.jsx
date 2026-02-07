import {
  FaDiscord,
  FaXTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa6";
import { PiTelegramLogo } from "react-icons/pi";
const Footer = () => {
  return (
    <footer className="relative bg-black text-white pt-16 pb-10">
      {/* top gradient divider */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center text-center gap-6">
        {/* Logo */}
        <div className="flex items-center gap-2 text-lg font-semibold tracking-wide">
          <span className="text-xl">∞</span>
          <span>EZZSTAR</span>
        </div>

        {/* Nav links */}
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-400">
          <a href="#" className="hover:text-white transition">About Us</a>
          <a href="#" className="hover:text-white transition">Upload Manga</a>
          <a href="#" className="hover:text-white transition">Write Stories</a>
          <a href="#" className="hover:text-white transition">Create Thread</a>
          <a href="#" className="hover:text-white transition">Create Events</a>
          <a href="#" className="hover:text-white transition">Connect Wallet</a>
        </nav>

        {/* Social icons */}
        <div className="flex items-center gap-5">
          <a href="#" className="hover:text-white transition">
            <FaDiscord size={18} />
          </a>
          <a href="#" className="hover:text-white transition">
            <PiTelegramLogo size={18} />
          </a>
          <a href="#" className="hover:text-white transition">
            <FaXTwitter size={18} />
          </a>
          <a href="#" className="hover:text-white transition">
            <FaInstagram size={18} />
          </a>
          <a href="#" className="hover:text-white transition">
            <FaLinkedinIn size={18} />
          </a>
        </div>

        {/* Legal links */}
        <div className="flex gap-6 text-xs text-gray-500">
          <a href="#" className="hover:text-gray-300 transition">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-gray-300 transition">
            Terms of Use
          </a>
        </div>

        {/* Copyright */}
        <p className="text-xs text-gray-600 mt-2">
          © 2025 EZZSTAR Decentralized Arts & Entertainment
        </p>
      </div>
    </footer>
  );
};

export default Footer;
