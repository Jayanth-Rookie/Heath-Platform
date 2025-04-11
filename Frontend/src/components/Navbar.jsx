import { Bell, Search, Video } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

const Navbar = () => {
  // const user = { name: 'Choco Boy' };
  const {user}=useSelector((state)=>state.user);
  
  return (
    <nav className="bg-white py-4 px-6 border-b flex justify-between items-center">
      <div className="flex-1">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search..." 
            className="pl-10 pr-4 py-2 bg-gray-50 rounded-lg w-full focus:outline-none focus:ring-1 focus:ring-medguard-500"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <Button variant="ghost" className="relative" size="icon">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">3</span>
        </Button>

        {/* Video Call Button */}
        <Link to="/videocall">
          <Button variant="outline" className="flex items-center gap-2">
            <Video size={18} />
            <span className="hidden sm:inline">Video Call</span>
          </Button>
        </Link>
        
        <Link to="/profile" className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-medguard-200 flex items-center justify-center">
            <span className="text-medguard-700 font-semibold">
              {user?.username?.split(' ').map(n => n[0]).join('') || 'JD'}
            </span>
          </div>
          <div className="hidden md:block">
            <div className="text-sm font-medium">{user?.username || 'John Doe'}</div>
            <div className="text-xs text-gray-500">Patient</div>
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
