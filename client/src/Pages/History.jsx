import React, { useEffect, useState } from "react";
import BACKEND_HOSTNAME, { DEV_HOSTNAME } from "../config/backend.config";
import { useAuthState } from "react-firebase-hooks/auth";
import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import message from "../Images/msg1.png";
import { auth, authenticateUser } from "../config/firebase.config";
import axios from "axios";
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Box, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import DetailParcel from "../Components/DetailParcel";

export default function History() {
  const [sentParcels, setSentParcels] = useState([]);
  const [receivedParcels, setReceivedParcels] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("all"); // Default to show all parcels
    const [selectedParcel, setSelectedParcel] = useState(null);
  const [user] = useAuthState(auth);

  const handleListItemClick = (parcel) => {
    setSelectedParcel(parcel);
    console.log(selectedParcel)
  };
  // Ensure the user is authenticated before making the request
  authenticateUser();
  // Error handling
   
  useEffect(() => {
     console.log(selectedParcel);
   const fetchUserParcels = async () => {
      try {
        const sentParcelsResponse = await fetch(
          `${BACKEND_HOSTNAME}/api/parcels/sender/getSentParcels/${user?.uid}`
        );
        const sentParcelsData = await sentParcelsResponse.json();

        if (sentParcelsResponse.ok) {
          setSentParcels(sentParcelsData);
        } else {
          console.log("Error fetching sent parcels.");
        }
 setSelectedParcel(null); 
        // Fetch parcels from the backend API
        const apiUrl = `${BACKEND_HOSTNAME}/api/parcels/receiver/getParcels`;
        const requestBody = {
          receiverEmailAddress: user?.email,
        };

        const res = await axios.post(apiUrl, requestBody);
        if (res && res.status === 200) {
          console.log("History- received parcels:", res.data);
          setReceivedParcels(res.data);
        } else {
          console.log("Error fetching received parcels.");
        }
      } catch (error) {
        console.error("Error in fetchUserParcels:", error);
        // handleSnackbarOpen("An error occurred while processing your request.");
      }
    };

    // Call the function to fetch user parcels when the component mounts
    fetchUserParcels();
  }, []);

  const filterParcels = () => {
    switch (selectedFilter) {
      case "sendFirst":
        return Array.isArray(sentParcels) ? sentParcels : [];
      case "receiveFirst":
        return Array.isArray(receivedParcels) ? receivedParcels : [];
     
      default:
        // Show all parcels, but differentiate between sent and received based on user email
        const userReceivedParcels = Array.isArray(receivedParcels)
          ? receivedParcels.filter(
              (parcel) => parcel.receiverEmailAddress === user?.email
            )
          : [];

        const userSentParcels = Array.isArray(sentParcels)
          ? sentParcels.filter(
              (parcel) => parcel.receiverEmailAddress !== user?.email
            )
          : [];

        return [...userSentParcels, ...userReceivedParcels];
    }
  };

  return (
    <div>
      <Grid
        container
        className="home_page"
        xs={6}
        xl={8}
        sx={{ marginLeft: { xs: 0, sm: 45 } }}
      >
        <Typography
          variant="h5"
          className="heading"
          style={{
            border: "1px solid #FFFAF6",
            padding: "10px",
            backgroundColor: "#FFFAF6",
            borderRadius: "10px 10px 0 0",
            textAlign: "center",
            width: "95%",
          }}
        >
          History
        </Typography>

        <Select
          style={{ marginTop: 15, width: "95%", marginLeft: "1em" }}
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
        >
          <MenuItem value="all">All Parcels</MenuItem>
          <MenuItem value="sendFirst">Sent parcels</MenuItem>
          <MenuItem value="receiveFirst">Incoming parcels</MenuItem>
        </Select>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            {filterParcels().length > 0 ? (
              <List>
                {filterParcels().map((parcel) => (
                  <ListItem
                    key={parcel.parcelID}
                    className="list-item"
                    onClick={() => handleListItemClick(parcel)}
                  >
                    <ListItemAvatar>
                      <Avatar src={message}></Avatar>
                    </ListItemAvatar>
                    {parcel.receiverEmailAddress !== user?.email && (
                      <ListItemText>
                        Your parcel to {parcel.receiverEmailAddress}{" "}
                      </ListItemText>
                    )}
                    {parcel.receiverEmailAddress === user?.email && (
                      <ListItemText>
                        Parcel from {parcel.senderEmailAddress}{" "}
                      </ListItemText>
                    )}
                  </ListItem>
                ))}
              </List>
            ) : (
              <p>You don't currently have any selected parcel details.</p>
            )}
          </Grid>
          {/* Right Column - DetailParcel */}
          <Grid item xs={6}>
            <div>
              {selectedParcel ? (
                <DetailParcel parcelID={selectedParcel.parcelID} />
              ) : (
                <p>You don't currently have any selected parcel details.</p>
              )}
            </div>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
