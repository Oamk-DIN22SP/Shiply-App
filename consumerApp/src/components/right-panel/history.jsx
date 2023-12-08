import Sort from "../ui/sort";
import "./history.css";
import LeftPanel from "../left-panel";
import MidPanel from "../mid-panel";
import Navbar from "../navbar";

export default function History() {
  const sortOptions = [  // Add more options as needed
    { value: "latest", label: "Latest" },
    { value: "oldest", label: "Oldest" }, 
  ];
  const handleSortSelect = (selectedOption) => {
    // Handle sorting logic based on the selected option
    console.log("Sorting by:", selectedOption.value);
  };
  return (
    <>
    <Navbar />
    <div className="history-container">
      <LeftPanel />
      <MidPanel />
      <div>
      <p className="notification_heading">Histroy</p>
      <div className="list-container">
        <h5 className="history-heading">All Action Here</h5>
        <p className="sub-para">All passed and processing deliveries here!</p>
        <Sort
          options={sortOptions}
          onSelect={handleSortSelect}
          className="sort"
        />
        <ul className="list">
          <li className="list-item">Item 1</li>
          <li className="list-item">Item 2</li>
          <li className="list-item">Item 3</li>
          <li className="list-item">Item 2</li>
          <li className="list-item">Item 3</li>
        </ul>
      </div>
    </div>
    </div>
    </>
  );
}
