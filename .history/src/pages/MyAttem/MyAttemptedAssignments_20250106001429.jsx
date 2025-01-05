import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MyAttemptedAssignments = ({ userEmail }) => {
  const [assignments, setAssignments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await fetch(`http://localhost:5000/attempted-assignments?email=${userEmail}`);
        if (!response.ok) {
          throw new Error(await response.text());
        }
        const data = await response.json();
        setAssignments(data); // Set the data in state
      } catch (error) {
        console.error('Error fetching assignments:', error);
      }
    };

    fetchAssignments();
  }, [userEmail]);

  if (assignments.length === 0) {
    return <p>No attempted assignments found.</p>;
  }

  return (
    <div>
      <h1>My Attempted Assignments</h1>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Marks</th>
            <th>Obtained Marks</th>
            <th>Feedback</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((assignment) => (
            <tr key={assignment._id}>
              <td>{assignment.assignmentTitle}</td>
              <td>{assignment.status}</td>
              <td>{assignment.marks}</td>
              <td>{assignment.obtainMarks}</td>
              <td>{assignment.feedback}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyAttemptedAssignments;
