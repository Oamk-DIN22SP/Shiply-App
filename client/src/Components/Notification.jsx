import React,{useState, useEffect} from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import message from '../Images/msg1.png'
import envelope from '../Images/envelope.png'
import whtup from '../Images/whtup.png'
import { Container } from '@mui/system';



const notificationItems = [
  { imageSrc: message, text: "New package received" },
  { imageSrc: envelope, text: "Paracel has been received" },
  { imageSrc: whtup, text: "New Parcel is waiting..." },
  { imageSrc: envelope, text: "New package sent..." },
  { imageSrc: envelope, text: "Thanks for choosing us..." },
];

const Item = (props) => (
  <Paper
    sx={{
      p: 2,
      margin: 1,
      display: "inline_block",
      flexDirection: "column",
      background: "#FFFAF6",
      transition: "background 0.3s",
      "&:hover": {
        background: "#D5F9B8",
      },
      ...props.style,
    }}
    onClick={props.onClick}
  >
    <div>
      <img
        src={props.imageSrc}
        alt="msg"
        style={{ width: "35px", height: "35px" }}
      />
      {props.text}
      {props.dateTime}
    </div>
  </Paper>
);
export default function Notification({ onNotificationItemClick }) {
  const [selectedOption, setSelectedOption] = React.useState("");
  const [currentTime, setCurrentTime] = useState("");

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
    // Redirect to another page based on the clicked item
    if (text === "New package received") {
      onNotificationItemClick("receivedparcel");
    } else if (text === "Paracel has been received") {
      onNotificationItemClick("sendparcel");
    } else if (text === "New Parcel is waiting...") {
      onNotificationItemClick("otherparcel");
    }
  };

  return (
    <Container>
    <p className='heading' style={{border:'1px solid #FFFAF6', padding:'10px', backgroundColor:'#FFFAF6',borderRadius: '10px 10px 0 0 '}}>Notification Content</p>
    <Grid style={{backgroundColor:'#FFFAF6', height:'100vh'}}>
      <Select
        style={{ marginTop: 15, width: '95%', marginLeft:'1em'}}
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
          dateTime={currentTime}  // Pass the currentTime to the Item component
        />
      ))}
    </Grid>
  </Container>
);
}
