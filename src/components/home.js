import React, { useState, useEffect } from "react";
import gsap from 'gsap'; // Import GSAP here
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import "../styles/home.css"; 
import { Banner } from "./Banner";
import BannerSections from "./BannerSections";
import Footer from "./Footer";
import logo from "../assets/img/globe.png";
import infinity from '../assets/img/infinity.svg'
import enter from '../assets/img/enter.svg';

const HomePage = () => {
  const [animationStarted, setAnimationStarted] = useState(false);
  const [showComponents, setShowComponents] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate hook

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
    const tl = gsap.timeline({ defaults: { duration: 1, ease: 'expo.inOut' } });
    if (!isOpen) {
        tl.to('nav', { right: 0 })
          .to('nav', { height: '100vh' }, '-=.1')
          .to('nav ul li a', { opacity: 1, pointerEvents: 'all', stagger: .2 }, '-=.8')
          .to('.close', { opacity: 1, pointerEvents: 'all' }, "-=.8")
          .to('nav h2', { opacity: 1 }, '-=1');
    } else {
        tl.reverse();
    }
  };

  const startAnimation = () => {
    setAnimationStarted(true);
  
    setTimeout(() => {
      setShowComponents(true);
      setTimeout(() => {
        // Navigate to the 'welcome' path after animation with a delay of 1 second
        navigate('/welcome');
      }, 500); // Delay navigation by 1 second
    }, 1200);
  };
  

  return (
    <div>
      {!animationStarted && (
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
                  fill="none" 
                  stroke="#000" 
                  strokeWidth="0.5" 
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
          <div className="closemenu" id="closemenu"></div>
          
     
        </div>
      )}
    </div>
  );
};

export default HomePage;
