// SignupForm.js
import React, { useState,useEffect } from 'react';
import { TextField, Button, Container, Paper, Typography } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import BACKEND_HOSTNAME from '../config/backend.config';
import { auth } from '../config/firebase.config';
import background from "../images2/consumer-app-login-bg.png";

const SignupForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
   username: '',
    email: '',
    password: '',
    address:'',
    phone:'',
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
 

  const validate = (inputValues) => {
    let errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!inputValues.username) {
      errors.username = 'Username is required';
    }
    if (!inputValues.email) {
      console.log(formData.email);
      errors.email = 'Email is required';
    } else if (!regex.test(inputValues.email)) {
      errors.email = 'Invalid email format';
    }
    if (!inputValues.password) {
      errors.password = 'Password is required';
    } else if (inputValues.password.length < 6) {
      errors.password = 'Password must be more than 6 characters';
    }
    if (!inputValues.address) {
      errors.address = 'Address is required';
    }
    if (!inputValues.phone.match('[0-9]{10}')) {
      errors.phone = 'Phone Number is digits should be 11';
    }
    return errors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setErrors(validate(formData));
   setSubmitting(true);
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      formData.email,
      formData.password,
    );
    // Get the user ID token
    const idToken = await userCredential.user.getIdToken();

    // Send the ID token to the server for authentication
    const response = await fetch(`${BACKEND_HOSTNAME}/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idToken,
        email: formData.email,
        displayName: formData.username,
        clientAddress: formData.address,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      // If the response status is okay, proceed with your logic
      // @ts-ignore
      await updateProfile(auth.currentUser, { displayName: formData.username }).catch(
        (err) => console.log(err)
      );
      
      console.log("Response from server:", data);
      navigate("/home");
    } else {
      // If there's an error in the response, handle it
      console.error("Error from server:", data);
    }
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(errorCode, errorMessage);
    // Handle the error (e.g., display an error message to the user)
  }
};
const finishSubmit = () => {
  console.log(formData);
};
useEffect(() => {
  if (Object.keys(errors).length === 0 && submitting) {
    finishSubmit();
  }
}, [errors, submitting]);

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
      }}
    >
      <Container component="main" maxWidth="xs">
        <Paper
          elevation={3}
          style={{
            padding: 16,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h5">Sign Up</Typography>
          {Object.keys(errors).length === 0 && submitting ? (
            <span className="success">Successfully submitted ✓</span>
          ) : null}
          <form
            onSubmit={handleSubmit}
            style={{ width: "100%", marginTop: 16 }}
          >
            <TextField
              placeholder="Username"
              variant="outlined"
              margin="normal"
              fullWidth
              value={formData.username}
              name="username"
              onChange={handleChange}
            />
            {errors.username ? (
              <p className="error">Please enter your name</p>
            ) : null}
            <TextField
              placeholder="Email"
              type="email"
              variant="outlined"
              margin="normal"
              fullWidth
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email ? (
              <p className="error">
                Email should be at least 15 characters long
              </p>
            ) : null}

            <TextField
              placeholder="Password"
              type="password"
              variant="outlined"
              margin="normal"
              fullWidth
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password ? (
              <p className="error">
                Password should be at least 5 characters long
              </p>
            ) : null}
            <TextField
              placeholder="Address"
              type="text"
              variant="outlined"
              margin="normal"
              fullWidth
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
            {errors.address ? (
              <p className="error">Please enter your address</p>
            ) : null}

            <TextField
              placeholder="Phone Number"
              type="number"
              variant="outlined"
              margin="normal"
              fullWidth
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
            {errors.phone ? (
              <p className="error">
                phone number should be at least 11 digits long
              </p>
            ) : null}

            <Button sx={{ marginTop: 2, borderRadius: 3 }} color="warning">
              <NavLink to="/login">Already have an account? Login</NavLink>
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="warning"
              style={{ marginTop: 16 }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </form>
        </Paper>
      </Container>
    </Container>
  );
};

export default SignupForm;
