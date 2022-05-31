import { useLocation } from "react-router-dom";
import StickyFooter from "../components/StickyFooter";
import NavigationBar from "../components/NavigationBar";
import CreditCard from "../components/CreditCard";
import { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import PollItLogo from "../assets/images/Logo.png";
import styled from "styled-components";

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
  let maxAccounts;
  const location = useLocation();
  const updatedPoll = location.state.poll;
  const prePoll = JSON.parse(location.state.prePoll);
  const UserAccessToken = localStorage.getItem("UserAccessToken");
  const auth = "Bearer " + UserAccessToken;
  const [enteredAmountOfAccounts, setEnteredAmountOfAccount] = useState();
  const [priceOffer, setPriceOffer] = useState(0);
  const [readyToPay, setReadyToPay] = useState(false);
  const [coinsPerUser, setCoinsPerUser] = useState(0);

  // console.log(updatedPoll);
  // console.log(prePoll);

  useEffect(() => {
    handleSampleGroupCount();
  }, []);

  const calculatePriceOffer = () => {
    let price = 0.1;
    const numOfQuestions = updatedPoll.questions.length;

    //Base Price
    if (numOfQuestions != 1) {
      price = 1;
      // Age/Gender
      if (prePoll.age.length != 9 || prePoll.gender.length != 3) {
        price += 0.5;
      }
    } else {
      if (prePoll.age.length != 9 || prePoll.gender.length != 3) {
        price += 0.05;
      }
    }

    //extra Price

    // Maritial/Children
    if (
      prePoll.maritalStatus.length != 5 ||
      prePoll.numberOfChildrens.length != 7
    ) {
      if (numOfQuestions > 5) {
        price += 1;
      } else {
        price += 0.5;
      }
    }

    // Job/Income/Studies
    if (
      prePoll.permanentJob.length != 2 ||
      prePoll.income.length != 5 ||
      prePoll.educationLevel.length != 6
    ) {
      if (numOfQuestions > 5) {
        price += 1;
      } else {
        price += 0.5;
      }
    }

    return price * enteredAmountOfAccounts;
  };

  async function handlePayment() {
    setReadyToPay(true);
  }

  const handlePriceOffer = () => {
    const price = calculatePriceOffer();
    setPriceOffer(price);
    const coins = (priceOffer / 2 / enteredAmountOfAccounts) * 23;
    setCoinsPerUser(coins);
  };

  async function handleSampleGroupCount() {
    // const data = await fetch(
    //   `https://10.10.248.124:443/auth/getAccountsCountBySampleGroup?age=${encodeURIComponent(`
    //     [${prePoll.age.map((item) => {
    //       return `"${item}"`;
    //     })}]`)}
    //     &gender=${encodeURIComponent(
    //       `[${prePoll.gender.map((item) => {
    //         return `"${item}"`;
    //       })}]`
    //     )}
    //     &educationLevel=${encodeURIComponent(
    //       `[${prePoll.educationLevel.map((item) => {
    //         return `"${item}"`;
    //       })}]`
    //     )}
    //     &numberOfChildrens=${encodeURIComponent(
    //       `[${prePoll.numberOfChildrens.map((item) => {
    //         return `"${item}"`;
    //       })}]`
    //     )}&permanentJob=${encodeURIComponent(
    //     `[${prePoll.permanentJob.map((item) => {
    //       return `"${item}"`;
    //     })}]`
    //   )}&income=${encodeURIComponent(
    //     `[${prePoll.income.map((item) => {
    //       return `"${item}"`;
    //     })}]`
    //   )}`,
    //   {
    //     method: "GET",
    //     headers: {
    //       Authorization: auth,
    //     },
    //   }
    // );
    // const accountsCount = await data.json();
    // maxAccounts = accountsCount;
    // console.log(accountsCount);
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
                value={enteredAmountOfAccounts}
                onChange={(e) => setEnteredAmountOfAccount(e.target.value)}
                onBlur={handlePriceOffer}
              ></input>
              <label>/</label>
              <input disabled value={maxAccounts}></input>
              <label>possible</label>
            </div>
            <br />
            <br />
            <div>
              <h5>Our Proposal:</h5>
              <label style={{ color: "orange", fontSize: "50px" }}>
                {priceOffer}$
              </label>
            </div>
            <div>
              <button onClick={handlePayment}>
                confirm and Procced to checkout
              </button>
            </div>
            <div>
              <p></p>
              <CreditCard></CreditCard>
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
