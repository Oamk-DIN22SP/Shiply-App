import React from 'react'
import {  CardContent, Card } from '@mui/material';
import Grid from "@mui/material/Grid";
export default function DetailParcel({parcels}) {
  return (
    <div className='details'>
      <Card
        style={{
          width: "100%",
          lineHeight: "14px",
          fontSize: "small",
          boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#fffdfb",
        }}
      >
        <CardContent>
         
            {parcels.map((parcel) => (
             
          <div className="parcel_info_main">
            <p className="parcel_info">
              <b>Tracking number : </b> {parcel.trackingNumber}
            </p>

            <p className="parcel_info">
              <b>Address of parcel locker (to receive package) : </b>{" "}
              {parcel?.receiverDropOffPoint}
            </p>

            <p className="parcel_info">
              <b>Receiver name : </b> {parcel?.receiverName}
            </p>
            <p className="parcel_info">
              <b>Receiver email : </b> {parcel?.receiverEmailAddress}
            </p>
            <p className="parcel_info">
              <b>Cabinet number : </b> to be done
            </p>
            <p className="parcel_info">
              <b>Parcel status : </b> {parcel?.status}
            </p>
            <p className="parcel_info">
              <b>Pin code for parcel locker : </b> {parcel?.pinCode}
            </p>
          </div>
           ))}
        </CardContent>
      </Card>
    </div>
  )
}
