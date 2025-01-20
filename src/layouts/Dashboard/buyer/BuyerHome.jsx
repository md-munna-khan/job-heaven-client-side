


import { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import LoadingSpinner from '../../../assets/shared/LoadingSpinner';

const BuyerHome = () => {
  const { user } = useAuth(); // Get the logged-in user
  const [buyerStats, setBuyerStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosSecure = useAxiosSecure(); // Use the secure Axios instance

  useEffect(() => {
    const fetchBuyerStats = async () => {
      try {
        const response = await axiosSecure.get(`/buyer-states/${user?.email}`); // Fetch buyer stats
        setBuyerStats(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch buyer stats');
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchBuyerStats();
    }
  }, [axiosSecure, user?.email]);

  if (loading) {
    return <div className="text-center text-xl text-gray-500"><LoadingSpinner></LoadingSpinner></div>;
  }

  if (error) {
    return <div className="text-center text-xl text-red-600">{error}</div>;
  }

  const totalPayment = buyerStats?.totalPayment ?? 0;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-semibold mb-6 text-center text-blue-600">
        Welcome, {user?.displayName || 'Buyer'}!
      </h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Tasks Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
          <h3 className="text-xl font-medium text-gray-700">Total Tasks</h3>
          <p className="text-2xl font-bold text-blue-500">{buyerStats?.totalTasks || 0}</p>
        </div>

        {/* Total Pending Workers Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
          <h3 className="text-xl font-medium text-gray-700">Total Pending Workers</h3>
          <p className="text-2xl font-bold text-yellow-500">{buyerStats?.totalPending || 0}</p>
        </div>

        {/* Total Payment Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
          <h3 className="text-xl font-medium text-gray-700">Total Payment</h3>
          <p className="text-2xl font-bold text-green-500">${totalPayment.toFixed(2)}</p>
        </div>
      </div>

      {/* Additional Stats / Info (if any) */}
      <div className="mt-6 bg-white shadow-lg rounded-lg p-6">
        <h3 className="text-xl font-medium text-gray-700">Additional Stats</h3>
        <p className="text-gray-500 mt-2">
          Add any additional statistics or important information you'd like to show about the buyer here.
        </p>
      </div>
    </div>
  );
};

export default BuyerHome;

