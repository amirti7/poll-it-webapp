import { useState } from "react";
import NavigationBar from "../components/NavigationBar";
import StickyFooter from "../components/StickyFooter";
import Dropdown from "react-bootstrap/Dropdown";
import MultipleChoice from "../components/Questions/MultipleChoice";
import ImageChoice from "../components/Questions/ImageChoice";
import Range from "../components/Questions/Range";
import TextField from "@mui/material/TextField";
import { Button } from "react-bootstrap";
import ImageAnswers from "../components/Questions/ImageAnswers";

const NewPoll = (props) => {
  const [questionToDisplay, setQuestionToDisplay] = useState("");
  const [finishedQuestions, setFinishedQuestions] = useState({
    questions: [
      {
        questionName: "",
        questionPic: "",
        answers: [],
        type: "",
      },
    ],
  });

  const [finishedPoll, setFinishedPoll] = useState({
    questions: [],
  });

  const handleFinishedQuestions = (question) => {
    setQuestionToDisplay("");
    setFinishedQuestions((prevState) => {
      const updatedQuestions = [
        ...prevState.questions,
        {
          questionName: question.questionName,
          questionPic: question.questionPic,
          answers: question.answers,
          type: question.type,
        },
      ];
      console.log(updatedQuestions);

      return {
        questions: updatedQuestions,
      };
    });
  };

  async function handleSubmitPoll() {
    let updatedPoll;
    let finalQuestions = finishedQuestions.questions;
    finalQuestions.shift(0);
    updatedPoll = {
      questions: finalQuestions,
    };
    console.log(updatedPoll);

    setFinishedPoll({
      questions: updatedPoll.questions,
    });

    const accessToken = localStorage.getItem("UserAccessToken");
    const auth = "Bearer " + accessToken;
    const pollId = localStorage.getItem("ActivePollId");
    updatedPoll.questions.forEach((question) => {
      console.log(question);
      const data = {
        pollQuestion: question.questionName,
        pollQuestionType: question.type,
        pollQuestionImage: question.questionPic,
        choices: question.answers,
        pollId: pollId,
      };
      fetch("http://10.10.248.124:8000/poll_question/create", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: auth,
        },
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    });
  }

  return (
    <div>
      <NavigationBar />
      <div>
        <div>
          {finishedQuestions.questions.map((question) => {
            return (
              <div>
                <p>{question.questionName}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div style={{ marginTop: "10px" }}>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Question Type:
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setQuestionToDisplay("multiple")}>
              Multiple answers-one choice
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setQuestionToDisplay("image")}>
              Image Question
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setQuestionToDisplay("ImageAnswers")}>
              Image Answers
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setQuestionToDisplay("range")}>
              Select a value from Range
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        {questionToDisplay === "multiple" && (
          <MultipleChoice onSubmitQuestion={handleFinishedQuestions} />
        )}
        {questionToDisplay === "image" && (
          <ImageChoice onSubmitQuestion={handleFinishedQuestions} />
        )}
        {questionToDisplay === "range" && <Range />}
        {questionToDisplay === "ImageAnswers" && (
          <ImageAnswers onSubmitQuestion={handleFinishedQuestions} />
        )}
      </div>
      <Button onClick={handleSubmitPoll}>Submit Poll</Button>
      <StickyFooter />
    </div>
  );
};

export default NewPoll;
