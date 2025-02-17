import React from 'react';

const UserProfile = ({ name, role }) => {
  return (
    <div className="flex items-center gap-3 p-4">
      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
        <span className="text-blue-600 text-lg font-semibold">
          {name.split(' ').map(n => n[0]).join('')}
        </span>
      </div>
      <div>
        <h2 className="font-semibold text-gray-800">{name}</h2>
        <p className="text-sm text-gray-600">{role}</p>
      </div>
    </div>
  );
};

export default UserProfile;