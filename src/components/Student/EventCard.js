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

const EventCard = ({ event }) => {
  // State variables
  const [dialogOpen, setDialogOpen] = useState(false);
  const [heartColor, setHeartColor] = useState("white");
  const [loading, setLoading] = useState(true); // New state for loading indicator

  // Other variables
  const navigate = useNavigate();

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

  const handleBuyClick = () => {
    navigate(event.eventId);
  };

  try {
    // Rendering logic
    return (
      <div>
        <div key={event.eventId} className="card event-card">
          <div className="event-header">
            <img src={event.imageSrc || 'NA'} alt="" />
            <p>{event.TimeAndDate}</p>
            <FaHeart
              className="bx-heart"
              style={{ color: heartColor }}
              onClick={handleHeartClick}
            />
          </div>
          <div className="event-content">
            <h2>{event.eventName}</h2>
            <p>{event.location}</p>
          </div>
          <div className="event-footer">
            <p style={{ backgroundColor: 'black' }}>{event.eventCatagory}</p>
            <div className="btn-group">
              <button onClick={handleBuyClick}>Buy Ticket</button>
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
        </div>
      </div>
    );
  } catch (error) {
    // Error handling
    console.error('Error rendering EventCard:', error);
    return (
      <div className="error-card">
        <p>Oops! Something went wrong while rendering this event.</p>
      </div>
    );
  }
};

export default EventCard;
