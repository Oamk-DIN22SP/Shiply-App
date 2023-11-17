import React from 'react'
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';



export default function SendParcel() {
    // Define state variables for parcel details
    const [parcelDetails, setParcelDetails] = useState({
        DeliveryNumber: '123456789',
        DropOffPoint: 'Parcel center 5',
        DropAddress: '123 Main St, New York, NY 10030',
        PostalCode: '109432',
        Consigner: 'Rick Sacjhet',
        ConsignerAddress: 'Dimensidfon with / Portal place',
        ConsignerPhone: '+1 123 456 78 90',
        Consignee: 'Gandaff Thegreen',
        CabinetNumber: '10',
        password: '4352',
    })

    

    return (
        <div className="details">
            <p className='heading' style={{ border: '1px solid #FFFAF6', padding: '10px', backgroundColor: '#F2FDE8', borderRadius: '10px 10px 0 0' }}>Send Parcel</p>
            <Grid style={{ backgroundColor: '#F2FDE8', padding: '10px', borderRadius: '5px', marginTop: '10px', height: '70vh' }}>
                <h5 className='send_parcel'>You send a new package!</h5>
                <p className='parecl_content'>Our driver will soon pick your package to be delivered.<br></br>
                    Below, you can see the details;</p>
                <Card style={{ maxWidth: 400, lineHeight: '10px', fontSize: 'small' }}>
                    <CardContent>
                        <div className='parcel_info_main'>
                            <p className='parcel_info'><b>Delivery number</b>: {parcelDetails.DeliveryNumber}</p>
                            <p className='parcel_info'><b>Drop-off point</b>: {parcelDetails.DropOffPoint}</p>
                            <p className='parcel_info'><b>Address</b>:1{parcelDetails.DropAddress}</p>
                            <p className='parcel_info'><b>Postal code</b>:{parcelDetails.PostalCode}</p>
                            <p className='parcel_info'><b>Consigner</b>:{parcelDetails.Consigner}</p>
                            <p className='parcel_info'><b>Consigner address</b>: {parcelDetails.ConsignerAddress}</p>
                            <p className='parcel_info'><b>Consigner phone</b>: {parcelDetails.ConsignerPhone}</p>
                            <p className='parcel_info'><b>Consignee</b>: {parcelDetails.Consignee}</p>
                            <p className='parcel_info'><b>Cabinet number</b>{parcelDetails.CabinetNumber}</p>
                            <p className='parcel_info'><b>Password</b>: {parcelDetails.password}</p>
                        </div>
                    </CardContent>
                </Card>
                <button className='btn_sent_parcel'>Track</button>
            </Grid>
        </div>
    )
}
