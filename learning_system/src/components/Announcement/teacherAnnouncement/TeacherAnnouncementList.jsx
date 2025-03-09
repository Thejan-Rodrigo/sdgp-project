import React from 'react';
import TeacherAnnouncementCard from './TeacherAnnouncementCard';

const announcements = [
  {
    title: "Math Test Next Week",
    content: "Please be prepared for the upcoming mathematics test covering chapters 5-7. Review all practice problems and homework assignments.",
    timeAgo: "2 hours ago",
    views: 45,
    postedBy: "shashini teacher"
  },
  {
    title: "Parent-Teacher Meeting Schedule",
    content: "The parent-teacher meeting is scheduled for next Friday. Please inform your parents about the timing and venue.",
    timeAgo: "1 day ago",
    views: 128,
    postedBy: "thejan sir"
  },
  {
    title: "Extra Mathematics Practice Session",
    content: "There will be an extra practice session this Saturday for students who need additional help with Algebra.",
    timeAgo: "2 days ago",
    views: 89,
    postedBy: "Admin"
  }
];

const TeacherAnnouncementList = () => {
  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-4">Recent Announcements</h2>
      {announcements.map((announcement, index) => (
        <TeacherAnnouncementCard key={index} {...announcement} />
      ))}
    </div>
  );
};

export default TeacherAnnouncementList;