import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [filteredAssignments, setFilteredAssignments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch assignments from API or data source
  useEffect(() => {
    fetch('/api/assignments')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setAssignments(data);
        setFilteredAssignments(data);
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `Failed to fetch assignments: ${error}`,
          background: document.documentElement.classList.contains('dark') ? '#374151' : '#ffffff',
          color: document.documentElement.classList.contains('dark') ? '#ffffff' : '#000000',
        });
      });
  }, []);

  // Handle search/filter
  const handleSearch = (event) => {
    event.preventDefault();
    const results = assignments.filter(assignment =>
      assignment.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (results.length === 0) {
      Swal.fire({
        icon: 'info',
        title: 'No assignments found',
        background: document.documentElement.classList.contains('dark') ? '#374151' : '#ffffff',
        color: document.documentElement.classList.contains('dark') ? '#ffffff' : '#000000',
      });
    }
    setFilteredAssignments(results);
  };

  // Handle delete with confirmation
  const handleDelete = (id) => {
    const isDark = document.documentElement.classList.contains('dark');
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      background: isDark ? '#374151' : '#ffffff',
      color: isDark ? '#ffffff' : '#000000',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`/api/assignments/${id}`, { method: 'DELETE' })
          .then(response => {
            if (!response.ok) {
              throw new Error('Failed to delete');
            }
            // Update state to remove deleted assignment
            const updatedAssignments = assignments.filter(a => a.id !== id);
            setAssignments(updatedAssignments);
            setFilteredAssignments(updatedAssignments);
            Swal.fire({
              icon: 'success',
              title: 'Deleted!',
              text: 'The assignment has been deleted.',
              background: document.documentElement.classList.contains('dark') ? '#374151' : '#ffffff',
              color: document.documentElement.classList.contains('dark') ? '#ffffff' : '#000000',
            });
          })
          .catch(error => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: `Failed to delete assignment: ${error}`,
              background: isDark ? '#374151' : '#ffffff',
              color: isDark ? '#ffffff' : '#000000',
            });
          });
      }
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Assignments</h1>
      <form onSubmit={handleSearch} className="mb-4 flex">
        <input
          type="text"
          placeholder="Search assignments..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded px-2 py-1 w-full"
        />
        <button type="submit" className="ml-2 px-4 py-2 bg-blue-500 text-white rounded">
          Search
        </button>
      </form>
      <table className="min-w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Due Date</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredAssignments.map((assignment) => (
            <tr key={assignment.id} className="border-t">
              <td className="px-4 py-2">{assignment.title}</td>
              <td className="px-4 py-2">{assignment.description}</td>
              <td className="px-4 py-2">{assignment.dueDate}</td>
              <td className="px-4 py-2">
                <Link to={`/assignments/${assignment.id}`} className="text-blue-500 hover:underline mr-2">
                  View
                </Link>
                <button
                  onClick={() => handleDelete(assignment.id)}
                  className="px-2 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {filteredAssignments.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center py-4">
                No assignments to display.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Assignments;
