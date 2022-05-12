import { useState, useEffect, useCallback, Dispatch, SetStateAction } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Card, Col } from "react-bootstrap";
import RestaurantItemModal from "./RestaurantItemModal";
import ReactStars from "react-rating-stars-component";
import { EatingTimeType } from "../../../library/def";
import noImage from "../../../assets/noImage.jpeg";
import "./RestaurantListItem.css";
import { RestaurantDetail } from '../../interfaces/Restaurant';
import AlertModal from '../../containers/AlertModal/AlertModal';


interface Props extends RouteComponentProps {
  restaurant: RestaurantDetail;
  restaurantList: RestaurantDetail[];
  setRestaurantList: Dispatch<SetStateAction<RestaurantDetail[]>>;
}


function RestaurantListItem({ restaurant, restaurantList, setRestaurantList }: Props): React.ReactElement | null {
  const restaurantDateSplit = String(restaurant.date).split("-");
  const restaurantDate = `${restaurantDateSplit[0]}년 ${restaurantDateSplit[1]}월 ${restaurantDateSplit[2]}일`;
  const [toggle, setToggle] = useState(false);
  const [hasHover, setHasHover] = useState(false);
  const [starSize, setStarSize] = useState(window.innerWidth / 30);
  const [alertToggle, setAlertToggle] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const rating = restaurant.rating;

  const getMenus = useCallback((restaurant) => {
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
    return menus;
  }, []);

  const getRepresentativeImage = useCallback((restaurant) => {
    // TODO: 설정한 대표 이미지 가져오기
    let imgUrls: string[] = [];
    if (restaurant.imgURL) {
      imgUrls = restaurant.imgURL.split(",");
    } else {
      imgUrls.push(noImage);
    }
    return imgUrls;
  }, []);

  useEffect(() => {
    function handleSize() {
      setStarSize(Math.round(window.innerWidth / 30));
    }

    window.addEventListener('resize', handleSize);
    return () => window.removeEventListener('resize', handleSize);
  }, [])

  const menus: string = getMenus(restaurant);
  const imgUrls: string[] = getRepresentativeImage(restaurant);

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
                onError={(e: any) => { e.target.onerror = null; e.target.src = noImage }}
                onMouseEnter={() => setHasHover(true)}
                style={{
                  width: "100%",
                  minHeight: "360px"
                }}
              />
              {
                hasHover ?
                  <div onMouseLeave={() => setHasHover(false)} onClick={() => setToggle(true)} style={{ cursor: 'pointer' }}>
                    <Card.ImgOverlay style={{ opacity: 0.8, backgroundColor: 'gray', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <Card.Title>{restaurant.name}</Card.Title>
                      <Card.Text>{restaurant.address}</Card.Text>
                      <Card.Text>
                        {restaurantDate}({EatingTimeType[restaurant.eatingTime]})
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
                      <span style={{ fontSize: "0.8em" }}>{menus.length > 0 ? menus : '메뉴 등록 x'}</span>
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
          <RestaurantItemModal
            toggle={toggle}
            setToggle={setToggle}
            restaurantName={restaurant.name}
            restaurantAddress={restaurant.address}
            restaurantId={restaurant._id}
            restaurantDate={restaurant.date}
            restaurantImgUrls={imgUrls}
            rating={rating}
            eatingTime={restaurant.eatingTime}
            menus={restaurant.menus}
            restaurantList={restaurantList}
            setRestaurantList={setRestaurantList}
            setAlertToggle={setAlertToggle}
            setAlertMessage={setAlertMessage}
          />
        ) : null}
      {
        alertToggle ?
          <AlertModal setAlertToggle={setAlertToggle} alertMessage={alertMessage} /> :
          null
      }
    </>
  ) : null;
}

export default withRouter(RestaurantListItem);
