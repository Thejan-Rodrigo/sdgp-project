import React from 'react';
import FeatureCard from './FeatureCard';
import { FaBrain, FaUsers, FaGraduationCap } from 'react-icons/fa';

const Features = () => {
  const features = [
    {
      icon: <FaBrain className="text-4xl text-primary " />,
      title: "Cognitive Development",
      description: "Enhance problem-solving skills and critical thinking through structured learning"
    },
    {
      icon: <FaUsers className="text-4xl text-primary" />,
      title: "Social Skills",
      description: "Develop essential social and emotional learning through interactive games and guided play"
    },
    {
      icon: <FaGraduationCap className="text-4xl text-primary" />,
      title: "Early Education",
      description: "Build a strong foundation by following age-appropriate and engaging curriculum"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-4">Why Preschool Education Matters</h2>
        <p className="text-gray-600 text-center mb-12">Early childhood education plays a crucial role in shaping your child's future. Discover how our program develops every aspect of development.</p>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features