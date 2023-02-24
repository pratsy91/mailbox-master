import React, { useEffect } from "react";
import { Button, Col, Container, ListGroup, Row } from "react-bootstrap";
import { FaBars } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { sidebarActions } from "../store/sideBarSlice";
import SideBar from "../components/SideBar";
import Compose from "../components/Compose";
import { Link } from "react-router-dom";
import { RxDotFilled } from "react-icons/rx";
import { deleteMail, getMails } from "../store/Requests";

const Inbox = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMails());
  }, [dispatch]);

  const mails = useSelector((state) => state.mailReducer.mails);

  const deleteHandler = (id) => {
    dispatch(deleteMail(id));
  };

  const handleShow = () => {
    dispatch(sidebarActions.handleShow());
  };

  return (
    <React.Fragment>
      <Compose />
      <SideBar />
      <Button className="ms-5 mt-5 d-flex" onClick={handleShow}>
        <FaBars className="mt-2 me-2 " /> <h4>Mail options</h4>
      </Button>
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
                  {!mail.read && <RxDotFilled className="text-danger" />}
                  <Link
                    className="text-decoration-none text-dark ms-5"
                    to={`/email/${mail.id}`}
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
    </React.Fragment>
  );
};

export default Inbox;

export async function emailsLoader() {
  const response = await fetch(
    `https://mail-box-bbdee-default-rtdb.firebaseio.com/emails.json`
  );
  const data = await response.json();
  return data;
}
