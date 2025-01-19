


import { useEffect, useState } from 'react';
import axios from 'axios';
import { Dialog } from '@headlessui/react';  // Import Dialog from Headless UI
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
      await axios.put(`${import.meta.env.VITE_API_URL}/submissions/approve/${submissionIdToApprove}`);
      setFlag(!flag);
      setShowApproveModal(false);
    } catch (error) {
      console.error('Error approving submission:', error);
    }
  };

  // Handle Reject action
  const handleReject = async () => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/submissions/reject/${selectedSubmission._id}`);
      await axios.put(`${import.meta.env.VITE_API_URL}/tasks/increase-workers/${taskIdToReject}`);
      setFlag(!flag);
      setShowRejectModal(false);
    } catch (error) {
      console.error('Error rejecting submission:', error);
    }
  };

  return (
    <div className='container mx-auto px-4 sm:px-8'>
      <h2 className='my-4 text-2xl font-semibold text-center text-gray-800'>Task Submissions to Review</h2>

      <div className='py-8'>
        <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
          <div className='inline-block min-w-full bg-white shadow-lg rounded-lg overflow-hidden'>
            <div className='overflow-x-auto'>
              <table className='min-w-full leading-normal'>
                <thead>
                  <tr>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-gray-100 border-b border-gray-200 text-gray-800 text-left text-sm font-semibold uppercase'
                    >
                      Worker Name
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-gray-100 border-b border-gray-200 text-gray-800 text-left text-sm font-semibold uppercase'
                    >
                      Task Title
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-gray-100 border-b border-gray-200 text-gray-800 text-left text-sm font-semibold uppercase'
                    >
                      Payable Amount
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-gray-100 border-b border-gray-200 text-gray-800 text-left text-sm font-semibold uppercase'
                    >
                      Status
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-gray-100 border-b border-gray-200 text-gray-800 text-left text-sm font-semibold uppercase'
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map((submission) => (
                    <tr key={submission._id} className='hover:bg-gray-50'>
                      <td className='px-5 py-3 border-b border-gray-200'>{submission.worker_name}</td>
                      <td className='px-5 py-3 border-b border-gray-200'>{submission.task_title}</td>
                      <td className='px-5 py-3 border-b border-gray-200'>{submission.payable_amount}</td>
                      <td className='px-5 py-3 border-b border-gray-200'>
                        <span
                          className={`badge ${
                            submission.status === 'approved' ? 'bg-green-500' : 'bg-yellow-500'
                          } text-white`}
                        >
                          {submission.status}
                        </span>
                      </td>
                      <td className='px-5 py-3 border-b border-gray-200'>
                        <button
                          onClick={() => {
                            setSubmissionIdToApprove(submission._id);
                            setShowApproveModal(true);
                          }}
                          className='btn btn-success mr-2'
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => {
                            setSelectedSubmission(submission);
                            setTaskIdToReject(submission.task_id);
                            setShowRejectModal(true);
                          }}
                          className='btn btn-danger'
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
        </div>
      </div>

      {/* Approve Modal using Headless UI Dialog */}
      <Dialog open={showApproveModal} onClose={() => setShowApproveModal(false)} className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
        <Dialog.Panel className="bg-white p-8 rounded-lg shadow-xl max-w-sm w-full">
          <Dialog.Title className="text-xl font-semibold text-center">Approve Submission</Dialog.Title>
          <Dialog.Description className="mt-4 text-center">
            Are you sure you want to approve this submission?
          </Dialog.Description>
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleApprove}
              className="btn btn-success mr-2"
            >
              Confirm
            </button>
            <button
              onClick={() => setShowApproveModal(false)}
              className="btn btn-secondary"
            >
              Cancel
            </button>
          </div>
        </Dialog.Panel>
      </Dialog>

      {/* Reject Modal using Headless UI Dialog */}
      <Dialog open={showRejectModal} onClose={() => setShowRejectModal(false)} className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
        <Dialog.Panel className="bg-white p-8 rounded-lg shadow-xl max-w-sm w-full">
          <Dialog.Title className="text-xl font-semibold text-center">Reject Submission</Dialog.Title>
          <Dialog.Description className="mt-4 text-center">
            Are you sure you want to reject this submission?
          </Dialog.Description>
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleReject}
              className="btn btn-danger mr-2"
            >
              Confirm
            </button>
            <button
              onClick={() => setShowRejectModal(false)}
              className="btn btn-secondary"
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
