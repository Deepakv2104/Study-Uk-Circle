import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Admin/admin-dashboard/adminDashboard";
import Overview from "./components/Admin/overview/Overview";
import LoginPage from "./components/Home/pages/LoginPage";
import FilterEventsPage from './components/Student/Events/FilterEventsPage'
import { gsap } from "gsap";
import CollegeUpload from "./components/Admin/universities/CollgeUpload";
import UserDashboard from "./components/Student/userdashboard/UserDashboard";
import EventsPage from "./components/Student/Events/EventsPage";
import University from "./components/Student/Universities/University";
import StudentProfile from "./components/Student/userProfile/StudentProfile";
import EventDetails from "./components/Student/Events/EventDetails";
import UniversityDetails from "./components/Student/Universities/UniversityDetails";
import Explore from "./components/Student/Explore/Explore";
import AddJobPost from "./components/Admin/jobs/AddJobPost";
import PrivateRoute from "./auth/PrivateRoute/PrivateRoute";
import PageNotFound from "./components/Home/pages/PageNotFound";
import NewHome from "./components/Home/pages/NewHome"
import Join from "./components/Home/pages/Join";
import SmeForm from './components/Home/pages/SmeForm';
import Jobs from "./components/Student/Jobs/Jobs";
import AboutUsPage from "./components/Home/pages/AboutUsPage";
import IQAgentMiddleware from "./components/Student/Accomodation/Accomodation";
// import AuthComponent from "./components/Testing";
import DownloadExcel from "./components/Admin/FetchData";
import AddRestaurant from "./components/Admin/restaurants/AddRestaurant";
import Restaurant from "./components/Student/Explore/RestaurantTabs";
import SwipeCarousel from "./components/Student/Explore/SwipeCarousel";
import Mentorship from "./components/Home/pages/Mentorship";
import UploadEventForm from "./components/Admin/events/UploadEvents";
import EventPage from "./components/Student/Events/sample";
import Success from "./components/CheckOutForm/Success";
import Failure from "./components/CheckOutForm/Failure";
import Maps from "./components/Student/Maps/Maps";
import MyBookings from "./components/Student/Bookings/MyBookings";
import Ambassador from "./components/Home/pages/Ambassador";
import GoogleMap from "./components/Student/Maps/GoogleMaps";
import GoogleMaps from "./components/Student/Maps/GoogleMaps";
import CheckoutDetails from "./components/Admin/events/Bookings";


gsap.registerPlugin();
function App() {
  return (
    <Router>
      <div className="App">

        <Routes>

          <Route path="/ambassador" element={<Ambassador />} />
          <Route path="/" element={<NewHome />} />
          {/* <Route path="/form" element={<QuizApp />} /> */}
          {/* <Route path="/details" element={<DetailsPage />} /> */}
          <Route path="/login" element={<LoginPage />} />
          {/* <Route path="/testing" element={<AuthComponent />} /> */}
          {/* <Route path="/privacy-policy" element={<PrivacyPolicy />} /> */}

          <Route path="/blank" element={<PageNotFound />} />
          <Route path="/join-waiting-list" element={<Join />} />
          <Route path="/mentorship" element={<Mentorship />} />
          <Route path="/write-to-us" element={<SmeForm />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/maps" element={<Maps />} />
          <Route path="/google" element={<GoogleMaps />} />


          {/* <Route path="/newHome" element={<NewHome/>} /> */}


          <Route exact path="/" element={<PrivateRoute role="admin" />}>
            <Route path="/dashboard" role="admin" element={<Dashboard />}>
              <Route
                path="/dashboard/overview"
                role="admin"
                element={<Overview />}
              />
              <Route
                path="/dashboard/events"
                role="admin"
                element={<UploadEventForm />}
              />
                  <Route
                path="/dashboard/bookings"
                role="admin"
                element={<CheckoutDetails />}
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
                path="/user-dashboard/success?session_id={CHECKOUT_SESSION_ID}"
                role="student"
                element={<Success />}
              />
              <Route
                path="/user-dashboard/success"
                role="student"
                element={<Success />}
              />
              <Route
                path="/user-dashboard/failure"
                role="student"
                element={<Failure />}
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
                element={<EventPage />}
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
                path="/user-dashboard/explore/:restaurantId"
                role="student"
                element={<Restaurant />}
              />
              <Route
                path="/user-dashboard/bookings"
                role="student"
                element={<MyBookings />}
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
