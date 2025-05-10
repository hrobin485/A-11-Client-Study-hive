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
          src="https://img.freepik.com/free-vector/online-education-concept-with-educarion-everyone-symbols-flat-illustration_1284-29476.jpg?t=st=1746896483~exp=1746900083~hmac=2fcebe665f19c80e9f7b6a94f0516af832a4223c48d33bedb96c4ecc4124e4b4&w=2000"
          alt="StudyHive Collaboration"
        />
      </div>
    </section>
  );
};

export default UniqueValueSection;
