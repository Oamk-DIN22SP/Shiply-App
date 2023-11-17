import React, { useState } from 'react';

const History = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const items = [
    { id: 1, name: 'Item 1', details: 'Details of Item 1' },
    { id: 2, name: 'Item 2', details: 'Details of Item 2' },
    { id: 3, name: 'Item 3', details: 'Details of Item 3' },
    // Add more items as needed
  ];

  const handleItemClick = (itemId) => {
    const selected = items.find(item => item.id === itemId);
    setSelectedItem(selected);
  };

  return (
    <div>
      <div style={{ float: 'left', width: '50%' }}>
        <h2>Left Panel</h2>
        <ul>
          {items.map(item => (
            <li key={item.id} onClick={() => handleItemClick(item.id)}>
              {item.name}
            </li>
          ))}
        </ul>
      </div>
      <div style={{ float: 'left', width: '50%' }}>
        <h2>Right Panel</h2>
        {selectedItem ? (
          <div>
            <h3>{selectedItem.name}</h3>
            <p>{selectedItem.details}</p>
          </div>
        ) : (
          <p>Please select an item from the left panel</p>
        )}
      </div>
    </div>
  );
};

export default History;


