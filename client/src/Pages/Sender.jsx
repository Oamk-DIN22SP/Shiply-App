import React, { useState } from "react";
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

export default function Sender() {
  const [user] = useAuthState(auth); 
  const [formData, setFormData] = useState({

    senderName: "",
    senderEmailAddress: "",
    senderAddress: "",
    senderPhoneNumber: "",
    senderID: user?.uid,
    
    receiverName: "",
    receiverEmailAddress: "",
    receiverAddress: "",
    receiverPhoneNumber: "",
    receiverLocation: "",

    packageWidth: "",
    packageHeight: "",
    packageMass: "",
    packageWeight: "",

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

  const handleChooseLocation = (chosenLocation) => {
    setFormData({ ...formData, location: chosenLocation });
  };

  const submithandleClick = async () => {
    try {
      // Replace the following URL with your actual API endpoint
      console.log(formData);
      const apiUrl = `${DEV_HOSTNAME}/api/parcels/createParcel`;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      // Handle the API response as needed
      console.log("API Response:", result);

    } catch (error) {
      console.error("Error sending data to API:", error);
    }
    console.log(formData);
  };
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <h3 className="send_parcel">Sender Details</h3>
            <TextField
              label="Sender Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.senderName}
              onChange={handleChange("senderName")}
              style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)" }}
            />
            <TextField
              label="Email Address"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.senderEmailAddress}
              onChange={handleChange("senderEmailAddress")}
              style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)" }}
            />
            <TextField
              label="Address"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.senderAddress}
              onChange={handleChange("senderAddress")}
              style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)" }}
            />
            <TextField
              label="Phone Number"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.senderPhoneNumber}
              onChange={handleChange("senderPhoneNumber")}
              style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)" }}
            />
          </>
        );
      case 2:
        return (
          <>
            <h3 className="send_parcel">Receiver Details</h3>
            <TextField
              label="Receiver Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.receiverName}
              onChange={handleChange("receiverName")}
              style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)" }}
            />
            <TextField
              label="Email Address"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.receiverAddress}
              onChange={handleChange("receiverAddress")}
              style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)" }}
            />
            <TextField
              label="Address"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.receiverAddress}
              onChange={handleChange("receiverAddress")}
              style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)" }}
            />
            <TextField
              label="Phone Number"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.receiverPhoneNumber}
              onChange={handleChange("receiverPhoneNumber")}
              style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)" }}
            />
          </>
        );
      case 3:
        // Additional fields for step 2
        return (
          <>
            <h5 className="send_parcel">Package Details</h5>
            {/* Add additional fields for step 2 */}
            {/* Example: */}
            <TextField
              label="Width"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.packageWidth}
              onChange={handleChange("packageWidth")}
              style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)" }}
            />
            <TextField
              label="Height"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.packageHeight}
              onChange={handleChange("packageHeight")}
              style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)" }}
            />
            <TextField
              label="Mass"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.packageMass}
              onChange={handleChange("packageMass")}
              style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)" }}
            />
            <TextField
              label="Weight"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.packageWeight}
              onChange={handleChange("packageWeight")}
              style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)" }}
            />
            {/* Add more fields as needed */}
          </>
        );
      case 4:
        // Additional fields for step 3
        return (
          <>
            <h5 className="send_parcel">Drop Off Location</h5>
            <List>
              {[
                "Kangastie 8001C / Tuiron kakku 24, Marikkonta, Oulu / Finland",
                "Kangastie 8001C / Tuiron kakku 24, Marikkonta, Oulu / Finland",
                "Kangastie 8001C / Tuiron kakku 24, Marikkonta, Oulu / Finland",
                "Kangastie 8001C / Tuiron kakku 24, Marikkonta, Oulu / Finland",
                "Kangastie 8001C / Tuiron kakku 24, Marikkonta, Oulu / Finland",
              ].map((location) => (
                <ListItem key={location} className="sender_list">
                  <ListItemText primary={location} style={{ margin: "10px" }} />
                  <Button
                    variant="outlined"
                    style={{ marginLeft: "10px" }}
                    onClick={() => handleChooseLocation(location)}
                  >
                    Choose
                  </Button>
                </ListItem>
              ))}
            </List>
          </>
        );
      case 5:
        // Additional fields for step 4 (Final Confirmation)
        return (
          <>
            <h5 className="send_parcel">Final Confirmation</h5>
            {/* Add content for final confirmation */}
            <p>Review your information before confirming.</p>
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
                    <b>Delivery number</b>: 12345678
                  </p>
                  <p className="parcel_info">
                    <b>PickUp point</b>: Location 5
                  </p>
                  <p className="parcel_info">
                    <b>Pickup address</b>:katu 502 A /102 Oulu Finland
                  </p>
                  <p className="parcel_info">
                    <b>Postal code</b>:1276
                  </p>
                  <p className="parcel_info">
                    <b>Consignee</b>: Thomas Edison
                  </p>
                  <p className="parcel_info">
                    <b>Cabinet number</b>12
                  </p>
                  <p className="parcel_info">
                    <b>Password</b>:2341
                  </p>
                </div>
              </CardContent>
            </Card>
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
    <div className="details">
      <p
        className="heading"
        style={{
          border: "1px solid #FFFAF6",
          padding: "10px",
          backgroundColor: "#FFFAF6",
          borderRadius: "10px 10px 0 0",
        }}
      >
        Send
      </p>
      {/* Grid with different background colors */}
      <Grid
        style={{
          backgroundColor: "#FFFAF6",
          padding: "10px",
          borderRadius: "5px",
          marginTop: "10px",
          height: "70vh",
        }}
      >
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
  );
}
