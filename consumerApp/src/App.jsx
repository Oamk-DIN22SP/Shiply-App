import LeftPanel from "./components/left-panel";
import MidPanel from "./components/mid-panel";
import Navbar from "./components/navbar";
import RightPanel from "./components/right-panel/right-panel";

function App() {
  return (
    <div>
      <Navbar />
      <LeftPanel />
      <RightPanel />
      <MidPanel />
    </div>
  );
}

export default App;
