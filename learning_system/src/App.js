import Progress from "./components/progress/progress"

import './App.css';
import AddAdminPage from './components/addAdmin/AddAdminPage';
import AddSchoolPage from './components/addSchool/AddSchoolPage';
import SuperAdminDashboard from './components/Announcements/SuperAdminDashboard';
import TeacherDashboard from './components/Announcements/TeacherDashboard';
import StudentDashboard from './components/Announcements/StudentDashboard';
import AdminDashboard from './components/Announcements/AdminDashboard';
import Home from './components/homePage/Home';
import LoginPage from './components/loginPage/LoginPage';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegistrationPage from './components/registering/RegistrationPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/addadmin" element={<AddAdminPage />}/>
        <Route path="/addSchool" element={<AddSchoolPage />}/>
        <Route path="/registering" element={<RegistrationPage/>}/>
        <Route path= "/superadminannouncement" element={<SuperAdminDashboard/>}/>
        <Route path= "/adminannouncement" element={<AdminDashboard/>}/>
        <Route path= "/teacherannouncement" element={<TeacherDashboard/>}/>
        <Route path= "/studentannouncement" element={<StudentDashboard/>}/>
        <Route path="/progress" element={<Progress/>}/>
      </Routes>
    </Router>
  );
}

export default App

