import React, { useEffect, useState } from 'react';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from '../../../auth/userProvider/AuthProvider';
import TicketCard from './TicketCard';
import { firestore } from '../../../firebase';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const { currentUser } = useAuth(); // Get the currently logged-in user

  useEffect(() => {
    const fetchBookings = async () => {
      if (!currentUser) return; // Ensure the user is logged in

      try {
        const q = query(
          collection(firestore, 'checkouts'),
          where('customer_id', '==', currentUser.uid)
        );
        const querySnapshot = await getDocs(q);

        const fetchedBookings = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setBookings(fetchedBookings);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, [currentUser, firestore]);

  return (
    <div className="container mx-auto">
    <h1 className="text-2xl font-bold mb-6">My Bookings</h1>
    {bookings.length > 0 ? (
      bookings.map(booking => (
        <div key={booking.id} className="mb-4"> {/* Add margin bottom for spacing */}
          <TicketCard
            date={booking.user?.eventDate || 'N/A'}
            month={new Date().toLocaleDateString('en-US', { month: 'short' })}
            eventName={booking.user?.eventTitle || 'Event Title Unavailable'}
            eventDay={booking.user?.eventDate || 'N/A'}
            eventTime={booking.user?.eventTime || 'Time Unavailable'}
            location={booking.user?.eventLocation || 'Location Unavailable'}
          />
        </div>
      ))
    ) : (
      <p>No bookings found.</p>
    )}
  </div>
  
  );
};

export default MyBookings;
