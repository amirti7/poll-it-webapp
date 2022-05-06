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
const numOfKidsData = [
  { label: "0", value: "0" },
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
  { label: "5", value: "5" },
  { label: "More than 5", value: "More than 5" },
];

const incomeData = [
  { label: "0-5,000", value: "0-5,000" },
  { label: "5,000-10,000", value: "5,000-10,000" },
  { label: "10,000-20,000", value: "10,000-20,000" },
  { label: "20,000-30,000", value: "20,000-30,000" },
  { label: "More than 30,000", value: "More than 30,000" },
];

const permanentJobData = [
  { label: "Yes", value: "Yes" },
  { label: "No", value: "No" },
];
const PrePoll = (props) => {
  const [educationLevel, setEducationLevel] = useState([]);
  const [gender, setGender] = useState([]);
  const [ageRange, setAgeRange] = useState([]);
  const [maritalStatus, setMaritalStatus] = useState([]);
  const [numOfKids, setNumOfKids] = useState([]);
  const [income, setIncome] = useState([]);
  const [permanentJob, setPermanentJob] = useState([]);
  const [pollName, setPollName] = useState("");
  const navigate = useNavigate();
  const userID = localStorage.getItem("UserId");

  const accessToken = localStorage.getItem("UserAccessToken");

  const auth = "Bearer " + accessToken;
  const [isSignedUp, setIsSignedUp] = useState({
    isOpen: false,
    isSignedUp: false,
  });
  const [errorInSignUp, setErrorInSignUp] = useState({
    isOpen: false,
    errorMessage: "",
  });

  async function handlePrePollRegister() {
    if (
      educationLevel.length === 0 ||
      gender.length === 0 ||
      ageRange.length === 0 ||
      maritalStatus.length === 0 ||
      numOfKids.length === 0 ||
      income.length === 0 ||
      permanentJob.length === 0 ||
      pollName.trim() === ""
    ) {
      setErrorInSignUp({
        isOpen: true,
        errorMessage: "Not all The Fields are Filled , Please Fill all Fields!",
      });
      return;
    }
    const dataToServer = {
      pollName: pollName,
      accountId: userID,
      gender: gender.map((item) => item.value),
      educationLevel: educationLevel.map((item) => item.value),
      maritalStatus: maritalStatus.map((item) => item.value),
      numberOfChildrens: numOfKids.map((item) => item.value),
      permanentJob: permanentJob.map((item) => item.value),
      income: income.map((item) => item.value),
    };
    const json = JSON.stringify(dataToServer);
    console.log(json);

    const data = await fetch("http://10.10.248.124:8000/poll/create", {
      method: "POST",
      body: json,
      headers: {
        "Content-Type": "application/json",
        Authorization: auth,
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
    navigate("/NewPoll");
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
              <p>select your survey participants number of childrens :</p>
              <MultiSelect
                options={numOfKidsData}
                value={numOfKids}
                onChange={setNumOfKids}
              />
              <p>select your survey participants income :</p>
              <MultiSelect
                options={incomeData}
                value={income}
                onChange={setIncome}
              />
            </Col>
            <Col md={4}>
              <p>Does youur survey participants has a permanent job ?</p>
              <MultiSelect
                options={permanentJobData}
                value={permanentJob}
                onChange={setPermanentJob}
              />
              <p>Please Enter Your Poll Name:</p>
              <Input
                type="text"
                name="name"
                value={pollName}
                onChange={(e) => setPollName(e.target.value)}
              />
              <p>Press Here To Continue to set your Poll Questions:</p>
              <Button
                variant="dark"
                onClick={handlePrePollRegister}
                style={{ width: "300px" }}
              >
                Continue
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
