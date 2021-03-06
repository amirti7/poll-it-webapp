import "bootstrap/dist/css/bootstrap.css";
import { Nav, Navbar, Button } from "react-bootstrap";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PollItLogo from "../assets/images/Logo.png";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { newAccessToken } from "../components/Utils";

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

const NavigationBar = (props) => {
  const user = localStorage.getItem("CheckedInUser");
  const isFacebookUser = localStorage.getItem("LoggedInWithFacebook");
  const [userCheckedOut, setUserCheckedOut] = useState(false);

  async function signOut() {
    if (localStorage.getItem("LoggedInWithFacebook")) {
      window.FB.logout();
      localStorage.removeItem("CheckedInUser");
      localStorage.removeItem("UserAccessToken");
      localStorage.removeItem("UserRefreshToken");
      localStorage.removeItem("UserId");
      localStorage.removeItem("LoggedInWithFacebook");
      setUserCheckedOut(true);
      return;
    }
    let resData;

    const dataToServer = {
      refreshToken: localStorage.getItem("UserRefreshToken"),
    };

    const access = localStorage.getItem("UserAccessToken");

    const auth = "Bearer " + access;

    const json = JSON.stringify(dataToServer);

    const response = await fetch(
      "https://poll-it.cs.colman.ac.il/auth/logout",
      {
        method: "POST",
        body: json,
        headers: {
          "Content-Type": "application/json",
          Authorization: auth,
        },
      }
    );

    if (response.ok) {
      localStorage.removeItem("CheckedInUser");
      localStorage.removeItem("UserAccessToken");
      localStorage.removeItem("UserRefreshToken");
      localStorage.removeItem("UserId");
      localStorage.removeItem("ActivePollId");

      setUserCheckedOut(true);
      return;
    }

    if (!response.ok) {
      if (response.status == 403) {
        resData = await newAccessToken();
      }
    }

    if (resData.ok) {
      let newData = localStorage.getItem("UserRefreshToken");
      let newAccess = localStorage.getItem("UserAccessToken");
      dataToServer.refreshToken = newData;
      const newJson = JSON.stringify(dataToServer);
      const response = await fetch(
        "https://poll-it.cs.colman.ac.il/auth/logout",
        {
          method: "POST",
          body: newJson,
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + newAccess,
          },
        }
      );
      if (response.ok) {
        localStorage.removeItem("CheckedInUser");
        localStorage.removeItem("UserAccessToken");
        localStorage.removeItem("UserRefreshToken");
        localStorage.removeItem("UserId");
        localStorage.removeItem("ActivePollId");

        setUserCheckedOut(true);
      }
    }
  }

  function handleCloseModal() {
    setUserCheckedOut(false);
  }

  const normal = (
    <>
      <Nav.Item className="ms-auto">
        <Nav.Link href="/login">Login</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/signup">Sign-Up</Nav.Link>
      </Nav.Item>
    </>
  );

  const facebookUserLoggedIn = (
    <>
      <Nav.Item>
        <Nav.Link href="/about_us">Polls</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/PrePoll">New Poll</Nav.Link>
      </Nav.Item>
      <Nav.Item
        className="ms-auto"
        style={{ color: "rgba(255, 255, 255, 0.55)" }}
      >
        <AccountCircleIcon />
        {user}
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="" onClick={signOut}>
          Sign Out
        </Nav.Link>
      </Nav.Item>
    </>
  );

  const userLoggedIn = (
    <>
      <Nav.Item>
        <Nav.Link href="/about_us">Polls</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/PrePoll">New Poll</Nav.Link>
      </Nav.Item>
      <Nav.Item className="ms-auto">
        <Nav.Link href="/userProfile">
          <AccountCircleIcon />
          {user}
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="" onClick={signOut}>
          Sign Out
        </Nav.Link>
      </Nav.Item>
    </>
  );

  return (
    <Navbar
      style={{ marginBottom: "50px" }}
      bg="dark"
      variant="dark"
      sticky="top"
    >
      <Modal
        open={userCheckedOut}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            LOGOUT
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            User loged out Successfully!
          </Typography>
          <Button
            variant="dark"
            style={{ width: "200px", marginLeft: "370px" }}
            onClick={handleCloseModal}
          >
            Close
          </Button>
        </Box>
      </Modal>
      <Navbar.Brand>
        <img src={PollItLogo} width="40px" height="40px"></img>
        Poll-It
      </Navbar.Brand>
      <Nav className="container-fluid">
        <Nav.Item>
          <Nav.Link href="/">Home</Nav.Link>
        </Nav.Item>
        {user ? (isFacebookUser ? facebookUserLoggedIn : userLoggedIn) : normal}
      </Nav>
    </Navbar>
  );
};

export default NavigationBar;
