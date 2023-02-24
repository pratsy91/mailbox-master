import React, { useEffect } from "react";
import { Badge, Button, Offcanvas } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { compSliceActions } from "../store/composeSlice";
import { filterSliceActions } from "../store/filteredslice";

import { getMails } from "../store/Requests";
import { sidebarActions } from "../store/sideBarSlice";

const SideBar = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMails());
  }, [dispatch]);

  const sidebarShow = useSelector((state) => state.sidebarReducer.show);
  const navigate = useNavigate();
  const mails = useSelector((state) => state.mailReducer.mails);
  const sentMails = useSelector((state) => state.sentReducer.sentMails);
  const filteredMails = mails.filter((mail) => mail.read === false);
  const numoffilteredMails = filteredMails.length;
  const numofSentMails = sentMails.length;

  const sentHandler = () => {
    navigate("/sent");
    dispatch(sidebarActions.handleClose());
  };

  const handleClose = () => {
    dispatch(sidebarActions.handleClose());
  };
  const handleModalShow = () => {
    dispatch(compSliceActions.showModal({ flag: true }));
  };

  const flterMailsHandler = () => {
    dispatch(filterSliceActions.setMails({ mails: filteredMails }));
    dispatch(sidebarActions.handleClose());
    navigate("/unread");
  };
  return (
    <Offcanvas show={sidebarShow} onHide={handleClose} scroll="true">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title className="ms-5">My Mail</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="ms-5">
        <div className="mb-3">
          <Button
            variant="warning"
            onClick={handleModalShow}
            style={{ width: "200px" }}
          >
            Compose
          </Button>
        </div>
        <div className="mb-3">
          <Button
            variant="primary"
            style={{ width: "200px" }}
            onClick={sentHandler}
          >
            Sent Mails
            <Badge bg="danger" className="ms-4">
              {numofSentMails}
            </Badge>
          </Button>
        </div>
        <div className="mb-3">
          <Button
            variant="primary"
            style={{ width: "200px" }}
            onClick={flterMailsHandler}
          >
            Unread Mails
            <Badge bg="danger" className="ms-3">
              {numoffilteredMails}
            </Badge>
          </Button>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default SideBar;
