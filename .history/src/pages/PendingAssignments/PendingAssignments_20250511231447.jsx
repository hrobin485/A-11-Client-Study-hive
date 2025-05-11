import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext/AuthContext';
import Swal from 'sweetalert2';


const PendingAssignments = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext); // Get current user
  const navigate = useNavigate();

const isDarkMode = () => document.documentElement.classList.contains('dark');

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await fetch('https://server-side-study-hive.vercel.app/submissions');
        if (!response.ok) {
          throw new Error('Failed to fetch submissions.');
        }
        const data = await response.json();
        const pendingSubmissions = data.filter(sub => sub.status === 'pending');
        setSubmissions(pendingSubmissions);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  const handleGiveMark = (submissionId, email) => {
    if (user && user.email === email) {
      Swal.fire({
        title: 'Not Allowed',
        text: 'You cannot give marks for your own assignment.',
        icon: 'warning',
        background: isDarkMode() ? '#1f2937' : '#fff',
        color: isDarkMode() ? '#f3f4f6' : '#000',
      });
    } else {
      navigate(`/give-mark/${submissionId}`);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[200px] dark:text-gray-100">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        <p className="mt-4 text-lg">Loading pending assignments...</p>
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
    <div className="container mx-auto p-4 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-4">Pending Assignments</h1>
     <div className='overflow-y-auto max-w-full'>
       <table className="min-w-full table-auto border-collapse border border-gray-400">
        <thead>
          <tr>
            <th className="border border-gray-400 px-4 py-2">Assignment Title</th>
            <th className="border border-gray-400 px-4 py-2">Marks</th>
            <th className="border border-gray-400 px-4 py-2">Examinee</th>
            <th className="border border-gray-400 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((submission) => (
            <tr key={submission._id}>
              <td className="border border-gray-400 px-4 py-2">{submission.assignmentTitle}</td>
              <td className="border border-gray-400 px-4 py-2">{submission.marks}</td>
              <td className="border border-gray-400 px-4 py-2">{submission.email}</td>
              <td className="border border-gray-400 px-4 py-2">
                  <button
                    onClick={() => handleGiveMark(submission._id, submission.email)}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Give Mark
                  </button>
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
     </div>
    </div>
  );
};

export default PendingAssignments;
