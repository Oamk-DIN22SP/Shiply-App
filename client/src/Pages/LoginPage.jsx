import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Paper,
  Typography,
  Snackbar,
  SnackbarContent,
} from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithRedirect,
  getRedirectResult,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../config/firebase.config.js";
import logo from "../images2/shiply-logo.png";
import background from "../images2/consumer-app-login-bg.png";
import BACKEND_HOSTNAME from "../config/backend.config.js";
import { useAuthState } from "react-firebase-hooks/auth";

const LoginForm = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [snackbarOpen, setsnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarColor, setSnackbarColor] = useState("");

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setsnackbarOpen(false);
  };
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
    if (user) {
      setSnackbarMessage("Login successful");
      setSnackbarColor("#4CAF50"); // Set color for success
      setsnackbarOpen(true);
    }

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
        console.log(idToken);
        navigate("/home");
      } else {
        // If there's an error in the response, handle it
        console.error("Error from server:", data);
        setSnackbarMessage("Login failed");
        setSnackbarColor("#FF5252"); // Set color for failure
        setsnackbarOpen(true);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      // Handle the error, e.g., show an error message to the user
      setSnackbarMessage("An error occurred. Please try again.");
      setSnackbarColor("#FF5252"); // Set color for failure
      setsnackbarOpen(true);
    }
  };

  return (
    <Container
      fixed
      component="main"
      sx={{
        backgroundImage: `url(${background})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        height: "100vh",
        backgroundColor: ""
      }}
    >
      <Container maxWidth="xs">
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
          <form
            onSubmit={handleSubmit}
            style={{ width: "100%", marginTop: 16 }}
          >
            <TextField
              placeholder="Email"
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
              placeholder="Password"
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
              <NavLink to="/signup" style={{ color: "orange" }}>
                Don't have an account? Sign Up
              </NavLink>
            </Button>
            {/* <Button
            variant="contained"
            color="warning"
            style={{ marginTop: 16, textAlign: "center" }}
            onClick={loginWithGoogle}
          >
            Login with Google doesnt work now
          </Button>
         */}
          </form>
        </Paper>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={5000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <SnackbarContent
            style={{ backgroundColor: snackbarColor }}
            message={snackbarMessage}
          />
        </Snackbar>
      </Container>
    </Container>
  );
};

export default LoginForm;
