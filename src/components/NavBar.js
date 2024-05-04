import { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import logo from '../assets/img/logo.svg';
import world from '../assets/img/world.svg';

import navIcon1 from '../assets/img/nav-icon1.svg';
import navIcon2 from '../assets/img/nav-icon2.svg';
import navIcon3 from '../assets/img/nav-icon3.svg';
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import { HashLink } from 'react-router-hash-link'; // Corrected import for HashLink

export const NavBar = () => {

  const navigate = useNavigate(); // Initialize useNavigate hook



  const handleJoinClick =()=>{
    navigate('/join-waiting-list')
}
  return (
    <div data-animation="default" data-collapse="medium" data-duration="400" data-easing="ease" data-easing2="ease" role="banner" class="navbar w-nav">
    <div class="w-layout-blockcontainer container w-container">
       
        <div class="navbar-contents">
            <div id="w-node-_06216545-40ad-bd51-1b83-2f6c6ddd3194-6ddd3191" class="brand"><a href="/" id="w-node-_06216545-40ad-bd51-1b83-2f6c6ddd3195-6ddd3191" aria-current="page" class="brand-link w-nav-brand w--current">
               
                <img src={logo} loading="lazy" alt="" class="heading-logo"/>
                </a>
                </div>
    
                <div id="w-node-_06216545-40ad-bd51-1b83-2f6c6ddd31cb-6ddd3191" class="nav-right">
                    <div class="menu-button w-nav-button"><img src="https://assets-global.website-files.com/65ed8eb0c8c77c845c67f1ff/65ed8eb0c8c77c845c67f274_menu%20icon%201.svg" loading="lazy" alt="" class="menu-icon" /></div>
                    <div class="nav-right-content desktop"><a href="/join-waiting-list" class="glass-button smaller w-button">Sign in</a><div >
                <div className="green-button-wrap">
                  <a  className="green-button with-icon" onClick={handleJoinClick}>
                    Join Now
                  </a>
                </div>
              </div>
                       
                    </div>
                </div>
        </div>
    </div>
</div>
  );
};
export default NavBar;