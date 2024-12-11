import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";

const Dropdowns = () => {
  const [selectedOption, setSelectedOption] = useState("Today");

  const handleSelect = (eventKey) => {
    setSelectedOption(eventKey);
  };

  return (
    <div className="rounded p-3 text-dark flex items-center justify-center gap-3 z-10">
      <Dropdown onSelect={handleSelect}>
        <Dropdown.Toggle variant="light" id="dropdown-basic"></Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item eventKey="Today">Today</Dropdown.Item>
          <Dropdown.Item eventKey="Week">Week</Dropdown.Item>
          <Dropdown.Item eventKey="Month">Month</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <p className="text-3xl">{selectedOption}</p>
    </div>
  );
};

export default Dropdowns;
