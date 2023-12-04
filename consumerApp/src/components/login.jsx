import React, { useState } from 'react';
import InputField from './ui/input';
import Button from './ui/buttons';
import background from '../assets/img/consumer-app-login-bg.png';
import logo from '../assets/img/shiply-logo.png';
import { Link } from 'react-router-dom';
import './login.css';

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleForm = (e) => {
    e.preventDefault();
  };
  // Form data validation
  const handleLogin = () => {
    let newError = {};
    if (!formData.email) {
      newError.email = "Please enter email";
    }
    if (!formData.password) {
      newError.password = "Please enter your password";
    } 
    setErrors(newError);
    console.log(formData);
  };
  return (
    <div className='container' style={{ backgroundImage: `url(${background})` }}>
      <div className='header'>
        <img src={logo} alt='logo' className='logo_img' />
        <p className='logo_heading'>Your local delivery solution</p>
        <div className='login'>
          <form onSubmit={handleForm}>
            <div className='input_div'>
              <InputField
                type='text'
                name='email'
                placeholder='Email'
                className='login_input'
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              {errors.email && <p className="error-message">{errors.email}</p>}
              <InputField
                type='password'
                name='password'
                placeholder='Password'
                className='login_input'
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              {errors.password && <p className="error-message">{errors.password}</p>}
            </div>
            <div className='btn_div'>
              <Button type="submit" className="btn-component" disabled={false} onClick={handleLogin}>
                <Link to="/home" className='logo_link'>Log in</Link>
              </Button>
              <p className='signup-link'>
                <Link to="/signup" className='login-link'> You do not have an account? Click here to create an account.</Link>
              </p>
            </div>
          </form>
        </div>
        <p className='driver-login-link'>Login as a driver</p>
      </div>
    </div>
  );
}
