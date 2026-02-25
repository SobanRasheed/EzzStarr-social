import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import LoginModal from "../components/LoginModal";
import {
  FaDiscord,
  FaXTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaMagnifyingGlass,
  FaBars,
} from "react-icons/fa6";
import { PiTelegramLogo } from "react-icons/pi";
import { FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const linkClass = ({ isActive }) =>
    `text-sm transition ${isActive ? "text-white" : "text-gray-400 hover:text-white"
    }`;

  // Close menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="fixed top-0 w-full z-50">
      <nav className="backdrop-blur-md px-20 bg-black/40 border-b border-white/5">

        <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 text-white font-semibold tracking-wide">
            <span className="text-xl">∞</span>
            <span>EZZSTAR</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink to="/" className={linkClass}>Home</NavLink>
            <NavLink to="/membership" className={linkClass}>Membership</NavLink>
            <NavLink to="/manga" className={linkClass}>Manga</NavLink>
            <NavLink to="/stories" className={linkClass}>Stories</NavLink>
            <NavLink to="/gist" className={linkClass}>Gist</NavLink>
            <NavLink to="/events" className={linkClass}>Events</NavLink>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">

            {/* Social Icons (Desktop Only) */}
            <div className="hidden md:flex items-center gap-4 text-gray-400">
              <FaDiscord className="hover:text-white cursor-pointer transition" />
              <PiTelegramLogo className="hover:text-white cursor-pointer transition" />
              <FaXTwitter className="hover:text-white cursor-pointer transition" />
              <FaInstagram className="hover:text-white cursor-pointer transition" />
              <FaLinkedinIn className="hover:text-white cursor-pointer transition" />
              <div className="w-px h-5 bg-white/10 mx-1" />
            </div>

            <FaMagnifyingGlass className="hover:text-white text-white cursor-pointer transition" />
            {/* Avatar */}
            <div onClick={() => setIsLoginOpen(true)} className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-xs font-semibold text-white cursor-pointer">
              <img className="w-7" src="pfp.svg" alt="" />
            </div>

            {/* Hamburger (Mobile Only) */}
            <button
              className="md:hidden text-white text-xl"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden backdrop-blur-md py-6 border-t border-white/5">
            <div className="flex flex-col items-center gap-6 text-gray-400">
              <NavLink to="/" onClick={() => setIsOpen(false)} className={linkClass}>Home</NavLink>
              <NavLink to="/membership" onClick={() => setIsOpen(false)} className={linkClass}>Membership</NavLink>
              <NavLink to="/manga" onClick={() => setIsOpen(false)} className={linkClass}>Manga</NavLink>
              <NavLink to="/stories" onClick={() => setIsOpen(false)} className={linkClass}>Stories</NavLink>
              <NavLink to="/gist" onClick={() => setIsOpen(false)} className={linkClass}>Gist</NavLink>
              <NavLink to="/events" onClick={() => setIsOpen(false)} className={linkClass}>Events</NavLink>
            </div>
          </div>
        )}
      </nav>
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />
    </header>
  );
};

export default Navbar;