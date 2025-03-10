import React, { useState } from 'react';
import './Lessons.css'; // Importing the CSS file for styling

const Lessons = () => {
  // Hardcoded lessons data
  const [lessons] = useState([
    {
      id: 1,
      title: '1 Class',
      description: 'Introduction to Mathematics - Basic concepts of mathematics including numbers, operations, and problem-solving techniques.'
    },
    {
      id: 2,
      title: '2 Class',
      description: 'Language Arts Fundamentals - Introduction to reading, writing, and basic grammar concepts for young learners.'
    },
    {
      id: 3,
      title: '3 Class',
      description: 'Science Exploration - Exploring the natural world through hands-on experiments and observations.'
    },
    {
      id: 4,
      title: '4 Class',
      description: 'Social Studies Basics - Learning about communities, history, and geography in an engaging way.'
    },
    {
      id: 5,
      title: '5 Class',
      description: 'Art and Creativity - Developing artistic skills and creative expression through various mediums.'
    }
  ]);

  // State to track expanded lessons
  const [expandedLessons, setExpandedLessons] = useState({
    1: true,
    2: true,
    3: true,
    4: true,
    5: true
  });

  // Toggle lesson expansion
  const toggleLesson = (id) => {
    setExpandedLessons(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="lessons-page">
      <header className="lessons-header">
        <div className="logo">The Learning Tree</div>
        <nav className="main-nav">
          <a href="/" className="nav-link">Home</a>
          <div className="nav-link dropdown">
            Teacher <span>▼</span>
          </div>
        </nav>
      </header>
      
      <div className="content-container">
        <aside className="sidebar">
          <ul className="sidebar-menu">
            <li><a href="/meetings">Meetings</a></li>
            <li><a href="/attendance">Attendance</a></li>
            <li className="active"><a href="/lessons">Lessons</a></li>
            <li><a href="/progress">Progress</a></li>
            <li><a href="/qa">Q n A</a></li>
            <li><a href="/announcement">Announcement</a></li>
          </ul>
        </aside>
        
        <main className="main-content">
          {lessons.map((lesson) => (
            <div key={lesson.id} className="lesson-card">
              <div className="lesson-header">
                <h2>{lesson.title}</h2>
                <button 
                  className="expand-btn"
                  onClick={() => toggleLesson(lesson.id)}
                >
                  {expandedLessons[lesson.id] ? '▲' : '▼'}
                </button>
              </div>
              {expandedLessons[lesson.id] && (
                <div className="lesson-content">
                  <p>{lesson.description}</p>
                </div>
              )}
            </div>
          ))}
        </main>
      </div>
    </div>
  );
};

export default Lessons; 