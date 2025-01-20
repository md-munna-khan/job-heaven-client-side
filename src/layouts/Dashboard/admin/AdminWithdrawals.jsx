import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AdminWithdrawals = () => {
  const [withdrawals, setWithdrawals] = useState([]);

  useEffect(() => {
    // Fetch all pending withdrawal requests
    const fetchWithdrawals = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/withdrawals`);
        setWithdrawals(response.data);
      } catch (error) {
        console.error("Error fetching withdrawals:", error);
      }
    };

    fetchWithdrawals();
  }, []);

  const handleApprove = async (withdrawalId, userEmail, withdrawalAmount) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/approveWithdrawal`, {
        withdrawalId,
        userEmail,
        withdrawalAmount,
      });

      if (response.status === 200) {
      toast.success("Withdrawal approved successfully!");
        setWithdrawals((prevWithdrawals) =>
          prevWithdrawals.filter((withdrawal) => withdrawal._id !== withdrawalId)
        );
      }
    } catch (error) {
      console.error("Error approving withdrawal:", error);
     toast.error("Failed to approve withdrawal.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">Pending Withdrawals</h1>

      {withdrawals.length === 0 ? (
        <p className="text-center">No pending withdrawal requests.</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Worker Name</th>
              <th className="py-2 px-4 border-b">Withdrawal Amount ($)</th>
              <th className="py-2 px-4 border-b">Payment System</th>
              <th className="py-2 px-4 border-b">Account Number</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {withdrawals.map((withdrawal) => (
              <tr key={withdrawal._id}>
                <td className="py-2 px-4 border-b">{withdrawal.worker_name}</td>
                <td className="py-2 px-4 border-b">{withdrawal.withdrawal_amount}</td>
                <td className="py-2 px-4 border-b">{withdrawal.payment_system}</td>
                <td className="py-2 px-4 border-b">{withdrawal.account_number}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() =>
                      handleApprove(withdrawal._id, withdrawal.worker_email, withdrawal.withdrawal_amount)
                    }
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                  >
                    Payment Success
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminWithdrawals;
