import React from "react";
import { useParams } from "react-router-dom";
import DetailParcel from "../Components/DetailParcel";

const DetailParcelPage = () => {
  const { parcelID } = useParams();
  return <DetailParcel parcelID={parcelID} />;
};

export default DetailParcelPage;
