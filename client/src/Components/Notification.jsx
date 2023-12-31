import React, { useEffect, useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Container,
  ListItemAvatar,
  Avatar,
  Grid,
  Typography,
} from "@mui/material";
import message from "../Images/msg1.png";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, authenticateUser } from "../config/firebase.config";
import axios from "axios";
import BACKEND_HOSTNAME from "../config/backend.config";
import { Link, useNavigate } from "react-router-dom";

export default function Notification({ onNotificationItemClick }) {
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
        const requestBody = {
          receiverEmailAddress: user?.email,
        };

        const res = await axios.post(apiUrl, requestBody);
        console.log(res);

        setParcels(res.data);
      } catch (error) {
        console.error("Error fetching parcels:", error);
      }
    };

    fetchParcels();
  }, []); // Empty dependency array ensures the effect runs once when the component mounts

  const handleListItemClick = (parcel) => {
    onNotificationItemClick(parcel);
  };

  return (
    <Container
      component="main"
      maxWidth="xl"
      style={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        minHeight: "100vh", // Set minimum height to 100% of viewport
      }}
    >
      <Box sx={{ marginLeft: { xs: 0, sm: 0 } }}>
        <Typography
          variant="h5"
          className="heading"
          style={{
            border: "1px solid #FFFAF6",
            padding: "10px",
            backgroundColor: "#FFFAF6",
            borderRadius: "10px 10px 0 0",
            width: "100%",
            textAlign: "center",
          }}
        >
          Notifications
        </Typography>
        <Grid container spacing={0}>
          <Grid >
            <Box
              style={{
                backgroundColor: "#FFFAF6",
                padding: "10px",
                borderRadius: "5px",
                marginTop: "10px",
                width: "100%",
              }}
            >
              <p className="setting_content">
                All your packages will be shown here.
              </p>
              <Grid>
                <List>
                  {parcels.map((parcel) => (
                    <ListItem
                      key={parcel.parcelID}
                      className="list-item"
                      onClick={() => handleListItemClick(parcel)}
                    >
                      <ListItemAvatar>
                        <Avatar src={message}></Avatar>
                      </ListItemAvatar>
                      {parcel.status === "created" && (
                        <ListItemText primary="You are sending a new parcel!" />
                      )}
                      {parcel.status === "sent" && (
                        <ListItemText primary="A new package was sent to you.." />
                      )}
                      {parcel.status === "picked" && (
                        <ListItemText primary="Your parcel is on the way..." />
                      )}
                      {parcel.status === "delivered" && (
                        <ListItemText primary="Your parcel is ready to pick up..." />
                      )}
                      {parcel.status === "received" && (
                        <ListItemText primary="Your parcel has been received..." />
                      )}
                    </ListItem>
                  ))}
                </List>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
