import React from 'react';

export default function TopicAndDescription(props) {
  return (
    <div className="ml-5 mt-10 px-4 sm:px-6 md:px-10 lg:px-20">
      <h1 className="bg-white w-full h-12 rounded-xl px-6 text-center mb-4 font-semibold text-lg sm:text-xl md:text-2xl text-gray-800 shadow-lg ">
        {props.topic}
      </h1>
      <p className="bg-white w-full rounded-xl p-6 text-center text-sm sm:text-base md:text-lg text-gray-700 shadow-md transition-all duration-300 ease-in-out hover:scale-105">
        {props.children}
      </p>
    </div>
  );
}
