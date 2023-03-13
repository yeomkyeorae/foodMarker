import React, { useState, useRef } from 'react';
import { Button, Modal } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import { useDispatch } from "react-redux";
import {
  updateRestaurant,
  registerJpegImg,
  registerHeicImg
} from "../../../_actions/restaurant_action";
import LoadingOverlayDiv from '../LoadingOverlay/LoadingOverlay';
import ImageInput from '../Input/ImageInput';
import * as S from "./UpdateBody.style";

const UpdateBody = ({ restaurant, restaurantImgUrls, restaurantList, setRestaurantList, setAlertToggle, setAlertMessage }): React.ReactElement => {
  const restaurantId = restaurant._id;
  const { date, menus, rating, eatingTime, representIx } = restaurant;

  const [newRating, setNewRating] = useState(rating);
  const [visitedDate, setVisitedDate] = useState(date.slice(0, 10));
  const [newEatingTime, setNewEatingTime] = useState(eatingTime);
  const [newMenuItem, setNewMenuItem] = useState("");
  const [menuItems, setMenuItems] = useState<string[]>(menus ? JSON.parse(menus) : []);

  // JPEG 이미지
  const [jpegImageData, setJpegImageData] = useState<any[]>([]);
  const [jpegCount, setJpegCount] = useState(0);

  // HEIC 이미지
  const [heicImageData, setHeicImageData] = useState<any[]>([]);
  const [heicImageName, setHeicImageName] = useState<any[]>([]);
  const [heicCount, setHeicCount] = useState(0);

  const [preImages, setPreImages] = useState(
    restaurantImgUrls ? restaurantImgUrls : []
  );
  const [representImageIx, setRepresentImageIx] = useState<number>(representIx ?? 0);

  // HEIC 변환 중 여부
  const [isConverting, setIsConverting] = useState(false);

  // 맛집 등록 오버레이
  const [showLoadingOverlay, setShowLoadingOverlay] = useState<boolean>(false);

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

  const changeRestaurant = async e => {
    e.preventDefault();

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
    const imgURL = imagePath.length > 0 ? imagePath : preImages.join(',');

    const body = {
      restaurantId: restaurantId,
      date: visitedDate,
      imgURL: imgURL,
      rating: newRating,
      eatingTime: newEatingTime,
      menus: JSON.stringify(menuItems),
      representIx: representImageIx
    };

    setShowLoadingOverlay(true);
    dispatch(updateRestaurant(body))
      .then(response => {
        if (response.payload.success) {
          setAlertToggle(true);
          setAlertMessage("수정이 완료되었습니다");
          setShowLoadingOverlay(false);

          const newRestaurantList = restaurantList.map(el => {
            if (el._id === restaurantId) {
              return {
                ...el,
                date: visitedDate,
                imgURL: imgURL,
                rating: newRating,
                eatingTime: newEatingTime,
                menus: JSON.stringify(menuItems),
                representIx: representImageIx
              }
            } else {
              return el;
            }
          });

          setRestaurantList(newRestaurantList);
        } else {
          setAlertToggle(true);
          setAlertMessage("수정이 실패했습니다");
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
    <>
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
                  style={{ display: "inline-block", margin: "5px", cursor: "pointer", border: `${representImageIx === index ? "5px solid red" : "0px"}` }}
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
        {isConverting ? (
          <Button variant="danger" disabled>
            수정하기
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
      <LoadingOverlayDiv showOverlay={showLoadingOverlay} />
    </>
  )
}

export default UpdateBody;