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
import styled from "styled-components";
import AlertModal from "../../containers/AlertModal/AlertModal";
import { WishListType } from "../../interfaces/WishList";


const Item = styled.li`
  display: block;
  clear: both;
  counter-increment: list;
  font-size: 1.1rem;
  line-height: 1.375;
  position: relative;
  border: 2px solid black;
  margin-bottom: 5px;
`;

const HeadLine = styled.span`
  padding: 0;
  margin-left: 25px;
  margin-bottom: 0;
  font-size: 2vw;
`;

const Created = styled.span`
  padding: 0;
  margin-bottom: 0;
  font-size: 1vw;
`;

const Address = styled.span`
  padding: 0;
  margin-bottom: 0;
  font-size: 0.8vw;
`;

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
    <Item key={wishListId} style={{ width: "100%" }}>
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
      <HeadLine>{wishListName}</HeadLine><br />
      <Created>{new Date(wishListCreated).toLocaleString()}</Created> <br />
      <Address>{wishListAddress}</Address> <br />
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
    </Item>
  );
}

export default withRouter(WishListItem);
