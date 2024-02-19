import React, { useRef } from 'react';
import { useNavigate } from "react-router-dom";
import gsap from 'gsap';
import './Navbar.css'

const AnimatedNav = () => {
  const navigate = useNavigate();
    const navRef = useRef(null);
    const tl = gsap.timeline({ defaults: { duration: 1, ease: 'expo.inOut' } });
  
    const handleOpenNav = () => {
        console.log('opened')
        if (tl.reversed()) {
          tl.play();
        } else {
          tl.to(navRef.current, { right: 0 })
            .to(navRef.current, { height: '100vh' }, '-=.1')
            .to('nav ul li a', { opacity: 1, pointerEvents: 'all', stagger: .2 }, '-=.8')
            .to('.close', { opacity: 1, pointerEvents: 'all' }, '-=0.8')
            .to('.nav-title', { opacity: 1 }, '-=1')
            .to('nav h2', { opacity: 1 }, '-=1')
            .play(); // Add this line to play the timeline
        }
      };
    const handleCloseNav = () => {
      tl.reverse();
    };
    const handleLogin = () => {
      console.log("clicked");
      navigate('/login');
    };


  
    return (
      <div>
        <div className='b'>
        
        <div className="nav-container" onClick={handleOpenNav}>
          <div className="nav-bars">
            
          </div>
         
        </div>
    
    
     
  
        <nav ref={navRef}>
        <h2 className='nav-title'>LOGO</h2>

          <div className="close" onClick={handleCloseNav}>
            <div></div>
          </div>
          <ul>
            <li className="nav-item"><a >HOME</a></li>
            <li className="nav-item"><a >EVENTS</a></li>
            <li className="nav-item"><a >INTERNSHIPS</a></li>
            <li className="nav-item"><a>GALLARY</a></li>
            <li className="nav-item" onClick={handleLogin}><a >LOGIN</a></li>
          </ul>
        </nav>
      </div>
      </div>
    );
  };
  
  export default AnimatedNav;
