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
  padding-bottom: 1rem;
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
  font: normal 2rem var(--font-head);
  font-size: 2rem;
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
    userId,
    deleteHandler
  } = props;
  const [popUpToggle, setPopUpToggle] = useState(false);
  const [Rating, setRating] = useState(0);
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
            <Dropdown.Item onClick={() => popUpMap()}>지도</Dropdown.Item>
            <Dropdown.Item onClick={() => openPopUp()}>방문</Dropdown.Item>
            <Dropdown.Item onClick={() => deleteHandler(wishListId)}>
              삭제
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <HeadLine>{wishListName}</HeadLine>
      <span style={{ fontSize: "10px" }}>{wishListCreated}</span> <br />
      <span>{wishListAddress}</span> <br />
      <UpdateModal
        Toggle={popUpToggle}
        setToggle={setPopUpToggle}
        restaurantName={wishListName}
        Rating={Rating}
        setRating={setRating}
        setPopUpToggle={setPopUpToggle}
        userId={userId}
        wishListId={wishListId}
        wishListName={wishListName}
        wishListAddress={wishListAddress}
        deleteHandler={deleteHandler}
        type="WishListItem"
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
