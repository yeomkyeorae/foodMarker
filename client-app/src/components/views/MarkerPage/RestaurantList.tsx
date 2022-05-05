import { useState, useEffect, useRef, useCallback } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  readRestaurantsCount,
  deleteRestaurant
} from "../../../_actions/restaurant_action";
import RestaurantListItem from "./RestaurantListItem";
import { Row } from "react-bootstrap";
import styled from "styled-components";
import AlertModal from "../../containers/AlertModal/AlertModal";
import "./RestaurantList.css";
import useFetch from "./useFetch";
import { itemPerPage } from '../../../library/def';


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

const SortMenu = styled.div<{ color?: string; }>`
  color: ${props => (props.color === "true" ? "#D21404" : "black")};
  display: inline-block;
  cursor: pointer;
  user-select: none;
  text-align: center;
  margin: 5px 10px;
  font-size: 1.4vw;
`;

function RestaurantList(): React.ReactElement {
  const dispatch = useDispatch<any>();
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState(1);
  const [alertToggle, setAlertToggle] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const { loading, error, restaurantList } = useFetch(page, order, totalItemCount);
  const loader = useRef(null);

  const body = {
    id: window.sessionStorage.getItem("userId"),
    page: page,
    itemPerPage: itemPerPage,
    order: order
  };

  const handleObserver = useCallback((entries) => {
    const target = entries[0];

    if (target.isIntersecting) {
      setPage(page => page + 1);
    }
  }, [totalItemCount, setTotalItemCount]);

  const deleteHandler = restaurantId => {
    dispatch(deleteRestaurant(restaurantId)).then(response => {
      if (response.payload.success) {
        setAlertToggle(true);
        setAlertMessage("등록 맛집이 삭제되었습니다.");
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

  useEffect(() => {
    dispatch(readRestaurantsCount(body.id)).then(response => {
      setTotalItemCount(response.payload);
    });

    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 1
    };

    if (totalItemCount > 0) {
      const observer = new IntersectionObserver(handleObserver, option);
      if (loader.current) observer.observe(loader.current);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order, totalItemCount]);

  return (
    <div style={{ display: "inline-block", width: "100%" }}>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
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
              {restaurantList.map((restaurant, index) => (
                <RestaurantListItem
                  key={'restaurantListItem' + index}
                  restaurant={restaurant}
                  deleteHandler={deleteHandler}
                ></RestaurantListItem>
              ))}
            </Row>
          </List>
        </Restaurants>
        {loading && <p>Loading...</p>}
        {error && <p>페이지 끝입니다!</p>}
        <div ref={loader} />
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
