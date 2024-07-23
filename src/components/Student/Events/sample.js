import React, { useState, useEffect } from 'react';
import img from '../../../assets/img/events_cover.jpg';
import { useParams } from 'react-router-dom';
import { firestore } from '../../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY); 
const Loader = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="loader">Redirecting to the payment gateway..</div>
  </div>
);

const EventPage = () => {
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [redirecting, setRedirecting] = useState(false);
  const { eventId } = useParams();
  const [selectedQuantities, setSelectedQuantities] = useState({});

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const eventDoc = await getDoc(doc(firestore, 'events', eventId));
        if (eventDoc.exists()) {
          setEventData(eventDoc.data());
          // Initialize selected quantities state
          const initialQuantities = {};
          eventDoc.data().tickets.forEach((ticket, index) => {
            initialQuantities[index] = 0;
          });
          setSelectedQuantities(initialQuantities);
        } else {
          setError('Event not found');
        }
      } catch (err) {
        setError('Error fetching event data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEventData();
  }, [eventId]);

  const handleQuantityChange = (index, increment) => {
    setSelectedQuantities((prev) => {
      const newQuantity = prev[index] + increment;
      if (newQuantity < 0) return prev; // Prevent negative quantities
      return { ...prev, [index]: newQuantity };
    });
  };

  const handleGetTicketsClick = async () => {
    setRedirecting(true);
    const stripe = await stripePromise;
    const selectedTickets = eventData.tickets.map((ticket, index) => ({
      title: ticket.title,
      price: ticket.price,
      bookingFee: ticket.bookingFee,
      quantity: selectedQuantities[index],
    })).filter(ticket => ticket.quantity > 0);
  
    console.log('Sending selected tickets:', selectedTickets); // Log selected tickets
  
    try {
      const response = await fetch('https://worldlynk-stripe-server.netlify.app/.netlify/functions/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tickets: selectedTickets }),
      });
  
      const session = await response.json();
      const result = await stripe.redirectToCheckout({ sessionId: session.id });
  
      if (result.error) {
        console.error(result.error.message);
        setRedirecting(false);
      }
    } catch (error) {
      console.error('Error:', error);
      setRedirecting(false);
    }
  };
  


  if (loading) return <div>Loading....</div>;
  if (error) return <div>Error: {error}</div>;
  if (!eventData) return <div>No event data available</div>;

  return (
    <div className="container mx-auto text-gray-200">
      {redirecting && <Loader />}
      <div className="bg-gray-850 shadow-2xl rounded-lg overflow-hidden max-w-xl mx-auto">
        <img src={eventData.eventImage || img} alt="Event" className="w-full max-h-90" />

        <div className="p-4">
          <h1 className="text-2xl font-bold mb-2">
            <span>{eventData.eventTitle}</span>
          </h1>
          <p className="mb-2">📅 {eventData.startDate} at {eventData.startTime} - {eventData.endDate} at {eventData.endTime}</p>
          <p className="mb-2">📍 {eventData.eventLocation}</p>
          <p className="mb-2">💷 {eventData.eventPrice} + fees</p>
          <p className="mb-2">🔞 Age restriction: {eventData.ageRestriction}</p>
        </div>

        <div className="p-4 border-t border-gray-700">
          <h2 className="text-xl font-bold mb-2">Tickets</h2>
          <div className="space-y-4">
            {eventData.tickets.map((ticket, index) => (
              <div key={index} className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">{ticket.title}</p>
                  <p className="text-sm">{ticket.status}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">£{ticket.price} +</p>
                  <p className="text-sm">£{ticket.bookingFee} booking fee</p>
                  <div className="mt-2 flex items-center">
                    <button
                      onClick={() => handleQuantityChange(index, -1)}
                      className="bg-gray-700 text-white py-1 px-2 rounded"
                    >
                      -
                    </button>
                    <input
                      type="text"
                      value={selectedQuantities[index]}
                      readOnly
                      className="bg-gray-700 text-white py-1 px-2 mx-2 rounded text-center w-12"
                    />
                    <button
                      onClick={() => handleQuantityChange(index, 1)}
                      className="bg-gray-700 text-white py-1 px-2 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <p className="text-sm text-gray-500">Nothing selected yet</p>
            <button
              onClick={handleGetTicketsClick}
              className="bg-gray-600 text-white py-2 px-4 rounded"
            >
              Get Tickets
            </button>
          </div>
        </div>

        <div className="p-4 border-t border-gray-700">
          <h2 className="text-xl font-bold mb-2">
            {eventData.organizer} PRESENTS: {eventData.eventDescription}
          </h2>
          <ul className="list-disc pl-5 my-4">
            {eventData.details.map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
          {eventData.notes.map((note, index) => (
            <p key={index} className="mb-2">{note}</p>
          ))}
        </div>

        <div className="p-4 border-t border-gray-700">
          <h2 className="text-xl font-bold mb-2">Venue</h2>
          <p>{eventData.venueName}</p>
          <p>{eventData.venueAddress}</p>
          <button className="bg-blue-500 text-white py-2 px-4 rounded mt-4">Open in Maps</button>
        </div>
      </div>
    </div>
  );
};

export default EventPage;