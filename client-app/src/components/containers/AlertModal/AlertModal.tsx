import React, { Dispatch, SetStateAction } from "react";
import { Modal } from "react-bootstrap";
import { withRouter, RouteComponentProps } from "react-router-dom";


interface Props extends RouteComponentProps {
  setAlertToggle: Dispatch<SetStateAction<boolean>>;
  alertMessage: string;
}

function AlertModal({ setAlertToggle, alertMessage }: Props): React.ReactElement {
  return (
    <Modal
      show={true}
      onHide={() => setAlertToggle(false)}
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
