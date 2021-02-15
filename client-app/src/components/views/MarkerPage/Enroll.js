import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { registerRestaurant } from "../../../_actions/restaurant_action";
import { registerWishList } from "../../../_actions/wishList_action";
import MapForEnroll from "../../containers/KakaoMap/MapForEnroll";
import { Button } from "react-bootstrap";
import axios from "axios";
import heic2any from "heic2any";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ReactStars from "react-rating-stars-component";
import styled from "styled-components";

const Input = styled.input`
  margin: 3px 0;
  padding: 15px 10px;
  width: 30%;
  outline: none;
  border: 1px solid #bbb;
  border-radius: 20px;
  display: inline-block;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-transition: 0.2s ease all;
  -moz-transition: 0.2s ease all;
  -ms-transition: 0.2s ease all;
  -o-transition: 0.2s ease all;
  transition: 0.2s ease all;
`;

function Enroll(props) {
  const [Name, setName] = useState("");
  const [Address, setAddress] = useState("");
  const [VisitiedDate, setVisitiedDate] = useState("");
  const [ImageData, setImageData] = useState("");
  const [isConverting, setIsConverting] = useState(false);
  const userId = props.userId;
  const parentCompName = props.parentCompName;

  const [SearchName, setSearchName] = useState("이태원 맛집");
  const [Toggle, setToggle] = useState(true);
  const [Rating, setRating] = useState(0);

  const onRatingHandler = newRating => {
    setRating(newRating);
  };

  const onNameHandler = e => {
    setName(e.currentTarget.value);
  };

  const onAddressHandler = e => {
    setAddress(e.currentTarget.value);
  };

  const onVisitiedDateHandler = date => {
    setVisitiedDate(date);
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

  const onChangeSearchNameHandler = e => {
    setSearchName(e.currentTarget.value);
  };

  const toggleHandler = () => {
    setToggle(!Toggle);
  };

  const onKeyDown = e => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      toggleHandler();
    }
  };

  const dispatch = useDispatch();
  const onSubmitHandler = e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", ImageData);

    if (parentCompName === "MarkerPage") {
      axios
        .post("https://api.imgur.com/3/image", formData, {
          headers: {
            Authorization: "Client-ID 21e4db556f22012",
            Accept: "application/json"
          }
        })
        .then(response => {
          const body = {
            visitor: userId,
            name: Name,
            address: Address,
            date: VisitiedDate,
            imgURL: response.data.data.link,
            rating: Rating
          };
          dispatch(registerRestaurant(body))
            .then(response => {
              if (response.payload.success) {
                setName("");
                setAddress("");
                setVisitiedDate("");
                setImageData("");
                setRating(0);
                props.setToggle(true);
                props.setMenu("식당 등록");
                props.history.push("/marker", userId);
              } else {
                alert("error");
              }
            })
            .catch(err => {
              console.log("registerRestaurant err: ", err);
            });
        })
        .catch(err => {
          console.log("imgur err: ", err);
        });
    } else if (parentCompName === "WishPage") {
      const body = {
        user: userId,
        name: Name,
        address: Address
      };
      dispatch(registerWishList(body)).then(response => {
        if (response.payload.success) {
          setName("");
          setAddress("");
          props.setToggle(true);
          props.setMenu("위시리스트 등록");
          props.history.push("/wish", userId);
        } else {
          alert("error");
        }
      });
    }
  };

  return (
    <div>
      <MapForEnroll Toggle={Toggle} setName={setName} setAddress={setAddress} />
      <div
        id={`menu_wrap`}
        className="bg_white"
        style={{ display: "inline-block", width: "80%" }}
      >
        <div className="option">
          <div>
            키워드 :{" "}
            <Input
              type="text"
              value={SearchName}
              onChange={onChangeSearchNameHandler}
              id={`keyword`}
              size="15"
              onKeyDown={onKeyDown}
            />
            <Button
              variant="success"
              style={{ margin: "10px" }}
              type="submit"
              onClick={toggleHandler}
            >
              검색하기
            </Button>
            <hr />
          </div>
        </div>
        <ul
          id={`placesList`}
          style={{
            listStyle: "none",
            height: "300px",
            width: "50%",
            display: "inline-block",
            overflowY: "scroll",
            padding: "0px"
          }}
        ></ul>
        <div id={`pagination`}></div>
      </div>

      <form onSubmit={onSubmitHandler} encType="multipart/form-data">
        <div style={{ margin: "5px" }}>
          <Input
            type="text"
            value={Name}
            placeholder="식당: 검색 후 선택하세요"
            onChange={onNameHandler}
            readOnly
            style={{ width: "300px" }}
          />
        </div>
        <div style={{ margin: "5px" }}>
          <Input
            type="text"
            value={Address}
            placeholder="주소: 검색 후 선택하세요"
            onChange={onAddressHandler}
            readOnly
            style={{ width: "300px" }}
          />
        </div>
        {parentCompName === "MarkerPage" ? (
          <div
            style={{
              display: "inline-block",
              margin: "5px"
            }}
          >
            <ReactStars
              count={5}
              value={Rating}
              onChange={onRatingHandler}
              size={52}
              isHalf={true}
              activeColor="#ffd700"
            />
            <br />
            방문 날짜
            <DatePicker
              selected={VisitiedDate}
              onChange={onVisitiedDateHandler}
              onChangeRaw={handleDateChangeRaw}
            />
            <div style={{ marginLeft: "100px", margin: "5px" }}>
              <input type="file" onChange={onImageDataHandler} />
            </div>
          </div>
        ) : null}
        <div>
          {isConverting ? (
            <Button
              variant="danger"
              style={{ margin: "20px" }}
              type="submit"
              disabled
            >
              등록
            </Button>
          ) : (
            <Button variant="primary" style={{ margin: "20px" }} type="submit">
              등록
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}

export default withRouter(Enroll);
