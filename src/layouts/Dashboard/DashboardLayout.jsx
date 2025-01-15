


// import { Outlet } from 'react-router-dom'
// import Sidebar from './sidebar/Sidebar'


// const DashboardLayout = () => {
//   return (
//     <div className='relative min-h-screen md:flex bg-white'>
//       {/* Left Side: Sidebar Component */}
//       <Sidebar />
//       {/* Right Side: Dashboard Dynamic Content */}
//       <div className='flex-1  md:ml-64'>
//         <div className='p-5'>
//           {/* Outlet for dynamic contents */}
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   )
// }

// export default DashboardLayout


import { Outlet } from "react-router-dom";

import Footer from "../../assets/shared/Footer";
import Sidebar from "./sidebar/Sidebar";

const DashboardLayout = () => {
  return (
    <div className=" container mx-auto  flex h-screen">
      {/* Sidebar Section */}
      <div className="w-1/4 bg-gray-200 p-4">
        <Sidebar />
      </div>

      {/* Main Content Section */}
      <div className="w-3/4 flex flex-col">
        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;
