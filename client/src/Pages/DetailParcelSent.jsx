import React, { useEffect, useState } from "react";
import { Button, Card, CardContent, Grid, List, ListItem, ListItemText, Typography } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import BACKEND_HOSTNAME from "../config/backend.config";
import { auth } from "../config/firebase.config";

 
const DetailParcelSent = ({ parcelDetails }) => {
  const [user] = useAuthState(auth);
  const [response, setResponseData] = useState(null);
  const [locations, setLocations] = useState([]);

  const handleChooseLocation = (locationId, locationAddress) => {
    setFormData({
      ...formData,
      senderLocationId: locationId,
      senderDropOffLocation: locationAddress,
    });
  };
  const [formData, setFormData] = useState({
    receiverName: user ? user.displayName : "",
    receiverEmailAddress: user ? user.email : "",
    receiverAddress: "",
    receiverPhoneNumber: user ? user.phoneNumber : "",
    receiverID: user?.uid,
    receiverDropOffPoint: "",
    // new features for lockers
    receiverLocationId: "",
    senderLocationId: "",
    lockerID: "",
  });

  //NOTE -  Endpoint to reserve a cabinet and create parcel on submit
  const submithandleClick = async () => {
    try {
     
      // First API request to reserve a cabinet
      const reserveApiUrl = `${BACKEND_HOSTNAME}/api/locations/reserve`;
      const reserveResponse = await fetch(reserveApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ location_id: formData.senderLocationId }), // Adjust the location_id as needed
      });

      const reserveResult = await reserveResponse.json();
      const { cabinet_id } = reserveResult; // get cabinet id and pass it to store in db

      // Include cabinet_id in the second API request body
      const parcelsApiUrl = `${DEV_HOSTNAME}/api/parcels/status/${parcelDetails.parcelID}`;
      const parcelsResponse = await fetch(parcelsApiUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status : "picked",
          lockerID: cabinet_id,
        }),
      });

      const parcelsResult = await parcelsResponse.json();

      // Handle the API responses as needed
      setResponseData(parcelsResult);
      console.log("Reserved locker!:", reserveResult);
      console.log("Updated status of parcel!:", parcelsResult);
    } catch (error) {
      console.error("Error sending data to API:", error);
    }

    console.log("Form data:", formData);
  };
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch(`${BACKEND_HOSTNAME}/api/locations`);
        const data = await response.json();
        console.log("Fetched parcel locker locations:", data);
        setLocations(data); // Assuming your API returns an array of locations
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, []);
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
            maxWidth: 600,
            lineHeight: "10px",
            fontSize: "small",
            boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#fffdfb",
          }}
        >
          <h5 className="send_parcel">Drop Off Locations</h5>
          <p className="p_sender">Please choose a drop off location...</p>
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
            <List>
              {locations.map((location) => (
                <ListItem
                  key={location.id}
                  style={{ backgroundColor: "#D5F9B8", margin: "2px" }}
                  value={formData.senderLocationId}
                >
                  <ListItemText
                    primary={location.title}
                    secondary={location.address}
                    style={{ fontSize: "small" }}
                    value={formData.senderDropOffLocation}
                  />
                  <Button
                    variant="outlined"
                    style={{
                      marginLeft: "10px",
                      backgroundColor: "#ADADAD",
                      color: "black",
                      fontSize: "9px",
                      padding: "5px",
                      border: "none",
                    }}
                    onClick={() =>
                      handleChooseLocation(location.id, location.address)
                    }
                  >
                    Choose
                  </Button>
                </ListItem>
              ))}
            </List>
          </div>
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
