import { FaHome, FaTasks } from "react-icons/fa";
import { Link } from "react-router-dom";
import { VscFileSubmodule } from "react-icons/vsc";
import { BiMoneyWithdraw } from "react-icons/bi";
const WorkerMenu = () => {
    return (
        <div className=" flex flex-col ">
            
             <Link to="/dashboard/worker" className="text-blue-600 inline-flex items-center hover:underline">
       <FaHome></FaHome> Home 
      </Link>
             <Link to="approved-submissions" className="text-blue-600 inline-flex items-center hover:underline">
       <FaHome></FaHome> Approved 
      </Link>
      <Link to="task-list" className="text-blue-600 inline-flex items-center hover:underline">
       <FaTasks></FaTasks> Task List
      </Link>
      <Link to="my-submissions" className="text-blue-600 inline-flex items-center hover:underline">
      <VscFileSubmodule />  My Submissions
      </Link>
      <Link to="withdrawals" className="text-blue-600 inline-flex items-center hover:underline">
      <BiMoneyWithdraw /> Withdrawals
      </Link>
        </div>
    );
};

export default WorkerMenu;