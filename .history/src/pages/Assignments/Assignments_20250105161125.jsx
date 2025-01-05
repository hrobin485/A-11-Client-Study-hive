import React, { useState, useEffect } from 'react';

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await fetch('http://localhost:5000/assignments'); // Fetch data from the backend
        if (!response.ok) {
          throw new Error('Failed to fetch assignments');
        }
        const data = await response.json(); // Parse the JSON data
        setAssignments(data); // Store assignments in state
        setLoading(false); // Set loading to false
      } catch (error) {
        setError(error.message);
        setLoading(false); // Set loading to false
      }
    };

    fetchAssignments();
  }, []); // Empty dependency array runs the effect only once

  if (loading) {
    return <div>Loading assignments...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Assignments</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {assignments.map((assignment) => (
          <div key={assignment._id} className="border border-gray-300 rounded-lg p-4">
            <h2 className="text-xl font-bold">{assignment.title}</h2>
            <p className="text-gray-700">{assignment.description}</p>
            <p className="text-sm">Marks: {assignment.marks}</p>
            <p className="text-sm">Difficulty: {assignment.difficulty}</p>
            <p className="text-sm">Due Date: {new Date(assignment.dueDate).toLocaleDateString()}</p>
            {assignment.thumbnail && (
              <img src={assignment.thumbnail} alt="Thumbnail" className="mt-2 w-full rounded-lg" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Assignments;

