import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom'; // Import useNavigate'

export default function Settings() {
  const navigate = useNavigate(); // Get navigate object from useNavigate
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleDelete = () => {
    // Open the confirmation dialog
    setDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    // Add logic here to delete the user's account
    // For now, let's just alert a message
    //alert('Account deleted successfully!');
    navigate('/');

    // Close the confirmation dialog
    setDialogOpen(false);
  };

  const handleCancelDelete = () => {
    // Close the confirmation dialog
    setDialogOpen(false);
  };

  return (
    <div className="details">
      <p className='heading' style={{ border: '1px solid #FFFAF6', padding: '10px', backgroundColor: '#FFFAF6', borderRadius: '10px 10px 0 0' }}>Track</p>
      <Grid style={{ backgroundColor: '#FFFAF6', padding: '10px', borderRadius: '5px', marginTop: '10px', height: '70vh' }}>
        <h5 className='send_parcel'>Time is limited!</h5>
        <p className='track_content'>Of course there are a lot of settings should be included. Yet, we have limited time and compulsory requirements to fulfill. Priorities :D</p>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
          <Button variant="contained" onClick={handleDelete} style={{ backgroundColor: '#60326A', color: '#FDF9F3' }}>Delete</Button>
        </div>

        {/* Confirmation Dialog */}
        <Dialog
          open={isDialogOpen}
          onClose={handleCancelDelete}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete your account? This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelDelete} color="primary">
              Cancel
            </Button>
            <Button onClick={handleConfirmDelete} style={{ backgroundColor: '#60326A', color: '#FDF9F3' }}>
              Confirm Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </div>
  );
}
