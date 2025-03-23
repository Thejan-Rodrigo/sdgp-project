import React, { useState, useEffect } from 'react';

const EditAnnouncementModal = ({ announcement, onClose, onUpdate }) => {
  const [title, setTitle] = useState(''); 
  const [content, setContent] = useState('');
  const [targetAudience, setTargetAudience] = useState(''); 
  const [error, setError] = useState(''); 
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form fields with announcement data when the modal opens
  useEffect(() => {
    if (announcement) {
      setTitle(announcement.title || ''); 
      setContent(announcement.content || ''); 

      // Handle different formats of targetAudience (array or string)
      if (Array.isArray(announcement.targetAudience) && announcement.targetAudience.length > 0) {
        setTargetAudience(announcement.targetAudience[0]); // Use the first item if it's an array
      } else if (typeof announcement.targetAudience === 'string') {
        setTargetAudience(announcement.targetAudience); 
      } else {
        setTargetAudience('all'); // Default to 'all' if no valid target audience is found
      }
    }
  }, [announcement]); // Run this effect when the `announcement` prop changes

  const handleSubmit = (e) => {
    e.preventDefault(); 
    setIsSubmitting(true); 
    setError(''); // Clear any previous errors

    // Validate form inputs
    if (!title || !content) {
      setError('Title and content are required'); 
      setIsSubmitting(false); 
      return;
    }

    // Prepare updated announcement data
    const updatedAnnouncement = {
      ...announcement, // Spread existing announcement data
      title,
      content,
      targetAudience: [targetAudience], // Convert target audience to an array (API expects an array)
    };

    onUpdate(updatedAnnouncement); // Pass updated data to parent component
    setIsSubmitting(false); 
  };

  // Prevent body scrolling when the modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'; // Disable scrolling
    return () => {
      document.body.style.overflow = 'auto'; // Re-enable scrolling when modal closes
    };
  }, []); // Run this effect only once when the modal mounts/unmounts

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {/* Modal overlay */}
      <div className="bg-white rounded-lg p-6 w-full max-w-lg mx-4">
        <h2 className="text-xl font-semibold mb-4">Edit Announcement</h2>
        {/* Display error message if any */}
        {error && <p className="text-red-500 mb-4 p-2 bg-red-50 rounded">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)} // Update title state on input change
              required // Make the field required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
            <textarea
              className="w-full p-3 border rounded-lg h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={content}
              onChange={(e) => setContent(e.target.value)} // Update content state on input change
              required // Make the field required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Target Audience</label>
            <select
              className="block w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)} // Update target audience state on selection change
            >
              <option value="all">Everyone</option>
              <option value="teachers">Teachers Only</option>
              <option value="parents">Parents Only</option>
              <option value="admin">Admins Only</option>
            </select>
          </div>

          <div className="flex justify-end space-x-3">
            {/* Cancel button */}
            <button
              type="button"
              className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
              onClick={onClose} // Close the modal on click
              disabled={isSubmitting} // Disable button while submitting
            >
              Cancel
            </button>
            {/* Submit button */}
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
              disabled={isSubmitting} // Disable button while submitting
            >
              {isSubmitting ? 'Updating...' : 'Update Announcement'} // Dynamic button text
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAnnouncementModal;