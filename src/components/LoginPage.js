import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, firestore } from "../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../auth/userProvider/AuthProvider";
import gsap from "gsap";
import lottie from "lottie-web";
import animationData from "../assets/lotties/students.json";
import googleSvg from "../assets/img/googleSvg.svg";
import linkedin from "../assets/img/linkedin.svg";
import meta from "../assets/img/meta.svg";
import "../styles/Login.css";
import { GoogleAuthProvider } from "firebase/auth";
import { signInWithEmailAndPassword, signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth";
import { getDoc, doc, setDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import NewNav from "./NewNav";
import Footer from "./Footer";

const LoginPage = () => {
  const { getUserRole } = useAuth();
  const navigate = useNavigate();
  const container = useRef(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    studentStatus: "",
    studentType: "",
    professionalStatus: "",
    university: "",
    graduationYear: "",
    universityEmail: "",
    phone: "",
    postCode: "",
  });

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrev = () => {
    setStep(step - 1);
  };

  const toggleSignUpForm = () => {
    setShowSignUpForm(!showSignUpForm);
  };

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user.uid;
      const role = await getUserRole(user);

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
      console.error("Login Error:", error);
      toast.error("Invalid credentials. Please try again.", {
        position: "top-center",
        autoClose: 1500,
      });
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, new GoogleAuthProvider());
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
      toast.error(`Google Login Error: ${error.message}`);
    }
  };

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      const userDocRef = doc(firestore, "users", user.uid);
      await setDoc(userDocRef, {
        userId: user.uid,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: email,
        studentStatus: formData.studentStatus,
        studentType: formData.studentType,
        professionalStatus: formData.professionalStatus,
        university: formData.university,
        graduationYear: formData.graduationYear,
        universityEmail: formData.universityEmail,
        phone: formData.phone,
        postCode: formData.postCode,
        role: "student", // Assuming default role for signup is "student"
      });
  
      toast.success("Signup successful!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
  
      navigate("/user-dashboard/events");
    } catch (error) {
      console.error("Signup Error:", error);
  
      let errorMessage = "Signup failed. Please try again.";
  
      switch (error.code) {
        case "auth/email-already-in-use":
          errorMessage = "Email is already in use. Please use a different email.";
          break;
        case "auth/invalid-email":
          errorMessage = "Invalid email address. Please enter a valid email.";
          break;
        case "auth/weak-password":
          errorMessage = "Password is too weak. Please enter a stronger password.";
          break;
        case "auth/operation-not-allowed":
          errorMessage = "Operation not allowed. Please contact support.";
          break;
        default:
          errorMessage = `Signup failed: ${error.message}`;
          break;
      }
  
      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
  };
  

  return (
    <div>
      <NewNav />
      <div className="login-page">
        <div className="lottie-container">
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
                      id="email" // Add id attribute here
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
                      id="password" // Add id attribute here
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Password"
                      autoComplete="current-password"
                    />
                  </div>
                  <div className="form-action">
                    <button
                      type="button"
                      className="login-button"
                      onClick={handleNext}
                    >
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
                  <div
                    className="form-action"
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <button
                      type="button"
                      className="login-button"
                      onClick={handlePrev}
                      style={{ marginRight: "8px" }}
                    >
                      Previous
                    </button>
                    <button
                      type="button"
                      className="login-button"
                      onClick={handleSignUp}
                    >
                      Register
                    </button>
                  </div>
                </div>
              )}
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
                <div className="option">
                  <img src={linkedin} alt="LinkedIn" />
                </div>
                <div className="option">
                  <img src={meta} alt="Meta" />
                </div>
              </div>
              <div className="reset1">
                <Link to="">Forgot Password</Link>
              </div>
            </form>
          ) : (
            <form>
              <h1 className="form-title">Login</h1>
              <div className="form-group">
                <input
                  type="text"
                  value={email}
                  id="email" // Add id attribute here
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E-mail Address"
                  autoComplete="username"
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  id="password" // Add id attribute here
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
                <div className="option">
                  <img src={linkedin} alt="LinkedIn" />
                </div>
                <div className="option">
                  <img src={meta} alt="Meta" />
                </div>
              </div>
              <div className="reset1">
                <Link to="">Forgot Password</Link>
              </div>
            </form>
          )}

          <ToastContainer />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
