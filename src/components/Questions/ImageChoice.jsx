import { useState, useEffect } from "react";
import React from "react";
import TextField from "@mui/material/TextField";
import FileBase64 from "react-file-base64";
import ImgToBase64 from "../ImgToBase64";
import { Button } from "react-bootstrap";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const ImageChoice = (props) => {
  const accessToken = localStorage.getItem("UserAccessToken");
  const auth = "Bearer " + accessToken;
  const [question, setQuestion] = useState({
    questionName: "",
    questionPic: "",
    answers: ["", ""],
    type: "Image Question",
  });
  const [editableQuestion, setEditableQuestion] = useState(props.editQuestion);
  const [enteredQuestionName, setEnteredQuestionName] = useState("");
  const [enteredQuestionPic, setEnteredQuestionPic] = useState("");
  const [validPicture, setValidPicture] = useState(true);
  const [uploadedPic, setUploadedPic] = useState(false);

  useEffect(() => {
    if (props.editQuestion !== undefined) {
      setEnteredQuestionName(props.editQuestion.questionName);
      setEnteredQuestionPic(props.editQuestion.questionPic);
    }
  }, [props.editQuestion]);

  const handleEditAnswer = (answer, index) => {
    setEditableQuestion((prevState) => {
      let valid = prevState.answers.includes("");
      if (!valid) {
        let updatedAnswers = [...prevState.answers];
        updatedAnswers.splice(index, 1, answer);
        updatedAnswers.push("");
        return {
          questionName: prevState.questionName,
          questionPic: prevState.questionPic,
          answers: updatedAnswers,
          type: prevState.type,
        };
      } else {
        let updatedAnswers = [...prevState.answers];
        updatedAnswers.splice(index, 1, answer);
        return {
          questionName: prevState.questionName,
          questionPic: prevState.questionPic,
          answers: updatedAnswers,
          type: prevState.type,
        };
      }
    });
  };

  const handleRemoveEditAnswer = (index) => {
    if (editableQuestion.answers.length < 3) return;
    setEditableQuestion((prevState) => {
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

  const handleEditQuestion = () => {
    if (
      !validPicture ||
      enteredQuestionPic === "" ||
      enteredQuestionName === ""
    ) {
      return;
    }
    console.log(editableQuestion);
    props.onFinishEditQuestion(editableQuestion);
  };

  const imgTo64Base = (img) => {
    console.log(img);
    handleQuestionPic(img);
    setEnteredQuestionPic(img);
    setUploadedPic(true);
  };

  // async function reciveImage(event) {
  //   let img;
  //   if (event.target.files && event.target.files[0]) {
  //     img = event.target.files[0];
  //   }
  //   var formData = new FormData();
  //   formData.append("file", img);
  //   const response = await fetch("https://poll-it.cs.colman.ac.il/upload", {
  //     method: "POST",
  //     body: formData,
  //     headers: {
  //       Authorization: auth,
  //     },
  //   });
  //   const data = await response.json();
  //   setEnteredQuestionPic(data.url);
  // }
  const isImgLink = (url) => {
    if (typeof url !== "string") {
      return false;
    }
    let isImg =
      url.match(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gim) ||
      url.includes("base64");
    return isImg;
  };

  const isValidURL = (string) => {
    if (string === "") {
      setValidPicture(true);
      return true;
    }
    if (!isImgLink(string)) {
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
        questionPic: prevState.questionPic,
        answers: [...prevState.answers],
        type: prevState.type,
      };
    });
  };

  const handleQuestionPic = (e) => {
    if (typeof e === "object") {
      const finalPath = e.target.value;
      setEnteredQuestionPic(finalPath);
      if (!isImgLink(finalPath)) {
        setValidPicture(false);
        setEnteredQuestionPic("");
        setQuestion((prevState) => {
          return {
            questionName: prevState.questionName,
            questionPic: finalPath,
            answers: [...prevState.answers],
            type: prevState.type,
          };
        });
        return;
      }
      setEnteredQuestionPic(finalPath);
      setQuestion((prevState) => {
        return {
          questionName: prevState.questionName,
          questionPic: finalPath,
          answers: [...prevState.answers],
          type: prevState.type,
        };
      });
    } else {
      const finalPath = e;
      if (e === null) setEnteredQuestionPic(finalPath);
      setQuestion((prevState) => {
        return {
          questionName: prevState.questionName,
          questionPic: finalPath,
          answers: [...prevState.answers],
          type: prevState.type,
        };
      });
    }
  };

  const handleClearPicture = () => {
    setEnteredQuestionPic("");
    setUploadedPic(!uploadedPic);
    // document.getElementById("image-input").children.value = null;
  };

  const handleSubmitQuestion = () => {
    if (
      !validPicture ||
      enteredQuestionPic === "" ||
      enteredQuestionName === ""
    ) {
      return;
    }
    console.log(question);
    props.onSubmitQuestion(question);
  };

  return (
    <div>
      <form autoComplete="off">
        <div>
          <h4 style={{ marginBottom: "20px" }}>
            <b>
              Question Type: <u>Image Question</u>
            </b>
          </h4>
          <label>Please enter your question here:&ensp;</label>
          <TextField
            variant="filled"
            value={enteredQuestionName}
            onChange={(e) => handleQuestionName(e)}
            label="Question"
            style={{ marginBottom: "20px" }}
          />
          <br />
          {!uploadedPic && (
            <>
              <label>Please enter your question picture valid URL:&ensp;</label>
              <TextField
                error={!validPicture}
                variant="filled"
                value={enteredQuestionPic}
                onChange={(e) => handleQuestionPic(e)}
                onBlur={(e) => isValidURL(e.target.value)}
                label="Picture"
                helperText={!validPicture && " URL is not Valid"}
                style={{ marginBottom: "20px" }}
              />
            </>
          )}
          <div>
            <label>Or Upload image:&ensp;</label>

            <ImgToBase64 setImage={imgTo64Base} />
          </div>
          {uploadedPic && (
            <>
              <p style={{ color: "green" }}>picture has been uploaded!</p>
              <button onClick={handleClearPicture}>clear Picture</button>
            </>
          )}
        </div>
        {!props.editQuestion &&
          question.answers.map((answer, index) => {
            return (
              <div>
                <TextField
                  variant="filled"
                  label="Answer"
                  onBlur={(e) => handleEnteredAnswers(e, index)}
                  style={{ marginBottom: "20px" }}
                />
                <Button
                  onClick={() => handleRemoveAnswer(index)}
                  variant="warning"
                  style={{ margin: "10px" }}
                >
                  <DeleteOutlineIcon />
                </Button>
              </div>
            );
          })}

        {props.editQuestion &&
          editableQuestion.answers.map((answer, index) => {
            return (
              <div>
                <TextField
                  variant="filled"
                  label="Answer"
                  value={answer}
                  onChange={(e) => handleEditAnswer(e.target.value, index)}
                  style={{ marginBottom: "20px" }}
                />
                <Button
                  onClick={() => handleRemoveEditAnswer(index)}
                  variant="warning"
                  style={{ margin: "10px" }}
                >
                  <DeleteOutlineIcon />
                </Button>
              </div>
            );
          })}
        <br />
        {props.editQuestion && (
          <>
            <Button
              style={{ marginBottom: "10px" }}
              variant="success"
              onClick={handleEditQuestion}
            >
              Confirm Edit Question
            </Button>
          </>
        )}
        {!props.editQuestion && (
          <>
            <Button
              style={{ marginBottom: "10px" }}
              variant="success"
              onClick={handleSubmitQuestion}
            >
              Submit Question
            </Button>
          </>
        )}
      </form>
    </div>
  );
};

export default ImageChoice;
