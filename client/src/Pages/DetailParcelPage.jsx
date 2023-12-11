import React from "react";
import { useParams } from "react-router-dom";
import DetailParcel from "../Components/DetailParcel";
import { Container, Box } from "@mui/material";

const DetailParcelPage = () => {
  const { parcelID } = useParams();
  return (
     <Container style={{ display: "flex" }}>
      <Box sx={{ marginLeft: { xs: 0, sm: 30 } }}>
  <DetailParcel parcelID={parcelID} />
  </Box>
  </Container>
  )
};

export default DetailParcelPage;
