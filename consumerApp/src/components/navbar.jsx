import { useState } from "react";
import shiply from "../assets/img/shiply-logo.png";
import box from "../assets/img/shiply-icon.png";
import "./navbar.css";
import LeftPanel from "./left-panel";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="navbar-container">
      <header>
        <img src={shiply} alt="shiply logo" className="shiply_logo" />
        <img src={box} alt="box icon" className="box_icon" />

        <div className="menu-button" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? (
            <div className="cross-icon">&times;</div>
          ) : (
            <>
              <div className={`bar ${isMobileMenuOpen ? "open" : ""}`}></div>
              <div className={`bar ${isMobileMenuOpen ? "open" : ""}`}></div>
              <div className={`bar ${isMobileMenuOpen ? "open" : ""}`}></div>
            </>
          )}
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="mobile-menu">
            {/* Add your mobile menu items here */}
            <LeftPanel />
          </div>
        )}
        <div className="notification-circle">1</div>
      </header>
    </div>
  );
}

export default Navbar;
