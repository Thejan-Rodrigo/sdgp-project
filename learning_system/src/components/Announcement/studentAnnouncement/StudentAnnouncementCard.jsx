import React from 'react';
import { FaClock, FaEye } from 'react-icons/fa';

const StudentAnnouncementCard = ({ title, content, timeAgo, views, postedBy, classInfo }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border mb-4">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <span className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
          {classInfo}
        </span>
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

export default StudentAnnouncementCard;