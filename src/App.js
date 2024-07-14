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
import Jobs from "./components/Student/Jobs";
import AboutUsPage from "./components/AboutUsPage";
import IQAgentMiddleware from "./components/Student/IQAgentMiddleware";
import PrivacyPolicy from "./components/PrivacyPolicy";
import AuthComponent from "./components/Testing";
import DownloadExcel from "./components/FetchData";
import AddRestaurant from "./components/Admin/AddRestaurant";
import Restaurant from "./components/Student/RestaurantTabs";
import  SwipeCarousel  from "./components/Student/SwipeCarousel";
import Mentorship from "./components/Mentorship";
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
          <Route path="/testing" element={<AuthComponent />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />

          <Route path="/blank" element={<PageNotFound />} />
          <Route path="/join-waiting-list" element={<Join />} />
          <Route path="/mentorship" element={<Mentorship />} />
          <Route path="/write-to-us" element={<SmeForm />} />
          <Route path="/about-us" element={<AboutUsPage />} />

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
              <Route
                path="/dashboard/add-restaurant"
                role="admin"
                element={<AddRestaurant />}
              /></Route>
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
                path="/user-dashboard/fetchData"
                role="student"
                element={<DownloadExcel />}
              />
                 <Route
                path="/user-dashboard/swipe"
                role="student"
                element={<SwipeCarousel />}
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
                path="/user-dashboard/eventDetails/:eventId"
                element={<EventDetails />}
              />
              <Route
                path="/user-dashboard/stay"
                role="student"
                element={<IQAgentMiddleware />}
              />
              <Route
                path="/user-dashboard/university"
                role="student"
                element={<University />}
              />
              <Route
                path="/user-dashboard/jobs"
                role="student"
                element={<Jobs />}
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
                path="/user-dashboard/explore/:restaurantName"
                role="student"
                element={<Restaurant />}
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
