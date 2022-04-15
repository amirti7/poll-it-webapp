import { Component, useState } from "react";
import NavigationBar from "../components/NavigationBar";
import StickyFooter from "../components/StickyFooter";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import MultipleChoiceQuestion from "../components/MultipleChoiceQuestion";
import ImageChoiceQuestion from "../components/ImageChoiceQuestion";
import RangeQuestion from "../components/RangeQuestion";
import TextField from "@mui/material/TextField";

const NewPoll = (props) => {
  const [pollName, setPollName] = useState("");
  const [questionToDisplay, setQuestionToDisplay] = useState("");

  function componentToDisplay() {
    switch (questionToDisplay) {
      case "multiple":
        return <MultipleChoiceQuestion />;
      case "image":
        return <ImageChoiceQuestion />;
      case "range":
        return <RangeQuestion />;
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
