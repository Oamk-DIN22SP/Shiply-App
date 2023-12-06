import React from 'react'
import Navbar from '../navbar.jsx'
import LeftPanel from '../left-panel.jsx'
import MidPanel from '../mid-panel.jsx'
import RightPanel from './right-panel.jsx'

export default function Home() {
  return (
    <div>
      <Navbar/>
    <div className='home_div'>
     <LeftPanel className="left-panel"/>
     <MidPanel className="mid-panel"/>
     <RightPanel className="right-panel"/>
    </div>
    </div>
  )
}
