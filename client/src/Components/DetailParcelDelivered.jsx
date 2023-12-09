import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { List, ListItem, ListItemText } from "@mui/material";


export default function DetailParcelDelivered({ parcelDetails }) {
  return (
    <div className="main-div">
      <p className="heading">New parcel has been delivered!</p>
      <Grid>
        <p className="parecl_content">
          {parcelDetails.senderName} sent a new package to you.
        </p>
        <p className="parecl_content">
          Pick it up at the parcel locker center.
        </p>
        <Card
          style={{
            lineHeight: "10px",
            fontSize: "small",
            boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#FFFAF6",
          }}
        >
          <CardContent style={{ display: "flex" }}>
            <div className="main_send">
              <h4
                style={{
                  color: "#686868",
                  textAlign: "center",
                  margin: "auto",
                }}
              >
                Parcel details
              </h4>
              <List>
                <ListItem
                  key={"location"}
                  style={{ backgroundColor: "#D5F9B8", margin: "1px" }}
                >
                  <ListItemText primary="Parcel is waiting at one of the lockers to be picked up by driver." />
                </ListItem>
              </List>
              <div className="parcel_info_main">
                <p className="parcel_info">
                  <b>Tracking number : </b> {parcelDetails?.trackingNumber}
                </p>
                <p className="parcel_info">
                  <b>Sender Name: </b> {parcelDetails?.senderName}
                </p>
                <p className="parcel_info">
                  <b>Sender Email: </b> {parcelDetails?.senderEmailAddress}
                </p>
                <p className="parcel_info">
                  <b>Address of parcel locker: </b>{" "}
                  {parcelDetails.receiverDropOffPoint}
                </p>
                <p className="parcel_info">
                  <b>Cabinet number: </b> to be done
                </p>
                <p className="parcel_info">
                  <b>Parcel status : </b> {parcelDetails.status}
                </p>
              </div>
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
                  <a
                    href="https://shiply-touchscreen.vercel.app/" // Replace with your desired URL
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#FDF9F3", textDecoration: "none" }}
                  >
                    Pick Up
                  </a>
                </Button>
              </div>
              <p style={{ justifyContent: "center", display: "flex" }}>
                Go to pick up touchscreen!
              </p>
            </div>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
}
