import React, { useState } from 'react';
import './send.css';
import Input from '../ui/input';
import Button from '../ui/buttons';

export default function Send() {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrevious = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  const renderForm = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className='card'>
            <h5 className='card-title'>Consigner Details</h5>
            <Input type='text' placeholder='Sender Name' />
            <Input type='text' placeholder='Sender Address' />
            <Input type='number' placeholder='Phone Number' />
          </div>
        );
      case 2:
        return (
          <div className='card'>
            <h5 className='card-title'>Receiver Details</h5>
            <Input type='text' placeholder='Receiver Name' />
            <Input type='text' placeholder='Receiver Address' />
            <Input type='number' placeholder='Receiver Phone Number' />
          </div>
        );
      case 3:
        return (
          <div className='card'>
            <h5 className='card-title'>Package Details</h5>
            <Input type='text' placeholder='Package Type' />
            <Input type='text' placeholder='Package Weight' />
            <Input type='text' placeholder='Package Dimensions' />
          </div>
        );
        case 4:
        return (
          <div className='card'>
            <h5 className='card-title'>Choose Location</h5>
            <div>
            <ul>
                <li className='location_list'>
                 <p>1</p> Location 1 <Button className='location-btn'>Choose</Button>
                </li>
                <li className='location_list'>
                 <p>2</p> Location 2 <Button className='location-btn'>Choose</Button>
                </li>
                <li className='location_list'>
                  Location 3 <Button className='location-btn'>Choose</Button>
                </li>
                <li className='location_list'>
                  Location 4 <Button className='location-btn'>Choose</Button>
                </li>
                <li className='location_list'>
                  Location 5 <Button className='location-btn'>Choose</Button>
                </li>
              </ul>
            </div>
          </div>
        );

      
      default:
        return null;
    }
  };

  return (
    <div className='main-container'>
      <p className='notification_heading'>Send</p>
      <div className='sub-container'>
        <h5 className='send_heading'>To send a package</h5>
        <p className='text'>Please fill out the required information completely</p>
        {renderForm()}
        <div className='button-container'>
          {currentStep > 1 && <Button className='btn-previous' onClick={handlePrevious}>Previous</Button>}
          {currentStep < 4 && <Button className='btn-next' onClick={handleNext}>Next</Button>}
        </div>
      </div>
    </div>
  );
}
