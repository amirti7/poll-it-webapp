import React, { useState } from "react";

import TextField from "@mui/material/TextField";

const MultipleChoice = (props) => {
  const [questions, setQuestions] = useState({
    questionName: "",
    answers: ["", ""],
  });
  const [enteredQuestionName, setEnteredQuestionName] = useState("");

  const handleEnteredAnswers = (e, index) => {
    if (
      e.target.value === "" ||
      (questions.answers[index] === e.target.value &&
        questions.answers[questions.answers.length] === "")
    )
      return;
    if (index === 0) {
      setQuestions((prevState) => {
        let updatedAnswers = [...prevState.answers];
        updatedAnswers.splice(index, 1, e.target.value);
        return {
          questionName: prevState.questionName,
          answers: updatedAnswers,
        };
      });
      return;
    }
    setQuestions((prevState) => {
      let updatedAnswers = [...prevState.answers];
      updatedAnswers.splice(index, 1, e.target.value, "");
      return {
        questionName: prevState.questionName,
        answers: updatedAnswers,
      };
    });
    return;
  };

  const handleRemoveAnswer = (index) => {
    if (index < 2) return;
    setQuestions((prevState) => {
      let updatedAnswers = [...prevState.answers];
      updatedAnswers.splice(index, 1);
      return {
        questionName: prevState.questionName,
        answers: updatedAnswers,
      };
    });
  };

  const handleQuestionName = (e) => {
    setEnteredQuestionName(e.target.value);
    setQuestions((prevState) => {
      return {
        questionName: e.target.value,
        answers: [...prevState.answers],
      };
    });
  };

  return (
    <div>
      <div>
        <h4>Question Type: Multiple Choice Question</h4>
        <label>Please enter your question here:</label>
        <TextField
          variant="filled"
          value={enteredQuestionName}
          onChange={(e) => handleQuestionName(e)}
          label="Question"
        />
        <br />
      </div>
      {questions.answers.map((answer, index) => {
        return (
          <div>
            <TextField
              variant="filled"
              label="Answer"
              onBlur={(e) => handleEnteredAnswers(e, index)}
            />
            <input
              type="button"
              value="Remove"
              onClick={() => handleRemoveAnswer(index)}
            />
          </div>
        );
      })}
      <br />
    </div>
  );
};

export default MultipleChoice;
