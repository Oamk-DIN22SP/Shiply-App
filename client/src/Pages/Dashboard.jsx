import * as React from 'react';
import { Route, Routes,useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import MoveToInboxIcon from '@mui/icons-material/MoveToInbox';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import SettingsIcon from '@mui/icons-material/Settings';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import HomeIcon from '@mui/icons-material/Home';
import Home from './Home';
import Sender from './Sender';
import Receiver from './Receiver';
import Track from './Track';
import History from './History';
import Settings from './Settings';
import LoginForm from '../Components/LoginForm';
import logo from '../Images/img_shiplylogo1.png'
import smile from '../Images/smile.png'
import SignupForm from '../Components/SignupForm';
import RecivedParcel from '../Right_Side_Pannel/RecivedParcel';
import OtherParcel from '../Right_Side_Pannel/OtherParcel';
import SendParcel from '../Right_Side_Pannel/SendParcel';
import { useEffect } from 'react';
import { useState } from 'react';

const drawerWidth = 240;

function ResponsiveDrawer(props, userId) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
   const [parcels, setParcels] = useState([]);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

 useEffect(() => {
    // Function to fetch user parcels
    const fetchUserParcels = async () => {
      try {
        const response = await fetch(
          `https://shiply-server.onrender.com/api/parcels/getMyParcels/${userId}`
        );
        const data = await response.json();

        // Set the fetched parcels to the state
        setParcels(data.parcels);
      } catch (error) {
        console.error('Error fetching user parcels:', error);
      }
    };

    // Call the function to fetch user parcels when the component mounts
    fetchUserParcels();
  }, [userId]); 
  
  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
      <ListItem  disablePadding onClick={() => navigate("/home") }>
            <ListItemButton>
              <ListItemIcon>
               <HomeIcon/>
              </ListItemIcon>
              <ListItemText> Home </ListItemText>
            </ListItemButton>
          </ListItem>

          <ListItem  disablePadding onClick={() => navigate("/sender") }>
            <ListItemButton>
              <ListItemIcon>
               <SendIcon/>
              </ListItemIcon>
              <ListItemText> Sender </ListItemText>
            </ListItemButton>
          </ListItem>

          <ListItem  disablePadding onClick={() => navigate("/receiver") }>
            <ListItemButton>
              <ListItemIcon>
               <MoveToInboxIcon/>
              </ListItemIcon>
              <ListItemText> Receiver </ListItemText>
            </ListItemButton>
          </ListItem>

          <ListItem  disablePadding onClick={() => navigate("/track") }>
            <ListItemButton>
              <ListItemIcon>
               <GpsFixedIcon/>
              </ListItemIcon>
              <ListItemText> Track </ListItemText>
            </ListItemButton>
          </ListItem>

          <ListItem  disablePadding onClick={() => navigate("/history") }>
            <ListItemButton>
              <ListItemIcon>
               <ManageHistoryIcon/>
              </ListItemIcon>
              <ListItemText> History </ListItemText>
            </ListItemButton>
          </ListItem>

          <ListItem  disablePadding onClick={() => navigate("/settings") }>
            <ListItemButton>
              <ListItemIcon>
               <SettingsIcon/>
              </ListItemIcon>
              <ListItemText> Settings </ListItemText>
            </ListItemButton>
          </ListItem>
      </List>
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex',backgroundColor: '#f0f0f0', height: '100vh', width: '100vw' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)`},
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: '#fffdfb'
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <img
          src={logo}
          alt="Logo"
          style={{ width: '250px', height: 'auto' }}
        />
<img 
  src={smile}
  alt="Logo"
  style={{ width: '50px', height: 'auto', marginLeft: 'auto', borderRadius: '50px', border: '5px solid orange', cursor:'pointer' }}
/>  

          
        
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"

      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor:'#fffdfb' },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/signupForm" element={<SignupForm />} />
        <Route path="/home" element={<Home />} />
        <Route path="/sender" element={<Sender />} />
        <Route path="/receiver" element={<Receiver />} />
        <Route path="/track" element={<Track />} />
        <Route path="/history" element={<History />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/recivedparecl" element={<RecivedParcel />} />
        <Route path="/sendparcel" element={<SendParcel />} />
        <Route path="/otherparcel" element={<OtherParcel/>} />
        
        </Routes>
      
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;