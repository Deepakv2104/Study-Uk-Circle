import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Typography, Button, Avatar, TextField } from "@mui/material";
import { FaLocationArrow, FaThumbsUp } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa";
import { useAuth } from "../../auth/userProvider/AuthProvider";
import { firestore } from "../../firebase";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { addDoc, serverTimestamp } from "firebase/firestore";

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
import { event } from "jquery";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const EventDetails = () => {
  const eventId = useParams();
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    gender: "",
    universityName: "",
  });

  const [eventData, setEventData] = useState({});
  // State to store the image URL
  const [imageUrl, setImageUrl] = useState("");

  const formatTimestamp = (timestamp) => {
    if (timestamp && timestamp.seconds) {
      const date = new Date(timestamp.seconds * 1000); // Convert seconds to milliseconds
      return date.toLocaleString(); // Format date as needed
    } else {
      return "Invalid Date";
    }
  };
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };


  

  useEffect(() => {
    console.log("eventId:", eventId.eventId); // Log the eventId to check its value
    const fetchEventData = async () => {
      try {
        if (eventId) {
          const eventDocRef = doc(firestore, "events", eventId.eventId);
          const eventDocSnapshot = await getDoc(eventDocRef);
          if (eventDocSnapshot.exists()) {
            setEventData(eventDocSnapshot.data());
          } else {
            console.log("Event document not found");
          }
        }
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };

    fetchEventData();
  }, [eventId]);
  
  const handleCloseDialog = async () => {
    try {
      // Add the booking to the "bookings" collection
      const bookingRef = collection(firestore, "bookings");
      const bookingDoc = {
        fullName: formData.fullName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        gender: formData.gender,
        universityName: formData.universityName,
        eventId: eventId.eventId,
        timestamp: serverTimestamp(), // Add server timestamp for tracking
      };
      // Add the document with its own ID
      const bookingDocRef = await addDoc(bookingRef, bookingDoc);
      console.log("Booking added with ID: ", bookingDocRef.id);
      // Update the booking document with its own ID as bookingId
      await updateDoc(bookingDocRef, { bookingId: bookingDocRef.id });
      // Close the dialog
      setOpenDialog(false);
    } catch (error) {
      console.error("Error adding booking: ", error);
    }
    setOpenDialog(false);
  };
  return (
    <Box sx={{ flexGrow: 1, m: 2 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box sx={{  position: "relative",
  border: "1px solid white"}}>
            <img
              src={eventData.eventImage}
              alt="Random"
              style={{
                width: "100%",
                maxHeight: "400px",
                objectFit: "cover",
                borderTopLeftRadius: "4px",
                borderTopRightRadius: "4px",
                borderRadius: "5px",
              }}
            />
            <Box
              sx={{
                p: 2,
                // backgroundColor: "#f5f5f5",
                borderRadius: "4px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
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
                    {eventData.eventName || "N/A"}
                  </Typography>

                  <Typography variant="body2" sx={{ mb: 1 }}>
                    {eventData.eventCategory} | {eventData.language || "N/A"} |{" "}
                    {eventData.experience} | {eventData.duration}
                  </Typography>
                </div>
                <Button
                  variant="contained"
                  sx={{ height: "40px", fontSize: "18px", flex: "0 0 auto" }}
                  onClick={handleOpenDialog}
                >
                  Book
                </Button>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", mb: 1 , color: "white"}}>
                <Typography variant="body2" sx={{ mr: 2 }}>
                  {formatTimestamp(eventData.TimeAndDate)}
                </Typography>
                <svg
                  viewBox="0 0 18 22"
                  style={{
                    width: "20px",
                    height: "20px",
                    fill: "#FFA500",
                    marginRight: "4px",
                  }}
                >
                  <FaLocationArrow style={{ color: "whtie" }} />
                </svg>
                <Typography
                  variant="body2"
                  sx={{ color: "white", fontWeight: "bold", mr: 2 }}
                >
                  {eventData.location || "N/A"}
                </Typography>
                <Typography variant="body2" sx={{ color: "white" }}>
                  {eventData.entryFee || "N/A"}{" "}
                </Typography>
              </Box>

              <Typography variant="body2" sx={{ color: "#FF0000", mt: 1 }}>
                Filling Fast
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={3} sx={{ mt: 2 }}>

        <Grid item xs  sx={{ mt: 2  }}>
          <Paper sx={{ p: 2 , backgroundColor: '#0f0e0e' , border: "1px solid white"}}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                
              }}
            >
              <Typography variant="body1" sx={{ mb: 1 ,color:'white'}}>
                Guests
              </Typography>
              <Avatar
                src={eventData.guestImage}
                sx={{ width: 70, height: 70 }}
              />
              <Typography variant="body1" sx={{ mb: 1 ,color:'white'}}>
                {eventData.guestName}
              </Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mr: 2,
           
          }}
        >
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Paper sx={{ p: 2 , backgroundColor: '#0f0e0e' , border: "1px solid white"}}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mr: 2,
                  }}
                >
                  <div>
                    <Typography variant="body1" sx={{ mb: 1,color:'white' }}>
                      Click on Interested to stay updated about this event.
                    </Typography>
                    <FaThumbsUp style={{ backgroundColor:'white',margin:'5px'}}/>
                    <Typography variant="body2" sx={{ mb: 1 ,color:'white'}}>
                      {" "}
                      People have shown interest recently.
                    </Typography>
                  </div>
                  <Button
                    variant="outlined"
                    color="error"
                    sx={{ height: "30px", fontSize: "8px", flex: "0 0 auto" }}
                  >
                    Like
                  </Button>
                </Box>
              </Paper>
            </Grid>
            <Grid item>
              <Paper sx={{ p: 2 , backgroundColor: '#0f0e0e' , border: "1px solid white"}}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mr: 2,
                  }}
                >
                  <div>
                    <Typography variant="body1" sx={{ mb: 1 ,color:'white'}}>
                      Event Details
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 ,color:'white'}}>
                      {eventData.eventDescription || "N/A"}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 1 ,color:'white'}}>
                      Eligibility:
                    </Typography>
                    <Typography variant="body2" component="ul" sx={{ mb: 1 ,color:'white'}}>
                      <li>{eventData.eligibility}</li>
                      <li>Students with valid ID</li>
                    </Typography>
                  </div>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs>
         <Paper  sx={{ p: 2 , backgroundColor: '#0f0e0e' , border: "1px solid white"}} >
         <Typography  sx={{ mb: 1 ,color:'white'}}>Info</Typography>
         </Paper>
        </Grid>
      </Grid>
      {/* Dialog component */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Book Ticket</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              id="fullName"
              label="Full Name"
              variant="outlined"
              fullWidth
              required
              margin="normal"
            />
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              fullWidth
              required
              margin="normal"
            />
            <TextField
              id="phoneNumber"
              label="Phone Number"
              variant="outlined"
              fullWidth
              required
              margin="normal"
            />
            <TextField
              id="gender"
              select
              label="Gender"
              variant="outlined"
              fullWidth
              required
              SelectProps={{
                native: true,
              }}
              margin="normal"
            >
              <option value="" disabled>
                Select your gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </TextField>
            <TextField
              id="message"
              label="University Name"
              variant="outlined"
              fullWidth
              margin="normal"
            />

          </form>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} >Cancel</Button>
          <Button onClick={handleCloseDialog} color="primary">Confirm</Button>

        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EventDetails;
