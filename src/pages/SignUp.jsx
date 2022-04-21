import { Container, Row, Col, Button } from "react-bootstrap";
import styled from "styled-components";
import NavigationBar from "../components/NavigationBar";
import StickyFooter from "../components/StickyFooter";
import PollItLogo from "../assets/images/Logo.png";
import { useState } from "react";

const Input = styled.input`
  width: 300px;
  margin-bottom: 10px;
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

const Title = styled.p`
  font-size: 80px;

  @media (max-width: 460px) {
    font-size: 65px;
  }
`;
const SignUp = (props) => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  async function handleRegirstation(e) {
    e.preventDefault();
    const dataToServer = {
      email: userEmail,
      password: userPassword,
      role: "Client",
    };

    const response = await fetch("http://localhost:8000/auth/register", {
      method: "POST",
      body: JSON.stringify(dataToServer),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
  }

  const handleEnteredEmail = (e) => {
    setUserEmail(e.target.value);
  };

  const handleEnteredPassword = (e) => {
    setUserPassword(e.target.value);
  };
  return (
    <div>
      <NavigationBar></NavigationBar>
      <Container>
        <Row md={6}>
          <Col md={6}>
            <Title>Sign-Up</Title>
            <p
              style={{
                fontSize: "50px",
              }}
            >
              Welcome Aboard!
            </p>
            <p
              style={{
                fontSize: "30px",
              }}
            >
              We are Really Happy you Choose To Join us , Lets start Our Journey
              Together with some Basic information :
            </p>
          </Col>
          <Col md={6}>
            <Image src={PollItLogo}></Image>
          </Col>
        </Row>

        <form>
          <Row md={6}>
            <Col md={4}>
              <p>Full Name:</p>
              <Input type="text" name="name" />
              <p>Address:</p>
              <Input type="text" name="address" />
              <p>Date Of Birth:</p>
              <Input type="date" name="dob" />
              <br></br>
            </Col>
            <Col md={4}>
              <p>Email:</p>
              <Input
                type="text"
                name="email"
                value={userEmail}
                onChange={(e) => handleEnteredEmail(e)}
              />
              <p>Password:</p>
              <Input
                type="password"
                name="password"
                value={userPassword}
                onChange={(e) => handleEnteredPassword(e)}
              />
              <p>Confirm Password:</p>
              <Input type="password" name="passwordConfirm" />
              <br></br>
            </Col>
            <Col md={4}>
              <p>Company Name:</p>
              <Input
                type="text"
                name="comapny"
                style={{ marginBottom: "50px" }}
              />

              <Button
                type="submit"
                variant="dark"
                onClick={(e) => handleRegirstation(e)}
                style={{ width: "300px" }}
              >
                I'm Done!
              </Button>
              <br></br>
            </Col>
          </Row>
          <Row style={{ marginTop: "50px" }}>
            <Col md={12}></Col>
          </Row>
        </form>
      </Container>
      <StickyFooter></StickyFooter>
    </div>
  );
};

export default SignUp;
