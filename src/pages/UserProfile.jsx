import { Container, Row, Col, Button } from "react-bootstrap";
import NavigationBar from "../components/NavigationBar";
import StickyFooter from "../components/StickyFooter";
import PollItLogo from "../assets/images/Logo.png";
import styled from "styled-components";
import { Input } from "@mui/material";
import { useEffect, useState } from "react";

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
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userAdress, setUserAdress] = useState("");
  const [disableEdit, setDisableEdit] = useState(false);
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
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Authorization: auth,
      },
    });
    const data = await response.json();
    console.log(data);
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
  function handleSetStates(email, UserName, address) {
    setUserAdress(address);
    setUserEmail(email);
    setUserName(UserName);
  }

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
                style={{ width: "300px" }}
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
            </Col>
          </Row>
        </div>
      </Container>
      <StickyFooter></StickyFooter>
    </div>
  );
};

export default UserProfile;
