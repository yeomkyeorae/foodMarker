import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  readWishList,
  deleteWishList
} from "../../../_actions/wishList_action";
import WishListItem from "./WishListItem";
import styled from "styled-components";
import AlertModal from "../../containers/AlertModal/AlertModal";
import { WishListType } from "../../interfaces/WishList";


const WishLists = styled.div`
  width: 40%;
  height: 100%;
  display: inline-block;
  height: 80vh;
  margin-bottom: 5px;
`;

const List = styled.ol`
  list-style: none;
  width: 100%;
  padding-left: 0px;
`;

function WishList(props) {
  const dispatch = useDispatch<any>();
  const [wishLists, setWishLists] = useState<WishListType[]>([]);
  const [alertToggle, setAlertToggle] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const userId = window.sessionStorage.getItem("userId") as string;

  useEffect(() => {
    dispatch(readWishList(userId)).then(response => {
      setWishLists(response.payload);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteHandler = wishListId => {
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
      {
        alertToggle ?
        <AlertModal setAlertToggle={setAlertToggle} alertMessage={alertMessage} /> :
        null
      }
    </WishLists>
  );
}

export default withRouter(WishList);
