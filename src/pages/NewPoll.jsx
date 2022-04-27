import { useState } from "react";
import NavigationBar from "../components/NavigationBar";
import StickyFooter from "../components/StickyFooter";
import Dropdown from "react-bootstrap/Dropdown";
import MultipleChoice from "../components/Questions/MultipleChoice";
import ImageChoice from "../components/Questions/ImageChoice";
import Range from "../components/Questions/Range";
import TextField from "@mui/material/TextField";
import { Button } from "react-bootstrap";

const NewPoll = (props) => {
  const [pollName, setPollName] = useState("");
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
    pollName: "",
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
    setFinishedPoll((prevState) => {
      let finalQuestions = finishedQuestions.questions;
      finalQuestions.shift(0);
      updatedPoll = {
        pollName: pollName,
        questions: finalQuestions,
      };
      console.log(updatedPoll);
      return {
        pollName: updatedPoll.pollName,
        questions: updatedPoll.questions,
      };
    });

    const dataToServer = {
      pollName: pollName,
    };

    const accessToken = localStorage.getItem("UserAccessToken");

    const auth = "Bearer " + accessToken;

    const response = await fetch("http://10.10.248.124:8000/poll/create", {
      method: "POST",
      body: JSON.stringify(dataToServer),
      headers: {
        "Content-Type": "application/json",
        Authorization: auth,
      },
    });

    let pollId;
    const data = await response.json();
    console.log(response);
    console.log(data);
    if (response.ok) {
      pollId = data._id;
    }
    console.log(pollId);

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
        <h4>Poll Name:</h4>
        <TextField
          variant="filled"
          value={pollName}
          onChange={(e) => setPollName(e.target.value)}
          label="Poll Name:"
        />
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
      </div>
      <Button onClick={handleSubmitPoll}>Submit Poll</Button>
      <StickyFooter />
    </div>
  );
};

export default NewPoll;
