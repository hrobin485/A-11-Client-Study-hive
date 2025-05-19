import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext/AuthContext';
import Swal from 'sweetalert2';

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const isDarkMode = () => document.documentElement.classList.contains('dark');

  const fetchAssignments = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();
      if (difficulty) queryParams.append('difficulty', difficulty);
      if (searchTerm) queryParams.append('search', searchTerm);

      const response = await fetch(`https://server-side-study-hive.vercel.app/assignments?${queryParams}`);
      if (!response.ok) throw new Error('Failed to fetch assignments');

      const data = await response.json();
      setAssignments(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message,
        background: isDarkMode() ? '#1f2937' : '#fff',
        color: isDarkMode() ? '#f3f4f6' : '#000',
      });
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  const handleDelete = async (id) => {
    const assignmentToDelete = assignments.find((assignment) => assignment._id === id);

    if (!assignmentToDelete) {
      Swal.fire({
        title: 'Error',
        text: 'Assignment not found!',
        icon: 'error',
        background: isDarkMode() ? '#1f2937' : '#fff',
        color: isDarkMode() ? '#f3f4f6' : '#000',
      });
      return;
    }

    if (assignmentToDelete.email !== user.email) {
      Swal.fire({
        title: 'Unauthorized',
        text: 'You can only delete your own assignments.',
        icon: 'warning',
        background: isDarkMode() ? '#1f2937' : '#fff',
        color: isDarkMode() ? '#f3f4f6' : '#000',
      });
      return;
    }

    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this assignment!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      background: isDarkMode() ? '#1f2937' : '#fff',
      color: isDarkMode() ? '#f3f4f6' : '#000',
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`https://server-side-study-hive.vercel.app/assignments/${id}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userEmail: user.email }),
        });

        if (response.ok) {
          setAssignments(assignments.filter((a) => a._id !== id));
          Swal.fire({
            title: 'Deleted!',
            text: 'Assignment has been deleted.',
            icon: 'success',
            background: isDarkMode() ? '#1f2937' : '#fff',
            color: isDarkMode() ? '#f3f4f6' : '#000',
          });
        } else {
          const errorMsg = await response.json();
          Swal.fire({
            title: 'Failed!',
            text: `Failed to delete assignment: ${errorMsg}`,
            icon: 'error',
            background: isDarkMode() ? '#1f2937' : '#fff',
            color: isDarkMode() ? '#f3f4f6' : '#000',
          });
        }
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: 'Failed to delete the assignment.',
          icon: 'error',
          background: isDarkMode() ? '#1f2937' : '#fff',
          color: isDarkMode() ? '#f3f4f6' : '#000',
        });
      }
    }
  };

  const handleUpdate = (id) => {
    navigate(`/UpdateAssignment/${id}`);
  };

  const handleSearch = () => {
    fetchAssignments();
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[200px] dark:text-gray-100">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        <p className="mt-4 text-lg">Loading assignments...</p>
      </div>
    );
  }

  if (error) {
    return <div className="dark:text-gray-100">Error: {error}</div>;
  }

  return (
    <div className=" mx-auto p-4 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-4">Assignments</h1>

      {/* Search and Filter Section */}
      <div className=" flex flex-col md:flex-row lg:flex-row gap-y-3 md:gap-5 lg:gap-5 mb-4">
        <div className="space-x-3">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by title..."
            className="border border-gray-400 rounded px-4 py-2 dark:bg-gray-700 dark:text-gray-100"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Search
          </button>
        </div>
        <div className="space-x-3">
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="border border-gray-400 rounded px-4 py-2 dark:bg-gray-800 dark:text-gray-100"
          >
            <option value="">All Difficulties</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <button
            onClick={fetchAssignments}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Filter
          </button>
        </div>
      </div>

      {/* Assignments Table */}
      <div className='overflow-y-auto max-w-full'>
        <table className="table-auto  border-collapse border border-gray-400 overflow-y-auto">
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
                  {[
                    { label: "Update", color: "bg-blue-500", action: () => handleUpdate(assignment._id) },
                    { label: "Delete", color: "bg-red-500", action: () => handleDelete(assignment._id) },
                    { label: "View", color: "bg-gray-500", action: () => navigate(`/assignment/${assignment._id}`) },
                  ].map(({ label, color, action }) => (
                    <button
                      key={label}
                      onClick={action}
                      className={`${color} text-white w-full py-2 rounded`}
                    >
                      {label}
                    </button>
                  ))}
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Assignments;
