import React from "react";
import { Button, Col, Container, ListGroup, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RxDotFilled } from "react-icons/rx";

const FilteredMails = () => {
  const navigate = useNavigate();

  const mails = useSelector((state) => state.filterReducer.mails);

  const backHandler = () => {
    navigate("/email");
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
                  {!mail.read && <RxDotFilled className="text-danger" />}
                  <Link
                    className="text-decoration-none text-dark ms-5"
                    to={`/email/${mail.id}`}
                    relative="route"
                  >
                    From: {mail.email}
                  </Link>
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

export default FilteredMails;
