import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthContext/AuthContext";

const MyAttemptedAssignment = () => {
  const [submittedAssignments, setSubmittedAssignments] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchSubmittedAssignments = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/mySubmittedAssignments?email=${user.email}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch submitted assignments.");
        }
        const data = await response.json();
        setSubmittedAssignments(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchSubmittedAssignments();
  }, [user.email]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">My Attempted Assignments</h1>
      <table className="min-w-full table-auto border-collapse border border-gray-400">
        <thead>
          <tr>
            <th className="border border-gray-400 px-4 py-2">Title</th>
            <th className="border border-gray-400 px-4 py-2">Status</th>
            <th className="border border-gray-400 px-4 py-2">Marks</th>
            <th className="border border-gray-400 px-4 py-2">Obtained Marks</th>
            <th className="border border-gray-400 px-4 py-2">Feedback</th>
          </tr>
        </thead>
        <tbody>
          {submittedAssignments.map((assignment) => (
            <tr key={assignment._id}>
              <td className="border border-gray-400 px-4 py-2">{assignment.title}</td>
              <td className="border border-gray-400 px-4 py-2">{assignment.status}</td>
              <td className="border border-gray-400 px-4 py-2">{assignment.marks || "N/A"}</td>
              <td className="border border-gray-400 px-4 py-2">
                {assignment.obtainedMarks || "Pending"}
              </td>
              <td className="border border-gray-400 px-4 py-2">
                {assignment.feedback || "No feedback yet"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyAttemptedAssignment;
