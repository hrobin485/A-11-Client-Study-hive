import React from 'react';
import "./FeatureSection.css";

const features = [
  {
    title: 'Collaborate with Friends',
    description: 'Work together on assignments, share ideas, and stay connected.',
    icon: '👥',
  },
  {
    title: 'Track Assignments',
    description: 'Easily create, manage, and track your assignments with ease.',
    icon: '📚',
  },
  {
    title: 'Grade and Evaluate',
    description: 'Grade your friends’ work and get feedback to improve.',
    icon: '⭐',
  },
  {
    title: 'Real-Time Updates',
    description: 'Stay updated with real-time notifications and progress tracking.',
    icon: '🔔',
  },
];

const FeatureSection = () => { 
  return (
    <div className="feature-section">
      <div className="feature-header">
        <h2 className="feature-title">Why Choose StudyHive?</h2>
        <p className="feature-subtitle">
          Empower your study group with tools designed for collaboration and
          growth.
        </p>
      </div>
      <div className="feature-cards">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <div className="feature-icon">{feature.icon}</div>
            <h3 className="feature-card-title">{feature.title}</h3>
            <p className="feature-card-description">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureSection;
