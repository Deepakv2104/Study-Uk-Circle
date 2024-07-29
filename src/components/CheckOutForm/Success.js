// Success.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const Success = () => {
  return (
    <div className="flex items-center justify-center">
    <div className="max-w-md w-full py-8 px-8 bg-gray-700 shadow-lg rounded-lg my-20">
      <div className="flex flex-col items-center">
        <FontAwesomeIcon
          icon={faCheckCircle}
          className="w-20 h-20 text-green-500 mb-4"
        />
        <h2 className="text-white text-3xl font-semibold text-center">Payment Successful</h2>
        <p className="mt-4 text-white text-center">
          Thank you for your purchase! Your payment has been processed successfully. You will receive a confirmation email shortly.
        </p>
      </div>
      <div className="flex justify-center mt-8">
        <a href="/user-dashboard/bookings" className="text-xl font-medium text-green-500 hover:text-green-600 transition-colors">
          Go to my bookings
        </a>
      </div>
    </div>
  </div>
  );
};

export default Success;
