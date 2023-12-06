import './global.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Signup from './components/signup';
import Home from "./components/right-panel/home";
import Send from "./components/right-panel/send";
import Settings from "./components/right-panel/settings";
import Track from "./components/right-panel/track";




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/send" element={<Send />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/track" element={<Track />} />
      </Routes>
    </Router>
  );
}
export default App;
