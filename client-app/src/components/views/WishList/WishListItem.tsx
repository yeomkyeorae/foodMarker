import React, { useState, Dispatch, SetStateAction } from "react";
import { useDispatch } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import {
  deleteWishList
} from "../../../_actions/wishList_action";
import UpdateModal from "../../containers/WishUpdateModal/UpdateModal";
import KakaoMapModal from "../../containers/KakaoMap/KakaoMapModal";
import { BsThreeDots } from "react-icons/bs";
import AlertModal from "../../containers/AlertModal/AlertModal";
import { WishListType } from "../../interfaces/WishList";
import * as S from "./WishListItem.style";

const CustomToggle = React.forwardRef(({ children, onClick }: { children: React.ReactNode, onClick: React.MouseEventHandler<any> }, ref: any) => (
  <span
    ref={ref}
    onClick={e => {
      e.preventDefault();
      onClick(e);
    }}
    style={{ cursor: "pointer" }}
  >
    {children}
  </span>
));

interface Props extends RouteComponentProps {
  wishListId: string;
  wishListName: string;
  wishListAddress: string;
  wishListCreated: string;
  wishLists: WishListType[];
  setWishLists: Dispatch<SetStateAction<WishListType[]>>;
  setShowLoadingOverlay: Dispatch<SetStateAction<boolean>>;
}


function WishListItem({ wishListId, wishListName, wishListAddress, wishListCreated, wishLists, setWishLists, setShowLoadingOverlay }: Props): React.ReactElement {
  const dispatch = useDispatch<any>();
  const [popUpToggle, setPopUpToggle] = useState(false);
  const [mapToggle, setMapToggle] = useState(false);

  const [alertToggle, setAlertToggle] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const restaurant = {
    name: wishListName,
    address: wishListAddress
  };

  const openPopUp = () => {
    setPopUpToggle(!popUpToggle);
  };

  const popUpMap = () => {
    setMapToggle(true);
  };

  const deleteHandler = (wishListId: string) => {
    dispatch(deleteWishList(wishListId)).then(response => {
      if (response.payload.success) {
        setWishLists(wishLists.filter(wishList => wishList._id !== wishListId));
      }
    }).catch(err => {
      setAlertToggle(true);
      setAlertMessage("위시리스트 삭제에 실패했습니다");
      console.log(err);
    });
  };

  return (
    <S.Item key={wishListId} style={{ width: "100%" }}>
      <div style={{ float: "right", marginRight: "10px" }}>
        <Dropdown>
          <Dropdown.Toggle as={CustomToggle}><BsThreeDots /></Dropdown.Toggle>
          <Dropdown.Menu title="">
            <Dropdown.Item onClick={() => popUpMap()}>지도 보기</Dropdown.Item>
            <Dropdown.Item onClick={() => openPopUp()}>방문 표시</Dropdown.Item>
            <Dropdown.Item
              onClick={() => deleteHandler(wishListId)}
              style={{ color: "red" }}
            >
              삭제
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <S.HeadLine>{wishListName}</S.HeadLine><br />
      <S.Created>{new Date(wishListCreated).toLocaleString()}</S.Created> <br />
      <S.Address>{wishListAddress}</S.Address> <br />
      <UpdateModal
        toggle={popUpToggle}
        setToggle={setPopUpToggle}
        restaurantName={wishListName}
        wishListId={wishListId}
        wishListName={wishListName}
        wishListAddress={wishListAddress}
        setAlertToggle={setAlertToggle}
        setAlertMessage={setAlertMessage}
        deleteHandler={deleteHandler}
        setShowLoadingOverlay={setShowLoadingOverlay}
      />
      <KakaoMapModal
        Toggle={mapToggle}
        setToggle={setMapToggle}
        restaurant={restaurant}
      />
      {
        alertToggle ?
          <AlertModal setAlertToggle={setAlertToggle} alertMessage={alertMessage} /> :
          null
      }
    </S.Item>
  );
}

export default withRouter(WishListItem);
