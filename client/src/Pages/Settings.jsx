import React from "react";
import { Button } from "@mui/material";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase.config";
import { useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid';
import { Container } from '@mui/system';


export default function Settings() {
const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("User signed out successfully");
      alert("User signed out successfully");
       navigate("/login");

    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  return (
    <Container>    
    <p className='heading' style={{border:'1px solid #FFFAF6', padding:'10px', backgroundColor:'#FFFAF6',borderRadius:'10px 10px 0 0'}}>Settings</p>
      <Grid style={{ backgroundColor: '#FFFAF6', padding: '10px', borderRadius: '5px',marginTop: '10px', height: '70vh' }}>
      <h5 className="set_heading">Time is Limited!</h5>
        <p className='setting_content'>Of course there are a lot of settings should be included. Yet, 
        we have limited time and compulsory requirements to fulfill. Priorities :D
         </p>
          <br>
          </br>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
          <Button variant="contained" onClick={handleSignOut} style={{ backgroundColor: '#BF5000', color: '#FDF9F3' }}>Delete Account</Button>
        </div>
      </Grid>
    </Container>
  );
}
