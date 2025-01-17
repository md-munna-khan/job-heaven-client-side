import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
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
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="task-list">
      {tasks.length === 0 ? (
        <p>Loading tasks or no tasks available...</p>
      ) : (
        tasks.map(task => (
          <div key={task.id} className="task-card">
            <h3>{task.title}</h3>
            <p><strong>Details:</strong> {task.detail}</p>
            <p><strong>Workers Required:</strong> {task.workersRequired}</p>
            <p><strong>Payable Amount:</strong> ${task.amount}</p>
            <p><strong>Completion Date:</strong> {new Date(task.completionDate).toLocaleDateString()}</p>
            <p><strong>Submission Info:</strong> {task.submissionInfo}</p>
            {task.imageUrl && <img src={task.imageUrl} alt="Task" style={{ width: '200px' }} />}
            <div className="creator-info">
              <p><strong>Creator:</strong> {task.creator.name}</p>
              <p><strong>Email:</strong> {task.creator.email}</p>
              {task.creator.photo && (
                <img src={task.creator.photo} alt="Creator" style={{ width: '50px', borderRadius: '50%' }} />
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TaskList;
