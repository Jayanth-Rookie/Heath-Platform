import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  Calendar, 
  Heart, 
  FileText, 
  Map, 
  User, 
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSelector } from "react-redux";
import GoogleTranslateButton from './GoogleTranslateButton';

const Sidebar = () => {
  const {user}=useSelector((state)=>state.user)
  const location = useLocation();
  // Mock user data instead of using auth
  // const user = { name: 'Choco Boy', role: 'Patient' };
  const username=user?.username || 'user';
  
  const menuItems = [
    { path: "/", label: "Home", icon: <Home size={20} /> },
    { path: "/book-doctor", label: "Book Doctor", icon: <Calendar size={20} /> },
    { path: "/mental-health", label: "Mental Support", icon: <Heart size={20} /> },
    { path: "/reports", label: "Health Records", icon: <FileText size={20} /> },
    // { path: "/find-doctor", label: "Find Doctor", icon: <Map size={20} /> },
    { path: "/profile", label: "Profile", icon: <User size={20} /> },
  ];

  return (
    <div className="h-screen w-64 bg-white shadow-md flex flex-col border-r border-gray-100">
      <div className="p-5 border-b border-gray-100">
        <Link to="/" className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-medguard-500 flex items-center justify-center">
            <span className="text-white font-bold text-lg">V</span>
          </div>
          <span className="text-xl font-bold">Vertex.ai</span>
        </Link>
      </div>
      <GoogleTranslateButton />
      <div className="p-5 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-medguard-200 flex items-center justify-center">
            <span className="text-medguard-700 font-semibold">
              {user?.username?.split(' ').map(n => n[0]).join('') || 'JD'}
            </span>
          </div>
          <div>
            <p className="text-sm font-medium">{user?.username || 'John Doe'}</p>
            <p className="text-xs text-gray-500">{user?.role || 'Patient'}</p>
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
              location.pathname === item.path
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
        <Link 
          to="/login"
          className="flex w-full items-center gap-3 px-4 py-3 rounded-lg transition-colors text-gray-600 hover:bg-gray-50"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
