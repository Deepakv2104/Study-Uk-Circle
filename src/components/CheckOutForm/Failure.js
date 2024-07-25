import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const Failure = ({ error }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-red-100">
      <div className="max-w-md py-4 px-8 bg-white shadow-lg rounded-lg my-20">
        <div className="flex justify-center md:justify-end -mt-16">
          <FontAwesomeIcon
            icon={faTimesCircle}
            className="w-20 h-20 text-red-500"
          />
        </div>
        <div>
          <h2 className="text-gray-800 text-3xl font-semibold">Payment Failed</h2>
          <p className="mt-2 text-gray-600">{error.message}</p>
          <p className="mt-2 text-gray-600">Error Code: {error.code}</p>
          <p className="mt-2 text-gray-600">Decline Code: {error.decline_code}</p>
          <a
            href={error.doc_url}
            className="mt-2 text-blue-500 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn more about this error
          </a>
        </div>
        <div className="flex justify-end mt-4">
          <a href="/user-dashboard/events" className="text-xl font-medium text-red-500">Go back to home</a>
        </div>
      </div>
    </div>
  );
};

export default Failure;
