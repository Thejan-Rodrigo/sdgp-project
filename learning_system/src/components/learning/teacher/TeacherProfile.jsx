//User retrieve
import React from 'react';

const TeacherProfile = () => {
  return (
    <div className="flex items-center space-x-3 mb-6">
      <img
        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop"
        alt="Sarah Wilson"
        className="w-12 h-12 rounded-full"
      />
      <div>
        <h2 className="font-semibold">Sarah Wilson</h2>
        <p className="text-sm text-gray-600">Mathematics Teacher</p>
      </div>
    </div>
  );
};

export default TeacherProfile;