// SignupForm.js
import React, { useState } from 'react';
import { TextField, Button, Container, Paper, Typography } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase.config';

const SignupForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
   username: '',
    email: '',
    password: '',
    address:'',
    phone:'',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await createUserWithEmailAndPassword(
      auth,
      formData.email,
      formData.password
    );
    console.log("User registered successfully");
    navigate("/home");
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(errorCode, errorMessage);
    // Handle the error (e.g., display an error message to the user)
  }
};

 

  return (
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
        <form onSubmit={handleSubmit} style={{ width: "100%", marginTop: 16 }}>
          <TextField
            label="First Name"
            variant="outlined"
            margin="normal"
            fullWidth
            required
            name="username"
            onChange={handleChange}
          />
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
          <TextField
            label="Address"
            type="text"
            variant="outlined"
            margin="normal"
            fullWidth
            required
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
          <TextField
            label="Phone"
            type="number"
            variant="outlined"
            margin="normal"
            fullWidth
            required
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          <Button sx={{ marginTop: 2, borderRadius: 3 }} color="warning">
            <NavLink to="/login">Already have an account? Login</NavLink>
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="warning"
            style={{ marginTop: 16 }}
            onClick={SignupForm}
          >
            Submit
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default SignupForm;
