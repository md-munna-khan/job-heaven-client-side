import { Link } from "react-router-dom";
import { FaHome, FaTasks, FaUser } from "react-icons/fa";

const AdminMenu = () => {
    return (
        <div className=" flex flex-col  ">
    <Link to="admin-home"  className="text-blue-600 inline-flex items-center  hover:underline">
    <FaHome /> Admin Home
      </Link>
      <Link to="manage-Users" className="text-blue-600 inline-flex items-center hover:underline">
       <FaUser></FaUser> Manage Users
      </Link>
      <Link to="manage-task" className="text-blue-600 inline-flex items-center hover:underline">
       <FaTasks></FaTasks> Manage Tasks
      </Link>
        </div>
    );
};

export default AdminMenu;