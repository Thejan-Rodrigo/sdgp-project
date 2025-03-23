import React, { useRef, useState } from "react";
import "./AddLesson.css"; // Importing the CSS file for styling
// import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import Sidebar from '../SupAdSidebar';

const AddLesson = () => {
  //manage lesson states and references
  const [grade, setGrade] = useState('Class 1');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef(null);

//setting image 
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Selected image:", file);
      setImage(file);
      setFileName(file.name);
    } else {
      console.error("No file selected");
    }
  };
//add new lessons for submitting
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
  
    try {
      //validates required fields
      if (!grade ||!title || !description || !image) {
        alert('All fields are required');
        setIsSubmitting(false);
        return;
      }
  //binding the data
      const formData = new FormData();
      formData.append('grade', grade);
      formData.append('title', title);
      formData.append('description', description);
      formData.append('image', image);
      
  
      const response = await axios.post(
        'http://localhost:5000/api/lessons/add',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            // 'Authorization': `Bearer ${user?.token}`
          }
        }
      );
      alert('New lesson added successfully!');
      console.log('Lesson added:', response.data);
      setGrade('Class 1');
      setTitle('');
      setDescription('');
      setImage(null);
      setFileName('');
      if (fileInputRef.current) {
        fileInputRef.current.value = ''; // Reset the file input
      }
  
    } catch (error) {
      console.error('Error adding lesson:', error);
      const errorMessage = error.response?.data?.message || 'Failed to add lesson';
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="lessons-page">
     
      <div className="content-container">
        {/* <aside className="sidebar">
          <ul className="sidebar-menu">
            <li>
              <a href="/addLesson">Add New Lesson</a>
            </li>
          </ul>
        </aside> */}
        <Sidebar/>

        <main className="main-content">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold">Add New Lesson</h1>
            <div className="flex items-center gap-4">
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6" >
          <div>
            <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-1">
              Grade <span className="text-red-500">*</span>
            </label>
            <select
              id="grade" 
              name="grade" 
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="Class 1">Class 1</option>
              <option value="Class 2">Class 2</option>
              <option value="Class 3">Class 3</option>
              <option value="Class 4">Class 4</option>
              <option value="Class 5">Class 5</option>
            </select>
          </div>

          {/* <div>
              <label
                htmlFor="grade"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Grade
              </label>
              
              <select 
                  id="grade" 
                  name="grade" 
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  required 
                  className="input-field"
                >
                  <option value="Class 1">Class 1</option>
                  <option value="Class 2">Class 2</option>
                  <option value="Class 3">Class 3</option>
                  <option value="Class 4">Class 4</option>
                  <option value="Class 5">Class 5</option>
                </select>
            </div> */}


            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Title <span className="text-red-500">*</span>
              </label>
              <input
                id="title"
                type="text"
                placeholder="Enter material title"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                placeholder="Provide a detailed description"
                className="w-full p-3 border border-gray-300 rounded-lg h-32 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Resources (Image Only) <span className="text-red-500">*</span>
              </label>
              <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors">
                <input
                  type="file"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleImageChange}
                  ref={fileInputRef}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-gray-400 mb-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <p className="text-sm text-gray-600 text-center">
                  {fileName
                    ? fileName
                    : "Drag & drop an image or click to browse"}
                </p>
              </div>
            </div>
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                style={{background: '#1a73e8'}}
                className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all disabled:bg-indigo-300 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Adding...
                  </span>
                ) : (
                  "Add Lesson"
                )}
              </button>
            </div>
          </form>
          </div>
          
        </main>
      </div>
    </div>
  );
};

export default AddLesson;
