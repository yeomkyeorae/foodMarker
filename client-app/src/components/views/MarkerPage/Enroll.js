import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  registerRestaurant,
  registerJpegImg,
  registerHeicImg
} from "../../../_actions/restaurant_action";
import { registerWishList } from "../../../_actions/wishList_action";
import MapForEnroll from "../../containers/KakaoMap/MapForEnroll";
import { Button } from "react-bootstrap";
import heic2any from "heic2any";
import ReactStars from "react-rating-stars-component";
import styled from "styled-components";

const InputTitle = styled.div`
  width: 30%;
  margin: auto;
  font-weight: bold;
  font-size: 1rem;
  text-align: left;
  border-bottom: 1px solid black;
  margin-bottom: 10px;
`;

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
  // Input 관련 state
  const [Name, setName] = useState("");
  const [SearchName, setSearchName] = useState("을지로3가");
  const [Address, setAddress] = useState("");
  const [Rating, setRating] = useState(0);
  const [VisitedDate, setVisitedDate] = useState("");
  const [eatingTime, setEatingTime] = useState(1);
  const [newMenuItem, setNewMenuItem] = useState("");
  const [menuItems, setMenuItems] = useState([]);

  // JPEG 이미지
  const [jpegImageData, setJpegImageData] = useState([]);
  const [jpegCount, setJpegCount] = useState(0);
  const [jpegPreImages, setJpegPreImages] = useState([]);

  // HEIC 이미지
  const [heicImageData, setHeicImageData] = useState([]);
  const [heicImageName, setHeicImageName] = useState([]);
  const [heicCount, setHeicCount] = useState(0);
  const [heicPreImages, setHeicPreImages] = useState([]);

  // HEIC 변환 중 여부
  const [isConverting, setIsConverting] = useState(false);

  // Toggle
  const [Toggle, setToggle] = useState(true);

  // Props, etc.
  const userId = window.sessionStorage.getItem("userId");
  const username = window.sessionStorage.getItem("username");
  const parentCompName = props.parentCompName;
  const dispatch = useDispatch();
  const inputRef = useRef();

  // Handlers
  const onNameHandler = e => {
    setName(e.currentTarget.value);
  };

  const onChangeSearchNameHandler = e => {
    setSearchName(e.currentTarget.value);
  };

  const onAddressHandler = e => {
    setAddress(e.currentTarget.value);
  };

  const onRatingHandler = newRating => {
    setRating(newRating);
  };

  const onVisitedDateHandler = e => {
    setVisitedDate(String(e.currentTarget.value));
  };

  const onEatingTimeHandler = e => {
    setEatingTime(parseInt(e.target.value));
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

    const inputImageCnt = Object.keys(e.target.files).length;
    if (inputImageCnt > 5) {
      alert("이미지 파일은 5개를 초과할 수 없습니다");
      return;
    }

    let heicTotalCnt = 0;
    let jpegTotalCnt = 0;
    Object.keys(e.target.files).forEach(key => {
      if (e.target.files[key].type === "image/heic") {
        heicTotalCnt += 1;
      } else {
        jpegTotalCnt += 1;
      }
    });

    setIsConverting(true);

    // JPEG 관련 변수
    const formData = new FormData();
    const jpegPreImages = [];

    // HEIC 관련 변수
    const imageData = [];
    const imageNames = [];
    const heicPreImages = [];

    let jpegCnt = 0;
    let heicCnt = 0;
    Object.keys(e.target.files).forEach((key, index) => {
      const file = e.target.files[key];

      if (file.type === "image/heic") {
        const reader = new FileReader();

        reader.onloadend = function() {
          const image = reader.result;

          fetch(image)
            .then(res => res.blob())
            .then(blob =>
              heic2any({ blob, toType: "image/jpeg", quality: 0.7 })
            )
            .then(conversionResult => {
              // heic type 제거한 imageName
              const splited = file.name.split(".");
              const removedType = splited.slice(0, splited.length - 1);
              const newImageName = removedType.join("");

              const fileReader = new FileReader();
              fileReader.onload = function(e) {
                heicCnt += 1;
                heicPreImages.push(e.target.result);
                imageData.push(e.target.result);
                imageNames.push(newImageName);

                if (heicCnt === heicTotalCnt) {
                  setHeicImageData(imageData);
                  setHeicImageName(imageNames);
                  setHeicCount(heicCnt);

                  setHeicPreImages(heicPreImages);
                  setIsConverting(false);
                }
              };
              fileReader.readAsDataURL(conversionResult);
            })
            .catch(err => {
              console.log(err);
            });
        };
        reader.readAsDataURL(file);
      } else {
        formData.append("restaurant_jpeg_img", file);
        const reader = new FileReader();
        reader.onload = () => {
          jpegCnt += 1;
          jpegPreImages.push(reader.result);

          if (jpegCnt === jpegTotalCnt) {
            setJpegCount(jpegCnt);
            setJpegPreImages(jpegPreImages);
          }
          if (heicTotalCnt === 0) {
            setIsConverting(false);
          }
        };
        reader.readAsDataURL(file);
      }
    });
    setJpegImageData(formData);
  };

  const onSubmitHandler = async e => {
    e.preventDefault();

    // 나의 맛집
    if (parentCompName === "MarkerPage") {
      // JPEG 저장
      let jpegPath = [];
      if (jpegCount) {
        const response = await dispatch(registerJpegImg(jpegImageData));
        jpegPath = response.payload.fileNames;
      }

      // HEIC 저장
      let heicPath = [];
      if (heicCount) {
        const heicBody = {
          images: heicImageData,
          imgNames: heicImageName
        };
        const response = await dispatch(registerHeicImg(heicBody));
        heicPath = response.payload.fileNames;
      }

      const imagePath = jpegPath.concat(heicPath).join(",");

      const body = {
        visitor: userId,
        username: username,
        name: Name,
        address: Address,
        date: VisitedDate,
        imgURL: imagePath,
        rating: Rating,
        eatingTime: eatingTime,
        menus: JSON.stringify(menuItems),
        created: new Date().toLocaleString()
      };

      dispatch(registerRestaurant(body))
        .then(response => {
          if (response.payload.success) {
            setName("");
            setAddress("");
            setVisitedDate("");
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
          console.log(err);
        });
    } else if (parentCompName === "WishPage") {
      // 위시 맛집
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

  const initAllImages = () => {
    inputRef.current.value = "";

    setJpegImageData([]);
    setJpegCount(0);
    setJpegPreImages([]);

    setHeicImageData([]);
    setHeicImageName([]);
    setHeicCount(0);
    setHeicPreImages([]);
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
          <InputTitle>맛집 이름 & 주소(위에서 맛집 검색 후 선택)</InputTitle>
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
              <InputTitle>별점</InputTitle>
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
              <InputTitle>방문 일시</InputTitle>
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
                onChange={e => onEatingTimeHandler(e)}
              >
                <option value="1">아침</option>
                <option value="2">점심</option>
                <option value="3">저녁</option>
                <option value="4">기타</option>
              </select>
            </div>

            <div>
              <div style={{ margin: "5px" }}>
                <InputTitle>메뉴</InputTitle>
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

            <div style={{ margin: "5px" }}>
              <InputTitle>이미지 업로드</InputTitle>
              <div style={{ display: "inline-block" }}>
                <input
                  type="file"
                  ref={inputRef}
                  onChange={onImageDataHandler}
                  style={{ width: "60%" }}
                  multiple
                />
              </div>
              {(jpegPreImages.length > 0 || heicPreImages.length > 0) &&
              isConverting === false ? (
                <div style={{ marginTop: "10px" }}>
                  <Button variant="danger" onClick={() => initAllImages()}>
                    초기화
                  </Button>
                </div>
              ) : null}
              <div style={{ marginTop: "10px" }}>
                {jpegPreImages.length > 0
                  ? jpegPreImages.map((preImage, index) => {
                      return (
                        <div
                          key={index}
                          style={{ display: "inline-block", margin: "5px" }}
                        >
                          <img
                            src={preImage}
                            alt={"jpeg"}
                            width="100px"
                            height="100px"
                          />
                        </div>
                      );
                    })
                  : null}
              </div>
              <div style={{ marginTop: "10px" }}>
                {heicPreImages.length > 0
                  ? heicPreImages.map((preImage, index) => {
                      return (
                        <div
                          key={index}
                          style={{ display: "inline-block", margin: "5px" }}
                        >
                          <img
                            src={preImage}
                            alt={"heic"}
                            width="100px"
                            height="100px"
                          />
                        </div>
                      );
                    })
                  : null}
              </div>
            </div>
          </>
        ) : null}
        <div>
          <hr />
          <Button
            variant={isConverting ? "danger" : "primary"}
            style={{ margin: "20px", width: "10%" }}
            type="submit"
            disabled={isConverting ? true : false}
          >
            등록
          </Button>
        </div>
      </form>
    </div>
  );
}

export default withRouter(Enroll);
