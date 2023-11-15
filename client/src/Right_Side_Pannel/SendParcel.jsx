import React from 'react'
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';



export default function SendParcel() {
    return (
        <div className="details">

            <p className='heading' style={{ border: '1px solid #FFFAF6', padding: '10px', backgroundColor: '#F2FDE8', borderRadius: '10px 10px 0 0' }}>Send Parcel</p>

            {/* Grid with different background colors */}
            <Grid style={{ backgroundColor: '#F2FDE8', padding: '10px', borderRadius: '5px', marginTop: '10px', height: '70vh' }}>
                <h5 className='send_parcel'>You send a new package!</h5>
                <p className='parecl_content'>Our driver will soon pick your package to be delivered.<br></br>
                    Below, you can see the details;</p>
                <Card style={{ maxWidth: 400, lineHeight:'10px' , fontSize:'small' }}>
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
                <button className='btn_sent_parcel'>Track</button>
            </Grid>
        </div>
    )
}
