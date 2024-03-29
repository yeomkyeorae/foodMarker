import { useState, useEffect, useCallback, Dispatch, SetStateAction } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Card, Col } from 'react-bootstrap';
import RestaurantItemModal from '../../components/restaurant/RestaurantItemModal';
import ReactStars from 'react-rating-stars-component';
import { EatingTimeType } from '../../library/def';
import noImage from '../../assets/noImage.jpeg';
import './RestaurantListItem.css';
import { RestaurantDetail } from '../../interfaces/Restaurant';
import AlertModal from '../../components/alert/AlertModal';

interface Props extends RouteComponentProps {
  restaurant: RestaurantDetail;
  restaurantList: RestaurantDetail[];
  setRestaurantList: Dispatch<SetStateAction<RestaurantDetail[]>>;
}

function RestaurantListItem({ restaurant, restaurantList, setRestaurantList }: Props): React.ReactElement | null {
  const restaurantDate = new Date(restaurant.date).toLocaleDateString();
  const [toggle, setToggle] = useState(false);
  const [hasHover, setHasHover] = useState(false);
  const [starSize, setStarSize] = useState(window.innerWidth / 30);
  const [alertToggle, setAlertToggle] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const getMenus = useCallback((restaurant) => {
    let menus = '';
    if (restaurant.menus) {
      const menusArr = JSON.parse(restaurant.menus);
      menusArr.forEach((menu, index) => {
        menus += menu;
        if (menusArr.length - 1 !== index) {
          menus += ', ';
        }
      });
    }
    return menus;
  }, []);

  const getImageUrls = useCallback((restaurant) => {
    let imgUrls: string[] = [];
    if (restaurant.imgURL) {
      imgUrls = restaurant.imgURL.split(',');
    } else {
      imgUrls.push(noImage);
    }
    return imgUrls;
  }, []);

  const getRepresentativeImage = useCallback((restaurant) => {
    if (restaurant.imgURL) {
      return restaurant.imgURL.split(',')[restaurant?.representIx ?? 0];
    } else {
      return noImage;
    }
  }, []);

  useEffect(() => {
    function handleSize() {
      setStarSize(Math.round(window.innerWidth / 30));
    }

    window.addEventListener('resize', handleSize);
    return () => window.removeEventListener('resize', handleSize);
  }, []);

  const menus: string = getMenus(restaurant);
  const imgUrls: string[] = getImageUrls(restaurant);

  return restaurant.address ? (
    <>
      <Col sm={6} md={4} lg={3} style={{ paddingBottom: '10px' }}>
        <Card style={{ width: '100%', height: '100%' }}>
          <Card.Body style={{ padding: '0px' }}>
            <div style={{ width: '100%', display: 'flex' }}>
              <Card.Img
                className='responsive-image'
                variant='top'
                src={getRepresentativeImage(restaurant)}
                onError={(e: any) => {
                  e.target.onerror = null;
                  e.target.src = noImage;
                }}
                onMouseEnter={() => setHasHover(true)}
                style={{
                  width: '100%',
                  minHeight: '360px',
                }}
              />
              {hasHover ? (
                <div
                  onMouseLeave={() => setHasHover(false)}
                  onClick={() => setToggle(true)}
                  style={{ cursor: 'pointer' }}
                >
                  <Card.ImgOverlay
                    style={{
                      opacity: 0.8,
                      backgroundColor: 'gray',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                    }}
                  >
                    <Card.Title>{restaurant.name}</Card.Title>
                    <Card.Text>{restaurant.address}</Card.Text>
                    <Card.Text>
                      {restaurantDate.slice(0, restaurantDate.length - 1)}({EatingTimeType[restaurant.eatingTime]})
                    </Card.Text>
                    <div
                      style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    >
                      <ReactStars
                        count={5}
                        value={restaurant.rating}
                        edit={false}
                        size={starSize}
                        isHalf={true}
                        activeColor='#ffd700'
                      />
                    </div>
                    <span style={{ fontSize: '0.8em' }}>{menus.length > 0 ? menus : '메뉴 등록 x'}</span>
                  </Card.ImgOverlay>
                </div>
              ) : null}
            </div>
          </Card.Body>
        </Card>
      </Col>
      {toggle ? (
        <RestaurantItemModal
          toggle={toggle}
          setToggle={setToggle}
          restaurant={restaurant}
          restaurantImgUrls={imgUrls}
          restaurantList={restaurantList}
          setRestaurantList={setRestaurantList}
          setAlertToggle={setAlertToggle}
          setAlertMessage={setAlertMessage}
          readOnly={false}
        />
      ) : null}
      {alertToggle ? (
        <AlertModal setAlertToggle={setAlertToggle} alertMessage={alertMessage} setToggle={setToggle} />
      ) : null}
    </>
  ) : null;
}

export default withRouter(RestaurantListItem);
