import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  readWishList,
} from "../../../_actions/wishList_action";
import WishListItem from "./WishListItem";
import styled from "styled-components";
import { WishListType } from "../../interfaces/WishList";
import LoadingOverlayDiv from "../../containers/LoadingOverlay/LoadingOverlay";
import { WishListOrder } from "../../../library/def";


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
  const [order, setOrder] = useState(WishListOrder.enrollAsc);
  const [showLoadingOverlay, setShowLoadingOverlay] = useState<boolean>(false);

  const userId = window.sessionStorage.getItem("userId") as string;

  useEffect(() => {
    dispatch(readWishList(userId, order)).then(response => {
      setWishLists(response.payload);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order]);

  const onSetOrderHandler = value => {
    setOrder(value);
  };

  return (
    <div style={{ display: "inline-block", width: "100%" }}>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <SortMenu
          onClick={() => onSetOrderHandler(order === WishListOrder.enrollAsc ? WishListOrder.enrollDesc : WishListOrder.enrollAsc)}
          color={`${order === WishListOrder.enrollAsc || order === WishListOrder.enrollDesc}`}
        >
          {order === WishListOrder.enrollAsc ? "등록 날짜 순↑" : order === WishListOrder.enrollDesc ? "등록 날짜 순↓" : "등록 날짜 순↑"}
        </SortMenu>
        <SortMenu
          onClick={() => onSetOrderHandler(order === WishListOrder.NameAsc ? WishListOrder.NameDesc : WishListOrder.NameAsc)}
          color={`${order === WishListOrder.NameAsc || order === WishListOrder.NameDesc}`}
        >
          {order === WishListOrder.NameAsc ? "식당 이름 오름차순↑" : order === WishListOrder.NameDesc ? "식당 이름 내림차순↓" : "식당 이름 오름차순↑"}
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
                  wishLists={wishLists}
                  setWishLists={setWishLists}
                  setShowLoadingOverlay={setShowLoadingOverlay}
                />
              ))}
            </List>) : (
              <div>
                등록된 위시리스트 맛집이 없습니다!
              </div>
            )
        }
      </WishLists>
      <LoadingOverlayDiv showOverlay={showLoadingOverlay} />
    </div>
  );
}

export default withRouter(WishList);
