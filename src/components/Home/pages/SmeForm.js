// Join.js
import React, { useState } from "react";
import haldiram3 from "../../../assets/img/haldiram3.png";
import IQ from "../../../assets/img/IQ.svg";
import "../styles/Join.css";
import Chip from "@mui/material/Chip";
import { firestore } from "../../../firebase";
import { collection, addDoc } from "firebase/firestore";
import NewNav from "../sub-components/NewNav";
import Footer from "../sub-components/Footer";
import animationData from "../../../assets/lotties/partner.json"
import LottieAnimation from "../sub-components/LottieAnimation";


const SmeForm = () => {
  const [selectedCommunications, setSelectedCommunications] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    comapanyMail: "",
    role: "",
    primaryContact: "",
    secondaryContact: "",
    websiteLink: "",
    description: "",
    purpose: "",

    preferedCommunication: [],
  });

  const handleChipClick = (interest) => {
    let updatedCommunications = [];
    if (selectedCommunications.includes(interest)) {
      updatedCommunications = selectedCommunications.filter(
        (item) => item !== interest
      );
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

    // Extracting data from the form data
    const {
      companyName,
      comapanyMail,
      role,
      primaryContact,
      secondaryContact,
      websiteLink,
      description,
      purpose,
    } = formData;

    // Setting default value for interests if none selected
    const preferedCommunication =
      selectedCommunications.length > 0 ? selectedCommunications : ["None"];

    try {
      console.log(formData);

      // Accessing the "form" collection in Firestore and adding a new document
      await addDoc(collection(firestore, "sme"), {
        companyName,
        comapanyMail,
        role,
        primaryContact,
        secondaryContact,
        websiteLink,
        description,
        purpose,
        preferedCommunication, // Use the preferedCommunication variable here
        timestamp: new Date(), // Adding a timestamp field with the current date and time
      });

      console.log(formData);
      setFormSubmitted(true); // Setting formSubmitted state to true after successful submission
    } catch (error) {
      console.error("Error adding document: ", error); // Logging any errors that occur during the process
    }
  };

  return (
    <div>
      <NewNav />
      <div className="bg-gray-800 text-white">
        <div className="join-container mx-auto max-w-7xl px-4 flex justify-center items-center">
          <div className="left-column mr-12">
            <div className="heading mb-8">
              <h3 className="text-3xl font-bold">
                Welcome to<span className="text-color-green"> WorldLynk</span>
              </h3>
              <h3 className="text-2xl font-bold">
                Unlock the full potential of your brand by partnering with us at
                WorldLynk.
              </h3>
            </div>

            {/* <p className="large-text mb-8">
              Position yourself as a leader in shaping the future of student
              life in the UK! Forge a partnership with us today and access our
              cutting-edge platform early. Crafted to revolutionize the student
              experience, our comprehensive platform offers endless
              opportunities for collaboration and innovation in education.
            </p> */}
            <div className='flex gap-2'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-5 text-blue-600">
                <path d="M11.25 5.337c0-.355-.186-.676-.401-.959a1.647 1.647 0 0 1-.349-1.003c0-1.036 1.007-1.875 2.25-1.875S15 2.34 15 3.375c0 .369-.128.713-.349 1.003-.215.283-.401.604-.401.959 0 .332.278.598.61.578 1.91-.114 3.79-.342 5.632-.676a.75.75 0 0 1 .878.645 49.17 49.17 0 0 1 .376 5.452.657.657 0 0 1-.66.664c-.354 0-.675-.186-.958-.401a1.647 1.647 0 0 0-1.003-.349c-1.035 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401.31 0 .557.262.534.571a48.774 48.774 0 0 1-.595 4.845.75.75 0 0 1-.61.61c-1.82.317-3.673.533-5.555.642a.58.58 0 0 1-.611-.581c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.035-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959a.641.641 0 0 1-.658.643 49.118 49.118 0 0 1-4.708-.36.75.75 0 0 1-.645-.878c.293-1.614.504-3.257.629-4.924A.53.53 0 0 0 5.337 15c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.036 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.369 0 .713.128 1.003.349.283.215.604.401.959.401a.656.656 0 0 0 .659-.663 47.703 47.703 0 0 0-.31-4.82.75.75 0 0 1 .83-.832c1.343.155 2.703.254 4.077.294a.64.64 0 0 0 .657-.642Z" />
              </svg>


              <p className="large-text mb-8">
                Position yourself as a leader in shaping the future of student
                life in the UK!
              </p>

            </div>
            <div className='flex gap-2'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26" fill="currentColor" class="size-6 text-blue-600">
                <path d="M11.25 5.337c0-.355-.186-.676-.401-.959a1.647 1.647 0 0 1-.349-1.003c0-1.036 1.007-1.875 2.25-1.875S15 2.34 15 3.375c0 .369-.128.713-.349 1.003-.215.283-.401.604-.401.959 0 .332.278.598.61.578 1.91-.114 3.79-.342 5.632-.676a.75.75 0 0 1 .878.645 49.17 49.17 0 0 1 .376 5.452.657.657 0 0 1-.66.664c-.354 0-.675-.186-.958-.401a1.647 1.647 0 0 0-1.003-.349c-1.035 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401.31 0 .557.262.534.571a48.774 48.774 0 0 1-.595 4.845.75.75 0 0 1-.61.61c-1.82.317-3.673.533-5.555.642a.58.58 0 0 1-.611-.581c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.035-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959a.641.641 0 0 1-.658.643 49.118 49.118 0 0 1-4.708-.36.75.75 0 0 1-.645-.878c.293-1.614.504-3.257.629-4.924A.53.53 0 0 0 5.337 15c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.036 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.369 0 .713.128 1.003.349.283.215.604.401.959.401a.656.656 0 0 0 .659-.663 47.703 47.703 0 0 0-.31-4.82.75.75 0 0 1 .83-.832c1.343.155 2.703.254 4.077.294a.64.64 0 0 0 .657-.642Z" />
              </svg>

              <p className="large-text mb-8">
                Forge a partnership with us today and access our
                cutting-edge platform early.
              </p>

            </div>
            <div className='flex gap-2'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-9 text-blue-600">
                <path d="M11.25 5.337c0-.355-.186-.676-.401-.959a1.647 1.647 0 0 1-.349-1.003c0-1.036 1.007-1.875 2.25-1.875S15 2.34 15 3.375c0 .369-.128.713-.349 1.003-.215.283-.401.604-.401.959 0 .332.278.598.61.578 1.91-.114 3.79-.342 5.632-.676a.75.75 0 0 1 .878.645 49.17 49.17 0 0 1 .376 5.452.657.657 0 0 1-.66.664c-.354 0-.675-.186-.958-.401a1.647 1.647 0 0 0-1.003-.349c-1.035 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401.31 0 .557.262.534.571a48.774 48.774 0 0 1-.595 4.845.75.75 0 0 1-.61.61c-1.82.317-3.673.533-5.555.642a.58.58 0 0 1-.611-.581c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.035-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959a.641.641 0 0 1-.658.643 49.118 49.118 0 0 1-4.708-.36.75.75 0 0 1-.645-.878c.293-1.614.504-3.257.629-4.924A.53.53 0 0 0 5.337 15c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.036 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.369 0 .713.128 1.003.349.283.215.604.401.959.401a.656.656 0 0 0 .659-.663 47.703 47.703 0 0 0-.31-4.82.75.75 0 0 1 .83-.832c1.343.155 2.703.254 4.077.294a.64.64 0 0 0 .657-.642Z" />
              </svg>

              <p className="large-text mb-8">
                Crafted to revolutionize the student
                experience, our  platform offers endless
                opportunities for collaboration and innovation in education.
              </p>

            </div>
            <div className='-mt-20'>
              <LottieAnimation
                animationData={animationData}
                className="max-w-full h-auto"
              />
            </div>
            {/* <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.idErpdfd8op7fFKUY4YZUAHaFb%26pid%3DApi&f=1&ipt=46dba4cdfa807edd831d8068889c7c1a9304f9b4dd93cf6d06931d739b632252&ipo=images" alt="partneship" /> */}
            {/* <div>
              <img
                src="https://join.getwyld.in/assets/images/line.png"
                alt=""
              />
            </div> */}
            {/* <div
              className="nav-right-content desktop"
              style={{ marginTop: "10px" }}
            >
              <a href="/" className="glass-button smaller w-button  rounded-lg bg-orange-500 hover:bg-orange-600" style={{ textDecoration: 'none', color: 'white', padding: '0.8rem' }}>Back to homepage</a>
            </div> */}
          </div>
          <div className="right-column  rounded-lg shadow-md">
            <div className="form-section">
              {!formSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h2 className="text-2xl font-bold text-white">Contact Us</h2>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="companyName" className="text-white">
                        Company name:
                      </label>
                      <input
                        type="text"
                        id="companyName"
                        name="companyName"
                        placeholder="Company name"
                        onChange={handleChange}
                        className="input-field p-2"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="companyEmail" className="text-white">
                        Company mail:
                      </label>
                      <input
                        type="email"
                        id="companyEmail"
                        name="companyEmail"
                        placeholder="Email address"
                        onChange={handleChange}
                        className="input-field p-2"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="role" className="text-white">
                        Role in Company:
                      </label>
                      <input
                        type="text"
                        id="role"
                        name="role"
                        placeholder="Your role"
                        onChange={handleChange}
                        className="input-field p-2"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="primaryContact" className="text-white">
                        Primary Contact:
                      </label>
                      <input
                        type="tel"
                        id="primaryContact"
                        name="primaryContact"
                        placeholder="(XXX) XXXXX-XXXXX"
                        onChange={handleChange}
                        className="input-field p-2"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="secondaryContact" className="text-white">
                        Secondary Contact:
                      </label>
                      <input
                        type="text"
                        id="secondaryContact"
                        name="secondaryContact"
                        placeholder="(XXX) XXXXX-XXXXX"
                        onChange={handleChange}
                        className="input-field p-2"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="websiteLink" className="text-white">
                        Website URL:
                      </label>
                      <input
                        type="text"
                        id="websiteLink"
                        name="websiteLink"
                        placeholder="Company website"
                        onChange={handleChange}
                        className="input-field p-2"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-row text-white">
                    <div className="form-group">
                      <label htmlFor="descripton" className="text-white">
                        Brief description about your company:
                      </label>
                      <textarea
                        type="text"
                        id="descripton"
                        rows="3"
                        name="descripton"
                        placeholder="Company details"
                        onChange={handleChange}
                        className="input-field text-white p-2"
                        style={{ color: 'white', '::placeholder': { color: 'white' } }}
                        required
                      />

                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="purpose" className="text-white">
                        Why are you interested in forming  partnership ?
                      </label>
                      <textarea
                        type="text"
                        id="purpose"
                        rows="5"
                        name="purpose"
                        placeholder="Your answer"
                        onChange={handleChange}
                        className="input-field p-2"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group interests-group">
                      <label htmlFor="preferedCommunication" className="text-white">
                        Preferred method of Communications:
                      </label>
                      <div className="space-x-2">
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
                      </div>
                    </div>
                  </div>

                  <div className="">
                    <button
                      type="submit"
                      className="bg-green-500 hover:bg-green-600 text-black py-2 px-4 rounded mr-4"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              ) : (
                <div className="message-container">
                  <h2 className="text-2xl font-bold text-white">
                    You are in waitlist!
                  </h2>
                  <p className="text-white">
                    Your application has been received.
                  </p>
                  {/* Add any additional content or styling for the message */}
                </div>
              )}
            </div>
          </div>
        </div>
        <Footer />
        <div className="footer-brand-logos">
          <h4 className="brand-text text-black">
            BRANDS THAT
            <br />
            LOVE US !
          </h4>
          <div className="brand-logos">
            <a href="https://www.haldiramuk.com/">
              <img src={haldiram3} alt="HALDIRAM'S" />
            </a>
            <a href="https://www.iqstudentaccommodation.com/">
              <img src={IQ} alt="IQ-STUDENT-ACCOMODATION" />
            </a>
            <a href="https://www.nus.org.uk/">
              <img
                src="https://assets.nationbuilder.com/themes/660d3381d0055b53937ac0db/attachments/original/1659555380/logo.webp?1659555380"
                alt="NUS"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmeForm;
