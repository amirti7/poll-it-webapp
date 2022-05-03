import { Container, Row, Col, Button } from "react-bootstrap";
import NavigationBar from "../components/NavigationBar";
import StickyFooter from "../components/StickyFooter";
import PollItLogo from "../assets/images/Logo.png";
import styled from "styled-components";


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


const UserProfile = (props) => {
  const userID = localStorage.getItem("UserID");
  const UserAccessToken = localStorage.getItem("UserAccessToken")
  const json = JSON.stringify(userID)

  const response = await fetch("http://10.10.248.124:8000/details/getDetailsByAccount/"+json, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " +UserAccessToken
      },
    });

  return (
    <div>
        <NavigationBar></NavigationBar>
        <Container>
          <div>
          <Row md={6}>
          <Col md={6}>
            <Image src={PollItLogo}></Image>
          </Col>
          <Col md={6}>
          <Title>My Profile</Title>
           
            <p
              style={{
                fontSize: "20px",
              }}
            >
              full name:
            </p>
            <p></p>

            <p
              style={{
                fontSize: "20px",
              }}
            >
              address:
            </p>
            <p>user address</p>
            
            <p
              style={{
                fontSize: "20px",
              }}
            >
              date of birth:
            </p>
            <p>user date of birth</p>

            <p
              style={{
                fontSize: "20px",
              }}
            >
              email:
            </p>
            <p>userEmail@gmail.com</p>

            <p
              style={{
                fontSize: "20px",
              }}
            >
              company name:
            </p>
            <p>company name</p>


            <Button
              variant="dark"
              style={{ width: "300px" }}
              //onClick={(e) => handleLogin(e)}
            >
              edit profile
            </Button>
          </Col>
          </Row>
          </div>
        </Container>
        <StickyFooter></StickyFooter>
    </div>
  );
};

export default UserProfile;