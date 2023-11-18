import React,{useState} from 'react'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function Track() {
  const [deliveryNumber, setDeliveryNumber] = useState('');
  const handleDeliveryNumberChange = (event) => {
    setDeliveryNumber(event.target.value);
  };
  const handleTrackButtonClick = () => {
    // You can add logic here to handle the tracking functionality
    // For now, let's just set isTracking to true
    setIsTracking(true);
  };
  return (
    <div className="details">    
    <p className='heading' style={{border:'1px solid #FFFAF6', padding:'10px', backgroundColor:'#FFFAF6',borderRadius:'10px 10px 0 0'}}>Track</p>
      <Grid style={{ backgroundColor: '#FFFAF6', padding: '10px', borderRadius: '5px',marginTop: '10px', height: '70vh' }}>
      <h5 className='send_parcel'>Track Your Delivery!</h5>
        <p className='track_content'>Your 5 digit delivery number is enough to know the status<br></br>
          of your delivery.</p>
          <div className='text_field'>
          <TextField
          variant="outlined"
          placeholder="Delivery Number"
          value={deliveryNumber}
          onChange={handleDeliveryNumberChange}
          style={{width:'100%'}}
        />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
          <Button variant="contained" onClick={handleTrackButtonClick} style={{ backgroundColor: '#60326A', color: '#FDF9F3' }}>Track</Button>
        </div>
      </Grid>
    </div>
  );
}
