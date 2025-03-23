import { useState } from 'react';
import { MoreVertical } from 'lucide-react';

const ChatHeader = ({ teacher, onDeleteConversation }) => {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div className="relative flex items-center justify-between p-4 border-b bg-white">
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
      
      <button className="p-2 hover:bg-gray-100 rounded-full" onClick={() => setShowOptions(!showOptions)}>
        <MoreVertical size={20} className="text-gray-600" />
      </button>

      {/* {showOptions && (
        <div className="absolute top-12 right-4 bg-white shadow-md rounded-md p-2">
          <button className="text-red-600 hover:text-red-800" onClick={onDeleteConversation}>Delete Chat</button>
        </div>
      )} */}
    </div>
  );
};

export default ChatHeader;
