import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';

export default function Settings() {
  const navigate = useNavigate();
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);

  const handleDeleteAccount = () => {
    setConfirmationModalOpen(true);
    // Additional logic for handling account deletion
  };

  const handleConfirmationClose = () => {
    setConfirmationModalOpen(false);
  };

  const handleConfirmabtn = () => {
    navigate("/");
  }

  return (
    <div className="details">
      <p className='heading' style={{ border: '1px solid #FFFAF6', padding: '10px', backgroundColor: '#FFFAF6', borderRadius: '10px 10px 0 0' }}>Track</p>
      <Grid style={{ backgroundColor: '#FFFAF6', padding: '10px', borderRadius: '5px', marginTop: '10px', height: '70vh' }}>
        <h3 className='send_parcel'>Time is Limited!</h3>
        <p className='track_content'>Of course there are a lot of settings should be included. Yet, we have limited time and compulsory requirements to fulfill. Priorities :D</p>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
          <Button variant="contained" style={{ backgroundColor: '#60326A', color: '#FDF9F3' }} onClick={handleDeleteAccount}>
            Delete Account
          </Button>
        </div>
      </Grid>

      {/* Confirmation Modal */}
      <Modal open={isConfirmationModalOpen} onClose={handleConfirmationClose}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#FFF', padding: '20px', borderRadius: '8px' }}>
          <h2>Confirmation</h2>
          <p>Are you sure you want to delete your account?</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
            <Button variant="contained" onClick={handleConfirmationClose}>Cancel</Button>
            <Button variant="contained" style={{ backgroundColor: '#60326A', color: '#FDF9F3' }}
            onClick={handleConfirmabtn}>
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
