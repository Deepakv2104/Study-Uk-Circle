import React, { useState, useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { firestore, storage } from "../../firebase"; // Import your firebase configuration
import Icon from "../Admin/small-comp/Icon";
import Slider from "react-slick";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import { updateDoc,doc } from "firebase/firestore";

const Loader = () => (
  <div className="loader-container">
    <div className="loader"></div>
  </div>
);
const EventUploadForm = (user) => {
  // const [title, setTitle] = useState("");
  // const [description, setDescription] = useState("");
  const [dateTime, setDateTime] = useState('');
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [time, setTime] = useState("");
  const [image, setImage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [multipleImages, setMultipleImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [guestSpeakers, setGuestSpeakers] = useState('');
  const [designation, setDesignation] = useState('');
  const [registrationInfo, setRegistrationInfo] = useState('');
  

  const [eventData, setEventData] = useState({
    TimeAndDate: new Date(),
  duration:'',
  eligibility:'',
  entryFee:'',
  eventCategory:'',
eventDescription:'',
eventId:'',
eventName:'',
experince:'',
guestImage:'',
guestName:'',
language:'',
location:'',
  });
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("12:00");

  const handleTitleChange = (e) => {
    setEventData({ ...eventData, eventName: e.target.value });
  };
  
  const handleLocationChange = (e) => {
    setEventData({ ...eventData, location: e.target.value });
  };
  
  const handleDescriptionChange = (e) => {
    setEventData({ ...eventData, eventDescription: e.target.value });
  };
  
  
  const handleExperienceChange = (e) => {
    setEventData({ ...eventData, experience: e.target.value });
  };
  
  const handleGuestImageChange = (e) => {
    setEventData({ ...eventData, guestImage: e.target.value });
  };
  
  const handleGuestNameChange = (e) => {
    setEventData({ ...eventData, guestName: e.target.value });
  };
  
  const handleLanguageChange = (e) => {
    setEventData({ ...eventData, language: e.target.value });
  };
  
  const handleTimeAndDateChange = (date) => {
    setEventData({ ...eventData, TimeAndDate: date });
  };
  
  const handleDurationChange = (e) => {
    setEventData({ ...eventData, duration: e.target.value });
  };
  
  const handleEligibilityChange = (e) => {
    setEventData({ ...eventData, eligibility: e.target.value });
  };
  
  const handleEntryFeeChange = (e) => {
    setEventData({ ...eventData, entryFee: e.target.value });
  };
  
  const handleEventCategoryChange = (e) => {
    setEventData({ ...eventData, eventCategory: e.target.value });
  };
  
  // const handleEventIdChange = (e) => {
  //   setEventData({ ...eventData, eventId: e.target.value });
  // };
  const handleDateTimeChange = (e) => {
    setDateTime(e.target.value);
  };

  // const handleDataChange = (e) => {
  //   setData(e.target.value);
  // };


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const handleFileChange = async (e) => {
    const files = e.target.files;
    const imagesArray = [];

    setIsUploading(true);

    for (const file of files) {
      const storageRef = ref(storage, `images/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
        },
        (error) => {
          console.error(error);
          toast.error("Error uploading image");
          setIsUploading(false);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          imagesArray.push(downloadURL);
          setMultipleImages(imagesArray);
          setIsUploading(false);
        }
      );
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // Prevent multiple submissions while the form is being submitted
    if (loading) {
      return;
    }
  
    setLoading(true);
  
    try {
      // Upload data to Firestore
      const docRef = await addDoc(collection(firestore, "events"), {
        TimeAndDate: eventData.TimeAndDate,
        duration: eventData.duration,
        eligibility: eventData.eligibility,
        entryFee: eventData.entryFee,
        eventCategory: eventData.eventCategory,
        eventDescription: eventData.eventDescription,
        eventName: eventData.eventName,
        experience: eventData.experience,
        guestImage: eventData.guestImage,
        guestName: eventData.guestName,
        language: eventData.language,
        location: location,
      });
  
      // Get the newly generated document ID
      const eventId = docRef.id;
  
      // Update the document with the eventId
      await updateDoc(doc(firestore, "events", eventId), {
        eventId: eventId,
      });
  
      console.log("Document written with ID: ", eventId);
  
      // Reset form fields after a short delay
      setTimeout(() => {
        setEventData({
          TimeAndDate: '',
          duration: '',
          eligibility: '',
          entryFee: '',
          eventCategory: '',
          eventDescription: '',
          eventName: '',
          experience: '',
          guestImage: '',
          guestName: '',
          language: '',
          location: '',
        });
        setLoading(false);
      }, 0);
  
      // Show success message
      toast.success("Event data uploaded successfully!");
    } catch (error) {
      console.error("Error adding document: ", error);
      toast.error("Error uploading event data");
      setLoading(false);
    }
  };
  

  return (
    <div className=" h-screen flex-grow overflow-x-hidden overflow-auto flex flex-wrap content-start p-2  ">
      <div className="w-full p-2 lg:w-1/3">
        <div className="rounded-lg bg-card h-full sm:p-4">
          <form className="flex flex-col h-full space-y-4">
            <div className="flex-grow">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-white-700"
              >
                Event Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter event name"
               onChange={handleTitleChange}
                className="mt-1 p-2 w-full border rounded-md text-black"
              />
            </div>

            <div className="flex-grow">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white-700"
              >
                Venue:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Select location"
             onChange={handleLocationChange}
                className="mt-1 p-2 w-full border rounded-md text-black"
              />
            </div>

            <div className="flex-grow">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-white-700"
              >
                Description:
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                placeholder="Tell about the event"
                onChange={handleDescriptionChange}
                className="mt-1 p-2 w-full border rounded-md text-black"
              ></textarea>
            </div>

            <button
              type="submit"
             onClick={handleFormSubmit}
              className="w-full bg-lime-700 text-white p-2 rounded-md hover:bg-lime-600"
              disabled={loading}
            >
              {loading ? <Loader /> : "Submit"}
            </button>
          </form>
        </div>
      </div>
      <div className="w-full p-2 lg:w-2/3">
        <div className="rounded-lg bg-card h-80">
          {/* <div className="flex items-center justify-center w-full h-full">
            {multipleImages.length > 0 ? (
              <Slider {...settings} className="w-full h-90">
                {multipleImages.map((image, index) => (
                  <div key={index} className="w-full h-80">
                    <img
                      src={image}
                      alt={`Uploaded ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </Slider>
            ) : (
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                {uploadedImage ? (
                  <img
                    src={uploadedImage}
                    alt="Uploaded"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      ></path>
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                )}
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  multiple
                />
              </label>
            )}
          </div> */}

          <div>
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="multiple_files"
            >
              Upload multiple files
            </label>
            <input
              id="multiple_files"
              type="file"
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              onChange={handleFileChange}
              multiple
            />
          </div>
        </div>
      </div>
      <div className="w-full p-2 lg:w-1/3">
        <div className="rounded-lg bg-card h-80 p-4">
          <div className="flex flex-col space-y-4 h-full p-1">
            <div className="flex-grow">
            <label
                htmlFor="message"
                className="block text-sm font-medium text-white-700"
              >
                Duration
              </label>
              <input
                type="text"
                id="instagram"
                name="instagram"
                placeholder="Duration"
                onChange={handleDurationChange}
                className="mt-1 p-2 w-full border rounded-md text-black"
              />
            </div>

            <div className="flex-grow">
            <label
                htmlFor="message"
                className="block text-sm font-medium text-white-700"
              >
               Eligibility
              </label>

              <input
                type="text"
                id="linkedin"
                name="linkedin"
                placeholder="Enter LinkedIn link"
                onChange={handleEligibilityChange}
                className="mt-1 p-2 w-full border rounded-md text-black"
              />
            </div>

            <div className="flex-grow">
            
              <label
                htmlFor="message"
                className="block text-sm font-medium text-white-700"
              >
              Category
              </label>
              <input
                type="text"
                id="twitter"
                name="twitter"
                placeholder="Enter Twitter link"
                onChange={handleEventCategoryChange}
                className="mt-1 p-2 w-full border rounded-md text-black"
              />
            </div>

            {/* <button
              className="flex items-center p-2.5 mt-4"
              style={{
                background: "#2f49d1",
                borderRadius: "10px",
                padding: "8px 16px",
                justifyContent: "center",
                color: "white",
              }}
            >
              <Icon path="res-react-dash-add-component" className="w-5 h-5" />
              <div className="ml-2">Add Links</div>
            </button> */}
          </div>
        </div>
      </div>

      <div className="w-full p-2 lg:w-1/3">
        <div className="rounded-lg bg-card h-full sm:p-4">
          <form className="flex flex-col h-full space-y-4">
          <div className="flex-grow">
      <label
        htmlFor="name"
        className="block text-sm font-medium text-white-700"
      >
        Guest Speaker(s):
      </label>
      <input
        type="text"
        id="name"
        name="name"
        placeholder="Enter guest speaker(s) name"
        onChange={handleGuestNameChange}
        // value={guestSpeakers}
      
        className="mt-1 p-2 w-full border rounded-md text-black"
      />
    </div>

    <div className="flex-grow">
      <label
        htmlFor="designation"
        className="block text-sm font-medium text-white-700"
      >
        Designation:
      </label>
      <input
        type="text"
        id="designation"
        name="designation"
        placeholder="Enter designation"
        // value={designation}
        onChange={handleExperienceChange}
       
        className="mt-1 p-2 w-full border rounded-md text-black"
      />
    </div>
<div className="flex-grow">
  <label
  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
  htmlFor="multiple_files"
  >
   Guest Profile:
  </label>
  <input
              id="multiple_files"
              type="file"
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              onChange={handleGuestImageChange}
              multiple
            />
</div>
          </form>
        </div>
      </div>
      <div className="w-full p-2 lg:w-1/3">
        <div className="rounded-lg bg-card h-full sm:p-4">
          <form className="flex flex-col h-full space-y-4">
          <div className="flex-grow">
      <label
        htmlFor="registrationInfo"
        className="block text-sm font-medium text-white-700"
      >
       Entry Fee:
      </label>
      <input
        type="text"
        id="registrationInfo"
        name="registrationInfo"
        placeholder="Enty Fee"

        onClick={handleEntryFeeChange}
        className="mt-1 p-2 w-full border rounded-md text-black"
      />
    </div>

            <div className="flex-grow">
              <label
                htmlFor="language"
                className="block text-sm font-medium text-white-700"
              >
               Language:
              </label>
              <input
                type="text"
                id="language"
                name="language"
                placeholder=" Enter Language"
               onClick={handleLanguageChange}
                className="mt-1 p-2 w-full border rounded-md text-black"
              />
            </div>

            <div className="flex-grow">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-white-700"
              >
                Target Audience:
              </label>
              {/* <DatePicker
          selected={eventData.TimeAndDate}
          onChange={handleTimeAndDateChange}
          className="mt-1 p-2 w-full border rounded-md text-black"
          showTimeSelect
          dateFormat="Pp"
        /> */}
         <input type="datetime-local" value={dateTime} onChange={handleDateTimeChange} />
      {/* <textarea value={data} onChange={handleDataChange} /> */}
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EventUploadForm;
