import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const Failure = ({ error }) => {
  return (
<div className="flex items-center justify-center">
  <div className="max-w-md w-full py-8 px-8 bg-gray-700 shadow-lg rounded-lg my-20">
    <div className="flex flex-col items-center">
      <FontAwesomeIcon
        icon={faTimesCircle}
        className="w-20 h-20 text-red-500 mb-4"
      />
      <h2 className="text-white text-3xl font-semibold text-center">Payment Failed</h2>
      <p className="mt-4 text-white text-center">
        We're sorry, but your payment could not be processed. Please check your payment details and try again. If the problem persists, contact your bank or our support team.
      </p>
    </div>
    <div className="flex justify-center mt-8">
      <a href="/user-dashboard/events" className="text-xl font-medium text-red-500 hover:text-red-600 transition-colors">
        Try again
      </a>
    </div>
  </div>
</div>
  );
};

export default Failure;
