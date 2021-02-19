import React from "react";
import { Button, Modal } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

function UpdateModal(props) {
  const {
    Toggle,
    setToggle,
    restaurantName,
    VisitedDate,
    onVisitedDateHandler,
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
      <Modal.Header closeButton />
      <Modal.Header
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Modal.Title>{restaurantName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div
          style={{
            margin: "auto",
            width: "36%"
          }}
        >
          <ReactStars
            count={5}
            value={Rating}
            onChange={setRating}
            size={32}
            isHalf={true}
            activeColor="#ffd700"
          />
        </div>
        <input
          type="date"
          value={VisitedDate}
          placeholder="방문 일시"
          onChange={e => onVisitedDateHandler(e)}
        />
      </Modal.Body>
      <Modal.Footer>
        <div style={{ marginLeft: "100px" }}>
          <input type="file" onChange={onImageDataHandler} />
        </div>
      </Modal.Footer>
      <Modal.Footer
        style={{
          display: "flex",
          justifyContent: "center"
        }}
      >
        <Button variant="success" onClick={changeRestaurant}>
          수정하기
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default withRouter(UpdateModal);
