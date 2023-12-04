import React from 'react';
import InputField from './ui/input';
import Button from './ui/buttons';
import './signup.css';
import { Link, Navigate } from 'react-router-dom';


export default function Signup() {
  const [formData, setFormData] = React.useState({
    username: "",
    email: "",
    password: "",
    address: "",
    phone: "",
  });
  const [error, setError] = React.useState({
    username: "",
    email: "",
    password: "",
    address: "",
    phone: "",
  });
  const form_submit = (e) => {
    e.preventDefault();
  }

  // Form data validation
  const handleSignUp = () => {
    let newError = {};

    if (!formData.username) {
      newError.username = "Please enter username";
    }

    if (!formData.email) {
      newError.email = "Please enter email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(formData.email)) {
      newError.email = "Invalid email format";
    }

    if (!formData.password) {
      newError.password = "Please enter your password";
    } else if (formData.password.length < 6) {
      newError.password = "Password must be 6 characters long";
    }

    if (!formData.address) {
      newError.address = "Please enter your address";
    }

    if (!formData.phone) {
      newError.phone = "Please enter your phone number";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newError.phone = "Phone number must be 10 digits long";
    }
    setError(newError);
    console.log(formData); 
  };


  return (
    <div className='signup_container'>
      <div className='main_div'>
        <div className='main_heading'>
          <h1 className='heading'>Create an account</h1>
          <span className='sub_heading'>Please fill out the required information completely</span>
        </div>
       <form onSubmit={form_submit}>
       <div className="input_box">
          <InputField type='text' name='username' placeholder='Username' className='signup_input' onChange={(e) => setFormData({ ...formData, username: e.target.value })} />
          {error.username && <p className="error-message">{error.username}</p>}

          <InputField type='text' name='email' placeholder='Email' className='signup_input' onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
          {error.email && <p className="error-message">{error.email}</p>}

          <InputField type='password' name='password' placeholder='Password' className='signup_input' onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
          {error.password && <p className="error-message">{error.password}</p>}

          <InputField type='text' name='address' placeholder='Address' className='signup_input' onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
          {error.address && <p className="error-message">{error.address}</p>}

          <InputField type='number' name='phone' placeholder='Phone' className='signup_input' onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
          {error.phone && <p className="error-message">{error.phone}</p>}
        </div>
        <div className='btn_box'>
         <Button type="submit" className="btn-component" disabled={false} onClick={handleSignUp}>
            Sign Up
          </Button>
        </div>
        </form>
      </div>
    </div>
  );
}
