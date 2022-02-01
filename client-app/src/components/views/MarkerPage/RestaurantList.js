import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  readRestaurants,
  readRestaurantsCount,
  deleteRestaurant
} from "../../../_actions/restaurant_action";
import RestaurantListItem from "./RestaurantListItem";
import { Row } from "react-bootstrap";
import styled from "styled-components";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import AlertModal from "../../containers/AlertModal/AlertModal";
import "./RestaurantList.css";


const Div = styled.div`
  width: 90%;
  display: inline-block;
  height: 80vh;
`;

const Restaurants = styled.div`
  width: 100%;
  display: inline-block;
  overflow-y: scroll;
`;

const List = styled.ol`
  list-style: none;
  width: 95%;
  max-width: 100%;
`;

const Pagination = styled.div`
  display: inline-block;
  margin: 3px;
  font-size: 1.5rem;
  color: ${props => (props.selected ? "#1D800E" : "black")};
  &:hover {
    text-decoration: none;
    cursor: pointer;
    color: #46CB18;
  }
`;

const SortMenu = styled.div`
  color: ${props => (props.color === "true" ? "#D21404" : "black")};
  display: inline-block;
  cursor: pointer;
  width: ${props => props.width};
  user-select: none;
  text-align: center;
  margin: 5px 10px;
  font-size: 1.4vw;
`;

function RestaurantList(props) {
  const dispatch = useDispatch();
  const [restaurants, setRestaurants] = useState([{ _id: 0 }]);
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [pageSetNum, setPageSetNum] = useState(0);
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState(1);
  const [alertToggle, setAlertToggle] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const ITEMPERPAGE = 8;
  const DISPLAYPAGENUM = 5;
  const body = {
    id: window.sessionStorage.getItem("userId"),
    page: page,
    itemPerPage: ITEMPERPAGE,
    order: order
  };

  const deleteHandler = restaurantId => {
    dispatch(deleteRestaurant(restaurantId)).then(response => {
      if (response.payload.success) {
        setAlertToggle(true);
        setAlertMessage("등록 맛집이 삭제되었습니다.");
        setRestaurants(
          restaurants.filter(restaurant => restaurant._id !== restaurantId)
        );
      }
    }).catch(err => {
      setAlertToggle(true);
      setAlertMessage("등록 맛집 삭제에 실패했습니다.");
      console.log(err);
    });
  };

  const onSetOrderHandler = value => {
    setOrder(value);
    setPage(1);
  };

  const onSetPageHandler = page => {
    setPage(page);
  };

  const onSetPageSetNum = (type, pageIfMove, limitPageSetNum) => {
    if (type === 0) { // 왼쪽 화살표 버튼
      if(page % DISPLAYPAGENUM === 1) {
        if (pageSetNum > 0) {
          setPageSetNum(pageSetNum - 1);
          setPage(pageIfMove);
        }
      } else if(page > 1) {
        setPage(page - 1);
      }
    } else if (type === 1) {  // 오른쪽 화살표 버튼
      if(page % DISPLAYPAGENUM === 0) {
        if (totalItemCount > ITEMPERPAGE * DISPLAYPAGENUM * (pageSetNum + 1)) {
          setPageSetNum(pageSetNum + 1);
          setPage(pageIfMove);
        }
      } else if(page < limitPageSetNum) {
        setPage(page + 1);
      }
    }
  };

  useEffect(() => {
    dispatch(readRestaurantsCount(body.id)).then(response => {
      setTotalItemCount(response.payload);

      dispatch(readRestaurants(body)).then(response => {
        setRestaurants(response.payload);
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, order]);

  const pages = [];
  const passingNum = DISPLAYPAGENUM * pageSetNum;
  const limitPage = Math.ceil(totalItemCount / ITEMPERPAGE);
  const limitPageSetNum =
    limitPage >= DISPLAYPAGENUM * (pageSetNum + 1)
      ? DISPLAYPAGENUM * (pageSetNum + 1)
      : (limitPage % DISPLAYPAGENUM) + DISPLAYPAGENUM * pageSetNum;

  let beforeFirst, afterFirst;
  for (let i = passingNum; i < limitPageSetNum; i++) {
    if (i === passingNum) {
      beforeFirst = passingNum - DISPLAYPAGENUM + 1;
      afterFirst = passingNum + DISPLAYPAGENUM + 1;
    }
    pages.push(
      <Pagination
        key={"restaurantPage" + i}
        onClick={() => onSetPageHandler(i + 1)}
        selected={page === i + 1}
      >
        {i + 1}
      </Pagination>
    );
  }

  return (
    <div>
      <div style={{width: "100%", display: "flex", justifyContent: "center"}}>
        <SortMenu onClick={() => onSetOrderHandler(order === 1 ? 2 : 1)} color={`${order === 1 || order === 2}`}>
          {order === 1 ? "식당 이름 오름차순↑" : order === 2 ? "식당 이름 내림차순↓" : "식당 이름 오름차순↑"}
        </SortMenu>
        <SortMenu onClick={() => onSetOrderHandler(order === 3 ? 4 : 3)} color={`${order === 3 || order === 4}`}>
          {order === 3 ? "최신 방문 날짜 순↑" : order === 4 ? "오랜 방문 날짜 순↓" : "최신 방문 날짜 순↑"}
        </SortMenu>
        <SortMenu onClick={() => onSetOrderHandler(order === 5 ? 6 : 5)} color={`${order === 5 || order === 6}`}>
          {order === 5 ? "별점 높은 순↑" : order === 6 ? "별점 낮은 순↓" : "별점 높은 순↑"}
        </SortMenu>
      </div>
      <Div>
        <Restaurants>
          <List>
            <Row className="show-grid">
              {restaurants.map(restaurant => (
                <RestaurantListItem
                  key={restaurant._id}
                  setAddress={props.setAddress}
                  setRestaurantName={props.setRestaurantName}
                  restaurant={restaurant}
                  deleteHandler={deleteHandler}
                ></RestaurantListItem>
              ))}
            </Row>
          </List>
        </Restaurants>
        {
          restaurants.length > 0 ? 
           (
              <div>
                <div style={{ display: "inline-block" }}>
                  <AiOutlineArrowLeft className="arrow" size={24} onClick={() => onSetPageSetNum(0, beforeFirst)} style={{cursor: "pointer", marginBottom: "5px"}} />
                  {pages.map(page => page)}
                  <AiOutlineArrowRight className="arrow" size={24} onClick={() => onSetPageSetNum(1, afterFirst, limitPageSetNum)} style={{cursor: "pointer", marginBottom: "5px"}} />
                </div>
            </div>
           ) : (
             <div>
               등록된 나의 맛집이 없습니다!
             </div>
           )
        }
      </Div>
      {
        alertToggle ?
        <AlertModal setAlertToggle={setAlertToggle} alertMessage={alertMessage} /> :
        null
      }
    </div>
  );
}

export default withRouter(RestaurantList);
