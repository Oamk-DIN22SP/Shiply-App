import React, { useEffect, useState } from 'react';
import './App.css'
import ResponsiveDrawer from './Pages/Dashboard'
import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from "react-router-dom";
import LoginForm from './Components/LoginForm';
import SignupForm from './Components/SignupForm';
import Dashboard from './Pages/Dashboard';
import History from './Pages/History';
import Receiver from './Pages/Receiver';
import Sender from './Pages/Sender';
import Track from './Pages/Track';
import Settings from './Pages/Settings';

import Home from './Pages/Home';




function App() {
  const [user, setUser] = useState(null);


  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <Navigate to="/dashboard" />
            ) : (
              <Navigate to="/login" replace={true} />
            )
          }
        />
        <Route path="/home/:userId" element={<Home />} />
        <Route path={`/login`} element={<LoginForm />} />
        <Route path={`/signup`} element={<SignupForm />} />
        <Route path={`/dashboard`} element={<Dashboard />} />
        <Route path={`/history`} element={<History />} />
        <Route path={`/receiver`} element={<Receiver />} />
        <Route path={`/sender`} element={<Sender />} />
        <Route path={`/track`} element={<Track />} />
        <Route path={`/settings`} element={<Settings />} />
      </Routes>

      <ResponsiveDrawer />
    </div>
  );
}

export default App
