import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext/AuthContext'; // Import the AuthContext

const MyAttemptedAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const { user, loading } = useContext(AuthContext); // Access user from AuthContext
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAssignments = async () => {
      if (loading || !user) return; // Wait for user to load or if user is not logged in

      try {
        const response = await fetch(`http://localhost:5000/submissions?email=${user.email}`);
        if (!response.ok) {
          throw new Error('Failed to fetch attempted assignments.');
        }
        const data = await response.json();
        const userAssignments = data.filter(assignment => assignment.email === user.email); // Filter assignments by user email
        setAssignments(userAssignments); // Filtered assignments
      } catch (error) {
        console.error('Error fetching assignments:', error);
        alert('No attempted assignments found.');
      }
    };

    fetchAssignments();
  }, [user, loading]); // Dependency on user and loading to refetch assignments when they change

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">My Attempted Assignments</h1>
      {assignments.length === 0 ? (
        <p>No attempted assignments found.</p>
      ) : (
        <table className="table-auto border-collapse border border-gray-400 w-full">
          <thead>
            <tr>
              <th className="border border-gray-400 px-4 py-2">Title</th>
              <th className="border border-gray-400 px-4 py-2">Status</th>
              <th className="border border-gray-400 px-4 py-2">Marks</th>
              <th className="border border-gray-400 px-4 py-2">Obtained Marks</th>
              <th className="border border-gray-400 px-4 py-2">Feedback</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((assignment) => (
              <tr key={assignment._id}>
                <td className="border border-gray-400 px-4 py-2">{assignment.assignmentTitle}</td>
                <td className="border border-gray-400 px-4 py-2">{assignment.status}</td>
                <td className="border border-gray-400 px-4 py-2">{assignment.marks}</td>
                <td className="border border-gray-400 px-4 py-2">{assignment.obtainMarks}</td>
                <td className="border border-gray-400 px-4 py-2">{assignment.feedback}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="flex justify-end mt-4">
        <button
          onClick={() => navigate('/')} // Navigate to dashboard or home
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default MyAttemptedAssignments;
