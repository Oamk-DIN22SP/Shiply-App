import React,{useState} from 'react'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Card } from '@mui/material';
import bike from '../Images/bike.png';
import tick from '../Images/tick.png';
import warehuose from '../Images/warehuose.png';
import CardContent from '@mui/material/CardContent';

export default function Track() {
  const [deliveryNumber, setDeliveryNumber] = useState('');
  const [isTracking, setIsTracking] = useState(false);

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

        {isTracking && (
          <div>
             <Card style={{ display: 'flex', height:'60px',margin:'1em' }}>
      <img src={bike} alt="Card Image" style={{ width: '50px', height: '50px'}} />
      <CardContent>
        <h3>On the Way!</h3>
      </CardContent>
    </Card>
    <Card style={{ display: 'flex', height:'60px', margin:'1em' }}>
      <img src={warehuose} alt="Card Image" style={{ width: '50px', height: '50px'}} />
      <CardContent>
        <h3>On the Way!</h3>
      </CardContent>
    </Card>
    <Card style={{ display: 'flex', height:'60px',margin:'1em' }}>
      <img src={tick} alt="Card Image" style={{ width: '50px', height: '50px'}} />
      <CardContent>
        <h3>On the Way!</h3>
      </CardContent>
    </Card>
    <p className='track_para'>As soon as your delivery is ready to pick, you will receive a notification.</p>
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
          <Button variant="contained"  style={{ backgroundColor: '#BF5000', color: '#FDF9F3' }}>Track another package</Button>
        </div>
          </div>
        )}

      </Grid>
    </div>
  );
}