import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Button } from "react-bootstrap";
import UpdateModal from "../../containers/UpdateModal/UpdateModal";
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
  padding: 0rem 0 0 0;
  margin: 1rem 0 1rem 0;
  font: normal 2rem var(--font-head);
  font-size: 2rem;
`;

function WishListItem(props) {
  const {
    wishListId,
    wishListName,
    wishListAddress,
    userId,
    deleteHandler
  } = props;
  const [popUpToggle, setPopUpToggle] = useState(false);
  const [Rating, setRating] = useState(0);

  const openPopUp = () => {
    setPopUpToggle(!popUpToggle);
  };

  return (
    <Item key={wishListId} style={{ width: "100%" }}>
      <HeadLine>{wishListName}</HeadLine>
      <span>{wishListAddress}</span> <br />
      <div>
        <Button
          variant="success"
          onClick={() => openPopUp()}
          style={{ margin: "2px" }}
        >
          방문
        </Button>
        <Button
          variant="danger"
          onClick={() => deleteHandler(wishListId)}
          style={{ margin: "2px" }}
        >
          삭제
        </Button>
      </div>
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
    </Item>
  );
}

export default withRouter(WishListItem);
