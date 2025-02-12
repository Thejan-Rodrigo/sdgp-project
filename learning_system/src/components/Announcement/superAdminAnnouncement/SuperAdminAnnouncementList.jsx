import React from 'react';
import SuperAdminAnnouncementCard from './SuperAdminAnnouncementCard';

const announcements = [
  {
    title: "System Maintenance Notice",
    content: "Scheduled system maintenance will be performed this weekend. All services will be temporarily unavailable from Saturday 22:00 to Sunday 02:00 GMT.",
    timeAgo: "1 hour ago",
    views: 245,
    postedBy: "System Administrator"
  },
  {
    title: "New Feature Release",
    content: "We are excited to announce the release of new features including enhanced reporting tools and improved user interface.",
    timeAgo: "1 day ago",
    views: 562,
    postedBy: "Development Team"
  },
  {
    title: "Policy Update",
    content: "Important updates to system policies and terms of service. All administrators are required to review the changes.",
    timeAgo: "2 days ago",
    views: 891,
    postedBy: "Legal Department"
  }
];

const SuperAdminAnnouncementList = () => {
  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-4">System Announcements</h2>
      {announcements.map((announcement, index) => (
        <SuperAdminAnnouncementCard key={index} {...announcement} />
      ))}
    </div>
  );
};

export default SuperAdminAnnouncementList;