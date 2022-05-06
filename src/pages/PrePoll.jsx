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
import { MultiSelect } from "react-multi-select-component";

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

const educationLevelData = [
  { label: "Pre-School", value: "Preschool" },
  { label: "Elementary", value: "Elementary" },
  { label: "Middle School", value: "Middle School" },
  { label: "High School", value: "High School" },
  { label: "During Bachelor's", value: "During Bachelor's" },
  { label: "Bachelor's or Higher", value: "Bachelor's or Higher" },
];

const genderData = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
  { label: "Don't Wish To Specify", value: "Don't Wish To Specify" },
];

const ageRangeData = [
  { label: "11-20", value: "11-20" },
  { label: "21-30", value: "21-30" },
  { label: "31-40", value: "31-40" },
  { label: "41-50", value: "41-50" },
  { label: "51-60", value: "51-60" },
  { label: "61-70", value: "61-70" },
  { label: "71-80", value: "71-80" },
  { label: "81-90", value: "81-90" },
  { label: "More than 90", value: "More than 90" },
];

const maritalStatusData = [
  { label: "Single", value: "Single" },
  { label: "Married", value: "Married" },
  { label: "Widowed", value: "Widowed" },
  { label: "Divorced", value: "Divorced" },
  { label: "Separated", value: "Separated" },
];
const PrePoll = (props) => {
  const [educationLevel, setEducationLevel] = useState([]);
  const [gender, setGender] = useState([]);
  const [ageRange, setAgeRange] = useState([]);
  const [maritalStatus, setMaritalStatus] = useState([]);
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

    const data = await fetch("http://10.10.248.124:8000/auth/register", {
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
            <Title>Preliminary questionnaire </Title>
            <p
              style={{
                fontSize: "30px",
              }}
            >
              We need you to fill up the following questions to let us know what
              to expect when we will do our best to get you the ideal Poll
              analytics:
            </p>
          </Col>
          <Col md={6}>
            <Image src={PollItLogo}></Image>
          </Col>
        </Row>

        <form>
          <Row md={6}>
            <Col md={4}>
              <p>select your survey participants background:</p>
              <MultiSelect
                options={educationLevelData}
                value={educationLevel}
                onChange={setEducationLevel}
              />
              <p>select your survey participants gender :</p>
              <MultiSelect
                options={genderData}
                value={gender}
                onChange={setGender}
              />
              <p>select your survey participants age range :</p>
              <MultiSelect
                options={ageRangeData}
                value={ageRange}
                onChange={setAgeRange}
              />
            </Col>
            <Col md={4}>
              <p>select your survey participants martial status :</p>
              <MultiSelect
                options={maritalStatusData}
                value={maritalStatus}
                onChange={setMaritalStatus}
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

export default PrePoll;
