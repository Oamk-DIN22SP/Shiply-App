import React, { useEffect, useState } from "react";
import { TextField, Button, Container, Paper, Typography } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithRedirect,
  getRedirectResult,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../config/firebase.config.js";
import logo from "../Images/img_shiplylogo1.png";
import BACKEND_HOSTNAME from "../config/backend.config.js";
import { useAuthState } from "react-firebase-hooks/auth";

const LoginForm = () => {
const [user] = useAuthState(auth); 
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });



    

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
const loginWithGoogle = async () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  try {
    // Initiate Google sign-in
    await signInWithRedirect(auth, provider);

    // After returning from the redirect when your app initializes you can obtain the result
    const result = await getRedirectResult(auth);
   
    if (result) {
      // Get the user ID token
       const user = result.user;
      const idToken = await user.getIdToken();

      // Send the ID token to the server for authentication
      const response = await fetch(`${BACKEND_HOSTNAME}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idToken }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Response from server:", data);
        navigate("/home");
      } else {
        // Handle the case where the server response is not OK
        console.error("Server response not OK:", response);
      }
    } else {
      // Handle the case where result.user is null
      console.error("result.user is null");
    }
  } catch (error) {
    console.error("Error logging in with Google:", error);
    // Handle the error, e.g., show an error message to the user
  }
};


  const handleLogin = async () => {
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // Get the user ID token
      const idToken = await userCredential.user.getIdToken();

      // Send the ID token to the server for authentication
      const response = await fetch(`${BACKEND_HOSTNAME}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idToken }),
      });

      const data = await response.json();

      if (response.ok) {
        // If the response status is okay, proceed with your logic
        console.log("Response from server:", data);
        navigate("/home");
      } else {
        // If there's an error in the response, handle it
        console.error("Error from server:", data);

        // Alert the user about the error
        alert("Authentication failed. Please try again.");

      }
    } catch (error) {
      console.error("Error logging in:", error);
      // Handle the error, e.g., show an error message to the user
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <img src={logo} alt="Logo" style={{ width: "250px", height: "auto" }} />
      <p className="logo_line">Your local delivery solution</p>
      <Paper
        elevation={3}
        style={{
          padding: 16,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: "5px",
          boxShadow: "5px 5px 10px #ccc 10px",
          backgroundColor: "#fffdfb",
        }}
      >
        <Typography variant="h5">Login</Typography>
        <form onSubmit={handleSubmit} style={{ width: "100%", marginTop: 16 }}>
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            margin="normal"
            fullWidth
            required
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            fullWidth
            required
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <Button
            type="submit"
            variant="contained"
            color="warning"
            style={{ marginTop: 16, textAlign: "center" }}
            onClick={handleLogin}
          >
            Login
          </Button>
          <br />
          <Button sx={{ marginTop: 2, borderRadius: 3 }} color="warning">
            <NavLink to="/signup">Don't have an account? Sign Up</NavLink>
          </Button>
          <button onClick={loginWithGoogle}>Login with Google doesnt work now</button>
        </form>
      </Paper>
    </Container>
  );
};

export default LoginForm;
