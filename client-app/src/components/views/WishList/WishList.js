import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  readWishList,
  deleteWishList
} from "../../../_actions/wishList_action";
import WishListItem from "./WishListItem";
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

function WishList(props) {
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
      } else {
        console.log(response);
        alert("error");
      }
    });
  };

  return (
    <WishLists>
      <List>
        {wishLists.map(wishList => (
          <WishListItem
            key={wishList._id}
            wishListId={wishList._id}
            wishListName={wishList.name}
            wishListAddress={wishList.address}
            userId={userId}
            deleteHandler={deleteHandler}
          />
        ))}
      </List>
    </WishLists>
  );
}

export default withRouter(WishList);
