import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase'; // Import your firebase configuration
import FileUploader from 'react-firebase-file-uploader';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

const EventUploadForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [time, setTime] = useState('');
  const [image, setImage] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [multipleImages, setMultipleImages] = useState([]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const handleFileChange = (event) => {
    const files = event.target.files;

    if (files.length === 1) {
      // Single file upload logic
      const file = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else if (files.length > 1) {
      // Multiple files upload logic
      const imagesArray = Array.from(files).map((file) => URL.createObjectURL(file));
      setMultipleImages(imagesArray);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    if (!title || !description || !date || !location || !time || !image) {
      // Handle form validation error (e.g., show an error message)
      return;
    }

    try {
      // Add the event data to the Firestore database
      const docRef = await addDoc(collection(db, 'events'), {
        title,
        description,
        date,
        location,
        time,
        imageUrl: image,
        // Add more fields as needed
      });

      console.log('Document written with ID: ', docRef.id);

      // Optionally, reset the form after successful submission
      setTitle('');
      setDescription('');
      setDate('');
      setLocation('');
      setTime('');
      setImage('');
      setIsUploading(false);
      setProgress(0);
    } catch (error) {
      console.error('Error adding document: ', error);
      // Handle the error (e.g., show an error message to the user)
    }
  };

  const handleUploadStart = () => {
    setIsUploading(true);
    setProgress(0);
  };

  const handleUploadProgress = (progress) => {
    setProgress(progress);
  };

  const handleUploadError = (error) => {
    console.error(error);
    setIsUploading(false);
  };

  const handleUploadSuccess = async (filename) => {
    // const downloadURL = await storage.ref('images').child(filename).getDownloadURL();
    // setImage(downloadURL);
    // setIsUploading(false);
  };

  return (
  //   <div className="rounded-lg bg-card sm:h-80 h-60 p-6 m-4">
  //   <h2 className="text-2xl font-semibold mb-4">Upload Event</h2>
  //   <form onSubmit={handleFormSubmit}>
  //     {/* ... Other form fields */}
  //     <div className="mb-4">
  //       <label htmlFor="location" className="block text-sm font-medium text-gray-600">
  //         Event Location
  //       </label>
  //       <input
  //         type="text"
  //         id="location"
  //         value={location}
  //         onChange={(e) => setLocation(e.target.value)}
  //         className="mt-1 p-2 w-full border rounded-md"
  //         required
  //       />
  //     </div>
  //     <div className="mb-4">
  //       <label htmlFor="time" className="block text-sm font-medium text-gray-600">
  //         Event Time
  //       </label>
  //       <input
  //         type="text"
  //         id="time"
  //         value={time}
  //         onChange={(e) => setTime(e.target.value)}
  //         className="mt-1 p-2 w-full border rounded-md"
  //         required
  //       />
  //     </div>
  //     <div className="mb-4">
  //       <label htmlFor="image" className="block text-sm font-medium text-gray-600">
  //         Event Image
  //       </label>
  //       <FileUploader
  //         accept="image/*"
  //         name="image"
  //         randomizeFilename
  //         // storageRef={storage.ref('images')}
  //         onUploadStart={handleUploadStart}
  //         onUploadError={handleUploadError}
  //         onUploadSuccess={handleUploadSuccess}
  //         onProgress={handleUploadProgress}
  //       />
  //       {isUploading && <p>Progress: {progress}%</p>}
  //       {image && <img src={image} alt="Event" className="mt-2 max-w-full h-auto" />}
  //     </div>
  //     {/* ... Other form fields */}
  //     <button
  //       type="submit"
  //       className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
  //     >
  //       Upload Event
  //     </button>
  //   </form>
  // </div>
      <div className=" h-screen flex-grow overflow-x-hidden overflow-auto flex flex-wrap content-start p-2  ">
     <div className="w-full p-2 lg:w-1/3">
  <div className="rounded-lg bg-card h-full sm:p-4">
    <form className="flex flex-col h-full space-y-4">
      <div className="flex-grow">
        <label htmlFor="name" className="block text-sm font-medium text-white-700">
         Event Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter event name"
          className="mt-1 p-2 w-full border rounded-md text-black"
        />
      </div>

      <div className="flex-grow">
        <label htmlFor="email" className="block text-sm font-medium text-white-700">
          Location:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Select location"
          className="mt-1 p-2 w-full border rounded-md text-black"
        />
      </div>

      <div className="flex-grow">
        <label htmlFor="message" className="block text-sm font-medium text-white-700">
         Description:
        </label>
        <textarea
          id="message"
          name="message"
          rows="4"
          placeholder="Tell about the event"
          className="mt-1 p-2 w-full border rounded-md text-black"
        ></textarea>
      </div>

      <button
        type="submit"
        className="w-full bg-lime-700 text-white p-2 rounded-md hover:bg-lime-600"
      >
        Submit
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
                    <span className="font-semibold">Click to upload</span> or drag and drop
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

        {/* Additional input for multiple files */}
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
  <div className="rounded-lg bg-card h-80">
    {/* <Satisfication /> */}
  </div>
</div>
<div className="w-full p-2 lg:w-1/3">
  <div className="rounded-lg bg-card overflow-hidden h-80">
    {/* <AddComponent /> */}
  </div>
</div></div>
  );
};

export default EventUploadForm;
