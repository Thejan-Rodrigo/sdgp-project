import React from 'react';
import { FaStar, FaPaperPlane } from 'react-icons/fa';

const BackgroundDecorations = () => {
  return (
    <>
      <FaStar className="absolute text-yellow-400 text-2xl top-20 left-1/4 animate-pulse" />
      <FaStar className="absolute text-yellow-400 text-2xl top-40 right-1/4 animate-pulse" />
      <FaStar className="absolute text-yellow-400 text-2xl bottom-20 left-1/3 animate-pulse" />
      <FaStar className="absolute text-yellow-400 text-2xl top-50 left-28 animate-pulse" />
      <FaStar className="absolute text-yellow-400 text-2xl bottom-10  right-1/4 animate-pulse" />
      <FaPaperPlane className="absolute text-blue-300 text-4xl top-80 right-40 transform rotate-12" />
      <FaPaperPlane className="absolute text-blue-300 text-4xl bottom-20 left-52 transform rotate-12" />
      <div className="absolute top-0 left-0 w-32 h-32 bg-blue-200 rounded-full filter blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-200 rounded-full filter blur-3xl opacity-50"></div>
    </>
  );
};

export default BackgroundDecorations;