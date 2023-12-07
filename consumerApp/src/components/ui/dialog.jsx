import './dialog.css';
import PropTypes from "prop-types";
import Button from "./buttons";
const Dialog = ({ isOpen, title, message, onConfirm, onCancel }) => {
  return (
    <div className={`dialog ${isOpen ? "open" : "closed"}`}>
      <div className="dialog-content">
        <h2>{title}</h2>
        <p>{message}</p>
        <div className="dialog-buttons">
          <Button onClick={onCancel} className='cancel-btn'>Cancel</Button>
          <Button onClick={onConfirm} className='confirm-btn'>Confirm</Button>
        </div>
      </div>
    </div>
  );
};

Dialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default Dialog;
