import React, { useState } from 'react';
import { FaHeart, FaShare, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Container,
  IconButton,
  Grid,
} from "@mui/material";

const EventCard = ({ event }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [heartColor, setHeartColor] = useState("white");

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleHeartClick = () => {
    setHeartColor(heartColor === "white" ? "red" : "white");
  };

  return (
    <div className="card event-card">
      <div className="event-header">
        <img src={event.imageSrc} alt="" />
        <p>{event.date}</p>
        <FaHeart
          className="bx-heart"
          style={{ color: heartColor }}
          onClick={handleHeartClick}
        />
      </div>
      <div className="event-content">
        <h2>{event.title}</h2>
        <p>{event.location}</p>
      </div>
      <div className="event-footer">
        <p style={{ backgroundColor: event.backgroundColor }}>{event.category}</p>
        <div className="btn-group">
          <button >Buy Ticket</button>
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
  );
};

export default EventCard;
