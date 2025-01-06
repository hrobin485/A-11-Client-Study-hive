import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import AuthContext from '../../context/AuthContext/AuthContext';

const CreateAssignment = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    marks: '',
    thumbnail: '',
    difficulty: 'easy',
    dueDate: new Date(),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setFormData((prevState) => ({
      ...prevState,
      dueDate: date,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('https://server-side-study-hive.vercel.app/assignments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        email: user.email, // Optional: include user email if you need it
      }),
    });

    if (response.ok) {
      alert('Assignment created successfully!');
      navigate('/assignments'); // Redirect to assignments page
    } else {
      alert('Failed to create assignment. Please try again.');
    }
  };

  return (
    <div className="container mx-auto p-4 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-4">Create Assignment</h1>
      <form onSubmit={handleSubmit} className="space-y-4 ">
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-100">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
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
            value={formData.description}
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
            value={formData.marks}
            onChange={handleChange}
            placeholder="Total Marks"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-300"
            required
          />
        </div>

        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700">Thumbnail URL</label>
          <input
            type="url"
            name="thumbnail"
            value={formData.thumbnail}
            onChange={handleChange}
            placeholder="Thumbnail Image URL"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-300"
          />
        </div>

        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700">Difficulty</label>
          <select
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-300"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700">Due Date</label>
          <DatePicker
            selected={formData.dueDate}
            onChange={handleDateChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-300"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Create Assignment
        </button>
      </form>
    </div>
  );
};

export default CreateAssignment;
