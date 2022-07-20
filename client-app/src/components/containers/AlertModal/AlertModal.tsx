import React, { Dispatch, SetStateAction } from "react";
import { Modal } from "react-bootstrap";
import { withRouter, RouteComponentProps } from "react-router-dom";


interface Props extends RouteComponentProps {
  setAlertToggle: Dispatch<SetStateAction<boolean>>;
  alertMessage: string;
  setToggle?: Dispatch<SetStateAction<boolean>>;
}

function AlertModal({ setAlertToggle, alertMessage, setToggle }: Props): React.ReactElement {
  return (
    <Modal
      show={true}
      onHide={() => {
        setAlertToggle(false);
        if (setToggle) {
          setToggle(true);
        }
      }}
      style={{
        textAlign: "center"
      }}
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header closeButton>알림</Modal.Header>
      <Modal.Body>
        <div
          style={{
            margin: "auto",
            width: "100%"
          }}
        >
          {alertMessage}
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default withRouter(AlertModal);
