;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from '../../../hooks/useAuth';

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
          console.error('Error fetching submissions:', error);
          setLoading(false);
        });
    }
  }, [user?.email]);

  if (!user?.email) {
    return <p>Loading user information...</p>;
  }

  return (
    <div>
      <h2>Approved Submissions</h2>
      {loading ? (
        <p>Loading submissions...</p>
      ) : submissions.length > 0 ? (
        <table border="1" style={{ width: '100%', textAlign: 'left' }}>
          <thead>
            <tr>
              <th>Task Title</th>
              <th>Payable Amount</th>
              <th>Buyer Name</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission) => (
              <tr key={submission._id}>
                <td>{submission.task_title}</td>
                <td>{submission.payable_amount}</td>
                <td>{submission.Buyer_name}</td> {/* Display Buyer Name */}
                <td>{submission.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No approved submissions found.</p>
      )}
    </div>
  );
};

export default ApprovedSubmissions;
