import React, { useState, useEffect } from "react";
import axios from "axios";

const TopWorkers = () => {
  const [topWorkers, setTopWorkers] = useState([]);

  useEffect(() => {
    // Fetch the top 6 workers from the backend
    const fetchTopWorkers = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/top-workers`);
        setTopWorkers(response.data);
      } catch (error) {
        console.error("Error fetching top workers:", error);
      }
    };

    fetchTopWorkers();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">Top 6 Workers</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {topWorkers.map((worker) => (
          <div key={worker._id} className="bg-white p-4 rounded-lg shadow-md text-center">
            <img
              src={worker.imageUrl || "default-image-url.jpg"} // Placeholder if no picture
              alt={worker.displayName}
              className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="text-xl font-semibold">{worker.name}</h3>
         
            <p className="text-gray-600">Coins: ${worker.defaultCoins}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopWorkers;
