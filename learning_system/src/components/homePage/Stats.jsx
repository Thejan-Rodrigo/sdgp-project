import React from 'react';

const Stats = () => {
  const stats = [
    { number: "15+", label: "Years Experience" },
    { number: "200+", label: "Happy Students" },
    { number: "50+", label: "Certified Teachers" },
    { number: "25+", label: "Learning Programs" }
  ];

  return (
    <div className="bg-primary py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center text-white">
              <div className="text-4xl font-bold mb-2">{stat.number}</div>
              <div className="text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stats