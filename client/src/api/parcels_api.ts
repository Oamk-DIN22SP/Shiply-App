// Login and singup endpoints as well as send parcel endpoint are found in
// Login, signup and Sender component.

//NOTE - Other endpoints which are not still in use on client
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase.config";
import BACKEND_HOSTNAME, { DEV_HOSTNAME } from "../config/backend.config";
import { useEffect } from "react";
const [user] = useAuthState(auth);
//NOTE - Get all parcels by receiver email (current Firebase email of a user, gets all parcels 
//which are connected to current user)

interface ParcelRequest {
    receiverEmailAddress?: string | null;
}

  async function getParcelsByReceiverID() {
    try {
        // Ensure the user is authenticated before making the request
        if (!user) {
            console.error('User not authenticated');
            return;
        }

        const apiUrl = `${BACKEND_HOSTNAME}/api/parcels/`;
        // Create a request payload with the expected structure
        const requestBody: ParcelRequest = {
            receiverEmailAddress: user.email,
        };

        const response  = await fetch(apiUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        });


        const result = await response.json();
        // Handle the API response as needed
        console.log("API Response:", result);
    } catch (error) {
        console.error("Error sending data to API:", error);
    }
}

async function trackParcel() {
    try {
        // Ensure the user is authenticated before making the request
        if (!user) {
            console.error('User not authenticated');
            return;
        }
// trackingNumber from input
        const apiUrl = `${BACKEND_HOSTNAME}/api/parcels/trackParcel/${trackingNumber}`;
        // Create a request payload with the expected structure
        const requestBody: ParcelRequest = {
            receiverEmailAddress: user.email,
        };

        const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        });


        const result = await response.json();
        // Handle the API response as needed
        console.log("API Response:", result);
    } catch (error) {
        console.error("Error sending data to API:", error);
    }
}
//NOTE -  Section for choosing locations of cabinet for receiver (obsolete because our backend is generating random locker centre for delivery)
const handleChooseLocation = (locationId, locationAddress) => {
    setFormData({
        ...formData,
        receiverLocationId: locationId,
        receiverDropOffPoint: locationAddress,
    });
};

const [formData, setFormData] = useState({
    receiverDropOffPoint: "",
    // new features for lockers
    receiverLocationId: "",
    lockerID: "",
    lockerNumber: ""
});
//   //NOTE -  Endpoint to reserve a cabinet and create parcel on submit
//   const submithandleClick = async () => {
//     try {
     
//       // First API request to reserve a cabinet
//       const reserveApiUrl = `${BACKEND_HOSTNAME}/api/locations/reserve`;
//       const reserveResponse = await fetch(reserveApiUrl, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ location_id: formData.receiverLocationId }), // Adjust the location_id as needed
//       });

//       const reserveResult = await reserveResponse.json();
//        if (!reserveResponse.ok) {
//          throw new Error("Error reserving cabinet");
         
//        }
//       const { cabinet_id, cabinet_number } = reserveResult; // get cabinet id and pass it to store in db

//       // Include cabinet_id in the second API request body
//       const parcelsApiUrl = `${DEV_HOSTNAME}/api/parcels/status/${parcelDetails.parcelID}`;
//       const parcelsResponse = await fetch(parcelsApiUrl, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           status : "picked",
//           lockerID: cabinet_id,
//           lockerNumber : cabinet_number,
//           receiverDropOffPoint : formData.receiverDropOffPoint
//         }),
//       });
//  if (!parcelsResponse.ok) {
//    throw new Error("Error updating parcel status");
//  }
//       const parcelsResult = await parcelsResponse.json();

//       // Handle the API responses as needed
//       setResponseData(parcelsResult);
//       console.log("Reserved locker!:", reserveResult);
//       console.log("Updated status of parcel!:", parcelsResult);
//     } catch (error) {
//       console.error("Error sending data to API:", error);
//     }

//     console.log("Form data:", formData);
//   };
//   useEffect(() => {
//     const fetchLocations = async () => {
//       try {
//         const response = await fetch(`${BACKEND_HOSTNAME}/api/locations`);
//         const data = await response.json();
//         console.log("Fetched parcel locker locations:", data);
//         setLocations(data); // Assuming your API returns an array of locations
//       } catch (error) {
//         console.error("Error fetching locations:", error);
//       }
//     };

//     fetchLocations();
//   }, []);
