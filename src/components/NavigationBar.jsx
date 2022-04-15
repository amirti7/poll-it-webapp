import "bootstrap/dist/css/bootstrap.css";
import { Nav, Navbar } from "react-bootstrap";
import logo from "../logo.svg";
import PollItLogo from "../images/Logo.png";

const NavigationBar = (props) => {
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
        <Nav.Item className="ms-auto">
          <Nav.Link href="/login">Login</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/signup">Sign-Up</Nav.Link>
        </Nav.Item>
      </Nav>
    </Navbar>
  );
};

export default NavigationBar;
