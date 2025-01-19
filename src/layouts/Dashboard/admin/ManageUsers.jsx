import React from "react";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";

const ManageUsers = () => {
  const { user } = useAuth(); // Get current user info
  const axiosSecure = useAxiosSecure(); // Axios instance with secure headers
  const {id} = useParams();

  // Fetch all users using React Query
  const {
    data: usersData,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["users", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/all-users');
      return data; // Expected data to be an array
    },
  });

  // Handle Remove User
  const handleRemoveUser = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this user!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    });

    if (confirm.isConfirmed) {
      try {
        const response = await axiosSecure.delete(`/delete-user/${id}`);
        if (response.data.message) {
          Swal.fire("Deleted!", response.data.message, "success");
          refetch(); // Refresh the user list
        }
      } catch (error) {
        Swal.fire("Error!", "Failed to delete user", "error");
      }
    }
  };

//   Handle Role Update
const handleUpdateRole = async (userEmail, newRole) => {
    try {
      // Make sure the role is valid before sending the request
      if (!['Admin', 'Buyer', 'Worker'].includes(newRole)) {
        Swal.fire("Error!", "Invalid role selected", "error");
        return;
      }
  
      const response = await axiosSecure.patch(`/update-role/${user?.email}`, {
        newRole: newRole, // Send the new role in the request body
      });
  
      if (response.data.message) {
        Swal.fire("Updated!", response.data.message, "success");
        refetch(); // Refresh the user list
      }
    } catch (error) {
      Swal.fire("Error!", "Failed to update user role", "error");
    }
  };
  // Show loading spinner while fetching users
  if (isLoading) return <p>Loading...</p>;

  // Handle error case
  if (isError || !Array.isArray(usersData)) {
    return <p>Error fetching users or invalid data format.</p>;
  }

  return (
    <div>
      <Helmet>
        <title>Manage Users</title>
      </Helmet>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <h2 className="text-2xl font-semibold leading-tight">Manage Users</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Display Name
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Photo
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Coins
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {usersData.map((userData) => (
                  <tr key={userData._id}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {userData.name || "N/A"}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {userData.email}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <img
                        className="w-10 h-10 rounded-full"
                        src={userData.imageUrl || "/default-avatar.png"}
                        alt={userData.name || "Avatar"}
                      />
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <select
                        defaultValue={userData.role}
                        onChange={(e) =>
                          handleUpdateRole(userData._id, e.target.value)
                        }
                        className="border rounded px-2 py-1"
                      >
                        <option value="Admin">Admin</option>
                        <option value="Buyer">Buyer</option>
                        <option value="Worker">Worker</option>
                      </select>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {userData.coin || 0}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <button
                        onClick={() => handleRemoveUser(userData._id)}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
