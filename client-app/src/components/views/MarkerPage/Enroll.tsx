import React, { useState, useRef, useEffect, Dispatch, SetStateAction } from "react";
import { useDispatch } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router-dom";
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
import AlertModal from "../../containers/AlertModal/AlertModal";
import { InputImageLimit } from '../../../library/def';


const InputTitle = styled.div<{ fontSize?: string; borderBottom?: string; }>`
  max-width: 700px;
  margin: auto;
  font-weight: bold;
  font-size: ${props => props.fontSize ? props.fontSize : "1rem"};
  text-align: left;
  border-bottom: ${props => props.borderBottom ? props.borderBottom : '0.5px'} solid black;
  margin-bottom: 10px;
`;

const Input = styled.input`
  margin: 3px 0;
  padding: 15px 10px;
  min-width: 300px;
  max-width: 700px;
  outline: none;
  border: 1px solid #bbb;
  border-radius: 20px;
  display: inline-block;
  text-align: center;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-transition: 0.2s ease all;
  -moz-transition: 0.2s ease all;
  -ms-transition: 0.2s ease all;
  -o-transition: 0.2s ease all;
  transition: 0.2s ease all;
`;

interface Props extends RouteComponentProps {
  parentCompName: string;
  setToggle: Dispatch<SetStateAction<boolean>>;
  setMenu: Dispatch<SetStateAction<string>>;
  history: RouteComponentProps["history"]
}

function Enroll({ parentCompName, setToggle, setMenu, history }: Props): React.ReactElement {
  // Input 관련 state
  const [name, setName] = useState("");
  const [searchName, setSearchName] = useState("을지로3가");
  const [address, setAddress] = useState("");
  const [rating, setRating] = useState(0);
  const [visitedDate, setVisitedDate] = useState("");
  const [eatingTime, setEatingTime] = useState(1);
  const [newMenuItem, setNewMenuItem] = useState("");
  const [menuItems, setMenuItems] = useState<string[]>([]);
  const [starSize, setStarSize] = useState(window.innerWidth / 25);

  useEffect(() => {
    function handleSize() {
      setStarSize(Math.round(window.innerWidth / 25));
    }

    window.addEventListener('resize', handleSize);
    return () => window.removeEventListener('resize', handleSize);
  }, [])

  // JPEG 이미지
  const [jpegImageData, setJpegImageData] = useState<any>([]);
  const [jpegCount, setJpegCount] = useState(0);

  // HEIC 이미지
  const [heicImageData, setHeicImageData] = useState<any[]>([]);
  const [heicImageName, setHeicImageName] = useState<any[]>([]);
  const [heicCount, setHeicCount] = useState(0);

  // PreImages
  const [preImages, setPreImages] = useState<any[]>([]);
  const [representImageIx, setRepresentImageIx] = useState<number>(0);

  // HEIC 변환 중 여부
  const [isConverting, setIsConverting] = useState(false);

  // Toggle
  const [enrollToggle, setEnrollToggle] = useState(true);

  // alert
  const [alertToggle, setAlertToggle] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  // Props, etc.
  const userId = window.sessionStorage.getItem("userId") as string;
  const username = window.sessionStorage.getItem("username") as string;

  const dispatch = useDispatch<any>();
  const searchInputRef: React.RefObject<any> = useRef();
  const fileInputRef: React.RefObject<any> = useRef();
  const menuInputRef: React.RefObject<any> = useRef();
  const menuAddBtnRef: React.RefObject<any> = useRef();

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
    if (newMenuItem !== "") {
      setMenuItems(menuItems.concat([newMenuItem]));
      setNewMenuItem("");
    }
  };

  const onMenuDeleteHandler = index => {
    setMenuItems(menuItems.filter((menu, menuIx) => menuIx !== index));
  };

  const onImageDataHandler = e => {
    e.preventDefault();

    const files = e.target.files;

    const inputImageCnt = Object.keys(files).length;
    if (inputImageCnt > InputImageLimit) {
      setAlertToggle(true);
      setAlertMessage("이미지 파일은 5개를 초과할 수 없습니다");
      return;
    }

    let heicTotalCnt = 0;
    let jpegTotalCnt = 0;

    Object.keys(files).forEach(key => {
      if (files[key].type === "image/heic") {
        heicTotalCnt += 1;
      } else {
        jpegTotalCnt += 1;
      }
    });

    setIsConverting(true);

    // JPEG 관련 변수
    const formData = new FormData();
    const jpegPreImages: any[] = [];

    // HEIC 관련 변수
    const imageData: any[] = [];
    const imageNames: any[] = [];
    const heicPreImages: any[] = [];

    let jpegCnt = 0;
    let heicCnt = 0;
    Object.keys(files).forEach((key) => {
      const file = files[key];

      if (file.type === "image/heic") {
        const reader = new FileReader();

        reader.onloadend = function () {
          const image = reader.result as string;

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
              fileReader.onload = (e: any) => {
                heicCnt += 1;
                heicPreImages.push(e.target.result);
                imageData.push(e.target.result);
                imageNames.push(newImageName);

                if (heicCnt === heicTotalCnt) {
                  setHeicImageData(imageData);
                  setHeicImageName(imageNames);
                  setHeicCount(heicCnt);

                  setPreImages(preImages => preImages.concat(heicPreImages));
                  setIsConverting(false);
                }
              };
              fileReader.readAsDataURL(conversionResult as Blob);
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
            setPreImages(preImages => preImages.concat(jpegPreImages));
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

    if (name.length === 0 || address.length === 0) {
      setAlertToggle(true);
      setAlertMessage("식당을 검색해서 선택해 주세요!");
      return;
    }

    // 나의 맛집
    if (parentCompName === "MarkerPage") {
      if (visitedDate.length === 0) {
        setAlertToggle(true);
        setAlertMessage("방문 날짜를 입력해주세요!");
        return;
      }

      if (rating === 0) {
        setAlertToggle(true);
        setAlertMessage("별점을 입력해 주세요!");
        return;
      }

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
        name: name,
        address: address,
        date: visitedDate,
        imgURL: imagePath,
        rating: rating,
        eatingTime: eatingTime,
        menus: JSON.stringify(menuItems),
        created: new Date().toLocaleString(),
        representIx: representImageIx
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
            setToggle(true);
            setMenu("식당 등록");
            history.push("/marker", userId);
          }
        })
        .catch(err => {
          setAlertToggle(true);
          setAlertMessage("맛집 등록에 실패했습니다");
          console.log(err);
        });
    } else if (parentCompName === "WishPage") {
      // 위시 맛집
      const body = {
        user: userId,
        username: username,
        name: name,
        address: address,
        created: new Date().toLocaleString()
      };
      dispatch(registerWishList(body)).then(response => {
        if (response.payload.success) {
          setName("");
          setAddress("");
          setToggle(true);
          setMenu("위시리스트 등록");
          history.push("/wish", userId);
        }
      }).catch(err => {
        setAlertToggle(true);
        setAlertMessage("위시 리스트 등록에 실패했습니다");
        console.log(err);
      });
    }
  };

  const toggleHandler = () => {
    setEnrollToggle(!enrollToggle);
  };

  const onSearchKeyPress = e => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      searchInputRef.current.focus();
      toggleHandler();
    }
  };

  const onMenuAddKeyPress = e => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();

      if (newMenuItem !== "") {
        menuAddBtnRef.current.focus();
        onMenuAddHandler();
      }
    }
  };

  const initAllImages = () => {
    fileInputRef.current.value = "";

    setJpegImageData([]);
    setJpegCount(0);

    setHeicImageData([]);
    setHeicImageName([]);
    setHeicCount(0);

    setPreImages([]);
    setRepresentImageIx(0);
  };

  return (
    <div>
      <div
        id={`menu_wrap`}
        className="bg_white"
        style={{ display: "inline-block", width: "90%" }}
      >
        <div>
          <InputTitle fontSize={"1.5rem"} borderBottom={"2px"}>맛집 검색</InputTitle>
          <Input
            type="text"
            value={searchName}
            onChange={onChangeSearchNameHandler}
            id={`keyword`}
            onKeyPress={onSearchKeyPress}
          />
          <Button
            variant="success"
            style={{ margin: "10px" }}
            type="submit"
            onClick={toggleHandler}
            ref={searchInputRef}
          >
            검색
          </Button>
        </div>
        <MapForEnroll toggle={enrollToggle} setName={setName} setAddress={setAddress} width={"50%"} />
        <ul
          id={`placesList`}
          style={{
            listStyle: "none",
            height: "300px",
            minWidth: "500px",
            maxWidth: "700px",
            display: "inline-block",
            overflowY: "scroll",
            padding: "0px"
          }}
        ></ul>
        <div id={`pagination`}></div>
      </div>
      <hr />

      <form onSubmit={onSubmitHandler} onKeyPress={e => { e.key === 'Enter' && e.preventDefault() }} encType="multipart/form-data">
        <div style={{ margin: "5px" }}>
          <InputTitle>맛집 이름 & 주소(검색해 선택해 주세요)</InputTitle>
          <Input
            type="text"
            value={name}
            placeholder="맛집 이름"
            onChange={onNameHandler}
            readOnly
          />
        </div>
        <div style={{ margin: "5px" }}>
          <Input
            type="text"
            value={address}
            placeholder="맛집 주소"
            onChange={onAddressHandler}
            readOnly
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
                  value={rating}
                  onChange={onRatingHandler}
                  size={starSize}
                  isHalf={true}
                  activeColor="#ffd700"
                />
              </div>
            </div>

            <div style={{ margin: "5px" }}>
              <InputTitle>방문 일시</InputTitle>
              <input
                type="date"
                value={visitedDate}
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
                  onKeyPress={onMenuAddKeyPress}
                  ref={menuInputRef}
                />
                <br />
                <Button
                  variant="success"
                  style={{ margin: "10px", display: "inline-block" }}
                  onClick={() => onMenuAddHandler()}
                  onKeyPress={() => menuInputRef.current.focus()}
                  ref={menuAddBtnRef}
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
                  ref={fileInputRef}
                  onChange={onImageDataHandler}
                  style={{ width: "70%" }}
                  multiple
                />
              </div>
              {preImages.length > 0 && isConverting === false ? (
                <div style={{ marginTop: "10px" }}>
                  <Button variant="danger" onClick={() => initAllImages()}>
                    초기화
                  </Button>
                </div>
              ) : null}
              <div style={{ marginTop: "10px" }}>
                {preImages.length > 0
                  ? preImages.map((preImage, index) => {
                    return (
                      <div
                        key={index}
                        style={{ display: "inline-block", margin: "5px", cursor: "pointer", border: `${index === representImageIx ? "5px solid red" : "0px"}` }}
                        onClick={() => setRepresentImageIx(index)}
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
            </div>
          </>
        ) : null}
        <div>
          <hr />
          <Button
            variant={isConverting ? "danger" : "primary"}
            style={{ margin: "20px", width: "15%" }}
            type="submit"
            disabled={isConverting ? true : false}
          >
            {isConverting ? '이미지 변환 중' : '등록'}
          </Button>
        </div>
      </form>
      {
        alertToggle ?
          <AlertModal setAlertToggle={setAlertToggle} alertMessage={alertMessage} /> :
          null
      }
    </div>
  );
}

export default withRouter(Enroll);
