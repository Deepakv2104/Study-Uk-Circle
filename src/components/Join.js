// Join.js
import React, { useState } from 'react';
import logo1 from '.././assets/img/logo1.png';
import haldiram3 from '.././assets/img/haldiram3.png';
import IQ from '.././assets/img/IQ.svg';
import nus from '.././assets/img/nus.png';


import './Join.css';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import {firestore }from '../firebase'
import { collection, addDoc } from 'firebase/firestore';
import NewNav from './NewNav';
import Footer from './Footer';

const Join = () => {
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
      gender: '',
      userType: '',
      university: '',
      graduationYear: '',
      address: '',
      postalCode: '',
      interests: []
  });

  const handleChipClick = (interest) => {
    let updatedInterests = [];
    if (selectedInterests.includes(interest)) {
        updatedInterests = selectedInterests.filter(item => item !== interest);
    } else {
        updatedInterests = [...selectedInterests, interest];
    }

    setSelectedInterests(updatedInterests); // Update the selectedInterests state

    // Update the formData state to include the updated interests
    setFormData({ ...formData, interests: updatedInterests });
};


  const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    
    // Extracting data from the form data and setting default value for interests if none selected
    const interests = selectedInterests.length > 0 ? selectedInterests : ['None'];
    const { name, email, phone, gender, userType, university, graduationYear, address, postalCode } = formData;
    
    try {
        // Accessing the "form" collection in Firestore and adding a new document
        await addDoc(collection(firestore, 'form'), {
            name,
            email,
            phone,
            gender,
            userType,
            university,
            graduationYear,
            address,
            postalCode,
            interests,
            timestamp: new Date() // Adding a timestamp field with the current date and time
        });
      console.log(formData)
        setFormSubmitted(true); // Setting formSubmitted state to true after successful submission
    } catch (error) {
        console.error('Error adding document: ', error); // Logging any errors that occur during the process
    }
};


    return (
       <div>
        <NewNav/>
         <div className='join-page'style={{marginTop:'80px'}}>
       
       <div className="join-container">
           <div className="left-column">
               <div  className="heading">
               <h3 >Welcome to<span className='text-color-green'>  WorldLynk</span></h3>

               </div>
               <div className="heading">
                   <h3>Seamless student experience in the UK: a one-stop solution</h3>

               </div>
               <p className='large-text'>Be among the first to experience the future of student life in the UK! Join our waiting list today and gain early access to our comprehensive platform designed to revolutionize your student experience.</p>

               <div>
                   <img src="https://join.getwyld.in/assets/images/line.png" alt="Decorative Image" />
               </div>
               <div class="nav-right-content desktop"><a href="/" class="glass-button smaller w-button">Back to  homepage</a></div >

           </div>
          
           <div className="right-column">
               <div className="form-section">
               {!formSubmitted ? (
                   <form onSubmit={handleSubmit}>
                       <h3>Join waiting list</h3>
                       <div className="form-row">
                           <div className="form-group">
                               <label htmlFor="name">Name:</label>
                               <input type="text" id="name" name="name" placeholder="Enter your name"  onChange={handleChange} />
                           </div>
                           <div className="form-group">
                               <label htmlFor="email">Email:</label>
                               <input type="email" id="email" name="email" placeholder="Enter your email address"  onChange={handleChange} />
                           </div>
                       </div>
                       <div className="form-row">
                           <div className="form-group">
                               <label htmlFor="phone">Phone:</label>
                               <input type="tel" id="phone" name="phone" placeholder="Enter your phone number" onChange={handleChange}  />
                           </div>
                           <div className="form-group">
                               <label htmlFor="gender">Gender:</label>
                               <input type="text" id="gender" name="gender" placeholder="Enter your gender" onChange={handleChange}  />
                           </div>
                       </div>
                       <div className="form-row">
                           <div className="form-group user-type-group">
                               <label>User Type:</label>
                               <div className="user-type-options">
                                   <div className="user-type-option">
                                       <input type="radio" id="student" name="userType" value="student"  onChange={handleChange} />
                                       <label htmlFor="student">Student</label>
                                   </div>
                                   <div className="user-type-option">
                                       <input type="radio" id="professional" name="userType" value="professional" onChange={handleChange}  />
                                       <label htmlFor="professional">Working Professional</label>
                                   </div>
                               </div>
                           </div>
                       </div>
                       <div className="form-row">
                           <div className="form-group">
                               <label htmlFor="university">University Name:</label>
                               <input type="text" id="university" name="university" placeholder="Enter your university name" onChange={handleChange}  />
                           </div>
                           <div className="form-group">
                               <label htmlFor="graduationYear">Graduation Year:</label>
                               <input type="text" id="graduationYear" name="graduationYear" placeholder="Enter your graduation year" onChange={handleChange}  />
                           </div>
                       </div>
                       <div className="form-row">
                           <div className="form-group">
                               <label htmlFor="address">Address:</label>
                               <input type="text" id="address" name="address" placeholder="Enter your address" onChange={handleChange}  />
                           </div>
                           <div className="form-group">
                               <label htmlFor="postalCode">Postal Code:</label>
                               <input type="text" id="postalCode" name="postalCode" placeholder="Enter your postal code"  onChange={handleChange} />
                           </div>
                       </div>
                       <div className="form-row">
                           <div className="form-group interests-group">
                               <label htmlFor="interests">Interests:</label>
                               <Stack direction="row" spacing={1}>
                                   <Chip
                                       label="Jobs"
                                       variant="outlined"
                                       clickable
                                       onClick={() => handleChipClick("Jobs")}
                                       color={selectedInterests.includes("Jobs") ? "primary" : "default"}
                                   />
                                   <Chip
                                       label="Mentorship"
                                       variant="outlined"
                                       clickable
                                       onClick={() => handleChipClick("Mentorship")}
                                       color={selectedInterests.includes("Mentorship") ? "primary" : "default"}
                                   />
                                   <Chip
                                       label="Events"
                                       variant="outlined"
                                       clickable
                                       onClick={() => handleChipClick("Events")}
                                       color={selectedInterests.includes("Events") ? "primary" : "default"}
                                   />
                                   <Chip
                                       label="Accommodation"
                                       variant="outlined"
                                       clickable
                                       onClick={() => handleChipClick("Accommodation")}
                                       color={selectedInterests.includes("Accommodation") ? "primary" : "default"}
                                   />
                               </Stack>
                           </div>
                       </div>
                       <div className="form-group">
                           <button type="submit">Join</button>
                       </div>
                   </form>
                 ) : (
                 <div className="message-container">
                     <h2>You are in waitlist!</h2>
                     <p>Your application has been received.</p>
                     {/* Add any additional content or styling for the message */}
                 </div>
             )}
               </div>
           </div>
             
       </div>
       <Footer/>

<div class="footer-brand-logos">
<h4 class="brand-text">BRANDS THAT<br/>LOVE US !</h4>  <div class="brand-logos">
<a href="https://www.haldiramuk.com/">
   <img src={haldiram3} alt="HALDIRAM'S"/>
</a>
<a href="https://www.iqstudentaccommodation.com/">
   <img src={IQ} alt="IQ-STUDENT-ACCOMODATION"/>
</a>
<a href="https://www.nus.org.uk/">
   <img src="https://assets.nationbuilder.com/themes/660d3381d0055b53937ac0db/attachments/original/1659555380/logo.webp?1659555380" alt="NUS"/>
</a>
</div>
</div>


   </div>
       </div>
    );
};

export default Join;
