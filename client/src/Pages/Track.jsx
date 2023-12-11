import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Container } from "@mui/system";
import BACKEND_HOSTNAME from "../config/backend.config";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase.config";
import { Typography, Box } from "@mui/material";
import DetailParcel from "../Components/DetailParcel";

export default function Track() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [parcelData, setParcelData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user] = useAuthState(auth);

  const handleTrackingNumberChange = (event) => {
    setTrackingNumber(event.target.value);
  };

  const handleTrackButtonClick = async () => {
    try {
      // Validate tracking number
      if (!trackingNumber.trim()) {
        console.error("Tracking number is required");
        return;
      }

      setLoading(true);

      // Ensure the user is authenticated before making the request
      if (!user) {
        console.error("User not authenticated");
        return;
      }

      // Construct the API URL with the delivery number as a parameter
      const apiUrl = `${BACKEND_HOSTNAME}/api/parcels/trackParcel/${trackingNumber}`;

      // Make a GET request to track the parcel
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      // Handle the API response as needed
      console.log("API Response:", result[0]);

      // Update parcelData with the fetched data
      setParcelData(result[0]);
    } catch (error) {
      console.error("Error tracking parcel:", error);
    } finally {
      setLoading(false);
    }
  };

  const displayParcelDetails = (parcel) => (
    <div>
      {parcel ? (
        <DetailParcel parcelID={parcel.parcelID} />
      ) : (
        <p>No parcel details available.</p>
      )}
    </div>
  );

  return (
    <Container style={{ display: "flex" }}>
      {/* Left Grid */}
      <Box sx={{ marginLeft: { xs: 0, sm: 30 } }}>
        <Typography
          variant="h5"
          className="heading"
          style={{
            border: "1px solid #FFFAF6",
            padding: "10px",
            backgroundColor: "#FFFAF6",
            borderRadius: "10px 10px 0 0",
            textAlign: "center",
          }}
        >
          Track
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} xl={8}>
            <h5 className="send_parcel">Track Your Delivery!</h5>
            <p className="track_content">
              Your 8 digit delivery number is enough to know the status
              <br></br>
              of your delivery.
            </p>
            <div className="text_field">
              <TextField
                variant="outlined"
                placeholder="Delivery Number"
                value={trackingNumber}
                onChange={handleTrackingNumberChange}
                style={{ width: "100%" }}
              />
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
                onClick={handleTrackButtonClick}
                style={{ backgroundColor: "#60326A", color: "#FDF9F3" }}
                disabled={loading}
              >
                {loading ? "Tracking..." : "Track"}
              </Button>
            </div>
          </Grid>

          <Grid item xs={12} sm={6} xl={8}>
            <div>
              {/* Display parcel data */}
              {parcelData && <div>{displayParcelDetails(parcelData)}</div>}
            </div>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
