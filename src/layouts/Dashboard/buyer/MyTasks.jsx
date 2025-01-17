import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";  // Import SweetAlert2
import { useQuery } from "@tanstack/react-query";

const MyTasks = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  // const [task, setTasks] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateData, setUpdateData] = useState({});
  const [loading, setLoading] = useState(false);


  const { task_title, task_detail, submission_info } = updateData; // Extract updated fields
  const payload = { task_title, task_detail, submission_info };
 

  const { data:tasks=[],isLoading,refetch } = useQuery({
    queryKey:['task',user],
    queryFn: async () => {
        const { data } = await axiosSecure(`/Tasks?email=${user?.email}`)
        console.log(data)
        // setTasks(
        //             data.sort((a, b) => new Date(b.completion_date) - new Date(a.completion_date))
        //           );
        return data
      },
})
if (isLoading) {
  return <p>loading ...</p>; 
}
  // Handle Delete Task
  const handleDelete = async (taskId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/Tasks/${taskId}`);
          // await axiosSecure.delete(`/Tasks/${taskId}?email=${user?.email}`);
     
          Swal.fire("Deleted!", "Your task has been deleted.", "success");
        } catch (err) {
          Swal.fire("Error", "Failed to delete task.", "error");
        }
        finally{
            refetch()
        }
      }
    });
  };

  // Handle Update Task
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(updateData)
    try {
      const { data } = await axiosSecure.put(`/Tasks/${updateData._id}`, payload);
      if (data.modifiedCount > 0) {
     
        Swal.fire("Success", "Task updated successfully!", "success");
        setIsUpdating(false)
      }
    } catch (err) {
      Swal.fire("Error", "Failed to update task.", "error");
    } finally {
      setLoading(false);
      refetch()
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">My Tasks</h2>
      {loading && <p className="text-center text-blue-500">Loading...</p>}

      {!loading && tasks.length === 0 && (
        <p className="text-center text-gray-500">No tasks found.</p>
      )}

      {!loading && tasks.length > 0 && (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Title</th>
                <th className="border p-2">Task Detail</th>
                <th className="border p-2">Submission Details</th>
                <th className="border p-2">Workers</th>
                <th className="border p-2">Payable Amount</th>
                <th className="border p-2">Refill Amount</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task._id}>
                  <td className="border p-2">{task.task_title}</td>
                  <td className="border p-2">{task.task_detail}</td>
                  <td className="border p-2">{task.submission_info}</td>
                  <td className="border p-2">{task.required_workers}</td>
                  <td className="border p-2">${task.payable_amount}</td>
                  <td className="border p-2">
                    ${task.requiredWorkers * task.payableAmount}
                  </td>
                  <td className="border p-2">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                      onClick={() => {
                        setIsUpdating(true);
                        setUpdateData(task);
                      }}
                    >
                      Update
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      onClick={() =>
                        handleDelete(task._id, task.isCompleted, task.payableAmount)
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Update Modal */}
      {isUpdating && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-11/12 max-w-md">
            <h3 className="text-xl font-semibold mb-4">Update Task</h3>
            <form onSubmit={handleUpdate}>
              <label className="block mb-2">
                Title:
                <input
                  type="text"
                  className="w-full border p-2 rounded"
                 
                  defaultValue={updateData.task_title}
                  onChange={(e) => setUpdateData({ ...updateData, task_title: e.target.value })}
                />
              </label>
              <label className="block mb-2">
                Task Detail:
                <textarea
                  className="w-full border p-2 rounded"
                  value={updateData.task_detail}
                  onChange={(e) =>
                    setUpdateData({ ...updateData, task_detail: e.target.value })
                  }
                />
              </label>
              <label className="block mb-4">
                Submission Details:
                <textarea
                  className="w-full border p-2 rounded"
                  value={updateData.submission_info}
                  onChange={(e) =>
                    setUpdateData({ ...updateData, submission_info: e.target.value })
                  }
                />
              </label>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-3 py-1 rounded"
                  onClick={() => setIsUpdating(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-3 py-1 rounded"
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyTasks;



