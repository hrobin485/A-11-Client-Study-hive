import React, { useEffect, useState } from 'react';

const MyAttemptedAssignments = ({ userEmail }) => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await fetch(`http://localhost:5000/my-attempted-assignments?email=${userEmail}`);
        if (!response.ok) {
          throw new Error('Failed to fetch assignments.');
        }
        const data = await response.json();
        setAssignments(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, [userEmail]);

  if (loading) {
    return <div>Loading your attempted assignments...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (assignments.length === 0) {
    return <div>No attempted assignments found.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Attempted Assignments</h1>
      <table className="min-w-full border-collapse border border-gray-300">
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
          {assignments.map((assignment) => (
            <tr key={assignment._id}>
              <td className="border border-gray-300 px-4 py-2">{assignment.assignmentTitle}</td>
              <td className="border border-gray-300 px-4 py-2">{assignment.status || 'Pending'}</td>
              <td className="border border-gray-300 px-4 py-2">{assignment.marks || 'N/A'}</td>
              <td className="border border-gray-300 px-4 py-2">{assignment.obtainMarks || 'N/A'}</td>
              <td className="border border-gray-300 px-4 py-2">{assignment.feedback || 'No Feedback'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyAttemptedAssignments;
