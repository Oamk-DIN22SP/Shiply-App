import Sort from "./ui/sort";
import "./mid-panel.css";

function MidPanel() {
   const sortOptions = [  // Add more options as needed
    { value: "latest", label: "Latest" },
    { value: "oldest", label: "Oldest" }, 
  ];
   const handleSortSelect = (selectedOption) => {
     // Handle sorting logic based on the selected option
     console.log("Sorting by:", selectedOption.value);
   };

  return (
    <div className="custom-container">
      <p className="notification_heading">Latest Notification</p>
    
      <div className="list-container">
        <Sort
          options={sortOptions}
          onSelect={handleSortSelect}
          className="sort"
        />
        <ul className="list">
          <li className="list-item">Item 1</li>
          <li className="list-item">Item 2</li>
          <li className="list-item">Item 3</li>
          {/* Add more list items as needed */}
        </ul>
      </div>
    </div>
  );
}
export default MidPanel;

