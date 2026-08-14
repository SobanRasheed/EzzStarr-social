import logo from "../assets/logo.png";
const footerVectors = {
  discord: "https://www.figma.com/api/mcp/asset/15894437-5a44-46d3-a346-e34a671d1b18.svg",
  x: "https://www.figma.com/api/mcp/asset/4f3a0037-aee7-448c-9e70-018d15ee424e.svg",
  telegram: "https://www.figma.com/api/mcp/asset/56f1cfb5-568d-4e51-888f-c85adf649dee.svg",
  instagram: "https://www.figma.com/api/mcp/asset/3df73a74-bb57-4b23-a2f0-d1ba3f8b9f6f.svg",
  linkedin: "https://www.figma.com/api/mcp/asset/36b00b80-9aad-4f56-8bc1-1ee54d8e0a42.svg",
};
const Footer = () => {
  return (
    <footer className="relative bg-[#010101] text-white pt-20 pb-12 border-t border-white/20">
      {/* top gradient divider */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center text-center gap-7">
        {/* Logo */}
        <div className="flex items-center justify-center">
          <img src={logo} alt="Ezzstar Logo" className="h-8 w-[220px] object-contain" />
        </div>

        {/* Nav links */}
        <nav className="flex flex-wrap justify-center gap-x-7 gap-y-2 text-[13px] text-white">
          <a href="#" className="hover:text-white transition">About Us</a>
          <a href="#" className="hover:text-white transition">Upload Manga</a>
          <a href="#" className="hover:text-white transition">Write Stories</a>
          <a href="#" className="hover:text-white transition">Create Thread</a>
          <a href="#" className="hover:text-white transition">Create Events</a>
          <a href="#" className="hover:text-white transition">Connect Wallet</a>
        </nav>

        {/* Social icons */}
        <div className="flex items-center gap-3">
          <a href="https://discord.gg/sY3gsZVyeg" target="_blank" rel="noopener noreferrer" className="hover:text-[#5865F2] transition">
            <img src={footerVectors.discord} alt="Discord" className="h-[20px] w-[20px]" />
          </a>
          <a href="https://t.me/EzzstarSPCA" target="_blank" rel="noopener noreferrer" className="hover:text-[#0088cc] transition">
            <img src={footerVectors.telegram} alt="Telegram" className="h-[20px] w-[20px]" />
          </a>
          <a href="https://x.com/ezzstarx?s=21" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
            <img src={footerVectors.x} alt="X" className="h-[20px] w-[20px]" />
          </a>
          <a href="https://www.instagram.com/ezzstars/" target="_blank" rel="noopener noreferrer" className="hover:text-[#E1306C] transition">
            <img src={footerVectors.instagram} alt="Instagram" className="h-[20px] w-[20px]" />
          </a>
          <a href="https://www.linkedin.com/company/ezzstar/" target="_blank" rel="noopener noreferrer" className="hover:text-[#0077b5] transition">
            <img src={footerVectors.linkedin} alt="LinkedIn" className="h-[20px] w-[20px]" />
          </a>
        </div>

        {/* Legal links */}
        <div className="flex gap-10 text-[13px] text-white">
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
