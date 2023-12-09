import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import BACKEND_HOSTNAME, { DEV_HOSTNAME } from "../config/backend.config";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase.config";
import Notification from "../Components/Notification";
import { Container, Typography } from "@mui/material";

export default function Sender() {
  const [user] = useAuthState(auth);
  const [response, setResponseData] = useState(null);
  const [locations, setLocations] = useState([]);
  // Form data and sending package section
  const [formData, setFormData] = useState({
    senderName: user ? user.displayName : "",
    senderEmailAddress: user ? user.email : "",
    senderAddress: "",
    senderPhoneNumber: user ? user.phoneNumber : "",
    senderID: user?.uid,
    senderDropOffLocation: "",

    receiverName: "",
    receiverEmailAddress: "",
    receiverAddress: "",
    receiverPhoneNumber: "",

    packageWidth: "",
    packageHeight: "",
    packageMass: "",

     // new features for lockers
     receiverLocationId: "",
     senderLocationId: "",
     lockerID: "",
     lockerNumber: ""
  });

  const [step, setStep] = useState(1);
  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };
  const handleNextButtonClick = () => {
    setStep(step + 1);
  };
  const handlePrevButtonClick = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const validateForm = () => {
    // Basic validation, add more as needed
    return (
      formData.senderName !== "" &&
      formData.senderEmailAddress !== "" &&
      formData.senderPhoneNumber !== "" &&
      formData.receiverName !== "" &&
      formData.receiverEmailAddress !== "" &&
      formData.receiverPhoneNumber !== "" &&
      formData.packageWidth !== "" &&
      formData.packageHeight !== "" &&
      formData.packageMass !== ""
    );
  };

  const handleChooseLocation = (locationId, locationAddress) => {
    setFormData({ ...formData, senderLocationId: locationId, senderDropOffLocation: locationAddress });
  };

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      const confirmationMessage =
        "Are you sure you want to leave? Your changes may be lost.";
      e.returnValue = confirmationMessage;
      return confirmationMessage;
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

//NOTE -  Endpoint to reserve a cabinet and create parcel on submit
const submithandleClick = async () => {
  try {
    if (!validateForm()) {
      alert("Please fill out all fields before confirming.");
      return;
    }

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
    const { cabinet_id, cabinet_number } = reserveResult; // get cabinet id and pass it to store in db
    
    // Include cabinet_id in the second API request body
    const parcelsApiUrl = `${DEV_HOSTNAME}/api/parcels`;
    const parcelsResponse = await fetch(parcelsApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        lockerNumber: cabinet_number,
        lockerID: cabinet_id
      }),
    });

    const parcelsResult = await parcelsResponse.json();

    // Handle the API responses as needed
    setResponseData(parcelsResult);
    console.log("Reserved locker!:", reserveResult);
    console.log("Created parcels!:", parcelsResult);
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
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <h5 className="set_heading">To Send a package</h5>
            <p className="set_para">
              Please fill out all required information completely...
            </p>
            <div className="main_send">
              <h3
                style={{
                  color: "#686868",
                  textAlign: "center",
                  margin: "auto",
                }}
              >
                Sender Details
              </h3>
              <TextField
                placeholder="Sender Name"
                type="text"
                required
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.senderName}
                onChange={handleChange("senderName")}
                style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)" }}
              />
              <TextField
                placeholder="Sender Email Address"
                type="email"
                required
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.senderEmailAddress}
                onChange={handleChange("senderEmailAddress")}
                style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)" }}
              />
              <TextField
                placeholder="Sender Address"
                type="text"
                required
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.senderAddress}
                onChange={handleChange("senderAddress")}
                style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)" }}
              />
              <TextField
                placeholder="Sender Phone Number"
                type="number"
                required
                variant="outlined"
                fullWidth
                margin="normal"
                name="phone"
                value={formData.senderPhoneNumber}
                onChange={handleChange("senderPhoneNumber")}
                style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)" }}
              />
            </div>
          </>
        );
      case 2:
        return (
          <>
            <h5 className="set_heading">Receiver Details</h5>
            <p className="p_sender">
              Please fill out all required information completely...
            </p>
            <div className="main_send">
              <h3
                style={{
                  color: "#686868",
                  textAlign: "center",
                  margin: "auto",
                }}
              >
               Receiver Details
              </h3>
              <TextField
                placeholder="Receiver Name"
                type="text"
                required
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.receiverName}
                onChange={handleChange("receiverName")}
                style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)" }}
              />
              <TextField
                placeholder="Receiver Email Address"
                type="email"
                variant="outlined"
                fullWidth
                required
                margin="normal"
                value={formData.receiverEmailAddress}
                onChange={handleChange("receiverEmailAddress")}
                style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)" }}
              />
              <TextField
                placeholder="Receiver Address"
                type="text"
                variant="outlined"
                fullWidth
                required
                margin="normal"
                value={formData.receiverAddress}
                onChange={handleChange("receiverAddress")}
                style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)" }}
              />
              <TextField
                placeholder="Receiver Phone Number"
                type="number"
                variant="outlined"
                fullWidth
                required
                margin="normal"
                value={formData.receiverPhoneNumber}
                onChange={handleChange("receiverPhoneNumber")}
                style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)" }}
              />
            </div>
          </>
        );
      case 3:
        // Additional fields for step 2
        return (
          <>
            <h5 className="set_heading">Package Details</h5>
            <p className="p_sender">
              Please fill out all required information completely...
            </p>
            <div className="main_send">
              <h3
                style={{
                  color: "#686868",
                  textAlign: "center",
                  margin: "auto",
                }}
              >
              Package details
              </h3>
              <TextField
                placeholder="Enter package width"
                type="number"
                required
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.packageWidth}
                onChange={handleChange("packageWidth")}
                style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)" }}
              />
              <TextField
                placeholder="Enter package height"
                type="number"
                required
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.packageHeight}
                onChange={handleChange("packageHeight")}
                style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)" }}
              />
              <TextField
                placeholder="Enter package mass"
                type="number"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.packageMass}
                onChange={handleChange("packageMass")}
                style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)" }}
              />
            </div>
          </>
        );
      case 4:
        return (
          <>
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
                      onClick={() => handleChooseLocation(location.id, location.address)}
                    >
                      Choose
                    </Button>
                  </ListItem>
                ))}
              </List>
            </div>
          </>
        );
      case 5:
        // Additional fields for step 4 (Final Confirmation)
        return (
          <>
            <h5 className="set_heading">Final Confirmation</h5>
            <p>Review your information before confirming.</p>
            <div className="main_send">
              <h3
                style={{
                  color: "#686868",
                  textAlign: "center",
                  margin: "auto",
                }}
              >
                Final Details
              </h3>
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
                  <div className="parcel_info_main">
                    <p className="parcel_info">
                      <b>Tracking number : </b> {response?.trackingNumber}
                    </p>
                    <p className="parcel_info">
                      <b>Receiver name : </b> {response?.receiverName}
                    </p>
                    <p className="parcel_info">
                      <b>Receiver email : </b> {response?.receiverEmailAddress}
                    </p>

                    <p className="parcel_info">
                      <b>Address of parcel locker (to send package) : </b>{" "}
                      {response?.senderDropOffLocation}
                    </p>

                    <p className="parcel_info">
                      <b>Cabinet number : </b> {response?.lockerNumber}
                    </p>
                    <p className="parcel_info">
                      <b>Parcel status : </b> {response?.status}
                    </p>
                    <p className="parcel_info">
                      <b>Pin code for parcel locker : </b> {response?.pinCode}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
            <br></br>
            <Button
              variant="contained"
              style={{ backgroundColor: "#42820F" }}
              onClick={submithandleClick}
            >
              Submit
            </Button>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Container style={{ display: "flex" }}>
      <Notification />
      <div>
        <p
          className="heading"
          style={{
            border: "1px solid #FFFAF6",
            padding: "10px",
            backgroundColor: "#FFFAF6",
            borderRadius: "10px 10px 0 0",
          }}
        >
          Sender
        </p>
        <Grid
          style={{
            backgroundColor: "#F2FDE8",
            padding: "10px",
            borderRadius: "5px",
            marginTop: "10px",
            height: "100vh",
            width: "100%",
          }}
        >
          <h2></h2>
          {renderStepContent()}
          <br />
          <div>
            {step > 1 && (
              <Button
                variant="contained"
                style={{ float: "left", backgroundColor: "#42820F" }}
                onClick={handlePrevButtonClick}
              >
                Previous
              </Button>
            )}
            {step < 5 && (
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#42820F",
                  color: "#FDF9F3",
                  float: "right",
                }}
                onClick={handleNextButtonClick}
              >
                Next
              </Button>
            )}
          </div>
        </Grid>
      </div>
    </Container>
  );
}
