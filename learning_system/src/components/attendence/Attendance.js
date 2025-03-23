import React, { useState, useEffect } from 'react';
import './Attendance.css';
import TeacherSidebar from '../TeaSidebar';

const Attendance = () => {
  // State for attendance data
  const [attendanceData, setAttendanceData] = useState({
    date: new Date().toISOString().split('T')[0], // Today's date in YYYY-MM-DD format
    students: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [apiStatus, setApiStatus] = useState({ status: 'idle', message: '' });
  const [students, setStudents] = useState([]);

  // Fetch students data
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        console.log('Fetching students data...');
        // const response = await fetch('http://localhost:5000/api/users/students');
        
        const user = localStorage.getItem('user'); // Get the school ID from local storage
        const schId = JSON.parse(user).schoolId;
        const response = await fetch(`http://localhost:5000/api/attendance/sch/${schId}`);
        // const response = await fetch('http://localhost:5000/api/students/school/67cc5370e98552e9b5a6e097');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch students: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('Students data:', data);
        
        if (data.success && data.data.students) {
          setStudents(data.data.students);
        } else {
          throw new Error('Invalid student data format');
        }
      } catch (err) {
        console.error('Error fetching students:', err);
        setError(`Failed to fetch students: ${err.message}`);
      }
    };
    
    fetchStudents();
  }, []);

  // Fetch attendance data from backend
  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        setLoading(true);
        setApiStatus({ status: 'loading', message: 'Fetching attendance data...' });
        
        console.log('Fetching attendance data from API...');
        const response = await fetch('http://localhost:5000/api/attendance');
        console.log('API Response:', response);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('API Error Response:', errorText);
          throw new Error(`Failed to fetch attendance data: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('API Data:', data);
        
        // If there are attendance records, use the most recent one
        if (data.attendance && data.attendance.length > 0) {
          setAttendanceData(data.attendance[0]);
          setApiStatus({ status: 'success', message: 'Data loaded successfully' });
        } else {
          console.log('No attendance records found, creating new record with students');
          
          // If students are loaded, create attendance data with them
          if (students.length > 0) {
            const newAttendanceData = {
              date: new Date().toISOString().split('T')[0],
              students: students.map(student => ({
                id: student._id,
                name: `${student.firstName} ${student.lastName}`,
                present: false
              }))
            };
            setAttendanceData(newAttendanceData);
            setApiStatus({ status: 'warning', message: 'No attendance records found, created new record' });
          } else {
            // If no students are loaded yet, use empty array
            setAttendanceData({
              date: new Date().toISOString().split('T')[0],
              students: []
            });
            setApiStatus({ status: 'warning', message: 'No students found' });
          }
        }
      } catch (err) {
        console.error('Error fetching attendance:', err);
        setError(err.message);
        setApiStatus({ status: 'error', message: err.message });
        
        // If students are loaded, create attendance data with them
        if (students.length > 0) {
          const newAttendanceData = {
            date: new Date().toISOString().split('T')[0],
            students: students.map(student => ({
              id: student._id,
              name: `${student.firstName} ${student.lastName}`,
              present: false
            }))
          };
          setAttendanceData(newAttendanceData);
        }
      } finally {
        setLoading(false);
      }
    };
    
    // Only fetch attendance after students are loaded
    if (students.length > 0) {
      fetchAttendance();
    }
  }, [students]);

  // Function to toggle attendance status
  const toggleAttendance = (studentId) => {
    setAttendanceData(prevData => ({
      ...prevData,
      students: prevData.students.map(student => 
        student.id === studentId 
          ? { ...student, present: !student.present } 
          : student
      )
    }));
  };

  // Function to save attendance data to backend
  const saveAttendance = async () => {
    try {
      setApiStatus({ status: 'loading', message: 'Saving attendance data...' });
      console.log('Saving attendance data:', JSON.stringify(attendanceData, null, 2));
      
      // Validate data before sending
      if (!attendanceData.date) {
        throw new Error('Date is missing from attendance data');
      }
      
      if (!attendanceData.students || !Array.isArray(attendanceData.students) || attendanceData.students.length === 0) {
        throw new Error('No student data available to save');
      }
      
      // Ensure all student IDs are strings
      const dataToSend = {
        ...attendanceData,
        students: attendanceData.students.map(student => ({
          ...student,
          id: String(student.id)
        }))
      };
      
      const response = await fetch('http://localhost:5000/api/attendance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });
      
      console.log('Save Response Status:', response.status, response.statusText);
      
      const responseText = await response.text();
      console.log('Save Response Text:', responseText);
      
      if (!response.ok) {
        throw new Error(`Failed to save attendance: ${response.status} ${response.statusText}\n${responseText}`);
      }
      
      let data;
      try {
        data = JSON.parse(responseText);
        console.log('Save Result:', data);
      } catch (e) {
        console.error('Error parsing response JSON:', e);
        throw new Error(`Invalid response format: ${responseText}`);
      }
      
      if (!data.success) {
        throw new Error(data.message || 'Unknown error occurred');
      }
      
      setApiStatus({ status: 'success', message: 'Attendance saved successfully!' });
      alert('Attendance saved successfully!');
    } catch (error) {
      console.error('Error saving attendance:', error);
      setApiStatus({ status: 'error', message: `Error: ${error.message}` });
      alert(`Failed to save attendance: ${error.message}`);
    }
  };

  // Function to format date for display
  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading && students.length === 0) return <div className="loading">Loading student data...</div>;

  return (
    <div className="attendance-page">
      {/* <header className="attendance-header">
        <div className="logo">
          <img src="/logo.png" alt="The Learning Tree" />
          <span>The Learning Tree</span>
        </div>
        <nav className="main-nav">
          <a href="/" className="nav-link">Home</a>
          <div className="nav-link dropdown">
            Teacher <span>▼</span>
          </div>
        </nav>
      </header> */}
      
      <div className="content-container">
        {/* <aside className="sidebar">
          <ul className="sidebar-menu">
            <li><a href="/meetings">Meetings</a></li>
            <li className="active"><a href="/attendance">Attendance</a></li>
            <li><a href="/lessons">Lessons</a></li>
            <li><a href="/progress">Progress</a></li>
            <li><a href="/qa">Q n A</a></li>
            <li><a href="/announcement">Announcement</a></li>
          </ul>
        </aside> */}
        <TeacherSidebar/>
        <main className="main-content">
          {apiStatus.status === 'error' && (
            <div className="api-error-banner">
              {apiStatus.message}
              <p>Using available student data instead.</p>
            </div>
          )}
          
          <div className="attendance-container">
            <div className="date-header">
              {formatDate(attendanceData.date)}
            </div>
            
            <div className="attendance-grid">
              <div className="column-headers">
                {/* <div className="student-header">Student Name</div> */}
                <div className="attendance-header">STUDENT NAME</div>
                <div className="attendance-header">ATTENDENCE</div>
              </div>
              
              {attendanceData.students.length === 0 ? (
                <div className="no-students-message">
                  No students found. Please add students to the system.
                </div>
              ) : (
                <div className="attendance-list">
                  {attendanceData.students.map(student => (
                    <div key={student.id} className="attendance-row">
                      <div className="student-name">
                      
                      <svg style={{ display: 'inline-block', width: '1.3rem'}}
                      xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      </svg>

                        <span style={{ marginLeft: 5}}>{student.name}</span>
                      </div>
                      <div className="attendance-toggle">
                        <label className="switch">
                          <input 
                            type="checkbox" 
                            checked={student.present}
                            onChange={() => toggleAttendance(student.id)}
                          />
                          <span className="slider round"></span>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <br/>
              <hr/>
            </div>
            
            <div className="action-buttons">
              <button 
                className="save-button" 
                onClick={saveAttendance}
                disabled={attendanceData.students.length === 0}
              >
                Save Attendance
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Attendance; 