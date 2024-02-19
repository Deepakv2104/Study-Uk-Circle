import React, { useState, useEffect } from 'react';
import {
  getAuth,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { doc, setDoc, getDocs, collection } from 'firebase/firestore';
import { firestore } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = () => {
  const navigate = useNavigate();
  const [sectionIndex, setSectionIndex] = useState(0);




 
  // Fields for each section
  const sections = [
    ['email', 'password', 'confirmPassword'],
    ['city', 'state', 'country'],
   
  ];

  const [formData, setFormData] = useState(
    sections.map((section) =>
      section.reduce((acc, field) => ({ ...acc, [field]: '' }), {})
    )
  );

  const handleInputChange = (sectionIndex, field, value) => {
    setFormData((prevData) => {
      const newData = [...prevData];
      newData[sectionIndex][field] = value;
      return newData;
    });
  };

  const handleNext = () => {
    if (sectionIndex < sections.length - 1) {
      setSectionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (sectionIndex > 0) {
      setSectionIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleSignUp = async () => {
    try {
      // 1. Create a new user with Firebase Authentication
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData[0].email,  // Adjust the index to 0
        formData[0].password
      );
      const { user } = userCredential;
  
      // 2. Add user details to Firestore with role set to 'student'
      const userDocRef = doc(firestore, 'users', user.uid);
      await setDoc(userDocRef, {
        userId: user.uid,
        role: 'student', // Set the user role to 'student'
        ...formData[0],  // Adjust the index to 0
        ...formData[1],  // Adjust the index to 1
        profilePic: formData[sectionIndex].profilePic || '',
      });
  
      // Show success toast
      toast.success('Signup successful!', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
  
      // Navigate to the login page
      navigate('/login');
    } catch (error) {
      // Show error toast
      toast.error(`Signup failed: ${error.message}`, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
  
      console.error('Error signing up:', error.message);
    }
  };
  
  return (
    <div style={{width:'80%',maxWidth:360}}>
      <form >
        
        {/* Render form fields for the current section */}
        {sections[sectionIndex].map((field) => (
          <div key={field} className="form-field mb-4">
           
              <input
                type={field.toLowerCase().includes('password') ? 'password' : 'text'}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={formData[sectionIndex][field]}
                onChange={(e) => handleInputChange(sectionIndex, field, e.target.value)}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
        
          </div>
        ))}

        {/* Navigation buttons */}
        <div className="flex justify-between">
          <button type="button" onClick={handlePrevious} disabled={sectionIndex === 0} className="py-2 px-4 bg-indigo-600 text-white rounded-md">
            Previous
          </button>
          <button type="button" onClick={handleNext} disabled={sectionIndex === sections.length - 1} className="py-2 px-4 bg-indigo-600 text-white rounded-md">
            Next
          </button>
        </div>

        {sectionIndex === sections.length - 1 && (
          <button type="button" onClick={handleSignUp} className="mt-4 py-2 px-4 bg-indigo-600 text-white rounded-md">
            Sign Up
          </button>
        )}
      </form>
    </div>
  );
};

export default Register;
