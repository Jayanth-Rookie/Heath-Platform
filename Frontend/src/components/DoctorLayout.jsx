import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import DoctorSidebar from "./DoctorSidebar";
import Footer from "./Footer";

const DoctorLayout = ({ children }) => {
  const location = useLocation();
  const isDashboard = location.pathname === "/doctor";

  return (
    <div className="flex min-h-screen bg-background">
      <DoctorSidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="flex-1 p-4 md:p-6">
          {children}
        </main>
        {isDashboard && <Footer />}
      </div>
    </div>
  );
};

export default DoctorLayout;
