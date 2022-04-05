import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Card, Col } from "react-bootstrap";
import ResturantItemModal from "./ReataurantItemModal";
import KakaoMapModal from "../../containers/KakaoMap/KakaoMapModal";
import ReactStars from "react-rating-stars-component";
import noImage from "../../../assets/noImage.jpeg";
import "./RestaurantListItem.css";


const eatingObj = {
  "1": "아침",
  "2": "점심",
  "3": "저녁",
  "4": "기타"
};


function RestaurantListItem(props) {
  const restaurant = props.restaurant;

  const restaurantDateSplit = String(restaurant.date).split("-");
  const restaurantDate = `${restaurantDateSplit[0]}년 ${restaurantDateSplit[1]}월 ${restaurantDateSplit[2]}일`;
  const [toggle, setToggle] = useState(false);
  const [hasHover, setHasHover] = useState(false);
  const [starSize, setStarSize] = useState(window.innerWidth / 30);
  const rating = restaurant.rating;

  let menus = "";
  if (restaurant.menus) {
    const menusArr = JSON.parse(restaurant.menus);
    menusArr.forEach((menu, index) => {
      menus += menu;
      if (menusArr.length - 1 !== index) {
        menus += ", ";
      }
    });
  }

  useEffect(() => {
    function handleSize() {
      setStarSize(Math.round(window.innerWidth / 30));
    }

    window.addEventListener('resize', handleSize);
    return () => window.removeEventListener('resize', handleSize);
  }, [])

  let imgUrls: string[] = [];
  let isMultipleImages = false;
  if (restaurant.imgURL) {
    imgUrls = [restaurant.imgURL.split(",")[0]];
    isMultipleImages = imgUrls.length > 1 ? true : false;
  } else {
    imgUrls.push(noImage);
  }

  return restaurant.address ? (
    <>
      <Col sm={6} md={4} lg={3} style={{ paddingBottom: "10px" }}>
        <Card style={{ width: "100%", height: "100%" }}>
          <Card.Body style={{ padding: "0px" }}>
            <div style={{ width: "100%", display: 'flex' }}>
                <Card.Img
                  className="responsive-image"
                  variant="top"
                  src={imgUrls[0]}
                  onError={(e: any) => {e.target.onerror = null; e.target.src=noImage}}
                  onMouseEnter={() => setHasHover(true)}
                  style={{
                    width: "100%",
                    minHeight: "360px"
                  }}
                />
                {
                  hasHover ?
                    <div onMouseLeave={() => setHasHover(false)} onClick={() => setToggle(true)} style={{ cursor: 'pointer' }}>
                      <Card.ImgOverlay style={{opacity: 0.6, backgroundColor: 'gray', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                        <Card.Title>{restaurant.name}</Card.Title>
                        <Card.Text>{restaurant.address}</Card.Text>
                        <Card.Text>
                          {restaurantDate}({eatingObj[restaurant.eatingTime]})
                        </Card.Text>
                        <div
                          style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center"
                          }}
                        >
                          <ReactStars
                            count={5}
                            value={rating}
                            edit={false}
                            size={starSize}
                            isHalf={true}
                            activeColor="#ffd700"
                          />
                        </div>
                        <span style={{ fontSize: "0.8em" }}>{menus.length > 0 ? menus : '메뉴 등록 x' }</span>
                      </Card.ImgOverlay>
                    </div>
                    : null
                }
            </div>
          </Card.Body>
        </Card>
      </Col>
      {
        toggle ? (
          <ResturantItemModal
            type="RestaurantListItem"
            toggle={toggle}
            setToggle={setToggle}
            restaurantName={restaurant.name}
            restaurantId={restaurant._id}
            restaurantDate={restaurant.date}
            restaurantImgUrls={imgUrls}
            rating={rating}
            eatingTime={restaurant.eatingTime}
            menus={restaurant.menus}
          />
        ) : null}
    </>
  ) : null;
}

export default withRouter(RestaurantListItem);
