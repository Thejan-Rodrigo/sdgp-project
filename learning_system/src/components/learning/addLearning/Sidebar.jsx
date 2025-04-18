import React from 'react';
import { useAuth } from "../../../context/AuthContext";
import { FaGraduationCap, FaTachometerAlt, FaBell, FaSchool, FaUserCog, FaUserGraduate, FaQuestionCircle, FaHeadphones, FaBook } from 'react-icons/fa';

const Sidebar = () => {
  const { user } = useAuth();
  const menuItems = [
    { icon: <FaGraduationCap />, text: 'EduAdmin', isHeader: true },
    { icon: <FaTachometerAlt />, text: 'Dashboard' },
    { icon: <FaBell />, text: 'Announcements' },
    { icon: <FaSchool />, text: 'Add School', },
    { icon: <FaUserCog />, text: 'Add Admin' },
    { icon: <FaUserGraduate />, text: 'Student Profiles' },
    { icon: <FaQuestionCircle />, text: 'Q&A Management' },
    { icon: <FaHeadphones />, text: 'Help & Support' },
    { icon: <FaBook />, text: 'Add Learning', isActive: true},
  ];

  return (
    <div className="w-64 bg-white shadow-lg h-screen">
      <div className="p-4">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            <img src="https://via.placeholder.com/40" alt="Profile" className="rounded-full" />
          </div>
          <div>

          {user ? (
                <><h3 className="font-semibold">{`${user.firstName} ${user.lastName}`}</h3><p className="text-sm text-gray-500">{user.role}</p></>
            ) : (
                <h1>User not loged in</h1>
            )}
          </div>
        </div>
        <nav>
          {menuItems.map((item, index) => (
            <div
              key={index}
              className={`flex items-center gap-3 p-3 rounded-lg mb-2 ${
                item.isHeader ? 'text-blue-600 font-bold text-lg' :
                item.isActive ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {item.icon}
              <span>{item.text}</span>
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;