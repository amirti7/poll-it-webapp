import { PieChart } from "react-minimal-pie-chart";
import styled from "styled-components";
import { getFirestore, collection, getDocs } from "firebase/firestore";
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

const AboutUs = (props) => {
  const [userPolls, setUserPolls] = useState([]);
  const [statesFinished, setStatesFinished] = useState(false);
  const [userPollQuestions, setUserPollQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const userID = localStorage.getItem("UserId");
  const UserAccessToken = localStorage.getItem("UserAccessToken");
  const auth = "Bearer " + UserAccessToken;
  let polls, pollQuestions, answers;
  let pollsShow;

  async function getData() {
    const pollsData = await fetch(
      "http://10.10.248.124:8000/poll/getPollsByClientId/" + userID,
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
        "http://10.10.248.124:8000/poll_question/getPollQuestionsByPollId/" +
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
        "http://10.10.248.124:8000/answer/getAnswersByPollId/" + poll._id,
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
                <h2>{poll.pollName}</h2>
                {filterdQuestionsArr.map((question) => {
                  // here will be fetch get call that brings all specific question answers from server , and then we will present
                  // each question graph based on his answers.

                  let dataForChart = [];
                  return (
                    <Row md={6} key={question._id}>
                      <Col md={6}>
                        <p
                          style={{
                            fontSize: "40px",
                          }}
                        >
                          {question.pollQuestion}
                        </p>
                        <div
                          style={{
                            fontSize: "20px",
                          }}
                        >
                          {question.choices.map((choice) => {
                            const color =
                              "#" +
                              Math.floor(Math.random() * 16777215).toString(16);
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
