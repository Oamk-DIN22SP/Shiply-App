import React from 'react'

export default function Buttons({ children, onClick, disabled, className, type, iconName }) {
  return (
    <button
    type={type ? type : 'button'}
    onClick={onClick}
    disabled={disabled}
    className={className ? `btn-component ${className}` : 'btn-component'}
  >
    {children}
  </button>
  )
}
