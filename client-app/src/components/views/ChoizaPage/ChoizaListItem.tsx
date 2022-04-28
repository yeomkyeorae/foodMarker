import React, { useState, useEffect } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Card, Col, OverlayTrigger, Popover, PopoverHeader, PopoverBody } from "react-bootstrap";
import { FaSearch, FaPlus, FaCheck } from "react-icons/fa";
import {
  registerVisitedChoizaRoad,
  deleteVisitedChoizaRoad
} from "../../../_actions/choizaRoad_action";
import { ChoizaRoad, VisitedChoizaRoads } from '../../interfaces/ChoizaRoad';
import "./ChoizaListItem.css";

interface Visited {
    isVisited: boolean;
    _id?: string;
    userId?: string;
    restaurantName?: string;
    season?: number;
}

interface Props extends RouteComponentProps {
  choizaRoad: ChoizaRoad;
  season: number;
  visitedChoizaRoads: VisitedChoizaRoads[];
}

function ChoizaListItem(props: Props): React.ReactElement {
  const dispatch = useDispatch<any>();
  const { choizaRoad, season, visitedChoizaRoads } = props;

  const choizaRestaurants = choizaRoad.restaurants;

  const [visitedList, setVisitedList] = useState<Visited[]>([]);

  useEffect(() => {
    const firstVisitedList = choizaRestaurants.split(",").map(restaurant => {
      const visitedItem = visitedChoizaRoads.find(
        visitedChoizaRoad => visitedChoizaRoad.restaurantName === restaurant
      );

      if (visitedItem) {
        return {
          isVisited: true,
          ...visitedItem
        };
      } else {
        return {
          isVisited: false
        };
      }
    });

    setVisitedList(firstVisitedList);
  }, [choizaRestaurants, visitedChoizaRoads]);

  const clickChoizaRoad = URL => {
    window.open(URL, "_blank");
  };

  const checkVisitedChoizaRoad = (restaurantName, index) => {
    const toBeEnrolled = visitedList[index]._id;

    // 체크돼 있으면 방문 삭제, 안돼 있으면 방문 체크
    if (!toBeEnrolled) {
      const userId = window.sessionStorage.getItem("userId");

      const body = {
        userId,
        restaurantName,
        season
      };
      dispatch(registerVisitedChoizaRoad(body))
        .then(response => {
          const newVisitedList = visitedList.map((visitedItem, ix) => {
            if (ix === index) {
              return {
                ...response.payload.info,
                isVisited: true
              };
            }
            return visitedItem;
          });

          setVisitedList(newVisitedList);
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      const visitedChoizaRoadId = visitedList[index]._id;
      dispatch(deleteVisitedChoizaRoad(visitedChoizaRoadId))
        .then(() => {
          const newVisitedList = visitedList.map((visitedItem, ix) => {
            if (ix === index) {
              return {
                isVisited: false
              };
            }
            return visitedItem;
          });

          setVisitedList(newVisitedList);
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  return (
    <Col sm={6} md={4} lg={3} style={{ paddingBottom: "10px" }}>
      <Card style={{ width: "100%", height: "100%" }}>
        <Card.Body>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <OverlayTrigger
              trigger="click"
              key="top"
              placement="top"
              rootClose={true}
              overlay={
                <Popover id={`popover-positioned-left`}>
                  <PopoverHeader as="h3">최자로드 식당 검색</PopoverHeader>
                  {choizaRestaurants ? (
                    choizaRestaurants.split(",").map(restaurant => (
                      <PopoverBody key={restaurant}>
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
                      </PopoverBody>
                    ))
                  ) : (
                    <PopoverBody>미등록</PopoverBody>
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
                <FaSearch color="#999DA0" size="28" />
              </div>
            </OverlayTrigger>
            <OverlayTrigger
              trigger="click"
              key="top_wish"
              placement="top"
              rootClose={true}
              overlay={
                <Popover id={`popover-positioned-left`}>
                  <PopoverHeader as="h3" className="noselect">
                    최자로드 식당 방문 체크
                  </PopoverHeader>
                  {choizaRestaurants && visitedList.length > 0 ? (
                    choizaRestaurants.split(",").map((restaurant, ix) => {
                      const isVisited = visitedList[ix].isVisited;

                      return (
                        <PopoverBody key={restaurant}>
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
                        </PopoverBody>
                      );
                    })
                  ) : (
                    <PopoverBody>미등록</PopoverBody>
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
            <p style={{ fontSize: "20px" }}>
              {choizaRoad.title}
            </p>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default withRouter(ChoizaListItem);
