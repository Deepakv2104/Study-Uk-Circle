import React, { useState, useEffect } from "react";
import "../styles/home.css"; // Import your CSS file
import { Banner } from "./Banner";
import BannerSections from "./BannerSections";
import Footer from "./Footer";
import AnimatedNav from "../components/Admin/Navbar";
import logo from "../assets/img/globe.png";
import infinity from '../assets/img/infinity.svg'
import enter from '../assets/img/enter.svg';

const HomePage = () => {
  const [animationStarted, setAnimationStarted] = useState(false);
  const [showComponents, setShowComponents] = useState(false);

  const startAnimation = () => {
    setAnimationStarted(true);
    // Add any additional logic or animations that should occur when animation starts
    // Set a timeout to show components after animation
    setTimeout(() => {
      setShowComponents(true);
    }, 1200); // Adjust the delay time as needed
  };

  return (
    <div>
      {!animationStarted && (
        // Show the initial animation
        <div className="enter-container">
          <div className="lc">
            <img src={logo} className="infi" alt="Logo" />
            <img src={enter} className="logo" alt="Enter" />
          </div>
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
        // Show the animated components
        <div>
          <div className="menu-overlay" id="menu"></div>
          <div className="bg-slide-accent"></div>
          <div className="bg-slide"></div>
          <div className="closemenu" id="closemenu"></div>

         
          {showComponents && (
            <div>
               <AnimatedNav/>
          <Banner />
          <BannerSections />
          <Footer />
            </div>

          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;
