import * as React from "react";
import {
  Link,
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
  useNavigate,
} from "react-router-dom";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import MuiDrawer from '@mui/material/Drawer';
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import MoveToInboxIcon from "@mui/icons-material/MoveToInbox";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import SettingsIcon from "@mui/icons-material/Settings";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import HomeIcon from "@mui/icons-material/Home";
import LaptopIcon from "@mui/icons-material/Laptop";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

import Home from "./Home";
import Sender from "./Sender";
import Receiver from "./Receiver";
import Track from "./Track";
import History from "./History";
import Settings from "./Settings";
import LoginForm from "./LoginPage";
import logo from "../Images/img_shiplylogo1.png";
import smile from "../Images/smile.png";
import SignupForm from "./SignupPage";
import RecivedParcel from "../Right_Side_Pannel/RecivedParcel";
import OtherParcel from "../Right_Side_Pannel/OtherParcel";
import SendParcel from "../Right_Side_Pannel/SendParcel";
import { useEffect } from "react";
import { useState } from "react";
import BACKEND_HOSTNAME from "../config/backend.config";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, authenticateUser } from "../config/firebase.config";
import DetailParcelPage from "./DetailParcelPage";
import styled from "@emotion/styled";
const drawerWidth = {
  xs: 200,
  sm: 240,
  md: 280,
  lg: 320,
  xl: 360,
};

function ResponsiveDrawer(props, userId) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [parcels, setParcels] = useState([]);
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const [activeSection, setActiveSection] = useState("/home"); // Default active section
  authenticateUser();
  useEffect(() => {
    // Ensure the user is authenticated before making the request

    // Function to fetch user parcels
    const fetchUserParcels = async () => {
      try {
        const response = await fetch(
          `${BACKEND_HOSTNAME}/api/parcels/getMyParcels/${user?.uid}`
        );
        const data = await response.json();

        // Set the fetched parcels to the state
        setParcels(data.parcels);
      } catch (error) {
        console.error("Error fetching user parcels:", error);
      }
    };

    // Call the function to fetch user parcels when the component mounts
    fetchUserParcels();
  }, [userId]);

  //  const handleDrawerToggle = () => {
  //    setMobileOpen(!mobileOpen);
  //  };

  const handleSectionClick = (section) => {
    navigate(section);
    setActiveSection(section);
  };
  const drawer = (
    <div style={{ overflow: "hidden" }}>
      <img
        src={logo}
        alt="Logo"
        style={{
          width: "240px",
          backgroundColor: "#FFFAF6",
          height: "4em",
          objectFit: "contain",
        }}
      />

      <List>
        <ListItem
          disablePadding
          onClick={() => handleSectionClick("/home")}
          sx={{
            backgroundColor: activeSection === "/home" ? "#fecaa4" : "inherit",
          }}
        >
          <ListItemButton>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText> Home </ListItemText>
          </ListItemButton>
        </ListItem>

        <ListItem
          disablePadding
          onClick={() => handleSectionClick("/sender")}
          sx={{
            backgroundColor:
              activeSection === "/sender" ? "#fecaa4" : "inherit",
          }}
        >
          <ListItemButton>
            <ListItemIcon>
              <SendIcon />
            </ListItemIcon>
            <ListItemText> Send parcels </ListItemText>
          </ListItemButton>
        </ListItem>

        <ListItem
          disablePadding
          onClick={() => handleSectionClick("/receiver")}
          sx={{
            backgroundColor:
              activeSection === "/receiver" ? "#fecaa4" : "inherit",
          }}
        >
          <ListItemButton>
            <ListItemIcon>
              <MoveToInboxIcon />
            </ListItemIcon>
            <ListItemText> Incoming parcels </ListItemText>
          </ListItemButton>
        </ListItem>

        <ListItem
          disablePadding
          onClick={() => handleSectionClick("/track")}
          sx={{
            backgroundColor: activeSection === "/track" ? "#fecaa4" : "inherit",
          }}
        >
          <ListItemButton>
            <ListItemIcon>
              <GpsFixedIcon />
            </ListItemIcon>
            <ListItemText> Track my parcel </ListItemText>
          </ListItemButton>
        </ListItem>

        <ListItem
          disablePadding
          onClick={() => handleSectionClick("/history")}
          sx={{
            backgroundColor:
              activeSection === "/history" ? "#fecaa4" : "inherit",
          }}
        >
          <ListItemButton>
            <ListItemIcon>
              <ManageHistoryIcon />
            </ListItemIcon>
            <ListItemText> History </ListItemText>
          </ListItemButton>
        </ListItem>

        <ListItem
          disablePadding
          onClick={() => handleSectionClick("/settings")}
          sx={{
            backgroundColor:
              activeSection === "/settings" ? "#fecaa4" : "inherit",
          }}
        >
          <ListItemButton>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText> Settings </ListItemText>
          </ListItemButton>
        </ListItem>

        <ListItem
          disablePadding
          sx={{
            backgroundColor: activeSection === "/" ? "#grey" : "inherit",
          }}
        >
          <ListItemButton>
            <ListItemIcon>
              <LaptopIcon />
            </ListItemIcon>
            <ListItemText>
              <Link
                to="https://shiply-touchscreen.vercel.app/"
                className="tags"
                style={{ color: "rgba(0, 0, 0, 0.87)" }}
                target="_blank"
              >
                {" "}
                Touchscreen
              </Link>
            </ListItemText>
            <Link
              to="https://shiply-touchscreen.vercel.app/"
              style={{ color: "#fecaa4" }}
              target="_blank"
            >
              <ExitToAppIcon fontSize="small" />
            </Link>
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
   <Box
  component="main"
  sx={{
    flexGrow: 1,
    p: 3,
    width: { xs: "100%", sm: `calc(100% - ${drawerWidth.sm}px)` },
  }}
>
      <CssBaseline />
     <AppBar
  position="fixed"
  sx={{
    width: { sm: `calc(100% - ${drawerWidth.sm}px)`, xs: "100%" },
    ml: { sm: `${drawerWidth.sm}px` },
    backgroundColor: "#FFFAF6",
  }}
>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <img
            src={smile}
            alt="Logo"
            style={{
              width: "50px",
              height: "auto",
              marginLeft: "auto",
              borderRadius: "50px",
              border: "5px solid orange",
              cursor: "pointer",
            }}
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
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#fffdfb",
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
       
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
