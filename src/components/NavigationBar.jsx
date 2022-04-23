import "bootstrap/dist/css/bootstrap.css";
import { Nav, Navbar } from "react-bootstrap";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PollItLogo from "../assets/images/Logo.png";
import { useState } from "react";

const NavigationBar = (props) => {
  const user = localStorage.getItem("CheckedInUser");
  const [userCheckedOut, setUserCheckedOut] = useState(false);

  const signOut = () => {
    localStorage.removeItem("CheckedInUser");
    setUserCheckedOut(true);
  };

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

  const userLoggedIn = (
    <>
      <Nav.Item className="ms-auto">
        <Nav.Link href="">
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
      <Navbar.Brand>
        <img src={PollItLogo} width="40px" height="40px"></img>
        Poll-It
      </Navbar.Brand>
      <Nav className="container-fluid">
        <Nav.Item>
          <Nav.Link href="/">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/about_us">Polls</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/contact_us">New Poll</Nav.Link>
        </Nav.Item>
        {user ? userLoggedIn : normal}
      </Nav>
    </Navbar>
  );
};

export default NavigationBar;
