import React from 'react';
import "./FeatureSection.css"

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
    <div className="feature-section my-5 rounded-xl dark:bg-gray-800">
      <div className="feature-header dark:text-gray-100">
        <h2 className="feature-title">Why Choose StudyHive?</h2>
        <p className="feature-subtitle  dark:text-gray-100">
          Empower your study group with tools designed for collaboration and
          growth.
        </p>
      </div>
      <div className="flex">
        {features.map((feature, index) => (
          <div key={index} className="feature-card  dark:bg-gray-800 dark:text-gray-100">
            <div className="feature-icon">{feature.icon}</div>
            <h3 className="feature-card-title">{feature.title}</h3>
            <p className="feature-card-description dark:text-gray-100">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureSection;
