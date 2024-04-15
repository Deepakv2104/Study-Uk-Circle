import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaShare, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  IconButton,
  Grid,
} from "@mui/material";

const EventCard = ({ eventData }) => {
  // State variables
  const [dialogOpen, setDialogOpen] = useState(false);
  const [heartColor, setHeartColor] = useState("white");
  const navigate = useNavigate();
// console.log(eventData,'inside eventcard')
  // Event handlers
  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleHeartClick = () => {
    setHeartColor(heartColor === "white" ? "red" : "white");
  };

  const handleBuyClick = (eventId) => {
    navigate(`${eventId}`);
  };
  const formatTimestamp = (timestamp) => {
    if (timestamp && timestamp.seconds) {
      const date = new Date(timestamp.seconds * 1000); // Convert seconds to milliseconds
      return date.toLocaleString(); // Format date as needed
    } else {
      return "Invalid Date";
    }
  };
  // Rendering logic
  return (
    <div>
      <div className="card event-card">
        {/* {eventData.map((event) => ( */}
          <React.Fragment key={eventData.eventId}>
            <div className="event-header">
              <img src={eventData.eventImage|| 'NA'} alt="" />
              <p>{formatTimestamp(eventData.TimeAndDate)}</p>

              <FaHeart
                className="bx-heart"
                style={{ color: heartColor }}
                onClick={handleHeartClick}
              />
            </div>
            <div className="event-content">
              <h2>{eventData.eventName}</h2>
              <p>{eventData.location}</p>
            </div>
            <div className="event-footer">
              <p style={{ backgroundColor: 'black' }}>{eventData.eventCategory}</p>
              <div className="btn-group">
                <button onClick={() => handleBuyClick(eventData.eventId)}>Buy Ticket</button>
                <Dialog open={dialogOpen} onClose={handleDialogClose}>
                  <DialogTitle>Share Event</DialogTitle>
                  <DialogContent>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={12}>
                        <IconButton style={{ color: "rgb(79, 153, 213)" }}>
                          <FaTwitter />
                        </IconButton>
                        <IconButton style={{ color: "rgb(34, 173, 34)" }}>
                          <FaWhatsapp />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleDialogClose}>Close</Button>
                  </DialogActions>
                </Dialog>
                <button className="share-btn" onClick={handleDialogOpen}>
                  <FaShare />
                </button>
              </div>
            </div>
          </React.Fragment>
        {/* ))} */}
      </div>
    </div>
  );
};

export default EventCard;
