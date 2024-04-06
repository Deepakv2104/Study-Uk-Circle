import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UserProvider from "./auth/userProvider/AuthProvider";
import Testing from './components/Testing'
import Reset from "./components/reset";
import Welcome from "./components/Welcome";
import Login from "./components/LoginPage"; // Assuming you have a Login component
import Register from "./components/register";
import Dashboard from "./components/Admin/adminDashboard";
import EventUploadForm from "./components/Admin/EventUpload";
import Overview from "./components/Admin/Overview";
import SignIn from "./components/SignIn";
import LoginPage from "./components/LoginPage";
import YourComponent from "./components/home";
import HomePage from "./components/home";
import DetailsPage from "./components/Testing";
import { gsap } from 'gsap';
import PageTransition from "./components/home";
import QuizApp from "./components/QueryForm";
import CollegeUpload from "./components/Admin/CollgeUpload";
import UserDashboard from "./components/Student/UserDashboard";
import ExploreEvents from "./components/Student/ExploreEvents";
import Accommodation from './components/Student/Accommodation'
import University from "./components/Student/University";
import StudentProfile from "./components/Student/StudentProfile";
import AutoGrid from "./components/Student/EventDetails";
import EventDetails from "./components/Student/EventDetails";
import UniversityDetails from "./components/Student/UniversityDetails";
import Form from "./components/Testing";
import Explore from "./components/Student/Explore";
gsap.registerPlugin();
function App() {
  return (

      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/form" element={<QuizApp />} />
            <Route path="/details" element={<DetailsPage />} />
            <Route path = "/login"element={<LoginPage />} />
            <Route path = "/welcome"element={<Welcome />} />
            <Route path="/dashboard" element={<Dashboard />} >
            <Route path="/dashboard/overview" element={<Overview />} />
            <Route path="/dashboard/add-event" element={<EventUploadForm />} />
            <Route path="/dashboard/add-college" element={<CollegeUpload />} />
           
            </Route>
            <Route path="/user-dashboard" element={<UserDashboard/>} >
            <Route path="/user-dashboard/events" element={<ExploreEvents/>} />
            <Route path="/user-dashboard/events/testing" element={<Form/>} />
            <Route path="/user-dashboard/events/:eventId" element={<EventDetails/>} />
            <Route path="/user-dashboard/stay" element={<Accommodation/>} />
            <Route path="/user-dashboard/university" element={<University/>} />
            <Route path="/user-dashboard/university/university-name" element={<UniversityDetails/>} />
            <Route path="/user-dashboard/explore" element={<Explore/>} />
            <Route path="/user-dashboard/favorites" element={<Testing/>} />
            <Route path="/user-dashboard/settings/:userId" element={<StudentProfile/>} />
            
            </Route>

            <Route path="/event" element={<EventUploadForm />} />
          

            {/* Add more routes as needed */}
          </Routes>
        </div>
      </Router>
 
  );
}

export default App;
