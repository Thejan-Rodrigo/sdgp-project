import React, { useState } from 'react';
import { Search } from 'lucide-react';

const ContactListA = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const teachers = [
    {
      id: 1,
      name: 'Mrs. Sarah Wilson',
      subject: 'Mathematics',
      lastMessage: 'Please ensure your child is prepared fo...',
      time: '2 hours ago',
      isOnline: true
    },
    {
      id: 2,
      name: 'Mr. Robert Brown',
      subject: 'Science',
      lastMessage: 'The science project deadline has been...',
      time: 'Yesterday',
      isOnline: true
    },
    {
      id: 3,
      name: 'Ms. Emily Davis',
      subject: 'English',
      lastMessage: 'Your child did exceptionally well in the...',
      time: '2 days ago',
      isOnline: true
    }
  ];

  const filteredTeachers = teachers.filter(teacher =>
    teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    teacher.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-80 border-r bg-white">
      {/* Header */}
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">Q&A</h2>
      </div>

      {/* Search Bar */}
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search teachers..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Teachers List */}
      <div className="overflow-y-auto">
        {filteredTeachers.map((teacher) => (
          <div
            key={teacher.id}
            className="p-4 hover:bg-gray-50 cursor-pointer border-b transition-colors"
          >
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">
                    {teacher.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                {teacher.isOnline && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>

              {/* Teacher Info */}
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-gray-900">{teacher.name}</h3>
                  <span className="text-xs text-gray-500">{teacher.time}</span>
                </div>
                <p className="text-sm text-gray-600">{teacher.subject}</p>
                <p className="text-sm text-gray-500 truncate mt-1">
                  {teacher.lastMessage}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactListA;