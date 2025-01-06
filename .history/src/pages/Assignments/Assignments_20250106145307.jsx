import React, { useState, useEffect, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext/AuthContext';

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [difficultyFilter, setDifficultyFilter] = useState(''); // Filter for difficulty level
  const [searchQuery, setSearchQuery] = useState(''); // Search query
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); // Get current logged-in user

  // Fetch assignments from the API
  const fetchAssignments = async (filter = '', query = '') => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://server-side-study-hive.vercel.app/assignments?difficulty=${filter}&search=${query}`
      );
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

  // Fetch assignments on component mount and whenever filter or search changes
  useEffect(() => {
    fetchAssignments(difficultyFilter, searchQuery);
  }, [difficultyFilter, searchQuery]);

  const handleDelete = async (id) => {
    const assignmentToDelete = assignments.find((assignment) => assignment._id === id);

    if (!assignmentToDelete) {
      alert('Assignment not found!');
      return;
    }

    if (assignmentToDelete.email !== user.email) {
      alert('You can only delete your own assignments.');
      return;
    }

    const confirmDelete = window.confirm('Are you sure you want to delete this assignment?');
    if (confirmDelete) {
      try {
        const response = await fetch(`https://server-side-study-hive.vercel.app/assignments/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userEmail: user.email }),
        });

        if (response.ok) {
          setAssignments(assignments.filter((assignment) => assignment._id !== id));
          alert('Assignment deleted successfully!');
        } else {
          const errorMsg = await response.json();
          alert(`Failed to delete assignment: ${errorMsg}`);
        }
      } catch (error) {
        alert('Error: Failed to delete the assignment.');
      }
    }
  };

  const handleUpdate = (id) => {
    navigate(`/UpdateAssignment/${id}`);
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

      {/* Filter and Search Section */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <label className="mr-2 font-semibold">Filter by Difficulty:</label>
          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1"
          >
            <option value="">All</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <div>
          <input
            type="text"
            placeholder="Search by title"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2"
          />
        </div>
      </div>

      {/* Assignments Table */}
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
              <td className="border border-gray-400 px-4 py-2">
                {assignment.thumbnail && (
                  <img src={assignment.thumbnail} alt="Thumbnail" className="rounded-lg object-cover" />
                )}
              </td>
              <td className="border border-gray-400 px-4 py-2">{assignment.title}</td>
              <td className="border border-gray-400 px-4 py-2">{assignment.description}</td>
              <td className="border border-gray-400 px-4 py-2">{assignment.marks}</td>
              <td className="border border-gray-400 px-4 py-2">{assignment.difficulty}</td>
              <td className="border border-gray-400 px-4 py-2">
                {new Date(assignment.dueDate).toLocaleDateString()}
              </td>
              <td className="border border-gray-400 px-4 py-2 space-y-2">
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
                  onClick={() => navigate(`/assignment/${assignment._id}`)}
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
