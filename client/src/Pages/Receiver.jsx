import React, { useEffect, useState } from "react";
import { Box, List, ListItem, ListItemText, Container, ListItemAvatar, Avatar, CardContent, Card } from '@mui/material';
import Grid from "@mui/material/Grid";
import message from '../Images/msg1.png';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, authenticateUser } from "../config/firebase.config";
import DetailParcel from "./DetailParcel";
import axios from "axios";
import BACKEND_HOSTNAME from "../config/backend.config";


export default function Receiver() {
    const [parcels, setParcels] = useState([]);
    const [user] = useAuthState(auth);
  // Ensure the user is authenticated before making the request
  authenticateUser();
  // const [parcelDetails, setParcelDetails] = React.useState([
  //   { id: 1, text: "Parcel 1", email: "zilik@gmail.com",},
  //   { id: 2, text: "Parcel 2", email:"bobo@gmail.com" },
  //   { id: 3, text: "Parcel 3", email:"taka@gmail.com" },
  //   { id: 4, text: "Parcel 4", email:"rac@gmail.com"},
  // ]);


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

  return (
      <Container>
    <div></div>
  
      <p
        className="heading"
        style={{
          border: "1px solid #FFFAF6",
          padding: "10px",
          backgroundColor: "#FFFAF6",
          borderRadius: "10px 10px 0 0",
        }}
      >
      Incoming packages
      </p>
      <Grid
        style={{
          backgroundColor: "#FFFAF6",
          padding: "10px",
          borderRadius: "5px",
          marginTop: "10px",
        }}
      >
      
        <p className="setting_content">
          All your packages will be shown here.
        </p>
         {parcels.length > 0 ? (
<div>
           <Box className="list_div">
          <List>
            {parcels.map((parcel) => (
              <ListItem key={parcel.parcelID} className="list-item">
                <ListItemAvatar>
                  <Avatar src={message}></Avatar>
                </ListItemAvatar>
Tracking number: 
                <ListItemText primary={parcel.trackingNumber} />
                
              </ListItem>
            ))}
          </List>
        </Box>
     
      <h1>Parcel details</h1>
      <DetailParcel parcels={parcels} />
</div>
      ) : (
        <div>
         <p>You don`t currently have any incoming or outgoing parcels.</p>
        </div>
      )}
       
     </Grid>
    </Container>
  );
}

