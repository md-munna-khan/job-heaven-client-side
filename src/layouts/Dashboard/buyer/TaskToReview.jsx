


import { useEffect, useState } from 'react';
import axios from 'axios';
import { Dialog } from '@headlessui/react';
import useAuth from '../../../hooks/useAuth';


const TaskToReview = () => {
  const { user } = useAuth();
  const [submissions, setSubmissions] = useState([]);
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  const [flag, setFlag] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [taskIdToReject, setTaskIdToReject] = useState(null);
  const [submissionIdToApprove, setSubmissionIdToApprove] = useState(null);

  // Fetch pending submissions
  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/tasks/buyer/${user?.email}`);
        setSubmissions(response.data);
      } catch (error) {
        console.error('Error fetching submissions:', error);
      }
    };

    fetchSubmissions();
  }, [flag, user?.email]);

  // Handle Approve action
  const handleApprove = async () => {
    try {
      console.log('Approving Submission:', submissionIdToApprove);
      await axios.put(`${import.meta.env.VITE_API_URL}/submissions/approve/${submissionIdToApprove}`);
      setFlag(!flag);
      setShowApproveModal(false);
    } catch (error) {
      console.error('Error approving submission:', error);
    }
  };

  // Handle Reject action
  const handleReject = async (id) => {
    try {
      console.log('Rejecting Submission:', selectedSubmission?._id);
      console.log('Increasing workers for task:', taskIdToReject);
      await axios.put(`${import.meta.env.VITE_API_URL}/submissions/reject/${id}`);
      // await axios.put(`${import.meta.env.VITE_API_URL}/tasks/increase-workers/${taskIdToReject}`);
    
      setFlag(!flag);
      setShowRejectModal(false);
    } catch (error) {
      console.error('Error rejecting submission:', error);
    }
  };

  return (
    <div className='container mx-auto px-4 sm:px-8'>
      <h2 className='my-4 text-3xl font-bold text-center text-gray-800'>Task Submissions to Review</h2>

      <div className='py-6'>
        <div className='overflow-x-auto'>
          <table className='min-w-full bg-white rounded-lg shadow'>
            <thead>
              <tr className='bg-blue-500 text-white'>
                <th className='px-5 py-3 text-left text-sm font-semibold'>Worker Name</th>
                <th className='px-5 py-3 text-left text-sm font-semibold'>Task Title</th>
                <th className='px-5 py-3 text-left text-sm font-semibold'>Payable Amount</th>
                <th className='px-5 py-3 text-left text-sm font-semibold'>Status</th>
                <th className='px-5 py-3 text-left text-sm font-semibold'>Action</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((submission) => (
                <tr key={submission._id} className='hover:bg-gray-100'>
                  <td className='px-5 py-4 border-b'>{submission.worker_name}</td>
                  <td className='px-5 py-4 border-b'>{submission.task_title}</td>
                  <td className='px-5 py-4 border-b'>{submission.payable_amount}</td>
                  <td className='px-5 py-4 border-b'>
                    <span
                      className={`px-3 py-1 rounded-full text-white ${
                        submission.status === 'approved' ? 'bg-green-500' : 'bg-yellow-500'
                      }`}
                    >
                      {submission.status}
                    </span>
                  </td>
                  <td className='px-5 py-4 border-b'>
                    <button
                      onClick={() => {
                        setSubmissionIdToApprove(submission._id);
                        setShowApproveModal(true);
                      }}
                      className='px-4 py-2 text-sm font-medium text-white bg-green-500 rounded hover:bg-green-600'
                    >
                      Approve
                    </button>
                    <button
                      onClick={()=>handleReject(submission._id)}
                      className='px-4 py-2 ml-2 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600'
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Approve Modal */}
      <Dialog
        open={showApproveModal}
        onClose={() => setShowApproveModal(false)}
        className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'
      >
        <Dialog.Panel className='bg-white p-6 rounded-lg shadow-lg max-w-md w-full'>
          <Dialog.Title className='text-xl font-semibold text-center'>Approve Submission</Dialog.Title>
          <Dialog.Description className='mt-4 text-center'>
            Are you sure you want to approve this submission?
          </Dialog.Description>
          <div className='mt-6 flex justify-center space-x-4'>
            <button onClick={handleApprove} className='px-6 py-2 text-sm text-white bg-green-500 rounded hover:bg-green-600'>
              Confirm
            </button>
            <button
              onClick={() => setShowApproveModal(false)}
              className='px-6 py-2 text-sm text-white bg-gray-500 rounded hover:bg-gray-600'
            >
              Cancel
            </button>
          </div>
        </Dialog.Panel>
      </Dialog>

      {/* Reject Modal */}
      <Dialog
        open={showRejectModal}
        onClose={() => setShowRejectModal(false)}
        className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'
      >
        <Dialog.Panel className='bg-white p-6 rounded-lg shadow-lg max-w-md w-full'>
          <Dialog.Title className='text-xl font-semibold text-center'>Reject Submission</Dialog.Title>
          <Dialog.Description className='mt-4 text-center'>
            Are you sure you want to reject this submission?
          </Dialog.Description>
          <div className='mt-6 flex justify-center space-x-4'>
            <button onClick={handleReject} className='px-6 py-2 text-sm text-white bg-red-500 rounded hover:bg-red-600'>
              Confirm
            </button>
            <button
              onClick={() => setShowRejectModal(false)}
              className='px-6 py-2 text-sm text-white bg-gray-500 rounded hover:bg-gray-600'
            >
              Cancel
            </button>
          </div>
        </Dialog.Panel>
      </Dialog>
    </div>
  );
};

export default TaskToReview;

