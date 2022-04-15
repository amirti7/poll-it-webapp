import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";
import NavigationBar from "../components/NavigationBar";
import StickyFooter from "../components/StickyFooter";
import PollItLogo from "../assets/images/Logo.png";

const Input = styled.input`
  width: 300px;
  margin-bottom: 10px;
`;

const Image = styled.img`
  @media (min-width: 100px) {
    width: 300px;
    height: 300px;
  }
  @media (min-width: 768px) {
    width: 390px;
    height: 500px;
  }

  @media (min-width: 1300px) {
    width: 600px;
    height: 560px;
    // margin-left: -40px;
  }
`;

const Title = styled.p`
  font-size: 80px;

  @media (max-width: 460px) {
    font-size: 65px;
  }
`;
const LoginPage = (props) => {
  return (
    <div>
      <NavigationBar></NavigationBar>
      <Container>
        <Row md={6}>
          <Col md={6}>
            <Image src={PollItLogo}></Image>
          </Col>
          <Col md={6}>
            <Title>Login</Title>
            <p
              style={{
                fontSize: "20px",
              }}
            >
              Lets Start Our Experience Together!
            </p>
            <p>Email:</p>
            <Input type="text" name="email" />
            <p>Password:</p>
            <Input type="password" name="password" />
            <br></br>
            <Button variant="dark" style={{ width: "300px" }}>
              Login
            </Button>
            <p style={{ marginTop: "20px" }}>
              You are Not a Member Yet?
              <Button
                variant="outline-dark"
                style={{ width: "155px" }}
                href="/signup"
              >
                Sign-Up
              </Button>
            </p>
          </Col>
        </Row>
      </Container>
      <StickyFooter></StickyFooter>
    </div>
  );
};

export default LoginPage;
