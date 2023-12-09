import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";

export default function DetailParcelDelivered({ parcelDetails }) {
  return (
    <div className="main-div">
      <p className="heading">Receive Parcel</p>
      <Grid>
        <h5 className="send_parcel">Parcel is waiting for you!</h5>
        <p className="parecl_content">
          Our driver has delivered your package!<br></br>
          Below, you can see the details:
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
                <b>Cabinet number : </b> {parcelDetails?.lockerNumber}
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
          }}
        >
          <Button
            variant="contained"
            style={{ backgroundColor: "#60326A", color: "#FDF9F3" }}
          >
            Pick Up
          </Button>
        </div>
        <p style={{ justifyContent: "center", display: "flex" }}>
          Go to pick up touchscreen!
        </p>
      </Grid>
    </div>
  );
}
