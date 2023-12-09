import React, { useEffect, useState } from "react";
import Notification from "../Components/Notification";
import Details from "../Components/Details";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, authenticateUser } from "../config/firebase.config";
import BACKEND_HOSTNAME, { DEV_HOSTNAME } from "../config/backend.config";
import { Typography, Grid } from "@mui/material";
import DetailParcel from "../Components/DetailParcel";
export default function Home() {
  const [selectedParcel, setSelectedParcel] = useState(null);
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  authenticateUser();

  const handleNotificationItemClick = (item) => {
    setSelectedParcel(item);
  };

  useEffect(() => {
    // Fetch parcels from the backend API
    const fetchParcels = async () => {
      try {
        const apiUrl = `${BACKEND_HOSTNAME}/api/parcels/receiver/getParcels`;
        // Create a request payload with the expected structure
        const requestBody = {
          receiverEmailAddress: user?.email,
        };
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });

        const fetchedData = await response.json();
        console.log("Fetched parcels", fetchedData);
        setSelectedParcel(null); // Reset selectedParcel when fetching new data
      } catch (error) {
        console.error("Error fetching parcels:", error);
      }
    };

    fetchParcels();
  }, [user]);

  return (
    <Grid container className="home_page">
      <Grid item xs={6}>
        <Notification onNotificationItemClick={handleNotificationItemClick} />
      </Grid>
      <Grid item xs={6}>
        <div>
          <Typography variant="h4" gutterBottom>
            Welcome, {auth.currentUser?.displayName}
          </Typography>
          {selectedParcel ? (
            <DetailParcel parcelID={selectedParcel.parcelID} />
          ) : (
            <p>You don't currently have any selected parcel details.</p>
          )}
        </div>
      </Grid>
    </Grid>
  );
}
