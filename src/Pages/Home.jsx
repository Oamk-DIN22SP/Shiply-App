import React from 'react'
import Notification from '../Components/Notification'
import Details from '../Components/Details'



export default function Home() {
  const [selectedNotification, setSelectedNotification] = React.useState([]);
  
  return (
    <div className='home_page'>
      <Notification/>
      <Details/>
    </div>
  )
}
