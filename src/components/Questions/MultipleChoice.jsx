import React, {
  useImperativeHandle,
  useState,
  useEffect,
  forwardRef,
} from "react";
import { Button } from "react-bootstrap";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import TextField from "@mui/material/TextField";

const MultipleChoice = (props) => {
  const [question, setQuestion] = useState({
    questionName: "",
    answers: ["", ""],
    type: "Multi Choice",
  });
  const [editableQuestion, setEditableQuestion] = useState(props.editQuestion);
  const [enteredQuestionName, setEnteredQuestionName] = useState("");
  useEffect(() => {
    if (props.editQuestion !== undefined) {
      setEnteredQuestionName(props.editQuestion.questionName);
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
          answers: updatedAnswers,
          type: prevState.type,
        };
      } else {
        let updatedAnswers = [...prevState.answers];
        updatedAnswers.splice(index, 1, answer);
        return {
          questionName: prevState.questionName,
          answers: updatedAnswers,
          type: prevState.type,
        };
      }
    });
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

  const handleEditQuestion = () => {
    console.log(editableQuestion);
    props.onFinishEditQuestion(editableQuestion);
  };

  const handleSubmitQuestion = () => {
    props.onSubmitQuestion(question);
  };

  return (
    <div>
      <form autoComplete="off">
        <div>
          <h4 style={{ marginBottom: "20px" }}>
            <b>
              Question Type: <u>Multiple Choice Question</u>
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

                {/* <input
                type="button"
                value="Remove"
                onClick={() => handleRemoveEditAnswer(index)}
              /> */}
              </div>
            );
          })}
        {props.editQuestion && (
          <>
            <br />
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
            <br />
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

export default MultipleChoice;
