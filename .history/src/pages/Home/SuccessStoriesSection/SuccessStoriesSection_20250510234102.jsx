import React from 'react';
import './SuccessStoriesSection.css';

const successStories = [
  {
    name: 'Farhan Ali',
    quote: 'Before StudyHive, I was lost in deadlines. Now I’m the one helping others!',
    status: 'University Final Year',
    country: 'Bangladesh',
  },
  {
    name: 'Priya Sharma',
    quote: 'Group feedback helped me write better and speak up more in class.',
    status: 'High School Junior',
    country: 'India',
  },
  {
    name: 'Jason Lee',
    quote: 'StudyHive turned pressure into progress — I finally enjoy learning again.',
    status: 'College Freshman',
    country: 'USA',
  },
  {
    name: 'Nadia Hasan',
    quote: 'StudyHive gave me confidence and structure — now I never miss a deadline.',
    status: 'O-Level Student',
    country: 'Pakistan',
  },
];


const SuccessStoriesSection = () => {
  return (
    <div className="success-section my-10 p-8 rounded-xl dark:bg-gray-800">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">🚀 Success Stories</h2>
        <p className="text-gray-600 dark:text-gray-300">Real impact, real achievements.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
        {successStories.map((story, index) => (
          <div
            key={index}
            className="story-card bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
          >
            <p className="text-lg italic text-gray-700 dark:text-gray-100 mb-4">“{story.quote}”</p>
            <div className="font-semibold text-indigo-600 dark:text-indigo-300">{story.name}</div>
            <div className="text-sm text-gray-500 dark:text-gray-300">{story.status}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{story.country}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuccessStoriesSection;
