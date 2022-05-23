import React, { useState, useRef, Dispatch, SetStateAction } from "react";
import { Button, Modal } from "react-bootstrap";
import { withRouter, RouteComponentProps } from "react-router-dom";
import heic2any from "heic2any";
import ReactStars from "react-rating-stars-component";
import { useDispatch } from "react-redux";
import {
  registerRestaurant,
  registerJpegImg,
  registerHeicImg
} from "../../../_actions/restaurant_action";
import styled from "styled-components";
import AlertModal from "../AlertModal/AlertModal";

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

interface Props extends RouteComponentProps {
  toggle: boolean;
  setToggle: Dispatch<SetStateAction<boolean>>;
  restaurantName: string;
  wishListId: string;
  wishListName: string;
  wishListAddress: string;
  setPopUpToggle: Dispatch<SetStateAction<boolean>>;
  deleteHandler: (wishListId: string) => void;
}

function UpdateModal({ toggle, setToggle, restaurantName, wishListId, wishListName, wishListAddress, setPopUpToggle, deleteHandler }: Props): React.ReactElement {
  const [newRating, setNewRating] = useState(0);
  const [visitedDate, setVisitedDate] = useState("");
  const [newEatingTime, setNewEatingTime] = useState(1);
  const [newMenuItem, setNewMenuItem] = useState("");
  const [menuItems, setMenuItems] = useState<string[]>([]);

  // JPEG 이미지
  const [jpegImageData, setJpegImageData] = useState<any[]>([]);
  const [jpegCount, setJpegCount] = useState(0);

  // HEIC 이미지
  const [heicImageData, setHeicImageData] = useState<any[]>([]);
  const [heicImageName, setHeicImageName] = useState<any[]>([]);
  const [heicCount, setHeicCount] = useState(0);

  const [preImages, setPreImages] = useState<any[]>([]);

  // HEIC 변환 중 여부
  const [isConverting, setIsConverting] = useState(false);

  // alert
  const [alertToggle, setAlertToggle] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  // etc.
  const dispatch = useDispatch<any>();
  const inputRef: React.RefObject<any> = useRef();

  // Handlers
  const onVisitedDateHandler = e => {
    setVisitedDate(String(e.currentTarget.value));
  };

  const onChangeNewMenuItem = e => {
    setNewMenuItem(e.currentTarget.value);
  };

  const onMenuAddHandler = () => {
    setMenuItems(menuItems.concat([newMenuItem]));
    setNewMenuItem("");
  };

  const onMenuDeleteHandler = index => {
    setMenuItems(menuItems.filter((menu, menuIx) => menuIx !== index));
  };

  const onImageDataHandler = e => {
    e.preventDefault();

    const inputImageCnt = Object.keys(e.target.files).length;
    if (inputImageCnt > 5) {
      setAlertToggle(true);
      setAlertMessage("이미지 파일은 5개를 초과할 수 없습니다");
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
    const jpegPreImages: any[] = [];

    // HEIC 관련 변수
    const imageData: any[] = [];
    const imageNames: any[] = [];
    const heicPreImages: any[] = [];

    let jpegCnt = 0;
    let heicCnt = 0;
    Object.keys(e.target.files).forEach((key) => {
      const file = e.target.files[key];

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
              setAlertToggle(true);
              setAlertMessage("HEIC 이미지 파일 변환에 실패했습니다");
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
    setJpegImageData(Array.from(formData));
  };

  const delWishEnrollRestaurant = async e => {
    e.preventDefault();

    if (visitedDate.length === 0) {
      setAlertToggle(true);
      setAlertMessage("방문 날짜를 입력해주세요!");
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

    const userId = window.sessionStorage.getItem("userId") as string;
    const username = window.sessionStorage.getItem("username") as string;

    const body = {
      visitor: userId,
      username: username,
      name: wishListName,
      address: wishListAddress,
      date: visitedDate,
      imgURL: imagePath,
      rating: newRating,
      eatingTime: newEatingTime,
      menus: JSON.stringify(menuItems),
      created: new Date().toLocaleDateString()
    };

    dispatch(registerRestaurant(body))
      .then(response => {
        if (response.payload.success) {
          setAlertToggle(true);
          setAlertMessage("방문 표시되었습니다.");
          setToggle(true);
          setPopUpToggle(false);
          deleteHandler(wishListId);
        } else {
          setAlertToggle(true);
          setAlertMessage("방문 표시에 실패했습니다");
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const initAllImages = () => {
    inputRef.current.value = "";

    setJpegImageData([]);
    setJpegCount(0);

    setHeicImageData([]);
    setHeicImageName([]);
    setHeicCount(0);

    setPreImages([]);
  };

  return (
    <Modal
      show={toggle}
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
            value={newRating}
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
            value={visitedDate}
            placeholder="방문 일시"
            onChange={e => onVisitedDateHandler(e)}
          />
          <select
            id="select"
            value={newEatingTime}
            style={{ marginLeft: "5px" }}
            onChange={e => setNewEatingTime(parseInt(e.target.value))}
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
        {preImages.length > 0 && isConverting === false ? (
          <div style={{ marginTop: "10px" }}>
            <Button variant="danger" onClick={() => initAllImages()}>
              초기화
            </Button>
          </div>
        ) : null}
        <div style={{ marginTop: "10px", margin: "auto" }}>
          {preImages && preImages.length > 0
            ? preImages.map((url, index) => {
              return (
                <div
                  key={index}
                  style={{ display: "inline-block", margin: "5px" }}
                >
                  <img src={url} alt={"jpeg"} width="100px" height="100px" />
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
        {
          isConverting ? (
            <Button variant="danger" disabled>
              방문 표시하기
            </Button>
          ) : (
            <Button variant="success" onClick={delWishEnrollRestaurant}>
              방문 표시하기
            </Button>
          )
        }
      </Modal.Footer>
      {
        alertToggle ?
          <AlertModal setAlertToggle={setAlertToggle} alertMessage={alertMessage} /> :
          null
      }
    </Modal>
  );
}

export default withRouter(UpdateModal);
