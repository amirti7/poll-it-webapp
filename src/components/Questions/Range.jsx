import { useState } from "react";
import React from "react";
import styled from "styled-components";

const Range = (props) => {
  const [questionName, setQuestionName] = useState("");
  return (
    <div>
      <h4>Question Type: Select value from Range</h4>
      <label>Please enter your question here:</label>
      <input
        type="text"
        value={questionName}
        onChange={(e) => setQuestionName(e.target.value)}
        placeholder="Please enter your question here:"
      />
      <br></br>
      <input type="text" placeholder="Enter Range Start here:" />
      <br></br>
      <input type="text" placeholder="Enter Range End here:" />
    </div>
  );
};

export default Range;
