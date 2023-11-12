import React, { useState, Dispatch, SetStateAction } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import KakaoMap from '../kakaoMap/KakaoMap';
import { RestaurantItemModalMenu } from '../../library/def';
import { deleteRestaurant } from '../../_actions/restaurant_action';
import ImageListBody from './ImageListBody';
import { RestaurantDetail } from '../../interfaces/Restaurant';
import UpdateBody from './UpdateBody';

interface Props extends RouteComponentProps {
  toggle: boolean;
  setToggle: Dispatch<SetStateAction<boolean>>;
  restaurantImgUrls: string[];
  restaurant: RestaurantDetail;
  restaurantList: RestaurantDetail[];
  setRestaurantList?: Dispatch<SetStateAction<RestaurantDetail[]>>;
  setAlertToggle?: Dispatch<SetStateAction<boolean>>;
  setAlertMessage?: Dispatch<SetStateAction<string>>;
  readOnly: boolean;
}

function RestaurantItemModal({
  toggle,
  setToggle,
  restaurant,
  restaurantImgUrls,
  restaurantList,
  setRestaurantList,
  setAlertToggle,
  setAlertMessage,
  readOnly,
}: Props): React.ReactElement {
  const restaurantName = restaurant.name;
  const restaurantId = restaurant._id;
  const { address, representIx } = restaurant;

  // modal menu
  const [modalMenu, setModalMenu] = useState(RestaurantItemModalMenu.Image);

  // etc.
  const dispatch = useDispatch<any>();

  const menuChange = (value: number) => {
    setModalMenu(value);
  };

  const deleteHandler = async () => {
    dispatch(deleteRestaurant(restaurantId))
      .then((response) => {
        if (response.payload.success) {
          if (setAlertToggle) {
            setAlertToggle(true);
          }
          if (setAlertMessage) {
            setAlertMessage('등록 맛집이 삭제되었습니다.');
          }
          setToggle(!toggle);

          if (restaurantList && setRestaurantList) {
            const newRestaurantList = restaurantList.filter((el) => {
              if (el._id === restaurantId) {
                return false;
              } else {
                return true;
              }
            });

            setRestaurantList(newRestaurantList);
          }
        }
      })
      .catch((err) => {
        if (setAlertToggle) {
          setAlertToggle(true);
        }
        if (setAlertMessage) {
          setAlertMessage('등록 맛집 삭제에 실패했습니다.');
        }
        console.log(err);
      });
  };

  const getModalBody = () => {
    if (modalMenu === RestaurantItemModalMenu.Image) {
      return <ImageListBody restaurantImgUrls={restaurantImgUrls} representIx={representIx} />;
    } else if (modalMenu === RestaurantItemModalMenu.Modify) {
      return (
        <UpdateBody
          restaurant={restaurant}
          restaurantImgUrls={restaurantImgUrls}
          restaurantList={restaurantList}
          setRestaurantList={setRestaurantList}
          setAlertToggle={setAlertToggle}
          setAlertMessage={setAlertMessage}
        />
      );
    } else if (modalMenu === RestaurantItemModalMenu.Map) {
      return (
        <div
          style={{
            margin: 'auto',
            width: '100%',
          }}
        >
          <KakaoMap address={address} restaurantName={restaurantName} width={'100%'} />
        </div>
      );
    } else if (modalMenu === RestaurantItemModalMenu.Delete) {
      return (
        <div
          style={{
            margin: 'auto',
            width: '100%',
          }}
        >
          <div style={{ margin: '10px 0px' }}>
            <span>삭제하시겠습니까?</span>
            <br />
            <Button size='sm' variant='danger' onClick={deleteHandler}>
              확인
            </Button>
          </div>
        </div>
      );
    }
  };

  const modalBody = getModalBody();

  return (
    <Modal
      show={toggle}
      onHide={() => setToggle(false)}
      style={{
        textAlign: 'center',
      }}
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton />
      <Modal.Header
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Modal.Title>{restaurantName}</Modal.Title>
      </Modal.Header>
      <Modal.Header
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Button variant='success' style={{ margin: '5px' }} onClick={() => menuChange(0)}>
          이미지
        </Button>
        {!readOnly ? (
          <Button variant='primary' style={{ margin: '5px' }} onClick={() => menuChange(1)}>
            수정
          </Button>
        ) : null}
        <Button variant='secondary' style={{ margin: '5px' }} onClick={() => menuChange(2)}>
          지도
        </Button>
        {!readOnly ? (
          <Button variant='danger' style={{ margin: '5px' }} onClick={() => menuChange(3)}>
            삭제
          </Button>
        ) : null}
      </Modal.Header>
      {modalBody}
    </Modal>
  );
}

export default withRouter(RestaurantItemModal);
