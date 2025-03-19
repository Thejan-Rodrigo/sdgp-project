import React, { useState, useEffect } from 'react';
import LearningCard from '../LearningCard';

const ParentContent = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    
    const fetchParentCards = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/learning/getall?audience=parent');
        const data = await response.json();
        setCards(data.data.materials); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchParentCards();
  }, []);

  return (
    <div className="flex-1 p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Learning Tips for Parents</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </div>
          <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5">
            <option>Class 10-A</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.length > 0 ? (
          cards.map((card) => (
            <LearningCard
              key={card._id} 
              title={card.title}
              description={card.description}
              duration={card.duration}
              image={`http://localhost:5000/api/learning/image${card.image}`} 
            />
          ))
        ) : (
          <p>Loading resources...</p> 
        )}
      </div>
    </div>
  );
};

export default ParentContent;
