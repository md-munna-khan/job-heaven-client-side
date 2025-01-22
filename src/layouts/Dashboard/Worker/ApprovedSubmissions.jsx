
import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../assets/shared/LoadingSpinner";
import { Helmet } from "react-helmet-async";

const ApprovedSubmissions = () => {
  const { user } = useAuth();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      // Fetch approved submissions
      axios
        .get(`${import.meta.env.VITE_API_URL}/submissions/approved/${user.email}`)
        .then((response) => {
          setSubmissions(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching submissions:", error);
          setLoading(false);
        });
    }
  }, [user?.email]);

  if (!user?.email) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  return (
    <div className="container md:mt-20 mx-auto p-6">
           <Helmet>
               <title> Job Heaven |Approved</title>
                </Helmet>
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Approved Submissions
      </h2>
      {loading ? (
        <div className="flex justify-center items-center">
         <LoadingSpinner></LoadingSpinner>
        </div>
      ) : submissions.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-6 py-3 text-left font-semibold text-sm uppercase tracking-wide">
                  Task Title
                </th>
                <th className="px-6 py-3 text-left font-semibold text-sm uppercase tracking-wide">
                  Payable Amount
                </th>
                <th className="px-6 py-3 text-left font-semibold text-sm uppercase tracking-wide">
                  Buyer Name
                </th>
                <th className="px-6 py-3 text-left font-semibold text-sm uppercase tracking-wide">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((submission) => (
                <tr
                  key={submission._id}
                  className="hover:bg-gray-100 border-b border-gray-200"
                >
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {submission.task_title}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    ${submission.payable_amount}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {submission.Buyer_name}
                  </td>
                  <td
                    className={`px-6 py-4 text-sm font-semibold ${
                      submission.status === "approved"
                        ? "text-green-500"
                        : "text-gray-500"
                    }`}
                  >
                    {submission.status.charAt(0).toUpperCase() +
                      submission.status.slice(1)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <p className="text-lg font-medium text-gray-500">
            No approved submissions found.
          </p>
        </div>
      )}
    </div>
  );
};

export default ApprovedSubmissions;
