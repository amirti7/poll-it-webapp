import { Component, useState } from "react";
import NavigationBar from "../components/NavigationBar";
import StickyFooter from "../components/StickyFooter";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import MultipleChoice from "../components/Questions/MultipleChoice";
import ImageChoice from "../components/Questions/ImageChoice";
import Range from "../components/Questions/Range";
import TextField from "@mui/material/TextField";

const NewPoll = (props) => {
  const [pollName, setPollName] = useState("");
  const [questionToDisplay, setQuestionToDisplay] = useState("");

  function componentToDisplay() {
    switch (questionToDisplay) {
      case "multiple":
        return <MultipleChoice />;
      case "image":
        return <ImageChoice />;
      case "range":
        return <Range />;
      default:
        return;
    }
  }
  return (
    <div>
      <NavigationBar />
      <div>
        <h4>Poll Name:</h4>
        <TextField
          variant="filled"
          value={pollName}
          onChange={(e) => setPollName(e.target.value)}
          label="Poll Name:"
        />
      </div>
      <div style={{ marginTop: "10px" }}>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Question Type:
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setQuestionToDisplay("multiple")}>
              Multiple answers-one choice
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setQuestionToDisplay("image")}>
              Side by side images
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setQuestionToDisplay("range")}>
              Select a value from Range
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        {componentToDisplay()}
        <button>Submit Question</button>
      </div>

      <StickyFooter />
    </div>
  );
};

export default NewPoll;
