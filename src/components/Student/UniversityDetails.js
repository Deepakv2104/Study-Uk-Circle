import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
// import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import {
  Typography,
  Button,
  // Avatar,
  // TextField,
  Tab,
  Tabs,
} from "@mui/material";

import { firestore } from "../../firebase";

import pin from "../../assets/img/pin.svg";
import { FaStar } from "react-icons/fa";

import {
  doc,
  getDoc,

} from "firebase/firestore";
// import { university } from "jquery";
import CollegeAbout from "./collegeAbout";
import CoursesAndFees from "./CoursesAndFees";
import CollegeReviews from "./CollegeReview";

const UniversityDetails = () => {
  const {universityId }= useParams();
  console.log(universityId)
  // const id = "1Ck6BKqP67QGQWlPNQHh";
  const [openDialog, setOpenDialog] = useState(false);
  const [value, setValue] = useState(0);
  // const [formData, setFormData] = useState({
  //   fullName: "",
  //   email: "",
  //   phoneNumber: "",
  //   gender: "",
  //   universityName: "",
  // });

  const [universityData, setUniversityData] = useState({});

  // const [imageUrl, setImageUrl] = useState("");


  const placeholderImageUrl = "https://via.placeholder.com/800x200";

  // const formatTimestamp = (timestamp) => {
  //   if (timestamp && timestamp.seconds) {
  //     const date = new Date(timestamp.seconds * 1000);
  //     return date.toLocaleString(); 
  //   } else {
  //     return "Invalid Date";
  //   }
  // };
  const handleChange = (university, newValue) => {
    setValue(newValue);
  };
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  useEffect(() => {
    console.log("universityId:", universityId); 
    const fetchUniversityData = async () => {
      try {
        if (universityId) {
         
          const universityDocRef = doc(firestore, "universities", universityId);
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
  }, [universityId]);
  console.log(universityData);
  return (
    <Box sx={{ flexGrow: 1, m: 2 }}>
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Box
          sx={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '5px',
          }}
        >
          <img
            src={universityData.collegeImage || placeholderImageUrl}
            alt="Random"
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'cover',
            }}
          />
        </Box>
        <Box
          sx={{
            p: 2,
            borderRadius: '4px',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            backgroundColor: 'black',
            color: 'white',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mr: 2,
            }}
          >
            <div>
              <Typography variant="h6" sx={{ mb: 1, color: 'white', fontWeight: 'bold' }}>
                {universityData.collegeName || 'N/A'}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mb: 1,
                  color: 'white',
                }}
              >
                <img
                alt=""
                  src={pin}
                  style={{
                    width: '20px',
                    height: '20px',
                    marginRight: '5px',
                    filter: 'invert(100%)',
                  }}
                />
                {universityData.location || 'N/A'} |
                <FaStar style={{ margin: '5px' }} /> {universityData.rating || 'N/A'} |{' '}
                {universityData.established || 'N/A'}
              </Typography>
            </div>
            <Box width={{ xs: '100%', sm: 'auto' }}>
              <Button
                variant="contained"
                color="success"
                sx={{ borderRadius: '20px' }}
                onClick={handleOpenDialog}
                fullWidth={true}
              >
                Brochure
              </Button>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Typography variant="body2" sx={{ mr: 2 }}></Typography>
            <svg
              viewBox="0 0 18 22"
              style={{
                width: '20px',
                height: '20px',
                fill: '#FFA500',
                marginRight: '4px',
              }}
            ></svg>
          </Box>
        </Box>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', overflowX: 'auto', maxWidth: '100%', scrollbarWidth: 'thin', '&::-webkit-scrollbar': { height: '6px' } }}>
  <Tabs value={value} onChange={handleChange} textColor="white" scrollButtons="auto">
    <Tab label="About" sx={{ color: 'white' }} />
    <Tab label="Courses & Fees" sx={{ color: 'white' }} />
    <Tab label="Reviews" sx={{ color: 'white' }} />
    <Tab label="Contact" sx={{ color: 'white' }} />
  </Tabs>
</Box>



        <Box>
          {value === 0 && <CollegeAbout />}
          {value === 1 && <CoursesAndFees coursesData={universityData} />}
          {value === 2 && <CollegeReviews />}
          {value === 3 && <Typography>Contact Content</Typography>}
        </Box>
      </Grid>
    </Grid>
  </Box>
  );
};

export default UniversityDetails;
