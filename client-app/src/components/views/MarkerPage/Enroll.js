import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  registerRestaurant,
  registerImg
} from "../../../_actions/restaurant_action";
import { registerWishList } from "../../../_actions/wishList_action";
import MapForEnroll from "../../containers/KakaoMap/MapForEnroll";
import { Button } from "react-bootstrap";
import heic2any from "heic2any";
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
  const [VisitedDate, setVisitedDate] = useState("");
  const [ImageData, setImageData] = useState("");
  const [ImageName, setImageName] = useState("");
  const [isConverting, setIsConverting] = useState(false);
  const [eatingTime, setEatingTime] = useState(1);
  const [newMenuItem, setNewMenuItem] = useState("");
  const [menuItems, setMenuItems] = useState([]);

  const userId = window.sessionStorage.getItem("userId");
  const username = window.sessionStorage.getItem("username");

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
            // heic type 제거한 imageName
            const splited = file.name.split(".");
            const removedType = splited.slice(0, splited.length - 1);
            const newImageName = removedType.join("");

            const fileReader = new FileReader();
            fileReader.readAsDataURL(conversionResult);
            fileReader.onload = function(e) {
              setImageData(e.target.result);
              setImageName(newImageName);
              setIsConverting(false);
            };
          })
          .catch(err => {
            console.log("err: ", err);
          });
      };
      reader.readAsDataURL(file);
    } else {
      const formData = new FormData();
      formData.append("restaurant_img", file);
      setImageData(formData);
      setImageName("");
    }
  };

  const onChangeSearchNameHandler = e => {
    setSearchName(e.currentTarget.value);
  };

  const onChangeNewMenuItem = e => {
    setNewMenuItem(e.currentTarget.value);
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

    if (parentCompName === "MarkerPage") {
      let body;
      if (ImageName === "") {
        body = ImageData;
      } else {
        body = {
          img: ImageData,
          imgName: ImageName
        };
      }
      dispatch(registerImg(body))
        .then(response => {
          const imgURL = response.payload.path;

          const body = {
            visitor: userId,
            username: username,
            name: Name,
            address: Address,
            date: VisitedDate,
            imgURL: imgURL,
            rating: Rating,
            eatingTime: eatingTime,
            menus: JSON.stringify(menuItems),
            created: new Date().toLocaleString()
          };

          return dispatch(registerRestaurant(body));
        })
        .then(response => {
          if (response.payload.success) {
            setName("");
            setAddress("");
            setVisitedDate("");
            setImageData("");
            setImageName("");
            setRating(0);
            setEatingTime(1);
            setMenuItems([]);
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
    } else if (parentCompName === "WishPage") {
      const body = {
        user: userId,
        username: username,
        name: Name,
        address: Address,
        created: new Date().toLocaleString()
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

  const onMenuAddHandler = () => {
    setMenuItems(menuItems.concat(newMenuItem));
    setNewMenuItem("");
  };

  const onMenuDeleteHandler = index => {
    setMenuItems(menuItems.filter((menu, menuIx) => menuIx !== index));
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
            <div
              style={{
                width: "50%",
                margin: "auto",
                fontWeight: "bold",
                fontSize: "1.5rem",
                textAlign: "left",
                borderBottom: "2px solid black"
              }}
            >
              맛집 검색
            </div>
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
      <hr />

      <form onSubmit={onSubmitHandler} encType="multipart/form-data">
        <div style={{ margin: "5px" }}>
          <div
            style={{
              width: "30%",
              margin: "auto",
              fontWeight: "bold",
              fontSize: "1rem",
              textAlign: "left",
              borderBottom: "1px solid black",
              marginBottom: "5px"
            }}
          >
            맛집 이름 & 주소(위에서 맛집 검색 후 선택)
          </div>
          <Input
            type="text"
            value={Name}
            placeholder="맛집 이름"
            onChange={onNameHandler}
            readOnly
            style={{ width: "300px" }}
          />
        </div>
        <div style={{ margin: "5px" }}>
          <Input
            type="text"
            value={Address}
            placeholder="맛집 주소"
            onChange={onAddressHandler}
            readOnly
            style={{ width: "300px" }}
          />
        </div>
        {parentCompName === "MarkerPage" ? (
          <>
            <div
              style={{
                margin: "5px"
              }}
            >
              <div
                style={{
                  width: "30%",
                  margin: "auto",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  textAlign: "left",
                  borderBottom: "1px solid black"
                }}
              >
                별점
              </div>
              <div style={{ display: "inline-block" }}>
                <ReactStars
                  count={5}
                  value={Rating}
                  onChange={onRatingHandler}
                  size={70}
                  isHalf={true}
                  activeColor="#ffd700"
                />
              </div>
            </div>

            <div style={{ margin: "5px" }}>
              <div
                style={{
                  width: "30%",
                  margin: "auto",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  textAlign: "left",
                  borderBottom: "1px solid black",
                  marginBottom: "10px"
                }}
              >
                방문 일시
              </div>
              <input
                type="date"
                value={VisitedDate}
                placeholder="방문 일시"
                onChange={e => onVisitedDateHandler(e)}
              />
              <select
                id="select"
                value={eatingTime}
                style={{ marginLeft: "5px" }}
                onChange={e => setEatingTime(parseInt(e.target.value))}
              >
                <option value="1">아침</option>
                <option value="2">점심</option>
                <option value="3">저녁</option>
                <option value="4">기타</option>
              </select>
            </div>

            <div>
              <div style={{ margin: "5px" }}>
                <div
                  style={{
                    width: "30%",
                    margin: "auto",
                    fontWeight: "bold",
                    fontSize: "1rem",
                    textAlign: "left",
                    borderBottom: "1px solid black",
                    marginBottom: "10px"
                  }}
                >
                  메뉴
                </div>
                <Input
                  type="text"
                  value={newMenuItem}
                  placeholder="메뉴 입력 버튼 클릭"
                  onChange={e => onChangeNewMenuItem(e)}
                  style={{ width: "10%" }}
                />
                <Button
                  variant="success"
                  style={{ margin: "10px", display: "inline-block" }}
                  onClick={() => onMenuAddHandler()}
                >
                  메뉴 추가
                </Button>
              </div>
            </div>
            {menuItems.length
              ? menuItems.map((menu, index) => (
                  <div key={index} style={{ marginTop: "2px" }}>
                    {menu}
                    <Button
                      variant="danger"
                      style={{ marginLeft: "10px" }}
                      onClick={() => onMenuDeleteHandler(index)}
                    >
                      X
                    </Button>
                  </div>
                ))
              : null}

            <div
              style={{
                margin: "5px"
              }}
            >
              <div
                style={{
                  width: "30%",
                  margin: "auto",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  textAlign: "left",
                  borderBottom: "1px solid black",
                  marginBottom: "10px"
                }}
              >
                이미지 업로드
              </div>
              <div style={{ display: "inline-block" }}>
                <input
                  type="file"
                  onChange={onImageDataHandler}
                  style={{ width: "60%" }}
                />
              </div>
            </div>
          </>
        ) : null}
        <div>
          <hr />
          {isConverting ? (
            <Button
              variant="danger"
              style={{ margin: "20px", width: "10%" }}
              type="submit"
              disabled
            >
              등록
            </Button>
          ) : (
            <Button
              variant="primary"
              style={{ margin: "20px", width: "10%" }}
              type="submit"
            >
              등록
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}

export default withRouter(Enroll);
