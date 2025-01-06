import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await fetch('https://server-side-study-hive.vercel.app/assignments');
        if (!response.ok) {
          throw new Error('Failed to fetch assignments');
        }
        const data = await response.json();
        setAssignments(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this assignment?');
    if (confirmDelete) {
      try {
        const response = await fetch(`https://server-side-study-hive.vercel.app/assignments/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setAssignments(assignments.filter((assignment) => assignment._id !== id));
          alert('Assignment deleted successfully!');
        } else {
          throw new Error('Failed to delete the assignment');
        }
      } catch (error) {
        alert('Error: Failed to delete the assignment');
      }
    }
  };

  const handleUpdate = (id) => {
    navigate(`/update-assignment/${id}`);
  };

  if (loading) {
    return <div>Loading assignments...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Assignments</h1>
      <div className="flex flex-wrap -mx-4">
        {assignments.map((assignment) => (
          <div key={assignment._id} className="w-full md:w-1/3 px-4 mb-4">
            <div className="border border-gray-300 rounded-lg p-4">
              <h2 className="text-xl font-bold">{assignment.title}</h2>
              <p className="text-gray-700">{assignment.description}</p>
              <p className="text-sm">Marks: {assignment.marks}</p>
              <p className="text-sm">Difficulty: {assignment.difficulty}</p>
              <p className="text-sm">Due Date: {new Date(assignment.dueDate).toLocaleDateString()}</p>
              {assignment.thumbnail && (
                <img src={assignment.thumbnail} alt="Thumbnail" className="mt-2 w-full rounded-lg" />
              )}
              <div className="mt-4 flex space-x-2">
                <button
                  onClick={() => handleUpdate(assignment._id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(assignment._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
                <button
                  onClick={() => navigate(`/assignments/${assignment._id}`)}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Assignments;
