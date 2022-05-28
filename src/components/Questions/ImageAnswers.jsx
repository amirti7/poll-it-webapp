import { useState } from "react";
import React from "react";
import TextField from "@mui/material/TextField";

const ImageAnswers = (props) => {
  const [question, setQuestion] = useState({
    questionName: "",
    answers: ["", ""],
    type: "Image Answers",
  });
  const [enteredQuestionName, setEnteredQuestionName] = useState("");
  const [validPicture, setValidPicture] = useState([]);

  const isValidURL = (string, index) => {
    let url;
    if (string === "") {
      setValidPicture((prevState) => {
        const updatedvalidation = [...prevState, (prevState[index] = false)];
        return updatedvalidation;
      });
      return;
    }
    try {
      url = new URL(string);
    } catch (_) {
      setValidPicture((prevState) => {
        const updatedvalidation = [...prevState, (prevState[index] = false)];
        return updatedvalidation;
      });
      return;
    }
    setValidPicture((prevState) => {
      const updatedvalidation = [...prevState, (prevState[index] = true)];
      return updatedvalidation;
    });
    return;
  };

  const handleEnteredAnswers = (e, index) => {
    isValidURL(e.target.value, index);
    console.log(validPicture);
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

  const handleSubmitQuestion = () => {
    props.onSubmitQuestion(question);
  };

  return (
    <div>
      <div>
        <h4>Question Type: Image Answers</h4>
        <label>Please enter your question here:</label>
        <TextField
          variant="filled"
          value={enteredQuestionName}
          onChange={(e) => handleQuestionName(e)}
          label="Question"
        />
        <br />
      </div>
      {question.answers.map((answer, index) => {
        return (
          <div>
            <TextField
              error={!validPicture[index]}
              variant="filled"
              label="Answer"
              onBlur={(e) => handleEnteredAnswers(e, index)}
              helperText={!validPicture[index] && " URL is not Valid"}
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

export default ImageAnswers;
