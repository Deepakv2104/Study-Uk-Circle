import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateDoc, doc ,addDoc,collection} from "firebase/firestore";
import { useAuth } from "../../auth/userProvider/AuthProvider";
import { firestore } from "../../firebase";
const Loader = () => (
  <div className="loader-container">
    <div className="loader"></div>
  </div>
);

const CollegeUpload = (user) => {
  const [collegeData, setCollegeData] = useState({
    collegeName: "",
    location: "",
    description: "",
    established:" ",
    ranking:"",
    rating:"",
    collegeImage:null,
    totalStudents:"",
    scholarships:"",
    collegeId:"",
    examsAccepted:"",
    cardImage:null,
    coursesAndFees: [],
  });
  const [loading, setLoading] = useState(false);
  const [collegeImageURL, setCollegeImageURL] = useState(null);
const[collegeCardImageURL,setCollegeCardImageURL] = useState(null);

const handleFormSubmit = async (e) => {
  e.preventDefault();
  if (loading) {
    return;
  }
  setLoading(true);
  try {
    // Upload data to Firestore
    const docRef = await addDoc(collection(firestore, "universities"), {
      ...collegeData, // Include all collegeData
      collegeImage: collegeImageURL,
      cardImage:collegeCardImageURL,
    });

    // Get the newly generated document ID
    const collegeId = docRef.id;
    setCollegeData({ ...collegeData, collegeId: collegeId }); // Update collegeId in state

    // Update the document with the collegeId
    await updateDoc(doc(firestore, "universities", collegeId), {
      collegeId: collegeId,
    });

    // Reset form fields and image URLs
    setCollegeData({
      ...collegeData,
      collegeName: "",
      location: "",
      description: "",
      established: "",
      ranking: "",
      rating: "",
      collegeImage: null,
      totalStudents: "",
      scholarships: "",
      cardImage: null,
      collegeId: "",
      examsAccepted: "",
      coursesAndFees: [ { course: "", totalCourses: 0, tuitionFees: "", durationAndEligibility: "", examAccepted: "" }],
    });
    setCollegeImageURL(null);
    setCollegeCardImageURL(null);
    
    setLoading(false);
    // Show success message
    toast.success("Event data uploaded successfully!");
  } catch (error) {
    console.error("Error adding document: ", error);
    toast.error("Error uploading event data");
    setLoading(false);
  }
};

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const storage = getStorage();
      const storageRef = ref(
        storage,
        `colleges/${collegeData.collegeId}/${collegeData.collegeName}/collegeImage/${file.name}`
      );

      try {
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        setCollegeImageURL(downloadURL); // Update state with the image URL
      
      } catch (error) {
        console.error("Error uploading image: ", error);
      }
    }
  };
  const handleCardImageChange = async (event) => {
    const file1 = event.target.files[0];
    if (file1) {
      const storage = getStorage();
      const storageRef = ref(
        storage,
        `colleges/${collegeData.collegeId}/${collegeData.collegeName}/collegeImage/cardImage/${file1.name}`
      );

      try {
        await uploadBytes(storageRef, file1);
        const downloadURL = await getDownloadURL(storageRef);
        setCollegeCardImageURL(downloadURL); // Update state with the image URL
      } catch (error) {
        console.error("Error uploading image: ", error);
      }
    }
  };
  useEffect(() => {
    addRow(); // Add a default row upon component mount
  }, []); // Empty dependency array ensures this effect runs only once, equivalent to componentDidMount

  const addRow = () => {
    setCollegeData((prevData) => ({
      ...prevData,
      coursesAndFees: [...prevData.coursesAndFees, { course: "", totalCourses: 0, tuitionFees: "", durationAndEligibility: "", examAccepted: "" }],
    }));
  };

  const handleEdit = (index, field, value) => {
    setCollegeData((prevData) => {
      const updatedCoursesAndFees = [...prevData.coursesAndFees];
      updatedCoursesAndFees[index][field] = value;
      return { ...prevData, coursesAndFees: updatedCoursesAndFees };
    });
  };

  const handleDelete = (index) => {
    setCollegeData((prevData) => {
      const updatedCoursesAndFees = [...prevData.coursesAndFees];
      updatedCoursesAndFees.splice(index, 1);
      return { ...prevData, coursesAndFees: updatedCoursesAndFees };
    });
  };

  const handleSave = () => {
    // Perform any actions needed to save changes
    console.log("Changes saved:", collegeData);
  };


  

  return (
    <div className="h-screen flex flex-wrap content-start p-2">
      {/* Left Container */}
      <div className="w-full p-2 lg:w-1/3 max-h-screen overflow-auto">
        <div className="rounded-lg bg-card sm:p-4">
          <form className="flex flex-col h-full space-y-4" onSubmit={handleFormSubmit}>
            <div className="flex-grow">
              <label htmlFor="name" className="block text-sm font-medium text-white-700">
                University Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter event name"
                value={collegeData.collegeName}
                onChange={(e) => setCollegeData({ ...collegeData, collegeName: e.target.value })}
                className="mt-1 p-2 w-full border rounded-md text-black"
              />
            </div>

            <div className="flex-grow">
              <label htmlFor="email" className="block text-sm font-medium text-white-700">
                Location:
              </label>
              <input
                type="location"
                id="location"
                name="location"
                placeholder="Select location"
                value={collegeData.location}
                onChange={(e) => setCollegeData({ ...collegeData, location: e.target.value })}
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
                value={collegeData.description}
                onChange={(e) => setCollegeData({ ...collegeData, description: e.target.value })}
                className="mt-1 p-2 w-full border rounded-md text-black"
              ></textarea>
            </div>

           
          </form>
          <form className="flex flex-col h-full space-y-4" onSubmit={handleFormSubmit}>
            <div className="flex-grow">
              <label htmlFor="name" className="block text-sm font-medium text-white-700">
             Year of established:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Established"
                value={collegeData.established}
                onChange={(e) => setCollegeData({ ...collegeData, established: e.target.value })}
                className="mt-1 p-2 w-full border rounded-md text-black"
              />
            </div>

            <div className="flex-grow">
              <label  className="block text-sm font-medium text-white-700">
                Ranking:
              </label>
              <input
                type="ranking"
                id="ranking"
                name="ranking"
                placeholder="Select ranking"
                value={collegeData.ranking}
                onChange={(e) => setCollegeData({ ...collegeData, ranking: e.target.value })}
                className="mt-1 p-2 w-full border rounded-md text-black"
              />
            </div>

            <div className="flex-grow">
              <label  className="block text-sm font-medium text-white-700">
                Accepted Exams:
              </label>
              <input
                type="exams"
                id="exams"
                name="exams"
                placeholder="Select exams"
                value={collegeData.examAccepted}
                onChange={(e) => setCollegeData({ ...collegeData, examsAccepted: e.target.value })}
                className="mt-1 p-2 w-full border rounded-md text-black"
              />
            </div>
            <div className="flex-grow">
              <label  className="block text-sm font-medium text-white-700">
                Total Students:
              </label>
              <input
                id="totalStudents"
                name="totalStudents"
                
                placeholder="Enter total students"
                value={collegeData.totalStudents}
                onChange={(e) => setCollegeData({ ...collegeData, totalStudents: e.target.value })}
                className="mt-1 p-2 w-full border rounded-md text-black"
              ></input>
            </div>
            <div className="flex-grow">
              <label  className="block text-sm font-medium text-white-700">
              Scholarships:
              </label>
              <input
                id="scholarships"
                name="scholarships"
                
                placeholder="Total scholarships"
                value={collegeData.scholarships}
                onChange={(e) => setCollegeData({ ...collegeData, scholarships: e.target.value })}
                className="mt-1 p-2 w-full border rounded-md text-black"
              ></input>
            </div>
            <div className="flex-grow">
              <label  className="block text-sm font-medium text-white-700">
            Rating:
              </label>
              <input
                id="rating"
                name="rating"
                
                placeholder="Total rating"
                value={collegeData.rating}
                onChange={(e) => setCollegeData({ ...collegeData, rating: e.target.value })}
                className="mt-1 p-2 w-full border rounded-md text-black"
              ></input>
            </div>

            <button
              type="submit"
              className="w-full bg-lime-700 text-white p-2 rounded-md hover:bg-lime-600"
              disabled={loading}
            >
              {loading ? <Loader /> : "Submit"}
            </button>
          </form>
        </div>
        
      </div>
      
      <div className="w-full p-2 lg:w-2/3 max-h-screen overflow-auto">
      <div className="rounded-lg bg-card">
      <div className="rounded-lg bg-card h-80">
          <div className="flex items-center justify-center w-full h-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              {collegeImageURL ? (
                <img
                  src={collegeImageURL}
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
                  <p>
                    Cover Image
                  </p>
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
      
        </div>
        </div>
            <div >
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="multiple_files"
            >
              Upload Card Image
            </label>
            <input
              id="multiple_files"
              type="file"
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              onChange={handleCardImageChange}
              multiple
            />
          </div>
        <div className="rounded-lg bg-card">
          <TableContainer component={Paper} style={{ height: "auto" }}>
            <Table aria-label="courses and fees table">
              <TableHead style={{ backgroundColor: "#f5f5dc" }}>
                <TableRow>
                  <TableCell>Course</TableCell>
                  <TableCell>Total Courses</TableCell>
                  <TableCell>1st Year Tuition Fees</TableCell>
                  <TableCell>Duration & Eligibility</TableCell>
                  <TableCell>Exam Accepted</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {collegeData.coursesAndFees.map((course, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <input
                        type="text"
                        value={course.course}
                        onChange={(e) =>
                          handleEdit(index, "course", e.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <input
                        type="number"
                        value={course.totalCourses}
                        onChange={(e) =>
                          handleEdit(
                            index,
                            "totalCourses",
                            parseInt(e.target.value)
                          )
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <input
                        type="text"
                        value={course.tuitionFees}
                        onChange={(e) =>
                          handleEdit(index, "tuitionFees", e.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <input
                        type="text"
                        value={course.durationAndEligibility}
                        onChange={(e) =>
                          handleEdit(
                            index,
                            "durationAndEligibility",
                            e.target.value
                          )
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <input
                        type="text"
                        value={course.examAccepted}
                        onChange={(e) =>
                          handleEdit(index, "examAccepted", e.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Button onClick={() => handleDelete(index)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Button onClick={addRow}>Add Row</Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default CollegeUpload;
