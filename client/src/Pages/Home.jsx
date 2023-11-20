import React from 'react'
import Notification from '../Components/Notification'
import Details from '../Components/Details'


export default function Home() {
  const [data, setData] = React.useState(null)
  const handleNotificationItemClick = (item) => {
    setTrack(false)
    setData(item)
  }
  
  const handleTrackStatus = (status) => {
    setTrack(status)
  }

  return (
    <div className='home_page'>
      <Notification onNotificationItemClick={handleNotificationItemClick} />
      
      {
        track? 
        <div className="track">This is track form component</div> 
        : 
        <Details selectedItem={data} handleTrackClick={handleTrackStatus}/>
      }
      
    </div>
  )
}

//declare local state that will track the selected item