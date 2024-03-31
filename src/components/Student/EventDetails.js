import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Typography, Button, Avatar } from '@mui/material';
import { FaLocationArrow, FaThumbsUp } from 'react-icons/fa';
import {FaLocationDot} from 'react-icons/fa';
import { useAuth } from "../../auth/userProvider/AuthProvider";
import { firestore } from "../../firebase";
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
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const EventDetails = () => {
    const eventId = useParams();
    
    const [eventData, setEventData] = useState({});
  // State to store the image URL
  const [imageUrl, setImageUrl] = useState('');

  // Function to fetch a random landscape image from Unsplash
  const fetchRandomImage = async () => {
    try {
      const response = await fetch('https://source.unsplash.com/800x600/?landscape');
      setImageUrl(response.url);
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  };

  // Fetch a random image when the component mounts
  React.useEffect(() => {
    fetchRandomImage();
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts
  const formatTimestamp = (timestamp) => {
    if (timestamp && timestamp.seconds) {
      const date = new Date(timestamp.seconds * 1000); // Convert seconds to milliseconds
      return date.toLocaleString(); // Format date as needed
    } else {
      return "Invalid Date";
    }
  };

  useEffect(() => {
    console.log('eventId:', eventId.eventId); // Log the eventId to check its value
    const fetchEventData = async () => {
      try {
        if (eventId) {
          const eventDocRef = doc(firestore, 'events', eventId.eventId);
          const eventDocSnapshot = await getDoc(eventDocRef);
          if (eventDocSnapshot.exists()) {
            setEventData(eventDocSnapshot.data());
          } else {
            console.log('Event document not found');
          }
        }
      } catch (error) {
        console.error('Error fetching event data:', error);
      }
    };

    fetchEventData();
  }, [eventId]);

  return (
    <Box sx={{ flexGrow: 1 ,m:2}}>
      <Grid container spacing={3}>
      <Grid item xs={12}>
  <Box sx={{ position: 'relative' }}>
    <img src={eventData.eventImage} alt="Random" style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', borderTopLeftRadius: '4px', borderTopRightRadius: '4px', borderRadius:'5px' }} />
    <Box sx={{ p: 2, backgroundColor: '#f5f5f5', borderRadius: '4px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}>

    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mr: 2 }}>
  <div>
  <Typography variant="h6" sx={{ mb: 1, color: 'black', fontWeight: 'bold' }}>{eventData.eventName || 'N/A'}</Typography>

    <Typography variant="body2" sx={{ mb: 1 }}>{eventData.eventCategory} | {eventData.language  || 'N/A'} | {eventData.experience} | {eventData.duration}</Typography>
  </div>
  <Button variant="contained" sx={{ height: '40px', fontSize: '18px', flex: '0 0 auto' }}>Book</Button>
</Box>

    
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1}}>
        <Typography variant="body2" sx={{ mr: 2 }}>{formatTimestamp(eventData.TimeAndDate)}</Typography>
        <svg viewBox="0 0 18 22" style={{ width: '20px', height: '20px', fill: '#FFA500', marginRight: '4px' }}>
          <FaLocationArrow style={{color:'blue'}}/>
        </svg>
        <Typography variant="body2" sx={{ color: '#000', fontWeight: 'bold',mr: 2  }}>{eventData.location  || 'N/A'}</Typography>
        <Typography variant="body2" sx={{ color: '#000' }}>{eventData.entryFee  || 'N/A'} </Typography>
      </Box>
     
      <Typography variant="body2" sx={{ color: '#FF0000', mt: 1 }}>Filling Fast</Typography>
    </Box>
  </Box>
</Grid>

      </Grid>
      <Grid container spacing={3} sx={{ mt: 2 }}>
      <Grid item xs>
  <Paper sx={{ p: 2 }}>
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="body1" sx={{ mb: 1 }}>Guests</Typography>
      <Avatar src={eventData.guestImage} sx={{ width: 70, height: 70 }} />
    </Box>
  </Paper>
</Grid>


  <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mr: 2 }}>
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Paper sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mr: 2 }}>
            <div>
              <Typography variant="body1" sx={{ mb: 1 }}>Click on Interested to stay updated about this event.</Typography>
              <FaThumbsUp />
              <Typography variant='body2'> People have shown interest recently.</Typography>
            </div>
            <Button variant="outlined" color="error" sx={{ height: '30px', fontSize: '8px', flex: '0 0 auto' }}>Like</Button>
          </Box>
        </Paper>
      </Grid>
      <Grid item>
  <Paper sx={{ p: 2 }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mr: 2 }}>
      <div>
      <Typography variant="body1" sx={{ mb: 1}}>Event Details</Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>{eventData.eventDescription  || 'N/A'}</Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>Eligibility:</Typography>
        <Typography variant="body2" component="ul">
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
    <Item>xs</Item>
  </Grid>
</Grid>

    </Box>
  );
};

export default EventDetails;
