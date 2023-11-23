import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import OtherParcel from '../Right_Side_Pannel/OtherParcel'
import ReceivedParcel from '../Right_Side_Pannel/RecivedParcel'
import SendParcel from '../Right_Side_Pannel/SendParcel'
import { auth } from '../config/firebase.config';
import { Container } from '@mui/system';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function Details({
  selectedItem,
  handleTrackClick,
  handleSenderClick
}) {
  const [user] = useAuthState(auth); 
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
        Details
      </p>
      {/* Grid with different background colors */}
      <Grid
        style={{
          backgroundColor: "#FFFAF6",
          padding: "10px",
          borderRadius: "5px",
          marginTop: "10px",
          height: "100vh",
        }}
      >
         <Typography variant="h5" gutterBottom>
          Welcome, {auth.currentUser?.displayName}
        </Typography>
        {selectedItem === "recivedparecl" ? (
          <ReceivedParcel />
        ) : selectedItem === "sendparcel" ? (
          <SendParcel />
        ) : (
          <OtherParcel />
        )}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
          <Button variant="contained"  style={{ backgroundColor: '#60326A', color:'#FDF9F3' }} onClick={() => handleTrackClick(true)}>Track</Button>
        </div>
       
              </Grid>
          
    </Container>
  );
}
