import React, { use, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const AnnouncementForm = ({ onAnnouncementAdded }) => {
  const { user } = useAuth(); // Access user data (e.g., token) from authentication context
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [targetAudience, setTargetAudience] = useState('all');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setIsSubmitting(true); // Set submitting state to true
    setError(''); // Clear any previous errors

    try {
      // Validate form inputs
      if (!title || !content) {
        setError('Title and content are required');
        setIsSubmitting(false); // Reset submitting state
        return;
      }

      // Send POST request to create a new announcement
      const response = await axios.post(
        'http://localhost:5000/api/v1/announcements', // API endpoint
        {
          title,
          content,
          targetAudience: [targetAudience], // Convert targetAudience to an array
          status: 'published' // Default status for the announcement
        },
        {
          headers: {
            'Content-Type': 'application/json', // Set content type
            'Authorization': `Bearer ${user?.token}` // Attach user token for authentication
          }
        }
      );

      console.log('Announcement created:', response.data); // Log success response

      // Clear form fields after successful submission
      setTitle('');
      setContent('');
      setTargetAudience('all');

      // Notify parent component to refresh the announcement list
      if (onAnnouncementAdded) {
        onAnnouncementAdded();
      }
    } catch (error) {
      console.error('Error creating announcement:', error); // Log error
      setError(error.response?.data?.message || 'Failed to create announcement'); // Set error message
    } finally {
      setIsSubmitting(false); // Reset submitting state (runs regardless of success or failure)
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
      <h2 className="text-xl font-semibold mb-4">New Announcement</h2>
      {/* Display error message if any */}
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Announcement Title"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)} // Update title state on input change
          />
        </div>
        <div className="mb-4">
          <textarea
            placeholder="Write your announcement here..."
            className="w-full p-3 border rounded-lg h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={content}
            onChange={(e) => setContent(e.target.value)} // Update content state on input change
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Target Audience</label>
          <select
            className="block w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={targetAudience}
            onChange={(e) => setTargetAudience(e.target.value)}
          >
            {user.role === 'teacher' ? (
              <option value="parents">Parents Only</option>
            ) : user.role === 'admin' ? (
              <>
                <option value="parents">Parents Only</option>
                <option value="teachers">Teachers Only</option>
              </>
            ) : user.role === 'superadmin' ? (
              <>
                <option value="all">Everyone</option>
                <option value="teachers">Teachers Only</option>
                <option value="parents">Parents Only</option>
                <option value="admin">Admins Only</option>
              </>
            ) : (
              // Default case if needed
              <option value="all">Everyone</option>
            )}
          </select>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            {/* Additional buttons or elements can go here */}
          </div>
          {/* Submit button with dynamic text based on submission state */}
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
            disabled={isSubmitting} // Disable button while submitting
          >
            {isSubmitting ? 'Posting...' : 'Post Announcement'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AnnouncementForm;