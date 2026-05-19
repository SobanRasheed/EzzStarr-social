import { IoMdHome } from "react-icons/io";
import { FaFire } from "react-icons/fa";
import { CiClock2 } from "react-icons/ci";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { FaMagnifyingGlass } from "react-icons/fa6";

const navItems = [
  { name: "Home", icon: <IoMdHome size={20} />, active: true },
  { name: "Popular", icon: <FaFire size={20} />, active: false },
  { name: "Recent", icon: <CiClock2 size={20} />, active: false },
  { name: "Joined", icon: <BsFillPersonPlusFill size={20} />, active: false },
  { name: "Discover", icon: <FaMagnifyingGlass size={20} />, active: false },
];

export default function LeftSidebar() {
  return (
    <div className="w-[270px] flex-shrink-0 pt-[44px] sticky top-[100px] h-[calc(100vh-100px)]">
      <div className="flex flex-col gap-6">
        {navItems.map((item) => (
          <div
            key={item.name}
            className={`flex items-center gap-4 cursor-pointer transition-all duration-300 ${
              item.active
                ? "h-[48px] px-[14px] py-[12px] bg-[linear-gradient(270deg,rgba(247,79,158,0.24)_0%,rgba(247,79,158,0.2)_100%)] border-r border-[#EF00F4] text-white font-satoshi font-medium text-[16px]"
                : "border-b border-[rgba(117,117,117,0.24)] pb-2 text-white font-satoshi text-[16px] hover:text-[#EF00F4]"
            }`}
          >
            {item.icon}
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
