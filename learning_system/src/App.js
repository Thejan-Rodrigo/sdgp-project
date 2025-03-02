import './App.css';
import AddAdminPage from './components/addAdmin/AddAdminPage';
import Home from './components/homePage/Home'
import LoginPage from './components/loginPage/LoginPage';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  const studentId = "650c7b3c8a2f8e12e45a1234"; // Replace with actual student ID from MongoDB

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/addadmin" element={<AddAdminPage />}/>
      </Routes>
    </Router>
  );
};

export default App;
