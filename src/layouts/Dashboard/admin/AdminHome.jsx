import { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { ClipLoader } from 'react-spinners'; // You can use any loading spinner you like
import AdminWithdrawals from './AdminWithdrawals';
import LoadingSpinner from '../../../assets/shared/LoadingSpinner';
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const AdminHome = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosSecure = useAxiosSecure(); // Use the secure Axios instance

  useEffect(() => {
    const fetchAdminStats = async () => {
      try {
        const response = await axiosSecure.get('/admin-stats'); // Backend endpoint for admin stats
        setStats(response?.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch admin stats');
        setLoading(false);
      }
    };
console.log('bipod',stats)
    fetchAdminStats();
  }, [axiosSecure]);
 const {data=[]}=useQuery({
  queryKey:['withdraw'],
  queryFn: async()=>{
    const res=await axios.get(`${import.meta.env.VITE_API_URL}/withdraw`)
    return res.data
  }
 })

 const sum = data.reduce((sum,total)=>sum+total.withdrawal_amount,0)
 console.log(sum)
  if (loading) {
    return (
      <div className="text-center text-xl text-gray-500">
        <ClipLoader color="#4B5563" size={50} />
        <p><LoadingSpinner></LoadingSpinner></p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-xl text-red-600">
        <p>{error}</p>
      </div>
    );
  }

  // Destructure stats with default values in case of missing data
  const { totalWorkers = 0, totalBuyers = 0, totalAvailableCoins= 0, totalPayments = 0 } = stats;

  return (
    <div className="container md:mt-20 mx-auto p-6">
         <Helmet>
              <title> Job Heaven | Admin-Home</title>
            </Helmet>
      <h2 className="text-3xl font-semibold mb-6 text-center text-blue-600">Admin Dashboard</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Workers */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
          <h3 className="text-xl font-medium text-gray-700">Total Workers</h3>
          <p className="text-2xl font-bold text-blue-500">{totalWorkers}</p>
        </div>

        {/* Total Buyers */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
          <h3 className="text-xl font-medium text-gray-700">Total Buyers</h3>
          <p className="text-2xl font-bold text-green-500">{totalBuyers}</p>
        </div>

        {/* Total Available Coins */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
          <h3 className="text-xl font-medium text-gray-700">Total Available Coins</h3>
          <p className="text-2xl font-bold text-yellow-500">{totalAvailableCoins
          }</p>
        </div>

        {/* Total Payments */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
          <h3 className="text-xl font-medium text-gray-700">Total Payments</h3>
          <p className="text-2xl font-bold text-red-500">${sum}</p>
        </div>
      </div>
      <AdminWithdrawals></AdminWithdrawals>
    </div>
  );
};

export default AdminHome;


