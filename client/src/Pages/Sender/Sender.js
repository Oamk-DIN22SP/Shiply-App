// SenderDetail.js

import React from 'react';

const SenderDetail = () => {
  return (
    <div className="container mx-auto mt-8">
      <div className="bg-white p-8 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">Sender Details</h1>
        
        {/* Replace the following with actual sender details */}
        <div className="mb-4">
        <input type='text' placeholder='usename' />
         
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-semibold mb-2">Email:</label>
          <p className="text-blue-500">john.doe@example.com</p>
        </div>

        {/* Add more details as needed */}

        {/* You can also add buttons or links for further actions */}
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Edit Details</button>
      </div>
    </div>
  );
};

export default SenderDetail;

