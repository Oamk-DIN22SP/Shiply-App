import React from 'react'
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';

export default function SendParcel() {
    
    return (
        <div>
            <p className='heading'>Send Parcel</p>
             <Grid>
                <h5 className='send_parcel'>You send a new package!</h5>
                <p className='parecl_content'>Our driver will soon pick your package to be delivered.<br></br>
                    Below, you can see the details;</p>
                    <Card style={{ maxWidth: 600, lineHeight: '10px', fontSize: 'small',boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor:'#fffdfb'  }}>
                    <CardContent>
                        <div className='parcel_info_main'>
                            <p className='parcel_info'><b>Delivery number</b>: 123456789</p>
                            <p className='parcel_info'><b>Drop-off point</b>: Parcel center 5</p>
                            <p className='parcel_info'><b>Address</b>:123 Main St, New York, NY 10030</p>
                            <p className='parcel_info'><b>Postal code</b>: 109432</p>
                            <p className='parcel_info'><b>Consigner</b>: Rick Sacjhet</p>
                            <p className='parcel_info'><b>Consigner address</b>: Dimensidfon with / Portal place</p>
                            <p className='parcel_info'><b>Consigner phone</b>: +1 123 456 78 90</p>
                            <p className='parcel_info'><b>Consignee</b>: Gandaff Thegreen </p>
                            <p className='parcel_info'><b>Cabinet number</b>:10</p>
                            <p className='parcel_info'><b>Password</b>: 4352</p>
                        </div>
                    </CardContent>
                </Card>
               
            </Grid>
        </div>
    )
}
