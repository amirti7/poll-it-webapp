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

  console.log(updatedPoll);
  console.log(prePoll);

  useEffect(() => {
    handleSampleGroupCount();
  }, []);

  const calculatePriceOffer = () => {};

  async function handlePayment() {
    setReadyToPay(true);
  }

  const handlePriceOffer = (event) => {
    setEnteredAmountOfAccount(event.target.value);
    setPriceOffer(calculatePriceOffer());
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
                onChange={(e) => handlePriceOffer(e)}
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
