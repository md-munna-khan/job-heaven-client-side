// import AdminMenu from "../admin/AdminMenu";
// import BuyerMenu from "../buyer/BuyerMenu";
// import WorkerMenu from "../Worker/WorkerMenu";


// const Sidebar = ({role}) => {
//   return (
//     // <div className="flex flex-col space-y-4">
//     //  <WorkerMenu></WorkerMenu>
//     //  <BuyerMenu></BuyerMenu>
//     //  <AdminMenu></AdminMenu>
//     // </div>
//      {/* Nav Items */}
//      <>
//       <div className="flex flex-col justify-between flex-1 mt-6">
//         <nav>
//           {/* ডাইনামিক মেনু রেন্ডার */}
//           {role === "worker" && <WorkerMenu />}
//           {role === "buyer" && <BuyerMenu />}
//           {role === "admin" && <AdminMenu />}
//         </nav>
//       </div>
//     </>
//   );
// };

// export default Sidebar;

import AdminMenu from "../admin/AdminMenu";
import BuyerMenu from "../buyer/BuyerMenu";

import useRole from "../../../hooks/useRole";
import WorkerMenu from "../Worker/WorkerMenu";

const Sidebar = () => {
  const [role, isLoading] = useRole()
  return (
    <>
      <div className="flex flex-col justify-between flex-1 mt-6">
        <nav>
          {/* ডাইনামিক মেনু রেন্ডার */}
          {role === "Worker" && <WorkerMenu />}
          {role === "Buyer" && <BuyerMenu />}
          {role === "Admin" && <AdminMenu />}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
