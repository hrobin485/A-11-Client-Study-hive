import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext/AuthContext';

const AssignmentDetails = () => {
  const { id } = useParams(); // Get assignment ID from URL
  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false); // Modal state
  const [submission, setSubmission] = useState({ googleDocsLink: '', notes: '' });
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); // Get current user

  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        const response = await fetch(`http://localhost:5000/assignments/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch assignment details.');
        }
        const data = await response.json();
        setAssignment(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchAssignment();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!submission.googleDocsLink || !submission.notes) {
      alert('Google Docs Link and Notes are required.');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5000/submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          assignmentId: id,
          googleDocsLink: submission.googleDocsLink,
          notes: submission.notes,
          email: user.email,
          status: 'pending',
        }),
      });
  
      if (response.ok) {
        alert('Assignment submitted successfully!');
        setShowModal(false); // Close modal
      } else {
        const errorMsg = await response.text();
        alert(`Failed to submit assignment: ${errorMsg}`);
      }
    } catch (error) {
      alert('Error: Failed to submit assignment.');
    }
  };
  
  if (loading) {
    return <div>Loading assignment details...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Assignment Details</h1>
      <div className="bg-white shadow-md rounded p-4">
        <h2 className="text-2xl font-bold">{assignment.title}</h2>
        <p className="mt-2">{assignment.description}</p>
        <p className="mt-2 font-semibold">Marks: {assignment.marks}</p>
        <p className="mt-2 font-semibold">Difficulty: {assignment.difficulty}</p>
        <p className="mt-2 font-semibold">Due Date: {new Date(assignment.dueDate).toLocaleDateString()}</p>
      </div>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded mt-4"
        onClick={() => setShowModal(true)}
      >
        Take Assignment
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Submit Assignment</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block font-semibold">Google Docs Link:</label>
                <input
                  type="url"
                  className="w-full border rounded px-2 py-1"
                  value={submission.googleDocsLink}
                  onChange={(e) => setSubmission({ ...submission, googleDocsLink: e.target.value })}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block font-semibold">Quick Notes:</label>
                <textarea
                  className="w-full border rounded px-2 py-1"
                  value={submission.notes}
                  onChange={(e) => setSubmission({ ...submission, notes: e.target.value })}
                  rows="4"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignmentDetails;
