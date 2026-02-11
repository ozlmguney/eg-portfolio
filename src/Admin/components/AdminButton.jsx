import { useNavigate } from "react-router-dom";
import { UserLock } from "lucide-react"; 

const AdminButton = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed top-6 right-6 z-[100]">
      <button
        onClick={() => navigate("/login")}
        className="group relative flex items-center justify-center w-12 h-12 md:w-auto md:px-5 md:py-2.5 
                   bg-[#1e1e1f]/80 backdrop-blur-md border border-white/10 rounded-2xl 
                   text-gray-400 hover:text-[#FFDB70] hover:border-[#FFDB70]/50 
                   transition-all duration-300 shadow-2xl overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent 
                        translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
        
        <UserLock size={20} className="shrink-0" />
        
        <span className="hidden md:block ml-2 text-sm font-semibold tracking-wide">
          Yönetim Paneli
        </span>
      </button>
    </div>
  );
};

export default AdminButton;