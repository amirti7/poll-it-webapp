import { Container, Row, Col, Button } from "react-bootstrap";
import styled from "styled-components";
import NavigationBar from "../components/NavigationBar";
import StickyFooter from "../components/StickyFooter";
import PollItLogo from "../assets/images/Logo.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Card } from "react-bootstrap";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { FacebookLoginButton } from "react-social-login-buttons";

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
const LoginPage = (props) => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState({
    isOpen: false,
    isLogin: false,
  });
  const [errorInLogin, setErrorInLogin] = useState({
    isOpen: false,
    errorMessage: "",
  });
  const [login, setLogin] = useState(false);

  const responseFacebook = (response) => {
    let status;
    // console.log(response);
    const dataToServer = {
      facebookId: response.id,
      email: response.email,
      name: response.name,
      profilePicUrl: response.picture.data.url,
      role: "Client",
    };
    fetch("https://poll-it.cs.colman.ac.il/auth/facebook", {
      method: "POST",
      body: JSON.stringify(dataToServer),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => data.json())
      .then((json) => {
        if (json.accessToken) {
          setIsLoggedIn({
            isOpen: true,
            isLogin: true,
          });
          localStorage.setItem("CheckedInUser", json.account.email);
          localStorage.setItem("UserAccessToken", json.accessToken);
          localStorage.setItem("UserRefreshToken", json.refreshToken);
          localStorage.setItem("UserId", json.account.facebookId);
          localStorage.setItem("LoggedInWithFacebook", true);
        } else {
          setErrorInLogin({
            isOpen: true,
            errorMessage: json.error,
          });
        }
      });
  };
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    const dataToServer = {
      email: userEmail,
      password: userPassword,
    };

    const response = await fetch("https://poll-it.cs.colman.ac.il/auth/login", {
      method: "POST",
      body: JSON.stringify(dataToServer),
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(response);
    const data = await response.json();
    console.log(data);
    if (response.ok) {
      setIsLoggedIn({
        isOpen: true,
        isLogin: true,
      });
      localStorage.setItem("CheckedInUser", data.account.email);
      localStorage.setItem("UserAccessToken", data.accessToken);
      localStorage.setItem("UserRefreshToken", data.refreshToken);
      localStorage.setItem("UserId", data.account._id);

      setUserEmail("");
      setUserPassword("");
    } else {
      setErrorInLogin({
        isOpen: true,
        errorMessage: data.error,
      });
    }
  }

  const handleEnteredEmail = (e) => {
    setUserEmail(e.target.value);
  };

  const handleEnteredPassword = (e) => {
    setUserPassword(e.target.value);
  };
  const handleCloseErrorModal = () => {
    setErrorInLogin({
      isOpen: false,
      errorMessage: "",
    });
  };

  const handleCloseLoginModal = () => {
    setIsLoggedIn({
      isOpen: false,
      isLogin: true,
    });
    navigate("/");
  };
  return (
    <div>
      <Modal
        open={errorInLogin.isOpen}
        onClose={handleCloseErrorModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Failed To Log-in:
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {errorInLogin.errorMessage}
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
        open={isLoggedIn.isOpen}
        onClose={handleCloseLoginModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Welcome
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            User is Logged In Successfully!
          </Typography>
          <Button
            variant="dark"
            style={{ width: "200px", marginLeft: "370px" }}
            onClick={handleCloseLoginModal}
          >
            Close
          </Button>
        </Box>
      </Modal>
      <NavigationBar></NavigationBar>
      <Container>
        <Row md={6}>
          <Col md={6}>
            <Image src={PollItLogo}></Image>
          </Col>
          <Col md={6}>
            <form autoComplete="off">
              <Title>Login</Title>
              <p
                style={{
                  fontSize: "20px",
                }}
              >
                Lets Start Our Experience Together!
              </p>
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

              <br></br>
              <Button
                variant="dark"
                style={{ width: "300px" }}
                onClick={(e) => handleLogin(e)}
              >
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
              <div class="container" style={{ borderRaduis: "8px" }}>
                <FacebookLogin
                  appId="1202513657162406"
                  autoLoad={false}
                  fields="name,email,picture"
                  scope="public_profile,user_friends,email"
                  callback={responseFacebook}
                  icon="fa-facebook"
                  render={(renderProps) => (
                    <FacebookLoginButton
                      onClick={renderProps.onClick}
                      style={{
                        width: "190px",
                        paddingLeft: "10px",
                      }}
                    />
                  )}
                />
              </div>
            </form>
          </Col>
        </Row>
      </Container>
      <StickyFooter></StickyFooter>
    </div>
  );
};

export default LoginPage;
