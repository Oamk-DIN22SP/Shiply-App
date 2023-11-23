import React, { useEffect, useState } from "react";
import BACKEND_HOSTNAME from "../config/backend.config";
import { getAuth } from "firebase/auth";
import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import { useNavigate } from "react-router-dom";
import { authenticateUser } from "../config/firebase.config";

export default function History() {
  const [parcels, setParcels] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUserParcels = async () => {
      try {
        let user = getAuth().currentUser;
        // Ensure the user is authenticated before making the request
        await authenticateUser();
        const response = await fetch(
          `${BACKEND_HOSTNAME}/api/parcels/getMyParcels/${user.uid}`
        );
        const data = await response.json();

        if (response.ok) {
          // If the response status is okay, proceed with your logic
          console.log("Response from server:", data);
          setParcels(data.parcels);
        } else {
          // If there's an error in the response, handle it
          console.error("Error from server:", data);
        }
      } catch (error) {
        console.error("Error fetching user parcels:", error);
      }
    };
    // Call the function to fetch user parcels when the component mounts
    fetchUserParcels();
  }, []);
return (
  <div className="notification">
    <p className='heading' style={{border:'1px solid #FFFAF6', padding:'10px', backgroundColor:'#FFFAF6',borderRadius: '10px 10px 0 0 '}}>Notification Content</p>
    <Grid style={{backgroundColor:'#FFFAF6',height: '70vh'}}>
      <Select
        style={{ marginTop: 15, width: '95%', marginLeft:'1em'}}
        value={selectedOption}
        onChange={handleSelectChange}
      >
        <MenuItem value="option1">Send First</MenuItem>
        <MenuItem value="option2">Receive First</MenuItem>
        <MenuItem value="option3">Send and Receive</MenuItem>
      </Select>
      </Grid>
    {parcels ? (
      <ul>
        {parcels.map((parcel) => (
          <li key={parcel.id}>{parcel.name}</li>
        ))}
      </ul>
    ) : (
      <p>No parcels available.</p>
    )}
    


  </div>
);
}
