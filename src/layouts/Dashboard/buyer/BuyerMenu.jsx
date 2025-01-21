

import { FaHome, FaTasks, FaCoins, FaHistory } from "react-icons/fa";
import { MdAddTask } from "react-icons/md";
import { Link } from "react-router-dom";

const BuyerMenu = () => {
  return (
    <div className="p-6 mt-20 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Buyer Menu</h2>
      <ul className="space-y-4">
        <li>
          <Link
            to="/dashboard/buyer"
            className="flex items-center p-3 text-gray-600 rounded-lg hover:bg-blue-100 hover:text-blue-600 transition duration-200"
          >
            <FaHome className="mr-3 text-xl" />
            <span>Buyer Home</span>
          </Link>
        </li>
        <li>
          <Link
            to="task-to-review"
            className="flex items-center p-3 text-gray-600 rounded-lg hover:bg-blue-100 hover:text-blue-600 transition duration-200"
          >
            <FaHome className="mr-3 text-xl" />
            <span>Task To Review</span>
          </Link>
        </li>
        <li>
          <Link
            to="add-new-tasks"
            className="flex items-center p-3 text-gray-600 rounded-lg hover:bg-blue-100 hover:text-blue-600 transition duration-200"
          >
            <FaTasks className="mr-3 text-xl" />
            <span>Add New Tasks</span>
          </Link>
        </li>
        <li>
          <Link
            to="my-tasks"
            className="flex items-center p-3 text-gray-600 rounded-lg hover:bg-blue-100 hover:text-blue-600 transition duration-200"
          >
            <MdAddTask className="mr-3 text-xl" />
            <span>My Tasks</span>
          </Link>
        </li>
        <li>
          <Link
            to="purchase-coin"
            className="flex items-center p-3 text-gray-600 rounded-lg hover:bg-blue-100 hover:text-blue-600 transition duration-200"
          >
            <FaCoins className="mr-3 text-xl" />
            <span>Purchase Coin</span>
          </Link>
        </li>
        <li>
          <Link
            to="payment-history"
            className="flex items-center p-3 text-gray-600 rounded-lg hover:bg-blue-100 hover:text-blue-600 transition duration-200"
          >
            <FaHistory className="mr-3 text-xl" />
            <span>Payment History</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default BuyerMenu;
