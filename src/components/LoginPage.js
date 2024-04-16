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
import { GoogleAuthProvider } from "firebase/auth";

import { getAuth, signInWithEmailAndPassword, signInWithPopup,createUserWithEmailAndPassword } from "firebase/auth";
import { getDoc, doc, setDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import Register from "./register";

const LoginPage = () => {
  const {
    
    getUserRole,
  
  } = useAuth();
  const navigate = useNavigate();
  const container = useRef(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  // const auth = getAuth();
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const [step, setStep] = useState(1); // State to track the current step
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    studentStatus: '', // 'student' or 'non-student'
    studentType: '', // 'international' or 'home' (if student)
    professionalStatus: '', // 'working' or 'looking' (if non-student)
    university: '',
    graduationYear: '',
    universityEmail: '', // If student
    phone: '',
    postCode: '',
  });
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrev = () => {
    setStep(step - 1);
  };
  const { firstName, lastName, studentStatus, studentType, professionalStatus, university, graduationYear, universityEmail, phone, postCode } = formData;
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

  // const fetchUserData = async (uid) => {
  //   const userDoc = await getDoc(doc(firestore, "users", uid));
  //   return userDoc.exists() ? userDoc.data() : null;
  // };

  const toggleSignUpForm = () => {
    setShowSignUpForm(!showSignUpForm);
  };

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
       const user = userCredential.user.uid;
      const role = await getUserRole(user);
      console.log(role)
       console.log('userCred:',userCredential)
       console.log('userID:',user)

      if (role === "admin") {
        navigate("/dashboard/overview");
      } else if (role === "student") {
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
          const result = await signInWithPopup(auth, provider);
          const user = result.user;

          const userDoc = await getDoc(doc(firestore, "users", user.uid));

          if (userDoc.exists()) {
              const userData = userDoc.data();
              if (userData.role === "admin") {
                  navigate("/dashboard/overview");
              } else if (userData.role === "student") {

                  navigate("/user-dashboard/events");
              }
          } else {

              const userDocRef = doc(firestore, "users", user.uid);
              await setDoc(userDocRef, {
                  userId: user.uid,
                  role: "student",
                  email: user.email,
                  name: user.displayName,
              });

              toast.success("Registration successful!");

              navigate("/user-dashboard/events");
          }

          toast.success("Login with Google successful!");
      } catch (error) {

          toast.error(`Error: ${error.message}`);
      }
  };

  const handleSignUp = async () => {
    try {
      // 1. Create a new user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const { user } = userCredential;

      // 2. Add user details to Firestore
      const userDocRef = doc(firestore, "users", user.uid);
      await setDoc(userDocRef, {
        userId: user.uid,
        firstName: firstName,
        lastName: lastName,
        email: email,
        studentStatus: studentStatus,
        studentType: studentType,
        professionalStatus: professionalStatus,
        university: university,
        graduationYear: graduationYear,
        universityEmail: universityEmail,
        phone: phone,
        postCode: postCode,
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

      // Optionally, you can redirect the user to another page after successful signup instead of reloading the current page
      // For example, using react-router-dom: history.push("/dashboard");
      // or window.location.href = "/dashboard";

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
   {step === 1 && (
     <div className="form-step">
       <div className="form-group">
         <input
           type="text"
           name="firstName"
           value={formData.firstName}
           onChange={handleChange}
           placeholder="First Name"
         />
       </div>
       <div className="form-group">
         <input
           type="text"
           name="lastName"
           value={formData.lastName}
           onChange={handleChange}
           placeholder="Last Name"
         />
       </div>
       <div className="form-group">
         <input
           type="text"
           name="email"
           value={formData.email}
           onChange={handleChange}
           placeholder="E-mail Address"
           autoComplete="username"
         />
       </div>
       <div className="form-group">
         <input
           type="password"
           name="password"
           value={formData.password}
           onChange={handleChange}
           placeholder="Password"
           autoComplete="current-password"
         />
       </div>
       <div className="form-action">
         <button type="button" className="login-button" onClick={handleNext}>
           Next
         </button>
       </div>
     </div>
   )}
   {step === 2 && (
     <div className="form-step">
       <div className="form-group">
         <input
           type="text"
           name="phone"
           value={formData.phone}
           onChange={handleChange}
           placeholder="Phone"
           autoComplete="tel"
         />
       </div>
       <div className="form-group">
         <input
           type="text"
           name="university"
           value={formData.university}
           onChange={handleChange}
           placeholder="University"
         />
       </div>
       <div className="form-group">
         <input
           type="text"
           name="graduationYear"
           value={formData.graduationYear}
           onChange={handleChange}
           placeholder="Graduation Year"
         />
       </div>
       <div className="form-group">
         <input
           type="text"
           name="universityEmail"
           value={formData.universityEmail}
           onChange={handleChange}
           placeholder="University Email"
         />
       </div>
       <div className="form-action" style={{ display: 'flex', justifyContent: 'space-between' }}>
         <button type="button" className="login-button" onClick={handlePrev} style={{ marginRight: '8px' }}>
           Previous
         </button>
         <button type="button" className="login-button" onClick={handleSignUp}>
           Register
         </button>
       </div>
     </div>
   )}     <div className="new-user-check">
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
 </div></form>
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