// AuthContext.js
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { auth, googleProvider, firestore } from '../../firebase';
import { getDoc, doc } from "firebase/firestore";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);

  const signUpWithEmailAndPassword = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  const signInWithEmailAndPassword = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const signInWithGoogle = () => {
    return auth.signInWithPopup(googleProvider);
  };

  const logout = () => {
    return auth.signOut();
  };
  
  const resetPassword = (email) => {
    return auth.sendPasswordResetEmail(email);
  };

  const getUserRole = useCallback(async (uid) => {
    try {
      const userDoc = await getDoc(doc(firestore, "users", uid));
      if (userDoc.exists) {
        return userDoc.data().role;
      } else {
        console.log("User document not found");
        return null;
      }
    } catch (error) {
      console.error("Error fetching user role:", error);
      return null;
    }
  }, []); // No dependencies needed for useCallback since we only want to create the function once

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setCurrentUser(user);
        const role = await getUserRole(user.uid);
        setUserRole(role);
      } else {
        setCurrentUser(null);
        setUserRole(null); // Reset userRole if no user is logged in
      }
      setLoading(false);
    });

    return unsubscribe;
  }, [getUserRole]); // Depend on getUserRole function as it is used inside useEffect

  const value = {
    currentUser,
    userRole,
    signUpWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithGoogle,
    logout,
    resetPassword,
    getUserRole
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
