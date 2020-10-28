import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";

const Item = styled.li`
  display: block;
  clear: both;
  counter-increment: list;
  padding-bottom: 4rem;
  font-size: 1.1rem;
  line-height: 1.375;
  position: relative;
`;

const HeadLine = styled.h2`
  padding: 0rem 0 0 0;
  margin: 0 0 1rem 0;
  font: normal 2rem var(--font-head);
`;

function WishListItem(props) {
  const { wishListId, wishListName, wishListAddress } = props;
  const dispatch = useDispatch();
  const [popUpToggle, setPopUpToggle] = useState(false);

  const openPopUp = () => {
    setPopUpToggle(!popUpToggle);
  };

  return (
    <Item key={wishListId}>
      <HeadLine>{wishListName}</HeadLine>
      <button onClick={() => props.deleteHandler(wishListId)}>삭제</button>
      <button onClick={() => openPopUp()}>방문함</button>
      {popUpToggle && <div>haha</div>}
      <span>{wishListAddress}</span> <br />
      <hr />
    </Item>
  );
}

export default withRouter(WishListItem);
