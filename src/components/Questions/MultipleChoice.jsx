import React, { useState } from "react";

import TextField from "@mui/material/TextField";

const MultipleChoice = (props) => {
  const [questionName, setQuestionName] = useState("");
  const [answers, setAnswers] = useState([""]);
  const [answersCounter, setAnswersCounter] = useState("");
  function setCreateAnswersInput(val) {
    setAnswersCounter(val);
  }
  function addAnswerInput() {
    var div = "";
    for (var i = 0; i < parseInt(answersCounter); i++) {
      div += "<AnswerInput />";
    }
    return div;
  }
  return (
    <div>
      <h4>Question Type: Multiple Choice Question</h4>
      <label>Please enter your question here:</label>
      <TextField
        variant="filled"
        value={questionName}
        onChange={(e) => setQuestionName(e.target.value)}
        label="Question"
      />
      <br />
      <TextField
        variant="filled"
        type="number"
        helperText="Number of Answers"
        onChange={(e) => setAnswersCounter(e.target.value)}
      />

      {[
        ...Array(answersCounter).map((i) => {
          <input key={i}></input>;
        }),
      ]}
    </div>
  );
};

export default MultipleChoice;
