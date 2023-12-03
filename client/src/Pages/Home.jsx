import React, { useEffect, useState } from "react";
import Notification from "../Components/Notification";
import Details from "../Components/Details";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, authenticateUser } from "../config/firebase.config";
import BACKEND_HOSTNAME, { DEV_HOSTNAME } from "../config/backend.config";
import { Typography } from "@mui/material";

export default function Home() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  authenticateUser();

  const handleNotificationItemClick = (item) => {
    setData(item);
  };

  useEffect(() => {
    // Fetch parcels from the backend API
    const fetchParcels = async () => {
      try {
        const apiUrl = `${BACKEND_HOSTNAME}/api/parcels/receiver/getParcels`;
        // Create a request payload with the expected structure
        const requestBody = {
          receiverEmailAddress: user?.email,
        };
        console.log(requestBody);
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });

        const fetchedData = await response.json();
        console.log("Fetched parcels", fetchedData);
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching parcels:", error);
      }
    };

    fetchParcels();
  }, [user]);
  let allPackagesDeliveredOrNull;


  return (
    <div className="home_page">
      <Notification onNotificationItemClick={handleNotificationItemClick} />

      {allPackagesDeliveredOrNull ? (
        <div>
          <Typography variant="h4" gutterBottom>
            Welcome, {auth.currentUser?.displayName}
          </Typography>
          <p>You don`t currently have any incoming or outgoing parcels.</p>
        </div>
      ) : (
        <div>
          <Details selectedItem={data} />
        </div>
      )}
    </div>
  );
}
