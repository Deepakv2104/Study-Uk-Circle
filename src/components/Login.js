import React, { useEffect, useRef } from 'react';
import Lottie from 'react-lottie';
import gsap from 'gsap';
import lottie from "lottie-web";
import animationData from '../assets/lotties/students.json';
import logo from '../assets/img/logo.svg';
import googleSvg from '../assets/img/googleSvg.svg'
import linkedin from '../assets/img/linkedin.svg'
import meta from '../assets/img/meta.svg'
import '../styles/Login.css'
const LoginPage = () => {
  const formRef = useRef(null);
  const container = useRef(null);


  useEffect(() => {
    // Assuming 'container' is the ref to your Lottie container
    const animation = lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData,
    });
  
    // GSAP Animation for the container
    gsap.fromTo(container.current, 
      { opacity: 0, scale: 0.5 }, // Start state
      { opacity: 1, scale: 1, duration: 1, ease: 'power3.out', delay: 0.5 } // End state and animation properties
    );
  
    return () => {
      animation.destroy(); // Cleanup the animation when the component is unmounted
    };
  }, []);
  


  return (
    <div className="login-page" >
  <div className="lottie-container" >
        <img src={logo} alt="Logo" style={{ maxWidth: "100px", margin:'20px' }} />
        <div ref={container}></div>
      </div>
      <div className="login-form" >
        <form>
          <h1 className="form-title">Login</h1>
          <div className="form-group">
            <input type="email" id="email" name="email" placeholder="Email" required />
          </div>
          <div className="form-group">
            <input type="password" id="password" name="password" placeholder="Password" required />
          </div>
          <div className="form-action">
            <button type="submit" className="login-button">Login</button>
          </div>
          <div className="new-user-check">
            <p>Not a member? <a href="/register">Sign up now</a></p>
          </div>
          <div className="login-options">
      <p>Or login with</p>
      <div className="option" onClick={() => console.log('Login with Google')}>
        <img src={googleSvg} alt="Google" />
      </div>
      <div className="option" onClick={() => console.log('Login with Google')}>
        <img src={linkedin} alt="LinkedIn" />
      </div>
      <div className="option" onClick={() => console.log('Login with Google')}>
        <img src={meta} alt="meta" />
      </div>
      </div>
        </form>
      
      </div>
      
    </div>
  );
};

export default LoginPage;
