import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Admin/adminDashboard";
import EventUploadForm from "./components/Admin/EventUpload";
import Overview from "./components/Admin/Overview";
import LoginPage from "./components/LoginPage";
import FilterEventsPage from './components/Student/FilterEventsPage'
// import DetailsPage from "./components/Testing";
import { gsap } from "gsap";
import CollegeUpload from "./components/Admin/CollgeUpload";
import UserDashboard from "./components/Student/UserDashboard";
import EventsPage from "./components/Student/EventsPage";
import Accommodation from "./components/Student/Accommodation";
import University from "./components/Student/University";
import StudentProfile from "./components/Student/StudentProfile";
import EventDetails from "./components/Student/EventDetails";
import UniversityDetails from "./components/Student/UniversityDetails";
import Explore from "./components/Student/Explore";
import Favorites from "./components/Student/Favorites";
import AddJobPost from "./components/Admin/AddJobPost";
import PrivateRoute from "./auth/PrivateRoute/PrivateRoute";
import PageNotFound from "./components/PageNotFound";
import NewHome from "./components/NewHome"
import Join from "./components/Join";
import SmeForm from './components/SmeForm';

gsap.registerPlugin();
function App() {
  return (
    <Router>
      <div className="App">
  
        <Routes>
          
          <Route path="/" element={<NewHome />} />
          {/* <Route path="/form" element={<QuizApp />} /> */}
          {/* <Route path="/details" element={<DetailsPage />} /> */}
          <Route path="/login" element={<LoginPage />} />
          {/* <Route path="/welcome" element={<Welcome />} /> */}
          <Route path="/blank" element={<PageNotFound />} />
          <Route path="/join-waiting-list" element={<Join />} />
          <Route path="/write-to-us" element={<SmeForm />} />

          {/* <Route path="/newHome" element={<NewHome/>} /> */}


          <Route exact path="/" element={<PrivateRoute role="admin" />}>
            <Route path="/dashboard" role="admin" element={<Dashboard />}>
              <Route
                path="/dashboard/overview"
                role="admin"
                element={<Overview />}
              />
              <Route
                path="/dashboard/add-event"
                role="admin"
                element={<EventUploadForm />}
              />
              <Route
                path="/dashboard/add-college"
                role="admin"
                element={<CollegeUpload />}
              />
              <Route
                path="/dashboard/add-job-post"
                role="admin"
                element={<AddJobPost />}
              />
            </Route>
          </Route>

          <Route path="/" element={<PrivateRoute role="student" />}>
            <Route
              path="/user-dashboard"
              role="student"
              element={<UserDashboard />}
            >
              <Route
                path="/user-dashboard/events"
                role="student"
                element={<EventsPage />}
              />
          
          <Route
                path="/user-dashboard/events/all-events/:eventCategory"
                role="student"
                element={<FilterEventsPage />}
              />
                <Route
                path="/user-dashboard/events/all-events"
                role="student"
                element={<FilterEventsPage />}
              />
                 <Route
                path="/user-dashboard/events/all-events/:eventCategory/:eventId"
                role="student"
                element={<EventDetails />}
              />
              <Route
                path="/user-dashboard/events/:eventId"
                element={<EventDetails />}
              />
              <Route
                path="/user-dashboard/stay"
                role="student"
                element={<Accommodation />}
              />
              <Route
                path="/user-dashboard/university"
                role="student"
                element={<University />}
              />
              <Route
                path="/user-dashboard/university/:universityId"
                role="student"
                element={<UniversityDetails />}
              />
              <Route
                path="/user-dashboard/explore"
                role="student"
                element={<Explore />}
              />
              <Route
                path="/user-dashboard/favorites"
                role="student"
                element={<Favorites />}
              />
              <Route
                path="/user-dashboard/settings/:userId"
                role="student"
                element={<StudentProfile />}
              />
            </Route>
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
