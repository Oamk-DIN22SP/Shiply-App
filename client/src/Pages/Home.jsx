import React from 'react';
import Notification from '../Components/Notification';
import Details from '../Components/Details';
import Track from './Track';


export default function Home() {
  const [data, setData] = React.useState(null);
  const [track, setTrack] = React.useState(null);
 
  const handleNotificationItemClick = (item) => {
    setData(item);
  };
  const handleTrackStatus = (status) => {
    setTrack(status);
  };
 
  return (
    <div className='home_page'>
      <Notification onNotificationItemClick={handleNotificationItemClick} />

      {track ? (
        <Track />
      ) : (
        <Details selectedItem={data} handleTrackClick={handleTrackStatus} />
      )}
     

    </div>
  );
}
