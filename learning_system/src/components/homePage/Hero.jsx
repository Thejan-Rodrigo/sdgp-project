import React from 'react';

const Hero = () => {
  return (
    <div className="relative h-[600px] bg-gradient-to-r from-blue-500 to-green-400">
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="relative container mx-auto px-6 h-full flex items-center">
        <div className="text-white max-w-2xl">
          <h1 className="text-5xl font-bold mb-6">Where Learning Meets Fun</h1>
          <p className="text-xl mb-8">Nurturing Young Minds for a Brighter Future</p>
          <button className="bg-white text-blue-500 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors">
            Explore Our Programs
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero