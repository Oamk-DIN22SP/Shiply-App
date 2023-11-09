import {Route, Routes } from 'react-router-dom'
import Home from '../../Pages/Home/Home'
import Sender from '../../Pages/Sender/Sender'
import Receiver from '../../Pages/Receiver'
import Track from '../../Pages/Track'
import History from '../../Pages/History'
import Settings from '../../Pages/Settings'


export default function index() {
  return (
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/sender' element={<Sender/>}/>
        <Route path='/receiver' element={<Receiver/>}/>
        <Route path='/track' element={<Track/>}/>
        <Route path='/history' element={<History/>}/>
        <Route path='/setting' element={<Settings/>}/>
      </Routes>
  )
}
