import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Card, Col, Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { updateRestaurant } from "../../../_actions/restaurant_action";
import StarRatings from "react-star-ratings";
import heic2any from "heic2any";
import axios from "axios";

function RestaurantListItem(props) {
  const restaurant = props.restaurant;
  const [Toggle, setToggle] = useState(false);
  const [ImageData, setImageData] = useState("");
  const [VisitiedDate, setVisitiedDate] = useState("");
  const [Rating, setRating] = useState(2.5); // 임시
  const dispatch = useDispatch();

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

  const changeRestaurant = e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", ImageData);

    axios
      .post("https://api.imgur.com/3/image", formData, {
        headers: {
          Authorization: "Client-ID e4dc4dac3124836",
          Accept: "application/json"
        }
      })
      .then(response => {
        const body = {
          restaurantId: restaurant._id,
          date: VisitiedDate,
          imgURL: response.data.data.link
        };

        dispatch(updateRestaurant(body)).then(response => {
          if (response.payload.success) {
            alert("수정되었습니다.");
            setToggle(!Toggle);
          } else {
            console.log(response);
            alert("error");
          }
        });
      });
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
        <Button variant="success" onClick={changeRestaurant}>
          수정하기
        </Button>
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
    <Col md={6}>
      {Toggle && ModalComp}
      <Card
        style={{ width: "100%" }}
        onClick={() => clickRestaurant(restaurant.address, restaurant.name)}
      >
        <Card.Body>
          <Card.Title>{restaurant.name}</Card.Title>
          <StarRatings
            rating={Rating}
            starRatedColor="gold"
            numberOfStars={5}
            starDimension="40px"
            name="rating"
          />
          <div
            style={{
              width: "100%",
              height: "360px",
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
          <div>
            <Card.Text style={{ display: "inline-block" }}>
              방문 일시: {restaurant.date} <br />
              주소: {restaurant.address}
            </Card.Text>
          </div>
          <div>
            <Button
              variant="warning"
              onClick={() => updateHandler()}
              style={{ display: "inline-block", margin: "2px", color: "White" }}
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
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default withRouter(RestaurantListItem);
