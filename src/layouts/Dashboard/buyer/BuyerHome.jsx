import  { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';

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
    return <div>Loading buyer stats...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  const totalPayment = buyerStats?.totalPayment ?? 0;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Buyer Stats</h2>
      <div style={styles.statsBox}>
        <p><strong>Total Tasks:</strong> {buyerStats?.totalTasks || 0}</p>
        <p><strong>Total Pending Workers:</strong> {buyerStats?.totalPending || 0}</p>
        <p><strong>Total Payment:</strong> ${totalPayment.toFixed(2)}</p>
      </div>
    </div>
  );
};

// Inline styles for the component
const styles = {
  container: {
    border: '1px solid #ddd',
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '400px',
    margin: '20px auto',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
  heading: {
    fontSize: '1.5rem',
    color: '#333',
    marginBottom: '20px',
  },
  statsBox: {
    fontSize: '1rem',
    lineHeight: '1.5',
    color: '#555',
  },
};

export default BuyerHome;
