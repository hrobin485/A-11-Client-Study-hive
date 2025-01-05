import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext/AuthContext';

const PendingAssignments = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext); // Get current user
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await fetch('http://localhost:5000/submissions');
        if (!response.ok) {
          throw new Error('Failed to fetch submissions.');
        }
        const data = await response.json();
        setSubmissions(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  const handleGiveMark = (submissionId) => {
    // Navigate to the "Give Mark" page with submissionId
    navigate(`/give-mark/${submissionId}`);
  };

  if (loading) {
    return <div>Loading pending assignments...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Pending Assignments</h1>
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
                  onClick={() => handleGiveMark(submission._id)}
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
  );
};

export default PendingAssignments;
