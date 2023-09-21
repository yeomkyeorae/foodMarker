import React, { useState, useRef, Dispatch, SetStateAction } from "react";
import { Button, Modal } from "react-bootstrap";
import { withRouter, RouteComponentProps } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { useDispatch } from "react-redux";
import {
  registerRestaurant,
  registerJpegImg,
  registerHeicImg
} from "../../../_actions/restaurant_action";
import ImageInput from "../Input/ImageInput";
import * as S from "./UpdateModal.style";
import { useAuthContext } from "../../../context/auth";

interface Props extends RouteComponentProps {
  toggle: boolean;
  setToggle: Dispatch<SetStateAction<boolean>>;
  restaurantName: string;
  wishListId: string;
  wishListName: string;
  wishListAddress: string;
  setAlertToggle: Dispatch<SetStateAction<boolean>>;
  setAlertMessage: Dispatch<SetStateAction<string>>;
  deleteHandler: (wishListId: string) => void;
  setShowLoadingOverlay: Dispatch<SetStateAction<boolean>>;
}

function UpdateModal({ toggle, setToggle, restaurantName, wishListId, wishListName, wishListAddress, setAlertToggle, setAlertMessage, deleteHandler, setShowLoadingOverlay }: Props): React.ReactElement {
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
  const [representImageIx, setRepresentImageIx] = useState<number>(0);

  // HEIC 변환 중 여부
  const [isConverting, setIsConverting] = useState(false);

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

    const user = useAuthContext();
    const userId = user.userId as string;
    const username = user.userName as string;
    
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
      created: new Date().toISOString(),
      representIx: representImageIx
    };

    setShowLoadingOverlay(true);
    dispatch(registerRestaurant(body))
      .then(response => {
        if (response.payload.success) {
          setShowLoadingOverlay(false);
          setAlertToggle(true);
          setAlertMessage("방문 표시되었습니다.");

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
    setRepresentImageIx(0);
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
        <S.InputTitle>별점</S.InputTitle>
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
        <S.InputTitle>방문 일시</S.InputTitle>
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
        <S.InputTitle>메뉴</S.InputTitle>
        <div>
          <div style={{ margin: "5px" }}>
            <S.Input
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
        <S.InputTitle>이미지 업로드</S.InputTitle>
        <div style={{ marginLeft: "100px", display: "inline-block" }}>
          <ImageInput
            inputRef={inputRef}
            setAlertToggle={setAlertToggle}
            setAlertMessage={setAlertMessage}
            setIsConverting={setIsConverting}
            setHeicImageData={setHeicImageData}
            setHeicImageName={setHeicImageName}
            setHeicCount={setHeicCount}
            setJpegImageData={setJpegImageData}
            setJpegCount={setJpegCount}
            setPreImages={setPreImages}
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
                  style={{ display: "inline-block", margin: "5px", cursor: "pointer", border: `${index === representImageIx ? "5px solid red" : "0px"}` }}
                  onClick={() => setRepresentImageIx(index)}
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
    </Modal>
  );
}

export default withRouter(UpdateModal);
