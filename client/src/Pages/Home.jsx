import React, { useEffect, useState } from "react";
import Notification from "../Components/Notification";
import Details from "../Components/Details";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, authenticateUser } from "../config/firebase.config";
import BACKEND_HOSTNAME, { DEV_HOSTNAME } from "../config/backend.config";
import { Typography, Grid, Box, Container } from "@mui/material";
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
    <Container style={{ display: "flex" }}>
      <Box sx={{ marginLeft: { xs: 0, sm: 30 }, padding: 3 }}>
        <Typography variant="h5">
          Welcome, {auth.currentUser?.displayName}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} xl={8}>
            <Notification
              onNotificationItemClick={handleNotificationItemClick}
            />
          </Grid>
          <Grid item xs={12} sm={6} xl={8}>
            <div>
              {selectedParcel ? (
                <DetailParcel parcelID={selectedParcel.parcelID} />
              ) : (
                <p>You don't currently have any selected parcel details.</p>
              )}
            </div>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
