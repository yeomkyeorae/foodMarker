import React, { useState, useRef } from "react";
import { Button, Modal } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import heic2any from "heic2any";
import ReactStars from "react-rating-stars-component";
import { useDispatch } from "react-redux";
import {
  updateRestaurant,
  registerRestaurant,
  registerJpegImg
} from "../../../_actions/restaurant_action";
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

const InputTitle = styled.div`
  width: 70%;
  margin: auto;
  font-weight: bold;
  font-size: 1rem;
  text-align: left;
  border-bottom: 1px solid black;
`;

function UpdateModal(props) {
  const {
    type,
    Toggle,
    setToggle,
    restaurantName,
    restaurantId,
    restaurantDate,
    restaurantImgUrls,
    Rating,
    eatingTime,
    menus,

    wishListId,
    wishListName,
    wishListAddress,
    setPopUpToggle,
    deleteHandler
  } = props;

  const tmpMenuItems = menus ? JSON.parse(menus) : [];

  const [ImageData, setImageData] = useState("");
  const [ImageName, setImageName] = useState("");
  const [VisitedDate, setVisitedDate] = useState(restaurantDate);
  const [NewRating, setNewRating] = useState(Rating ? Rating : 0);
  const [isConverting, setIsConverting] = useState(false);
  const [EatingTime, setEatingTime] = useState(eatingTime);
  const [newMenuItem, setNewMenuItem] = useState("");
  const [menuItems, setMenuItems] = useState(menus ? tmpMenuItems : []);

  const dispatch = useDispatch();
  const inputRef = useRef();

  const onVisitedDateHandler = e => {
    setVisitedDate(String(e.currentTarget.value));
  };

  const onChangeNewMenuItem = e => {
    setNewMenuItem(e.currentTarget.value);
  };

  const onMenuAddHandler = () => {
    setMenuItems(menuItems.concat(newMenuItem));
    setNewMenuItem("");
  };

  const onMenuDeleteHandler = index => {
    setMenuItems(menuItems.filter((menu, menuIx) => menuIx !== index));
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
          .then(blob => heic2any({ blob, toType: "image/jpeg", quality: 0.7 }))
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
            console.log(err);
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

  const changeRestaurant = e => {
    e.preventDefault();

    if (ImageData !== "") {
      let body;
      if (ImageName === "") {
        body = ImageData;
      } else {
        body = {
          img: ImageData,
          imgName: ImageName
        };
      }
      dispatch(registerJpegImg(body)).then(response => {
        const imgURL = response.payload.path;

        const body = {
          restaurantId: restaurantId,
          date: VisitedDate,
          imgURL: imgURL,
          rating: NewRating,
          eatingTime: EatingTime,
          menus: JSON.stringify(menuItems)
        };

        dispatch(updateRestaurant(body))
          .then(response => {
            if (response.payload.success) {
              alert("수정되었습니다.");
              setToggle(!Toggle);
            } else {
              alert("error");
            }
          })
          .catch(err => {
            console.log(err);
          });
      });
    } else {
      const body = {
        restaurantId: restaurantId,
        date: VisitedDate,
        rating: NewRating,
        eatingTime: EatingTime,
        menus: JSON.stringify(menuItems)
      };

      dispatch(updateRestaurant(body))
        .then(response => {
          if (response.payload.success) {
            alert("수정되었습니다.");
            setToggle(!Toggle);
            setImageData("");
            setImageName("");
          } else {
            alert("error");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  const moveToMain = e => {
    e.preventDefault();
    const userId = window.sessionStorage.getItem("userId");

    const body = {
      visitor: userId,
      name: wishListName,
      address: wishListAddress,
      date: VisitedDate,
      imgURL: ImageData,
      rating: NewRating,
      eatingTime: EatingTime,
      menus: JSON.stringify(menuItems)
    };

    dispatch(registerRestaurant(body))
      .then(response => {
        if (response.payload.success) {
          alert("방문 표시되었습니다.");
          setToggle(true);
          setPopUpToggle(false);
          deleteHandler(wishListId);
        } else {
          alert("error");
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const initAllImages = () => {
    inputRef.curreunt.value = "";
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
        <InputTitle>별점</InputTitle>
        <div
          style={{
            margin: "auto",
            width: "36%"
          }}
        >
          <ReactStars
            count={5}
            value={NewRating}
            onChange={setNewRating}
            size={32}
            isHalf={true}
            activeColor="#ffd700"
          />
        </div>
        <InputTitle>방문 일시</InputTitle>
        <div style={{ margin: "10px" }}>
          <input
            type="date"
            value={VisitedDate}
            placeholder="방문 일시"
            onChange={e => onVisitedDateHandler(e)}
          />
          <select
            id="select"
            value={EatingTime}
            style={{ marginLeft: "5px" }}
            onChange={e => setEatingTime(parseInt(e.target.value))}
          >
            <option value="1">아침</option>
            <option value="2">점심</option>
            <option value="3">저녁</option>
            <option value="4">기타</option>
          </select>
        </div>
        <InputTitle>메뉴</InputTitle>
        <div>
          <div style={{ margin: "5px" }}>
            <Input
              type="text"
              value={newMenuItem}
              placeholder="메뉴 입력"
              onChange={e => onChangeNewMenuItem(e)}
              style={{ width: "30%" }}
            />
            <Button
              variant="success"
              style={{ margin: "10px", display: "inline-block" }}
              onClick={() => onMenuAddHandler()}
            >
              +
            </Button>
            {menuItems.length
              ? menuItems.map((menu, index) => (
                  <div
                    key={index}
                    style={{ marginTop: "2px", marginBottom: "10px" }}
                  >
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
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer style={{ flexDirection: "column" }}>
        <InputTitle>이미지 업로드</InputTitle>
        <div style={{ marginLeft: "100px", display: "inline-block" }}>
          <input
            type="file"
            ref={inputRef}
            onChange={onImageDataHandler}
            multiple
          />
        </div>
        <div style={{ marginTop: "10px" }}>
          <Button variant="danger" onClick={() => initAllImages()}>
            초기화
          </Button>
        </div>
        <div style={{ marginTop: "10px", margin: "auto" }}>
          {restaurantImgUrls && restaurantImgUrls.length > 0
            ? restaurantImgUrls.map((url, index) => {
                return (
                  <div
                    key={index}
                    style={{ display: "inline-block", margin: "5px" }}
                  >
                    <img
                      src={`http://localhost:5000/${url}`}
                      alt={"jpeg"}
                      width="100px"
                      height="100px"
                    />
                  </div>
                );
              })
            : null}
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
