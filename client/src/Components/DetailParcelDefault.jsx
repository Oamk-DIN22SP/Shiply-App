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

const DetailParcelSent = ({ parcelDetails }) => {
  const [user] = useAuthState(auth);
  const [response, setResponseData] = useState(null);
  const [locations, setLocations] = useState([]);
  authenticateUser();
  const handleChooseLocation = (locationId, locationAddress) => {
    setFormData({
      ...formData,
      receiverLocationId: locationId,
      receiverDropOffPoint: locationAddress,
    });
  };

  const [formData, setFormData] = useState({
    receiverDropOffPoint: "",
    // new features for lockers
    receiverLocationId: "",
    lockerID: "",
    lockerNumber: "",
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
        body: JSON.stringify({ location_id: formData.receiverLocationId }), // Adjust the location_id as needed
      });

      const reserveResult = await reserveResponse.json();
      if (!reserveResponse.ok) {
        throw new Error("Error reserving cabinet");
      }
      const { cabinet_id, cabinet_number } = reserveResult; // get cabinet id and pass it to store in db

      // Include cabinet_id in the second API request body
      const parcelsApiUrl = `${DEV_HOSTNAME}/api/parcels/status/${parcelDetails.parcelID}`;
      const parcelsResponse = await fetch(parcelsApiUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "picked",
          lockerID: cabinet_id,
          lockerNumber: cabinet_number,
          receiverDropOffPoint: formData.receiverDropOffPoint,
        }),
      });
      if (!parcelsResponse.ok) {
        throw new Error("Error updating parcel status");
      }
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
              <List>
                {locations.map((location) => (
                  <ListItem
                    key={location.id}
                    style={{ backgroundColor: "#D5F9B8", margin: "1px" }}
                    value={formData.receiverLocationId}
                  >
                    <ListItemText
                      primary={location.title}
                      secondary={location.address}
                      style={{ fontSize: "small" }}
                      value={formData.receiverDropOffPoint}
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

              <Button
                variant="contained"
                style={{ backgroundColor: "#42820F", marginTop: "10px" }}
                onClick={submithandleClick}
              >
                Submit
              </Button>
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
                {response?.receiverDropOffPointTitle}
              </p>

              <p className="parcel_info">
                <b>Cabinet ID : </b> {response?.lockerID}
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

export default DetailParcelSent;
