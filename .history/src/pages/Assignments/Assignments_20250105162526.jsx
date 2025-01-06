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
      <table className="min-w-full table-auto border-collapse border border-gray-400">
        <thead>
          <tr>
            <th className="border border-gray-400 px-4 py-2">Thumbnail</th>
            <th className="border border-gray-400 px-4 py-2">Title</th>
            <th className="border border-gray-400 px-4 py-2">Description</th>
            <th className="border border-gray-400 px-4 py-2">Marks</th>
            <th className="border border-gray-400 px-4 py-2">Difficulty</th>
            <th className="border border-gray-400 px-4 py-2">Due Date</th>
            <th className="border border-gray-400 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((assignment) => (
            <tr key={assignment._id}>
              <td className="border border-gray-400 px-4 py-2 ">
                {assignment.thumbnail && (
                  <img src={assignment.thumbnail} alt="Thumbnail" className="w-16 h-16 object-cover rounded-md" />
                )}
              </td>
              <td className="border border-gray-400 px-4 py-2">{assignment.title}</td>
              <td className="border border-gray-400 px-4 py-2">{assignment.description}</td>
              <td className="border border-gray-400 px-4 py-2">{assignment.marks}</td>
              <td className="border border-gray-400 px-4 py-2">{assignment.difficulty}</td>
              <td className="border border-gray-400 px-4 py-2">
                {new Date(assignment.dueDate).toLocaleDateString()}
              </td>
              <td className="border border-gray-400 px-4 py-2 flex">
                <button
                  onClick={() => handleUpdate(assignment._id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(assignment._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded ml-2"
                >
                  Delete
                </button>
                <button
                  onClick={() => navigate(`/assignments/${assignment._id}`)}
                  className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Assignments;
