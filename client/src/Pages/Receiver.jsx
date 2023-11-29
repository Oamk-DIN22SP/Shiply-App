import React, { useEffect } from "react";
import { Box, List, ListItem, ListItemText, Container, ListItemAvatar, Avatar } from '@mui/material';
import Grid from "@mui/material/Grid";
import message from '../Images/msg1.png';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase.config";
import DetailParcel from "./DetailParcel";
import axios from "axios";


export default function Receiver() {
  //{const [user] = useAuthState(auth);}
  const [parcelDetails, setParcelDetails] = React.useState([
    { id: 1, text: "Parcel 1", email: "zilik@gmail.com",},
    { id: 2, text: "Parcel 2", email:"bobo@gmail.com" },
    { id: 3, text: "Parcel 3", email:"taka@gmail.com" },
    { id: 4, text: "Parcel 4", email:"rac@gmail.com"},
  ]);
  const getParcelDetails = async (email) => {
    const apiEndpoint = `http://localhost:3000/api/parcels/receiver/getParcels`;
    const parcelRequest = {
      receiverEmailAddress: email,
    };
      const res = await axios.post(apiEndpoint, parcelRequest);
      console.log(res);
      setParcelDetails(res.data);
    }

  return (
    <Container>
      <p className="heading" style={{ border: '1px solid #FFFAF6', padding: '10px', backgroundColor: '#FFFAF6', borderRadius: '10px 10px 0 0' }}>Receiver</p>
      <Grid style={{ backgroundColor: '#FFFAF6', padding: '10px', borderRadius: '5px', marginTop: '10px' }}>
        <h5 className="set_heading">Received Packages!</h5>
        <p className='setting_content'>All notification received packages will be shown here.</p>
        <Box className='list_div'>
          <List>
            {parcelDetails.map((parcel) => (
              <ListItem key={parcel.id} className='list-item'>
                <ListItemAvatar>
                  <Avatar src={message}></Avatar>
                </ListItemAvatar>
                <ListItemText onClick={() => 
                   getParcelDetails(parcel.email)}> {parcel.text}</ListItemText>
              </ListItem>
            ))}
          </List>
        </Box>
      </Grid>
      <h1>Right side details</h1>
      <DetailParcel parcelDetails={parcelDetails} />
    </Container>
  );
}

