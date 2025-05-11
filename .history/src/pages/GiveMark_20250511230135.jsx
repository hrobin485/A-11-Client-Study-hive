import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const GiveMark = () => {
  const { submissionId } = useParams(); // Get the submission ID from URL
  const [submission, setSubmission] = useState(null);
  const [obtainMarks, setObtainMarks] = useState(''); // State for obtain marks
  const [feedback, setFeedback] = useState('');
  const navigate = useNavigate();

 const isDarkMode = () => document.documentElement.classList.contains('dark');

  useEffect(() => {
    const fetchSubmissionDetails = async () => {
      try {
        const response = await fetch(`https://server-side-study-hive.vercel.app/submissions/${submissionId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch submission details.');
        }
        const data = await response.json();
        setSubmission(data);
        setObtainMarks(data.obtainMarks || '');
      } catch (error) {
        console.error(error);
      }
    };

    fetchSubmissionDetails();
  }, [submissionId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!obtainMarks || !feedback) {
      Swal.fire({
        title: 'Validation Error',
        text: 'Marks and feedback are required.',
        icon: 'warning',
        background: isDarkMode() ? '#1f2937' : '#fff',
        color: isDarkMode() ? '#f3f4f6' : '#000',
      });
      return;
    }

    try {
      const response = await fetch(`https://server-side-study-hive.vercel.app/give-mark/${submissionId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ marks: obtainMarks, feedback }),
      });

      if (response.ok) {
        Swal.fire({
          title: 'Success!',
          text: 'Marks given successfully!',
          icon: 'success',
          background: isDarkMode() ? '#1f2937' : '#fff',
          color: isDarkMode() ? '#f3f4f6' : '#000',
        }).then(() => {
          navigate('/pending-assignments');
        });
      } else {
        const errorMsg = await response.text();
        Swal.fire({
          title: 'Error!',
          text: `Failed to give marks: ${errorMsg}`,
          icon: 'error',
          background: isDarkMode() ? '#1f2937' : '#fff',
          color: isDarkMode() ? '#f3f4f6' : '#000',
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Failed to give marks. Please try again later.',
        icon: 'error',
        background: isDarkMode() ? '#1f2937' : '#fff',
        color: isDarkMode() ? '#f3f4f6' : '#000',
      });
    }
  };


  if (!submission) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] dark:text-gray-100">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        <p className="mt-4 text-lg">Loading Submission Assignment...</p>
      </div>
  );
}

  return (
    <div className="container mx-auto p-4 dark:bg-gray-800 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-4">Give Mark for {submission.assignmentTitle}</h1>
      <div>
        <p><strong>Examinee:</strong> {submission.email}</p>
        <p><strong>Google Docs Link:</strong> <a href={submission.googleDocsLink} target="_blank" rel="noopener noreferrer">View Docs</a></p>
        <p><strong>Notes:</strong> {submission.notes}</p>
        <p><strong>Existing Marks:</strong> {submission.marks || 0}</p> {/* Show existing marks */}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-semibold">Obtain Marks:</label>
          <input
            type="number"
            className="w-full border rounded px-2 py-1 dark:text-black"
            value={obtainMarks}
            onChange={(e) => setObtainMarks(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold">Feedback:</label>
          <textarea
            className="w-full border rounded px-2 py-1 dark:text-black"
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
