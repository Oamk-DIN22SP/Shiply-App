import LeftPanel from "../left-panel";
import MidPanel from "../mid-panel";
import Navbar from "../navbar";
import "./receive.css";

export default function Receive() {
  return (
    <>
      <Navbar />
      <div className="receiver-container">
        <LeftPanel />
        <MidPanel />
        <div>
        <p className="notification_heading">Receive</p>
        <div className="sub-container">
          <h1 className="mian-heading">Received Packages!</h1>
          <p className="sub-heading">
            All notifications regarding receivements.
          </p>
          <div className="list-container">
            <ul className="list">
              <li className="list-item">Item 1</li>
              <li className="list-item">Item 2</li>
              <li className="list-item">Item 3</li>
              <li className="list-item">Item 4</li>
              <li className="list-item">Item 5</li>
              {/* Add more list items as needed */}
            </ul>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}

