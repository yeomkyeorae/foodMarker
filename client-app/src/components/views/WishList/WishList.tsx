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

const SortMenu = styled.div<{ color?: string; }>`
  color: ${props => (props.color === "true" ? "#D21404" : "black")};
  display: inline-block;
  cursor: pointer;
  user-select: none;
  text-align: center;
  margin: 5px 10px;
  font-size: 1.4vw;
`;


function WishList(): React.ReactElement {
  const dispatch = useDispatch<any>();
  const [wishLists, setWishLists] = useState<WishListType[]>([]);
  const [alertToggle, setAlertToggle] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [order, setOrder] = useState(1);

  const userId = window.sessionStorage.getItem("userId") as string;

  useEffect(() => {
    dispatch(readWishList(userId, order)).then(response => {
      setWishLists(response.payload);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order]);

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

  const onSetOrderHandler = value => {
    setOrder(value);
  };

  return (
    <div style={{ display: "inline-block", width: "100%" }}>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <SortMenu onClick={() => onSetOrderHandler(order === 1 ? 2 : 1)} color={`${order === 1 || order === 2}`}>
          {order === 1 ? "식당 이름 오름차순↑" : order === 2 ? "식당 이름 내림차순↓" : "식당 이름 오름차순↑"}
        </SortMenu>
        <SortMenu onClick={() => onSetOrderHandler(order === 3 ? 4 : 3)} color={`${order === 3 || order === 4}`}>
          {order === 3 ? "등록 날짜 순↑" : order === 4 ? "등록 날짜 순↓" : "등록 날짜 순↑"}
        </SortMenu>
      </div>
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
                  setAlertToggle={setAlertToggle}
                  setAlertMessage={setAlertMessage}
                  deleteHandler={deleteHandler}
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
    </div>
  );
}

export default withRouter(WishList);
