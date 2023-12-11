import React, { useEffect, useState } from "react";
import BACKEND_HOSTNAME, { DEV_HOSTNAME } from "../config/backend.config";
import { useAuthState } from "react-firebase-hooks/auth";
import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import message from "../Images/msg1.png";
import { auth, authenticateUser } from "../config/firebase.config";
import axios from "axios";
import { List, ListItem, ListItemAvatar, Avatar, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

export default function History() {
  const [sentParcels, setSentParcels] = useState([]);
  const [receivedParcels, setReceivedParcels] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("all"); // Default to show all parcels
    const [selectedParcel, setSelectedParcel] = useState({});
  const [user] = useAuthState(auth);

  const handleListItemClick = (parcel) => {
    setSelectedParcel(parcel);
  };
  // Ensure the user is authenticated before making the request
  authenticateUser();
  useEffect(() => {
    const fetchUserParcels = async () => {
      try {
        const sentParcelsResponse = await fetch(
          `${BACKEND_HOSTNAME}/api/parcels/sender/getSentParcels/${user?.uid}`
        );
        const data = await sentParcelsResponse.json();

        if (sentParcelsResponse.ok) {
          // If the response status is okay, proceed with your logic
          console.log("History- sent parcels:", data);
          setSentParcels(data);
        } else {
          // If there's an error in the response, handle it
          console.error("Error from server:", data);
        }
        // Second API request to get received parcels

        // Fetch parcels from the backend API
        const apiUrl = `${BACKEND_HOSTNAME}/api/parcels/receiver/getParcels`;
        // Create a request payload with the expected structure
        const requestBody = {
          receiverEmailAddress: user?.email,
        };

        const res = await axios.post(apiUrl, requestBody);
        console.log(res);
        if (res) {
          // If the response status is okay, proceed with your logic
          console.log("History- received parcels:", data);
          setReceivedParcels(res.data);
        } else {
          // If there's an error in the response, handle it
          console.error("Error from server:", data);
        }
      } catch (error) {
        throw new Error("History function collapsed", error);
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
    <div className="notification">
      <p
        className="heading"
        style={{
          border: "1px solid #FFFAF6",
          padding: "10px",
          backgroundColor: "#FFFAF6",
          borderRadius: "10px 10px 0 0 ",
        }}
      >
        History
      </p>
      <Grid style={{ backgroundColor: "#FFFAF6", height: "70vh" }}>
        <Select
          style={{ marginTop: 15, width: "95%", marginLeft: "1em" }}
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
        >
          <MenuItem value="all">All Parcels</MenuItem>
          <MenuItem value="sendFirst">Sent parcels</MenuItem>
          <MenuItem value="receiveFirst">Incoming parcels</MenuItem>
         
        </Select>

        {filterParcels().length > 0 ? (
          <List>
            {filterParcels().map((parcel) => (
              <ListItem
                key={parcel.parcelID}
                className="list-item"
                component={Link}
                to={`/receiver/parcel/${parcel.parcelID}`}
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
          <p>No parcels available.</p>
        )}
      </Grid>
    </div>
  );
}
