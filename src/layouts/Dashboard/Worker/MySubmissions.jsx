import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";

import { Toaster, toast } from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MySubmissions = () => {
  const { user } = useAuth();
 
const axiosSecure=useAxiosSecure()
  const { data: submissions = [], isLoading, isError } = useQuery({
    queryKey: ["submissions", user?.email],
    queryFn: async () => {
      const response = await axiosSecure(`/submissions/${user?.email}`);
      console.log("API Response:", response.data);
      return Array.isArray(response.data) ? response.data : [];
    },
    enabled: !!user?.email,
    onError: (error) => {
      toast.error("Failed to fetch submissions.");
      console.error("Error fetching submissions:", error);
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl font-bold">Loading...</div>
      </div>
    );
  }

  if (isError || !submissions.length) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl font-bold">No submissions found</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <Toaster position="top-center" reverseOrder={false} />
      <h1 className="text-4xl text-center mb-6 font-bold text-gray-800">My Submissions</h1>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="px-4 py-2 border border-gray-300">Task Title</th>
            <th className="px-4 py-2 border border-gray-300">Payable Amount</th>
            <th className="px-4 py-2 border border-gray-300">Submission Details</th>
            <th className="px-4 py-2 border border-gray-300">Status</th>
            <th className="px-4 py-2 border border-gray-300">Submission Date</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((submission) => (
            <tr key={submission._id} className="hover:bg-gray-100">
              <td className="px-4 py-2 border border-gray-300">{submission.task_title}</td>
              <td className="px-4 py-2 border border-gray-300">
                ${submission.payable_amount}
              </td>
              <td className="px-4 py-2 border border-gray-300">
                {submission.submission_details}
              </td>
              <td
                className={`px-4 py-2 border border-gray-300 font-semibold ${
                  submission.status === "approved"
                    ? "text-green-500"
                    : submission.status === "rejected"
                    ? "text-red-500"
                    : "text-yellow-500"
                }`}
              >
                {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
              </td>
              <td className="px-4 py-2 border border-gray-300">
                {new Date(submission.current_date).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MySubmissions;
