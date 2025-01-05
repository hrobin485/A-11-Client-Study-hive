import React, { useState } from "react";

const AssignmentDetails = () => {
  const [showModal, setShowModal] = useState(false);
  const [googleDocsLink, setGoogleDocsLink] = useState("");
  const [quickNote, setQuickNote] = useState("");

  const handleSubmit = async () => {
    if (!googleDocsLink.trim() || !quickNote.trim()) {
      alert("All fields are required!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/submitAssignment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          googleDocsLink,
          quickNote,
          assignmentId: id, // Pass assignment ID (ensure `id` is obtained via `useParams`)
          userEmail: user.email, // Pass user email
        }),
      });

      if (response.ok) {
        alert("Assignment submitted successfully!");
        setShowModal(false); // Close modal
      } else {
        const errorData = await response.json();
        alert(`Submission failed: ${errorData.message}`);
      }
    } catch (error) {
      alert("Error: Unable to submit assignment.");
    }
  };

  return (
    <div>
      <h1>Assignment Details</h1>
      {/* Add details about the assignment */}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        onClick={() => setShowModal(true)}
      >
        Take Assignment
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-xl font-bold mb-4">Submit Assignment</h2>
            <div>
              <label>Google Docs Link:</label>
              <input
                type="url"
                className="w-full border rounded p-2 mb-4"
                value={googleDocsLink}
                onChange={(e) => setGoogleDocsLink(e.target.value)}
              />
            </div>
            <div>
              <label>Quick Note:</label>
              <textarea
                className="w-full border rounded p-2 mb-4"
                rows="3"
                value={quickNote}
                onChange={(e) => setQuickNote(e.target.value)}
              />
            </div>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={handleSubmit}
            >
              Submit
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded ml-2"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignmentDetails;
