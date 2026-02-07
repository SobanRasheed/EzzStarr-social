import { NavLink } from "react-router-dom";
import {
  FaDiscord,
  FaXTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaMagnifyingGlass,
} from "react-icons/fa6";
import { PiTelegramLogo } from "react-icons/pi";

const Navbar = () => {
  const linkClass = ({ isActive }) =>
    `text-sm transition ${
      isActive ? "text-white" : "text-gray-400 hover:text-white"
    }`;

  return (
    <header className="fixed top-0 w-full z-50">
      <nav className="backdrop-blur-md bg-transparent border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
          {/* Left: Logo */}
          <div className="flex items-center gap-2 text-white font-semibold tracking-wide">
            <span className="text-xl">∞</span>
            <span>EZZSTAR</span>
          </div>

          {/* Center: Nav links */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink to="/" className={linkClass}>
              Home
            </NavLink>
            <NavLink to="/membership" className={linkClass}>
              Membership
            </NavLink>
            <NavLink to="/manga" className={linkClass}>
              Manga
            </NavLink>
            <NavLink to="/stories" className={linkClass}>
              Stories
            </NavLink>
            <NavLink to="/threads" className={linkClass}>
              Threads
            </NavLink>
            <NavLink to="/events" className={linkClass}>
              Events
            </NavLink>
          </div>

          {/* Right: Icons */}
          <div className="flex items-center gap-4 text-gray-400">
            <FaDiscord className="hover:text-white transition cursor-pointer" />
            <PiTelegramLogo className="hover:text-white transition cursor-pointer" />
            <FaXTwitter className="hover:text-white transition cursor-pointer" />
            <FaInstagram className="hover:text-white transition cursor-pointer" />
            <FaLinkedinIn className="hover:text-white transition cursor-pointer" />

            <div className="w-px h-5 bg-white/10 mx-1" />

            <FaMagnifyingGlass className="hover:text-white transition cursor-pointer" />

            {/* Avatar */}
            <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-xs font-semibold text-white cursor-pointer">
              H
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
