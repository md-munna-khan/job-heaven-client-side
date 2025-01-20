


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import LoadingSpinner from '../../../assets/shared/LoadingSpinner';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Function to fetch tasks from the backend
  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/Tasks`, {
        withCredentials: true, // For authenticated requests
      });
      const tasks = response.data;

      // Format the tasks
      const formattedTasks = tasks.map(task => ({
        id: task._id,
        title: task.task_title,
        detail: task.task_detail,
        workersRequired: task.required_workers,
        amount: task.payable_amount,
        completionDate: task.completion_date,
        submissionInfo: task.submission_info,
        imageUrl: task.task_image_url,
        creator: {
          email: task.creator?.email || 'N/A',
          name: task.creator?.name || 'Anonymous',
          photo: task.creator?.photo || '',
        },
      }));

      setTasks(formattedTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Refetch tasks whenever the component mounts or data changes
  useEffect(() => {
    fetchTasks();
  }, []);

  // Simulate updating balance or task changes
  const handleUpdateTask = async (taskId) => {
    try {
      // Simulated API call to update task (replace this with your update logic)
      await axios.patch(`${import.meta.env.VITE_API_URL}/Tasks/${taskId}`, {
        updatedField: 'exampleUpdate',
      });

      // Refetch tasks after update
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <div className="task-list p-6">
      <h1 className="text-3xl text-center mb-4 font-bold">Task List</h1>
      {isLoading ? (
       <LoadingSpinner></LoadingSpinner>
      ) : tasks.length === 0 ? (
        <p className="text-center">No tasks available...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map(task => (
            <div  key={task.id} className="card shadow-lg bg-white">
              <figure>
                {task.imageUrl && (
                  <img
                    src={task.imageUrl}
                    alt="Task"
                    className="w-full h-48 object-cover"
                  />
                )}
              </figure>
              <div className="card-body">
                <h3 className="card-title text-lg font-semibold">{task.title}</h3>
                <p><strong>Details:</strong> {task.detail}</p>
                <p><strong>Workers Required:</strong> {task.workersRequired}</p>
                <p><strong>Payable Amount:</strong> ${task.amount}</p>
                <p><strong>Completion Date:</strong> {new Date(task.completionDate).toLocaleDateString()}</p>
                <p><strong>Submission Info:</strong> {task.submissionInfo}</p>
                <div className="mt-4">
                  <p><strong>Creator:</strong> {task.creator.name}</p>
                  <p><strong>Email:</strong> {task.creator.email}</p>
                  {task.creator.photo && (
                    <img
                      src={task.creator.photo}
                      alt="Creator"
                      className="w-12 h-12 rounded-full mt-2"
                    />
                  )}
                </div>
                <div className="card-actions justify-end mt-4">
                {/* <Link to='/dashboard/task-details'> */}
                <Link to={`/dashboard/task-details/${task.id}`}>
                 <button
                    className="p-2 bg-green-400 items-center w-full justify-center text-center btn-primary"
                    // onClick={() => handleUpdateTask(task.id)}
                  >
                    Details Task
                  </button>
                 </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
