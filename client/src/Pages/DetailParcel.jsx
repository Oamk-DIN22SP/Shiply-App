import React from "react";
import { useParams } from "react-router-dom";
import DetailParcelSent from "./DetailParcelSent";
import DetailParcelDelivered from "./DetailParcelDelivered";
import DetailParcelPicked from "./DetailParcelPicked";
import DetailParcelDefault from "./DetailParcelDefault";
import BACKEND_HOSTNAME from "../config/backend.config";
import axios from "axios";

const DetailParcel = () => {
  const { parcelID } = useParams();
  const [parcelDetails, setParcelDetails] = React.useState(null);

  React.useEffect(() => {
    const fetchParcelDetails = async () => {
      try {
        const apiUrl = `${BACKEND_HOSTNAME}/api/parcels/${parcelID}`;
        const response = await axios.get(apiUrl);
        setParcelDetails(response.data[0]);
      } catch (error) {
        console.error("Error fetching parcel details:", error);
      }
    };

    if (parcelID) {
      fetchParcelDetails();
    }
  }, [parcelID]);

  if (!parcelDetails) {
    return <p>Loading parcel details...</p>;
  }

  // Render the appropriate component based on the parcel status
  switch (parcelDetails.status) {
    case "sent":
      return <DetailParcelSent parcelDetails={parcelDetails} />;
    case "delivered":
      return <DetailParcelDelivered parcelDetails={parcelDetails} />;
    case "picked":
      return <DetailParcelPicked parcelDetails={parcelDetails} />;
    // Add more cases for other statuses as needed
    default:
      return <DetailParcelDefault parcelDetails={parcelDetails} />;
  }
};

export default DetailParcel;
