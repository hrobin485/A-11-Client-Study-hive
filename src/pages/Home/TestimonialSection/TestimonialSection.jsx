import React from 'react';
// import './TestimonialsSection.css';

const testimonials = [
  {
    name: 'Sadia Rahman',
    feedback: 'StudyHive boosted our group productivity! Submitting and reviewing assignments is now fun.',
    icon: '💬',
  },
  {
    name: 'Arman Hossain',
    feedback: 'I learned so much just by checking my friends’ feedback. It’s like peer learning on steroids!',
    icon: '🙌',
  },
  {
    name: 'Jannatul Ferdous',
    feedback: 'No more boring group studies — we collaborate and improve together here.',
    icon: '🎓',
  },
];

const TestimonialsSection = () => {
  return (
    <div className="testimonials-section my-5 rounded-xl dark:bg-gray-800">
      <div className="feature-header dark:text-gray-100">
        <h2 className="feature-title">What Our Users Say</h2>
        <p className="feature-subtitle">Real stories from passionate learners.</p>
      </div>
      <div className="feature-cards">
        {testimonials.map((item, index) => (
          <div key={index} className="feature-card dark:bg-gray-800 dark:text-gray-100">
            <div className="feature-icon">{item.icon}</div>
            <h3 className="feature-card-title">{item.name}</h3>
            <p className="feature-card-description">{item.feedback}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsSection;
