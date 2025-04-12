import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  Calendar, 
  Users, 
  User, 
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";
import GoogleTranslateButton from './GoogleTranslateButton';


const DoctorSidebar = () => {
  const location = useLocation();

  // Static values instead of useAuth
  const userName = 'Doctor';
  const userRole = 'Doctor';
  const initials = userName.split(' ').map(n => n[0]).join('') || 'DR';

  const menuItems = [
    { path: "/doctor", label: "Dashboard", icon: <Home size={20} /> },
    { path: "/doctor-appointment", label: "Appointments", icon: <Calendar size={20} /> },
    // { path: "/doctor/patients", label: "Patients", icon: <Users size={20} /> },
    { path: "/doctor/profile", label: "My Profile", icon: <User size={20} /> },
  ];

  const handleLogout = () => {
    console.log("Logout clicked");
    // Optionally, navigate or clear localStorage here
  };

  return (
    <div className="h-screen w-64 bg-white shadow-md flex flex-col border-r border-gray-100">
      <div className="p-5 border-b border-gray-100">
        <Link to="/doctor" className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-medguard-500 flex items-center justify-center">
            <span className="text-white font-bold text-lg">M</span>
          </div>
          <span className="text-xl font-bold">Medguard</span>
        </Link>
      </div>
      <GoogleTranslateButton />

      <div className="p-5 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-medguard-200 flex items-center justify-center">
            <span className="text-medguard-700 font-semibold">{initials}</span>
          </div>
          <div>
            <p className="text-sm font-medium">{userName}</p>
            <p className="text-xs text-gray-500">{userRole}</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 p-5 space-y-1 overflow-y-auto">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
              location.pathname === item.path || (item.path === "/doctor" && location.pathname === "/doctor")
                ? "bg-medguard-50 text-medguard-500 font-medium"
                : "text-gray-600 hover:bg-gray-50"
            )}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
      
      <div className="p-5 border-t border-gray-100">
        <button 
          onClick={handleLogout}
          className="flex w-full items-center gap-3 px-4 py-3 rounded-lg transition-colors text-gray-600 hover:bg-gray-50"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default DoctorSidebar;
