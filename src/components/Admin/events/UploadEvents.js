import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { firestore, storage } from '../../../firebase'; // Adjust the path as necessary
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { format, parse } from 'date-fns';
import { useAuth } from '../../../auth/userProvider/AuthProvider';
import { useNavigate } from 'react-router-dom';
const Loader = () => (
  <div className="loader-container">
    <div className="loader"></div>
  </div>
);

const UploadEventForm = () => {
  const {currentUser} = useAuth();
  const navigate = useNavigate();
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
    eventImageUrl: null,
    eventImageName: '',
    category: '',
    eventId: null
  });
console.log(currentUser)
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    setFilteredEvents(
      events.filter(event =>
        event.eventTitle.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, events]);

  const fetchEvents = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, 'events'));
      const eventsData = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setEvents(eventsData);
      setFilteredEvents(eventsData);
    } catch (error) {
      console.error('Error fetching events: ', error);
    }
  };

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
    const file = e.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setFormData(prevData => ({
        ...prevData,
        eventImage: file,
        eventImageUrl: fileUrl,
        eventImageName: file.name
      }));
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'EEE do MMM');
  };

  const parseFormattedDate = (dateString) => {
    const date = parse(dateString, 'EEE do MMM', new Date());
    return format(date, 'yyyy-MM-dd');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      let imageUrl = formData.eventImageUrl;
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
        organizerId: currentUser.uid, // Attach organizerId
      };

      if (formData.eventId) {
        // Update existing event
        await updateDoc(doc(firestore, 'events', formData.eventId), eventDataToSave);
        alert('Event data updated successfully!');
      } else {
        // Create new event
        const docRef = await addDoc(collection(firestore, 'events'), eventDataToSave);
        await updateDoc(doc(firestore, 'events', docRef.id), { eventId: docRef.id });
        alert('Event data uploaded successfully!');
      }

      setFormData({
        eventTitle: '',
        startDate: '',
        endDate: '',
        startTime: '',
        endTime: '',
        eventLocation: '',
        eventPrice: '',
        ageRestriction: '',
        tickets: [{ title: '', status: '', price: '', bookingFee: '', quantity: '' }],
        organizer: '',
        eventDescription: '',
        details: ['', '', ''],
        notes: ['', '', ''],
        venueName: '',
        venueAddress: '',
        eventImage: null,
        eventImageUrl: null,
        eventImageName: '',
        category: '',
        eventId: null
      });
      setLoading(false);
      fetchEvents();
    } catch (error) {
      console.error('Error uploading event data: ', error);
      alert('Failed to upload event data: ' + error.message);
      setLoading(false);
    }
  };

  const handleEditEvent = async (event) => {
    const parsedStartDate = parseFormattedDate(event.startDate);
    const parsedEndDate = parseFormattedDate(event.endDate);
    let imageUrl = event.eventImage;
    let imageName = event.eventImageName || '';

    if (event.eventImage) {
      const imageRef = ref(storage, event.eventImage);
      imageUrl = await getDownloadURL(imageRef);
      const imageNameArray = event.eventImage.split('/');
      imageName = imageNameArray[imageNameArray.length - 1];
    }

    setFormData({
      ...event,
      startDate: parsedStartDate,
      endDate: parsedEndDate,
      eventImageUrl: imageUrl,
      eventImageName: imageName,
      eventId: event.id
    });
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      await deleteDoc(doc(firestore, 'events', eventId));
      alert('Event deleted successfully!');
      fetchEvents();
    } catch (error) {
      console.error('Error deleting event: ', error);
      alert('Failed to delete event: ' + error.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-2 text-zinc-200">
     <div className="flex justify-between items-center py-2">
        <h1 className="text-xl font-bold">Upload Event</h1>
        <button 
          className="bg-green-500 text-white py-2 px-4 rounded"
          onClick={() => navigate('/dashboard/bookings')}
        >
          Bookings
        </button>
        </div>
      <div className="flex">
        <div className="w-full rounded-lg bg-card h-full p-4 lg:w-1/2">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-white">Event Title</label>
              <input
                type="text"
                name="eventTitle"
                value={formData.eventTitle}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded bg-zinc-800 text-white"
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
                  className="w-full px-3 py-2 rounded bg-zinc-800 text-white"
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
                  className="w-full px-3 py-2 rounded bg-zinc-800 text-white"
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
                  className="w-full px-3 py-2 rounded bg-zinc-800 text-white"
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
                  className="w-full px-3 py-2 rounded bg-zinc-800 text-white"
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
                className="w-full px-3 py-2 rounded bg-zinc-800 text-white"
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
                className="w-full px-3 py-2 rounded bg-zinc-800 text-white"
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
                className="w-full px-3 py-2 rounded bg-zinc-800 text-white"
                required
              />
            </div>

            <div>
              <label className="block text-white">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded bg-zinc-800 text-white"
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
                    className="px-3 py-2 rounded bg-zinc-800 text-white"
                  />
                  <input
                    type="text"
                    placeholder="Status"
                    value={ticket.status}
                    onChange={(e) => handleTicketChange(index, 'status', e.target.value)}
                    className="px-3 py-2 rounded bg-zinc-800 text-white"
                  />
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Price"
                    value={ticket.price}
                    onChange={(e) => handleTicketChange(index, 'price', e.target.value)}
                    className="px-3 py-2 rounded bg-zinc-800 text-white"
                  />
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Booking Fee"
                    value={ticket.bookingFee}
                    onChange={(e) => handleTicketChange(index, 'bookingFee', e.target.value)}
                    className="px-3 py-2 rounded bg-zinc-800 text-white"
                  />
                  <input
                    type="number"
                    placeholder="Quantity"
                    value={ticket.quantity}
                    onChange={(e) => handleTicketChange(index, 'quantity', e.target.value)}
                    className="px-3 py-2 rounded bg-zinc-800 text-white"
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
                className="w-full px-3 py-2 rounded bg-zinc-800 text-white"
                required
              />
            </div>

            <div>
              <label className="block text-white">Event Description</label>
              <textarea
                name="eventDescription"
                value={formData.eventDescription}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded bg-zinc-800 text-white"
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
                  className="w-full px-3 py-2 rounded bg-zinc-800 text-white mb-2"
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
                  className="w-full px-3 py-2 rounded bg-zinc-800 text-white mb-2"
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
                className="w-full px-3 py-2 rounded bg-zinc-800 text-white"
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
                className="w-full px-3 py-2 rounded bg-zinc-800 text-white"
                required
              />
            </div>

            <div>
              <label className="block text-white">Event Image</label>
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full px-3 py-2 rounded bg-zinc-800 text-white"
                accept="image/*"
              />
              {formData.eventImageName && (
                <p className="text-white mt-2">{formData.eventImageName}</p>
              )}
              {formData.eventImageUrl && (
                <div>
                  <img src={formData.eventImageUrl} alt="Event" className="w-full h-auto rounded-lg mt-4" />
                </div>
              )}
            </div>

            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
              {loading ? <Loader /> : "Upload Event"}
            </button>
          </form>
        </div>

        <div className="w-full lg:w-1/2 mx-2">
          <div className="rounded-lg bg-card h-full p-4">
            <input
              type="text"
              placeholder="Search events"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 mb-4 rounded bg-zinc-800 text-white"
            />
            <div className="flex flex-col space-y-4 overflow-y-auto h-96">
              {filteredEvents.map((event) => (
                <div key={event.id} className="rounded-lg bg-zinc-800 p-4 flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-bold">{event.eventTitle}</h3>
                    <p>{event.eventDescription}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button onClick={() => handleEditEvent(event)} className="bg-blue-500 text-white px-4 py-2 rounded-md">Edit</button>
                    <button onClick={() => handleDeleteEvent(event.id)} className="bg-red-500 text-white px-4 py-2 rounded-md">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadEventForm;
