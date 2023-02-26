import React from "react";
import { Card, Container } from "react-bootstrap";
import imageurl from "../images/email.jpg";

const Home = () => {
  return (
    <React.Fragment>
      <Container
        className="d-flex justify-content-center"
        style={{ marginTop: "50px" }}
      >
        <img src={imageurl} alt="mail" width="300px" />
      </Container>
      <Container className="d-flex justify-content-center">
        <h1 className="display-3">Welcome to My Mail</h1>
      </Container>
    </React.Fragment>
  );
};

export default Home;
