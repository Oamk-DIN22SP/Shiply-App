// Login and singup endpoints as well as send parcel endpoint are found in
// Login, signup and Sender component.

//NOTE - Other endpoints which are not still in use on client
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase.config";
import BACKEND_HOSTNAME, { DEV_HOSTNAME } from "../config/backend.config";
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

        const apiUrl = `${BACKEND_HOSTNAME}/api/parcels/createParcel`;
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

