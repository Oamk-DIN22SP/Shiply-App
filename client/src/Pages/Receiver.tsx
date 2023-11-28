import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, authenticateUser } from "../config/firebase.config";
import BACKEND_HOSTNAME, { DEV_HOSTNAME } from "../config/backend.config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

interface ParcelRequest {
  receiverEmailAddress?: string | null;
}
//NOTE - Get all parcels by receiver

const Receiver = () => {
  const navigate = useNavigate();
  const [parcels, setParcels] = useState([]);
  const [user] = useAuthState(auth);
  // Ensure the user is authenticated before making the request
  authenticateUser();
  useEffect(() => {
    // Fetch parcels from the backend API
    const fetchParcels = async () => {
      try {
        const apiUrl = `${BACKEND_HOSTNAME}/api/parcels/receiver/getParcels`;
        // Create a request payload with the expected structure
        const requestBody: ParcelRequest = {
          receiverEmailAddress: user?.email,
        };

        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });
        const data = await response.json();
        setParcels(data);
      } catch (error) {
        console.error("Error fetching parcels:", error);
      }
    };

    fetchParcels();
  }, []); // Empty dependency array ensures the effect runs once when the component mounts

  return (
    <Container>
      <p
        className="heading"
        style={{
          border: "1px solid #FFFAF6",
          padding: "10px",
          backgroundColor: "#FFFAF6",
          borderRadius: "10px 10px 0 0",
        }}
      >
        Receiver
      </p>
      <Grid
        style={{
          backgroundColor: "#FFFAF6",
          padding: "10px",
          borderRadius: "5px",
          marginTop: "10px",
        }}
      >
        <h5 className="set_heading">Received Packages!</h5>
        <p className="setting_content">
          All notification received packages will be shown here.
        </p>
        <Box style={{ border: "1px solid black" }}>
          <List>
            {parcels.map((parcel) => (
              <ListItem key={parcel.parcelID}>
                <ListItemText primary={parcel.trackingNumber} />
                <ListItemText primary={parcel.status} />
                <ListItemText primary={parcel.senderName} />
                <ListItemText primary={parcel.receiverName} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Grid>
    </Container>
  );
};

export default Receiver;
