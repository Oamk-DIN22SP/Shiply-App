import React from 'react';
import Grid from '@mui/material/Grid';
import OtherParcel from '../Right_Side_Pannel/OtherParcel'
import ReceivedParcel from '../Right_Side_Pannel/RecivedParcel'
import SendParcel from '../Right_Side_Pannel/SendParcel'

export default function Details({
  selectedItem
}) {
  return (
    <div className="details">
      <p className='heading' style={{border:'1px solid #FFFAF6', padding:'10px', backgroundColor:'#FFFAF6',borderRadius:'10px 10px 0 0'}}>Details</p>

      {/* Grid with different background colors */}
        <Grid style={{ backgroundColor: '#FFFAF6', padding: '10px', borderRadius: '5px',marginTop: '10px', height: '70vh' }}>
          {
            selectedItem === "recivedparecl" ? <ReceivedParcel /> : selectedItem === "sendparcel" ? <SendParcel /> : <OtherParcel />
          }
        </Grid>

    </div>
  );
}
