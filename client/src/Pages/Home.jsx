import React, { useEffect, useState } from "react";
import Notification from "../Components/Notification";
import Details from "../Components/Details";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, authenticateUser } from "../config/firebase.config";
import BACKEND_HOSTNAME from "../config/backend.config";

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
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const fetchedData = await response.json();
        console.log(fetchedData)
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching parcels:", error);
      }
    };

    fetchParcels();
  }, [user]);

  // Check if all packages have status "delivered" or null
  const allPackagesDeliveredOrNull = data.every(
    (parcel) => parcel.status === "delivered" || parcel.status === null
  );

  return (
    <div className="home_page">
      <Notification onNotificationItemClick={handleNotificationItemClick} />
      {allPackagesDeliveredOrNull ? (
        <div>
          <h4> Welcome, {user?.displayName} </h4>
          <p>You don`t currently have any incoming or outgoing parcels.</p>
        </div>
      ) : (
        <div>
          <h4> Welcome , {user?.displayName} </h4>
          <Details selectedItem={data} />
        </div>
      )}
    </div>
  );
}
