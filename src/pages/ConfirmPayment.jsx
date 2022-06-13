import { useLocation } from "react-router-dom";
import StickyFooter from "../components/StickyFooter";
import NavigationBar from "../components/NavigationBar";
import CreditCard from "../components/CreditCard";
import { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import PollItLogo from "../assets/images/Logo.png";
import styled from "styled-components";
import Confetti from "react-confetti";

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

const Title = styled.p`
  font-size: 80px;

  @media (max-width: 460px) {
    font-size: 65px;
  }
`;

const ConfirmPayment = (props) => {
  const location = useLocation();
  let updatedPoll = location.state.poll;
  let prePollToGet = JSON.parse(location.state.prePoll);
  // const prePoll = location.state.prePoll;
  let imgQuestion = null;
  let imgAnswers = [];
  const UserAccessToken = localStorage.getItem("UserAccessToken");
  const auth = "Bearer " + UserAccessToken;
  const [enteredAmountOfAccounts, setEnteredAmountOfAccount] = useState();
  const [maxAccounts, setMaxAccounts] = useState();
  const [priceOffer, setPriceOffer] = useState(0);
  const [readyToPay, setReadyToPay] = useState(false);
  const [coinsPerUser, setCoinsPerUser] = useState(0);
  const [PaymentDone, setPaymentDone] = useState(false);
  const [error, setError] = useState("");

  console.log(updatedPoll);
  console.log(prePollToGet);
  // console.log(prePoll);

  useEffect(() => {
    handleSampleGroupCount();
  }, []);

  const handleDonePayment = async () => {
    Object.assign(prePollToGet, {
      coins: coinsPerUser,
      maxUsers: enteredAmountOfAccounts,
    });
    console.log(prePollToGet);
    if (prePollToGet.image.includes("base64")) {
      const imageData = {
        file: prePollToGet.image,
      };
      const json = JSON.stringify(imageData);
      const data = await fetch("https://poll-it.cs.colman.ac.il/uploadBase64", {
        method: "POST",
        body: json,
        headers: {
          "Content-Type": "application/json",
          Authorization: auth,
        },
      });
      console.log(data);
      const pollImg = await data.json();
      prePollToGet["image"] = pollImg.url;
      console.log(prePollToGet);
    }

    const json = JSON.stringify(prePollToGet);
    console.log(json);

    const data = await fetch("https://poll-it.cs.colman.ac.il/poll/create", {
      method: "POST",
      body: json,
      headers: {
        "Content-Type": "application/json",
        Authorization: auth,
      },
    });

    // //new access token

    const pollId = await data.json();

    updatedPoll.questions.forEach(async (question) => {
      // console.log(question);
      // if (question.type === "Image Question") {
      //   if (question.questionPic.includes("base64")) {
      //     const imageData = {
      //       file: question.questionPic,
      //     };
      //     const json = JSON.stringify(imageData);
      //     const data = await fetch(
      //       "https://poll-it.cs.colman.ac.il/uploadBase64",
      //       {
      //         method: "POST",
      //         body: json,
      //         headers: {
      //           "Content-Type": "application/json",
      //           Authorization: auth,
      //         },
      //       }
      //     );
      //     console.log(data);
      //     const questionImg = await data.json();
      //     question["questionPic"] = questionImg.url;
      //   }
      // } else if (question.type === "Image Answers") {
      //   question.answers.forEach(async (answer, index) => {
      //     if (answer.includes("base64")) {
      //       const imageData = {
      //         file: answer,
      //       };
      //       const json = JSON.stringify(imageData);
      //       const data = await fetch(
      //         "https://poll-it.cs.colman.ac.il/uploadBase64",
      //         {
      //           method: "POST",
      //           body: json,
      //           headers: {
      //             "Content-Type": "application/json",
      //             Authorization: auth,
      //           },
      //         }
      //       );
      //       console.log(data);
      //       const ansImg = await data.json();
      //       question.answers[index] = ansImg.url;
      //     }
      //   });
      // }
      let data;
      if (imgQuestion != null) {
        data = {
          pollQuestion: question.questionName,
          pollQuestionType: question.type,
          pollQuestionImage: imgQuestion,
          choices: question.answers,
          pollId: pollId,
        };
      } else {
        data = {
          pollQuestion: question.questionName,
          pollQuestionType: question.type,
          pollQuestionImage: question.questionPic,
          choices: question.answers,
          pollId: pollId,
        };
      }
      fetch("https://poll-it.cs.colman.ac.il/poll_question/create", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: auth,
        },
      })
        .then((response) => {
          const res = response.json();
          console.log(res);
        })
        .then((data) => console.log(data));
    });
    setPaymentDone(true);
  };

  const calculatePriceOffer = () => {
    let price = 0.1;
    const numOfQuestions = updatedPoll.questions.length;

    //Base Price
    if (numOfQuestions != 1) {
      price = 1;
      // Age/Gender
      if (prePollToGet.age.length != 9 || prePollToGet.gender.length != 3) {
        price += 0.5;
      }
    } else {
      if (prePollToGet.age.length != 9 || prePollToGet.gender.length != 3) {
        price += 0.05;
      }
    }

    //extra Price

    // Maritial/Children
    if (
      prePollToGet.maritalStatus.length != 5 ||
      prePollToGet.numberOfChildrens.length != 7
    ) {
      if (numOfQuestions > 5) {
        price += 1;
      } else {
        price += 0.5;
      }
    }

    // Job/Income/Studies
    if (
      prePollToGet.permanentJob.length != 2 ||
      prePollToGet.income.length != 5 ||
      prePollToGet.educationLevel.length != 6
    ) {
      if (numOfQuestions > 5) {
        price += 1;
      } else {
        price += 0.5;
      }
    }

    return price * enteredAmountOfAccounts;
  };

  function handlePayment() {
    if (
      enteredAmountOfAccounts === undefined ||
      enteredAmountOfAccounts === "" ||
      enteredAmountOfAccounts === "0" ||
      enteredAmountOfAccounts > maxAccounts ||
      parseInt(enteredAmountOfAccounts) === 0
    ) {
      setError("Please fill in valid number!");
      return;
    }
    setError("");
    setReadyToPay(true);
  }

  const handlePriceOffer = () => {
    if (
      enteredAmountOfAccounts === undefined ||
      enteredAmountOfAccounts === "" ||
      enteredAmountOfAccounts > maxAccounts ||
      enteredAmountOfAccounts === "0"
    ) {
      setError("Please fill in valid number!");
      setReadyToPay(false);
      setPriceOffer(0);
      return;
    }
    setError("");
    const price = calculatePriceOffer().toFixed(2);
    setPriceOffer(price);
    const coins = (price / 2 / enteredAmountOfAccounts) * 23;
    setCoinsPerUser(Math.round(coins));
    console.log(Math.round(coins));
  };

  async function handleSampleGroupCount() {
    const data = await fetch(
      `https://poll-it.cs.colman.ac.il/auth/getAccountsCountBySampleGroup?age=${encodeURIComponent(`
        [${prePollToGet.age.map((item) => {
          return `"${item}"`;
        })}]`)}
        &gender=${encodeURIComponent(
          `[${prePollToGet.gender.map((item) => {
            return `"${item}"`;
          })}]`
        )}
        &educationLevel=${encodeURIComponent(
          `[${prePollToGet.educationLevel.map((item) => {
            return `"${item}"`;
          })}]`
        )}
        &numberOfChildrens=${encodeURIComponent(
          `[${prePollToGet.numberOfChildrens.map((item) => {
            return `"${item}"`;
          })}]`
        )}&permanentJob=${encodeURIComponent(
        `[${prePollToGet.permanentJob.map((item) => {
          return `"${item}"`;
        })}]`
      )}&income=${encodeURIComponent(
        `[${prePollToGet.income.map((item) => {
          return `"${item}"`;
        })}]`
      )}`,
      {
        method: "GET",
        headers: {
          Authorization: auth,
        },
      }
    );
    const accountsCount = await data.json();
    setMaxAccounts(accountsCount.accountsCount);
    console.log(accountsCount);
  }

  return (
    <div>
      <NavigationBar />
      <Container>
        <Row md={6}>
          <Col md={6}>
            <Title>Price Offer</Title>
            <p
              style={{
                fontSize: "30px",
              }}
            >
              Before We Submit Your Entered Poll , we need you to give us few
              more details and we will give you a price offer for your desired
              poll:
            </p>
            <div>
              <label>Amout of people you want to answer your poll:</label>
              <input
                style={{ width: "70px" }}
                value={enteredAmountOfAccounts}
                max={maxAccounts}
                onChange={(e) => setEnteredAmountOfAccount(e.target.value)}
                onBlur={handlePriceOffer}
              ></input>
              <label>/</label>
              <input
                disabled
                value={maxAccounts}
                style={{ width: "70px" }}
              ></input>
              <label>possible</label>
            </div>
            {error && (
              <>
                <p style={{ color: "red" }}>{error}</p>
              </>
            )}

            <br />
            <br />
            <div>
              <h5>Our Proposal:</h5>
              <label style={{ color: "orange", fontSize: "50px" }}>
                {priceOffer}$
              </label>
            </div>
            <div>
              <Button
                variant="warning"
                style={{ border: "1px solid" }}
                onClick={handlePayment}
              >
                confirm and Procced to checkout
              </Button>
            </div>
            <div>
              <br />
              {readyToPay && <CreditCard onClickPay={handleDonePayment} />}
              {PaymentDone && (
                <div>
                  <Confetti />
                  <big
                    style={{
                      color: "green",
                    }}
                  >
                    payment done!
                  </big>
                </div>
              )}
            </div>
          </Col>
          <Col md={6}>
            <Image src={PollItLogo}></Image>
          </Col>
        </Row>
        <Row md={6}></Row>
      </Container>

      <StickyFooter />
    </div>
  );
};

export default ConfirmPayment;
