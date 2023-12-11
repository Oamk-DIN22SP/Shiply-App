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
import DetailParcel from "../Components/DetailParcel";
import axios from "axios";
import BACKEND_HOSTNAME, { DEV_HOSTNAME } from "../config/backend.config";
import { Link, useNavigate } from "react-router-dom";
import Notification from "../Components/Notification";

export default function Receiver() {
  const [parcels, setParcels] = useState([]);
  const [selectedParcel, setSelectedParcel] = useState({});
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  // Ensure the user is authenticated before making the request
  authenticateUser();
  const handleNotificationItemClick = (item) => {
    setSelectedParcel(item);
  };
  useEffect(() => {
    // Fetch parcels from the backend API
    const fetchParcels = async () => {
      try {
        const apiUrl = `${BACKEND_HOSTNAME}/api/parcels/receiver/getDelivered`;
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

  return (
    <div>
     

      <Grid
        container
        className="home_page"
        xs={6}
        xl={8}
        sx={{ marginLeft: { xs: 0, sm: 45 } }}
      >
        <Grid item xs={6}>
          <Notification onNotificationItemClick={handleNotificationItemClick} />
        </Grid>

        <Grid item xs={6}>
          <Typography variant="h5">Click on any parcel to see more info.</Typography>
          <div>
            {selectedParcel ? (
              <DetailParcel parcelID={selectedParcel.parcelID} />
            ) : (
              <p>You don't currently have any selected parcel details.</p>
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
