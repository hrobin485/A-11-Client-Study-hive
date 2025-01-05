import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const GiveMark = () => {
  const { submissionId } = useParams(); // Get the submission ID from URL
  const [submission, setSubmission] = useState(null);
  const [marks, setMarks] = useState('');
  const [feedback, setFeedback] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubmissionDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/submissions/${submissionId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch submission details.');
        }
        const data = await response.json();
        setSubmission(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSubmissionDetails();
  }, [submissionId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!marks || !feedback) {
      alert('Marks and feedback are required.');
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:5000/give-mark/${submissionId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ marks, feedback }),
      });
  
      if (response.ok) {
        alert('Marks given successfully!');
        navigate('/PendingAssignments'); // Redirect to pending assignments page
      } else {
        const errorMsg = await response.text();
        alert(`Failed to give marks: ${errorMsg}`);
      }
    } catch (error) {
      alert('Error: Failed to give marks.');
    }
  };
  
  

  if (!submission) {
    return <div>Loading submission details...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Give Mark for {submission.assignmentTitle}</h1>
      <div>
        <p><strong>Examinee:</strong> {submission.email}</p>
        <p><strong>Google Docs Link:</strong> <a href={submission.googleDocsLink} target="_blank" rel="noopener noreferrer">View Docs</a></p>
        <p><strong>Notes:</strong> {submission.notes}</p>
        <p><strong>Mark:</strong> {submission.marks}</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-semibold">Obtain Mark:</label>
          <input
            type="number"
            className="w-full border rounded px-2 py-1"
            value={marks}
            onChange={(e) => setObtainMark(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold">Feedback:</label>
          <textarea
            className="w-full border rounded px-2 py-1"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows="4"
            required
          />
        </div>
        <div className="flex justify-end">
          <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded mr-2" onClick={() => navigate('/pending-assignments')}>Cancel</button>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default GiveMark;
