import React from "react";
import { Modal } from "react-bootstrap";
import { withRouter } from "react-router-dom";

function AlertModal(props) {
  const { setAlertToggle, alertMessage } = props;

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
