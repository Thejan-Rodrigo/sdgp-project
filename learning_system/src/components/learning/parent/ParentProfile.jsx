import React from 'react';

const ParentProfile = () => {
  return (
    <div className="flex items-center space-x-3 mb-6">
      <img
        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop"
        alt="Jane Smith"
        className="w-12 h-12 rounded-full"
      />
      <div>
        <h2 className="font-semibold">Jane Smith</h2>
        <p className="text-sm text-gray-600">Parent of John Smith</p>
      </div>
    </div>
  );
};

export default ParentProfile;