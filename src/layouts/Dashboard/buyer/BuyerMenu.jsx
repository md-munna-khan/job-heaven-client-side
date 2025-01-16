import { FaHome, FaTasks } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdAddTask } from "react-icons/md";
import { FaCoins } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
const BuyerMenu = () => {
    return (
        <div className=" flex flex-col  ">
     <Link to="buyer-home" className="text-blue-600  inline-flex items-center hover:underline">
       <FaHome></FaHome> buyer Home
      </Link>
      <Link to="add-new-tasks" className="text-blue-600 inline-flex items-center hover:underline">
       <FaTasks></FaTasks> Add New Tasks
      </Link>
      <Link to="my-tasks" className="text-blue-600 inline-flex items-center hover:underline">
      <MdAddTask />  My Tasks
      </Link>
      <Link to="purchase-coin" className="text-blue-600 inline-flex items-center hover:underline">
      <FaCoins /> Purchase Coin
      </Link>
      <Link to="Payment-history" className="text-blue-600 inline-flex items-center hover:underline">
      <FaHistory />Payment History
      </Link>
        </div>
    );
};

export default BuyerMenu;