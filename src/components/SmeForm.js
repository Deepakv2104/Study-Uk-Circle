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
import { Input } from '@mui/base';
import NewNav from './NewNav';
import Footer from './Footer';

const SmeForm = () => {
  const [selectedCommunications, setSelectedCommunications] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
      companyName: '',
      comapanyMail: '',
      role:'',
      primaryContact: '',
      secondaryContact: '',
      websiteLink:'',
      description:'',
      purpose:'',
  
      preferedCommunication: []
  });

  const handleChipClick = (interest) => {
    let updatedCommunications = [];
    if (selectedCommunications.includes(interest)) {
        updatedCommunications = selectedCommunications.filter(item => item !== interest);
    } else {
        updatedCommunications = [...selectedCommunications, interest];
    }

    setSelectedCommunications(updatedCommunications); // Update the selectedInterests state

    // Update the formData state to include the updated interests
    setFormData({ ...formData, preferedCommunication: updatedCommunications });
};


  const handleChange = (e) => {
      const { CompanyName, value } = e.target;
      setFormData({ ...formData, [CompanyName]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    
    // Extracting data from the form data and setting default value for interests if none selected
    const preferedCommunication = selectedCommunications.length > 0 ? selectedCommunications : ['None'];
    const {   companyName,
        comapanyMail,
        role,
        primaryContact,
        secondaryContact,
        websiteLink,
        description,
        purpose,
    
        preferedCommunication: [] } = formData;
    
    try {
        console.log(formData)

        // Accessing the "form" collection in Firestore and adding a new document
        await addDoc(collection(firestore, 'sme'), {
            companyName,
      comapanyMail,
      role,
      primaryContact,
      secondaryContact,
      websiteLink,
      description,
      purpose,
  
      preferedCommunication: [],
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
                 <h3 className='waitlist-heading'>Welcome to<span className='text-color-green'>  WorldLynk</span></h3>
                 <div className="heading">
                     <h3>Unlock the full potential of your brand by partnering with us at WorldLynk.</h3>

                 </div>
                 <p className='large-text'>Position yourself as a leader in shaping the future of student life in the UK! Forge a partnership with us today and access our cutting-edge platform early. Crafted to revolutionize the student experience, our comprehensive platform offers endless opportunities for collaboration and innovation in education.</p>

                 <div>
                     <img src="https://join.getwyld.in/assets/images/line.png" alt="Decorative Image" />
                 </div>
                 <div class="nav-right-content desktop" style={{marginTop:'10px'}}><a href="/" class="glass-button smaller w-button">Back to  homepage</a></div >

             </div>
            
             <div className="right-column">
                 <div className="form-section">
                 {!formSubmitted ? (
                     <form onSubmit={handleSubmit}>
                         <h2>Contact Us</h2>
                         <div className="form-row">
                             <div className="form-group">
                                 <label htmlFor="companyName">Company name:</label>
                                 <input type="text" id="companyName" name="companyName" placeholder="Enter company name"  onChange={handleChange} />
                             </div>
                             <div className="form-group">
                                 <label htmlFor="companyEmail">Company mail:</label>
                                 <input type="email" id="companyEmail" name="companyEmail" placeholder="Enter company mail address"  onChange={handleChange} />
                             </div>
                         </div>
                         <div className="form-row">
                         <div className="form-group">
                                 <label htmlFor="role">Role in Company:</label>
                                 <input type="text" id="role" name="role" placeholder="Enter your role" onChange={handleChange}  />
                             </div>
                             <div className="form-group">
                                 <label htmlFor="primaryContact">Primary Contact:</label>
                                 <input type="tel" id="primaryContact" name="primaryContact" placeholder="Enter primary contact" onChange={handleChange}  />
                             </div>
                             
                         </div>
                         {/* <div className="form-row">
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
                         </div> */}
                         {/* <div className="form-row">
                             <div className="form-group">
                                 <label htmlFor="university">University Name:</label>
                                 <input type="text" id="university" name="university" placeholder="Enter your university name" onChange={handleChange}  />
                             </div>
                             <div className="form-group">
                                 <label htmlFor="graduationYear">Graduation Year:</label>
                                 <input type="text" id="graduationYear" name="graduationYear" placeholder="Enter your graduation year" onChange={handleChange}  />
                             </div>
                         </div> */}
                         <div className="form-row">
                         <div className="form-group">
                                 <label htmlFor="secondayContact">Secondary Contact:</label>
                                 <input type="text" id="secondaryContact" name="secondaryContact" placeholder="Enter secondary contact"  onChange={handleChange} />
                             </div>
                             <div className="form-group">
                                 <label htmlFor="websiteLink">Website URL:</label>
                                 <input type="text" id="websiteLink" name="websiteLink" placeholder="Enter company website link" onChange={handleChange}  />
                             </div>
                           
                         </div>
                         <div className="form-row">
                             <div className="form-group">
                                 <label htmlFor="descripton">Brief description about your company:</label>
                                 <textarea type="text" id="descripton" rows="3"name="descripton" placeholder="Enter company details" onChange={handleChange}  />
                             </div>
                             {/* <div className="form-group">
                                 <label htmlFor="postalCode">Postal Code:</label>
                                 <input type="text" id="postalCode" name="postalCode" placeholder="Enter your postal code"  onChange={handleChange} />
                             </div> */}
                         </div>
                         <div className="form-row">
                             <div className="form-group">
                                 <label htmlFor="purpose">Why are you interested in forming a partnership ?</label>
                                 <textarea type="text" id="purpose" rows="5"name="purpose" placeholder="Enter your answer" onChange={handleChange}  />
                             </div>
                             {/* <div className="form-group">
                                 <label htmlFor="postalCode">Postal Code:</label>
                                 <input type="text" id="postalCode" name="postalCode" placeholder="Enter your postal code"  onChange={handleChange} />
                             </div> */}
                         </div>
                         <div className="form-row">
                             <div className="form-group interests-group">
                                 <label htmlFor="preferedCommunication">Prefered method of Communications:</label>
                                 <Stack direction="row" spacing={1}>
                                     <Chip
                                         label="Email"
                                         variant="outlined"
                                         clickable
                                         onClick={() => handleChipClick("Email")}
                                         color={selectedCommunications.includes("Email") ? "primary" : "default"}
                                     />
                                     <Chip
                                         label="Phone"
                                         variant="outlined"
                                         clickable
                                         onClick={() => handleChipClick("Phone")}
                                         color={selectedCommunications.includes("Phone") ? "primary" : "default"}
                                     />
                                     <Chip
                                         label="Whatsapp"
                                         variant="outlined"
                                         clickable
                                         onClick={() => handleChipClick("Whatsapp")}
                                         color={selectedCommunications.includes("Whatsapp") ? "primary" : "default"}
                                     />
                                     {/* <Chip
                                         label="Accommodation"
                                         variant="outlined"
                                         clickable
                                         onClick={() => handleChipClick("Accommodation")}
                                         color={selectedCommunications.includes("Accommodation") ? "primary" : "default"}
                                     /> */}
                                 </Stack>
                             </div>
                         </div>
                         <div className="form-group">
                             <button type="submit">Submit</button>
                         </div>
                     </form>
                   ) : (
                   <div className="message-container" >
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

export default SmeForm;
