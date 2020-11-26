import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Card, Col, Button, Modal } from "react-bootstrap";
import heic2any from "heic2any";
import axios from "axios";
import styled from "styled-components";

const Item = styled.li`
  display: block;
  clear: both;
  counter-increment: list;
  padding-bottom: 4rem;
  font-size: 1.1rem;
  line-height: 1.375;
  position: relative;
`;

const HeadLine = styled.h2`
  padding: 0rem 0 0 0;
  margin: 0 0 1rem 0;
  font: normal 2rem var(--font-head);
`;

const FoodImg = styled.img`
  max-width: 100%;
  height: auto;
`;

function RestaurantListItem(props) {
  const restaurant = props.restaurant;
  const [Toggle, setToggle] = useState(false);
  const [ImageData, setImageData] = useState("");
  const [VisitiedDate, setVisitiedDate] = useState("");

  const openPopUp = () => {
    setToggle(!Toggle);
  };

  const onVisitiedDateHandler = e => {
    setVisitiedDate(String(e.currentTarget.value));
  };

  const onImageDataHandler = e => {
    e.preventDefault();

    let file = e.target.files[0];
    console.log("file: ", file);
    if (file.type === "image/heic") {
      const reader = new FileReader();

      reader.onloadend = function() {
        const image = reader.result;
        fetch(image)
          .then(res => res.blob())
          .then(blob => heic2any({ blob, toType: "image/jpeg", quality: 0.2 }))
          .then(conversionResult => {
            console.log("conversion: ", conversionResult);
            // conversionResult is a BLOB
            setImageData(conversionResult);
          })
          .catch(err => {
            console.log("err: ", err);
          });
      };
      reader.readAsDataURL(file);
    } else {
      setImageData(file);
    }
  };

  const ModalComp = (
    <Modal.Dialog
      style={{ textAlign: "center", position: "fixed", zIndex: "100" }}
    >
      <Modal.Header closeButton onClick={() => openPopUp()}>
        <Modal.Title>{restaurant.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          type="date"
          value={VisitiedDate}
          placeholder="방문 일시"
          onChange={onVisitiedDateHandler}
        />
      </Modal.Body>
      <Modal.Footer>
        <div style={{ marginLeft: "100px" }}>
          <input type="file" onChange={onImageDataHandler} />
        </div>
      </Modal.Footer>
      <Modal.Footer>
        <Button variant="success">수정하기</Button>
      </Modal.Footer>
    </Modal.Dialog>
  );

  const updateHandler = e => {
    setToggle(!Toggle);
    console.log(Toggle);
  };

  const clickRestaurant = (restaurantAddress, restaurantName) => {
    props.setAddress(restaurantAddress);
    props.setRestaurantName(restaurantName);
  };

  return (
    <Col md={4}>
      {Toggle && ModalComp}
      <Card
        style={{ width: "100%" }}
        onClick={() => clickRestaurant(restaurant.address, restaurant.name)}
      >
        <Card.Body>
          <Card.Title>{restaurant.name}</Card.Title>
          <div
            style={{
              width: "180px",
              height: "240px",
              overflow: "hidden"
            }}
          >
            <Card.Img
              variant="top"
              src={restaurant.imgURL}
              style={{
                width: "100%",
                height: "100%"
              }}
            />
          </div>
          <Card.Text style={{ display: "inline-block" }}>
            방문 일시: {restaurant.date} <br />
            주소: {restaurant.address}
          </Card.Text>
          <Button
            variant="warning"
            onClick={() => updateHandler()}
            style={{ display: "inline-block", margin: "2px" }}
          >
            수정
          </Button>
          <Button
            variant="primary"
            onClick={() => props.deleteHandler(restaurant._id)}
            style={{ display: "inline-block", margin: "2px" }}
          >
            삭제
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default withRouter(RestaurantListItem);
