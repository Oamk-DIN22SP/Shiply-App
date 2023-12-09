import React from "react";
import { useParams } from "react-router-dom";
import DetailParcelSent from "./DetailParcelSent";
import DetailParcelDelivered from "./DetailParcelDelivered";
import DetailParcelPicked from "./DetailParcelPicked";
import DetailParcelDefault from "./DetailParcelDefault";
import BACKEND_HOSTNAME from "../config/backend.config";
import axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase.config";
import DetailParcelReceived from "./DetailParcelReceived";

const DetailParcel = ({parcelID}) => {

  const [parcelDetails, setParcelDetails] = React.useState(null);
    const [user] = useAuthState(auth);
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
      // Check if the parcel is sent and the receiver email matches the user's email
      if (parcelDetails.receiverEmailAddress === user?.email) {
        return <DetailParcelSent parcelDetails={parcelDetails} />;
      }
      // If the receiver email does not match, fall through to the next case
      return <DetailParcelSent parcelDetails={parcelDetails} />;
    case "picked":
      return <DetailParcelPicked parcelDetails={parcelDetails} />;
    case "delivered":
      return <DetailParcelDelivered parcelDetails={parcelDetails} />;
    case "received":
      return <DetailParcelReceived parcelDetails={parcelDetails} />;
    // Add more cases for other statuses as needed
    default:
      return <DetailParcelDefault parcelDetails={parcelDetails} />;
  }
};

export default DetailParcel;
