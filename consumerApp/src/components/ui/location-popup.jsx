// LocationPopup.js
import Button from "./buttons";
const LocationPopup = ({ location, onClose, cabinet, tracking, pincode, status}) => {
  return (
    <div className="location-popup">
      <h3>Location Details</h3>
      <p>
        <b>Selected Location: {location}</b>
      </p>
      <p>
        <b>Cabinet Number: {cabinet}</b>
      </p>
     <p><b>Tracking Number: {tracking}</b>
        </p>
      <p>
         <b>pincode: {pincode}</b>
         </p>
      <p><b>Status: {status}</b>
        </p>            
      {/* Add other details like cabinet number, status, tracking number, etc. */}
      <Button className="popup-btn" onClick={onClose}>
        Close
      </Button>
    </div>
  );
};

export default LocationPopup;
