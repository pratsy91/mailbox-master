import React from "react";
import { Button, Card, Container } from "react-bootstrap";
import { useLoaderData, useNavigate } from "react-router-dom";

const SentEmailDetail = () => {
  const navigate = useNavigate();
  const data = useLoaderData();
  const mail = data;
  console.log("🚀 ~ file: sentEmailDetail.js:8 ~ SentEmailDetail ~ mail", mail);

  const backHandler = () => {
    navigate("/sent");
  };
  return (
    <React.Fragment>
      <Container className="w-75 justify-content-center mt-5 mb-5">
        <Card bg="light">
          <Card.Body>{mail.body}</Card.Body>
          <Card.Footer className="text-primary">from: {mail.email}</Card.Footer>
        </Card>
      </Container>
      <Container className="offset-5">
        <Button onClick={backHandler}>Go on previous page </Button>
      </Container>
    </React.Fragment>
  );
};

export default SentEmailDetail;

export async function sentMailDetailLoader({ request, params }) {
  const id = params.sentId;
  const response = await fetch(
    `https://mail-box-bbdee-default-rtdb.firebaseio.com/sentmails/${id}.json`
  );
  const data = await response.json();
  return data;
}
