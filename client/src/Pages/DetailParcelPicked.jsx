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

const DetailParcelPicked = ({ parcelDetails }) => {
  const [user] = useAuthState(auth);
  const [response, setResponseData] = useState(null);
 
  
  return (
    <div className="main-div">
      <p className="heading">Your new package awaits...</p>
      <Grid>
        <p className="parecl_content">
          {parcelDetails.senderName} sent a new package to you.
        </p>
        <p className="parecl_content">
          Choose the parcel center to pick up your delivery.
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
                Location
              </h4>
              
            </div>

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
                {response?.receiverDropOffPoint}
              </p>

              <p className="parcel_info">
                <b>Cabinet number : </b> {response?.lockerNumber}
              </p>
              <p className="parcel_info">
                <b>Pin code for parcel locker : </b> {parcelDetails?.pinCode}
              </p>
              <p className="parcel_info">
                <b>Parcel status : </b> {response?.newStatus}
              </p>
            </div>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
};

export default DetailParcelPicked;
