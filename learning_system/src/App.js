import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import './App.css';
import Progress from "./components/progress/progress";
import AddAdminPage from './components/addAdmin/AddAdminPage';
import AddSchoolPage from './components/addSchool/AddSchoolPage';
import SuperAdminDashboard from './components/Announcements/SuperAdminDashboard';
import TeacherDashboard from './components/Announcements/TeacherDashboard';
import StudentDashboard from './components/Announcements/StudentDashboard';
import AdminDashboard from './components/Announcements/AdminDashboard';
import Home from './components/homePage/Home';
import AboutUs from './components/homePage/AboutUs';
import LoginPage from './components/loginPage/LoginPage';
import RegistrationPage from './components/registering/RegistrationPage';
import TeacherMassage from './components/meeting/TeacherMassage';
import TeacherMeeting from './components/meeting/TeacherMeeting';
import ParentMeeting from './components/meeting/ParentMeeting';
import { useAuth } from './context/AuthContext'; // Import useAuth

// ProtectedRoute component
const ProtectedRoute = ({ allowedRoles, element }) => {
  const { user } = useAuth(); // Get the user from AuthContext

  // If the user is not logged in or their role is not allowed, redirect to home
  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  // If the user has the required role, render the element
  return element;
};

import StudentProfile from './components/studentProfilePage/studentProfilePage';
import TeacherSProfile from './components/studentProfilePage/teacherSProfile';
import AdminSProfile from "./components/studentProfilePage/adminSProfile";

const App = () => {
  

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path= "/superadminannouncement" element={<SuperAdminDashboard/>}/>
        <Route path= "/adminannouncement" element={<AdminDashboard/>}/>
        <Route path= "/teacherannouncement" element={<TeacherDashboard/>}/>
        <Route path= "/studentannouncement" element={<StudentDashboard/>}/>
        <Route path="/progress" element={<Progress/>}/>
        <Route path="/aboutus" element={<AboutUs/>}/>
        <Route path="/studentprofile" element={<StudentProfile />}/>
        <Route path="/teacherSProfile" element={<TeacherSProfile />}/>
        <Route path="/adminSProfile" element={<AdminSProfile />}/>
        <Route path="/teachermeeting" element={<TeacherMeeting/>}/>
        <Route path="/parentmeeting" element={<ParentMeeting/>}/> 

        {/* Role-protected routes */}
        <Route
          path="/addadmin"
          element={
            <ProtectedRoute
              allowedRoles={['superadmin']}
              element={<AddAdminPage />}
            />
          }
        />
        <Route
          path="/addSchool"
          element={
            <ProtectedRoute
              allowedRoles={['superadmin']}
              element={<AddSchoolPage />}
            />
          }
        />
        <Route
          path="/registering"
          element={
            <ProtectedRoute
              allowedRoles={['admin']}
              element={<RegistrationPage />}
            />
          }
        />
        <Route
          path="/progress"
          element={
            <ProtectedRoute
              allowedRoles={['teacher']}
              element={<Progress />}
            />
          }
        />
        <Route
          path="/teachermeeting"
          element={
            <ProtectedRoute
              allowedRoles={['teacher']}
              element={<TeacherMeeting />}
            />
          }
        />
        <Route
          path="/parentmeeting"
          element={
            <ProtectedRoute
              allowedRoles={['parent']}
              element={<ParentMeeting />}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;