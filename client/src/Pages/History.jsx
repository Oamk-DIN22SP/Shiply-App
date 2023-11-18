import React, { useEffect, useState } from 'react'

  const [parcels, setParcels] = useState([]);
  
 useEffect(() => {
    // Function to fetch user parcels
    const fetchUserParcels = async (userId) => {
      try {
        const response = await fetch(`https://your-backend-url/api/parcels/getUserParcels/${userId}`);
        const data = await response.json();
        console.log(data)
        // Set the fetched parcels to the state
        setParcels(data.parcels);
      } catch (error) {
        console.error('Error fetching user parcels:', error);
      }
    };

    // Call the function to fetch user parcels when the component mounts
    fetchUserParcels();
  }, [userId]); 
  
export default function History() {
  return (
    <div>History
  
      <h1>Welcome to the History</h1>
      <h2>User Parcels:</h2>
      <ul>
        {parcels.map((parcel) => (
          <li key={parcel.id}>{parcel.name}</li>
          // Adjust the structure based on your parcel data
        ))}
      </ul>
    </div>
  )
}
