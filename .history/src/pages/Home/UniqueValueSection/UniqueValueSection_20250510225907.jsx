import React from 'react';
import './UniqueValueSection.css';

const UniqueValueSection = () => {
  return (
    <section className="unique-section">
      <div className="unique-text">
        <h2 className="unique-title">What Makes StudyHive Unique?</h2>
        <p className="unique-description">
          Unlike ordinary study platforms, StudyHive thrives on community-driven learning. Whether you're solving tough problems or helping peers, our hive approach ensures no one studies alone.
        </p>
        <ul className="unique-points">
          <li>🧑‍🤝‍🧑 Peer-to-peer learning experience</li>
          <li>📊 Live progress & accountability tools</li>
          <li>🎓 Built for real academic growth</li>
          <li>💬 Supportive, feedback-focused environment</li>
        </ul>
      </div>
      <div className="unique-image">
        <img
          src="https://media.giphy.com/media/26gR09Qs7cTlDsAyk/giphy.gif"
          alt="StudyHive Collaboration"
        />
      </div>
    </section>
  );
};

export default UniqueValueSection;
