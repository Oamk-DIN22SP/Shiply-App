import React from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import SendTimeExtensionIcon from '@mui/icons-material/SendTimeExtension';
import MoveToInboxIcon from '@mui/icons-material/MoveToInbox';
import { useNavigate } from 'react-router-dom'; // Import useNavigate


const notificationItems = [
  { icon: <MoveToInboxIcon style={{color:'orange', fontSize:'25px'}}/>, text: 'New package received'  },
  { icon: <SendTimeExtensionIcon style={{color:'orange', fontSize:'25px'}}/>, text: 'Paracel has been received' },
  { icon: <MarkEmailReadIcon style={{color:'orange', fontSize:'25px'}}/>, text: 'New Parcel is waiting...' },
  { icon: <MarkEmailReadIcon style={{color:'orange', fontSize:'25px'}}/>, text: 'New package sent...' },
  { icon: <MarkEmailReadIcon style={{color:'orange', fontSize:'25px'}}/>, text: 'Thanks for choosing us...' },
];

const Item = (props) => (
  <Paper
    sx={{
      p: 2,
      margin: 1,
      display: 'inline_block',
      flexDirection: 'column',
      background: '#FFFAF6', // Background color
      transition: 'background 0.3s', // Smooth background transition on hover
      '&:hover': {
        background: '#D5F9B8', // Background color on hover
      },
      ...props.style,
    }}
    onClick={props.onClick}
  >
    {props.children}
  </Paper>
);

export default function Notification() {
  const navigate = useNavigate(); // Get navigate object from useNavigate
  const [selectedOption, setSelectedOption] = React.useState('');

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleItemClick = (text) => {
    // Redirect to another page based on the clicked item
    if (text === 'New package received') {
      navigate('/recivedparecl');
    } else if (text === 'Paracel has been received') {
      navigate('/sendparcel');
    } else if (text === 'New Parcel is waiting...') {
      navigate('/otherparcel');
    }
    // Add more conditions for other items
  };

  return (
    <div className="notification">
      {/* Notification content goes here */}
      <p className='heading' style={{border:'1px solid #FFFAF6', padding:'10px', backgroundColor:'#FFFAF6',borderRadius: '10px 10px 0 0 '}}>Notification Content</p>
        <Grid style={{backgroundColor:'#FFFAF6',minHeight: '70vh'}}>
          <Select
            style={{ marginTop: 15, width: '95%', marginLeft:'1em'}}
            value={selectedOption}
            onChange={handleSelectChange}
          >
            <MenuItem value="option1">Send First</MenuItem>
            <MenuItem value="option2">Receive First</MenuItem>
            <MenuItem value="option3">Send and Receive</MenuItem>
            {/* Add more MenuItem components as needed */}
          </Select>
          <br /><br />
          {notificationItems.map((item, index) => (
            <Item
            key={index}
            onClick={() => handleItemClick(item.text)} // Pass the text to handleItemClick
            style={{ cursor: 'pointer' }}
          >
              {item.icon}
              {item.text}
            </Item>
          ))}
        </Grid>
    </div>
  );
}
