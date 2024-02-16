import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UserProvider from "./auth/userProvider/userProvider";
import Testing from './components/Testing'
import Reset from "./components/reset";
import Welcome from "./components/Welcome";
import Login from "./components/Login"; // Assuming you have a Login component
import Register from "./components/register";
import Dashboard from "./components/Admin/adminDashboard";

function App() {
  return (

      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/testing" element={<Testing />} />
            <Route path="/register" element={<Register />} />
            <Route exact path="/reset" element={<Reset />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            {/* Add more routes as needed */}
          </Routes>
        </div>
      </Router>
 
  );
}

export default App;
