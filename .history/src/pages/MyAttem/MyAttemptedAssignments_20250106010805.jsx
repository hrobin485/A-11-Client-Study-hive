import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MyAttemptedAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAssignments = async () => {
      const userEmail = "hrobin485@gmail.com"; // Replace with your logic to get logged-in user email
      
      try {
        const response = await fetch(`https://server-side-study-hive.vercel.app/submissions?email=${userEmail}`);
        if (!response.ok) {
          throw new Error('Failed to fetch attempted assignments.');
        }
        const data = await response.json();

        // Filter assignments based on user email
        const userAssignments = data.filter(assignment => assignment.email === userEmail);
        
        setAssignments(userAssignments); // Update state with filtered assignments
      } catch (error) {
        console.error('Error fetching assignments:', error);
        alert('No attempted assignments found.');
      }
    };

    fetchAssignments();
  }, []); // No dependencies

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
