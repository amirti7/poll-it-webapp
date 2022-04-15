import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import PollItLogo from "../assets/images/Logo.png";

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
  font-size: 100px;

  @media (max-width: 460px) {
    font-size: 65px;
  }
`;

const WelcomeDiv = (props) => {
  return (
    <div style={{ margin: "10px" }}>
      <Container>
        <Row md={6}>
          <Col md={6}>
            <Title>The Best way to gather information</Title>
            <p
              style={{
                fontSize: "30px",
              }}
            >
              With Poll-It you can make the best Polls and publish them to a
              small and unique sample group created specficlly for your poll.
            </p>
            <Button href="/signup" size="lg" variant="outline-dark">
              Sign-Up
            </Button>
          </Col>
          <Col md={6}>
            <Image src={PollItLogo}></Image>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default WelcomeDiv;
