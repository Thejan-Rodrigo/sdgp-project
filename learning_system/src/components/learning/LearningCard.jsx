import React from 'react';

const LearningCard = ({ title, description, duration, image }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md">
          <span className="text-gray-600">⋮</span>
        </button>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        <div className="flex items-center text-sm text-gray-500">
          <span>{duration} min read</span>
          <span className="mx-2">•</span>
          
        </div>
      </div>
    </div>
  );
};

export default LearningCard;