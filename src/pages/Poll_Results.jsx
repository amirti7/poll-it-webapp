// import { PieChart } from "react-minimal-pie-chart";
// import styled from "styled-components";
// import { getFirestore, collection, getDocs } from "firebase/firestore";
// import "bootstrap/dist/css/bootstrap.css";
// import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
// import Button from "react-bootstrap/Button";
// import { useEffect, useState } from "react";
// import NavigationBar from "../components/NavigationBar";
// import StickyFooter from "../components/StickyFooter";

// const Box = styled.p`
//   height: 20px;
//   width: 20px;
//   margin-bottom: 15px;
//   border: 1px solid black;
// `;
// const Title = styled.p`
//   font-size: 70px;
//   text-align: center;

//   @media (max-width: 460px) {
//     font-size: 65px;
//   }
// `;
// const defaultLabelStyle = {
//   fontSize: "3px",
//   fontFamily: "sans-serif",
//   color: "white",
// };

// // interface Question {
// //   choices: string[];
// //   poll_question: string;
// //   poll_question_id: string;
// // }

// // interface Answer {
// //   answer: string;
// //   poll_question_id: string;}

// const AboutUs = (props) => {
//   const [questions, setQuestions] = useState < Question > [];
//   const [answers, setAnswers] = useState < Answer > [];

//   const db = getFirestore();

//   let fixedPercente;
//   let countAllAns;
//   const hashMap = new Map();
//   let filterdAns;
//   let dataForChart;
//   let choice1, choice2, choice3, choice4;
//   const colRef = collection(db, "answers");
//   const colRef2 = collection(db, "polls_questions");

//   useEffect(() => {
//     getDocs(colRef)
//       .then((snapshot) => {
//         const formattedSnapshots = snapshot.docs.map((doc) => {
//           const obj = {
//             answer: doc.get("answer"),
//             poll_question_id: doc.get("poll_question_id"),
//           };
//           return obj;
//         });
//         setAnswers(formattedSnapshots);
//       })
//       .catch((err) => {
//         console.log("err", err);
//       });

//     getDocs(colRef2)
//       .then((snapshot) => {
//         const formattedSnapshots = snapshot.docs.map((doc) => {
//           const obj = {
//             choices: doc.get("choices"),
//             poll_question: doc.get("poll_question"),
//             poll_question_id: doc.get("poll_question_id"),
//           };
//           return obj;
//         });
//         setQuestions(
//           formattedSnapshots.filter((question) => question.choices != null)
//         );
//       })
//       .catch((err) => {
//         console.log("err", err);
//       });
//   }, []);

//   return (
//     <div>
//       <NavigationBar></NavigationBar>
//       <Container>
//         <Title>Polls Analyze</Title>
//         {questions.map((obj) => {
//           {
//             filterdAns = answers.filter(
//               (ans) => obj.poll_question_id == ans.poll_question_id
//             );
//             console.log("filterdAns", filterdAns);

//             dataForChart = { ...obj.choices };
//             choice1 = dataForChart[0];
//             choice2 = dataForChart[1];
//             choice3 = dataForChart[2];
//             choice4 = dataForChart[3];
//             hashMap.set(choice1, 0);
//             hashMap.set(choice2, 0);
//             hashMap.set(choice3, 0);
//             hashMap.set(choice4, 0);
//             filterdAns.forEach((ans) => {
//               if (ans.answer.localeCompare(choice1) == 0) {
//                 hashMap.set(choice1, hashMap.get(choice1) + 1);
//               }
//               if (ans.answer.localeCompare(choice2) == 0) {
//                 hashMap.set(choice2, hashMap.get(choice2) + 1);
//               }
//               if (ans.answer.localeCompare(choice3) == 0) {
//                 hashMap.set(choice3, hashMap.get(choice3) + 1);
//               }
//               if (ans.answer.localeCompare(choice4) == 0) {
//                 hashMap.set(choice4, hashMap.get(choice4) + 1);
//               }
//             });
//             countAllAns = filterdAns.length;
//             console.log("countAllAns", countAllAns);
//             console.log("hashMap", hashMap.get(choice1));
//             console.log("hashMap", hashMap.get(choice2));
//             console.log("hashMap", hashMap.get(choice3));
//             console.log("hashMap", hashMap.get(choice4));
//           }
//           return (
//             <Row md={6} key={obj.poll_question_id}>
//               <Col md={6}>
//                 <p
//                   style={{
//                     fontSize: "40px",
//                   }}
//                 >
//                   {obj.poll_question}
//                 </p>
//                 <div
//                   style={{
//                     fontSize: "20px",
//                   }}
//                 >
//                   <Box style={{ backgroundColor: "#E38627" }} />
//                   {choice1}
//                   <br />
//                   <Box style={{ backgroundColor: "#C13C37" }} />
//                   {choice2}
//                   <br />
//                   <Box style={{ backgroundColor: "#6A2135" }} />
//                   {choice3}
//                   <br />
//                   <Box style={{ backgroundColor: "#FF4500" }} />
//                   {choice4}
//                   <br />
//                 </div>
//               </Col>
//               <Col md={6}>
//                 <PieChart
//                   radius={30}
//                   segmentsShift={1}
//                   label={({ dataEntry }) => {
//                     var fixedNum = Math.round(dataEntry.percentage) + "%";
//                     if (fixedNum == "0%") return null;
//                     return fixedNum;
//                   }}
//                   labelStyle={{
//                     ...defaultLabelStyle,
//                   }}
//                   data={[
//                     {
//                       title: choice1,
//                       value: hashMap.get(choice1),
//                       color: "#E38627",
//                     },
//                     {
//                       title: choice2,
//                       value: hashMap.get(choice2),
//                       color: "#C13C37",
//                     },
//                     {
//                       title: choice3,
//                       value: hashMap.get(choice3),
//                       color: "#6A2135",
//                     },
//                     {
//                       title: choice4,
//                       value: hashMap.get(choice4),
//                       color: "#FF4500",
//                     },
//                   ]}
//                 />
//               </Col>
//             </Row>
//           );
//         })}
//       </Container>
//       <StickyFooter></StickyFooter>
//     </div>
//   );
// };

// export default AboutUs;
