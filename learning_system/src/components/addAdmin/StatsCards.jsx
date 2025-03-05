import React from 'react';
import { FaSchool, FaUserTie, FaUserGraduate } from 'react-icons/fa';

const StatCard = ({ icon, number, label, bgColor }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm flex items-center">
      <div className={`${bgColor} p-4 rounded-lg mr-4`}>
        {icon}
      </div>
      <div>
        <h2 className="text-2xl font-bold">{number}</h2>
        <p className="text-gray-500 text-sm">{label}</p>
      </div>
    </div>
  );
};

const StatsCards = () => {
  const stats = [
    {
      icon: <FaSchool className="text-blue-600 text-xl" />,
      number: "24",
      label: "Total Schools",
      bgColor: "bg-blue-100"
    },
    {
      icon: <FaUserTie className="text-indigo-600 text-xl" />,
      number: "86",
      label: "Total Admins",
      bgColor: "bg-indigo-100"
    },
    {
      icon: <FaUserGraduate className="text-green-600 text-xl" />,
      number: "2,847",
      label: "Active Students",
      bgColor: "bg-green-100"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default StatsCards;