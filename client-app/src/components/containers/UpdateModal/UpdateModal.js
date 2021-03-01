import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import heic2any from "heic2any";
import ReactStars from "react-rating-stars-component";
import { useDispatch } from "react-redux";
import {
  updateRestaurant,
  registerRestaurant
} from "../../../_actions/restaurant_action";

import axios from "axios";

function UpdateModal(props) {
  const {
    Toggle,
    setToggle,
    restaurantName,
    restaurantId,
    Rating,
    setRating,
    userId,
    setPopUpToggle,
    wishListAddress,
    wishListName,
    wishListId,
    type
  } = props;

  const [ImageData, setImageData] = useState("");
  const [VisitedDate, setVisitedDate] = useState("");
  const [isConverting, setIsConverting] = useState(false);

  const dispatch = useDispatch();

  const onVisitedDateHandler = e => {
    setVisitedDate(String(e.currentTarget.value));
  };

  const onImageDataHandler = e => {
    e.preventDefault();

    let file = e.target.files[0];
    if (file.type === "image/heic") {
      setIsConverting(true);
      const reader = new FileReader();

      reader.onloadend = function() {
        const image = reader.result;
        fetch(image)
          .then(res => res.blob())
          .then(blob => heic2any({ blob, toType: "image/jpeg", quality: 0.2 }))
          .then(conversionResult => {
            // conversionResult is a BLOB
            const fileReader = new FileReader();
            fileReader.readAsDataURL(conversionResult);
            fileReader.onload = function(e) {
              setImageData(e.target.result);
              setIsConverting(false);
            };
          })
          .catch(err => {
            console.log("err: ", err);
          });
      };
      reader.readAsDataURL(file);
    } else {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = function(e) {
        setImageData(e.target.result);
      };
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
          restaurantId: restaurantId,
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

  const moveToMain = e => {
    e.preventDefault();

    const body = {
      visitor: userId,
      name: wishListName,
      address: wishListAddress,
      date: VisitedDate,
      imgURL: ImageData
    };

    dispatch(registerRestaurant(body)).then(response => {
      if (response.payload.success) {
        alert("방문 표시되었습니다.");
        props.setToggle(true);
        setPopUpToggle(false);
        props.deleteHandler(wishListId);
      } else {
        console.log(response);
        alert("error");
      }
    });
  };

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
        {isConverting ? (
          <Button variant="danger" disabled>
            {type === "WishListItem" ? "방문 표시하기" : "수정하기"}
          </Button>
        ) : type === "WishListItem" ? (
          <Button variant="success" onClick={moveToMain}>
            방문 표시하기
          </Button>
        ) : (
          <Button
            variant="warning"
            onClick={changeRestaurant}
            style={{ color: "white" }}
          >
            수정하기
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}

export default withRouter(UpdateModal);
