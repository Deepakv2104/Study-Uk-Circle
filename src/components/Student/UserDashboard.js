import React, { useEffect ,useState} from "react";
import { Outlet } from "react-router-dom";
import "./UserDashboard.css";
import ExploreEvents from "./ExploreEvents";
import { useAuth } from "../../auth/userProvider/AuthProvider";
import { getFirestore, doc, getDoc } from "firebase/firestore";

import {
  FaSearch
} from "react-icons/fa";
import Menu from "./Menu";
import RightContent from "./RightContent";

const UserDashboard = () => {
  const auth = useAuth();
  const [showSidebar, onSetShowSidebar] = useState(false);
  const [loading, setLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    console.log("Inside useEffect");
  
    const fetchData = async () => {
      try {
        console.log("Fetching user data...");
  
        if (auth.currentUser) {
          console.log("Current user found:", auth.currentUser.uid);
  
          const db = getFirestore();
          const userDocRef = doc(db, "users", auth.currentUser.uid);
          const userDoc = await getDoc(userDocRef);
  
          if (userDoc.exists()) {
            console.log("User document exists");
            console.log("User data:", userDoc.data());
  
            setUserData(userDoc.data());
          } else {
            console.log("User document does not exist");
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
  
      // Simulate a delay (you can replace this with your actual data fetching logic)
      console.log("Simulating delay...");
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Delay finished");
      
      setLoading(false);
      setInitialLoad(false);
    };
  
    if (auth !== null) {
      fetchData();
    }
  }, [auth]);
  
  

  return (
    <div className="user-dashboard">
      <Menu user={userData} />
      <div className="content">
        <div className="left-content">
          <div className="search-and-check">
            <form className="search-box">
              <input type="text" placeholder="Search event..." />
              <FaSearch style={{ position: 'relative', top: '5px', left: '-25px', zIndex: '1' }} />
            </form>
          </div>
          <Outlet user={userData} /> {/* Pass userData as a prop */}
        </div>
        <RightContent user={userData} />
      </div>
    </div>
  );
};

export default UserDashboard;
