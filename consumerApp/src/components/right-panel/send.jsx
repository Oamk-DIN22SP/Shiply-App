import './send.css';
import Input from '../ui/input';
import Button from '../ui/buttons';
import { useState } from 'react';
import LocationPopup from "../ui/location-popup"
import Navbar from '../navbar';
import LeftPanel from '../left-panel';
import MidPanel from '../mid-panel';

export default function Send() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrevious = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 1));
  };
     const handleChooseLocation = (location) => {
       // Simulate fetching location details (cabinet number, tracking number, etc.) based on the selected location
       // Replace this with your actual data fetching logic
       const fetchedDetails = {
         location,
         cabinet: "123",
         status: "Sender",
         tracking: "ABC123",
         pincode: "12345",
         // Add more details as needed
       };

       setSelectedLocation(fetchedDetails);
     };

  const renderForm = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="card">
            <h5 className="card-title">Consigner Details</h5>
            <Input
              type="text"
              placeholder="Sender Name"
              className="sender-input"
            />
            <Input
              type="text"
              placeholder="Sender Address"
              className="sender-input"
            />
            <Input
              type="number"
              placeholder="Phone Number"
              className="sender-input"
            />
          </div>
        );
      case 2:
        return (
          <div className="card">
            <h5 className="card-title">Receiver Details</h5>
            <Input
              type="text"
              placeholder="Receiver Name"
              className="sender-input"
            />
            <Input
              type="text"
              placeholder="Receiver Address"
              className="sender-input"
            />
            <Input
              type="number"
              placeholder="Receiver Phone Number"
              className="sender-input"
            />
          </div>
        );
      case 3:
        return (
          <div className="card">
            <h5 className="card-title">Package Details</h5>
            <Input
              type="number"
              placeholder="Package Type"
              className="sender-input"
            />
            <Input
              type="number"
              placeholder="Package Weight"
              className="sender-input"
            />
            <Input
              type="number"
              placeholder="Package Dimensions"
              className="sender-input"
            />
          </div>
        );
        case 4:
        return (
          <div className="card">
            <h5 className="card-title">Choose Location</h5>
            <div>
              <ul>
                <li className="location_list">
                  Location 1{" "}
                  <Button
                    className="location-btn"
                    onClick={() => handleChooseLocation("Location 1")}
                  >
                    Choose
                  </Button>
                </li>
                <li className="location_list">
                  Location 2{" "}
                  <Button
                    className="location-btn"
                    onClick={() => handleChooseLocation("Location 2")}
                  >
                    Choose
                  </Button>
                </li>
                <li className="location_list">
                  Location 3{" "}
                  <Button
                    className="location-btn"
                    onClick={() => handleChooseLocation("Location 3")}
                  >
                    Choose
                  </Button>
                </li>
                <li className="location_list">
                  Location 4{" "}
                  <Button
                    className="location-btn"
                    onClick={() => handleChooseLocation("Location 4")}
                  >
                    Choose
                  </Button>
                </li>
                <li className="location_list">
                  Location 5 <Button className="location-btn" onClick={() => handleChooseLocation("Location 5")}>Choose</Button>
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
    <>
      <Navbar />
      <div className="send-container">
        <LeftPanel />
        <MidPanel />
        <div>
        <p className="notification_heading">Send</p>
        <div className="sub-container">
          <h5 className="send_heading">To send a package</h5>
          <p className="text">
            Please fill out the required information completely
          </p>
          {selectedLocation && (
            <LocationPopup
              location={selectedLocation.location}
              cabinet={selectedLocation.cabinet}
              status={selectedLocation.status}
              tracking={selectedLocation.tracking}
              pincode={selectedLocation.pincode}
              onClose={() => setSelectedLocation(null)}
            />
          )}
          {renderForm()}
          <div className="button-container">
            {currentStep > 1 && (
              <Button className="btn-previous" onClick={handlePrevious}>
                Previous
              </Button>
            )}
            {currentStep < 4 && (
              <Button className="btn-next" onClick={handleNext}>
                Next
              </Button>
            )}
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
