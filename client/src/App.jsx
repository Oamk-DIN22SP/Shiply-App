import React, { useEffect, useState } from 'react';
import './App.css'
import ResponsiveDrawer from './Pages/Dashboard'

import LoginForm from './Components/LoginForm';
import SignupForm from './Components/SignupForm';
import Dashboard from './Pages/Dashboard';
import History from './Pages/History';
import Receiver from './Pages/Receiver';
import Sender from './Pages/Sender';
import Track from './Pages/Track';
import Settings from './Pages/Settings';

import Home from './Pages/Home';
import { auth } from './config/firebase.config';
import { useAuthState } from "react-firebase-hooks/auth";



function App() {

const [user] = useAuthState(auth); 

  return (
    <div>
      

       
     <ResponsiveDrawer/>
    </div>
  );
}

export default App
