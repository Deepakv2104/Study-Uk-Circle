import React, { useEffect } from 'react';
import gsap from 'gsap'; // Import GSAP library
import './Navbar.css'; // Import CSS file
import NewHome from '../NewHome';
import logo from "../../assets/img/logo.svg";

const AnimatedNav = () => {
  useEffect(() => {
    const open = document.querySelector('.container1');
    const close = document.querySelector('.close');

    // GSAP timeline setup
    const tl = gsap.timeline({ defaults: { duration: 1, ease: 'expo.inOut' } });

    open.addEventListener('click', () => {
      if (tl.reversed()) {
        tl.play();
      }else {
				tl.to('nav', { right: 0 })
					.to('nav', { height: '100vh' }, '-=.1')
					.to('nav ul li a', { opacity: 1, pointerEvents: 'all', stagger: .2 }, '-=.8')
					.to('.close', { opacity: 1, pointerEvents: 'all' }, "-=.8")
					.to('nav ch', { opacity: 1 }, '-=1');
			}
		});

    close.addEventListener('click', () => {
      tl.reverse();
    });

    // Cleanup event listeners
    return () => {
      open.removeEventListener('click', () => {});
      close.removeEventListener('click', () => {});
    };
  }, []); // Empty dependency array to ensure the effect runs only once

  return (
    <div className="animatedNav">
     <div className="container1 ">
  {/* <img src={logo} alt="Logo" loading='lazy' className="logo1" /> */}
  <div className="bars">

  </div>
</div>


      <div className='ch'>
        <NewHome/>
      </div>
     
      <nav>
        <h2>WorldLynk</h2>
        <div className="close">
          <div></div>
        </div>
        <ul>
          <li><p>Home</p></li>
          <li><p >pbout</p></li>
          <li><p>Pprtnership</p></li>
          <li><p>Sign In</p></li>
        </ul>
      </nav>
    </div>
  );
};

export default AnimatedNav;
