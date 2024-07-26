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
              <h3 className="text-2xl font-bold">
                Welcome to<span className="text-color-green"> WorldLynk</span>
              </h3>
              <h3 className="text-2xl font-bold">
                Unlock the full potential of your brand by partnering with us at
                WorldLynk.
              </h3>
            </div>

            <p className="large-text mb-8">
              Position yourself as a leader in shaping the future of student
              life in the UK! Forge a partnership with us today and access our
              cutting-edge platform early. Crafted to revolutionize the student
              experience, our comprehensive platform offers endless
              opportunities for collaboration and innovation in education.
            </p>
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
                        placeholder="Mail address"
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
