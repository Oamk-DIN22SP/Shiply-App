import LeftPanel from "./components/left-panel";
import MidPanel from "./components/mid-panel";
import Navbar from "./components/navbar";
import RightPanel from "./components/right-panel/right-panel";
import './global.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Signup from './components/signup';
import Home from "./components/right-panel/home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}
export default App;
