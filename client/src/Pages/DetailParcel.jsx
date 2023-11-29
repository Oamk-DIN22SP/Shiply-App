import React from 'react'

export default function DetailParcel({parcelDetails}) {
  return (
    <div className='details'>
      <h3>Details of Percel</h3>
      <p>Sender Name: {parcelDetails[0]?.receiverName}</p>
    </div>
  )
}
