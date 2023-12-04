import React from 'react'

export default function Dialog({ isOpen, onClose, children }) {
    if (!isOpen) {
        return null;
      }
    
      return (
        <div className="dialog-overlay">
          <div className="dialog-content">
            <button className="close-button" onClick={onClose}>
              &times;
            </button>
            {children}
          </div>
        </div>
      );
    };