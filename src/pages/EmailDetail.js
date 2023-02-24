import React, { useEffect } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { getMails, updateMail } from "../store/Requests";

const EmailDetails = () => {
  const dispatch = useDispatch();
  const data = useLoaderData();
  const mail = data;
  const params = useParams();
  const emailid = params.emailId;
  const updatedMail = { ...mail, id: emailid };
  const navigate = useNavigate();

  const backHandler = () => {
    dispatch(getMails());
    navigate("/email");
  };

  useEffect(() => {
    dispatch(updateMail(updatedMail));
  }, []);

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

export default EmailDetails;

export async function emailDetailLoader({ request, params }) {
  const id = params.emailId;
  const response = await fetch(
    `https://mail-box-bbdee-default-rtdb.firebaseio.com/emails/${id}.json`
  );
  const data = await response.json();
  return data;
}
