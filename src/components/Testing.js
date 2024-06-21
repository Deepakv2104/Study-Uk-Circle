// AuthComponent.js
import React, { useState } from 'react';
import { auth, googleProvider } from '../firebase';
import { signInWithRedirect, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const AuthComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      await signInWithRedirect(auth, googleProvider);
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };

  const handleEmailPasswordAuth = async (e) => {
    e.preventDefault();
    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {
      console.error("Email/Password auth error:", error);
    }
  };

  return (
    <div>
      <h2>{isSignup ? "Sign Up" : "Login"}</h2>
      <form onSubmit={handleEmailPasswordAuth}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit">{isSignup ? "Sign Up" : "Login"}</button>
      </form>
      <button onClick={() => setIsSignup(!isSignup)}>
        {isSignup ? "Already have an account? Login" : "Don't have an account? Sign Up"}
      </button>
      <button onClick={handleGoogleLogin}>Sign in with Google</button>
    </div>
  );
};

export default AuthComponent;
