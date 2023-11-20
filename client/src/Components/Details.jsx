import React from 'react';
import Grid from '@mui/material/Grid';
import OtherParcel from '../Right_Side_Pannel/OtherParcel'
import ReceivedParcel from '../Right_Side_Pannel/RecivedParcel'
import SendParcel from '../Right_Side_Pannel/SendParcel'
import { auth } from '../config/firebase.config';

export default function Details({
  selectedItem,
  handleTrackClick
}) {
  return (
    <div className="details">
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
      <h4> Welcome , {auth.currentUser?.displayName} </h4>
      {/* Grid with different background colors */}
      <Grid
        style={{
          backgroundColor: "#FFFAF6",
          padding: "10px",
          borderRadius: "5px",
          marginTop: "10px",
          height: "70vh",
        }}
      >
        {selectedItem === "recivedparecl" ? (
          <ReceivedParcel />
        ) : selectedItem === "sendparcel" ? (
          <SendParcel />
        ) : (
          <OtherParcel />
        )}
      </Grid>
      <button onClick={() => handleTrackClick(true)}>Track</button>
    </div>
  );
}
