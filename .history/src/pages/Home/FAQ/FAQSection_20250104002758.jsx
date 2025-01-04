import React, { useState } from 'react';
import './FAQSection.css';

const faqData = [
  {
    question: 'What is StudyHive?',
    answer: 'StudyHive is an online platform designed for group study where users can collaborate, create assignments, track progress, and evaluate each other.',
  },
  {
    question: 'How do I create assignments?',
    answer: 'You can create assignments by navigating to the Assignments section, filling out the necessary details, and inviting your friends to collaborate on them.',
  },
  {
    question: 'Can I grade my friends’ assignments?',
    answer: 'Yes, StudyHive allows you to grade and provide feedback on your friends’ assignments to help improve their learning process.',
  },
  {
    question: 'Is StudyHive available on mobile devices?',
    answer: 'Yes, StudyHive is accessible on both desktop and mobile devices, providing a seamless experience across platforms.',
  },
  {
    question: 'How do I track my progress?',
    answer: 'Your progress is tracked automatically, showing completion status, feedback received, and notifications for new assignments.',
  },
];

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-section">
      <h2 className="faq-title">Frequently Asked Questions</h2>
      <div className="faq-items">
        {faqData.map((faq, index) => (
          <div key={index} className="faq-item">
            <div className="faq-question" onClick={() => toggleAnswer(index)}>
              {faq.question}
              <span className="faq-toggle-icon">
                {activeIndex === index ? '▲' : '▼'}
              </span>
            </div>
            {activeIndex === index && <p className="faq-answer">{faq.answer}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
