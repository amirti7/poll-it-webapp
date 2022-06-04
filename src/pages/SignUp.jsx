import { Container, Row, Col, Button } from "react-bootstrap";
import styled from "styled-components";
import NavigationBar from "../components/NavigationBar";
import StickyFooter from "../components/StickyFooter";
import PollItLogo from "../assets/images/Logo.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Dropdown from "react-bootstrap/Dropdown";

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
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "600px",
  heigth: "600px",
  bgcolor: "#A9A9A9",
  border: "2px solid #000",
  borderRadius: ".8rem",
  boxShadow: 24,
};
const SignUp = (props) => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const navigate = useNavigate();

  const [isSignedUp, setIsSignedUp] = useState({
    isOpen: false,
    isSignedUp: false,
  });
  const [errorInSignUp, setErrorInSignUp] = useState({
    isOpen: false,
    errorMessage: "",
  });

  async function handleRegirstation() {
    if (userAddress.trim() === "" || userName.trim() === "") {
      setErrorInSignUp({
        isOpen: true,
        errorMessage: "Not all The Fields are Filled , Please Fill all Fields!",
      });
      return;
    }
    const dataToServer = {
      email: userEmail,
      password: userPassword,
      role: "Client",
      name: userName,
      address: userAddress,
    };
    const json = JSON.stringify(dataToServer);
    console.log(json);

    const data = await fetch("https://poll-it.cs.colman.ac.il/auth/register", {
      method: "POST",
      body: json,
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(data);
    if (data.ok) {
      setIsSignedUp({
        isOpen: true,
        isSignedUp: true,
      });
    } else {
      const jsonData = await data.json();
      console.log(jsonData);
      setErrorInSignUp({
        isOpen: true,
        errorMessage: JSON.stringify(jsonData.erros),
      });
    }
  }

  const handleEnteredEmail = (e) => {
    setUserEmail(e.target.value);
  };

  const handleEnteredPassword = (e) => {
    setUserPassword(e.target.value);
  };

  const handleEnteredName = (e) => {
    setUserName(e.target.value);
  };

  const handleEnteredAddress = (e) => {
    setUserAddress(e.target.value);
  };

  const handleCloseErrorModal = () => {
    setErrorInSignUp({
      isOpen: false,
      errorMessage: "",
    });
  };

  const handleCloseSignUpModal = () => {
    setIsSignedUp({
      isOpen: false,
      isSignedUp: true,
    });
    navigate("/login");
  };
  return (
    <div>
      <Modal
        open={errorInSignUp.isOpen}
        onClose={handleCloseErrorModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Failed To Sign-Up:
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {errorInSignUp.errorMessage}
          </Typography>
          <Button
            variant="dark"
            style={{ width: "200px", marginLeft: "370px" }}
            onClick={handleCloseErrorModal}
          >
            Close
          </Button>
        </Box>
      </Modal>
      <Modal
        open={isSignedUp.isOpen}
        onClose={handleCloseSignUpModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Welcome
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            User Signed Up Successfully!
          </Typography>
          <Button
            variant="dark"
            style={{ width: "200px", marginLeft: "370px" }}
            onClick={handleCloseSignUpModal}
          >
            Close
          </Button>
        </Box>
      </Modal>
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
              <Input
                type="text"
                name="name"
                value={userName}
                onChange={(e) => handleEnteredName(e)}
              />
              <p>Address:</p>
              <Input
                type="text"
                name="address"
                value={userAddress}
                onChange={(e) => handleEnteredAddress(e)}
              />
              <p>Email:</p>
              <Input
                type="text"
                name="email"
                value={userEmail}
                onChange={(e) => handleEnteredEmail(e)}
              />
            </Col>
            <Col md={4}>
              <p>Password:</p>
              <Input
                type="password"
                name="password"
                value={userPassword}
                onChange={(e) => handleEnteredPassword(e)}
              />
              <br></br>
              <p>Press Here To Sign Up:</p>
              <Button
                variant="dark"
                onClick={handleRegirstation}
                style={{ width: "300px" }}
              >
                I'm Done!
              </Button>
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
