// User authentication Firebase controller
import { useEffect } from "react";
import { auth } from "../config/firebase.config";

const AuthController = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const token = await user.getIdToken();

          const payloadHeader = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          };
          const res = await fetch(
            "https://shiply-server.onrender.com/",
            payloadHeader
          );
          console.log(await res.text());
        } else {
          // Handle the case when the user is not logged in
          console.log("User is not logged in.");
        }
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
  }, []); // Dependency array to ensure useEffect runs only once

  return null; // This component doesn't render anything, so return null
};

export default AuthController;
