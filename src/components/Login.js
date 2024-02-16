import React, { useEffect, useState,useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, signInWithGoogle, logInWithEmailAndPassword } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

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
  const navigate = useNavigate();
  const formRef = useRef(null);
  const container = useRef(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/dashboard");
  }, [user, loading]);


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
  
  const handleLogin = async () => {
    try {
      await logInWithEmailAndPassword(email, password);
    } catch (error) {
      console.error("Authentication Error:", error);
      // Handle the error (e.g., show an error message to the user)
    }
  };

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
          <input
          type="text"
     
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
          </div>
          <div className="form-group">
          <input
          type="password"
      
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
          </div>
          <div className="form-action">
            <button className="login-button"   onClick={handleLogin}>Login</button>
          </div>
          <div className="new-user-check">
            <p>Not a member? <a href="/register">Sign up now</a></p>
          </div>
          <div className="login-options">
      <p>Or login with</p>
      <div className="option" onClick={signInWithGoogle}>
        <img src={googleSvg} alt="Google" />
      </div>
      <div className="option" onClick={() => console.log('Login with Google')}>
        <img src={linkedin} alt="LinkedIn" />
      </div>
      <div className="option" onClick={() => console.log('Login with Google')}>
        <img src={meta} alt="meta" />
      </div>
      </div>
      <div className="reset1">
          <Link to="/reset">Forgot Password</Link>
        </div>
        </form>
      
      </div>
      
    </div>
  );
};

export default LoginPage;
