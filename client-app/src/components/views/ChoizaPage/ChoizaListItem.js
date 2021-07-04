import React from "react";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Card, Col, OverlayTrigger, Popover } from "react-bootstrap";
import { FaMapMarkedAlt, FaPlus, FaCheck } from "react-icons/fa";
import { registerVisitedChoizaRoad } from "../../../_actions/choizaRoad_action";

function ChoizaListItem(props) {
  const dispatch = useDispatch();
  const choizaRoad = props.choizaRoad;
  const season = props.season;
  const choizaRestaurants = choizaRoad.restaurants;

  const clickChoizaRoad = URL => {
    window.open(URL, "_blank");
  };

  const checkVisitedChoizaRoad = restaurantName => {
    const userId = window.sessionStorage.getItem("userId");

    const body = {
      userId,
      restaurantName,
      season
    };
    dispatch(registerVisitedChoizaRoad(body))
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
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
                  <Popover.Title as="h3">최자로드 식당 방문 체크</Popover.Title>
                  {choizaRestaurants ? (
                    choizaRestaurants.split(",").map(restaurant => (
                      <Popover.Content key={restaurant}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-around"
                          }}
                        >
                          <div>{restaurant}</div>
                          <div
                            style={{
                              cursor: "pointer",
                              marginLeft: "5px",
                              margin: "0px"
                            }}
                            onClick={() => checkVisitedChoizaRoad(restaurant)}
                          >
                            <FaCheck color="green" size="20" />
                          </div>
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
