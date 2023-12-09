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
      <p className="heading">Your package is on the way...</p>
      <Grid>
        <p className="parecl_content">
          {parcelDetails.senderName} sent a new package to you.
        </p>
        <p className="parecl_content">
    Our driver will deliver package to one of parcel lockers locations.
   <br/>
    We will notify you when the parcel is delivered.
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
                <b>Pin code for parcel locker : </b> {parcelDetails?.pinCode}
              </p>
              <p className="parcel_info">
                <b>Parcel status : </b> {parcelDetails?.status}
              </p>
            </div>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
};

export default DetailParcelPicked;
