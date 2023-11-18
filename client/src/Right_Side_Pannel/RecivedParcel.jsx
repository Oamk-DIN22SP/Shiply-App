import React from 'react'
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

export default function RecivedParcel() {
  return (
    <div className="main-div">
    <p className='heading'>Receive Parcel</p>
        <Grid>
                <h5 className='send_parcel'>You send a new package!</h5>
                <p className='parecl_content'>Our driver will soon pick your package to be delivered.<br></br>
                    Below, you can see the details;</p>
                <Card style={{ maxWidth: 600, lineHeight: '10px', fontSize: 'small',boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor:'#fffdfb'  }}>
                    <CardContent>
                        <div className='parcel_info_main'>
                            <p className='parcel_info'><b>Delivery number</b>: 12345678</p>
                            <p className='parcel_info'><b>PickUp point</b>: Location 5</p>
                            <p className='parcel_info'><b>Pickup address</b>:katu 502 A /102 Oulu Finland</p>
                            <p className='parcel_info'><b>Postal code</b>:1276</p>
                            <p className='parcel_info'><b>Consignee</b>: Thomas Edison</p>
                            <p className='parcel_info'><b>Cabinet number</b>12</p>
                            <p className='parcel_info'><b>Password</b>:2341</p>
                        </div>
                    </CardContent>
                </Card>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
          <Button variant="contained"  style={{ backgroundColor: '#60326A', color:'#FDF9F3' }}>Pick Up</Button>
        </div>
        <p style={{justifyContent:'center', display:'flex'}}>Go to pick up touchscreen!</p>
            </Grid>
    
      </div>
 
  )
}
