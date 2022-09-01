import { useState, useEffect, useRef, useCallback } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { readRestaurantsCount } from "../../../_actions/restaurant_action";
import RestaurantListItem from "./RestaurantListItem";
import { Row } from "react-bootstrap";
import styled from "styled-components";
import useFetch from "./useFetch";


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


function RestaurantList(): React.ReactElement {
  const dispatch = useDispatch<any>();
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [page, setPage] = useState(1);

  const { loading, error, restaurantList, setRestaurantList } = useFetch(page, totalItemCount);
  const loader = useRef(null);

  const userId = window.sessionStorage.getItem("userId") as string;

  const handleObserver = useCallback((entries) => {
    const target = entries[0];

    if (target.isIntersecting) {
      setPage(page => page + 1);
    }
  }, [totalItemCount, setTotalItemCount]);

  useEffect(() => {
    dispatch(readRestaurantsCount(userId)).then(response => {
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
  }, [totalItemCount]);

  return (
    <div style={{ display: "inline-block", width: "100%" }}>
      <Div>
        <Restaurants>
          <List>
            <Row className="show-grid">
              {restaurantList.map((restaurant, index) => (
                <RestaurantListItem
                  key={'restaurantListItem' + index}
                  restaurant={restaurant}
                  restaurantList={restaurantList}
                  setRestaurantList={setRestaurantList}
                ></RestaurantListItem>
              ))}
            </Row>
          </List>
        </Restaurants>
        {loading && <p>Loading...</p>}
        {error && <p>페이지 끝입니다!</p>}
        <div ref={loader} />
      </Div>
    </div>
  );
}

export default withRouter(RestaurantList);
