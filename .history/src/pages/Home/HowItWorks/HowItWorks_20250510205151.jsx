import React from 'react';
// import './HowItWorksSection.css';

const steps = [
  {
    title: 'Sign Up & Login',
    description: 'Create your free account and login to join the study community.',
    icon: '📝',
  },
  {
    title: 'Create Assignments',
    description: 'Generate assignments and share them with all your study friends.',
    icon: '🧠',
  },
  {
    title: 'Submit & Collaborate',
    description: 'Submit your work and give feedback to others for shared learning.',
    icon: '🔄',
  },
  {
    title: 'Get Evaluated',
    description: 'Receive marks and comments to improve and succeed together.',
    icon: '📈',
  },
];

const HowItWorks = () => {
  return (
    <div className="how-it-works-section my-5 rounded-xl dark:bg-gray-800">
      <div className="feature-header dark:text-gray-100">
        <h2 className="feature-title">How StudyHive Works</h2>
        <p className="feature-subtitle">Start collaborating in just a few simple steps.</p>
      </div>
      <div className="feature-cards">
        {steps.map((step, index) => (
          <div key={index} className="feature-card dark:bg-gray-800 dark:text-gray-100">
            <div className="feature-icon">{step.icon}</div>
            <h3 className="feature-card-title">{step.title}</h3>
            <p className="feature-card-description">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
