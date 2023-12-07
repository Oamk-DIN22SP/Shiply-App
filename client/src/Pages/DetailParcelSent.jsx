import React from "react";
import { Card, CardContent, Grid, Typography } from "@mui/material";

const DetailParcelSent = ({ parcelDetails }) => {
  return (
    <div className="main-div">
      <p className="heading">Your package has been sent!</p>
      <Grid>
        <h5 className="send_parcel">You send a new package!</h5>
        <p className="parecl_content">
          Our driver will soon pick your package to be delivered.<br></br>
          Below, you can see the details;
        </p>
        <Card
          style={{
            maxWidth: 600,
            lineHeight: "10px",
            fontSize: "small",
            boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#fffdfb",
          }}
        >
          <CardContent>
            <div className="parcel_info_main">
              <p className="parcel_info">
                <b>Tracking number : </b> {parcelDetails?.trackingNumber}
              </p>

              <p className="parcel_info">
                <b>Address of parcel locker (to send package) : </b>{" "}
                {parcelDetails?.senderDropOffLocation}
              </p>

              <p className="parcel_info">
                <b>Receiver name : </b> {parcelDetails?.receiverName}
              </p>
              <p className="parcel_info">
                <b>Receiver email : </b> {parcelDetails?.receiverEmailAddress}
              </p>
              <p className="parcel_info">
                <b>Cabinet number : </b> {parcelDetails?.lockerID}
              </p>
              <p className="parcel_info">
                <b>Parcel status : </b> {parcelDetails?.status}
              </p>
              <p className="parcel_info">
                <b>Pin code for parcel locker : </b> {parcelDetails?.pinCode}
              </p>
            </div>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
};

export default DetailParcelSent;
