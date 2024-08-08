import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, getDoc, query, where } from "firebase/firestore";
import { firestore } from '../../../firebase'; // Adjust the path as necessary
import { useAuth } from '../../../auth/userProvider/AuthProvider';

const CheckoutDetails = () => {
    const { currentUser } = useAuth();
    const [checkouts, setCheckouts] = useState([]);
    const [selectedCheckout, setSelectedCheckout] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        if (currentUser) {
            fetchCheckouts();
        }
    }, [currentUser]);

    const fetchCheckouts = async () => {
        try {
            // Query to fetch only the events where organizerId matches currentUser.uid
            const eventsQuery = query(
                collection(firestore, 'events'),
                where('organizerId', '==', currentUser.uid)
            );
            const eventsQuerySnapshot = await getDocs(eventsQuery);
            const eventsData = eventsQuerySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));

            // Extract event IDs for easier filtering of checkouts
            const eventIds = eventsData.map(event => event.id);

            const querySnapshot = await getDocs(collection(firestore, 'checkouts'));
            const checkoutsData = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));

            // Filter checkouts to include only those related to the fetched events
            const filteredCheckouts = checkoutsData.filter(checkout => {
                const userEventId = checkout.user?.eventId;
                return eventIds.includes(userEventId);
            });

            setCheckouts(filteredCheckouts);
        } catch (error) {
            console.error('Error fetching checkouts: ', error);
        }
    };

    const openModal = async (checkout) => {
        try {
            const eventDoc = await getDoc(doc(firestore, 'events', checkout.user.eventId));
            const eventData = eventDoc.exists() ? eventDoc.data() : {};

            setSelectedCheckout({
                ...checkout,
                eventDetails: eventData
            });
            setModalIsOpen(true);
        } catch (error) {
            console.error('Error fetching event details: ', error);
        }
    };

    const closeModal = () => {
        setSelectedCheckout(null);
        setModalIsOpen(false);
    };

    const formatDate = (timestamp) => {
        if (!timestamp) return '';
        let date;
        if (timestamp instanceof Date) {
            date = timestamp;
        } else if (timestamp.seconds && timestamp.nanoseconds) {
            date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
        } else if (timestamp.toDate) {
            date = timestamp.toDate();
        } else {
            return '';
        }
        return date.toLocaleString();
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            alert('ID copied to clipboard');
        }).catch(err => {
            console.error('Could not copy text: ', err);
        });
    };

    return (
        <div className="container mx-auto px-4 py-4 text-zinc-200">
            <h1 className="text-2xl font-bold mb-2">Bookings</h1>
            <div className="overflow-x-auto">
                <div className="bg-zinc-800 rounded-lg shadow-lg">
                    <table className="min-w-full">
                        <thead className='bg-zinc-900'>
                            <tr>
                                <th className="py-3 px-4 text-left text-gray-400 font-medium">Checkout ID</th>
                                <th className="py-3 px-4 text-left text-gray-400 font-medium">Event ID</th>
                                <th className="py-3 px-4 text-left text-gray-400 font-medium">Customer</th>
                                <th className="py-3 px-4 text-left text-gray-400 font-medium">Email</th>
                                <th className="py-3 px-4 text-left text-gray-400 font-medium">Total Amount</th>
                                <th className="py-3 px-4 text-left text-gray-400 font-medium">Status</th>
                                <th className="py-3 px-4 text-left text-gray-400 font-medium">Booking Time</th>
                                <th className="py-3 px-4 text-left text-gray-400 font-medium">Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {checkouts.map((checkout) => (
                                <tr key={checkout.id} className="bg-zinc-700 hover:bg-zinc-600 transition-colors duration-300">
                                    <td className="py-3 px-4 text-white">
                                        <div className="flex items-center">
                                            <span>{checkout.id.substring(0, 10)}...</span>
                                            <button
                                                onClick={() => copyToClipboard(checkout.id)}
                                                className="ml-2 text-blue-500 hover:underline"
                                            >
                                                Copy
                                            </button>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4 text-white">
                                        <div className="flex items-center">
                                            <span>{checkout.user.eventId.substring(0, 8)}...</span>
                                            <button
                                                onClick={() => copyToClipboard(checkout.id)}
                                                className="ml-2 text-blue-500 hover:underline"
                                            >
                                                Copy
                                            </button>
                                        </div>
                                    </td>

                                    <td className="py-3 px-4 text-white">{checkout.customer_name}</td>
                                    <td className="py-3 px-4 text-white">{checkout.customer_email}</td>
                                    <td className="py-3 px-4 text-white">{checkout.amount_total} {checkout.currency}</td>
                                    <td className="py-3 px-4 text-white">{checkout.status}</td>
                                    <td className="py-3 px-4 text-white">{formatDate(checkout.created)}</td>
                                    <td className="py-3 px-4">
                                        <button
                                            onClick={() => openModal(checkout)}
                                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors duration-300"
                                        >
                                            Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {modalIsOpen && selectedCheckout && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-zinc-800 rounded-lg p-4 w-full max-w-2xl shadow-lg">
                        <h2 className="text-xl font-bold mb-4 text-white">
                            Booking Details for {selectedCheckout.customer_name}
                        </h2>
                        {selectedCheckout.eventDetails && (
                            <div className="mb-4">
                                <p className="text-white"><strong>Event Title:</strong> {selectedCheckout.eventDetails.eventTitle}</p>
                                <p className="text-white"><strong>Event ID:</strong> {selectedCheckout.eventDetails.eventId}</p>
                                <p className="text-white"><strong>Category:</strong> {selectedCheckout.eventDetails.category}</p>
                                <p className="text-white"><strong>Start Date:</strong> {selectedCheckout.eventDetails.startDate}</p>
                            </div>
                        )}
                        <div className="bg-zinc-700 rounded-lg shadow-lg">
                            <table className="min-w-full">
                                <thead>
                                    <tr>
                                        <th className="py-3 px-4 text-left text-gray-400 font-medium">Ticket Title</th>
                                        <th className="py-3 px-4 text-left text-gray-400 font-medium">Price</th>
                                        <th className="py-3 px-4 text-left text-gray-400 font-medium">Booking Fee</th>
                                        <th className="py-3 px-4 text-left text-gray-400 font-medium">Quantity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedCheckout.tickets.map((ticket, index) => (
                                        <tr key={index} className="bg-zinc-600 hover:bg-zinc-500 transition-colors duration-300">
                                            <td className="py-3 px-4 text-white">{ticket.title}</td>
                                            <td className="py-3 px-4 text-white">{ticket.price}</td>
                                            <td className="py-3 px-4 text-white">{ticket.bookingFee}</td>
                                            <td className="py-3 px-4 text-white">{ticket.quantity}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={closeModal}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors duration-300"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CheckoutDetails;
