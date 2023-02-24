import React from "react";
import { Button, Col, Container, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteSentMail } from "../store/Requests";

const SentMails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const data = useLoaderData();
  // const loadedMails = [];
  // for (const key in data) {
  //   loadedMails.push({
  //     id: key,
  //     email: data[key].email,
  //     body: data[key].body,
  //     read: data[key].read,
  //   });
  // }
  const mails = useSelector((state) => state.sentReducer.sentMails);

  const backHandler = () => {
    navigate("/email");
  };

  const deleteHandler = (id) => {
    dispatch(deleteSentMail(id));
  };

  return (
    <React.Fragment>
      <Container className="w-75 justify-content-center">
        <ListGroup as="ul" className="p-3">
          {mails.map((mail) => (
            <ListGroup.Item
              as="li"
              className="mb-3 rounded"
              variant="primary"
              key={mail.id}
            >
              <Row>
                <Col lg={9}>
                  <Link
                    className="text-decoration-none text-dark ms-5"
                    to={`/sent/${mail.id}`}
                    relative="route"
                  >
                    From: {mail.email}
                  </Link>
                </Col>
                <Col lg={2}>
                  <span className="offset-8">
                    <Button onClick={() => deleteHandler(mail.id)}>
                      Delete
                    </Button>
                  </span>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Container>
      <Container className="justify-content-center offset-5">
        <Button onClick={backHandler}>Go on previous page</Button>
      </Container>
    </React.Fragment>
  );
};

export default SentMails;

export async function sentmailsLoader() {
  const response = await fetch(
    `https://mail-box-bbdee-default-rtdb.firebaseio.com/sentmails.json`
  );
  const data = await response.json();
  return data;
}
