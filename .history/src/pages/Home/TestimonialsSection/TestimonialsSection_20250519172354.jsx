import React from 'react';
import './TestimonialsSection.css';

const testimonials = [
  {
    name: "Ariana Gomez",
    feedback: "StudyHive transformed our group studies! Assignments are organized, and grading each other is actually fun.",
    role: "University Student",
    avatar: "https://i.pravatar.cc/150?img=32"
  },
  {
    name: "Samir Rahman",
    feedback: "I love how easy it is to submit assignments and get feedback instantly. It keeps us on track.",
    role: "College Learner",
    avatar: "https://i.pravatar.cc/150?img=15"
  },
  {
    name: "Lina Chowdhury",
    feedback: "The best part is seeing everyone's progress and knowing how to improve myself.",
    role: "High School Student",
    avatar: "https://i.pravatar.cc/150?img=25"
  }
];

const TestimonialsSection = () => {
  return (
    <section className="testimonials-section dark:bg-gray-800 dark:text-gray-100">
      <h2 className="testimonials-title">What Our Users Say</h2>
      <p className="testimonials-subtitle dark:text-gray-100">Real feedback from real learners around the world.</p>
      <div className="testimonials-grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
        {testimonials.map((user, index) => (
          <div key={index} className="testimonial-card dark:bg-gray-700 dark:text-white">
            <img src={user.avatar} alt={user.name} className="testimonial-avatar" />
            <p className="testimonial-feedback dark:text-gray-100">“{user.feedback}”</p>
            <h4 className="testimonial-name">{user.name}</h4>
            <span className="testimonial-role dark:text-gray-100">{user.role}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
