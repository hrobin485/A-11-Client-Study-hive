import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext/AuthContext';

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext); // Accessing user from AuthContext
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await fetch('http://localhost:5000/assignments');
        if (!response.ok) throw new Error('Failed to fetch assignments');
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
        const response = await fetch(`http://localhost:5000/assignments/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userEmail: user.email }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          alert(`Failed to delete assignment: ${errorData}`);
        } else {
          setAssignments(assignments.filter((assignment) => assignment._id !== id));
          alert('Assignment deleted successfully!');
        }
      } catch (error) {
        alert('Error: Failed to delete the assignment.');
      }
    }
  };

  if (loading) return <div>Loading assignments...</div>;
  if (error) return <div>Error: {error}</div>;

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
              <td className="border border-gray-400 px-4 py-2">
                {assignment.thumbnail && <img src={assignment.thumbnail} alt="Thumbnail" className="w-16 h-16 object-cover" />}
              </td>
              <td className="border border-gray-400 px-4 py-2">{assignment.title}</td>
              <td className="border border-gray-400 px-4 py-2">{assignment.description}</td>
              <td className="border border-gray-400 px-4 py-2">{assignment.marks}</td>
              <td className="border border-gray-400 px-4 py-2">{assignment.difficulty}</td>
              <td className="border border-gray-400 px-4 py-2">{new Date(assignment.dueDate).toLocaleDateString()}</td>
              <td className="border border-gray-400 px-4 py-2">
                <button onClick={() => handleDelete(assignment._id)} className="bg-red-500 text-white px-4 py-2 rounded ml-2">
                  Delete
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
