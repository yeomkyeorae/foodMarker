import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import UpdateModal from "../../containers/UpdateModal/UpdateModal";
import heic2any from "heic2any";
import axios from "axios";
import styled from "styled-components";
import { registerRestaurant } from "../../../_actions/restaurant_action";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ReactStars from "react-rating-stars-component";

const Item = styled.li`
  display: block;
  clear: both;
  counter-increment: list;
  padding-bottom: 1rem;
  font-size: 1.1rem;
  line-height: 1.375;
  position: relative;
  border: 2px solid black;
  margin-bottom: 5px;
`;

const HeadLine = styled.h2`
  padding: 0rem 0 0 0;
  margin: 1rem 0 1rem 0;
  font: normal 2rem var(--font-head);
  font-size: 2rem;
`;

function WishListItem(props) {
  const { wishListId, wishListName, wishListAddress, userId } = props;
  const dispatch = useDispatch();
  const [popUpToggle, setPopUpToggle] = useState(false);
  const [ImageData, setImageData] = useState("");
  const [VisitedDate, setVisitedDate] = useState("");
  const [isConverting, setIsConverting] = useState(false);
  const [Rating, setRating] = useState(0);

  const onRatingHandler = newRating => {
    setRating(newRating);
  };

  const openPopUp = () => {
    setPopUpToggle(!popUpToggle);
  };

  const onVisitedDateHandler = e => {
    setVisitedDate(String(e.currentTarget.value));
  };

  const handleDateChangeRaw = e => {
    e.preventDefault();
  };

  const onImageDataHandler = e => {
    e.preventDefault();

    let file = e.target.files[0];
    console.log("file: ", file);
    if (file.type === "image/heic") {
      setIsConverting(true);
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
            setIsConverting(false);
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

  const moveToMain = e => {
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
          visitor: userId,
          name: wishListName,
          address: wishListAddress,
          date: VisitedDate,
          imgURL: response.data.data.link
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
      });
  };

  const ModalComp = (
    <Modal.Dialog style={{ textAlign: "center" }}>
      <Modal.Header closeButton onClick={() => openPopUp()}>
        <Modal.Title>{wishListName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ReactStars
          count={5}
          value={Rating}
          onChange={onRatingHandler}
          size={52}
          isHalf={true}
          activeColor="#ffd700"
        />
        <br />
        방문 날짜 :
        <DatePicker
          selected={VisitedDate}
          onChange={onVisitedDateHandler}
          onChangeRaw={handleDateChangeRaw}
        />
      </Modal.Body>
      <Modal.Footer>
        <div style={{ marginLeft: "100px" }}>
          <input type="file" onChange={onImageDataHandler} />
        </div>
      </Modal.Footer>
      <Modal.Footer>
        {isConverting ? (
          <Button variant="danger" disabled>
            방문 표시하기
          </Button>
        ) : (
          <Button variant="primary" onClick={moveToMain}>
            방문 표시하기
          </Button>
        )}
      </Modal.Footer>
    </Modal.Dialog>
  );

  return (
    <Item key={wishListId} style={{ width: "100%" }}>
      <HeadLine>{wishListName}</HeadLine>
      {/* {popUpToggle && ModalComp} */}
      <span>{wishListAddress}</span> <br />
      <div>
        <Button
          variant="success"
          onClick={() => openPopUp()}
          style={{ margin: "2px" }}
        >
          방문
        </Button>
        <Button
          variant="danger"
          onClick={() => props.deleteHandler(wishListId)}
          style={{ margin: "2px" }}
        >
          삭제
        </Button>
      </div>
      <UpdateModal
        Toggle={popUpToggle}
        setToggle={setPopUpToggle}
        restaurantName={wishListName}
        VisitedDate={VisitedDate}
        onVisitedDateHandler={onVisitedDateHandler}
        changeRestaurant={moveToMain}
        onImageDataHandler={onImageDataHandler}
        Rating={Rating}
        setRating={setRating}
      />
    </Item>
  );
}

export default withRouter(WishListItem);
