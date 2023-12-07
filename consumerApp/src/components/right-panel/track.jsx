import './track.css'
import Input from '../ui/input';
import Button from '../ui/buttons';
export default function Track() {
  return (
    <div className="main-container">
      <p className="notification_heading">Settings</p>
      <div className="sub-container">
        <h1 className="mian-heading">Time is limited!</h1>
        <p className="sub-heading">
          Your 10 digit delivery number is enough to know status of your
          delivery.
        </p>
        <div className="track-input-container">
          <Input placeholder="Enter Tracking Id" className="track_input" />
          <Button className="track-btn">Track</Button>
        </div>
      </div>
    </div>
  );
}
