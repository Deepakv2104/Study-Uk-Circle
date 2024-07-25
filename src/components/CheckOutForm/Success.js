// Success.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const Success = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-green-100">
      <div className="max-w-md py-4 px-8 bg-white shadow-lg rounded-lg my-20">
        <div className="flex justify-center md:justify-end -mt-16">
          <FontAwesomeIcon
            icon={faCheckCircle}
            className="w-20 h-20 text-green-500"
          />
        </div>
        <div>
          <h2 className="text-gray-800 text-3xl font-semibold">Payment Successful</h2>
          <p className="mt-2 text-gray-600">Thank you for your purchase! Your payment has been processed successfully. You will receive a confirmation email shortly.</p>
        </div>
        <div className="flex justify-end mt-4">
          <a href="/user-dashboard/events" className="text-xl font-medium text-green-500">Go back to home</a>
        </div>
      </div>
    </div>
  );
};

export default Success;
