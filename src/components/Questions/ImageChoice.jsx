import { useState } from "react";
import React from "react";
import TextField from "@mui/material/TextField";

const ImageChoice = (props) => {
  const [question, setQuestion] = useState({
    questionName: "",
    questionPic: "",
    answers: ["", ""],
    type: "Image Question",
  });
  const [enteredQuestionName, setEnteredQuestionName] = useState("");
  const [enteredQuestionPic, setEnteredQuestionPic] = useState("");

  const handleEnteredAnswers = (e, index) => {
    if (
      question.answers[index] !== "" &&
      question.answers[index] !== e.target.value &&
      question.answers[question.answers.length - 1] === ""
    ) {
      setQuestion((prevState) => {
        let updatedAnswers = [...prevState.answers];
        updatedAnswers.splice(index, 1, e.target.value);
        return {
          questionName: prevState.questionName,
          questionPic: prevState.questionPic,
          answers: updatedAnswers,
          type: prevState.type,
        };
      });
      return;
    }
    if (e.target.value === "") return;
    if (question.answers[index] === e.target.value) return;

    if (index === 0) {
      setQuestion((prevState) => {
        let updatedAnswers = [...prevState.answers];
        updatedAnswers.splice(index, 1, e.target.value);
        return {
          questionName: prevState.questionName,
          questionPic: prevState.questionPic,
          answers: updatedAnswers,
          type: prevState.type,
        };
      });
      return;
    }

    setQuestion((prevState) => {
      let updatedAnswers = [...prevState.answers];
      updatedAnswers.splice(index, 1, e.target.value, "");
      return {
        questionName: prevState.questionName,
        questionPic: prevState.questionPic,
        answers: updatedAnswers,
        type: prevState.type,
      };
    });
    return;
  };

  const handleRemoveAnswer = (index) => {
    if (index < 2) return;
    setQuestion((prevState) => {
      let updatedAnswers = [...prevState.answers];
      updatedAnswers.splice(index, 1);
      return {
        questionName: prevState.questionName,
        questionPic: prevState.questionPic,
        answers: updatedAnswers,
        type: prevState.type,
      };
    });
  };

  const handleQuestionName = (e) => {
    setEnteredQuestionName(e.target.value);
    setQuestion((prevState) => {
      return {
        questionName: e.target.value,
        answers: [...prevState.answers],
        type: prevState.type,
      };
    });
  };

  const handleQuestionPic = (e) => {
    setEnteredQuestionPic(e.target.value);
    setQuestion((prevState) => {
      return {
        questionName: prevState.questionName,
        questionPic: e.target.value,
        answers: [...prevState.answers],
        type: prevState.type,
      };
    });
  };

  const handleSubmitQuestion = () => {
    props.onSubmitQuestion(question);
  };

  return (
    <div>
      <div>
        <h4>Question Type: Image Question</h4>
        <label>Please enter your question here:</label>
        <TextField
          variant="filled"
          value={enteredQuestionName}
          onChange={(e) => handleQuestionName(e)}
          label="Question"
        />
        <br />
        <label>Please enter your question picture:</label>
        <TextField
          variant="filled"
          value={enteredQuestionPic}
          onChange={(e) => handleQuestionPic(e)}
          label="Picture"
        />
        <br />
      </div>
      {question.answers.map((answer, index) => {
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
      <button onClick={handleSubmitQuestion}>Submit Question</button>
    </div>
  );
};

export default ImageChoice;
