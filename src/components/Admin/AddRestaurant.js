import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { firestore } from "../../firebase"; // Import your firebase configuration
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-time-picker/dist/TimePicker.css";
import { updateDoc, doc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { MenuItem, Select, InputLabel, FormControl } from '@mui/material';

const Loader = () => (
    <div className="loader-container">
        <div className="loader"></div>
    </div>
);

const AddRestaurant = ({ user }) => { // Remove firestore from props
    const [refresh, setRefresh] = useState(false);
    const [dateTime, setDateTime] = useState("");
    const [selectedCategory, setSelectedCategory] = useState('');

    const [loading, setLoading] = useState(false);

    const [restaurantImageURL, setRestaurantImageURL] = useState(null);

    const [restaurantData, setRestaurantData] = useState({
        restaurantId: "",
        name: "",
        location: "",
        description: "",
        category: "",
        timings: "",
        image: "",
    });

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const storage = getStorage();
            const storageRef = ref(
                storage,
                `restaurants/${restaurantData.restaurantId}/${restaurantData.name}/image/${file.name}`
            );

            try {
                setLoading(true);
                await uploadBytes(storageRef, file);
                const downloadURL = await getDownloadURL(storageRef);
                setRestaurantImageURL(downloadURL); // Update state with the image URL
                setLoading(false);
            } catch (error) {
                console.error("Error uploading image: ", error);
                setLoading(false);
            }
        }
    };

    const handleNameChange = (e) => {
        setRestaurantData({ ...restaurantData, name: e.target.value });
    };

    const handleLocationChange = (e) => {
        setRestaurantData({ ...restaurantData, location: e.target.value });
    };

    const handleDescriptionChange = (e) => {
        setRestaurantData({ ...restaurantData, description: e.target.value });
    };

    const handleTimingsChange = (e) => {
        setRestaurantData({ ...restaurantData, timings: e.target.value });
    };

    const handleCategoryChange = (e) => {
        const selectedCategory = e.target.value;
        console.log("Selected Category:", selectedCategory); // Log the selected category
        setSelectedCategory(selectedCategory); // Update the selected category state
        setRestaurantData({ ...restaurantData, category: selectedCategory }); // Update the restaurantData with the selected category
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (loading) {
            return;
        }
        setLoading(true);
        try {
            // Upload data to Firestore
            const docRef = await addDoc(collection(firestore, "restaurants"), {
                ...restaurantData, // Include all restaurantData
                image: restaurantImageURL,
            });

            // Get the newly generated document ID
            const restaurantId = docRef.id;
            setRestaurantData({ ...restaurantData, restaurantId: restaurantId }); // Update restaurantId in state

            // Update the document with the restaurantId
            await updateDoc(doc(firestore, "restaurants", restaurantId), {
                restaurantId: restaurantId,
            });

            // Reset form fields
            setTimeout(() => {
                setRestaurantData({
                    ...restaurantData,
                    name: "",
                    location: "",
                    description: "",
                    category: "",
                    timings: "",
                    image: null,
                });
                setDateTime(""); // Reset dateTime state
                setLoading(false);
            }, 0);

            // Show success message
            toast.success("Restaurant data uploaded successfully!");
            setRefresh(true);
        } catch (error) {
            console.error("Error adding document: ", error);
            toast.error("Error uploading restaurant data");
            setLoading(false);
        }
    };

    return (
        <div className="h-screen flex-grow overflow-x-hidden overflow-auto flex flex-wrap content-start p-2">
            <div className="w-full p-2 lg:w-1/3">
                <div className="rounded-lg bg-card h-full sm:p-4">
                    <form className="flex flex-col h-full space-y-4">
                        <div className="flex-grow">
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-white-700"
                            >
                                Restaurant Name:
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Enter restaurant name"
                                onChange={handleNameChange}
                                className="mt-1 p-2 w-full border rounded-md text-black"
                            />
                        </div>

                        <div className="flex-grow">
                            <label
                                htmlFor="location"
                                className="block text-sm font-medium text-white-700"
                            >
                                Location:
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
                                placeholder="Tell about the restaurant"
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
                            {restaurantImageURL ? (
                                <img
                                    src={restaurantImageURL}
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
                            multiple
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddRestaurant;
