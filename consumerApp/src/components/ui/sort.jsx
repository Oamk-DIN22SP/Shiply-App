import React, {useState} from 'react'

export default function Sort(options, onSelect) {
    const [open, setOpen] = useState(false)
    const [selectedOption, setSelectedOption] = useState(null)  
   
    const handleOptionClick = (option) => {
        setSelectedOption(option)
        setOpen(false)
        onSelect(option)
    }
  return (
    <div className={`dropdown-container ${className}`}>
      <button onClick={() => setOpen(!open)}>
        {selectedOption ? selectedOption.label : 'Select an option'}
      </button>
      {open && (
        <ul>
          {options.map((option) => (
            <li key={option.value} onClick={() => handleOptionClick(option)}>
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}