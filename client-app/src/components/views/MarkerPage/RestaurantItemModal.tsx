import React, { useState, useRef, Dispatch, SetStateAction } from "react";
import { Button, Modal } from "react-bootstrap";
import { withRouter, RouteComponentProps } from "react-router-dom";
import heic2any from "heic2any";
import ReactStars from "react-rating-stars-component";
import { useDispatch } from "react-redux";
import {
  updateRestaurant,
  registerJpegImg,
  registerHeicImg
} from "../../../_actions/restaurant_action";
import styled from "styled-components";
import KakaoMap from "../../containers/KakaoMap/KakaoMap";
import { RestaurantItemModalMenu } from "../../../library/def";
import { deleteRestaurant } from "../../../_actions/restaurant_action";
import ImageList from "../../containers/RestaurantItemModal/ImageList";
import { RestaurantDetail } from "../../interfaces/Restaurant";


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
  restaurantAddress: string;
  restaurantId: string;
  restaurantDate: string;
  restaurantImgUrls: string[];
  rating: number;
  eatingTime: number;
  menus: string;
  restaurantList: RestaurantDetail[];
  setRestaurantList: Dispatch<SetStateAction<RestaurantDetail[]>>;
  setAlertToggle: Dispatch<SetStateAction<boolean>>;
  setAlertMessage: Dispatch<SetStateAction<string>>;
}


function RestaurntItemModal({ toggle, setToggle, restaurantName, restaurantAddress, restaurantId, restaurantDate, restaurantImgUrls,
  rating, eatingTime, menus, restaurantList, setRestaurantList, setAlertToggle, setAlertMessage }: Props): React.ReactElement {

  const [newRating, setNewRating] = useState(rating ? rating : 0);
  const [visitedDate, setVisitedDate] = useState(
    restaurantDate ? restaurantDate : ""
  );
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

  // HEIC 변환 중 여부
  const [isConverting, setIsConverting] = useState(false);

  // modal menu
  const [modalMenu, setModalMenu] = useState(RestaurantItemModalMenu.Image);

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
      menus: JSON.stringify(menuItems)
    };

    dispatch(updateRestaurant(body))
      .then(response => {
        if (response.payload.success) {
          setAlertToggle(true);
          setAlertMessage("수정이 완료되었습니다");
          setToggle(!toggle);

          const newRestaurantList = restaurantList.map(el => {
            if (el._id === restaurantId) {
              return {
                ...el,
                date: visitedDate,
                imgURL: imgURL,
                rating: newRating,
                eatingTime: newEatingTime,
                menus: JSON.stringify(menuItems)
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

  const menuChange = (value: number) => {
    setModalMenu(value);
  }

  const deleteHandler = async () => {
    dispatch(deleteRestaurant(restaurantId)).then(response => {
      if (response.payload.success) {
        setAlertToggle(true);
        setAlertMessage("등록 맛집이 삭제되었습니다.");
        setToggle(!toggle);

        const newRestaurantList = restaurantList.filter(el => {
          if (el._id === restaurantId) {
            return false;
          } else {
            return true;
          }
        });

        setRestaurantList(newRestaurantList);
      }
    }).catch(err => {
      setAlertToggle(true);
      setAlertMessage("등록 맛집 삭제에 실패했습니다.");
      console.log(err);
    });
  };

  const getModalBody = () => {
    if (modalMenu === RestaurantItemModalMenu.Image) {
      return (
        <ImageList restaurantImgUrls={restaurantImgUrls} />
      )
    } else if (modalMenu === RestaurantItemModalMenu.Modify) {
      return (
        <>
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
        </>)
    } else if (modalMenu === RestaurantItemModalMenu.Map) {
      return (
        <div
          style={{
            margin: "auto",
            width: "100%"
          }}
        >
          <KakaoMap address={restaurantAddress} restaurantName={restaurantName} width={"100%"} />
        </div>
      )
    } else if (modalMenu === RestaurantItemModalMenu.Delete) {
      return (
        <div
          style={{
            margin: "auto",
            width: "100%"
          }}
        >
          <div style={{ margin: "10px 0px" }}>
            <span>삭제하시겠습니까?</span><br />
            <Button size="sm" variant="danger" onClick={deleteHandler}>확인</Button>
          </div>
        </div>
      )
    }
  }

  const modalBody = getModalBody();

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
      <Modal.Header
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Button variant="success" style={{ margin: '5px' }} onClick={() => menuChange(0)}>
          이미지
        </Button>
        <Button variant="primary" style={{ margin: '5px' }} onClick={() => menuChange(1)}>
          수정
        </Button>
        <Button variant="secondary" style={{ margin: '5px' }} onClick={() => menuChange(2)}>
          지도
        </Button>
        <Button variant="danger" style={{ margin: '5px' }} onClick={() => menuChange(3)}>
          삭제
        </Button>
      </Modal.Header>
      {modalBody}
    </Modal>
  );
}

export default withRouter(RestaurntItemModal);
