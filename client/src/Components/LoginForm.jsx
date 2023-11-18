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

const LoginForm = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => {
      // Unsubscribe when the component is unmounted
      unsubscribe();
    };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
    navigate("/home");
  };

  const handleSignUpClick = () => {
    navigate("/signup");
  };

  const loginWithGoogle = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    try {
      await signInWithRedirect(auth, provider);

      // Handle the redirect result
      const result = await getRedirectResult(auth);

      if (result.user) {
        // Get the user ID token
        const idToken = await result.user.getIdToken();

        // Send the ID token to the server for authentication
        const response = await fetch(
          "https://shiply-server.onrender.com/api/auth/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ idToken }),
          }
        );

        const data = await response.json();
        console.log("Response from server:", data);
      }
    } catch (error) {
      console.error("Error logging in with Google:", error);
      // Handle the error, e.g., show an error message to the user
    }
  };

  if (user) {
    // If the user is already signed in, you might redirect them to another page
    navigate("/home"); // Adjust the route as needed
    return null; // Render nothing or a loading spinner
  }
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
    const response = await fetch(
      "https://shiply-server.onrender.com/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idToken }),
      }
    );

    const data = await response.json();
    console.log("Response from server:", data);
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
          {/* ... rest of your form */}
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
          <Button
            sx={{ marginTop: 2, borderRadius: 3 }}
            color="warning"
            onClick={handleSignUpClick}
          >
            <NavLink to="/signup">Don't have an account? Sign Up</NavLink>
          </Button>
          <button onClick={loginWithGoogle}>Login with Google</button>
        </form>
      </Paper>
    </Container>
  );
};

export default LoginForm;
