import logo from "../assets/logo.png";
const figmaSocialIcons = [
  ["Discord", "https://discord.gg/sY3gsZVyeg", "https://www.figma.com/api/mcp/asset/15894437-5a44-46d3-a346-e34a671d1b18.svg"],
  ["Telegram", "https://t.me/EzzstarSPCA", "https://www.figma.com/api/mcp/asset/56f1cfb5-568d-4e51-888f-c85adf649dee.svg"],
  ["X", "https://x.com/ezzstarx?s=21", "https://www.figma.com/api/mcp/asset/4f3a0037-aee7-448c-9e70-018d15ee424e.svg"],
  ["Instagram", "https://www.instagram.com/ezzstars/", "https://www.figma.com/api/mcp/asset/3df73a74-bb57-4b23-a2f0-d1ba3f8b9f6f.svg"],
  ["LinkedIn", "https://www.linkedin.com/company/ezzstar/", "https://www.figma.com/api/mcp/asset/36b00b80-9aad-4f56-8bc1-1ee54d8e0a42.svg"],
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
