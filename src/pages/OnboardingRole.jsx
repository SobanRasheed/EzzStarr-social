import { useNavigate } from "react-router-dom";
import { BookOpen, Sparkles, Calendar, Gamepad2 } from "lucide-react";

export default function OnboardingRole() {
  const navigate = useNavigate();

  const roles = [
    {
      id: "READER",
      title: "Reader",
      description: "Dive into amazing manga and stories, claim token rewards, and leave reviews.",
      icon: <BookOpen className="w-12 h-12 text-[#1ED6C6] mb-4" />,
    },
    {
      id: "CREATOR",
      title: "Creator",
      description: "Publish your own chapters, build a loyal fanbase, and earn from tipping splits.",
      icon: <Sparkles className="w-12 h-12 text-[#DF28E2] mb-4" />,
    },
    {
      id: "EVENT_HOST",
      title: "Event Host",
      description: "Organize gaming matches and cosplay contents, manage registrations, and collect fees.",
      icon: <Calendar className="w-12 h-12 text-[#AD7AFF] mb-4" />,
    },
    {
      id: "GAMER",
      title: "Gamer",
      description: "Register for events, battle in single-elimination brackets, and claim prize pools.",
      icon: <Gamepad2 className="w-12 h-12 text-yellow-400 mb-4" />,
    },
  ];

  const handleRoleSelect = async (roleId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/onboarding/role`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ role: roleId }),
      });
      const data = await res.json();
      if (res.ok) {
        navigate("/onboarding/profile");
      } else {
        alert(data.error || "Failed to save role");
      }
    } catch (err) {
      console.error(err);
      alert("Error selected role");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 py-24 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#DF28E2]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#1ED6C6]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl w-full z-10 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
          Select Your Primary Role
        </h1>
        <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto">
          Choose the role that best defines your journey. You can still experience all aspects of the platform!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {roles.map((role) => (
            <div
              key={role.id}
              onClick={() => handleRoleSelect(role.id)}
              className="bg-neutral-900/50 backdrop-blur-md border border-white/10 hover:border-[#DF28E2] hover:bg-neutral-900/80 transition-all duration-300 p-8 rounded-2xl cursor-pointer text-center flex flex-col items-center justify-between group h-72 shadow-xl"
            >
              <div className="flex flex-col items-center">
                <div className="transform group-hover:scale-110 transition-transform duration-300">
                  {role.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-[#DF28E2] transition-colors">
                  {role.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {role.description}
                </p>
              </div>
              <span className="text-[#1ED6C6] font-semibold text-xs tracking-wider uppercase group-hover:text-white mt-4 block">
                Select Role &rarr;
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
