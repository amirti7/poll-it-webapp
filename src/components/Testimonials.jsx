import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";
import styled from "styled-components";
import { BsStarFill } from "react-icons/bs";
import steve from "../images/steve.png";
import bill from "../images/bill.png";
import jeff from "../images/jeff.png";
import adam from "../images/adam.png";

const Title = styled.h1`
  text-align: center;
`;

const Stars = styled.div`
  text-align: center;
`;

const Testimonials = (props) => {
  const data = [
    {
      face: steve,
      content:
        "This product is so cool and helped me save a lot of time and money",
      stars: 5,
      name: "Steve Jobs",
      position: "Co-founder, Chairman and CEO of Apple",
    },
    {
      face: bill,
      content:
        "This product is so cool and helped me save a lot of time and money",
      stars: 5,
      name: "Bill Gates",
      position: "Co-founder, Chairman and CEO of Microsoft",
    },
    {
      face: jeff,
      content:
        "This product is so cool and helped me save a lot of time and money",
      stars: 5,
      name: "Jeff Bezos",
      position: "Co-founder, Chairman and CEO of Amazon",
    },
    {
      face: adam,
      content:
        "This product is so cool and helped me save a lot of time and money",
      stars: 5,
      name: "Adam Silver",
      position: "NBA Commissioner",
    },
  ];
  return (
    <div>
      <Title>
        Testimonials
        <hr
          className="mx-auto"
          style={{ border: "3px solid black", width: "220px" }}
        />
      </Title>
      <Carousel variant="dark" interval={1000}>
        {data.map((obj) => {
          return (
            <Carousel.Item interval={3000}>
              <Card
                className="mx-auto"
                style={{ width: "23rem", height: "28rem" }}
              >
                <Card.Img
                  className="mx-auto"
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "150px",
                  }}
                  variant="top"
                  src={obj.face}
                />
                <Card.Body>
                  <Card.Text style={{ textAlign: "center" }}>
                    "{obj.content}"
                  </Card.Text>
                  <Stars>
                    <BsStarFill />
                    <BsStarFill />
                    <BsStarFill />
                    <BsStarFill />
                    <BsStarFill />
                  </Stars>
                  <br></br>
                  <Card.Title style={{ textAlign: "center" }}>
                    {obj.name}
                  </Card.Title>
                  <Card.Text style={{ textAlign: "center", color: "grey" }}>
                    {obj.position}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </div>
  );
};

export default Testimonials;
