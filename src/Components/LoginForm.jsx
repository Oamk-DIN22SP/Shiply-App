// LoginForm.js
import React, { useState } from 'react';
import { TextField, Button, Container, Paper, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SignUpForm from '../Components/SignupForm'
import logo from '../Images/img_shiplylogo1.png'

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here
    console.log('Form data submitted:', formData);
    navigate('/home');
  };

  const handleSignUpClick = () => {
    navigate('/signupForm');
  };

  return (
    <Container component="main" maxWidth="xs">
      <img
        src={logo}
        alt="Logo" style={{ width: '250px', height: 'auto' }} />
      <p className='logo_line'>Your local delivery soluiton</p>
      <Paper elevation={3} style={{ padding: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: '5px', boxShadow: '5px 5px 10px #ccc 10px', backgroundColor: '#fffdfb' }}>
        <Typography variant="h5">Login</Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: 16 }}>
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
          <Button type="submit" variant="contained" color="warning" style={{ marginTop: 16, textAlign: 'center' }}>
            Login
          </Button>
          <br />
          <Button sx={{ marginTop: 2, borderRadius: 3 }} color='warning' onClick={handleSignUpClick}>
            Don't have an account? Sign Up
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default LoginForm;
