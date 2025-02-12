import React, { useState } from 'react';
import { FaPaperclip } from 'react-icons/fa';

const NewAnnouncementForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('all');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ title, content, selectedBranch });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
      <h2 className="text-xl font-semibold mb-4">New Announcement</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Announcement Title"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <textarea
            placeholder="Write your announcement here..."
            className="w-full p-3 border rounded-lg h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <button
              type="button"
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
            >
              <FaPaperclip />
              <span>Attach</span>
            </button>
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none"
            >
              <option value="all">All Branches</option>
              <option value="branch1">Branch 1</option>
              <option value="branch2">Branch 2</option>
              <option value="branch3">Branch 3</option>
            </select>
          </div>
          <button
            type="submit"
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-blue-700"
          >
            Post Announcement
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewAnnouncementForm;