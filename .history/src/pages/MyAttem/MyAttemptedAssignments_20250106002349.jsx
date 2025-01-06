import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MyAttemptedAssignments = ({ userEmail }) => {
  const [assignments, setAssignments] = useState([]);
  const navigate = useNavigate();

  const fetchAssignments = async () => {
    try {
      const response = await fetch(`https://server-side-study-hive.vercel.app/attempted-assignments?email=${userEmail}`);
      if (!response.ok) {
        throw new Error(await response.text());
      }
      const data = await response.json();
      setAssignments(data); // Set assignments in state
    } catch (error) {
      console.error('Error fetching assignments:', error);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, [userEmail]); // Dependency on userEmail to trigger re-fetch when user changes

  if (assignments.length === 0) {
    return <p>No attempted assignments found.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">My Attempted Assignments</h1>
      <table className="table-auto w-full border-collapse border border-gray-400">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Title</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
            <th className="border border-gray-300 px-4 py-2">Marks</th>
            <th className="border border-gray-300 px-4 py-2">Obtained Marks</th>
            <th className="border border-gray-300 px-4 py-2">Feedback</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((assignment, index) => (
            <tr key={assignment._id}>
              <td className="border border-gray-300 px-4 py-2">{assignment.assignmentTitle}</td>
              <td className="border border-gray-300 px-4 py-2">{assignment.status}</td>
              <td className="border border-gray-300 px-4 py-2">{assignment.marks}</td>
              <td className="border border-gray-300 px-4 py-2">{assignment.obtainMarks}</td>
              <td className="border border-gray-300 px-4 py-2">{assignment.feedback}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyAttemptedAssignments;
