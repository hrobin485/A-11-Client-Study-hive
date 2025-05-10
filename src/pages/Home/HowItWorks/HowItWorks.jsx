import React from 'react';
import './HowItWorksSection.css';

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
    <div className="how-it-works-section my-5 rounded-xl dark:bg-gray-800 ">
      <div className="feature-header dark:text-gray-100">
        <h2 className="feature-title">How StudyHive Works</h2>
        <p className="feature-subtitle dark:text-gray-100">Start collaborating in just a few simple steps.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
  {steps.map((step, index) => (
    <div key={index} className="how-it-step dark:bg-gray-700 dark:text-gray-100">
      <div className="how-it-icon">{step.icon}</div>
      <h3 className="how-it-title">{step.title}</h3>
      <p className="how-it-description dark:text-gray-100">{step.description}</p>
    </div>
  ))}
</div>
    </div>
  );
};

export default HowItWorks;
