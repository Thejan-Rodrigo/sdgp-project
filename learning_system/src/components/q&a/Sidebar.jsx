import React from 'react';
import { MessageSquare, Calendar, User, BookOpen, HelpCircle } from 'lucide-react';
import UserProfile from './UserProfile';
import SidebarItem from './SidebarItem';

const Sidebar = () => {
  return (
    <div className="w-64 border-r h-screen bg-white">
      <div className="flex items-center gap-2 p-4 border-b">
        <div className="text-blue-600">
          <MessageSquare size={24} />
        </div>
        <span className="font-bold text-xl">EduTeach</span>
      </div>
      
      <UserProfile name="John Smith" role="Parent of Emma - Class 10-A" />
      
      <div className="py-2">
        <SidebarItem icon={<MessageSquare size={20} />} label="Announcements" />
        <SidebarItem icon={<Calendar size={20} />} label="Meeting Schedule" />
        <SidebarItem icon={<User size={20} />} label="Student Profile" />
        <SidebarItem icon={<BookOpen size={20} />} label="Learning Progress" />
        <SidebarItem icon={<HelpCircle size={20} />} label="Q&A" isActive={true} />
      </div>
    </div>
  );
};

export default Sidebar;