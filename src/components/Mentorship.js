// Join.js
import React, { useState } from 'react';
import haldiram3 from '.././assets/img/haldiram3.png';
import IQ from '.././assets/img/IQ.svg';


import './Join.css';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { firestore } from '../firebase'
import { collection, addDoc } from 'firebase/firestore';
import NewNav from './NewNav';
import Footer from './Footer';

const Mentorship = () => {
    const [selectedSpecializations, setSelectedSpecializations] = useState([]);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        degree:'',
        applicationStatus:'',
        termPlanningFor:'',
        preferredYear:'',
        graduationYear: '',
        specialization: ''
        });



    const [validPhone, setValidPhone] = useState(false);
    const [dateTime, setDateTime] = useState('');
    const [slotTime, setSlotTime] = useState('');

    // const [validPostalCode, setValidPostalCode] = useState(false);

    const handleChipClick = (interest) => {
        let updatedSpecializations = [];
        if (selectedSpecializations.includes(interest)) {
            updatedSpecializations = selectedSpecializations.filter(item => item !== interest);
        } else {
            updatedSpecializations = [...selectedSpecializations, interest];
        }

        setSelectedSpecializations(updatedSpecializations); // Update the selectedSpecializations state

        // Update the formData state to include the updated Specializations
        setFormData({ ...formData, Specializations: updatedSpecializations });
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(e.target.value, "handleChange")
        setFormData({ ...formData, [name]: value });
    };


    const handleDegreeChange = (event) => {
        const { name, value } = event.target;
      
            setFormData({
                ...formData,
                [name]: value
            });
    console.log(formData)
        

    };
    const handleApplicationStatusChange = (event) => {
        const { name, value } = event.target;
       
            setFormData({
                ...formData,
                [name]: value
            });
    };
    const handleChangeDate = (event) => {
        setDateTime(event.target.value);
        const localDateTime = new Date(dateTime);
        let slotTiming = localDateTime.toLocaleString()
        setSlotTime(slotTiming)
      };

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        const {   firstName, lastName,email,phone,degree,applicationStatus,termPlanningFor,preferredYear,graduationYear, specialization } = formData;
        console.log(formData,'submit')

        if (!validatePhoneNumber(phone)) {
            setValidPhone(true);
            console.log(`${phone} is not a valid UK phone number.`);
            return;
        } else {
            setValidPhone(false);
        }

        try {
            await addDoc(collection(firestore, 'mentorshipForm'), {
                firstName,
                lastName,
                email,
                phone,
                degree,
                applicationStatus,
                termPlanningFor,
                preferredYear,
                slotTime,
                graduationYear,
                specialization,
                timestamp: new Date()
            });

            console.log(formData);
            setFormSubmitted(true); 
        } catch (error) {
            console.error('Error adding document: ', error); 
        }
    };


    function validatePhoneNumber(phoneNumber) {
        const pattern = /^\+(\d{1,3})\s?\(?\d{1,4}\)?\s?\d{1,4}\s?\d{1,4}\s?\d{1,4}$/;
        return pattern.test(phoneNumber);
    }



    return (
        <div>
            <NewNav />
            <div className="bg-gray-800 text-white">
                <div className="join-container mx-auto max-w-6xl px-0 flex justify-center items-center">
                    <div className="left-column mr-1">
                        <div className="heading  mb-6 text-md">
                            <h3 className="text-2xl font-bold"><span className="text-color-green">  WorldLynk Mentorships</span></h3>
                        </div>
                        <p className="text-xl  mb-6 text-md">Book a  slot to avail your free call from our mentor</p>
                        <p className="large-text  mb-6 text-md">🎓 Connect directly with global university students & alumni for real insights!</p>
                        <p className="large-text  mb-6 text-md">🌍 Explore on-ground experiences from universities around the world.</p>
                        <p className="large-text  mb-6 text-md">📚 Dive deep into curriculum details, campus life, and more.</p>
                        <p className="large-text  mb-6 text-md">🎉 First call is on us! Start your journey with a free chat.</p>
                        <p className="large-text  mb-6 text-md">💼 Get the lowdown on job prospects after graduation.</p>
                        <p className="large-text  mb-6 text-md">🌐 Visa queries? Scholarships? We've got you covered.</p>
                        <p className="large-text  mb-6 text-md">💰 Need financial advice? Explore loan options seamlessly.</p>
                        <p className="large-text  mb-6 text-md">🏡 Find your perfect BioTech with our trusted partners.</p>
                        <p className="large-text  mb-6 text-md">🤝 Join a community that supports your global education dreams.</p>

                        <img src="https://join.getwyld.in/assets/images/line.png" alt="Divider" className=" mb-6 text-md" />
                        <div className="nav-right-content desktop">
                            <a href="/" className="glass-button smaller w-button" style={{ textDecoration: 'none', color: 'white' }}>Back to homepage</a>
                        </div>
                    </div>
                    <div className="right-column rounded-lg shadow-md w-1/2">
                        <div className="form-section">
                            {!formSubmitted ? (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <h3 className="text-2xl font-bold text-white">Mentorship Form</h3>
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
                                            <label htmlFor="gender" className="block text-sm font-medium text-white ">Degree Level:</label>
                                            <select
                                                style={{ backgroundColor: '#626060' }}
                                                id="degree"
                                                name="degree"
                                                // value={gender}
                                                onChange={handleDegreeChange}
                                                className="mt-1 p-2 border border-gray-300 bg-yellow-900 rounded-md w-full focus:outline-none focus:ring focus:ring-indigo-200"
                                                required
                                            >
                                                <option value="masters">Masters</option>
                                                <option value="bachelors">Bachelors</option>
                                                <option value="phd">PhD</option>
                                                <option value="associate">Associate</option>
                                                <option value="postDoc">Post Doc</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="graduationYear" className="block text-sm font-medium text-white">Graduation Year:</label>
                                            <input type="text" id="graduationYear" name="graduationYear" placeholder="Graduation Year" className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-indigo-200" onChange={handleChange} required />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="form-group">
                                            <label htmlFor="gender" className="block text-sm font-medium text-white ">Application Status:</label>
                                            <select
                                                style={{ backgroundColor: '#626060' }}
                                                id="applicationStatus"
                                                name="applicationStatus"
                                                // value={gender}
                                                onChange={handleApplicationStatusChange}
                                                className="mt-1 p-2 border border-gray-300 bg-yellow-900 rounded-md w-full focus:outline-none focus:ring focus:ring-indigo-200"
                                                required
                                            >
                                                <option value="">Your status</option>
                                                <option value="just exploring now">Just exploring now</option>
                                                <option value="shortlisting colleges, planning tests">Shortlisting colleges, planning tests</option>
                                                <option value="tests all done yet to apply">Tests all done, yet to apply</option>
                                                <option value="applied to a few universities">Applied to a few universities</option>
                                                <option value="got offer letters, confused between universities" className='p'>Got offer letters, confused between universities</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="preferred year" className="block text-sm font-medium text-white">Preferred Year:</label>
                                            <input type="text" id="preferredYear" name="preferredYear" placeholder="Year" className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-indigo-200" onChange={handleChange} required />
                                        </div>
                                   
                                    </div>
                                    <div className="form-group">
                                        <label className="block text-sm font-medium text-white">Which Term your are planning for:</label>
                                        <div className="user-type-options ">
                                            <div className="user-type-option p-0 m-0">
                                                <input type="radio" id="Sept-Nov(Fall)" name="termPlanningFor" value="Sept-Nov (Fall)" onChange={handleChange} />
                                                <label htmlFor="Sept-Nov(Fall)" className='mt-1 ml-1  w-[140px]'>Sept-Nov (Fall)</label>
                                            </div>
                                            <div className="user-type-option p-0 m-0">
                                                <input type="radio" id="Mar-May(Spring)" name="termPlanningFor" value="Mar-May(Spring)" onChange={handleChange} />
                                                <label htmlFor="Mar-May(Spring)" className='mt-1 ml-1 w-[140px]'>Mar-May(Spring)</label>
                                            </div>
                                            <div className="user-type-option p-0 m-0">
                                                <input type="radio" id="Jun-Aug(Summer)" name="termPlanningFor" value="Jun-Aug(Summer)" onChange={handleChange} />
                                                <label htmlFor="Jun-Aug(Summer)" className='mt-1 ml-1 w-[140px]'>Jun-Aug(Summer)</label>
                                            </div>

                                        </div>
                                        <div className='user-type-options'>
                                            <div className="user-type-option m-0 p-0">
                                                <input type="radio" id="Dec-Feb(Winter)" name="termPlanningFor" value="Dec-Feb(Winter)" onChange={handleChange} />
                                                <label htmlFor="Dec-Feb(Winter)" className='mt-1 ml-1 w-[140px]'>Dec-Feb(Winter)</label>
                                            </div>
                                            <div className="user-type-option">
                                                <input type="radio" id="not sure" name="termPlanningFor" value="Not Sure"  onChange={handleChange} />
                                                <label htmlFor="not sure" className='mt-1 ml-1 w-[140px]'>Not Sure</label>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="form-group Specializations-group">
                                        {/* <label className="block text-sm font-medium text-white">Specialization you are interested in:</label> */}
                                        {/* <div className="flex flex-wrap space-x-2">
                                            <Chip
                                                label="Computer Science"
                                                variant="outlined"
                                                clickable
                                                onClick={() => handleChipClick("Computer Science")}
                                                color={selectedSpecializations.includes("Computer Science") ? "primary" : "default"}
                                            />
                                            <Chip
                                                label="MBA"
                                                variant="outlined"
                                                clickable
                                                onClick={() => handleChipClick("MBA")}
                                                color={selectedSpecializations.includes("MBA") ? "primary" : "default"}
                                            />
                                            <Chip
                                                label="Mechanical"
                                                variant="outlined"
                                                clickable
                                                onClick={() => handleChipClick("Mechanical")}
                                                color={selectedSpecializations.includes("Mechanical") ? "primary" : "default"}
                                            />
                                            <Chip
                                                label="BioTech"
                                                variant="outlined"
                                                clickable
                                                onClick={() => handleChipClick("BioTech")}
                                                color={selectedSpecializations.includes("BioTech") ? "primary" : "default"}
                                            />
                                            <Chip
                                                label="Data Science"
                                                variant="outlined"
                                                clickable
                                                onClick={() => handleChipClick("Data Science")}
                                                color={selectedSpecializations.includes("Data Science") ? "primary" : "default"}
                                            />

                                        </div> */}
                                        <div>
                                        <div className="form-group my-4">
                                            <label htmlFor="preferred year" className="block text-sm font-medium text-white"> Specialization you are interested in:</label>
                                            <input type="text" id="specialization" name="specialization" placeholder="Specialization" className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-indigo-200" onChange={handleChange} required />
                                        </div>
                                         </div>
                                        <div className='mt-2'>
                                            <label for="datetime" className='block text-sm font-medium text-white'>Select a date and time for the call:</label>
                                            <input type="datetime-local" id="datetime"
                                                name="datetime"
                                                onChange={handleChangeDate}
                                                required />
                                        </div>
                                    </div>
                                    <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-green-300">Book a Slot</button>
                                </form>

                            ) : (
                                <div className="message-container">
                                    <h2 className="text-2xl font-bold">Your slot is booked!</h2>
                                    <p>You will receive a call on your selected time slot.</p>
                                    <p>Meanwhile you can Follow us on <a href='https://www.instagram.com/_worldlynk_/'>Instagram</a></p>
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
                    <a href="https://www.iqstudentBioTech.com/" className="mr-4">
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

export default Mentorship;
