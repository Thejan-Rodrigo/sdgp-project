import React from 'react';
import AdminAnnouncementCard from './AdminAnnouncementCard';

const announcements = [
  {
    title: "New Academic Year Schedule",
    content: "The new academic year will begin on September 1st. All branches should prepare accordingly and ensure all staff members are briefed on the new curriculum.",
    timeAgo: "2 hours ago",
    views: 156,
    branch: "All Branches",
    postedBy: "Super Admin"
  },
  {
    title: "Staff Training Workshop",
    content: "Mandatory staff training workshop on new teaching methodologies will be conducted next week. All teaching staff must attend.",
    timeAgo: "1 day ago",
    views: 234,
    branch: "Branch 1",
    postedBy: "Branch Admin"
  },
  {
    title: "Holiday Schedule Update",
    content: "Updated holiday schedule for the upcoming term has been finalized. Please check the attached document for details.",
    timeAgo: "2 days ago",
    views: 189,
    branch: "All Branches",
    postedBy: "Super Admin"
  }
];

const AdminAnnouncementList = () => {
  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-4">Recent Announcements</h2>
      {announcements.map((announcement, index) => (
        <AdminAnnouncementCard key={index} {...announcement} />
      ))}
    </div>
  );
};

export default AdminAnnouncementList;