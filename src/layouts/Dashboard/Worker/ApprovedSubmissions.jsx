// ;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import useAuth from '../../../hooks/useAuth';

// const ApprovedSubmissions = () => {
//   const { user } = useAuth();
//   const [submissions, setSubmissions] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (user?.email) {
//       // Fetch approved submissions
//       axios
//         .get(`${import.meta.env.VITE_API_URL}/submissions/approved/${user.email}`)
//         .then((response) => {
//           setSubmissions(response.data);
//           setLoading(false);
//         })
//         .catch((error) => {
//           console.error('Error fetching submissions:', error);
//           setLoading(false);
//         });
//     }
//   }, [user?.email]);

//   if (!user?.email) {
//     return <p>Loading user information...</p>;
//   }

//   return (
//     <div>
//       <h2>Approved Submissions</h2>
//       {loading ? (
//         <p>Loading submissions...</p>
//       ) : submissions.length > 0 ? (
//         <table border="1" style={{ width: '100%', textAlign: 'left' }}>
//           <thead>
//             <tr>
//               <th>Task Title</th>
//               <th>Payable Amount</th>
//               <th>Buyer Name</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {submissions.map((submission) => (
//               <tr key={submission._id}>
//                 <td>{submission.task_title}</td>
//                 <td>{submission.payable_amount}</td>
//                 <td>{submission.Buyer_name}</td> {/* Display Buyer Name */}
//                 <td>{submission.status}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p>No approved submissions found.</p>
//       )}
//     </div>
//   );
// };

// export default ApprovedSubmissions;
import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";

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
    return <p className="text-center text-gray-500">Loading user information...</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Approved Submissions
      </h2>
      {loading ? (
        <div className="flex justify-center items-center">
          <p className="text-lg font-medium text-gray-500">Loading submissions...</p>
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
