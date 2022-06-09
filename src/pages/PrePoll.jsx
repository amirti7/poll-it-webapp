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
import SyncLoader from "react-spinners/SyncLoader";
import PacmanLoader from "react-spinners/PacmanLoader";
import HashLoader from "react-spinners/HashLoader";
import MoonLoader from "react-spinners/MoonLoader";
import { FadeLoader } from "react-spinners";
import TextField from "@mui/material/TextField";
import ImgToBase64 from "../components/ImgToBase64";

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
  { label: "During Bachelor's", value: "During Bachelors" },
  { label: "Bachelor's or Higher", value: "Bachelors or Higher" },
];

const genderData = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
  { label: "Don't Wish To Specify", value: "Dont Wish To Specify" },
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
  { label: "5,001-10,000", value: "5,001-10,000" },
  { label: "10,001-20,000", value: "10,001-20,000" },
  { label: "20,001-30,000", value: "20,001-30,000" },
  { label: "More than 30,000", value: "More than 30,000" },
];

const permanentJobData = [
  { label: "Yes", value: "Yes" },
  { label: "No", value: "No" },
];
const PrePoll = (props) => {
  const [educationLevel, setEducationLevel] = useState(educationLevelData);
  const [gender, setGender] = useState(genderData);
  const [ageRange, setAgeRange] = useState(ageRangeData);
  const [maritalStatus, setMaritalStatus] = useState(maritalStatusData);
  const [numOfKids, setNumOfKids] = useState(numOfKidsData);
  const [income, setIncome] = useState(incomeData);
  const [permanentJob, setPermanentJob] = useState(permanentJobData);
  const [pollName, setPollName] = useState("");
  const [loading, setLoading] = useState(false);
  const [validPicture, setValidPicture] = useState(true);
  const [uploadedPic, setUploadedPic] = useState(false);
  const [enteredPollPic, setEnteredPollPic] = useState("");

  const navigate = useNavigate();
  const userID = localStorage.getItem("UserId");
  let prePollData;

  const accessToken = localStorage.getItem("UserAccessToken");

  const closeLoaderIn2Seconds = () => {
    setTimeout(() => {
      setLoading(!loading);
      navigate("/NewPoll", { state: { prePoll: prePollData } }); // delete after returning the POST call
    }, 2000);
  };

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
      pollName.trim() === "" ||
      enteredPollPic === ""
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
      image: enteredPollPic,
      age: ageRange.map((item) => item.value),
      gender: gender.map((item) => item.value),
      educationLevel: educationLevel.map((item) => item.value),
      maritalStatus: maritalStatus.map((item) => item.value),
      numberOfChildrens: numOfKids.map((item) => item.value),
      permanentJob: permanentJob.map((item) => item.value),
      income: income.map((item) => item.value),
    };
    const json = JSON.stringify(dataToServer);
    console.log(json);
    prePollData = json;
    setLoading(true);
    closeLoaderIn2Seconds();

    // const data = await fetch("https://poll-it.cs.colman.ac.il/poll/create", {
    //   method: "POST",
    //   body: json,
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: auth,
    //   },
    // });
    // console.log(data);
    // const pollId = await data.json();
    // if (data.ok) {
    //   localStorage.setItem("ActivePollId", pollId._id);
    //   setIsSignedUp({
    //     isOpen: true,
    //     isSignedUp: true,
    //   });
    // } else {
    //   const jsonData = await data.json();
    //   console.log(jsonData);
    //   setErrorInSignUp({
    //     isOpen: true,
    //     errorMessage: JSON.stringify(jsonData.erros),
    //   });
    // }
  }

  const imgTo64Base = (img) => {
    console.log(img);
    handlePollPic(img);
    setEnteredPollPic(img);
    setUploadedPic(true);
  };

  const isImgLink = (url) => {
    if (typeof url !== "string") {
      return false;
    }
    let isImg =
      url.match(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gim) ||
      url.includes("base64");
    return isImg;
  };

  const isValidURL = (string) => {
    if (string === "") {
      setValidPicture(true);
      return true;
    }
    if (!isImgLink(string)) {
      setValidPicture(false);
      return false;
    }
    setValidPicture(true);
    return true;
  };

  const handlePollPic = (e) => {
    if (typeof e === "object") {
      const finalPath = e.target.value;
      setEnteredPollPic(finalPath);
      if (!isImgLink(finalPath)) {
        setValidPicture(false);
        // setQuestion((prevState) => {
        //   return {
        //     questionName: prevState.questionName,
        //     questionPic: finalPath,
        //     answers: [...prevState.answers],
        //     type: prevState.type,
        //   };
        // });
        return;
      }
      setEnteredPollPic(finalPath);
      // setQuestion((prevState) => {
      //   return {
      //     questionName: prevState.questionName,
      //     questionPic: finalPath,
      //     answers: [...prevState.answers],
      //     type: prevState.type,
      //   };
      // });
    } else {
      const finalPath = e;
      if (e === null) setEnteredPollPic(finalPath);
      // setQuestion((prevState) => {
      //   return {
      //     questionName: prevState.questionName,
      //     questionPic: finalPath,
      //     answers: [...prevState.answers],
      //     type: prevState.type,
      //   };
      // });
    }
  };

  const handleClearPicture = () => {
    setEnteredPollPic("");
    setUploadedPic(!uploadedPic);
    // document.getElementById("image-input").children.value = null;
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

    navigate("/NewPoll", { state: { prePoll: prePollData } });
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
            Preliminary questionnaire
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            questionnaire has been completed , you are been forward to the poll
            creation
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

      <Modal
        open={loading}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Typography
          id="modal-modal-description"
          sx={{ mt: 2 }}
          style={{ position: "absolute", top: "50%", left: "50%" }}
        >
          <SyncLoader loading={loading} size={25} color={"#D7A136"} />
        </Typography>
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

        <form autoComplete="off">
          <Row md={6}>
            <Col md={4}>
              <p>select your survey participants background:</p>
              <MultiSelect
                options={educationLevelData}
                value={educationLevel}
                onChange={setEducationLevel}
              />
              <p style={{ marginTop: "16px" }}>
                select your survey participants gender :
              </p>
              <MultiSelect
                options={genderData}
                value={gender}
                onChange={setGender}
              />
              <p style={{ marginTop: "16px" }}>
                select your survey participants age range :
              </p>
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
              <p style={{ marginTop: "16px" }}>
                select your survey participants number of childrens :
              </p>
              <MultiSelect
                options={numOfKidsData}
                value={numOfKids}
                onChange={setNumOfKids}
              />
              <p style={{ marginTop: "16px" }}>
                select your survey participants income :
              </p>
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
              <p style={{ marginTop: "16px" }}>Please Enter Your Poll Name:</p>
              <Input
                type="text"
                name="name"
                value={pollName}
                onChange={(e) => setPollName(e.target.value)}
              />
              {!uploadedPic && (
                <>
                  <label style={{ marginTop: "16px" }}>
                    Please enter your Poll picture via valid URL or Upload
                    Picture:
                  </label>
                  <TextField
                    error={!validPicture}
                    variant="filled"
                    value={enteredPollPic}
                    onChange={(e) => handlePollPic(e)}
                    onBlur={(e) => isValidURL(e.target.value)}
                    label="Picture"
                    helperText={!validPicture && " URL is not Valid"}
                  />
                </>
              )}
              <ImgToBase64 setImage={imgTo64Base} />
              {uploadedPic && (
                <>
                  <p style={{ color: "green" }}>picture has been uploaded!</p>
                  <button onClick={handleClearPicture}>clear Picture</button>
                </>
              )}

              <p style={{ marginTop: "16px" }}>
                Press Here To Continue to set your Poll Questions:
              </p>
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
