import React from "react";
import { Button, Modal } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

function UpdateModal(props) {
  const {
    Toggle,
    setToggle,
    restaurantName,
    VisitiedDate,
    onVisitiedDateHandler,
    changeRestaurant,
    onImageDataHandler,
    Rating,
    setRating
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
        <Modal.Title>{restaurantName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ReactStars
          count={5}
          value={Rating}
          onChange={setRating}
          size={52}
          isHalf={true}
          activeColor="#ffd700"
        />
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
