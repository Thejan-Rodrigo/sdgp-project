import React from 'react';
import { FaClock, FaEye, FaEllipsisV } from 'react-icons/fa';

const SuperAdminAnnouncementCard = ({ title, content, timeAgo, views, postedBy }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border mb-4">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex justify-between">
            <h2 className="text-xl font-semibold">{title}</h2>
            <button className="text-gray-400 hover:text-gray-600">
              <FaEllipsisV />
            </button>
          </div>
          <span className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full inline-block mt-2">
            Global
          </span>
        </div>
      </div>
      <p className="text-gray-600 mb-4">{content}</p>
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <FaClock className="text-gray-400" />
            <span>{timeAgo}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaEye className="text-gray-400" />
            <span>{views} views</span>
          </div>
        </div>
        <div>
          Posted by: {postedBy}
        </div>
      </div>
    </div>
  );
};

export default SuperAdminAnnouncementCard;