import React from 'react';
import './UniqueValueSection.css';

const UniqueValueSection = () => {
  return (
    <section className="unique-section dark:bg-gray-800">
      <div className="unique-text">
        <h2 className="unique-title">What Makes StudyHive Unique?</h2>
        <p className="unique-description">
          StudyHive helps students grow together. It's more than assignments — it's a community of learners helping each other succeed.
        </p>
        <ul className="unique-points">
          <li>🧠 Learn with your peers in real time</li>
          <li>📅 Plan and complete assignments together</li>
          <li>💬 Give and receive helpful feedback</li>
          <li>📊 Monitor team progress effectively</li>
        </ul>
      </div>
      <div className="unique-image">
        <img
          src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZGZsY3BqYzg4dGoyb2I1N3VlaTlldDlubXR4MjNmYXI0cWdob3N5MCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/5pUAw9XjALuWepcOgV/giphy.gif"
          alt="Team Study Image"
        />
      </div>
    </section>
  );
};

export default UniqueValueSection;
