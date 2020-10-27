import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  readWishList,
  deleteWishList
} from "../../../_actions/wishList_action";
import styled from "styled-components";

const WishLists = styled.div`
  width: 300px;
  height: 400px;
  display: inline-block;
  overflow-y: scroll;
`;

const List = styled.ol`
  list-style: none;
  width: 600px;
  max-width: 70%;
`;

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

const FoodImg = styled.img`
  max-width: 100%;
  height: auto;
`;

function WishListList(props) {
  const dispatch = useDispatch();
  const [wishLists, setWishLists] = useState([{ _id: 0 }]);
  const userId = props.userId;
  const body = {
    id: userId
  };

  useEffect(() => {
    dispatch(readWishList(body)).then(response => {
      setWishLists(response.payload);
    });
  }, [JSON.stringify(wishLists)]);

  const deleteHandler = wishListId => {
    dispatch(deleteWishList(wishListId)).then(response => {
      if (response.payload.success) {
        setWishLists(wishLists.filter(wishList => wishList._id !== wishListId));
      }
    });
  };

  return (
    <WishLists>
      <List>
        {wishLists.map(wishList => (
          <Item key={wishList._id}>
            <HeadLine>{wishList.name}</HeadLine>
            <button onClick={() => deleteHandler(wishList._id)}>삭제</button>
            <span>{wishList.address}</span> <br />
            <hr />
          </Item>
        ))}
      </List>
    </WishLists>
  );
}

export default withRouter(WishListList);
