import React from 'react'


export default function Input({type, placeholder, value, name, onChange}) {
  return (
    <div className="input_wrapp">
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      name={name}
      onChange={onChange}
    />
  </div>
  )
}
