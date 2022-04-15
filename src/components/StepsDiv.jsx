import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Image = styled.img`
  @media (max-width: 1700px) {
    width: 200px;
    height: 200px;
    margin-left: 120px;
  }
  @media (max-width: 400px) {
    width: 100px;
    height: 100px;
    margin-left: 120px;
  }
`;

const StepsDiv = (props) => {
  return (
    <div style={{ marginTop: "160px", marginBottom: "160px" }}>
      <Container>
        <Row md={6}>
          <Col md={6}>
            <Image
              style={{ marginLeft: "85px", height: "200px", width: "200px" }}
              src="https://www.nvidia.cn/content/dam/en-zz/es_em/es_em/Solutions/Data-Center/gpu-ready-apps/data-center-gpu-ready-app-instructions-udtm.svg"
            ></Image>
            <p
              style={{
                fontSize: "50px",
                marginLeft: "70px",
              }}
            >
              Easy Process
            </p>
            <p
              style={{
                fontSize: "60px",
                marginLeft: "165px",
              }}
            >
              &#8595;
            </p>
            <p
              style={{
                fontSize: "50px",
                marginLeft: "70px",
              }}
            >
              Best Outcome!
            </p>
          </Col>
          <Col md={6}>
            <p
              style={{
                fontSize: "50px",
                marginLeft: "0px",
              }}
            >
              Step 1
            </p>
            <p
              style={{
                fontSize: "20px",
                marginLeft: "0px",
              }}
            >
              Sign Up to Poll-It and answer quick Preliminary questionnaire to
              let us Know you
            </p>
            <hr style={{ border: "5px solid black" }} />
            <p
              style={{
                fontSize: "50px",
                marginLeft: "0px",
              }}
            >
              Step 2
            </p>
            <p
              style={{
                fontSize: "20px",
                marginLeft: "0px",
              }}
            >
              Tell us What Kind of Poll you want us to do for you
            </p>
            <hr style={{ border: "5px solid black" }} />
            <p
              style={{
                fontSize: "50px",
                marginLeft: "0px",
              }}
            >
              Step 3
            </p>
            <p
              style={{
                fontSize: "20px",
                marginLeft: "0px",
              }}
            >
              Get the results straight to your computer / mobile according to
              your Plan with us
            </p>
            <hr style={{ border: "5px solid black" }} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default StepsDiv;
