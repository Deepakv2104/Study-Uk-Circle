import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate, outlet } from "react-router-dom";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../auth/userProvider/AuthProvider";
import Lottie from "react-lottie";
import gsap from "gsap";
import lottie from "lottie-web";
import animationData from "../assets/lotties/students.json";
import logo from "../assets/img/logo.svg";
import googleSvg from "../assets/img/googleSvg.svg";
import linkedin from "../assets/img/linkedin.svg";
import meta from "../assets/img/meta.svg";
import "../styles/Login.css";
import { firestore } from "../firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getDoc, doc, setDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import Register from "./register";

const LoginPage = () => {
  const navigate = useNavigate();
  const container = useRef(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();
  const [showSignUpForm, setShowSignUpForm] = useState(false);

  const [user, loading] = useAuthState(auth);

  const provider = new GoogleAuthProvider();

  // useEffect(() => {
  //   if (loading) {

  //     return;
  //   }
  //   if (user) navigate("/dashboard");
  // }, [user, loading, navigate]);

  useEffect(() => {
    const animation = lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData,
    });

    gsap.fromTo(
      container.current,
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 1, ease: "power3.out", delay: 0.5 }
    );

    return () => {
      animation.destroy();
    };
  }, []);

  const fetchUserData = async (uid) => {
    const userDoc = await getDoc(doc(firestore, "users", uid));
    return userDoc.exists() ? userDoc.data() : null;
  };

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged(async (user) => {
  //     if (user) {
  //       const userData = await fetchUserData(user.uid);

  //       if (userData?.role === "student") {
  //         navigate("/dashboard/overview");
  //       } else {
  //         console.log("User is not a student", userData);
  //       }
  //     } else {
  //       console.log("User is not logged in");
  //     }
  //   });

  //   return () => unsubscribe();
  // }, [auth, navigate]);

  const toggleSignUpForm = () => {
    setShowSignUpForm(!showSignUpForm);
  };

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Assuming you have a function to fetch user data based on UID
      const userData = await fetchUserData(user.uid);
  
      if (userData?.role === "admin") {
        navigate("/dashboard/overview");
      } else if (userData?.role === "student") {
        navigate("/user-dashboard/events");
      } else {
        await signOut(auth);
        throw new Error("Access denied: User is not a student or admin");
      }
  
      toast.success("Login successful!", {
        position: "top-right",
        autoClose: 1200,
      });
    } catch (error) {
      console.error(error);
      toast.error("Invalid credentials. Please try again.", {
        position: "top-center",
        autoClose: 1500,
      });
    }
  };
  

  const handleGoogleLogin = async () => {
    try {
        // Sign in with Google
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        // Check if the user is already registered in Firestore
        const userDoc = await getDoc(doc(firestore, "users", user.uid));

        if (userDoc.exists()) {
            // If the user document exists, check the user role
            const userData = userDoc.data();
            if (userData.role === "admin") {
                // If the role is 'admin', navigate to the admin dashboard
                navigate("/dashboard/overview");
            } else if (userData.role === "student") {
                // If the role is 'student', navigate to the user dashboard
                navigate("/user-dashboard/events");
            }
        } else {
            // If the user is not registered, add user details to Firestore with role set to 'student'
            const userDocRef = doc(firestore, "users", user.uid);
            await setDoc(userDocRef, {
                userId: user.uid,
                role: "student", // Set the user role to 'student'
                email: user.email,
                name: user.displayName,
            });

            // Display success toast for registration
            toast.success("Registration successful!");
            
            // Navigate to the user dashboard
            navigate("/user-dashboard/events");
        }

        // Display success toast for login
        toast.success("Login with Google successful!");
    } catch (error) {
        // Display error toast
        toast.error(`Error: ${error.message}`);
    }
};


  const handleSignUp = async () => {
    try {
      // 1. Create a new user with Firebase Authentication
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { user } = userCredential;
  
      // 2. Add user details to Firestore with role set to 'student'
      const userDocRef = doc(firestore, "users", user.uid);
      await setDoc(userDocRef, {
        userId: user.uid,
        role: "student", // Set the user role to 'student'
        email: email,
        password: password,
        name: name,
      });
  
      // Show success toast
      toast.success("Signup successful!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
  
      // Refresh the page
      window.location.reload();
    } catch (error) {
      // Show error toast
      toast.error(`Signup failed: ${error.message}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
  
      console.error("Error signing up:", error.message);
    }
  };
  

  return (
    <div className="login-page">
      <div className="lottie-container">
        <img
          src={logo}
          alt="Logo"
          style={{ maxWidth: "100px", margin: "20px" }}
        />
        <div ref={container}></div>
      </div>
      <div className="login-form">
        {showSignUpForm ? (
          <form>
            <h1 className="form-title">SignUp</h1>
            <div className="form-group">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)} // Corrected
                placeholder="Name"
                autoComplete="username"
              />
            </div>
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
              <button
                type="button"
                className="login-button"
                onClick={handleSignUp}
              >
               Register
              </button>
            </div>
            <div className="new-user-check">
              <p>
                {showSignUpForm ? "Already a member? " : "Not a member? "}
                <span onClick={toggleSignUpForm}>
                  {showSignUpForm ? "Login now" : "Sign up now"}
                </span>
              </p>
            </div>
            <div className="login-options">
              <p>Or login with</p>
              <div className="option" onClick={handleGoogleLogin}>
                <img src={googleSvg} alt="Google" />
              </div>
              <div
                className="option"
                onClick={() => console.log("Login with LinkedIn")}
              >
                <img src={linkedin} alt="LinkedIn" />
              </div>
              <div
                className="option"
                onClick={() => console.log("Login with Meta")}
              >
                <img src={meta} alt="Meta" />
              </div>
            </div>
            <div className="reset1">
              <Link to="">Forgot Password</Link>
            </div>
          </form>
        ) : (
          // Render login form when showSignUpForm is false
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
              <button
                type="button"
                className="login-button"
                onClick={handleLogin}
              >
                Login
              </button>
            </div>
            <div className="new-user-check">
              <p>
                {showSignUpForm ? "Already a member? " : "Not a member? "}
                <span onClick={toggleSignUpForm}>
                  {showSignUpForm ? "Login now" : "Sign up now"}
                </span>
              </p>
            </div>
            <div className="login-options">
              <p>Or login with</p>
              <div className="option" onClick={handleGoogleLogin}>
                <img src={googleSvg} alt="Google" />
              </div>
              <div
                className="option"
                onClick={() => console.log("Login with LinkedIn")}
              >
                <img src={linkedin} alt="LinkedIn" />
              </div>
              <div
                className="option"
                onClick={() => console.log("Login with Meta")}
              >
                <img src={meta} alt="Meta" />
              </div>
            </div>
            <div className="reset1">
              <Link to="">Forgot Password</Link>
            </div>
          </form>
        )}

        {/* ... (remaining components) */}
      </div>

      <ToastContainer />
    </div>
  );
};

export default LoginPage;
