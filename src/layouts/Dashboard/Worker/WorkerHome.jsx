import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';

const WorkerHome = () => {
  const { user } = useAuth();
  const [workerStats, setWorkerStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosSecure = useAxiosSecure(); // Use the custom axios instance

  useEffect(() => {
    const fetchWorkerStats = async () => {
      try {
        const response = await axiosSecure.get(`/worker-states/${user?.email}`);
        setWorkerStats(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch worker stats');
        setLoading(false);
      }
    };

    fetchWorkerStats();
  }, [axiosSecure, user?.email]);

  if (loading) {
    return (
      <div className="text-center text-xl text-gray-500">Loading worker stats...</div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-xl text-red-600">{error}</div>
    );
  }

  // Fallback to 0 if totalEarning is not available or not a number
  const totalEarning = workerStats?.totalEarning ?? 0;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-semibold mb-6 text-center text-blue-600">
        Welcome, {user?.displayName || 'Worker'}!
      </h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Submissions Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
          <h3 className="text-xl font-medium text-gray-700">Total Submissions</h3>
          <p className="text-2xl font-bold text-blue-500">{workerStats.totalSubmissions || 0}</p>
        </div>

        {/* Total Pending Submissions Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
          <h3 className="text-xl font-medium text-gray-700">Total Pending Submissions</h3>
          <p className="text-2xl font-bold text-yellow-500">{workerStats.totalPending || 0}</p>
        </div>

        {/* Total Earnings Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
          <h3 className="text-xl font-medium text-gray-700">Total Earnings</h3>
          <p className="text-2xl font-bold text-green-500">${totalEarning.toFixed(2)}</p>
        </div>
      </div>

      {/* Additional Stats / Info (if any) */}
      <div className="mt-6 bg-white shadow-lg rounded-lg p-6">
        <h3 className="text-xl font-medium text-gray-700">Additional Stats</h3>
        <p className="text-gray-500 mt-2">Here you can add any additional statistics or information that you'd like to show about the worker.</p>
      </div>
    </div>
  );
};

export default WorkerHome;
