import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Container } from '@mui/system';
import Notification from '../Components/Notification';

export default function Track() {
  const [trackingNumber, settrackingNumber] = useState('');
   // const [user] = useAuthState(auth);
 
  const handletrackingNumberChange = (event) => {
    settrackingNumber(event.target.value);
  };

  const handleTrackButtonClick = async () => {
    try {
      // Ensure the user is authenticated before making the request
      if (!user) {
        console.error("User not authenticated");
        return;
      }

      // Construct the API URL with the delivery number as a parameter
      const apiUrl = `${BACKEND_HOSTNAME}/api/parcels/trackParcel/${trackingNumber}`;

      // Make a GET request to track the parcel
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
      // Handle the API response as needed
      console.log('API Response:', result);
    } catch (error) {
      console.error('Error sending data to API:', error);
    }
  };

  return (
    <Container style={{display:'flex'}}>
    <Notification/>
    <div>
      <p className='heading' style={{ border: '1px solid #FFFAF6', padding: '10px', backgroundColor: '#FFFAF6', borderRadius: '10px 10px 0 0' }}>Track</p>
      <Grid style={{ backgroundColor: '#FFFAF6', padding: '10px', borderRadius: '5px',marginTop: '10px', height: '100vh' }}>
      <h5 className='send_parcel'>Track Your Delivery!</h5>
        <p className='track_content'>Your 5 digit delivery number is enough to know the status<br></br>
          of your delivery.</p>
          <div className='text_field'>
          <TextField
            variant="outlined"
            placeholder="Delivery Number"
            value={trackingNumber}
            onChange={handletrackingNumberChange}
            style={{ width: '100%' }}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
          <Button variant="contained" onClick={handleTrackButtonClick} style={{ backgroundColor: '#60326A', color: '#FDF9F3' }}>
            Track
          </Button>
        </div>
      </Grid>
    </div>
    </Container>
  );
}
