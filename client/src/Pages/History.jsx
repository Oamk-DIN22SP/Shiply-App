import React, { useEffect, useState } from "react";
import BACKEND_HOSTNAME from "../config/backend.config";
import { getAuth } from "firebase/auth";

export default function History() {
  const [parcels, setParcels] = useState([]);

  useEffect(() => {
    const fetchUserParcels = async () => {
      try {
        let user = getAuth().currentUser;
        if (!user) {
          console.error("No local user found");
          return;
        }
        const response = await fetch(
          `${BACKEND_HOSTNAME}/api/parcels/getMyParcels/${user.uid}`
        );
        const data = await response.json();

        // Set the fetched parcels to the state
        setParcels(data.parcels);
      } catch (error) {
        console.error("Error fetching user parcels:", error);
      }
    };
    // Call the function to fetch user parcels when the component mounts
    fetchUserParcels();
  }, []);

  return (
    <div>
      <h1>Welcome to the History</h1>
      <h2>User Parcels:</h2>
      <ul>
        {parcels.map((parcel) => (
          <li key={parcel.id}>{parcel.name}</li>
          // Adjust the structure based on your parcel data
        ))}
      </ul>
    </div>
  );
}
