import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom'; // Import useNavigate'
import msg from '../Images/msg1.png';
import envelope from '../Images/envelope.png';
import whtup from '../Images/whtup.png';

const notificationItems = [
  { imageSrc: msg, text: 'New package received' },
  { imageSrc: envelope, text: 'Parcel has been received' },
  { imageSrc: envelope, text: 'New Parcel is waiting...' },
  { imageSrc: msg, text: 'New package sent...' },
  { imageSrc: whtup, text: 'Thanks for choosing us...' },
];

const Item = (props) => (
  <Paper
    sx={{
      p: 2,
      margin: 1,
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'row',
      background: '#F2FDE8',
      transition: 'background 0.3s',
      '&:hover': {
        background: '#D5F9B8',
      },
      ...props.style,
    }}
    onClick={props.onClick}
  >
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <img src={props.imageSrc} alt="msg" style={{ width: '35px', height: '35px' }} />
      {props.text}
    </div>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {props.dateTime}
    </div>
  </Paper>
);

export default function Notification() {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = React.useState('');
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const formattedTime = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
      setCurrentTime(formattedTime);
    }, 1000); // Update every second

    return () => clearInterval(intervalId);
  }, []); // Run the effect only once

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleItemClick = (text) => {
    if (text === 'New package received') {
      navigate('/recivedparecl');
    } else if (text === 'Parcel has been received') {
      navigate('/sendparcel');
    } else if (text === 'New Parcel is waiting...') {
      navigate('/otherparcel');
    }
  };

  return (
    <div className="notification">
      <p className='heading' style={{ border: '1px solid #FFFAF6', padding: '10px', backgroundColor: '#FFFAF6', borderRadius: '10px 10px 0 0 ' }}>Notification Content</p>
      <Grid style={{ backgroundColor: '#FFFAF6', minHeight: '70vh' }}>
        <Select
          style={{ marginTop: 15, width: '95%', marginLeft: '1em' }}
          value={selectedOption}
          onChange={handleSelectChange}
        >
          <MenuItem value="option1">Send First</MenuItem>
          <MenuItem value="option2">Receive First</MenuItem>
          <MenuItem value="option3">Send and Receive</MenuItem>
        </Select>
        <br /><br />
        {notificationItems.map((item, index) => (
          <Item
            key={index}
            onClick={() => handleItemClick(item.text)}
            style={{ cursor: 'pointer' }}
            imageSrc={item.imageSrc}
            text={item.text}
            dateTime={currentTime}
          />
        ))}
      </Grid>
    </div>
  );
}
