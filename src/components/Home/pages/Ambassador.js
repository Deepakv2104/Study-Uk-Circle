// Join.js
import React, { useState } from 'react';
import haldiram3 from '../../../assets/img/haldiram3.png';
import IQ from '../../../assets/img/IQ.svg';


// import './Join.css';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { firestore } from '../../../firebase'
import { collection, addDoc } from 'firebase/firestore';
import NewNav from '../sub-components/NewNav';
import Footer from '../sub-components/Footer';

const Ambassador = () => {
    const [selectedInterests, setSelectedInterests] = useState([]);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
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



    const [validPhone, setValidPhone] = useState(false);
    // const [validPostalCode, setValidPostalCode] = useState(false);

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
        console.log(e.target.value, "handleChange")
        setFormData({ ...formData, [name]: value });
        console.log(formData.gender)
    };

    const [gender, setGender] = useState('');
    const [customGender, setCustomGender] = useState(false)

    const handleGenderChange = (event) => {
        // setGender(event.target.value);/
        const { name, value } = event.target;
        if (value === "letMeType") {
            setCustomGender(true)
            console.log(gender, "gender")

        } else {
            setFormData({
                ...formData,
                [name]: value
            });
            console.log('something')

        }


    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        // Extracting data from the form data and setting default value for interests if none selected
        const interests = selectedInterests.length > 0 ? selectedInterests : ['None'];
        const { firstName, lastName, email, phone, gender, userType, university, graduationYear, address, postalCode } = formData;

        // checking validity of phone number
        if (!validatePhoneNumber(phone)) {
            setValidPhone(true);
            console.log(`${phone} is not a valid UK phone number.`);
            return;
        } else {
            setValidPhone(false);
        }

        try {
            // Accessing the "form" collection in Firestore and adding a new document
            await addDoc(collection(firestore, 'ambassador'), {
                firstName,
                lastName,
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

            console.log(formData);
            setFormSubmitted(true); // Setting formSubmitted state to true after successful submission
        } catch (error) {
            console.error('Error adding document: ', error); // Logging any errors that occur during the process
        }
    };


    function validatePhoneNumber(phoneNumber) {
        const pattern = /^\+(\d{1,3})\s?\(?\d{1,4}\)?\s?\d{1,4}\s?\d{1,4}\s?\d{1,4}$/;
        return pattern.test(phoneNumber);
    }
    // function validateUKPostalCode(postalCode) {
    //     const pattern = /^([A-Z]{1,2}[0-9][0-9A-Z]?)\s?[0-9][A-Z]{2}$/i;
    //     return pattern.test(postalCode);
    // }



    return (
        <div>
            <NewNav />
            <div className="bg-gray-800 text-white">
                <div className="join-container mx-auto max-w-7xl px-4 flex justify-center items-center">
                    <div className="left-column mr-12">
                        <div className="heading mb-8">
                            <h3 className="text-2xl font-bold">Welcome to<span className="text-color-green">  WorldLynk</span></h3>
                            <h3 className="text-2xl font-bold">Application for Worldlynk Ambassador Program</h3>
                        </div>
                        <p className="large-text mb-8">Join the Worldlynk Ambassador Program and become a vital link between Worldlynk, students, and your university. As an ambassador, you will promote our services, organize events, and build a strong community. This part-time role is for current and incoming students only. </p>
                        {/* <img src="https://join.getwyld.in/assets/images/line.png" alt="Divider" className="mb-8" /> */}
                        {/* <a href="/" className="glass-button smaller w-button  rounded-lg bg-orange-500 hover:bg-orange-600" style={{ textDecoration: 'none', color: 'white', padding: '0.8rem' }}>Back to homepage</a> */}
                    </div>
                    <div className="right-column rounded-lg shadow-md">
                        <div className="form-section">
                            {!formSubmitted ? (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <h3 className="text-2xl font-bold text-white">Become an Ambassador</h3>
                                    {validPhone && <h4 className='text-red-800'>Please add your country code eg: +44 for UK.</h4>}
                                    {/* {validPostalCode && <h4 className='text-red-800'>Postal code is not valid</h4>} */}
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="form-group">
                                            <label htmlFor="firstName" className="block text-sm font-medium text-white">First Name:</label>
                                            <input type="text" id="firstName" name="firstName" placeholder="First Name" className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-indigo-200" onChange={handleChange} required />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="lastName" className="block text-sm font-medium text-white">Last Name:</label>
                                            <input type="text" id="lastName" name="lastName" placeholder="Last Name" className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-indigo-200" onChange={handleChange} required />
                                        </div>

                                    </div>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="form-group">
                                            <label htmlFor="email" className="block text-sm font-medium text-white">Email:</label>
                                            <input type="email" id="email" name="email" placeholder="Email Address" className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-indigo-200" onChange={handleChange} required />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="phone" className="block text-sm font-medium text-white">Phone:</label>
                                            <input type="tel" id="phone" name="phone" placeholder="(XXX) XXXXX-XXXXX" className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-indigo-200" onChange={handleChange} required />
                                        </div>

                                    </div>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="form-group">
                                            <label htmlFor="university" className="block text-sm font-medium text-white">University Name:</label>
                                            <input type="text" id="university" name="university" placeholder="University Name" className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-indigo-200" onChange={handleChange} required />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="graduationYear" className="block text-sm font-medium text-white">Graduation Year:</label>
                                            <input type="text" id="graduationYear" name="graduationYear" placeholder="Graduation Year" className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-indigo-200" onChange={handleChange} required />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="form-group">
                                            <label htmlFor="address" className="block text-sm font-medium text-white">Address:</label>
                                            <input type="text" id="address" name="address" placeholder="Address" className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-indigo-200" onChange={handleChange} required />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="postalCode" className="block text-sm font-medium text-white">Postal Code:</label>
                                            <input type="text" id="postalCode" name="postalCode" placeholder="Postal Code" className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-indigo-200" onChange={handleChange} required />
                                        </div>
                                        {
                                            customGender ? <div className="form-group">
                                                <label htmlFor="gender" className="block text-sm font-medium text-white">Gender:</label>
                                                <input type="text" id="gender" name="gender" placeholder="Gender"
                                                    className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-indigo-200" onChange={handleChange} required />
                                            </div> :
                                                <div className="form-group">
                                                    <label htmlFor="gender" className="block text-sm font-medium text-white ">Gender:</label>
                                                    <select
                                                        style={{ backgroundColor: '#626060' }}
                                                        id="gender"
                                                        name="gender"
                                                        // value={gender}
                                                        onChange={handleGenderChange}
                                                        className="mt-1 p-2 border border-gray-300 bg-yellow-900 rounded-md w-full focus:outline-none focus:ring focus:ring-indigo-200"
                                                        required
                                                    >
                                                        <option value="" >Gender</option>
                                                        <option value="woman">Woman</option>
                                                        <option value="man">Man</option>
                                                        <option value="nonBinary">Non-binary</option>
                                                        <option value="preferNotToSpecify">Prefer not to say</option>
                                                        <option value="letMeType">Let me type</option>
                                                    </select>
                                                </div>
                                        }
                                    </div>
                                    <div className="form-group">
                                        <label className="block text-sm font-medium text-white">Are you:</label>
                                        <div className="user-type-options">
                                            <div className="user-type-option">
                                                <input type="radio" id="student" name="userType" value="student" onChange={handleChange} />
                                                <label htmlFor="student" className='mt-1 ml-1'>Student</label>
                                            </div>
                                            <div className="user-type-option">
                                                <input type="radio" id="professional" name="userType" value="professional" onChange={handleChange} />
                                                <label htmlFor="professional" className='mt-1 ml-1'>Working Professional</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group interests-group">
                                        <label className="block text-sm font-medium text-white">Interests:</label>
                                        <div className="flex flex-wrap space-x-2">
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
                                        </div>
                                    </div>
                                    <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-green-300">Join</button>
                                </form>

                            ) : (
                                <div className="message-container">
                                    <h2 className="text-2xl font-bold">You are in waitlist!</h2>
                                    <p>Your application has been received.</p>
                                    <p>Follow us on <a href='https://www.instagram.com/_worldlynk_/'>Instagram</a></p>
                                    {/* Add any additional content or styling for the message */}
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
            <div className="footer-brand-logos bg-gray-800 py-8">
                <h4 className="brand-text text-black    ">BRANDS THAT<br />LOVE US !</h4>
                <div className="brand-logos flex justify-center items-center">
                    <a href="https://www.haldiramuk.com/" className="mr-4">
                        <img src={haldiram3} alt="HALDIRAM'S" className="h-12" />
                    </a>
                    <a href="https://www.iqstudentaccommodation.com/" className="mr-4">
                        <img src={IQ} alt="IQ-STUDENT-ACCOMODATION" className="h-12" />
                    </a>
                    <a href="https://www.nus.org.uk/">
                        <img src="https://assets.nationbuilder.com/themes/660d3381d0055b53937ac0db/attachments/original/1659555380/logo.webp?1659555380" alt="NUS" className="h-12" />
                    </a>
                </div>
            </div>
        </div>


    );
};

export default Ambassador;