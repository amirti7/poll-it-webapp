import { useEffect, useState } from "react";
import React from "react";
import TextField from "@mui/material/TextField";
import ImgToBase64 from "../ImgToBase64";
import { Button } from "react-bootstrap";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const ImageAnswers = (props) => {
  const [question, setQuestion] = useState({
    questionName: "",
    answers: ["", ""],
    type: "Image Answers",
  });
  const [editableQuestion, setEditableQuestion] = useState(props.editQuestion);
  const [editableAnswers, setEditableAnswers] = useState([]);
  const [enteredQuestionName, setEnteredQuestionName] = useState("");
  const [validPicture, setValidPicture] = useState([true, true]);
  const [uploadedPictures, setUploadedPictures] = useState([false, false]);
  const [enteredAnswer, setEnteredAnswer] = useState(["", ""]);

  useEffect(() => {
    if (props.editQuestion !== undefined) {
      setEnteredQuestionName(props.editQuestion.questionName);
      setEditableAnswers(props.editQuestion.answers);
    }
  }, [props.editQuestion]);

  const handleEditAnswer = (answer, index) => {
    isValidURL(answer, index);
    if (
      editableQuestion.answers[index] !== "" &&
      editableQuestion.answers[index] !== answer &&
      editableQuestion.answers[editableQuestion.answers.length - 1] === ""
    ) {
      setEditableAnswers((prevState) => {
        let updatedAnswers = [...prevState];
        updatedAnswers.splice(index, 1, answer);
        return updatedAnswers;
      });
      setEditableQuestion((prevState) => {
        let updatedAnswers = [...prevState.answers];
        updatedAnswers.splice(index, 1, answer);
        return {
          questionName: prevState.questionName,
          answers: updatedAnswers,
          type: prevState.type,
        };
      });
      return;
    }
    if (answer === "") return;
    if (editableQuestion.answers[index] === answer) return;

    if (index === 0) {
      setEditableQuestion((prevState) => {
        let updatedAnswers = [...prevState.answers];
        updatedAnswers.splice(index, 1, answer);
        return {
          questionName: prevState.questionName,
          answers: updatedAnswers,
          type: prevState.type,
        };
      });
      return;
    }

    setEditableQuestion((prevState) => {
      let updatedAnswers = [...prevState.answers];
      updatedAnswers.splice(index, 1, answer, "");
      setValidPicture((prevState) => {
        let updatedvalidation = [...prevState];
        updatedvalidation.push(true);
        return updatedvalidation;
      });
      return {
        questionName: prevState.questionName,
        answers: updatedAnswers,
        type: prevState.type,
      };
    });
    return;
  };

  const handleRemoveEditAnswer = (index) => {
    if (editableQuestion.answers.length < 3) return;
    setEditableQuestion((prevState) => {
      let updatedAnswers = [...prevState.answers];
      updatedAnswers.splice(index, 1);
      return {
        questionName: prevState.questionName,
        answers: updatedAnswers,
        type: prevState.type,
      };
    });
  };

  const isValidURL = (string, index) => {
    debugger;
    let url;
    if (string === "" && !editableQuestion) {
      setValidPicture((prevState) => {
        let updatedvalidation = [...prevState];
        updatedvalidation.splice(index, 1, true);
        return updatedvalidation;
      });
      return;
    }
    if (
      string.match(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gim) ||
      string.includes("base64")
    ) {
      setValidPicture((prevState) => {
        let updatedvalidation = [...prevState];
        updatedvalidation.splice(index, 1, true);
        return updatedvalidation;
      });
    } else {
      setValidPicture((prevState) => {
        let updatedvalidation = [...prevState];
        updatedvalidation.splice(index, 1, false);
        return updatedvalidation;
      });
      return;
    }
  };

  // const handleAnswer = (e) => {
  //   if (typeof e === "object") {
  //     const finalPath = e.target.value;
  //     setEnteredAnswer(finalPath);
  //   } else {
  //     const finalPath = e;
  //     setEnteredAnswer(finalPath);
  //   }
  // };

  const handleEnteredAnswers = (e, index) => {
    let url;
    if (typeof e === "object") {
      url = e.target.value;
    } else url = e;
    isValidURL(url, index);
    console.log(validPicture);
    if (
      question.answers[index] !== "" &&
      question.answers[index] !== url &&
      question.answers[question.answers.length - 1] === ""
    ) {
      setQuestion((prevState) => {
        let updatedAnswers = [...prevState.answers];
        updatedAnswers.splice(index, 1, url);
        return {
          questionName: prevState.questionName,
          answers: updatedAnswers,
          type: prevState.type,
        };
      });
      return;
    }
    if (url === "") return;
    if (question.answers[index] === url) return;

    if (index === 0) {
      setQuestion((prevState) => {
        let updatedAnswers = [...prevState.answers];
        updatedAnswers.splice(index, 1, url);
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
      updatedAnswers.splice(index, 1, url, "");
      setValidPicture((prevState) => {
        let updatedvalidation = [...prevState];
        updatedvalidation.push(true);
        return updatedvalidation;
      });
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
    setValidPicture((prevState) => {
      let updatedValidPictures = [...prevState];
      updatedValidPictures.splice(index, 1);
      return updatedValidPictures;
    });
  };

  const handleQuestionName = (e) => {
    if (!editableQuestion) {
      setEnteredQuestionName(e.target.value);
      setQuestion((prevState) => {
        return {
          questionName: e.target.value,
          answers: [...prevState.answers],
          type: prevState.type,
        };
      });
    } else {
      setEnteredQuestionName(e.target.value);
      setEditableQuestion((prevState) => {
        return {
          questionName: e.target.value,
          answers: prevState.answers,
          type: prevState.type,
        };
      });
    }
  };

  const handleClearPicture = (index) => {
    if (!editableQuestion) {
      setQuestion((prevState) => {
        let updatedAnswers = [...prevState.answers];
        updatedAnswers.splice(index, 1, "");
        return {
          questionName: prevState.questionName,
          answers: updatedAnswers,
          type: prevState.type,
        };
      });
    } else {
      setEditableQuestion((prevState) => {
        let updatedAnswers = [...prevState.answers];
        updatedAnswers.splice(index, 1, "");
        return {
          questionName: prevState.questionName,
          answers: updatedAnswers,
          type: prevState.type,
        };
      });
    }
    setUploadedPictures((prevState) => {
      let updatedLoadedPictures = [...prevState];
      updatedLoadedPictures.splice(index, 1, false);
      return updatedLoadedPictures;
    });
  };

  const handleSubmitQuestion = () => {
    console.log(question);
    debugger;
    let isValidAnswers = validPicture.every((ans) => {
      if (ans === false) return false;
      else return true;
    });
    let noEmptyAnswers = question.answers.every((ans) => {
      if (ans === "") return false;
      else return true;
    });
    if (isValidAnswers && noEmptyAnswers && enteredQuestionName !== "") {
      props.onSubmitQuestion(question);
      return;
    }
    return;
  };

  const handleEditQuestion = () => {
    let isValidAnswers = validPicture.every((ans) => {
      if (ans === false) return false;
      else return true;
    });
    let noEmptyAnswers = editableQuestion.answers.every((ans) => {
      if (ans === "") return false;
      else return true;
    });
    if (isValidAnswers && noEmptyAnswers && enteredQuestionName !== "") {
      console.log(editableQuestion);
      props.onFinishEditQuestion(editableQuestion);
      return;
    }
    return;
  };

  const imgTo64Base = (img, index) => {
    setUploadedPictures((prevState) => {
      let updatedPictures = [...prevState];
      updatedPictures.splice(index, 1, true);
      return updatedPictures;
    });
    setValidPicture((prevState) => {
      let updatedValidaPictures = [...prevState];
      updatedValidaPictures.splice(index, 1, true);
      return updatedValidaPictures;
    });
    if (!editableQuestion) {
      setQuestion((prevState) => {
        let updatedAnswers = [...prevState.answers];
        updatedAnswers.splice(index, 1, img);
        if (!updatedAnswers.includes("")) {
          updatedAnswers.push("");
          setValidPicture((prevState) => {
            let updatedValidaPictures = [...prevState];
            updatedValidaPictures.splice(
              updatedValidaPictures.length - 1,
              1,
              true
            );
            return updatedValidaPictures;
          });
        }
        return {
          questionName: prevState.questionName,
          answers: updatedAnswers,
          type: prevState.type,
        };
      });
    } else {
      setEditableQuestion((prevState) => {
        let updatedAnswers = [...prevState.answers];
        updatedAnswers.splice(index, 1, img);
        return {
          questionName: prevState.questionName,
          answers: updatedAnswers,
          type: prevState.type,
        };
      });
    }
  };

  const handleDeleteQuestion = () => {
    props.onDeleteQuestion();
  };

  return (
    <div>
      <div>
        <h4 style={{ marginBottom: "20px" }}>
          <b>
            Question Type: <u>Image Answers</u>
          </b>
        </h4>
        <label>Please enter your question here:&ensp;</label>
        <TextField
          variant="filled"
          value={enteredQuestionName}
          onChange={(e) => handleQuestionName(e)}
          label="Question"
          style={{ marginBottom: "20px" }}
          inputProps={{ maxLength: 68 }}
        />
        <br />
      </div>

      {!props.editQuestion &&
        question.answers.map((answer, index) => {
          return (
            <div>
              <TextField
                error={!validPicture[index]}
                variant="filled"
                label="Valid Picture URL"
                onBlur={(e) => handleEnteredAnswers(e, index)}
                helperText={!validPicture[index] && " URL is not Valid"}
                style={{ marginBottom: "20px", marginRight: "10px" }}
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
                style={{ marginBottom: "20px", marginRight: "10px" }}
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
          <Button
            style={{ marginBottom: "10px", marginLeft: "10px" }}
            variant="danger"
            onClick={handleDeleteQuestion}
          >
            Delete Question
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
    </div>
  );
};

export default ImageAnswers;
