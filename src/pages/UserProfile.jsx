import { Container, Row, Col, Button } from "react-bootstrap";
import NavigationBar from "../components/NavigationBar";
import StickyFooter from "../components/StickyFooter";
import PollItLogo from "../assets/images/Logo.png";
import styled from "styled-components";
import { Input } from "@mui/material";
import { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

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
const UserProfile = (props) => {
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userAdress, setUserAdress] = useState("");
  const [userOldPassword, setUserOldPassword] = useState("");
  const [userNewPassword, setUserNewPassword] = useState("");
  const [disableEdit, setDisableEdit] = useState(false);
  const [enableChangePassword, setEnableChangePassword] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState({
    isOpen: false,
    isSuccessful: false,
  });
  const [errorInUpdate, setErrorInUpdate] = useState({
    isOpen: false,
    errorMessage: "",
  });
  const userID = localStorage.getItem("UserId");
  const UserAccessToken = localStorage.getItem("UserAccessToken");
  const auth = "Bearer " + UserAccessToken;
  let data;

  useEffect(() => {
    async function getDetails() {
      const details = await fetchUserDetails();
    }
    getDetails();
  }, []);
  async function handleUpdateUser() {
    const body = {
      _id: userID,
      name: userName,
      address: userAdress,
      email: userEmail,
    };
    console.log(body);
    const response = await fetch("http://10.10.248.124:8000/auth/update/", {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Authorization: auth,
      },
    });
    const data = await response.json();
    console.log(data);
    if (localStorage.getItem("CheckedInUser") !== body.email) {
      localStorage.setItem("CheckedInUser", body.email);
    }
  }

  async function fetchUserDetails() {
    const data = await fetch(
      "http://10.10.248.124:8000/auth/getAccountById/" + userID,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: auth,
        },
      }
    );
    const details = await data.json();
    console.log(details);

    handleSetStates(details.email, details.name, details.address);

    return details;
  }

  async function handleChangePassword() {
    const body = {
      _id: userID,
      oldPassword: userOldPassword,
      newPassword: userNewPassword,
    };
    console.log(body);
    const response = await fetch(
      "http://10.10.248.124:8000/auth/updatePassword/",
      {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          Authorization: auth,
        },
      }
    );
    if (response.ok) {
      setIsSuccessful({
        isOpen: true,
        isSuccessful: true,
      });
      setUserOldPassword("");
      setUserNewPassword("");
      setEnableChangePassword(false);
    } else {
      const jsonData = await response.json();
      console.log(jsonData);
      setErrorInUpdate({
        isOpen: true,
        errorMessage: jsonData.error,
      });
      setUserOldPassword("");
      setUserNewPassword("");
    }
  }
  function handleSetStates(email, UserName, address) {
    setUserAdress(address);
    setUserEmail(email);
    setUserName(UserName);
  }

  const handleCloseErrorModal = () => {
    setErrorInUpdate({
      isOpen: false,
      errorMessage: "",
    });
  };

  const handleCloseUpdateModal = () => {
    setIsSuccessful({
      isOpen: false,
      isSuccessful: true,
    });
  };

  return (
    <div>
      <Modal
        open={errorInUpdate.isOpen}
        onClose={handleCloseErrorModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Failed To Edit Details:
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {errorInUpdate.errorMessage}
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
        open={isSuccessful.isOpen}
        onClose={handleCloseUpdateModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Update Details
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            User Details Updated Successfully!
          </Typography>
          <Button
            variant="dark"
            style={{ width: "200px", marginLeft: "370px" }}
            onClick={handleCloseUpdateModal}
          >
            Close
          </Button>
        </Box>
      </Modal>
      <NavigationBar></NavigationBar>
      <Container>
        <div>
          <Row md={6}>
            <Col md={6}>
              <Image src={PollItLogo}></Image>
            </Col>
            <Col md={4}>
              <Title>My Profile</Title>
              <Col style={{ margin: "10px" }}>
                <label
                  style={{
                    fontSize: "20px",
                    marginRight: "10px",
                  }}
                >
                  Full Name:
                </label>
                <Input
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  disabled={!disableEdit}
                ></Input>
              </Col>
              <Col style={{ margin: "10px" }}>
                <label
                  style={{
                    fontSize: "20px",
                    marginRight: "10px",
                  }}
                >
                  Adress:
                </label>
                <Input
                  value={userAdress}
                  onChange={(e) => setUserAdress(e.target.value)}
                  disabled={!disableEdit}
                ></Input>
              </Col>
              <Col style={{ margin: "10px" }}>
                <label
                  style={{
                    fontSize: "20px",
                    marginRight: "10px",
                  }}
                >
                  Email:
                </label>
                <Input
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  disabled={!disableEdit}
                ></Input>
              </Col>
              <Button
                disabled={!!disableEdit}
                variant="dark"
                style={{ width: "300px", marginBottom: "20px" }}
                onClick={() => setDisableEdit(!disableEdit)}
              >
                Edit Details
              </Button>
              {disableEdit && (
                <Col>
                  <Button
                    variant="dark"
                    style={{ width: "150px" }}
                    onClick={() => handleUpdateUser()}
                  >
                    save changes
                  </Button>
                  <Button
                    variant="dark"
                    style={{ width: "140px", marginLeft: "10px" }}
                    onClick={() => setDisableEdit(!disableEdit)}
                  >
                    Cancel
                  </Button>
                </Col>
              )}
              <Button
                variant="dark"
                style={{ width: "300px", marginTop: "20px" }}
                onClick={() => setEnableChangePassword(!enableChangePassword)}
                disabled={!!enableChangePassword}
              >
                Change Password
              </Button>
              {enableChangePassword && (
                <div>
                  <Col style={{ margin: "10px" }}>
                    <label
                      style={{
                        fontSize: "20px",
                        marginRight: "10px",
                      }}
                    >
                      Old Password:
                    </label>
                    <Input
                      value={userOldPassword}
                      onChange={(e) => setUserOldPassword(e.target.value)}
                      disabled={!enableChangePassword}
                    ></Input>
                  </Col>
                  <Col style={{ margin: "10px" }}>
                    <label
                      style={{
                        fontSize: "20px",
                        marginRight: "10px",
                      }}
                    >
                      New Password:
                    </label>
                    <Input
                      value={userNewPassword}
                      onChange={(e) => setUserNewPassword(e.target.value)}
                      disabled={!enableChangePassword}
                    ></Input>
                  </Col>
                  <Col>
                    <Button
                      variant="dark"
                      style={{ width: "150px" }}
                      onClick={handleChangePassword}
                    >
                      save changes
                    </Button>
                    <Button
                      variant="dark"
                      style={{ width: "140px", marginLeft: "10px" }}
                      onClick={() =>
                        setEnableChangePassword(!enableChangePassword)
                      }
                    >
                      Cancel
                    </Button>
                  </Col>
                </div>
              )}
            </Col>
          </Row>
        </div>
      </Container>
      <StickyFooter></StickyFooter>
    </div>
  );
};

export default UserProfile;
