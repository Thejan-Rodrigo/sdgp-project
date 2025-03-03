import React from 'react';
import { 
  BookOpen, 
  Users, 
  Calendar, 
  BarChart2, 
  MessageSquare, 
  HelpCircle,
  Bell
} from 'lucide-react';

const TeacherSidebar = () => {
  return (
    <div className="w-64 h-screen bg-white shadow-md flex flex-col">
      {/* Logo */}
      <div className="flex items-center gap-2 p-4 border-b">
        <div className="text-blue-600">
          <BookOpen size={24} />
        </div>
        <span className="font-bold text-xl text-blue-600">EduTeach</span>
      </div>
      
      {/* Teacher Profile */}
      <div className="p-4 border-b">
        <h2 className="font-semibold text-gray-800">Sarah Wilson</h2>
        <p className="text-sm text-gray-500">Teacher</p>
      </div>
      
      {/* Navigation Menu */}
      <div className="flex-1 py-4">
        <div className="space-y-1 px-3">
          {/* Announcement */}
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 cursor-pointer">
            <Bell size={20} className="text-gray-500" />
            <span className="text-sm font-medium">Announcement</span>
          </div>
          
          {/* Meeting - Active */}
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-600 text-white cursor-pointer">
            <Calendar size={20} />
            <span className="text-sm font-medium">Meeting</span>
          </div>
          
          {/* Attendance */}
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 cursor-pointer">
            <Users size={20} className="text-gray-500" />
            <span className="text-sm font-medium">Attendance</span>
          </div>
          
          {/* Lessons */}
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 cursor-pointer">
            <BookOpen size={20} className="text-gray-500" />
            <span className="text-sm font-medium">Lessons</span>
          </div>
          
          {/* Progress */}
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 cursor-pointer">
            <BarChart2 size={20} className="text-gray-500" />
            <span className="text-sm font-medium">Progress</span>
          </div>
          
          {/* Q&A */}
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 cursor-pointer">
            <MessageSquare size={20} className="text-gray-500" />
            <span className="text-sm font-medium">Q&A</span>
          </div>
          
          {/* Help & Support */}
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 cursor-pointer">
            <HelpCircle size={20} className="text-gray-500" />
            <span className="text-sm font-medium">Help & Support</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherSidebar;