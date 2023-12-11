import React, { useEffect, useState } from "react";
import "./App.css";
import ResponsiveDrawer from "./Pages/Dashboard";
import LoginPage from "./Pages/LoginPage";
import SignupForm from "./Pages/SignupPage";
import Dashboard from "./Pages/Dashboard";
import History from "./Pages/History";
import Receiver from "./Pages/Receiver";
import Sender from "./Pages/Sender";
import Track from "./Pages/Track";
import Settings from "./Pages/Settings";

import Home from "./Pages/Home";
import { auth } from "./config/firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from "react-router-dom";
import LoginForm from "./Pages/LoginPage";
import DetailParcelPage from "./Pages/DetailParcelPage";
import RecivedParcel from "./Right_Side_Pannel/RecivedParcel";
import OtherParcel from "./Right_Side_Pannel/OtherParcel";
import SendParcel from "./Right_Side_Pannel/SendParcel";

function App() {
  const [user] = useAuthState(auth);
  return (
    <>
      {user && <ResponsiveDrawer />}
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <Navigate to="/home" replace={true} />
            ) : (
              <Navigate to="/login" replace={true} />
            )
          }
        />
        // Public routes
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        // Private routes
        {user && (
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/sender" element={<Sender />} />
            <Route path="/receiver" element={<Receiver />} />
            <Route
              path="/receiver/parcel/:parcelID"
              element={<DetailParcelPage />}
            />
            <Route path="/track" element={<Track />} />
            <Route path="/history" element={<History />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/receivedparcel" element={<RecivedParcel />} />
            <Route path="/sendparcel" element={<SendParcel />} />
            <Route path="/otherparcel" element={<OtherParcel />} />
          </>
        )}
      </Routes>
    </>
  );
}
export default App;
