import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const DetailParcelDefault = ({ parcelDetails }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          Parcel Details
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Parcel ID:</strong> {parcelDetails.parcelID}
        </Typography>
        {/* Add default details or handle other statuses as needed */}
        <Typography variant="body2" color="text.secondary">
          <strong>Status:</strong> {parcelDetails.status}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Tracking number:</strong> {parcelDetails.trackingNumber}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Pin Code</strong> {parcelDetails.pinCode}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DetailParcelDefault;
