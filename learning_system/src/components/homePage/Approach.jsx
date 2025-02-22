import React from 'react';
import { FaBook, FaHeart, FaGamepad, FaUser } from 'react-icons/fa';

const Approach = () => {
  const approaches = [
    {
      icon: <FaBook className="text-3xl text-primary" />,
      title: "Structured Learning",
      description: "Age-appropriate curriculum designed to foster growth and development"
    },
    {
      icon: <FaHeart className="text-3xl text-primary" />,
      title: "Nurturing Environment",
      description: "Safe and caring atmosphere that contributes to positive emotional growth"
    },
    {
      icon: <FaGamepad className="text-3xl text-primary" />,
      title: "Play-Based Learning",
      description: "Interactive activities that make learning fun and engaging"
    },
    {
      icon: <FaUser className="text-3xl text-primary" />,
      title: "Individual Attention",
      description: "Personalized approach to meet each child's unique needs and goals"
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Our Learning Approach</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {approaches.map((item, index) => (
            <div key={index} className="text-center">
              <div className="mb-4 flex justify-center">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Approach