import React from "react";
import { Button, Modal } from "react-bootstrap";
import { withRouter } from "react-router-dom";

function UpdateModal(props) {
  const {
    Toggle,
    setToggle,
    restaurant,
    VisitiedDate,
    onVisitiedDateHandler,
    changeRestaurant,
    onImageDataHandler
  } = props;

  return (
    <Modal
      show={Toggle}
      onHide={() => setToggle(false)}
      style={{
        textAlign: "center"
      }}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{restaurant.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          type="date"
          value={VisitiedDate}
          placeholder="방문 일시"
          onChange={e => onVisitiedDateHandler(e)}
        />
      </Modal.Body>
      <Modal.Footer>
        <div style={{ marginLeft: "100px" }}>
          <input type="file" onChange={onImageDataHandler} />
        </div>
      </Modal.Footer>
      <Modal.Footer>
        <Button variant="success" onClick={changeRestaurant}>
          수정하기
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default withRouter(UpdateModal);
