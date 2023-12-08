import './global.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Signup from './components/signup';
import Home from "./components/right-panel/home";
import Send from "./components/right-panel/send";
import Settings from "./components/right-panel/settings";
import Track from "./components/right-panel/track";
import Receive from './components/right-panel/receive';
import History from './components/right-panel/history';




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
        <Route path="/history" element={<History />} />
        <Route path="/receive" element={<Receive />} />
      </Routes>
    </Router>
  );
}
export default App;
