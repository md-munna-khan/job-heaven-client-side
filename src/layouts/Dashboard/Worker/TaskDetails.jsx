



import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../assets/shared/LoadingSpinner";

const TaskDetails = () => {
  const { id } = useParams(); // Get taskId from URL params
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [submissionDetails, setSubmissionDetails] = useState("");
  const [loading, setLoading] = useState(true);
  const {user}=useAuth()

  // Fetch Task Details by taskId
  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/Tasks/${id}`);
        setTask(response.data);
      } catch (error) {
        toast.error("Failed to fetch task details.");
        console.error("Error fetching task details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTaskDetails();
  }, [id]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const submissionData = {
      task_id: task._id,
      task_title: task.task_title,
      payable_amount: task.payable_amount,
      worker_email: user.email, // Replace with dynamic user email
      submission_details: submissionDetails,
      worker_name: user.displayName, // Replace with dynamic user name
      Buyer_name: task.creator.name,
      Buyer_email: task.creator.email,
      current_date: new Date(),
      status: "pending",
    };

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/submissions`, submissionData);
      toast.success("Submission successful!");
      navigate("/dashboard/task-list");
    } catch (error) {
      toast.error("Submission failed.");
      console.error("Error submitting task:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
     <LoadingSpinner></LoadingSpinner>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl font-bold">Task not found</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <Toaster position="top-center" reverseOrder={false} />
      <h1 className="text-4xl text-center mb-6 font-bold text-gray-800">Task Details</h1>
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">{task.task_title}</h2>
        {task.task_image_url && (
          <img
            src={task.task_image_url}
            alt="Task"
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
        )}
        <p className="mb-2">
          <strong>Details:</strong> {task.task_detail}
        </p>
        <p className="mb-2">
          <strong>Workers Required:</strong> {task.required_workers}
        </p>
        <p className="mb-2">
          <strong>Payable Amount:</strong> ${task.payable_amount}
        </p>
        <p className="mb-2">
          <strong>Completion Date:</strong>{" "}
          {new Date(task.completion_date).toLocaleDateString()}
        </p>
        <p className="mb-2">
          <strong>Submission Info:</strong> {task.submission_info}
        </p>
        <div className="bg-gray-100 p-4 rounded-lg mt-4">
          <p className="mb-1">
            <strong>Creator:</strong> {task.creator.name}
          </p>
          <p className="mb-1">
            <strong>Email:</strong> {task.creator.email}
          </p>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg shadow-md p-6">
        <h3 className="text-2xl font-bold mb-4 text-gray-800">Submit Your Details</h3>
        <form onSubmit={handleSubmit}>
          <textarea
            name="submission_details"
            value={submissionDetails}
            onChange={(e) => setSubmissionDetails(e.target.value)}
            placeholder="Enter your submission details here..."
            rows="5"
            className="w-full border border-gray-300 rounded-lg p-4 mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskDetails;
