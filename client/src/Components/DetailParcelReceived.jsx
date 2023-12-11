import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import BACKEND_HOSTNAME, { DEV_HOSTNAME } from "../config/backend.config";
import { auth, authenticateUser } from "../config/firebase.config";

const DetailParcelReceived = ({ parcelDetails }) => {
  const [user] = useAuthState(auth);
  const [response, setResponseData] = useState(null);

  return (
    <div className="main-div">
      <p className="heading">Your package has been delivered!</p>
      <Grid item xs={10} sm={6} xl={10}>
        <p className="parecl_content">
          {parcelDetails.senderName} sent a new package to you.
        </p>
        <p className="parecl_content">
          Your parcel has been received at{" "}
          {parcelDetails.receiverDropOffPointTitle}.
          <br />
          Thank you for being with us!
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
                  <ListItemText primary="Parcel has been successfully delivered." />
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
                  {parcelDetails?.receiverDropOffPointTitle}
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

export default DetailParcelReceived;
