
import "./mid-panel.css";
function MidPanel() {

  return (
    <div className='custom-container'>
       <p className="notification_heading">Latest Notification</p> 
       <div className="list-container">
        <ul className="list">
          <li className="list-item">Item 1</li>
          <li className="list-item">Item 2</li>
          <li className="list-item">Item 3</li>
          {/* Add more list items as needed */}
        </ul>
      </div>
    </div>
  );
}
export default MidPanel;

