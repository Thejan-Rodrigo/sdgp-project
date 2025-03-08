import React from 'react';
import { MoreVertical } from 'lucide-react';

const ChatHeader = ({ teacher }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b bg-white">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
          <span className="text-blue-600 font-semibold">
            {teacher.name.split(' ').map(n => n[0]).join('')}
          </span>
        </div>
        <div>
          <h3 className="font-semibold">{teacher.name}</h3>
          <p className="text-sm text-gray-600">{teacher.subject}</p>
        </div>
      </div>
      <button className="p-2 hover:bg-gray-100 rounded-full">
        <MoreVertical size={20} className="text-gray-600" />
      </button>
    </div>
  );
};

export default ChatHeader;