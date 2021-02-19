import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Card, Col, Button } from "react-bootstrap";
import UpdateModal from "../../containers/UpdateModal/UpdateModal";
import { useDispatch } from "react-redux";
import { updateRestaurant } from "../../../_actions/restaurant_action";
import ReactStars from "react-rating-stars-component";
import heic2any from "heic2any";
import axios from "axios";

function RestaurantListItem(props) {
  const restaurant = props.restaurant;
  const [Toggle, setToggle] = useState(false);
  const [ImageData, setImageData] = useState("");
  const [VisitedDate, setVisitedDate] = useState("");
  const [Rating, setRating] = useState(restaurant.rating);
  const dispatch = useDispatch();

  const onVisitedDateHandler = e => {
    setVisitedDate(String(e.currentTarget.value));
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
          date: VisitedDate,
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

  const updateHandler = e => {
    setToggle(!Toggle);
  };

  const clickRestaurant = (restaurantAddress, restaurantName) => {
    props.setAddress(restaurantAddress);
    props.setRestaurantName(restaurantName);
  };

  return (
    <>
      <Col md={6}>
        <Card
          style={{ width: "100%" }}
          onClick={() => clickRestaurant(restaurant.address, restaurant.name)}
        >
          <Card.Body>
            <Card.Title>{restaurant.name}</Card.Title>
            <ReactStars
              count={5}
              value={Rating}
              edit={false}
              size={52}
              isHalf={true}
              activeColor="#ffd700"
            />
            ,
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
                style={{
                  display: "inline-block",
                  margin: "2px",
                  color: "White"
                }}
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
      <UpdateModal
        Toggle={Toggle}
        setToggle={setToggle}
        restaurantName={restaurant.name}
        VisitedDate={VisitedDate}
        onVisitedDateHandler={onVisitedDateHandler}
        changeRestaurant={changeRestaurant}
        onImageDataHandler={onImageDataHandler}
        Rating={restaurant.rating}
        setRating={setRating}
      />
    </>
  );
}

export default withRouter(RestaurantListItem);
