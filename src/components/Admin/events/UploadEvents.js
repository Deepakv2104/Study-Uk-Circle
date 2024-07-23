import React, { useState } from 'react';
import { collection, addDoc } from "firebase/firestore";
import { firestore, storage } from '../../../firebase'; // Adjust the path as necessary
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { format } from 'date-fns';

const UploadEventForm = () => {
  const [formData, setFormData] = useState({
    eventTitle: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    eventLocation: '',
    eventPrice: '',
    ageRestriction: '',
    tickets: [
      { title: '', status: '', price: '', bookingFee: '', quantity: '' }
    ],
    organizer: '',
    eventDescription: '',
    details: ['', '', ''],
    notes: ['', '', ''],
    venueName: '',
    venueAddress: '',
    eventImage: null,
    category: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleTicketChange = (index, field, value) => {
    const newTickets = [...formData.tickets];
    newTickets[index][field] = field === 'price' || field === 'bookingFee' ? parseFloat(value) : value;
    setFormData(prevData => ({
      ...prevData,
      tickets: newTickets
    }));
  };

  const addTicket = () => {
    setFormData(prevData => ({
      ...prevData,
      tickets: [...prevData.tickets, { title: '', status: '', price: '', bookingFee: '', quantity: '' }]
    }));
  };

  const handleDetailsChange = (index, value) => {
    const newDetails = [...formData.details];
    newDetails[index] = value;
    setFormData(prevData => ({
      ...prevData,
      details: newDetails
    }));
  };

  const handleNotesChange = (index, value) => {
    const newNotes = [...formData.notes];
    newNotes[index] = value;
    setFormData(prevData => ({
      ...prevData,
      notes: newNotes
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prevData => ({
      ...prevData,
      eventImage: e.target.files[0]
    }));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'EEE do MMM');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = null;
      if (formData.eventImage) {
        const storageRef = ref(storage, `event-images/${formData.eventImage.name}`);
        await uploadBytes(storageRef, formData.eventImage);
        imageUrl = await getDownloadURL(storageRef);
      }
  
      const eventDataToSave = {
        ...formData,
        startDate: formatDate(formData.startDate),
        endDate: formatDate(formData.endDate),
        eventImage: imageUrl,
      };
  
      const docRef = await addDoc(collection(firestore, 'events'), eventDataToSave);
      await addDoc(collection(firestore, 'events'), { ...eventDataToSave, eventId: docRef.id });
      alert('Event data uploaded successfully!');
    } catch (error) {
      console.error('Error uploading event data: ', error);
      alert('Failed to upload event data: ' + error.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-900 text-gray-200">
      <h1 className="text-3xl font-bold mb-4">Upload Event</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-white">Event Title</label>
          <input
            type="text"
            name="eventTitle"
            value={formData.eventTitle}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded bg-gray-800 text-white"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-white">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-gray-800 text-white"
              required
            />
          </div>
          <div>
            <label className="block text-white">End Date</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-gray-800 text-white"
              required
            />
          </div>
          <div>
            <label className="block text-white">Start Time</label>
            <input
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-gray-800 text-white"
              required
            />
          </div>
          <div>
            <label className="block text-white">End Time</label>
            <input
              type="time"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-gray-800 text-white"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-white">Event Location</label>
          <input
            type="text"
            name="eventLocation"
            value={formData.eventLocation}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded bg-gray-800 text-white"
            required
          />
        </div>

        <div>
          <label className="block text-white">Event Price</label>
          <input
            type="text"
            name="eventPrice"
            value={formData.eventPrice}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded bg-gray-800 text-white"
            required
          />
        </div>

        <div>
          <label className="block text-white">Age Restriction</label>
          <input
            type="text"
            name="ageRestriction"
            value={formData.ageRestriction}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded bg-gray-800 text-white"
            required
          />
        </div>

        <div>
          <label className="block text-white">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded bg-gray-800 text-white"
            required
          >
            <option value="" disabled>Choose a category...</option>
            <option value="Academic Events">Academic Events</option>
                <option value="Cultural Events">Cultural Events</option>
                <option value="Social Events">Social Events</option>
                <option value="Sports and Recreation">Sports and Recreation</option>
                <option value="Professional Development">Professional Development</option>
                <option value="Health and Wellness">Health and Wellness</option>
                <option value="Volunteer and Community Service">Volunteer and Community Service</option>
                <option value="Orientation and Information Sessions">Orientation and Information Sessions</option>
                <option value="Arts and Entertainment">Arts and Entertainment</option>
                <option value="Technology and Innovation">Technology and Innovation</option>
          </select>
        </div>

        <div>
          <label className="block text-white">Tickets</label>
          {formData.tickets.map((ticket, index) => (
            <div key={index} className="grid grid-cols-5 gap-2 mb-2">
              <input
                type="text"
                placeholder="Title"
                value={ticket.title}
                onChange={(e) => handleTicketChange(index, 'title', e.target.value)}
                className="px-3 py-2 rounded bg-gray-800 text-white"
              />
              <input
                type="text"
                placeholder="Status"
                value={ticket.status}
                onChange={(e) => handleTicketChange(index, 'status', e.target.value)}
                className="px-3 py-2 rounded bg-gray-800 text-white"
              />
              <input
                type="number"
                step="0.01"
                placeholder="Price"
                value={ticket.price}
                onChange={(e) => handleTicketChange(index, 'price', e.target.value)}
                className="px-3 py-2 rounded bg-gray-800 text-white"
              />
              <input
                type="number"
                step="0.01"
                placeholder="Booking Fee"
                value={ticket.bookingFee}
                onChange={(e) => handleTicketChange(index, 'bookingFee', e.target.value)}
                className="px-3 py-2 rounded bg-gray-800 text-white"
              />
              <input
                type="number"
                placeholder="Quantity"
                value={ticket.quantity}
                onChange={(e) => handleTicketChange(index, 'quantity', e.target.value)}
                className="px-3 py-2 rounded bg-gray-800 text-white"
              />
            </div>
          ))}
          <button type="button" onClick={addTicket} className="bg-blue-500 text-white py-2 px-4 rounded mt-2">
            Add Ticket
          </button>
        </div>

        <div>
          <label className="block text-white">Organizer</label>
          <input
            type="text"
            name="organizer"
            value={formData.organizer}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded bg-gray-800 text-white"
            required
          />
        </div>

        <div>
          <label className="block text-white">Event Description</label>
          <textarea
            name="eventDescription"
            value={formData.eventDescription}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded bg-gray-800 text-white"
            rows="3"
            required
          ></textarea>
        </div>

        <div>
          <label className="block text-white">Details</label>
          {formData.details.map((detail, index) => (
            <input
              key={index}
              type="text"
              value={detail}
              onChange={(e) => handleDetailsChange(index, e.target.value)}
              className="w-full px-3 py-2 rounded bg-gray-800 text-white mb-2"
            />
          ))}
        </div>

        <div>
          <label className="block text-white">Notes</label>
          {formData.notes.map((note, index) => (
            <textarea
              key={index}
              value={note}
              onChange={(e) => handleNotesChange(index, e.target.value)}
              className="w-full px-3 py-2 rounded bg-gray-800 text-white mb-2"
              rows="2"
            ></textarea>
          ))}
        </div>

        <div>
          <label className="block text-white">Venue Name</label>
          <input
            type="text"
            name="venueName"
            value={formData.venueName}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded bg-gray-800 text-white"
            required
          />
        </div>

        <div>
          <label className="block text-white">Venue Address</label>
          <input
            type="text"
            name="venueAddress"
            value={formData.venueAddress}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded bg-gray-800 text-white"
            required
          />
        </div>

        <div>
          <label className="block text-white">Event Image</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full px-3 py-2 rounded bg-gray-800 text-white"
            accept="image/*"
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          Upload Event
        </button>
      </form>
    </div>
  );
};

export default UploadEventForm;
