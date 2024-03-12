import React, { useState, useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import { ref,uploadBytesResumable,getDownloadURL } from "firebase/storage";
import { firestore ,storage} from "../../firebase"; // Import your firebase configuration

import Slider from "react-slick";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";


const Loader = () => (
  <div className="loader-container">
    <div className="loader"></div>
  </div>
);
const EventUploadForm = (user) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [time, setTime] = useState("");
  const [image, setImage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [multipleImages, setMultipleImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [eventData,setEventData]=useState({
    eventName:'',
    location:'',
    description:'',
    images:[],
    instagram:'',
    linkedIn:'',
    twitter:'',
  })

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
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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

    // Upload data to Firestore
    try {
      const docRef = await addDoc(collection(firestore, "events"), {
        eventName: title,
        location,
        description,
        images: multipleImages,
        instagram: eventData.instagram,
        linkedIn: eventData.linkedIn,
        twitter: eventData.twitter,
      });
  
      console.log("Document written with ID: ", docRef.id);
  
      // Reset form fields after a short delay
      setTimeout(() => {
        setTitle("");
        setLocation("");
        setDescription("");
        setMultipleImages([]);
        setEventData({
          eventName: "",
          location: "",
          description: "",
          images: [],
          instagram: "",
          linkedIn: "",
          twitter: "",
        });
        setLoading(false);
      }, 0);
  
      // Show success message
      toast.success("Event data uploaded successfully!");
    } catch (error) {
      console.error("Error adding document: ", error);
      toast.error("Error uploading event data");
      setLoading(false)
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
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md text-black"
              />
            </div>

            <div className="flex-grow">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white-700"
              >
                Location:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Select location"
                onChange={(e) => setLocation(e.target.value)}
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
                onChange={(e) => setDescription(e.target.value)}
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
            <div className="flex items-center">
              <FaInstagram className="text-2xl mr-4" />

              <input
                type="text"
                id="instagram"
                name="instagram"
                placeholder="Enter Instagram link"
                className="mt-1 p-2 w-full border rounded-md text-black"
              />
            </div>

            <div className="flex items-center">
              <FaLinkedin className="text-2xl mr-4" />

              <input
                type="text"
                id="linkedin"
                name="linkedin"
                placeholder="Enter LinkedIn link"
                className="mt-1 p-2 w-full border rounded-md text-black"
              />
            </div>

            <div className="flex items-center">
              <FaTwitter className="text-2xl mr-4" />

              <input
                type="text"
                id="twitter"
                name="twitter"
                placeholder="Enter Twitter link"
                className="mt-1 p-2 w-full border rounded-md text-black"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full p-2 lg:w-1/3">
        <div className="rounded-lg bg-card h-80">{/* <Satisfication /> */}</div>
      </div>
      <div className="w-full p-2 lg:w-1/3">
        <div className="rounded-lg bg-card overflow-hidden h-80">
          {/* <AddComponent /> */}
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default EventUploadForm;
