import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const GiveMark = () => {
  const { submissionId } = useParams();
  const [submission, setSubmission] = useState(null);
  const [marks, setMarks] = useState('');
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubmission = async () => {
      try {
        const response = await fetch(`https://server-side-study-hive.vercel.app/submissions/${_Id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch submission details.');
        }
        const data = await response.json();
        setSubmission(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchSubmission();
  }, [submissionId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`https://server-side-study-hive.vercel.app/give-mark/${submissionId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ marks, feedback }),
      });

      if (response.ok) {
        alert('Marks and feedback submitted successfully!');
        window.location.href = '/pending-assignments'; // Redirect back to the pending assignments page
      } else {
        const errorMsg = await response.text();
        alert(`Failed to submit marks: ${errorMsg}`);
      }
    } catch (error) {
      alert('Error: Failed to submit marks.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Give Mark</h1>
      <div className="bg-white shadow-md rounded p-4">
        <h2 className="text-2xl font-bold">{submission.assignmentTitle}</h2>
        <p className="mt-2">Examinee: {submission.email}</p>
        <p className="mt-4">Google Docs Link: <a href={submission.googleDocsLink} target="_blank" rel="noopener noreferrer">Open Google Docs</a></p>
        <p className="mt-2">Notes: {submission.notes}</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-semibold">Marks:</label>
            <input
              type="number"
              className="w-full border rounded px-2 py-1"
              value={marks}
              onChange={(e) => setMarks(e.target.value)}
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
            />
          </div>
          <div className="flex justify-end">
            <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded mr-2" onClick={() => window.location.href = '/pending-assignments'}>Cancel</button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GiveMark;
