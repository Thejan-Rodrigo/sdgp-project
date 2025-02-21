import './App.css';
import AddAdminPage from './components/addAdmin/AddAdminPage';
import AddSchoolPage from './components/addSchool/AddSchoolPage';
import Home from './components/homePage/Home'
import LoginPage from './components/loginPage/LoginPage';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegistrationPage from './components/registering/RegistrationPage';
import TeacherMassage from './components/meeting/TeacherMassage';
import TeacherMeeting from './components/meeting/TeacherMeeting';
import ParentMeeting from './components/meeting/ParentMeeting';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/addadmin" element={<AddAdminPage />}/>
        <Route path="/addSchool" element={<AddSchoolPage />}/>
        <Route path="/registering" element={<RegistrationPage/>}/>
        <Route path="/teachermeeting" element={<TeacherMeeting/>}/>
        <Route path="/parentmeeting" element={<ParentMeeting/>}/>
      </Routes>
    </Router>
  );
}

export default App;
