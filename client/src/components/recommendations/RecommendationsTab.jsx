import React from 'react';
import ResourceCard from './ResourceCard';

// Hardcoded mock recommendations – will appear immediately
const MOCK_RECS = [
  {
    _id: '1',
    title: 'Master Python',
    description: 'Learn Python from basics to advanced.',
    resources: [
      { name: 'GeeksforGeeks Python', url: 'https://www.geeksforgeeks.org/python-programming-language/' },
      { name: 'W3Schools Python', url: 'https://www.w3schools.com/python/' },
    ],
  },
  {
    _id: '2',
    title: 'Docker Essentials',
    description: 'Understand containerization.',
    resources: [
      { name: 'Docker Docs', url: 'https://docs.docker.com/get-started/' },
      { name: 'GeeksforGeeks Docker', url: 'https://www.geeksforgeeks.org/docker-tutorial/' },
    ],
  },
  {
    _id: '3',
    title: 'AWS Cloud Practitioner',
    description: 'Learn Amazon Web Services.',
    resources: [
      { name: 'AWS Training', url: 'https://aws.amazon.com/training/' },
      { name: 'GeeksforGeeks AWS', url: 'https://www.geeksforgeeks.org/aws-tutorial/' },
    ],
  },
];

const RecommendationsTab = () => {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title"><i className="fas fa-lightbulb"></i> Personalized Recommendations</h3>
        <div className="card-icon"><i className="fas fa-tasks"></i></div>
      </div>
      <div className="recommendations">
        {MOCK_RECS.map(rec => (
          <ResourceCard key={rec._id} recommendation={rec} />
        ))}
      </div>
    </div>
  );
};

export default RecommendationsTab;