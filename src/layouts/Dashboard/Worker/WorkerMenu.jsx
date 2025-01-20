import { FaHome, FaTasks } from "react-icons/fa";
import { Link } from "react-router-dom";
import { VscFileSubmodule } from "react-icons/vsc";
import { BiMoneyWithdraw } from "react-icons/bi";

const WorkerMenu = () => {
  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Worker Menu</h2>
      <ul className="space-y-4">
        <li>
          <Link
            to="/dashboard/worker"
            className="flex items-center p-3 text-gray-600 rounded-lg hover:bg-blue-100 hover:text-blue-600 transition duration-200"
          >
            <FaHome className="mr-3 text-xl" />
            <span>Home</span>
          </Link>
        </li>
        <li>
          <Link
            to="approved-submissions"
            className="flex items-center p-3 text-gray-600 rounded-lg hover:bg-blue-100 hover:text-blue-600 transition duration-200"
          >
            <FaHome className="mr-3 text-xl" />
            <span>Approved</span>
          </Link>
        </li>
        <li>
          <Link
            to="task-list"
            className="flex items-center p-3 text-gray-600 rounded-lg hover:bg-blue-100 hover:text-blue-600 transition duration-200"
          >
            <FaTasks className="mr-3 text-xl" />
            <span>Task List</span>
          </Link>
        </li>
        <li>
          <Link
            to="my-submissions"
            className="flex items-center p-3 text-gray-600 rounded-lg hover:bg-blue-100 hover:text-blue-600 transition duration-200"
          >
            <VscFileSubmodule className="mr-3 text-xl" />
            <span>My Submissions</span>
          </Link>
        </li>
        <li>
          <Link
            to="withdrawals"
            className="flex items-center p-3 text-gray-600 rounded-lg hover:bg-blue-100 hover:text-blue-600 transition duration-200"
          >
            <BiMoneyWithdraw className="mr-3 text-xl" />
            <span>Withdrawals</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default WorkerMenu;
