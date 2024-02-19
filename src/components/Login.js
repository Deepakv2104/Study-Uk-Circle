import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth,logInWithEmailAndPassword ,signInWithGoogle} from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Lottie from 'react-lottie';
import gsap from 'gsap';
import lottie from "lottie-web";
import animationData from '../assets/lotties/students.json';
import logo from '../assets/img/logo.svg';
import googleSvg from '../assets/img/googleSvg.svg';
import linkedin from '../assets/img/linkedin.svg';
import meta from '../assets/img/meta.svg';
import '../styles/Login.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const container = useRef(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/dashboard");
  }, [user, loading, navigate]);

  useEffect(() => {
    const animation = lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData,
    });

    gsap.fromTo(container.current,
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 1, ease: 'power3.out', delay: 0.5 }
    );

    return () => {
      animation.destroy();
    };
  }, []);

  const handleLogin = async () => {
    try {
      await logInWithEmailAndPassword(email, password);
      // Navigate to dashboard after successful login
      navigate("/dashboard/overview");
      // Display success toast
      toast.success('Login successful!', { position: 'top-right', autoClose: 1500 });
    } catch (error) {
      console.error("Authentication Error:", error);
      // Handle the error (e.g., show an error message to the user)
      toast.error('Invalid credentials. Please try again.', { position: 'top-center', autoClose: 1500 });
    }
  };

  return (
    <div className="login-page">
      <div className="lottie-container">
        <img src={logo} alt="Logo" style={{ maxWidth: "100px", margin: '20px' }} />
        <div ref={container}></div>
      </div>
      <div className="login-form">
        <form>
          <h1 className="form-title">Login</h1>
          <div className="form-group">
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail Address"
              autoComplete="username"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              autoComplete="current-password"
            />
          </div>
          <div className="form-action">
            <button className="login-button" onClick={handleLogin}>Login</button>
          </div>
          <div className="new-user-check">
            <p>Not a member? <Link to="/register">Sign up now</Link></p>
          </div>
          <div className="login-options">
            <p>Or login with</p>
            <div className="option" onClick={signInWithGoogle}>
              <img src={googleSvg} alt="Google" />
            </div>
            <div className="option" onClick={() => console.log('Login with LinkedIn')}>
              <img src={linkedin} alt="LinkedIn" />
            </div>
            <div className="option" onClick={() => console.log('Login with Meta')}>
              <img src={meta} alt="Meta" />
            </div>
          </div>
          <div className="reset1">
            <Link to="/reset">Forgot Password</Link>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
