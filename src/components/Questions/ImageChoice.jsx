import { useState } from "react";
import React from "react";
import TextField from "@mui/material/TextField";

const ImageChoice = (props) => {
  const accessToken = localStorage.getItem("UserAccessToken");
  const auth = "Bearer " + accessToken;
  const [question, setQuestion] = useState({
    questionName: "",
    questionPic: "",
    answers: ["", ""],
    type: "Image Question",
  });
  const [enteredQuestionName, setEnteredQuestionName] = useState("");
  const [enteredQuestionPic, setEnteredQuestionPic] = useState("");
  const [validPicture, setValidPicture] = useState(true);

  async function reciveImage(event) {
    let img;
    if (event.target.files && event.target.files[0]) {
      img = event.target.files[0];
    }
    var formData = new FormData();
    formData.append("file", img);
    const response = await fetch("https://poll-it.cs.colman.ac.il/upload", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: auth,
      },
    });
    const data = await response.json();
    setEnteredQuestionPic(data.url);
  }

  const isValidURL = (string) => {
    let url;
    if (string === "") {
      setValidPicture(true);
      return true;
    }
    try {
      url = new URL(string);
    } catch (_) {
      setValidPicture(false);
      return false;
    }
    setValidPicture(true);
    return true;
  };

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
    if (!validPicture || enteredQuestionPic === "") {
      return;
    }
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
        <label>Please enter your question picture valid URL:</label>
        <TextField
          error={!validPicture}
          variant="filled"
          value={enteredQuestionPic}
          onChange={(e) => handleQuestionPic(e)}
          onBlur={(e) => isValidURL(e.target.value)}
          label="Picture"
          helperText={!validPicture && " URL is not Valid"}
        />

        <label>Or Upload image:</label>
        <input
          type="file"
          id="image-input"
          accept="image/jpeg, image/png, image/jpg"
          onChange={(e) => reciveImage(e)}
        />
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
