import React, { useState } from 'react';
import logo1 from '.././assets/img/logo1.png';
import './Join.css';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';


const Join = () => {
    const [selectedInterests, setSelectedInterests] = useState([]);

const handleChipClick = (interest) => {
  if (selectedInterests.includes(interest)) {
    setSelectedInterests(selectedInterests.filter(item => item !== interest));
  } else {
    setSelectedInterests([...selectedInterests, interest]);
  }
};

  return (
    <div className='join-page'> 
      <div className="join-container">
        <div className="left-column">
          <p>WELCOME TO<span className='text-color-green'>  WORLDLYNK</span></p>
          <div className="title-section">
            <h1>SEAMLESS STUDENT EXPERIENCE IN THE UK: A ONE-STOP SOLUTION</h1>
          </div>
          <div >
            <img src="https://join.getwyld.in/assets/images/line.png" alt="Decorative Image" />
          </div>
          <div className="join-logo">
            <img src={logo1} alt="Decorative Image" />
          </div>
        </div>
        <div className="right-column">
          <div className="form-section">
         
          <form>
  <h2>JOIN WAITING LIST</h2>
  <div className="form-row">
    <div className="form-group">
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" name="name" placeholder="Enter your name" />
    </div>
    <div className="form-group">
      <label htmlFor="email">Email:</label>
      <input type="email" id="email" name="email" placeholder="Enter your email address" />
    </div>
  </div>
  <div className="form-row">
    <div className="form-group">
      <label htmlFor="phone">Phone:</label>
      <input type="tel" id="phone" name="phone" placeholder="Enter your phone number" />
    </div>
    <div className="form-group">
      <label htmlFor="gender">Gender:</label>
      <input type="text" id="gender" name="gender" placeholder="Enter your gender" />
    </div>
  </div>
  <div className="form-row">
    <div className="form-group user-type-group">
      <label>User Type:</label>
      <div className="user-type-options">
        <div className="user-type-option">
          <input type="radio" id="student" name="userType" value="student" />
          <label htmlFor="student">Student</label>
        </div>
        <div className="user-type-option">
          <input type="radio" id="professional" name="userType" value="professional" />
          <label htmlFor="professional">Working Professional</label>
        </div>
      </div>
    </div>
  </div>
  <div className="form-row">
    <div className="form-group">
      <label htmlFor="university">University Name:</label>
      <input type="text" id="university" name="university" placeholder="Enter your university name" />
    </div>
    <div className="form-group">
      <label htmlFor="graduationYear">Graduation Year:</label>
      <input type="text" id="graduationYear" name="graduationYear" placeholder="Enter your graduation year" />
    </div>
  </div>
  <div className="form-row">
    <div className="form-group">
      <label htmlFor="address">Address:</label>
      <input type="text" id="address" name="address" placeholder="Enter your address" />
    </div>
    <div className="form-group">
      <label htmlFor="postalCode">Postal Code:</label>
      <input type="text" id="postalCode" name="postalCode" placeholder="Enter your postal code" />
    </div>
  </div>
  <div className="form-row">
    <div className="form-group interests-group">
      <label htmlFor="interests">Interests:</label>
      {/* Chip components for interests */}
    </div>
  </div>
  <div className="form-group">
    <button type="submit">Join</button>
  </div>
</form>

          </div>
        </div>
      </div>
      <div className="join-container image-grid">
        <img src="https://example.com/image1.jpg" alt="Sample Image" />
        <img src="https://example.com/image2.jpg" alt="Sample Image" />
        <img src="https://example.com/image3.jpg" alt="Sample Image" />
        {/* Add more images here */}
      </div>
    </div>
  );
};

export default Join;
