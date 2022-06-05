import { PieChart } from "react-minimal-pie-chart";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import NavigationBar from "../components/NavigationBar";
import StickyFooter from "../components/StickyFooter";

const Box = styled.p`
  height: 20px;
  width: 20px;
  margin-bottom: 15px;
  border: 1px solid black;
`;
const Title = styled.p`
  font-size: 70px;
  text-align: center;

  @media (max-width: 460px) {
    font-size: 65px;
  }
`;
const defaultLabelStyle = {
  fontSize: "3px",
  fontFamily: "sans-serif",
  color: "white",
};

const colors = [
  "#3366cc",
  "#dc3912",
  "#ff9900",
  "#109618",
  "#990099",
  "#dd4477",
  "#66aa00",
  "#22aa99",
  "#aaaa11",
  "#6633cc",
  "#e67300",
  "#8b0707",
  "#651067",
  "#329262",
  "#5574a6",
  "#3b3eac",
  "#b77322",
  "#16d620",
  "#b91383",
  "#f4359e",
  "#9c5935",
  "#a9c413",
  "#2a778d",
  "#668d1c",
  "#bea413",
  "#0c5922",
  "#743411",
  "#11746752",
];

const AboutUs = (props) => {
  const [userPolls, setUserPolls] = useState([]);
  const [statesFinished, setStatesFinished] = useState(false);
  const [userPollQuestions, setUserPollQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const userID = localStorage.getItem("UserId");
  const UserAccessToken = localStorage.getItem("UserAccessToken");
  const auth = "Bearer " + UserAccessToken;
  const pic = true;
  let polls, pollQuestions, answers;
  let pollsShow;

  async function getData() {
    const pollsData = await fetch(
      "https://poll-it.cs.colman.ac.il/poll/getPollsByClientId/" + userID,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: auth,
        },
      }
    );
    const pollsDetails = await pollsData.json();
    const formatPolls = pollsDetails.map((poll) => {
      const obj = {
        _id: poll._id,
        pollName: poll.pollName,
      };
      return obj;
    });

    setUserPolls(formatPolls);

    pollsDetails.forEach(async (poll) => {
      const pollQuestionData = await fetch(
        "https://poll-it.cs.colman.ac.il/poll_question/getPollQuestionsByPollId/" +
          poll._id,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: auth,
          },
        }
      );

      const pollQuestionDetails = await pollQuestionData.json();
      const formatPollQuestions = pollQuestionDetails.map((question) => {
        const obj = {
          _id: question._id,
          pollQuestion: question.pollQuestion,
          pollQuestionType: question.pollQuestionType,
          pollQuestionImage: question.pollQuestionImage,
          choices: question.choices,
          pollId: question.pollId,
        };
        return obj;
      });
      setUserPollQuestions((prevQuestions) => {
        prevQuestions.push(formatPollQuestions);
        return [...prevQuestions];
      });

      const answersData = await fetch(
        "https://poll-it.cs.colman.ac.il/answer/getAnswersByPollId/" + poll._id,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: auth,
          },
        }
      );
      const answersDetails = await answersData.json();
      const formatAnswer = answersDetails.map((answer) => {
        const obj = {
          _id: answer._id,
          accountId: answer.accountId,
          answer: answer.answer,
          pollId: answer.pollId,
          pollQuestionId: answer.pollQuestionId,
        };
        return obj;
      });
      setUserAnswers((prevAnswers) => {
        prevAnswers.push(formatAnswer);
        return [...prevAnswers];
      });
    });
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setStatesFinished(true);
  }, [userPollQuestions]);

  return (
    <div>
      <NavigationBar></NavigationBar>
      <Container>
        <Title>Polls Analyze</Title>
        {statesFinished &&
          userPolls.map((poll) => {
            const filteredQuestions = userPollQuestions
              .flat()
              .filter((question) => question.pollId === poll._id);
            const filterdQuestionsArr = filteredQuestions.filter(
              (v, i, a) => a.findIndex((v2) => v2._id === v._id) === i
            );
            const filterdAnswersArr = userAnswers
              .filter((v, i, a) => a.findIndex((v2) => v2._id === v._id) === i)
              .flat();
            console.log(filterdQuestionsArr);
            console.log(filterdAnswersArr);

            return (
              <div>
                <h1
                  style={{
                    textAlign: "center",
                    margin: "50px 0px",
                    textDecoration: "underline",
                    fontWeight: "bold",
                  }}
                >
                  {poll.pollName}
                  <h3>
                    number of participants :
                    {filterdAnswersArr.length / filterdQuestionsArr.length}
                  </h3>
                </h1>

                {filterdQuestionsArr.map((question) => {
                  // here will be fetch get call that brings all specific question answers from server , and then we will present
                  // each question graph based on his answers.

                  let dataForChart = [];
                  return (
                    <Row
                      md={6}
                      key={question._id}
                      style={{ borderStyle: "solid", margin: "5px 0px" }}
                    >
                      <Col md={6}>
                        <p
                          style={{
                            fontSize: "40px",
                          }}
                        >
                          {question.pollQuestion}
                          {question.pollQuestionImage && (
                            <img
                              style={{ width: "100px" }}
                              src={question.pollQuestionImage}
                            ></img>
                          )}
                        </p>
                        <div
                          style={{
                            fontSize: "20px",
                          }}
                        >
                          {question.choices.map((choice) => {
                            // const color =
                            //   "#" +
                            //   Math.floor(Math.random() * 16777215).toString(16);
                            var color =
                              colors[Math.floor(Math.random() * colors.length)];
                            console.log("color ", color, "choice ", choice);
                            dataForChart.push({
                              title: choice,
                              value: 0,
                              color: color,
                            });
                            return (
                              <div>
                                <Box style={{ backgroundColor: `${color}` }} />
                                {choice.toString()}
                                {question.pollQuestionType ===
                                  "Image Answers" && (
                                  <img src={choice} style={{ width: "50px" }} />
                                )}

                                <br />
                              </div>
                            );
                          })}
                          {filterdAnswersArr.forEach((ans) => {
                            dataForChart.forEach((choice) => {
                              if (ans.answer === choice.title) {
                                choice.value = choice.value + 1;
                              }
                            });
                          })}
                        </div>
                      </Col>
                      <Col md={6}>
                        <PieChart
                          radius={30}
                          segmentsShift={1}
                          label={({ dataEntry }) => {
                            var fixedNum =
                              Math.round(dataEntry.percentage) + "%";
                            if (fixedNum == "0%") return null;
                            return fixedNum;
                          }}
                          labelStyle={{
                            ...defaultLabelStyle,
                          }}
                          data={dataForChart}
                        />
                      </Col>
                    </Row>
                  );
                })}
              </div>
            );
          })}
      </Container>
      <StickyFooter></StickyFooter>
    </div>
  );
};

export default AboutUs;
