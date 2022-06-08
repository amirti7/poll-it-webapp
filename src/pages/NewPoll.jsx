import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import StickyFooter from "../components/StickyFooter";
import Dropdown from "react-bootstrap/Dropdown";
import MultipleChoice from "../components/Questions/MultipleChoice";
import ImageChoice from "../components/Questions/ImageChoice";
import Range from "../components/Questions/Range";
import { Container, Row, Col, Button } from "react-bootstrap";
import ImageAnswers from "../components/Questions/ImageAnswers";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import SyncLoader from "react-spinners/SyncLoader";
import styled from "styled-components";
import PollItLogo from "../assets/images/Logo.png";

const Title = styled.p`
  font-size: 80px;

  @media (max-width: 460px) {
    font-size: 65px;
  }
`;

const Image = styled.img`
  @media (max-width: 767px) {
    width: 300px;
    height: 300px;
  }
  @media (max-width: 400px) {
    width: 300px;
    height: 300px;
  }
  @media (max-width: 1600px) {
    width: 450px;
    height: 450px;
  }
`;
const NewPoll = (props) => {
  const location = useLocation();
  const prePoll = location.state.prePoll;
  const navigate = useNavigate();
  const myRef = useRef(null);
  const [editQuestionIndex, setEditQuestionIndex] = useState();
  const [editQuestionType, setEditQuestionType] = useState();
  const [questionToEdit, setQuestionToEdit] = useState();
  const [clickedOnEditQuestions, setClickedOnEditQuestions] = useState(false);
  const [questionToDisplay, setQuestionToDisplay] = useState("");
  const [loading, setLoading] = useState(false);
  const [finishedQuestions, setFinishedQuestions] = useState({
    questions: [],
  });

  const [finishedPoll, setFinishedPoll] = useState({
    questions: [],
  });

  const closeLoaderIn5Seconds = (updatedPoll) => {
    setTimeout(() => {
      setLoading(!loading);
      navigate("/ConfirmPayment", {
        state: { poll: updatedPoll, prePoll: prePoll },
      });
    }, 3000);
  };

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

  const handleEditQuestion = (question, index) => {
    setEditQuestionIndex(index);
    setEditQuestionType(question.type);
    setClickedOnEditQuestions(true);
    setQuestionToEdit({
      questionName: question.questionName,
      questionPic: question.questionPic,
      answers: question.answers,
      type: question.type,
    });
  };

  const handleFinishedEditedQuestion = (question) => {
    setFinishedQuestions((prevState) => {
      let updatedQuestions = [...prevState.questions];
      updatedQuestions.splice(editQuestionIndex, 1, question);
      console.log(updatedQuestions);
      return {
        questions: updatedQuestions,
      };
    });
    setClickedOnEditQuestions(false);
    setQuestionToDisplay("");
  };

  async function handleSubmitPoll() {
    let updatedPoll;
    let finalQuestions = finishedQuestions.questions;
    updatedPoll = {
      questions: finalQuestions,
    };
    console.log(updatedPoll);

    setFinishedPoll({
      questions: updatedPoll.questions,
    });

    setLoading(true);
    closeLoaderIn5Seconds(updatedPoll);

    // const accessToken = localStorage.getItem("UserAccessToken");
    // const auth = "Bearer " + accessToken;
    // const pollId = localStorage.getItem("ActivePollId");
    // updatedPoll.questions.forEach((question) => {
    //   console.log(question);
    //   if (question.type === "Image Question") {
    //     const data = question.questionPic;
    //     let formData = new FormData();
    //     formData.append(question.questionName, data);
    //     fetch("https://poll-it.cs.colman.ac.il/upload", {
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
    //   fetch("https://poll-it.cs.colman.ac.il/poll_question/create", {
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
      <Modal
        open={loading}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Typography
          id="modal-modal-description"
          sx={{ mt: 2 }}
          style={{ position: "absolute", top: "50%", left: "40%" }}
        >
          <SyncLoader loading={loading} size={25} color={"#D7A136"} />
        </Typography>
      </Modal>
      <NavigationBar />
      <div>
        <Container>
          <Row md={6}>
            <Col md={6}>
              <Title>Create New Poll</Title>
              <p
                style={{
                  fontSize: "30px",
                }}
              >
                Before We Submit Your Entered Poll , please fill in your Poll
                Questions: you have 3 poll options (regular multiple Questions , question with image , answers with images), mix them as you wish and have fun!
              </p>
            </Col>
            <Col md={6}>
              <Image src={PollItLogo}></Image>
            </Col>
          </Row>

          <div>
            {console.log(finishedQuestions)}
            {finishedQuestions.questions.map((question, index) => {
              return (
                <div>
                  <Button
                    onClick={() => handleEditQuestion(question, index)}
                    variant="dark"
                  >
                    {question.questionName}
                  </Button>
                </div>
              );
            })}
          </div>
          <Row md={6}>
            <Col md={6}>
              <div>
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Question Type:
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item
                      onClick={() => setQuestionToDisplay("multiple")}
                    >
                      Multiple answers-one choice
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => setQuestionToDisplay("image")}
                    >
                      Image Question
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => setQuestionToDisplay("ImageAnswers")}
                    >
                      Image Answers
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                {questionToDisplay === "multiple" && (
                  <MultipleChoice onSubmitQuestion={handleFinishedQuestions} />
                )}
                {questionToDisplay === "image" && (
                  <ImageChoice onSubmitQuestion={handleFinishedQuestions} />
                )}
                {questionToDisplay === "ImageAnswers" && (
                  <ImageAnswers onSubmitQuestion={handleFinishedQuestions} />
                )}
                {clickedOnEditQuestions &&
                  editQuestionType === "Multi Choice" && (
                    <MultipleChoice
                      onFinishEditQuestion={handleFinishedEditedQuestion}
                      editQuestion={questionToEdit}
                      question={questionToEdit}
                    />
                  )}
                {clickedOnEditQuestions &&
                  editQuestionType === "Image Question" && (
                    <ImageChoice
                      onFinishEditQuestion={handleFinishedEditedQuestion}
                      editQuestion={questionToEdit}
                      question={questionToEdit}
                    />
                  )}
                {clickedOnEditQuestions &&
                  editQuestionType === "Image Answers" && (
                    <ImageAnswers
                      onFinishEditQuestion={handleFinishedEditedQuestion}
                      editQuestion={questionToEdit}
                      question={questionToEdit}
                    />
                  )}
              </div>
              <Button onClick={handleSubmitPoll}>Submit Poll</Button>
              <Button
                variant="dark"
                style={{ marginLeft: "5px" }}
                onClick={() => {
                  setQuestionToDisplay("");
                  setClickedOnEditQuestions(false);
                }}
              >
                Cancel
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
      {/* <div style={{ marginTop: "10px" }}>
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
          </Dropdown.Menu>
        </Dropdown>
        {questionToDisplay === "multiple" && (
          <MultipleChoice onSubmitQuestion={handleFinishedQuestions} />
        )}
        {questionToDisplay === "image" && (
          <ImageChoice onSubmitQuestion={handleFinishedQuestions} />
        )}
        {questionToDisplay === "ImageAnswers" && (
          <ImageAnswers onSubmitQuestion={handleFinishedQuestions} />
        )}
        {clickedOnEditQuestions && editQuestionType === "Multi Choice" && (
          <MultipleChoice
            onFinishEditQuestion={handleFinishedEditedQuestion}
            editQuestion={questionToEdit}
            question={questionToEdit}
          />
        )}
        {clickedOnEditQuestions && editQuestionType === "Image Question" && (
          <ImageChoice
            onFinishEditQuestion={handleFinishedEditedQuestion}
            editQuestion={questionToEdit}
            question={questionToEdit}
          />
        )}
        {clickedOnEditQuestions && editQuestionType === "Image Answers" && (
          <ImageAnswers
            onFinishEditQuestion={handleFinishedEditedQuestion}
            editQuestion={questionToEdit}
            question={questionToEdit}
          />
        )}
      </div>
      <Button onClick={handleSubmitPoll}>Submit Poll</Button>
      <Button
        variant="dark"
        style={{ marginLeft: "5px" }}
        onClick={() => {
          setQuestionToDisplay("");
          setClickedOnEditQuestions(false);
        }}
      >
        Cancel
      </Button> */}
      <StickyFooter />
    </div>
  );
};

export default NewPoll;
