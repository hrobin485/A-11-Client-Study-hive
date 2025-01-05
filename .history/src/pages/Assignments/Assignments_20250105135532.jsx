import React, { useEffect, useState } from 'react';

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    fetch('https://api.example.com/assignments')
      .then((response) => response.json())
      .then((data) => setAssignments(data))
      .catch((error) => console.error('Error fetching assignments:', error));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Assignments</h1>
      <div className="space-y-4">
        {assignments.map((assignment) => (
          <div key={assignment._id} className="p-4 border rounded shadow">
            <h2 className="text-xl font-bold">{assignment.title}</h2>
            <p>{assignment.description}</p>
            <p>Marks: {assignment.marks}</p>
            <p>Difficulty: {assignment.difficulty}</p>
            <p>Due Date: {new Date(assignment.dueDate).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Assignments;
