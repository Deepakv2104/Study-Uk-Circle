import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import "../../../styles/UserDashboard.css";
import { useAuth } from "../../../auth/userProvider/AuthProvider.js";
import { getDoc, doc } from "firebase/firestore";
import { firestore } from "../../../firebase.js";
import animationData from "../../../assets/lotties/loader1.json";
import Lottie from "react-lottie";
import Menu from './sidebar/Menu.js';

const UserDashboard = () => {
  const auth = useAuth();
  const [loading, setLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (!auth || !auth.currentUser) return;

    const fetchData = async () => {
      try {
        console.log("Fetching user data...");

        // Fetch user data from Firestore
        const userDocRef = doc(firestore, "users", auth.currentUser.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          console.log("User document exists");
          const data = userDoc.data();
          console.log("User data:", data);

          setUserData(data);

          // Store user data in localStorage directly from the fetched data
          localStorage.setItem('userData', JSON.stringify(data));
        } else {
          console.log("User document does not exist");
        }
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }

      setLoading(false);
      setInitialLoad(false);
    };

    fetchData();
  }, [auth]);

  return (
    <div className="user-dashboard">
      <Menu className="menu" user={userData}/>
      {initialLoad ? (
        <div className="overlay-container">
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData: animationData,
            }}
            height={200}
            width={200}
          />
        </div>
      ) : loading ? (
        null
      ) : (
        <div className="content">
          {userData ? <Outlet context={{ user: userData }} /> : <div>Loading...</div>}
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
