import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import Swal from "sweetalert2";
import { signOut, updateProfile } from "firebase/auth";
import { auth } from "../config/firebase.config";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/system";
import Notification from "../Components/Notification";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Settings() {
  const navigate = useNavigate();

  const [user] = useAuthState(auth);
  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState({
    displayName: user ? user.displayName : "",
    email: user ? user.email : "",
    // Add other user-related fields as needed
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = async () => {
    // Add logic to save changes to the backend or update user profile
    // For example, you can use the updateProfile method provided by Firebase Auth
    await updateProfile(auth.currentUser, {
      displayName: formData.displayName,
    }).catch((err) => console.log(err));

    // After saving changes, exit edit mode
    setEditMode(false);
  };

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (editMode) {
        const confirmationMessage =
          "Are you sure you want to leave? Your changes may be lost.";
        e.returnValue = confirmationMessage; // Standard for most browsers
        return confirmationMessage; // For some older browsers
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
  });
  const handleSignOut = async () => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You will be able to sign in again!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#BF5000",
        cancelButtonColor: "#42820F",
        confirmButtonText: "Yes, sign out!",
      });

      if (result.isConfirmed) {
        await signOut(auth);
        console.log("User signed out successfully");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };
  const handleDeleteAccount = async () => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You will not be able to delete account again!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#BF5000",
        cancelButtonColor: "#42820F",
        confirmButtonText: "Yes, delete account!",
      });

      if (result.isConfirmed) {
        await user?.delete();

        console.log("User deleted successfully");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error deleting account:", error.message);
    }
  };
  return (
    <Container style={{ display: "flex" }}>
      <Notification />
      <div>
        <p
          className="heading"
          style={{
            border: "1px solid #FFFAF6",
            padding: "10px",
            backgroundColor: "#FFFAF6",
            borderRadius: "10px 10px 0 0",
          }}
        >
          Settings
        </p>
        <Grid
          style={{
            backgroundColor: "#FFFAF6",
            padding: "10px",
            borderRadius: "5px",
            marginTop: "10px",
            height: "100vh",
          }}
        >
          <h5 className="set_heading">Time is Limited!</h5>
          <p className="setting_content">
            Of course, there are a lot of settings that should be included. Yet,
            we have limited time and compulsory requirements to fulfill.
            Priorities :D
          </p>
          <br></br>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            <Button
              variant="contained"
              onClick={handleSignOut}
              style={{ backgroundColor: "#BF5000", color: "#FDF9F3" }}
            >
              Sign out
            </Button>
          </div>

          <TextField
            label="Display Name"
            variant="outlined"
            margin="normal"
            fullWidth
            name="displayName"
            value={formData.displayName}
            onChange={handleChange}
            disabled={!editMode}
          />
          <TextField
            label="Email Address"
            type="email"
            variant="outlined"
            margin="normal"
            fullWidth
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={!editMode}
          />

          {editMode ? (
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveClick}
            >
              Save Changes
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              style={{ backgroundColor: "#BF5000", color: "#FDF9F3" }}
              onClick={handleEditClick}
            >
              Edit
            </Button>
          )}
          <br></br>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              style={{ backgroundColor: "#BF5000", color: "#FDF9F3" }}
              onClick={handleDeleteAccount}
            >
              Delete account
            </Button>
          </div>
        </Grid>
      </div>
    </Container>
  );
}
