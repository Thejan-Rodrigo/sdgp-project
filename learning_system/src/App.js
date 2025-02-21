import './App.css';
import AddAdminPage from './components/addAdmin/AddAdminPage';
import Home from './components/homePage/Home'
import LoginPage from './components/loginPage/LoginPage';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ParentChat from './components/q&a/ParentSide/ParentChat';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/addadmin" element={<AddAdminPage />}/>
        <Route path="/parentq&a" element={<ParentChat/>}/>
      </Routes>
    </Router>
  );
}

export default App;
