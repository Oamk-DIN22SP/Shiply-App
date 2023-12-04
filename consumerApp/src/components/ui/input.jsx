import React from 'react'


export default function Input({type, placeholder, value, name, onChange, style, className}) {
  return (
    <div className="input_wrapp" style={style}>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      name={name}
      onChange={onChange}
     className={className}
    />
  </div>
  )
}
