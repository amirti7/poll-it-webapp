import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import StickyFooter from "../components/StickyFooter";
import Dropdown from "react-bootstrap/Dropdown";
import MultipleChoice from "../components/Questions/MultipleChoice";
import ImageChoice from "../components/Questions/ImageChoice";
import Range from "../components/Questions/Range";
import { Button } from "react-bootstrap";
import ImageAnswers from "../components/Questions/ImageAnswers";

const NewPoll = (props) => {
  const location = useLocation();
  const prePoll = location.state.prePoll;
  const navigate = useNavigate();
  const myRef = useRef(null);
  const [questionToEdit, setQuestionToEdit] = useState();
  const [clickedOnEditQuestions, setClickedOnEditQuestions] = useState(false);
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
      // console.log(updatedQuestions);

      return {
        questions: updatedQuestions,
      };
    });
  };

  const handleClickOnEdit = (question) => {
    setQuestionToDisplay("multiple");
    myRef.current();
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

    navigate("/ConfirmPayment", {
      state: { poll: updatedPoll, prePoll: prePoll },
    });

    // const accessToken = localStorage.getItem("UserAccessToken");
    // const auth = "Bearer " + accessToken;
    // const pollId = localStorage.getItem("ActivePollId");
    // updatedPoll.questions.forEach((question) => {
    //   console.log(question);
    //   if (question.type === "Image Question") {
    //     const data = question.questionPic;
    //     let formData = new FormData();
    //     formData.append(question.questionName, data);
    //     fetch("https://10.10.248.124:443/upload", {
    //       method: "POST",
    //       body: formData,
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //         Authorization: auth,
    //       },
    //     })
    //       .then((response) => {
    //         const res = response.json();
    //         console.log(res);
    //       })
    //       .then((data) => console.log(data));
    //   } else {
    //   }
    //   const data = {
    //     pollQuestion: question.questionName,
    //     pollQuestionType: question.type,
    //     pollQuestionImage: question.questionPic,
    //     choices: question.answers,
    //     pollId: pollId,
    //   };
    //   fetch("https://10.10.248.124:443/poll_question/create", {
    //     method: "POST",
    //     body: JSON.stringify(data),
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: auth,
    //     },
    //   })
    //     .then((response) => {
    //       const res = response.json();
    //       console.log(res);
    //     })
    //     .then((data) => console.log(data));
    // });
  }

  return (
    <div>
      <NavigationBar />
      <div>
        <div>
          {finishedQuestions.questions.map((question) => {
            return (
              <div>
                <Button variant="dark">{question.questionName}</Button>
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
          <MultipleChoice
            onSubmitQuestion={handleFinishedQuestions}
            ref={myRef}
          />
        )}
        {questionToDisplay === "image" && (
          <ImageChoice onSubmitQuestion={handleFinishedQuestions} />
        )}
        {questionToDisplay === "range" && <Range />}
        {questionToDisplay === "ImageAnswers" && (
          <ImageAnswers onSubmitQuestion={handleFinishedQuestions} />
        )}
        {clickedOnEditQuestions && (
          <MultipleChoice
            onSubmitQuestion={handleFinishedQuestions}
            // onLoad={handleLoadQuestion}
            question={questionToEdit}
            ref={myRef}
          />
        )}
      </div>
      <Button onClick={handleSubmitPoll}>Submit Poll</Button>
      <StickyFooter />
    </div>
  );
};

export default NewPoll;
