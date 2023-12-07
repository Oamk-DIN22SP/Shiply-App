import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const DetailParcelPicked = ({ parcelDetails }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          Parcel Details
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Parcel ID:</strong> {parcelDetails.parcelID}
        </Typography>
        {/* Add other details specific to the "picked" status */}
        <Typography variant="body2" color="text.secondary">
          <strong>Status:</strong> Your package will be delivered!
        </Typography>
        {/* Add more details for the "picked" status */}
      </CardContent>
    </Card>
  );
};

export default DetailParcelPicked;
