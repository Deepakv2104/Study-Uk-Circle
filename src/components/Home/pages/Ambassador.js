import React, { useState } from 'react';
import haldiram3 from '../../../assets/img/haldiram3.png';
import IQ from '../../../assets/img/IQ.svg';
import { firestore } from '../../../firebase';
import { collection, addDoc } from 'firebase/firestore';
import NewNav from '../sub-components/NewNav';
import Footer from '../sub-components/Footer';

const Ambassador = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        phoneNumber: '',
        gender: '',
        email: '',
        address: '',
        dateOfBirth: '',
        nationality: '',
        category: '',
        levelOfStudy: '',
        university: '',
        graduationYear: '',
        degreeProgram: '',
        availableForEvents: '',
        canStartImmediately: '',
        workPermit: '',
        needWorkPermitFuture: '',
        interviewAdjustments: '',
        hoursPerWeek: '',
        personalStatement: '',
        requirementsDetail: '',
        declaration: '',
    });

    const [customGender, setCustomGender] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleGenderChange = (e) => {
        const { value } = e.target;
        if (value === 'other') {
            setCustomGender(true);
        } else {
            setCustomGender(false);
            setFormData({ ...formData, gender: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.declaration !== 'yes') {
            alert('You must accept the declaration to submit the form.');
            return;
        }

        try {
            await addDoc(collection(firestore, 'ambassador'), {
                ...formData,
                timestamp: new Date(),
            });
            setFormSubmitted(true);
        } catch (error) {
            console.error('Error adding document: ', error);
        }
    };

    const nextStep = () => {
        setCurrentStep(currentStep + 1);
    };

    const prevStep = () => {
        setCurrentStep(currentStep - 1);
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <>
                        <h3 className="text-2xl font-bold text-white">Personal Information</h3>
                        <div className="form-group">
                            <label htmlFor="fullName" className="block text-sm font-medium text-white">Full Name:</label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                placeholder="Full Name"
                                value={formData.fullName}
                                className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-indigo-200"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phoneNumber" className="block text-sm font-medium text-white">Phone Number:</label>
                            <input
                                type="tel"
                                id="phoneNumber"
                                name="phoneNumber"
                                placeholder="Phone Number"
                                value={formData.phoneNumber}
                                className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-indigo-200"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label className="block text-sm font-medium text-white">Gender:</label>
                            <div className="user-type-options">
                                <div className="user-type-option">
                                    <input
                                        type="radio"
                                        id="male"
                                        name="gender"
                                        value="male"
                                        checked={formData.gender === 'male'}
                                        onChange={handleGenderChange}
                                    />
                                    <label htmlFor="male" className="mt-1 ml-1">Male</label>
                                </div>
                                <div className="user-type-option">
                                    <input
                                        type="radio"
                                        id="female"
                                        name="gender"
                                        value="female"
                                        checked={formData.gender === 'female'}
                                        onChange={handleGenderChange}
                                    />
                                    <label htmlFor="female" className="mt-1 ml-1">Female</label>
                                </div>
                                <div className="user-type-option">
                                    <input
                                        type="radio"
                                        id="preferNotToSay"
                                        name="gender"
                                        value="preferNotToSay"
                                        checked={formData.gender === 'preferNotToSay'}
                                        onChange={handleGenderChange}
                                    />
                                    <label htmlFor="preferNotToSay" className="mt-1 ml-1">Prefer not to say</label>
                                </div>
                                <div className="user-type-option">
                                    <input
                                        type="radio"
                                        id="other"
                                        name="gender"
                                        value="other"
                                        checked={formData.gender === 'other'}
                                        onChange={handleGenderChange}
                                    />
                                    <label htmlFor="other" className="mt-1 ml-1">Other</label>
                                </div>
                            </div>
                            {customGender && (
                                <input
                                    type="text"
                                    name="gender"
                                    placeholder="Please specify"
                                    value={formData.gender === 'other' ? formData.gender : ''}
                                    className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-indigo-200"
                                    onChange={handleChange}
                                />
                            )}
                        </div>
                        <div className="form-group">
                            <label htmlFor="email" className="block text-sm font-medium text-white">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-indigo-200"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="address" className="block text-sm font-medium text-white">Address:</label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                placeholder="Address"
                                value={formData.address}
                                className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-indigo-200"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="dateOfBirth" className="block text-sm font-medium text-white">Date of Birth:</label>
                            <input
                                type="date"
                                id="dateOfBirth"
                                name="dateOfBirth"
                                value={formData.dateOfBirth}
                                className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-indigo-200"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="nationality" className="block text-sm font-medium text-white">Nationality:</label>
                            <input
                                type="text"
                                id="nationality"
                                name="nationality"
                                placeholder="Nationality"
                                value={formData.nationality}
                                className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-indigo-200"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="flex justify-between">
                            <button type="button" onClick={prevStep} className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-gray-300" disabled={currentStep === 1}>Previous</button>
                            <button type="button" onClick={nextStep} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-green-300">Next</button>
                        </div>
                    </>
                );
            case 2:
                return (
                    <>
                        <h3 className="text-2xl font-bold text-white">Education</h3>
                        <div className="form-group">
                            <label className="block text-sm font-medium text-white">What category best describes you:</label>
                            <div className="flex flex-col gap-2">
                                <div className="user-type-option">
                                    <input
                                        type="radio"
                                        id="incomingInternational"
                                        name="category"
                                        value="incomingInternational"
                                        checked={formData.category === 'incomingInternational'}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="incomingInternational" className="mt-1 ml-1">Incoming student (international)</label>
                                </div>
                                <div className="user-type-option">
                                    <input
                                        type="radio"
                                        id="incomingDomestic"
                                        name="category"
                                        value="incomingDomestic"
                                        checked={formData.category === 'incomingDomestic'}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="incomingDomestic" className="mt-1 ml-1">Incoming student (domestic)</label>
                                </div>
                                <div className="user-type-option">
                                    <input
                                        type="radio"
                                        id="currentStudent"
                                        name="category"
                                        value="currentStudent"
                                        checked={formData.category === 'currentStudent'}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="currentStudent" className="mt-1 ml-1">Current student</label>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="block text-sm font-medium text-white">Current Level of Study:</label>
                            <div className="flex flex-col gap-2">
                                <div className="user-type-option">
                                    <input
                                        type="radio"
                                        id="highSchool"
                                        name="levelOfStudy"
                                        value="highSchool"
                                        checked={formData.levelOfStudy === 'highSchool'}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="highSchool" className="mt-1 ml-1">High school diploma</label>
                                </div>
                                <div className="user-type-option">
                                    <input
                                        type="radio"
                                        id="undergraduateFreshman"
                                        name="levelOfStudy"
                                        value="undergraduateFreshman"
                                        checked={formData.levelOfStudy === 'undergraduateFreshman'}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="undergraduateFreshman" className="mt-1 ml-1">Undergraduate Freshman (first year)</label>
                                </div>
                                <div className="user-type-option">
                                    <input
                                        type="radio"
                                        id="undergraduateSophomore"
                                        name="levelOfStudy"
                                        value="undergraduateSophomore"
                                        checked={formData.levelOfStudy === 'undergraduateSophomore'}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="undergraduateSophomore" className="mt-1 ml-1">Undergraduate Sophomore (Second year)</label>
                                </div>
                                <div className="user-type-option">
                                    <input
                                        type="radio"
                                        id="undergraduateSenior"
                                        name="levelOfStudy"
                                        value="undergraduateSenior"
                                        checked={formData.levelOfStudy === 'undergraduateSenior'}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="undergraduateSenior" className="mt-1 ml-1">Undergraduate Senior (Final year)</label>
                                </div>
                                <div className="user-type-option">
                                    <input
                                        type="radio"
                                        id="masters"
                                        name="levelOfStudy"
                                        value="masters"
                                        checked={formData.levelOfStudy === 'masters'}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="masters" className="mt-1 ml-1">Masters</label>
                                </div>
                                <div className="user-type-option">
                                    <input
                                        type="radio"
                                        id="phd"
                                        name="levelOfStudy"
                                        value="phd"
                                        checked={formData.levelOfStudy === 'phd'}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="phd" className="mt-1 ml-1">PhD</label>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="university" className="block text-sm font-medium text-white">University:</label>
                            <input
                                type="text"
                                id="university"
                                name="university"
                                placeholder="University"
                                value={formData.university}
                                className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-indigo-200"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="graduationYear" className="block text-sm font-medium text-white">Graduation Year:</label>
                            <input
                                type="text"
                                id="graduationYear"
                                name="graduationYear"
                                placeholder="Graduation Year"
                                value={formData.graduationYear}
                                className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-indigo-200"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="degreeProgram" className="block text-sm font-medium text-white">Degree Program:</label>
                            <input
                                type="text"
                                id="degreeProgram"
                                name="degreeProgram"
                                placeholder="Degree Program"
                                value={formData.degreeProgram}
                                className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-indigo-200"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label className="block text-sm font-medium text-white">Are you available to organize and attend events on campus?</label>
                            <div className="user-type-options">
                                <div className="user-type-option">
                                    <input
                                        type="radio"
                                        id="yesAvailableForEvents"
                                        name="availableForEvents"
                                        value="yes"
                                        checked={formData.availableForEvents === 'yes'}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="yesAvailableForEvents" className="mt-1 ml-1">Yes</label>
                                </div>
                                <div className="user-type-option">
                                    <input
                                        type="radio"
                                        id="noAvailableForEvents"
                                        name="availableForEvents"
                                        value="no"
                                        checked={formData.availableForEvents === 'no'}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="noAvailableForEvents" className="mt-1 ml-1">No</label>
                                </div>
                                <div className="user-type-option">
                                    <input
                                        type="radio"
                                        id="maybeAvailableForEvents"
                                        name="availableForEvents"
                                        value="maybe"
                                        checked={formData.availableForEvents === 'maybe'}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="maybeAvailableForEvents" className="mt-1 ml-1">Maybe</label>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <button type="button" onClick={prevStep} className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-gray-300">Previous</button>
                            <button type="button" onClick={nextStep} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-green-300">Next</button>
                        </div>
                    </>
                );
            case 3:
                return (
                    <>
                        <h3 className="text-2xl font-bold text-white">Employment Eligibility</h3>
                        <div className="form-group">
                            <label className="block text-sm font-medium text-white">Are you able to start work immediately?</label>
                            <div className="user-type-options">
                                <div className="user-type-option">
                                    <input
                                        type="radio"
                                        id="yesStartImmediately"
                                        name="canStartImmediately"
                                        value="yes"
                                        checked={formData.canStartImmediately === 'yes'}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="yesStartImmediately" className="mt-1 ml-1">Yes</label>
                                </div>
                                <div className="user-type-option">
                                    <input
                                        type="radio"
                                        id="noStartImmediately"
                                        name="canStartImmediately"
                                        value="no"
                                        checked={formData.canStartImmediately === 'no'}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="noStartImmediately" className="mt-1 ml-1">No</label>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="block text-sm font-medium text-white">Do you have a work permit/right to work in the UK?</label>
                            <div className="user-type-options">
                                <div className="user-type-option">
                                    <input
                                        type="radio"
                                        id="yesWorkPermit"
                                        name="workPermit"
                                        value="yes"
                                        checked={formData.workPermit === 'yes'}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="yesWorkPermit" className="mt-1 ml-1">Yes</label>
                                </div>
                                <div className="user-type-option">
                                    <input
                                        type="radio"
                                        id="noWorkPermit"
                                        name="workPermit"
                                        value="no"
                                        checked={formData.workPermit === 'no'}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="noWorkPermit" className="mt-1 ml-1">No</label>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="block text-sm font-medium text-white">Would you need a work permit to be employed in the UK in near future?</label>
                            <div className="user-type-options">
                                <div className="user-type-option">
                                    <input
                                        type="radio"
                                        id="yesNeedWorkPermitFuture"
                                        name="needWorkPermitFuture"
                                        value="yes"
                                        checked={formData.needWorkPermitFuture === 'yes'}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="yesNeedWorkPermitFuture" className="mt-1 ml-1">Yes</label>
                                </div>
                                <div className="user-type-option">
                                    <input
                                        type="radio"
                                        id="noNeedWorkPermitFuture"
                                        name="needWorkPermitFuture"
                                        value="no"
                                        checked={formData.needWorkPermitFuture === 'no'}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="noNeedWorkPermitFuture" className="mt-1 ml-1">No</label>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="block text-sm font-medium text-white">If shortlisted, do we need to make any specific arrangements to enable you to attend the interview?</label>
                            <div className="user-type-options">
                                <div className="user-type-option">
                                    <input
                                        type="radio"
                                        id="yesInterviewAdjustments"
                                        name="interviewAdjustments"
                                        value="yes"
                                        checked={formData.interviewAdjustments === 'yes'}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="yesInterviewAdjustments" className="mt-1 ml-1">Yes</label>
                                </div>
                                <div className="user-type-option">
                                    <input
                                        type="radio"
                                        id="noInterviewAdjustments"
                                        name="interviewAdjustments"
                                        value="no"
                                        checked={formData.interviewAdjustments === 'no'}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="noInterviewAdjustments" className="mt-1 ml-1">No</label>
                                </div>
                            </div>
                            {formData.interviewAdjustments === 'yes' && (
                                <textarea
                                    name="interviewAdjustmentsDetails"
                                    placeholder="Please specify adjustments"
                                    value={formData.interviewAdjustmentsDetails}
                                    className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-indigo-200"
                                    onChange={handleChange}
                                />
                            )}
                        </div>
                        <div className="form-group">
                            <label htmlFor="hoursPerWeek" className="block text-sm font-medium text-white">How many hours per week can you dedicate to the Ambassador Program?</label>
                            <input
                                type="text"
                                id="hoursPerWeek"
                                name="hoursPerWeek"
                                placeholder="Number of hours"
                                value={formData.hoursPerWeek}
                                className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-indigo-200"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="flex justify-between">
                            <button type="button" onClick={prevStep} className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-gray-300">Previous</button>
                            <button type="button" onClick={nextStep} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-green-300">Next</button>
                        </div>
                    </>
                );
            case 4:
                return (
                    <>
                        <h3 className="text-2xl font-bold text-white">Personal Statement</h3>
                        <div className="form-group">
                            <label htmlFor="personalStatement" className="block text-sm font-medium text-white">Why do you want to become a WorldLynk Ambassador?</label>
                            <textarea
                                id="personalStatement"
                                name="personalStatement"
                                placeholder="Max. 200 words"
                                value={formData.personalStatement}
                                className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-indigo-200"
                                maxLength={200}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="requirementsDetail" className="block text-sm font-medium text-white">Please detail below how you meet the requirements of the person specification, particularly how you feel you can demonstrate the skills required for this position and your reasons for applying for this position. This is the part of the application form where you can bring to our attention any qualities you believe we should be aware of:</label>
                            <textarea
                                id="requirementsDetail"
                                name="requirementsDetail"
                                value={formData.requirementsDetail}
                                className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-indigo-200"
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>
                        <div className="flex justify-between">
                            <button type="button" onClick={prevStep} className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-gray-300">Previous</button>
                            <button type="button" onClick={nextStep} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-green-300">Next</button>
                        </div>
                    </>
                );
            case 5:
                return (
                    <div className="">
                        <h3 className="text-2xl font-bold text-white">Declaration</h3>
                        <div className="form-group">
                            <label className="block text-sm font-medium text-white">I declare that the information given in this application form is true and complete. I understand that if I have given any misleading information on this form or made any omissions, this will be sufficient grounds for terminating my employment.</label>
                            <div className="user-type-options">
                                <div className="user-type-option">
                                    <input
                                        type="radio"
                                        id="declarationYes"
                                        name="declaration"
                                        value="yes"
                                        checked={formData.declaration === 'yes'}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="declarationYes" className="mt-1 ml-1">Yes</label>
                                </div>
                                <div className="user-type-option">
                                    <input
                                        type="radio"
                                        id="declarationNo"
                                        name="declaration"
                                        value="no"
                                        checked={formData.declaration === 'no'}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="declarationNo" className="mt-1 ml-1">No</label>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <button type="button" onClick={prevStep} className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-gray-300">Previous</button>
                            <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-green-300">Submit</button>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div>
            <NewNav />
            <div className="bg-gray-800 text-white ">
                <div className="join-container mx-auto max-w-7xl px-4 flex justify-center items-center">
                    <div className="left-column mr-12">
                        <div className="heading mb-8">
                            <h3 className="text-2xl font-bold">Welcome to<span className="text-color-green"> WorldLynk</span></h3>
                            <h3 className="text-2xl font-bold">Application for Worldlynk Ambassador Program</h3>
                        </div>
                        <p className="large-text mb-8">Join the Worldlynk Ambassador Program and become a vital link between Worldlynk, students, and your university. As an ambassador, you will promote our services, organize events, and build a strong community. This part-time role is for current and incoming students only.</p>
                    </div>
                    <div className="right-column rounded-lg shadow-md">
                        <div className="form-section">
                            {!formSubmitted ? (
                                <form onSubmit={handleSubmit} className="space-y-6 mb-52">
                                    {renderStep()}
                                </form>
                            ) : (
                                <div className="message-container">
                                    <h2 className="text-2xl font-bold">Exciting Journey Ahead!</h2>
                                    <p>Your application has been received.</p>
                                    <p>Follow us on <a href='https://www.instagram.com/_worldlynk_/'>Instagram</a></p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <div className="footer-brand-logos bg-gray-800 py-8 ">
                <h4 className="brand-text text-black">BRANDS THAT<br />LOVE US !</h4>
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
