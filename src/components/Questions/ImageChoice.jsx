import { useState } from "react";
import React from "react";

const ImageChoice = (props) => {
  const [questionName, setQuestionName] = useState("");
  return (
    <div>
      <h4>Question Type: Side by side Images</h4>
      <label>Please enter your question here:</label>
      <input
        type="text"
        value={questionName}
        onChange={(e) => setQuestionName(e.target.value)}
        placeholder="Please enter your question here:"
      />
      <br></br>
      <input type="text" placeholder="Enter image url here:" />
      <br></br>
      <input type="text" placeholder="Enter image url here:" />
    </div>
  );
};

export default ImageChoice;
