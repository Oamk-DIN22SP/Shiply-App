// ChooseLocationPage.jsx
import React, { useState } from "react";
import { Button, List, ListItem, ListItemText } from "@mui/material";

const ChooseLocationPage = ({ locations, onSelectLocation, onNext }) => {
  return (
    <div>
      <h5>Choose Drop Off Location</h5>
      <List>
        {locations.map((location) => (
          <ListItem
            key={location.id}
            style={{
              backgroundColor: location.selected ? "#grey" : "inherit",
              margin: "2px",
            }}
          >
            <ListItemText
              primary={location.title}
              secondary={location.address}
              style={{ fontSize: "small" }}
            />
            <Button
              variant="outlined"
              style={{
                marginLeft: "10px",
                backgroundColor: "#ADADAD",
                color: "black",
                fontSize: "9px",
                padding: "5px",
                border: "none",
              }}
              onClick={() => onSelectLocation(location.id)}
            >
              Choose
            </Button>
          </ListItem>
        ))}
      </List>
      <Button variant="contained" onClick={onNext}>
        Next
      </Button>
    </div>
  );
};

export default ChooseLocationPage;
