import logo from "../assets/logo.png";
import iconDiscord from "../assets/brand/icon-discord.svg";
import iconTelegram from "../assets/brand/icon-telegram.svg";
import iconX from "../assets/brand/icon-x.svg";
import iconInstagram from "../assets/brand/icon-instagram.svg";
import iconLinkedin from "../assets/brand/icon-linkedin.svg";

const figmaSocialIcons = [
  ["Discord", "https://discord.gg/sY3gsZVyeg", iconDiscord],
  ["Telegram", "https://t.me/EzzstarSPCA", iconTelegram],
  ["X", "https://x.com/ezzstarx?s=21", iconX],
  ["Instagram", "https://www.instagram.com/ezzstars/", iconInstagram],
  ["LinkedIn", "https://www.linkedin.com/company/ezzstar/", iconLinkedin],
];
const Footer = () => {
  return (
    <footer className="relative bg-black text-white pt-16 pb-10">
      {/* top gradient divider */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center text-center gap-6">
        {/* Logo */}
        <div className="flex items-center justify-center">
          <img src={logo} alt="Ezzstar Logo" className="h-6 w-auto" />
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
          {figmaSocialIcons.map(([label, href, src]) => <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 transition"><img src={src} alt={label} className="w-[18px] h-[18px] object-contain" /></a>)}
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
