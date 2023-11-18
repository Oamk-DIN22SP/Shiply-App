import React from "react";
import { Button } from "@mui/material";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase.config";
import { useNavigate } from "react-router-dom";

export default function Settings() {
    const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("User signed out successfully");
       navigate("/login");

    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  return (
    <div>
      Settings
      <br />
      <Button variant="outlined" color="secondary" onClick={handleSignOut}>
        Sign out
      </Button>
    </div>
  );
}
