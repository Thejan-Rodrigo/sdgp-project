import React from 'react';
import StudentAnnouncementCard from './StudentAnnouncementCard';

const announcements = [
  {
    title: "Math Test Next Week",
    content: "Please ensure you are prepared for the upcoming mathematics test covering chapters 5-7. Review all practice problems and homework assignments.",
    timeAgo: "2 hours ago",
    views: 45,
    postedBy: "Mrs. Sarah Wilson",
    classInfo: "Class 10-A"
  },
  {
    title: "Parent-Teacher Meeting Schedule",
    content: "The parent-teacher meeting is scheduled for next Friday. Please inform your parents about the timing and venue.",
    timeAgo: "1 day ago",
    views: 128,
    postedBy: "School Administration",
    classInfo: "All Classes"
  },
  {
    title: "Extra Mathematics Practice Session",
    content: "There will be an extra practice session this Saturday for students who need additional help with Algebra. Attendance is optional but recommended.",
    timeAgo: "2 days ago",
    views: 89,
    postedBy: "Mrs. Sarah Wilson",
    classInfo: "Class 10-A"
  }
];

const StudentAnnouncementList = () => {
  return (
    <div className="p-6">
      {announcements.map((announcement, index) => (
        <StudentAnnouncementCard key={index} {...announcement} />
      ))}
    </div>
  );
};

export default StudentAnnouncementList;