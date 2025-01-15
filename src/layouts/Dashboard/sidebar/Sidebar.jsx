import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="flex flex-col space-y-4">
      <Link to="worker-home" className="text-blue-600 hover:underline">
        Worker Home
      </Link>
      <Link to="task-list" className="text-blue-600 hover:underline">
        Task List
      </Link>
      <Link to="my-submissions" className="text-blue-600 hover:underline">
        My Submissions
      </Link>
      <Link to="withdrawals" className="text-blue-600 hover:underline">
        Withdrawals
      </Link>
    </div>
  );
};

export default Sidebar;
