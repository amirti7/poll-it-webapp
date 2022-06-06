import React, {
  useImperativeHandle,
  useState,
  useEffect,
  forwardRef,
} from "react";

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
      {!props.editQuestion &&
        question.answers.map((answer, index) => {
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
      {props.editQuestion &&
        editableQuestion.answers.map((answer, index) => {
          return (
            <div>
              <TextField
                variant="filled"
                label="Answer"
                value={answer}
                onChange={(e) => handleEditAnswer(e.target.value, index)}
              />
              <input
                type="button"
                value="Remove"
                onClick={() => handleRemoveEditAnswer(index)}
              />
            </div>
          );
        })}
      {props.editQuestion && (
        <>
          <br />
          <button onClick={handleEditQuestion}>Edit Question</button>
        </>
      )}
      {!props.editQuestion && (
        <>
          <br />
          <button onClick={handleSubmitQuestion}>Submit Question</button>
        </>
      )}
    </div>
  );
};

export default MultipleChoice;
