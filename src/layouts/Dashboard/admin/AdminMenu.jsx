import { Link } from "react-router-dom";
import { FaHome, FaTasks, FaUser } from "react-icons/fa";

const AdminMenu = () => {
  return (
    <div className="p-6 mt-20 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Admin Menu</h2>
      <ul className="space-y-4">
        <li>
          <Link
            to="admin-home"
            className="flex items-center p-3 text-gray-600 rounded-lg hover:bg-blue-100 hover:text-blue-600 transition duration-200"
          >
            <FaHome className="mr-3 text-xl" />
            <span>Admin Home</span>
          </Link>
        </li>
        <li>
          <Link
            to="manage-users"
            className="flex items-center p-3 text-gray-600 rounded-lg hover:bg-blue-100 hover:text-blue-600 transition duration-200"
          >
            <FaUser className="mr-3 text-xl" />
            <span>Manage Users</span>
          </Link>
        </li>
        <li>
          <Link
            to="manage-task"
            className="flex items-center p-3 text-gray-600 rounded-lg hover:bg-blue-100 hover:text-blue-600 transition duration-200"
          >
            <FaTasks className="mr-3 text-xl" />
            <span>Manage Tasks</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminMenu;
