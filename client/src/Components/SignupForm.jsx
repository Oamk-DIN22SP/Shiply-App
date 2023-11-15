// SignupForm.js
import React, { useState } from 'react';
import { TextField, Button, Container, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your signup logic here
    console.log('Form data submitted:', formData);
    navigate('/home')
  };
 

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ padding: 16, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h5">Sign Up</Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: 16 }}>
          <TextField
            label="First Name"
            variant="outlined"
            margin="normal"
            fullWidth
            required
            name="username"
            value={formData.firstName}
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
          <Button type="submit" variant="contained" color="warning" style={{ marginTop: 16 }} onClick={SignupForm}>
            Submit
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default SignupForm;
