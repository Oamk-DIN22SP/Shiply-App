// Settings.js
import  { useState } from "react";
import Button from "../ui/buttons";
import "./settings.css";
import Dialog from "../ui/dialog";
import Navbar from "../navbar";
import LeftPanel from "../left-panel";
import MidPanel from "../mid-panel";

export default function Settings() {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = () => {
    setIsOpen(true);
  };

  const handleConfirmDelete = () => {
    // Handle the actual delete logic here
    console.log("Account deleted!");

    // Close the dialog after handling the delete logic
    setIsOpen(false);
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
  };

  return (
    <>
    <Navbar />
    <div className="setting-container">
      <LeftPanel />
      <MidPanel />
      <div>
      <p className="notification_heading">Settings</p>
      <div className="sub-container">
        <h1 className="mian-heading">Time is limited!</h1>
        <p className="sub-heading">
          Of course there are a lot of settings that should be included. Yet, we
          have limited time and compulsory requirements to fulfill. Priorities
          :D
        </p>
        <Button className="track-btn" onClick={handleDelete}>
          Delete
        </Button>

        {/* Reusable Dialog Component */}
        <Dialog
          isOpen={isOpen}
          title="Confirm Delete"
          message="Are you sure you want to delete your account?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCloseDialog}
        />
      </div>
    </div>
    </div>
    
    </>
  );
}
