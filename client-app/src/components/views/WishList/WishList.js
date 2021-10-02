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
  width: 60%;
  height: 100%;
  display: inline-block;
`;

const List = styled.ol`
  list-style: none;
  width: 100%;
  padding-left: 0px;
`;

function WishList(props) {
  const dispatch = useDispatch();
  const [wishLists, setWishLists] = useState([{ _id: 0 }]);
  const userId = window.sessionStorage.getItem("userId");
  const body = {
    id: userId
  };

  useEffect(() => {
    dispatch(readWishList(body)).then(response => {
      setWishLists(response.payload);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      {
        wishLists.length > 0 ?
          (<List>
            {wishLists.map(wishList => (
              <WishListItem
                key={wishList._id}
                wishListId={wishList._id}
                wishListName={wishList.name}
                wishListAddress={wishList.address}
                wishListCreated={wishList.created}
                userId={userId}
                deleteHandler={deleteHandler}
                setToggle={props.setToggle}
              />
            ))}
          </List>) : (
            <div>
              등록된 위시리스트 맛집이 없습니다!
            </div>
          )
      }
    </WishLists>
  );
}

export default withRouter(WishList);
