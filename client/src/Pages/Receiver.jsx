import React from "react";
import { Box,List, ListItem, ListItemText, ListItemAvatar, Avatar, ListItemButton, Divider ,Container} from '@mui/material';
import { auth } from "../config/firebase.config";
import Grid from "@mui/material/Grid";
import message from '../Images/msg1.png'

export default function Receiver() {
  const [receiverParcels, setReceiverParcels] = React.useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(`${BACKEND_HOSTNAME}/api/parcels/receiver/getParcels`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setReceiverParcels(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <Container>
      <p className="heading" style={{ border: '1px solid #FFFAF6', padding: '10px', backgroundColor: '#FFFAF6', borderRadius: '10px 10px 0 0' }}>Receiver</p>
      <Grid style={{ backgroundColor: '#FFFAF6', padding: '10px', borderRadius: '5px', marginTop: '10px'}}>
        <h5 className="set_heading">Received Packages!</h5>
        <p className='setting_content'>All notification received packages will be shown here.</p>
        <Box style={{border:'1px solid black'}}>
        <List>
        {receiverParcels.map(parcel => (
          <ListItem key={parcel.id}>
            <ListItemText primary={parcel.text} />
          </ListItem>
        ))}
      </List>
        </Box>
      </Grid>
    </Container>
  );
}
