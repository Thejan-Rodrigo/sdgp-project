import React, { useRef, useState } from "react";
import "./AddLesson.css"; // Remove if not needed
import axios from "axios";
import Sidebar from "../SupAdSidebar";

const AddLesson = () => {
  const [grade, setGrade] = useState("Class 1");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setFileName(file.name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      if (!grade || !title || !description || !image) {
        alert("All fields are required");
        setIsSubmitting(false);
        return;
      }

      const formData = new FormData();
      formData.append("grade", grade);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("image", image);

      const response = await axios.post(
        "http://localhost:5000/api/lessons/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("New lesson added successfully!");
      setGrade("Class 1");
      setTitle("");
      setDescription("");
      setImage(null);
      setFileName("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to add lesson");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100">
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-6">Add New Lesson</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Grade <span className="text-red-500">*</span>
              </label>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="Class 1">Class 1</option>
                <option value="Class 2">Class 2</option>
                <option value="Class 3">Class 3</option>
                <option value="Class 4">Class 4</option>
                <option value="Class 5">Class 5</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter material title"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                placeholder="Provide a detailed description"
                className="w-full p-2 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-blue-500"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Resources (Image Only){" "}
                <span className="text-red-500">*</span>
              </label>
              <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition">
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
                  {fileName ? fileName : "Drag & drop an image or click to browse"}
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition disabled:bg-blue-300 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Adding..." : "Add Lesson"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddLesson;
