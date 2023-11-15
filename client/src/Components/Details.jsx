import React from 'react';
import Grid from '@mui/material/Grid';

export default function Details() {
  return (
    <div className="details">
      <p className='heading' style={{border:'1px solid #FFFAF6', padding:'10px', backgroundColor:'#FFFAF6',borderRadius:'10px 10px 0 0'}}>Details</p>

      {/* Grid with different background colors */}
        <Grid style={{ backgroundColor: '#FFFAF6', padding: '10px', borderRadius: '5px',marginTop: '10px', height: '70vh' }}>
          <p>Content for the second grid item</p>
        </Grid>

    </div>
  );
}
