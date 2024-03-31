import React, { useState, useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import { firestore, storage } from "../../firebase"; // Import your firebase configuration
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-time-picker/dist/TimePicker.css";
import { updateDoc, doc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAuth } from "../../auth/userProvider/AuthProvider";
const Loader = () => (
  <div className="loader-container">
    <div className="loader"></div>
  </div>
);
const EventUploadForm = (user) => {
  const auth = useAuth();
  const [refresh, setRefresh] = useState(false);
  const [dateTime, setDateTime] = useState("");

  // const [location, setLocation] = useState("");

  const [loading, setLoading] = useState(false);

  const [eventImageURL, setEventImageURL] = useState(null);

  const [guestImageURL, setGuestImageURL] = useState("");

  const [eventData, setEventData] = useState({
    eventId: "",
    TimeAndDate: new Date(),
    duration: "",
    eligibility: "",
    entryFee: "",
    eventCategory: "",
    eventDescription: "",

    eventName: "",
    experince: "",
    guestImage: "",
    guestName: "",
    language: "",
    location: "",
    eventImage: "",
  });

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const storage = getStorage();
      const storageRef = ref(
        storage,
        `events/${eventData.eventId}/${eventData.eventName}/eventImage/${file.name}`
      );

      try {
        setLoading(true);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        setEventImageURL(downloadURL); // Update state with the image URL
        setLoading(false);
      } catch (error) {
        console.error("Error uploading image: ", error);
        setLoading(false);
      }
    }
  };

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

  const handleGuestImageChange = async (e) => {
    const file = e.target.files[0]; // Get the first file from the input
    if (file) {
      const storage = getStorage();
      const storageRef = ref(
        storage,
        `events/${eventData.eventId}/${eventData.eventName}/guestName/${eventData.guestName}/guestImage/${file.name}`
      );

      try {
        setLoading(true);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        setGuestImageURL(downloadURL); // Update state with the guest image URL
        setLoading(false);
      } catch (error) {
        console.error("Error uploading guest image: ", error);
        setLoading(false);
      }
    }
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

  const handleDateTimeChange = (e) => {
    setDateTime(e.target.value);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      // Upload data to Firestore
      const docRef = await addDoc(collection(firestore, "events"), {
        ...eventData, // Include all eventData
        guestImage: guestImageURL,
        eventImage: eventImageURL,
      });

      // Get the newly generated document ID
      const eventId = docRef.id;
      setEventData({ ...eventData, eventId: eventId }); // Update eventId in state

      // Update the document with the eventId
      await updateDoc(doc(firestore, "events", eventId), {
        eventId: eventId,
      });

      // Reset form fields
      setTimeout(() => {
        setEventData({
          ...eventData,
          TimeAndDate: "",
          duration: "",
          eligibility: "",
          entryFee: "",
          eventCategory: "",
          eventDescription: "",
          eventName: "",
          experience: "",
          guestImage: null,
          guestName: "",
          language: "",
          location: "",
          eventImage: null,
        });
        setDateTime(""); // Reset dateTime state
        setLoading(false);
      }, 0);

      // Show success message
      toast.success("Event data uploaded successfully!");
      setRefresh(true);
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
                htmlFor="location"
                className="block text-sm font-medium text-white-700"
              >
                Venue:
              </label>
              <input
                type="location"
                id="location"
                name="location"
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
          <div className="flex items-center justify-center w-full h-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              {eventImageURL ? (
                <img
                  src={eventImageURL}
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
          </div>

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
                id="eligibility"
                name="eligibility"
                placeholder="Enter eligibility "
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
                id="Category"
                name="Category"
                placeholder="Enter Category"
                onChange={handleEventCategoryChange}
                className="mt-1 p-2 w-full border rounded-md text-black"
              />
            </div>
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
                htmlFor="entryFee"
                className="block text-sm font-medium text-white-700"
              >
                Entry Fee:
              </label>
              <input
                type="text"
                id="entryFee"
                name="entryFee"
                placeholder="Entry Fee"
                onChange={handleEntryFeeChange}
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
                onChange={handleLanguageChange}
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

              <input
                type="datetime-local"
                value={dateTime}
                onChange={handleDateTimeChange}
              />
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EventUploadForm;
