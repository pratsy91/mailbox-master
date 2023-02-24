import React, { useRef } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { compSliceActions } from "../store/composeSlice";
import { getMails, sendMail, sentData } from "../store/Requests";

const Compose = () => {
  const dispatch = useDispatch();
  const composeShow = useSelector((state) => state.composeReducer.show);
  const emailRef = useRef();
  const bodyRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const inputEmail = emailRef.current.value;
    const inputBody = bodyRef.current.value;
    let body = ``;
    body += inputBody;
    const emailData = {
      email: inputEmail,
      body,
    };
    dispatch(sendMail(emailData));
    dispatch(sentData(emailData));
    dispatch(compSliceActions.closeModal());
  };

  const handleModalClose = () => {
    dispatch(compSliceActions.closeModal());
  };
  return (
    <Modal show={composeShow} onHide={handleModalClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Compose Email</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={submitHandler} className="m-3">
          <Form.Label>To:</Form.Label>
          <Form.Control type="email" ref={emailRef} autoFocus />
          <Form.Label>Body</Form.Label>
          <Form.Control as="textarea" rows={7} ref={bodyRef} />
          <Button variant="primary" type="submit" className="mt-5">
            Send
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Compose;
