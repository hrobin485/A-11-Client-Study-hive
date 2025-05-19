import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext/AuthContext';
import Swal from 'sweetalert2';

const AssignmentDetails = () => {
  const { id } = useParams(); // Get assignment ID from URL
  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false); // Modal state
  const [submission, setSubmission] = useState({ googleDocsLink: '', notes: '' });
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); // Get current user

 const isDarkMode = () => document.documentElement.classList.contains('dark');

  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        const response = await fetch(`https://server-side-study-hive.vercel.app/assignments/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch assignment details.');
        }
        const data = await response.json();
        setAssignment(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchAssignment();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!submission.googleDocsLink || !submission.notes) {
      Swal.fire({
        title: 'Required Fields Missing',
        text: 'Google Docs Link and Notes are required.',
        icon: 'warning',
        background: isDarkMode() ? '#1f2937' : '#fff',
        color: isDarkMode() ? '#f3f4f6' : '#000',
      });
      return;
    }

    try {
      const response = await fetch('https://server-side-study-hive.vercel.app/submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          assignmentId: id,
          assignmentTitle: assignment.title,
          googleDocsLink: submission.googleDocsLink,
          notes: submission.notes,
          email: user.email,
          status: 'pending',
        }),
      });

      if (response.ok) {
        Swal.fire({
          title: 'Success',
          text: 'Assignment submitted successfully!',
          icon: 'success',
          background: isDarkMode() ? '#1f2937' : '#fff',
          color: isDarkMode() ? '#f3f4f6' : '#000',
        });
        setShowModal(false);
        navigate('/Assignments'); 
      } else {
        const errorMsg = await response.text();
        Swal.fire({
          title: 'Submission Failed',
          text: errorMsg,
          icon: 'error',
          background: isDarkMode() ? '#1f2937' : '#fff',
          color: isDarkMode() ? '#f3f4f6' : '#000',
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Failed to submit assignment.',
        icon: 'error',
        background: isDarkMode() ? '#1f2937' : '#fff',
        color: isDarkMode() ? '#f3f4f6' : '#000',
      });
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[200px] dark:text-gray-100">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        <p className="mt-4 text-lg">Loading assignments details...</p>
      </div>
    );
  }

  if (error) {
    Swal.fire({
      title: 'Error',
      text: error,
      icon: 'error',
      background: isDarkMode() ? '#1f2937' : '#fff',
      color: isDarkMode() ? '#f3f4f6' : '#000',
    });
    return <div className='dark:text-gray-100'>Error occurred.</div>;
  }

  return (
    <div className="container my-5 mx-auto p-4 dark:bg-gray-800 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-4">Assignment Details</h1>
      <div className="bg-white shadow-md rounded p-4  dark:bg-gray-800 dark:text-gray-100">
        <h2 className="text-2xl font-bold">{assignment.title}</h2>
        <p className="mt-2">{assignment.description}</p>
        <p className="mt-2 font-semibold">Marks: {assignment.marks}</p>
        <p className="mt-2 font-semibold">Difficulty: {assignment.difficulty}</p>
        <p className="mt-2 font-semibold">Due Date: {new Date(assignment.dueDate).toLocaleDateString()}</p>
      </div>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded mt-4"
        onClick={() => setShowModal(true)}
      >
        Take Assignment
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
          <div className="bg-white rounded p-6 w-full max-w-md  dark:bg-gray-800 dark:text-gray-100">
            <h2 className="text-xl font-bold mb-4">Submit Assignment</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block font-semibold">Google Docs Link:</label>
                <input
                  type="url"
                  className="w-full border rounded px-2 py-1 dark:text-black"
                  value={submission.googleDocsLink}
                  onChange={(e) => setSubmission({ ...submission, googleDocsLink: e.target.value })}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block font-semibold">Quick Notes:</label>
                <textarea
                  className="w-full border rounded px-2 py-1 dark:text-black"
                  value={submission.notes}
                  onChange={(e) => setSubmission({ ...submission, notes: e.target.value })}
                  rows="4"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignmentDetails;
