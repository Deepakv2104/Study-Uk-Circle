import React, { useState } from "react";
import "../styles/home.css"; // Import your CSS file
import { Banner } from "./Banner";
import BannerSections from "./BannerSections";
import Gallary from "./Gallary";
import { Contact } from "./Contact";
import Footer from "./Footer";
import AnimatedNav from "../components/Admin/Navbar";
import video1 from "../assets/img/video1.mp4";
import DetailsPage from "./Testing";
import logo from "../assets/img/logoT.svg";
import infinity from '../assets/img/infinity.svg'
import enter from '../assets/img/enter.svg';
const HomePage = () => {
  const [animationStarted, setAnimationStarted] = useState(false);

  const openMenu = () => {
    document.getElementById("menu").style.left = "0";
    document.getElementById("closemenu").style.display = "block";
    document.getElementById("lineone").style.top = "0.8em";
    document.getElementById("linethree").style.top = "0.8em";
    document.getElementById("linetwo").style.opacity = "0";
    document.getElementById("lineone").style.transform = "rotate(-405deg)";
    document.getElementById("linethree").style.transform = "rotate(405deg)";
    document.getElementById("linethree").style.background = "white";
    document.getElementById("lineone").style.background = "white";
  };

  const closeMenu = () => {
    document.getElementById("closemenu").style.display = "none";
    document.getElementById("lineone").style.top = "0";
    document.getElementById("linethree").style.top = "1.6em";
    document.getElementById("linetwo").style.opacity = "1";
    document.getElementById("lineone").style.transform = "rotate(0deg)";
    document.getElementById("linethree").style.transform = "rotate(0deg)";
    document.getElementById("menu").style.left = "100vw";
    document.getElementById("linethree").style.background = "black";
    document.getElementById("lineone").style.background = "black";
  };

  const startAnimation = () => {
    setAnimationStarted(true);
    // Add any additional logic or animations that should occur when animation starts
  };

  return (
    <div>
      {!animationStarted && (
        <div className="enter-container">
          <img src={enter} className="logo" />

          <img src={infinity} className="infi" />
          <button className="enter-button" onClick={startAnimation}>
            <span>ENTER</span>
            <div className="icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
               <path
  fill="none"  /* Set fill to "none" */
  stroke="#000" /* Set the stroke color */
  strokeWidth="0.5" /* Set the stroke width as needed */
  fillRule="evenodd"
  clipRule="evenodd"
  d="M12 18.586c0 .89 1.077 1.337 1.707.707l6.586-6.586a1 1 0 0 0 0-1.414l-6.586-6.586c-.63-.63-1.707-.184-1.707.707v13.172ZM3 12a2 2 0 1 0 4 0 2 2 0 0 0-4 0Z"
/>

              </svg>
            </div>
          </button>
        </div>
      )}
      {animationStarted && (
        <div>
          <div className="menu-overlay" id="menu"></div>
          <div className="bg-slide-accent"></div>
          <div className="bg-slide"></div>
          <div className="closemenu" id="closemenu" onClick={closeMenu}></div>

          {/* <AnimatedNav/> */}
          <Banner />
          <BannerSections />
          {/* <Gallary/>
        <Contact/> */}
          <Footer />
          {/* <Footer/> */}
        </div>
      )}
    </div>
  );
};
export default HomePage;
