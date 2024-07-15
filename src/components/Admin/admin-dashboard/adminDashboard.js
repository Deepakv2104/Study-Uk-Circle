import React, { useState, useEffect } from "react";
import Lottie from "react-lottie";
import animationData from "../../../assets/lotties/loader1.json";
import "./adminDashboard.css";
import Sidebar from "./layout-components/sidebar";
import Content from "./Content";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../auth/userProvider/AuthProvider";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [showSidebar, onSetShowSidebar] = useState(false);
  const [loading, setLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (auth.currentUser) {
          const db = getFirestore();
          const userDocRef = doc(db, "users", auth.currentUser.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            console.log(auth.currentUser.uid);
            console.log("User data:", userData);
            setUserData(userData);
          } else {
            console.log("User document does not exist");
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }

      // Simulate a delay (you can replace this with your actual data fetching logic)
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
      setInitialLoad(false);
    };

    fetchData();
  }, [auth]);

  // Render Sidebar and Content only when userData is not null
  const renderDashboardComponents = () => {
    if (userData) {
      return (
        <>
          <Sidebar
            onSidebarHide={() => {
              onSetShowSidebar(false);
            }}
            showSidebar={showSidebar}
            user={userData}
          />
          <Content
            onSidebarHide={() => {
              onSetShowSidebar(true);
            }}
            user={userData}
          />
        </>
      );
    } else {
      return <div>Loading...</div>;
    }
  };

  return (
    <div className="dashboard-container">
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
      ) : renderDashboardComponents()}
    </div>
  );
};

export default AdminDashboard;
