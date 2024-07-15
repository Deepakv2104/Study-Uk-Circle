import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaLocationArrow, FaThumbsUp } from 'react-icons/fa';
import { firestore } from '../../../firebase';
import { addDoc, serverTimestamp, doc, getDoc, updateDoc, collection } from 'firebase/firestore';

const EventDetails = () => {
  const { eventId } = useParams();
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    gender: '',
    universityName: '',
  });
  const [eventData, setEventData] = useState({});
  const [tickets, setTickets] = useState([]);

  const decreaseTicketCount = (index) => {
    const newTickets = [...tickets];
    newTickets[index].count = Math.max(0, newTickets[index].count - 1);
    setTickets(newTickets);
  };

  const increaseTicketCount = (index) => {
    const newTickets = [...tickets];
    newTickets[index].count += 1;
    setTickets(newTickets);
  };

  const formatTimestamp = (timestamp) => {
    if (timestamp && timestamp.seconds) {
      const date = new Date(timestamp.seconds * 1000);
      return date.toLocaleString();
    } else {
      return 'Invalid Date';
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        if (eventId) {
          const eventDocRef = doc(firestore, 'events', eventId);
          const eventDocSnapshot = await getDoc(eventDocRef);
          if (eventDocSnapshot.exists()) {
            const eventData = eventDocSnapshot.data();
            setEventData(eventData);
            setTickets(eventData.tickets[0] || []); // Set tickets based on fetched event data
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
  console.log(eventData)

  const handleCloseDialog = async () => {
    try {
      const bookingRef = collection(firestore, 'bookings');
      const bookingDoc = {
        fullName: formData.fullName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        gender: formData.gender,
        universityName: formData.universityName,
        eventId: eventId,
        timestamp: serverTimestamp(),
      };
      const bookingDocRef = await addDoc(bookingRef, bookingDoc);
      console.log('Booking added with ID: ', bookingDocRef.id);
      await updateDoc(bookingDocRef, { bookingId: bookingDocRef.id });
      setOpenDialog(false);
    } catch (error) {
      console.error('Error adding booking: ', error);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="relative rounded-lg overflow-hidden">
              <img
                src={eventData.eventImage}
                alt="Event"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 p-6 flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {eventData.eventName || 'N/A'}
                  </h2>
                  <p className="text-gray-300 mb-2">
                    {eventData.eventCategory} | {eventData.language || 'N/A'} |{' '}
                    {eventData.experience} | {eventData.duration}
                  </p>
                  <div className="flex items-center mb-2">
                    <FaLocationArrow className="text-yellow-500 mr-2" />
                    <p className="text-white font-semibold">
                      {eventData.location || 'N/A'}
                    </p>
                    <p className="text-gray-300 ml-4">{eventData.entryFee || 'N/A'}</p>
                  </div>
                  <p className="text-red-500">Filling Fast</p>
                </div>
                <div className="flex justify-end">
                  <button
                    className="bg-red-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                    onClick={handleOpenDialog}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-4">Event Details</h3>
                <p className="text-gray-300 mb-4">{eventData.eventDescription || 'N/A'}</p>
                <h4 className="text-lg font-semibold text-white mb-2">Eligibility:</h4>
                <ul className="list-disc list-inside text-gray-300">
                  <li>{eventData.eligibility}</li>
                  <li>Students with valid ID</li>
                </ul>

                <h4 className="text-lg font-semibold text-white mb-4 mt-6">Tickets:</h4>
                <div className="bg-gray-700 p-4 rounded-lg">
                  {tickets.length > 0 ? (
                    tickets.map((ticket, index) => (
                      <div key={index} className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-300">{ticket.type || "Example"}</span>
                          <span className="text-gray-300">${ticket.price || "50$"}</span>
                        </div>
                        <div className="flex items-center">
                          <button
                            className="bg-gray-600 text-white px-2 py-1 rounded"
                            onClick={() => decreaseTicketCount(index)}
                          >
                            -
                          </button>
                          <span className="text-white mx-2">{ticket.count}</span>
                          <button
                            className="bg-gray-600 text-white px-2 py-1 rounded"
                            onClick={() => increaseTicketCount(index)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-300">No tickets available</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="bg-gray-800 p-6 rounded-lg mb-8">
              <h3 className="text-xl font-semibold text-white mb-4">Guests</h3>
              <div className="flex flex-col items-center">
                <div className="w-64 h-48 overflow-hidden mb-2">
                  <img
                    src={eventData.guestImage}
                    alt="Guest"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-gray-300">{eventData.guestName}</p>
              </div>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg mb-8">
              <div className="flex flex-col">
                <div className="mb-4">
                  <p className="text-gray-300 mb-2">
                    Click on Interested to stay updated about this event.
                  </p>
                  <div className="flex items-center">
                    <FaThumbsUp className="text-yellow-500 mr-2" />
                    <p className="text-gray-300">People have shown interest recently.</p>
                  </div>
                </div>
                <button className="bg-red-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400">
                  Like
                </button>
              </div>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-4">Info</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Dialog component */}
      {openDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full">
            <h2 className="text-xl font-semibold text-white mb-4">Book Ticket</h2>
            <form>
              <div className="mb-4">
                <label htmlFor="fullName" className="block text-gray-300 font-semibold mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  className="w-full bg-gray-700 text-white rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-300 font-semibold mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full bg-gray-700 text-white rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="phoneNumber" className="block text-gray-300 font-semibold mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  className="w-full bg-gray-700 text-white rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, phoneNumber: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="gender" className="block text-gray-300 font-semibold mb-1">
                  Gender
                </label>
                <select
                  id="gender"
                  className="w-full bg-gray-700 text-white rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  value={formData.gender}
                  onChange={(e) =>
                    setFormData({ ...formData, gender: e.target.value })
                  }
                  required
                >
                  <option value="">Select your gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="universityName" className="block text-gray-300 font-semibold mb-1">
                  University Name
                </label>
                <input
                  type="text"
                  id="universityName"
                  className="w-full bg-gray-700 text-white rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  value={formData.universityName}
                  onChange={(e) =>
                    setFormData({ ...formData, universityName: e.target.value })
                  }
                />
              </div>
            </form>
            <div className="flex justify-end mt-6">
              <button
                className="bg-gray-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-700 mr-2"
                onClick={() => setOpenDialog(false)}
              >
                Cancel
              </button>
              <button
                className="bg-yellow-500 text-black font-semibold py-2 px-4 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                onClick={handleCloseDialog}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetails;
