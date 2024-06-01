import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import "./UserDashboard.css";
import { useAuth } from "../../auth/userProvider/AuthProvider";
import { getDoc, doc } from "firebase/firestore";
import { firestore } from "../../firebase";
import animationData from "../../assets/lotties/loader1.json";
import Lottie from "react-lottie";
import Menu from './Menu.js';

const UserDashboard = () => {
  const auth = useAuth();
  const [loading, setLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (!auth) return;

    const fetchData = async () => {
      try {
        console.log("Fetching user data...");

        // Fetch user data from Firestore
        const userDocRef = doc(firestore, "users", auth.currentUser.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          console.log("User document exists");
          console.log("User data:", userDoc.data());

          setUserData(userDoc.data());
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
