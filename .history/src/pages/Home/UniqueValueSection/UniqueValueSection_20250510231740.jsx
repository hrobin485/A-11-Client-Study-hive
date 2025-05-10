import React from 'react';
import './UniqueValueSection.css';

const UniqueValueSection = () => {
  return (
    <section className="unique-section">
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
          src="https://cdn.pixabay.com/photo/2016/11/29/05/08/blur-1869306_1280.jpg"
          alt="Team Study Image"
        />
      </div>
    </section>
  );
};

export default UniqueValueSection;
