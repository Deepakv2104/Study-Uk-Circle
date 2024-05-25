import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import "./UserDashboard.css";
import { useAuth } from "../../auth/userProvider/AuthProvider";
import { getDoc, doc } from "firebase/firestore";
import { firestore } from "../../firebase";
import {  FaBars } from "react-icons/fa";
import Menu from "./Menu";
import RightContent from "./RightContent";
import animationData from "../../assets/lotties/loader1.json";
import Lottie from "react-lottie";
import Icon from "../Admin/small-comp/Icon";
import IconButton from "../Admin/small-comp/IconButton";

const UserDashboard = () => {
  const auth = useAuth();
  const [loading, setLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);
  const [userData, setUserData] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);

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

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <div className="user-dashboard">
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
        <>
          <button className="menu-toggle-button" onClick={toggleMenu}>
            <FaBars />
          </button>
          <Menu user={userData}  />
          <div className="content">
            <div className="left-content">
              <div className="w-full sm:flex p-2 items-end">
                <div className="sm:flex-grow flex justify-between">
                  <div>
                    <div className="flex items-center">
                      <div className="text-3xl font-bold text-white">
                        Hello {userData.name || "Guest"}
                      </div>
                      <div className="flex items-center p-2 bg-card ml-2 rounded-xl">
                        <Icon path="res-react-dash-premium-star" />
                      </div>
                    </div>
                  </div>
                  <IconButton
                    icon="res-react-dash-sidebar-open"
                    className="block sm:hidden"
                  />
                </div>
                {/* <div className="w-full sm:w-56 mt-4 sm:mt-0 relative">
                  <Icon
                    path="res-react-dash-search"
                    className="w-5 h-5 search-icon left-3 absolute"
                  />
                  <form action="#" method="POST">
                    <input
                      type="text"
                      name="company_website"
                      id="company_website"
                      className="pl-12 py-2 pr-2 block w-full rounded-lg border-gray-300 bg-card"
                      placeholder="search"
                    />
                  </form>
                </div> */}
              </div>
              {userData ? <Outlet user={[userData]} /> : <div>Loading...</div>}
            </div>
            <RightContent user={userData} />
          </div>
        </>
      )}
    </div>
  );
};

export default UserDashboard;
