import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

export default function Sender() {
  const [formData, setFormData] = useState({
    senderName: '',
    emailAddress: '',
    address: '',
    phoneNumber: '',
    location: '',
  });


  const [step, setStep] = useState(1);
  const [isConfirmationDialogOpen, setConfirmationDialogOpen] = useState(false);

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleNextButtonClick = () => {
    setStep(step + 1);
  };

  const handlePrevButtonClick = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleChooseLocation = (chosenLocation) => {
    setFormData({ ...formData, location: chosenLocation });
  };
  const submithandleClick = () => {
    openConfirmationDialog();
    console.log(formData)
  }
  const openConfirmationDialog = () => {
    setConfirmationDialogOpen(true);
  };

  const closeConfirmationDialog = () => {
    setConfirmationDialogOpen(false);
  };
  const handleConfirmationSubmit = () => {
    closeConfirmationDialog();
    // Perform any additional actions on submit
    //alert('Your parcel has been sent successfully');
    console.log(formData);
  };
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <h5 className="set_heading">Sender Details</h5>
            <TextField
              label="Sender Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.senderName}
              onChange={handleChange('senderName')}
              style={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)' }}
            />
            <TextField
              label="Email Address"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.emailAddress}
              onChange={handleChange('emailAddress')}
              style={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)' }}
            />
            <TextField
              label="Address"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.address}
              onChange={handleChange('address')}
              style={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)' }}
            />
            <TextField
              label="Phone Number"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.phoneNumber}
              onChange={handleChange('phoneNumber')}
              style={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)' }}
            />
          </>
        );
      case 2:
        return (
          <>
            <h5 className="set_heading">Reciver Details</h5>
            <TextField
              label="Reciver Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.senderName}
              onChange={handleChange('senderName')}
              style={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)' }}
            />
            <TextField
              label="Email Address"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.emailAddress}
              onChange={handleChange('emailAddress')}
              style={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)' }}
            />
            <TextField
              label="Address"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.address}
              onChange={handleChange('address')}
              style={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)' }}
            />
            <TextField
              label="Phone Number"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.phoneNumber}
              onChange={handleChange('phoneNumber')}
              style={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)' }}
            />
          </>)
      case 3:
        // Additional fields for step 2
        return (
          <>
            <h5 className="set_heading">Package Details</h5>
            {/* Add additional fields for step 2 */}
            {/* Example: */}
            <TextField
              label="Width"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.width}
              onChange={handleChange('weight')}
              style={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)' }}
            />
            <TextField
              label="Height"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.height}
              onChange={handleChange('weight')}
              style={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)' }}
            />
            <TextField
              label="Mass"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.Mass}
              onChange={handleChange('weight')}
              style={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)' }}
            />
            <TextField
              label="Weight"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.weight}
              onChange={handleChange('weight')}
              style={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)' }}
            />
            {/* Add more fields as needed */}
          </>
        );
      case 4:
        // Additional fields for step 3
        return (
          <>
            <h5 className="set_heading">Drop off Location</h5>
            <List>
              {['Kangastie 8001C / Tuiron kakku 24, Marikkonta, Oulu / Finland',
                'Kangastie 8001C / Tuiron kakku 24, Marikkonta, Oulu / Finland',
                'Kangastie 8001C / Tuiron kakku 24, Marikkonta, Oulu / Finland',
                'Kangastie 8001C / Tuiron kakku 24, Marikkonta, Oulu / Finland',
                'Kangastie 8001C / Tuiron kakku 24, Marikkonta, Oulu / Finland'].map((location) => (
                  <ListItem key={location} className='sender_list'>
                    <ListItemText primary={location} style={{ margin: '10px' }} />
                    <Button
                      variant="outlined"
                      style={{ marginLeft: '10px' }}
                      onClick={() => handleChooseLocation(location)}
                    >
                      Choose
                    </Button>
                  </ListItem>
                ))}
            </List>
          </>
        );
      case 5:
        // Additional fields for step 4 (Final Confirmation)
        return (
          <>
           <h5 className="set_heading">Final Confirmation</h5>
            {/* Add content for final confirmation */}
            <p>Review your information before confirming.</p>
            <Card style={{ maxWidth: 600, lineHeight: '10px', fontSize: 'small', boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: '#fffdfb' }}>
              <CardContent>
                <div className='parcel_info_main'>
                  <p className='parcel_info'><b>Delivery number</b>: 12345678</p>
                  <p className='parcel_info'><b>PickUp point</b>: Location 5</p>
                  <p className='parcel_info'><b>Pickup address</b>:katu 502 A /102 Oulu Finland</p>
                  <p className='parcel_info'><b>Postal code</b>:1276</p>
                  <p className='parcel_info'><b>Consignee</b>: Thomas Edison</p>
                  <p className='parcel_info'><b>Cabinet number</b>12</p>
                  <p className='parcel_info'><b>Password</b>:2341</p>
                </div>
              </CardContent>
            </Card>
            <br>
            </br>
            <p style={{ textAlign: 'center', fontSize: '12px',fontWeight:'bolder' }}>By clicking the send button you will confirm our policy and start the process of your delivery.
              Beware, once confirmed delivery fee is non-refundable.</p>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
              <Button variant="contained" style={{ backgroundColor: '#872222', fontWeight:'bolder' }} onClick={submithandleClick}>
                Submit
              </Button>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="details">
      <p
        className="heading"
        style={{
          border: '1px solid #FFFAF6',
          padding: '10px',
          backgroundColor: '#FFFAF6',
          borderRadius: '10px 10px 0 0',
        }}
      >
        Send
      </p>
      {/* Grid with different background colors */}
      <Grid
        style={{
          backgroundColor: '#FFFAF6',
          padding: '10px',
          borderRadius: '5px',
          marginTop: '10px',
          height: '70vh',
        }}
      >
        {renderStepContent()}
        <br />
        <div>
          {step > 1 && (
            <Button variant="contained" style={{ float: 'left', backgroundColor: '#42820F' }} onClick={handlePrevButtonClick}>
              Previous
            </Button>
          )}
          {step < 5 && (
            <Button variant="contained" style={{ backgroundColor: '#42820F', color: '#FDF9F3', float: 'right' }} onClick={handleNextButtonClick}>
              Next
            </Button>
          )}
        </div>
      </Grid>

      <Dialog open={isConfirmationDialogOpen} onClose={closeConfirmationDialog}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <p>Your parcel is ready for send...</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeConfirmationDialog}>Cancel</Button>
          <Button onClick={handleConfirmationSubmit} variant="contained" style={{ backgroundColor: '#872222', fontWeight: 'bolder' }}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
