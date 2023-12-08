import { useState } from "react";
import Button from "./buttons"; // Adjust the import path as needed
import "./sort.css";

export default function Sort({ options, onSelect, className }) {
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setOpen(false);
    onSelect(option);
  };

  return (
    <div className={`dropdown-container ${className}`}>
      <Button onClick={() => setOpen(!open)} className="sort-btn">
        {selectedOption ? selectedOption.label : "Select an option " }
      </Button>
      {open && (
        <ul className="sort-order">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleOptionClick(option)}
              className="sort-list"
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}