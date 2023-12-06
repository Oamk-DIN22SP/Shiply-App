import React from 'react';
import './left-panel.css';
import Button from './ui/buttons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPaperPlane, faInbox, faSearch, faCog } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

export default function LeftPanel() {
  const navigate = useNavigate();

  return (
    <div className='menu_container'>
      <Button className='menu-btn' onClick={() => navigate('/home')}>
        <FontAwesomeIcon icon={faHome} /> Home
      </Button>
      <Button className='menu-btn' onClick={() => navigate('/send')}>
        <FontAwesomeIcon icon={faPaperPlane} /> Send
      </Button>
      <Button className='menu-btn' onClick={() => navigate('/receive')}>
        <FontAwesomeIcon icon={faInbox} /> Receive
      </Button>
      <Button className='menu-btn' onClick={() => navigate('/track')}>
        <FontAwesomeIcon icon={faSearch} /> Track
      </Button>
      <Button className='menu-btn' onClick={() => navigate('/settings')}>
        <FontAwesomeIcon icon={faCog} /> Setting
      </Button>
    </div>
  );
}
