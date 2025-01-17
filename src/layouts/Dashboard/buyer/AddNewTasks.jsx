
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { imageUpload } from "../../../api/utils";

const AddNewTask = () => {
  const axiosSecure = useAxiosSecure();
  const { getUserRole, coin, setCoin, user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const taskTitle = form.task_title.value.trim();
    const taskDetail = form.task_detail.value.trim();
    const requiredWorkers = parseInt(form.required_workers.value.trim(), 10);
    const payableAmount = parseFloat(form.payable_amount.value.trim());
    const completionDate = form.completion_date.value.trim();
    const submissionInfo = form.submission_info.value.trim();
    const imageFile = form.task_image.files[0];

    // Validate input fields
    if (
      !taskTitle ||
      !taskDetail ||
      !requiredWorkers ||
      !payableAmount ||
      !completionDate ||
      !submissionInfo ||
      !imageFile
    ) {
      toast.error("All fields are required.");
      return;
    }

    if (requiredWorkers <= 0 || payableAmount <= 0) {
      toast.error("Workers and payable amount must be greater than zero.");
      return;
    }

    // Calculate total payable amount
    const totalPayableAmount = requiredWorkers * payableAmount;

    if (totalPayableAmount > coin) {
      toast.error(
        `You need ${totalPayableAmount} coins, but you only have ${coin} coins. Please purchase more coins.`
      );
      navigate("/dashboard/purchase-coin");
      return;
    }

    try {
      // Upload the image
      const taskImageUrl = await imageUpload(imageFile);
      if (!taskImageUrl) {
        throw new Error("Failed to upload image.");
      }

      // Prepare the task data
      const formData = {
        task_title: taskTitle,
        task_detail: taskDetail,
        required_workers: requiredWorkers,
        payable_amount: payableAmount,
        completion_date: completionDate,
        submission_info: submissionInfo,
        task_image_url: taskImageUrl,
        creator: {
          email: user?.email,
          name: user?.displayName || "Unknown User",
          photo: user?.photoURL || "",
        },
      };

      // Submit to the backend
      const { data } = await axiosSecure.post("/Tasks", formData);

      if (data?.acknowledged) {
        // Deduct coins and update balance
        const updatedCoins = coin - totalPayableAmount;
        const coinResponse = await axiosSecure.put(`/users/coins/${user.email}`, {
          coinAmount: updatedCoins,
        });

        if (coinResponse.data?.message === "Coin balance updated successfully") {
          setCoin(updatedCoins);
          toast.success("Task added and balance updated successfully!");
        
          form.reset();
        } else {
          toast.error("Task added, but failed to update coin balance.");
        }
      } else {
        toast.error("Failed to add task.");
      }
      
    } catch (error) {
      toast.error("An error occurred while adding the task.");
      console.error("Error:", error.message || error.response?.data);
    }
  };

  return (
    <div className="flex justify-center py-4 items-center min-h-[calc(100vh-306px)] my-12">
      <section className="p-6 mx-auto bg-white rounded-md shadow-md w-full max-w-4xl">
        <h2 className="text-xl font-semibold text-gray-700 capitalize">Post a Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 mt-4 md:grid-cols-2">
            <div>
              <label className="text-gray-700" htmlFor="task_image">
                Upload Task Image
              </label>
              <input
                id="task_image"
                name="task_image"
                type="file"
                accept="image/*"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="text-gray-700" htmlFor="task_title">
                Task Title
              </label>
              <input
                id="task_title"
                name="task_title"
                type="text"
                placeholder="Task Title"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="text-gray-700" htmlFor="task_detail">
                Task Detail
              </label>
              <textarea
                id="task_detail"
                name="task_detail"
                placeholder="Task Detail"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md"
              ></textarea>
            </div>
            <div>
              <label className="text-gray-700" htmlFor="required_workers">
                Required Workers
              </label>
              <input
                id="required_workers"
                name="required_workers"
                type="number"
                placeholder="Number of Workers"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="text-gray-700" htmlFor="payable_amount">
                Payable Amount (per worker)
              </label>
              <input
                id="payable_amount"
                name="payable_amount"
                type="number"
                placeholder="Payable Amount"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="text-gray-700" htmlFor="completion_date">
                Completion Date
              </label>
              <input
                id="completion_date"
                name="completion_date"
                type="date"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="text-gray-700" htmlFor="submission_info">
                Submission Info
              </label>
              <input
                id="submission_info"
                name="submission_info"
                type="text"
                placeholder="Submission Info"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="w-full px-6 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-500"
            >
              Add Task
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddNewTask;
