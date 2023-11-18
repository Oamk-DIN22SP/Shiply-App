import React from 'react'
import Notification from '../Components/Notification'
import Details from '../Components/Details'


export default function Home() {
  const [data, setData] = React.useState(null)
  const handleNotificationItemClick = (item) => {
    setData(item)
  }

  return (
    <div className='home_page'>
      <Notification onNotificationItemClick={handleNotificationItemClick} />
      <Details selectedItem={data}/>
    </div>
  )
}

//declare local state that will track the selected item