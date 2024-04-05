import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import {
  Typography,
  Button,
  Avatar,
  TextField,
  Tab,
  Tabs,
} from "@mui/material";
import { FaLocationArrow, FaThumbsUp } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa";
import { useAuth } from "../../auth/userProvider/AuthProvider";
import { firestore } from "../../firebase";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { addDoc, serverTimestamp } from "firebase/firestore";
import pin from "../../assets/img/pin.svg";
import { FaStar } from "react-icons/fa";

import {
  doc,
  getDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { university } from "jquery";
import CollegeAbout from "./collegeAbout";
import CoursesAndFees from "./CoursesAndFees";
import CollegeReviews from "./CollegeReview";

const UniversityDetails = () => {
  const universityId = useParams();
  const id = "gmx2ihiwslmTEzZhAdEf";
  const [openDialog, setOpenDialog] = useState(false);
  const [value, setValue] = useState(0);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    gender: "",
    universityName: "",
  });

  const [universityData, setUniversityData] = useState({});
  // State to store the image URL
  const [imageUrl, setImageUrl] = useState("");

  // Placeholder image URL
  const placeholderImageUrl = "https://via.placeholder.com/800x200";

  const formatTimestamp = (timestamp) => {
    if (timestamp && timestamp.seconds) {
      const date = new Date(timestamp.seconds * 1000); // Convert seconds to milliseconds
      return date.toLocaleString(); // Format date as needed
    } else {
      return "Invalid Date";
    }
  };
  const handleChange = (university, newValue) => {
    setValue(newValue);
  };
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  useEffect(() => {
    console.log("universityId:", id); // Log the universityId to check its value
    const fetchUniversityData = async () => {
      try {
        if (id) {
          // Check if id exists
          const universityDocRef = doc(firestore, "universities", id);
          const universityDocSnapshot = await getDoc(universityDocRef);
          if (universityDocSnapshot.exists()) {
            setUniversityData(universityDocSnapshot.data());
            
          } else {
            console.log("University document not found");
          }
        }
  
      } catch (error) {
        console.error("Error fetching university data:", error);
      }
   
    };

    fetchUniversityData();
  }, [id]); // Make sure to include id in the dependency array
  console.log(universityData);
  return (
    <Box sx={{ flexGrow: 1, m: 2
    }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box
            sx={{
              position: "relative",
              overflow: "hidden",
              borderRadius: "5px",
            }}
          >
            <img
              src={universityData.universityImage || placeholderImageUrl}
              alt="Random"
              style={{
                width: "100%",
                height: "auto",
                objectFit: "cover",
              }}
            />
          </Box>
          <Box
            sx={{
              p: 2,
              backgroundColor: "#f5f5f5",
              borderRadius: "4px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              backgroundColor: "black ",
              color:'white',
            }}
          >
            <Box
              sx={{ 
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mr: 2,
              
              }}
            >
              <div>
                <Typography
                  variant="h6"
                  sx={{ mb: 1, color: "white", fontWeight: "bold" }}
                >
                  {universityData.title || "N/A"}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{ display: "flex", alignItems: "center", mb: 1, color: "white", }}
                >
                  <img
  src={pin}
  style={{
    width: "20px",
    height: "20px",
    marginRight: "5px",
    filter: "invert(100%)", // Invert the color to white
  }}
/>

                  {universityData.location || "N/A"} |
                  <FaStar style={{ margin: "5px" }} />{" "}
                  {universityData.rating || "N/A"} |{" "}
                  {universityData.established || "N/A"}
                </Typography>
              </div>
              <Box width={{ xs: "100%", sm: "auto" }}>
                {" "}
                {/* Set width to 100% on mobile and auto on larger screens */}
                <Button
                  variant="contained"
                  color="success"
                  sx={{ borderRadius: "20px" }}
                  onClick={handleOpenDialog}
                  fullWidth={true} // Ensure the button takes up the full width of its container
                >
                  Brochure
                </Button>
              </Box>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Typography variant="body2" sx={{ mr: 2 }}>
                {/* {formatTimestamp(universityData.TimeAndDate)} */}
              </Typography>
              <svg
                viewBox="0 0 18 22"
                style={{
                  width: "20px",
                  height: "20px",
                  fill: "#FFA500",
                  marginRight: "4px",
                }}
              ></svg>
            </Box>
          </Box>

          <Box sx={{ borderBottom: 1, borderColor: "divider"}}>
  <Tabs value={value} onChange={handleChange} textColor="white"> {/* Set textColor to white */}
    <Tab label="About" sx={{ color: 'white' }} /> {/* Apply color: white to each individual Tab */}
    <Tab label="Courses & Fees" sx={{ color: 'white' }} />
    <Tab label="Reviews" sx={{ color: 'white' }} />
    <Tab label="Contact" sx={{ color: 'white' }} />
  </Tabs>
</Box>

          {/* Content for different tabs */}
          <Box>
  {value === 0 && universityData ? (
    <CollegeAbout data={universityData} />
  ) : (
    <Typography></Typography>
  )}
  {value === 1 && <CoursesAndFees data={universityData} />}
  {value === 2 && <CollegeReviews />}
  {value === 3 && <Typography>Contact Content</Typography>}
</Box>


        </Grid>
      </Grid>
    </Box>
  );
};

export default UniversityDetails;
