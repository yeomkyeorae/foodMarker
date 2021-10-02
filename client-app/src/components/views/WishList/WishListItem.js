import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import UpdateModal from "../../containers/UpdateModal/UpdateModal";
import KakaoMapModal from "../../containers/KakaoMap/KakaoMapModal";
import styled from "styled-components";

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

const HeadLine = styled.h2`
  padding: 0;
  margin-left: 25px;
  margin-bottom: 0;
  font-size: 3.5vw;
`;

const Address = styled.h4`
  padding: 0;
  margin-bottom: 0;
  font-size: 2vw;
`;

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
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

function WishListItem(props) {
  const {
    wishListId,
    wishListName,
    wishListAddress,
    wishListCreated,
    deleteHandler
  } = props;
  const [popUpToggle, setPopUpToggle] = useState(false);
  const [mapToggle, setMapToggle] = useState(false);

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

  return (
    <Item key={wishListId} style={{ width: "100%" }}>
      <div style={{ float: "right", marginRight: "10px" }}>
        <Dropdown>
          <Dropdown.Toggle as={CustomToggle}>...</Dropdown.Toggle>
          <Dropdown.Menu size="sm" title="">
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
      <HeadLine>{wishListName}</HeadLine>
      <span style={{ fontSize: "10px" }}>{wishListCreated}</span> <br />
      <Address>{wishListAddress}</Address> <br />
      <UpdateModal
        type="WishListItem"
        toggle={popUpToggle}
        setToggle={setPopUpToggle}
        restaurantName={wishListName}
        wishListId={wishListId}
        wishListName={wishListName}
        wishListAddress={wishListAddress}
        setPopUpToggle={setPopUpToggle}
        deleteHandler={deleteHandler}
      />
      <KakaoMapModal
        Toggle={mapToggle}
        setToggle={setMapToggle}
        restaurant={restaurant}
      />
    </Item>
  );
}

export default withRouter(WishListItem);
