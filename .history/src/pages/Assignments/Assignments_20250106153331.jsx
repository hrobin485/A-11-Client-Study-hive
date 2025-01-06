import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext/AuthContext';

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // For the search input
  const [difficulty, setDifficulty] = useState(''); // For the difficulty filter
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  // Fetch assignments with optional filters
  const fetchAssignments = async () => {
    try {
      setLoading(true);

      // Build query parameters for search and filter
      const queryParams = new URLSearchParams();
      if (difficulty) queryParams.append('difficulty', difficulty);
      if (searchTerm) queryParams.append('search', searchTerm);

      const response = await fetch(`https://server-side-study-hive.vercel.app/assignments?${queryParams}`);
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

  useEffect(() => {
    fetchAssignments();
  }, []); // Fetch assignments initially

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

  const handleSearch = () => {
    fetchAssignments(); // Trigger the search when the button is clicked
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

      {/* Search and Filter Section */}
      <div className="flex justify-items-end mb-4">
        {/* Search Input */}
        <div className='space-x-3'>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by title..."
          className="border border-gray-400 rounded px-4 py-2"
        />
        <button
          onClick={handleSearch} // Trigger search
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Search
        </button>
        </div>
        {/* Difficulty Dropdown */}
       <div className='space-x-3'> 
       <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="border border-gray-400 rounded px-4 py-2"
        >
          <option value="">All Difficulties</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <button
          onClick={fetchAssignments} // Trigger filter
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Filter
        </button>
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
