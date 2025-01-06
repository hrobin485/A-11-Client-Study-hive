import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext/AuthContext';

const UpdateAssignment = () => {
  const { id } = useParams(); // Get assignment ID from URL
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); // Get current logged-in user
  const [assignment, setAssignment] = useState({
    title: '',
    description: '',
    marks: '',
    thumbnail: '',
    difficulty: 'easy',
    dueDate: new Date(),
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        const response = await fetch(`https://server-side-study-hive.vercel.app/assignments/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch assignment.');
        }
        const data = await response.json();
        setAssignment(data); // Set fetched assignment data
      } catch (error) {
        setError(error.message);
      }
    };

    fetchAssignment();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAssignment((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setAssignment((prevState) => ({
      ...prevState,
      dueDate: date,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (assignment.email !== user.email) {
      alert('You can only update your own assignments.');
      return;
    }

    try {
      const response = await fetch(`https://server-side-study-hive.vercel.app/assignments/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(assignment),
      });

      if (response.ok) {
        alert('Assignment updated successfully!');
        navigate('/assignments'); // Redirect to assignments page
      } else {
        const errorMsg = await response.json(); // Get error message from server
        alert(`Failed to update assignment: ${errorMsg}`);
      }
    } catch (error) {
      alert('Error: Failed to update the assignment.');
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Update Assignment</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={assignment.title}
            onChange={handleChange}
            placeholder="Assignment Title"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-300"
            required
          />
        </div>

        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={assignment.description}
            onChange={handleChange}
            placeholder="Assignment Description"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-300"
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700">Marks</label>
          <input
            type="number"
            name="marks"
            value={assignment.marks}
            onChange={handleChange}
            placeholder="Marks"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-300"
            required
          />
        </div>

        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700">Difficulty</label>
          <select
            name="difficulty"
            value={assignment.difficulty}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-300"
            required
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700">Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={new Date(assignment.dueDate).toISOString().substr(0, 10)}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-300"
            required
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Update Assignment
        </button>
      </form>
    </div>
  );
};

export default UpdateAssignment;
