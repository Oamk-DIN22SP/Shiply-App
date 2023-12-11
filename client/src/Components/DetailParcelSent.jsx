import React, { useEffect, useState } from "react";
import { Button, Card, CardContent, Grid, List, ListItem, ListItemText, Typography } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import BACKEND_HOSTNAME, { DEV_HOSTNAME } from "../config/backend.config";
import { auth, authenticateUser } from "../config/firebase.config";

 
const DetailParcelSent = ({ parcelDetails }) => {
  const [user] = useAuthState(auth);
  const [response, setResponseData] = useState(null);
  const [locations, setLocations] = useState([]);
 authenticateUser()
 



  return (
    <div className="main-div">
      <p className="heading">New parcel has been sent to you!</p>
      <Grid item xs={10} sm={6} xl={10}>
        <p className="parecl_content">
          {parcelDetails.senderName} sent a new package to you.
        </p>
        <p className="parecl_content">
          The driver will soon pick it up and deliver it to one of the 5 parcel
          locker locations. We will send you a new notification when the driver
          will start delivery.
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
                  <b>Parcel status : </b> {parcelDetails.status}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
};

export default DetailParcelSent;
