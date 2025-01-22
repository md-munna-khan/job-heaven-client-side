


import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";
import DashNavbar from "./DashNav";
import Footer from "../../assets/shared/Footer";
import { Helmet } from "react-helmet-async";

const DashboardLayout = () => {
  return (
    <div className="container mx-auto flex flex-col md:flex-row h-screen">
         <Helmet>
              <title> Job Heaven | Dashboard</title>
            </Helmet>
      {/* Navbar for Mobile */}
      <DashNavbar />

      {/* Sidebar Section */}
      <div className="w-full md:w-1/5 mt-16 md:mt-0 md:rounded-md border md:p-4 bg-shadow-100">
        <Sidebar />
      </div>

      {/* Main Content Section */}
      <div className="w-full md:w-4/5 flex flex-col bg-white">
        {/* Main Content Area */}
        <div className="flex-1  mt-4 md:mt-0 p-4">
          <Outlet />
        </div>
        <Footer></Footer>
      </div>
     
    </div>
  );
};

export default DashboardLayout;

