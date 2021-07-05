import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Card, Col, OverlayTrigger, Popover } from "react-bootstrap";
import { FaMapMarkedAlt, FaPlus, FaCheck } from "react-icons/fa";
import { registerVisitedChoizaRoad } from "../../../_actions/choizaRoad_action";
import "./ChoizaListItem.css";

function ChoizaListItem(props) {
  const dispatch = useDispatch();
  const { choizaRoad, season, visitedChoizaRoads } = props;
  const choizaRestaurants = choizaRoad.restaurants;

  const [visitedList, setVisitedList] = useState([]);

  useEffect(() => {
    const firstVisitedList = choizaRestaurants.split(",").map(restaurant => {
      const isVisited = visitedChoizaRoads.find(
        visitedChoizaRoad => visitedChoizaRoad.restaurantName === restaurant
      );
      return isVisited ? true : false;
    });

    setVisitedList(firstVisitedList);
  }, [choizaRestaurants, visitedChoizaRoads]);

  const clickChoizaRoad = URL => {
    window.open(URL, "_blank");
  };

  const checkVisitedChoizaRoad = (restaurantName, index) => {
    const newVisitedList = visitedList.map((visited, ix) => {
      if (ix === index) {
        return !visited;
      }
      return visited;
    });

    setVisitedList(newVisitedList);

    // 체크돼 있으면 방문 삭제, 안돼 있으면 방문 체크
    // const userId = window.sessionStorage.getItem("userId");

    // const body = {
    //   userId,
    //   restaurantName,
    //   season
    // };
    // dispatch(registerVisitedChoizaRoad(body))
    //   .then(response => {
    //     console.log(response);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  };

  return (
    <Col md={3}>
      <Card style={{ width: "100%", height: "100%" }}>
        <Card.Body>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <OverlayTrigger
              trigger="click"
              key="top"
              placement="top"
              overlay={
                <Popover id={`popover-positioned-left`}>
                  <Popover.Title as="h3">최자로드 식당 검색</Popover.Title>
                  {choizaRestaurants ? (
                    choizaRestaurants.split(",").map(restaurant => (
                      <Popover.Content key={restaurant}>
                        <div style={{ textAlign: "center" }}>
                          <a
                            href={`https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=${restaurant}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ textDecoration: "none" }}
                          >
                            {restaurant}
                          </a>
                        </div>
                      </Popover.Content>
                    ))
                  ) : (
                    <Popover.Content>미등록</Popover.Content>
                  )}
                </Popover>
              }
            >
              <div
                style={{
                  cursor: "pointer",
                  marginBottom: "5px",
                  marginRight: "5px"
                }}
              >
                <FaMapMarkedAlt color="#999DA0" size="28" />
              </div>
            </OverlayTrigger>
            <OverlayTrigger
              trigger="click"
              key="top_wish"
              placement="top"
              overlay={
                <Popover id={`popover-positioned-left`}>
                  <Popover.Title as="h3" className="noselect">
                    최자로드 식당 방문 체크
                  </Popover.Title>
                  {choizaRestaurants ? (
                    choizaRestaurants.split(",").map((restaurant, ix) => {
                      const isVisited = visitedList[ix];

                      return (
                        <Popover.Content key={restaurant}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-around"
                            }}
                          >
                            <div className="noselect">{restaurant}</div>
                            <div
                              style={{
                                cursor: "pointer",
                                marginLeft: "5px",
                                margin: "0px"
                              }}
                              onClick={() =>
                                checkVisitedChoizaRoad(restaurant, ix)
                              }
                            >
                              <FaCheck
                                color={isVisited ? "green" : "gray"}
                                size="20"
                              />
                            </div>
                          </div>
                        </Popover.Content>
                      );
                    })
                  ) : (
                    <Popover.Content>미등록</Popover.Content>
                  )}
                </Popover>
              }
            >
              <div
                style={{
                  cursor: "pointer",
                  marginBottom: "5px",
                  marginLeft: "5px"
                }}
              >
                <FaPlus color="#999DA0" size="28" />
              </div>
            </OverlayTrigger>
          </div>
          <div
            onClick={() => clickChoizaRoad(choizaRoad.youtubeURL)}
            style={{ cursor: "pointer" }}
          >
            <div
              style={{
                width: "100%",
                height: "240px",
                overflow: "hidden"
              }}
            >
              <Card.Img
                variant="top"
                src={choizaRoad.thumbnailURL}
                style={{
                  width: "100%",
                  height: "100%"
                }}
              />
            </div>
            <p style={{ fontFamily: "Do Hyeon", fontSize: "20px" }}>
              {choizaRoad.title}
            </p>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default withRouter(ChoizaListItem);
