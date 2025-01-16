

import AdminMenu from "../admin/AdminMenu";
import BuyerMenu from "../buyer/BuyerMenu";

import useRole from "../../../hooks/useRole";
import WorkerMenu from "../Worker/WorkerMenu";

const Sidebar = () => {
  const [role, isLoading] = useRole()
  return (
    <>
      <div className="flex flex-col  justify-between flex-1 mt-6">
        <nav>
          {/* dynamic menu render */}
          {role === "Worker" && <WorkerMenu />}
          {role === "Buyer" && <BuyerMenu />}
          {role === "Admin" && <AdminMenu />}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
