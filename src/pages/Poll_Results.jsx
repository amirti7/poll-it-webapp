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
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { newAccessToken } from "../components/Utils";

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
  "#F44336",
  "#FFCDD2",
  "#EF9A9A",
  "#E57373",
  "#EF5350",
  "#F44336",
  "#B71C1C",
  "#FF8A80",
  "#FF5252",
  "#FF1744",
  "#D50000",
  "#E91E63",
  "#F8BBD0",
  "#F48FB1",
  "#F06292",
  "#EC407A",
  "#E91E63",
  "#D81B60",
  "#C2185B",
  "#AD1457",
  "#880E4F",
  "#FF80AB",
  "#FF4081",
  "#F50057",
  "#C51162",
  "#9C27B0",
  "#E1BEE7",
  "#CE93D8",
  "#BA68C8",
  "#AB47BC",
  "#9C27B0",
  "#8E24AA",
  "#7B1FA2",
  "#6A1B9A",
  "#4A148C",
  "#EA80FC",
  "#E040FB",
  "#D500F9",
  "#AA00FF",
  "#673AB7",
  "#D1C4E9",
  "#B39DDB",
  "#9575CD",
  "#7E57C2",
  "#673AB7",
  "#5E35B1",
  "#512DA8",
  "#4527A0",
  "#B388FF",
  "#7C4DFF",
  "#651FFF",
  "#6200EA",
  "#3F51B5",
  "#C5CAE9",
  "#9FA8DA",
  "#7986CB",
  "#5C6BC0",
  "#3F51B5",
  "#3949AB",
  "#303F9F",
  "#283593",
  "#8C9EFF",
  "#536DFE",
  "#3D5AFE",
  "#304FFE",
  "#2196F3",
  "#BBDEFB",
  "#90CAF9",
  "#64B5F6",
  "#42A5F5",
  "#2196F3",
  "#0D47A1",
  "#82B1FF",
  "#448AFF",
  "#2962FF",
  "#03A9F4",
  "#B3E5FC",
  "#81D4FA",
  "#4FC3F7",
  "#039BE5",
  "#0288D1",
  "#0277BD",
  "#01579B",
  "#80D8FF",
  "#40C4FF",
  "#00B0FF",
  "#0091EA",
  "#00BCD4",
  "#B2EBF2",
  "#80DEEA",
  "#4DD0E1",
  "#26C6DA",
  "#00BCD4",
  "#00ACC1",
  "#0097A7",
  "#00838F",
  "#006064",
  "#84FFFF",
  "#18FFFF",
  "#00E5FF",
  "#00B8D4",
  "#009688",
  "#B2DFDB",
  "#80CBC4",
  "#4DB6AC",
  "#26A69A",
  "#009688",
  "#00897B",
  "#00796B",
  "#00695C",
  "#004D40",
  "#A7FFEB",
  "#64FFDA",
  "#1DE9B6",
  "#00BFA5",
  "#4CAF50",
  "#C8E6C9",
  "#A5D6A7",
  "#81C784",
  "#66BB6A",
  "#4CAF50",
  "#43A047",
  "#388E3C",
  "#2E7D32",
  "#1B5E20",
  "#69F0AE",
  "#00E676",
  "#00C853",
  "#8BC34A",
  "#DCEDC8",
  "#C5E1A5",
  "#AED581",
  "#9CCC65",
  "#8BC34A",
  "#7CB342",
  "#689F38",
  "#558B2F",
  "#33691E",
  "#CCFF90",
  "#B2FF59",
  "#76FF03",
  "#64DD17",
  "#CDDC39",
  "#F0F4C3",
  "#DCE775",
  "#D4E157",
  "#CDDC39",
  "#C0CA33",
  "#AFB42B",
  "#9E9D24",
  "#827717",
  "#F4FF81",
  "#EEFF41",
  "#C6FF00",
  "#AEEA00",
  "#FFEB3B",
  "#FFF9C4",
  "#FFF59D",
  "#FFF176",
  "#FFEB3B",
  "#FDD835",
  "#FBC02D",
  "#F9A825",
  "#F57F17",
  "#FFFF8D",
  "#FFEA00",
  "#FFD600",
  "#FFC107",
  "#FFECB3",
  "#FFE082",
  "#FFD54F",
  "#FFC107",
  "#FFB300",
  "#FFA000",
  "#FF8F00",
  "#FF6F00",
  "#FFE57F",
  "#FFD740",
  "#FFC400",
  "#FFAB00",
  "#FF9800",
  "#FFE0B2",
  "#FFCC80",
  "#FFB74D",
  "#FFA726",
  "#FB8C00",
  "#EF6C00",
  "#E65100",
  "#FFD180",
  "#FFAB40",
  "#FF9100",
  "#FF6D00",
  "#FF5722",
  "#FFCCBC",
  "#FFAB91",
  "#FF8A65",
  "#FF7043",
  "#FF5722",
  "#BF360C",
  "#FF9E80",
  "#FF6E40",
  "#FF3D00",
  "#795548",
  "#EFEBE9",
  "#D7CCC8",
  "#BCAAA4",
  "#A1887F",
  "#8D6E63",
  "#795548",
  "#9E9E9E",
  "#E0E0E0",
  "#BDBDBD",
  "#616161",
  "#424242",
  "#607D8B",
  "#B0BEC5",
  "#90A4AE",
  "#78909C",
  "#37474F",
];

let choosenColors = [];

const AboutUs = (props) => {
  const [userPolls, setUserPolls] = useState([]);
  const [statesFinished, setStatesFinished] = useState(false);
  const [userPollQuestions, setUserPollQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const userID = localStorage.getItem("UserId");
  let UserAccessToken = localStorage.getItem("UserAccessToken");
  let auth = "Bearer " + UserAccessToken;
  const [picU, setpicU] = useState();
  const pic = true;
  let link;
  let url;
  let resData, pollsDetails, formatPolls;
  let polls, pollQuestions, answers;
  let pollsShow;
  let picUrl;

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

      let pollQuestionDetails = await pollQuestionData.json();
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
            const filteredAnswers = userAnswers
              .flat()
              .filter((answer) => answer.pollId === poll._id);
            const filterdAnswersArr = filteredAnswers
              .filter((v, i, a) => a.findIndex((v2) => v2._id === v._id) === i)
              .flat();

            return (
              <>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`${poll._id}`}
                    id={`${poll._id}`}
                  >
                    <Typography> {poll.pollName}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div key={poll._id}>
                      {/* <h1
                      style={{
                        textAlign: "center",
                        margin: "50px 0px",
                        textDecoration: "underline",
                        fontWeight: "bold",
                      }}
                    >
                      {poll.pollName}
                    </h1> */}
                      <h3>
                        number of participants :
                        {filterdAnswersArr.length / filterdQuestionsArr.length}
                      </h3>

                      {filterdQuestionsArr.map((question) => {
                        // here will be fetch get call that brings all specific question answers from server , and then we will present
                        // each question graph based on his answers.

                        let dataForChart = [];
                        return (
                          <Row
                            md={6}
                            key={question._id}
                            style={{
                              borderStyle: "solid",
                              margin: "5px 0px",
                            }}
                          >
                            <Col md={6}>
                              <p
                                style={{
                                  fontSize: "40px",
                                }}
                              >
                                {question.pollQuestion}
                                {/* {question.pollQuestionType ===
                                  "Image Question" &&
                                  question.pollQuestionImage.includes(
                                    "poll-it.cs.colman.ac.il"
                                  ) && {handleBadPic}

                                  } */}
                                {question.pollQuestionImage && (
                                  <img
                                    style={{
                                      width: "250px",
                                      height: "200px",
                                      borderRadius: "10px",
                                      marginLeft: "10px",
                                      marginTop: "5px",
                                    }}
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
                                    colors[
                                      Math.floor(Math.random() * colors.length)
                                    ];

                                  choosenColors.push(color);
                                  dataForChart.push({
                                    title: choice,
                                    value: 0,
                                    color: color,
                                  });

                                  return (
                                    <div key={choice}>
                                      <Box
                                        style={{
                                          backgroundColor: `${color}`,
                                        }}
                                      />
                                      {question.pollQuestionType !==
                                        "Image Answers" && choice.toString()}
                                      {question.pollQuestionType ===
                                        "Image Answers" && (
                                        <img
                                          src={choice}
                                          style={{
                                            width: "250px",
                                            height: "200px",
                                            borderRadius: "10px",
                                            marginBottom: "5px",
                                          }}
                                        />
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
                  </AccordionDetails>
                </Accordion>
              </>
            );
          })}
      </Container>
      <StickyFooter></StickyFooter>
    </div>
  );
};

export default AboutUs;
