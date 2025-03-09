import './App.css';
import AddAdminPage from './components/addAdmin/AddAdminPage';
import AddSchoolPage from './components/addSchool/AddSchoolPage';
import SuperAdminDashboard from './components/Announcement/SuperAdminAnnouncement/SuperAdminDashboard';
import TeacherDashboard from './components/Announcement/teacherAnnouncement/TeacherDashboard';
import Home from './components/homePage/Home'
import LoginPage from './components/loginPage/LoginPage';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/addadmin" element={<AddAdminPage />}/>
        <Route path="/addSchool" element={<AddSchoolPage />}/>
        <Route path= "/superadminannouncement" element={<SuperAdminDashboard/>}/>
        <Route path= "/teacherannouncement" element={<TeacherDashboard/>}/>
      </Routes>
    </Router>
  );
}

export default App;
