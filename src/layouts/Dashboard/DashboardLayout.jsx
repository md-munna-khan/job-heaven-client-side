


import { Outlet, useNavigate } from "react-router-dom";

// import Footer from "../../assets/shared/Footer";
import Sidebar from "./sidebar/Sidebar";
import DashNavbar from "./DashNav";
import useRole from "../../hooks/useRole";
import { useEffect } from "react";

const DashboardLayout = () => {

  const [role, isLoading] = useRole()


const navigate = useNavigate()

useEffect(()=>{
  if(role === "Worker"){
    navigate('/dashboard/worker')
  }
  if(role === "Buyer"){
    navigate('/dashboard/buyer')
  }
  if(role === "Admin"){
    navigate('/dashboard/admin-home')
  }
},[role])



  return (
    <div className=" container mx-auto flex h-screen  ">
      {/* Sidebar Section */}
      <DashNavbar></DashNavbar>
   
     <div className="w-1/4  h-full mt-20 bg-gray-200 p-4  ">
        <Sidebar />
      </div>

      {/* Main Content Section */}
      <div className="w-3/4 flex flex-col ">
        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto  mt-20 p-4">
          <Outlet />
        </div>

        {/* Footer */}
        {/* <Footer /> */}
      </div>
     </div>
   
  );
};

export default DashboardLayout;
