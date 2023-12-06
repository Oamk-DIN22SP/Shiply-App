import React from 'react';
import shiply from '../assets/img/shiply-logo.png';
import box from '../assets/img/shiply-icon.png';
import './navbar.css';

function Navbar() {
  return (
    <div className='contianer'>
    <header>
        <img src={shiply} alt='shiply logo' className='shiply_logo'/>
        <img src={box} alt='box icon' className='box_icon' />
    </header>
    </div>
  );
}

export default Navbar;
